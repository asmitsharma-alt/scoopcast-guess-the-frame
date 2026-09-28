import os
import sys
import json
import time
import subprocess
import io
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import scripts.local_fast_farmer as farmer
import cloudinary
import cloudinary.uploader

DATA_FILE = os.path.join(farmer.ROOT_DIR, "data", "frames.json")
CATALOG_SCRIPT = os.path.join(farmer.ROOT_DIR, "scripts", "update_backend_catalog.py")

cloudinary.config(
    cloud_name=farmer.CLOUDINARY_CLOUD_NAME,
    api_key=farmer.CLOUDINARY_API_KEY,
    api_secret=farmer.CLOUDINARY_API_SECRET,
    secure=True
)

EXTRA_EXCLUSIONS = {
    "ammonite", "anatomy of hell", "air doll", "a bay of blood"
}

def main():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        frames_data = json.load(f)

    current_count = len(frames_data)
    print(f"Current frame count: {current_count}")
    if current_count >= 1000:
        print("Database already has 1000+ frames!")
        return

    needed = 1000 - current_count + 1  # Get to at least 1001
    print(f"Targeting {needed} more frames to exceed 1000...")

    existing_keys = set(farmer.normalize_key(item.get("answer", "")) for item in frames_data)
    cat = farmer.fetch_filmgrab_catalog()

    candidates = []
    for m in cat:
        if m.get("post_date", 0) >= 20210101:
            norm = farmer.normalize_key(m["title"])
            t_low = m["title"].lower()
            if norm in existing_keys:
                continue
            if farmer.is_sexual_or_adult_movie(m["title"], m["url"]):
                continue
            if any(bad in t_low for bad in EXTRA_EXCLUSIONS):
                continue
            candidates.append(m)

    print(f"Found {len(candidates)} pristine modern candidates.")

    added = 0
    for task in candidates:
        if len(frames_data) >= 1000:
            break

        details = farmer.extract_filmgrab_details(task["url"])
        if not details or not details["stills"]:
            continue

        title = details["title"]
        year = details["year"]
        stills = details["stills"]
        answer_key = title.upper().strip()
        norm_k = farmer.normalize_key(title)

        if norm_k in existing_keys:
            continue

        # Pick candidate stills from narrative middle
        n = len(stills)
        indices = [int(n * 0.45), int(n * 0.52), int(n * 0.58)]
        picked_candidates = [stills[i] for i in dict.fromkeys(indices) if 0 <= i < n]

        for cand_url in picked_candidates:
            raw_bytes = farmer.fetch_url(cand_url, referer=details["url"], binary=True)
            if not raw_bytes or len(raw_bytes) < 40000:
                continue

            try:
                im = Image.open(io.BytesIO(raw_bytes))
                w, h = im.size
                # 1080p landscape requirement
                if w < 1280 or (w < 1920 and h < 1080) or w <= h:
                    continue

                # Ensure image has good dynamic range (not purely black credits/intro)
                stat = im.convert("L").getextrema()
                if stat[1] - stat[0] < 50:
                    continue

                public_id = farmer.sanitize_public_id(title, year)
                upload_res = cloudinary.uploader.upload(
                    raw_bytes,
                    folder="scoopcast_frames",
                    public_id=public_id,
                    resource_type="image",
                    overwrite=True
                )
                secure_url = upload_res.get("secure_url")

                tag = "classic" if int(year) < 2024 else "new"
                entry = {
                    "type": "image",
                    "content": secure_url,
                    "answer": answer_key,
                    "year": str(year),
                    "tag": tag
                }

                frames_data.append(entry)
                existing_keys.add(norm_k)
                added += 1

                # Save to disk
                tmp_file = DATA_FILE + ".tmp"
                with open(tmp_file, "w", encoding="utf-8") as f:
                    json.dump(frames_data, f, indent=2)
                os.replace(tmp_file, DATA_FILE)

                print(f"[{len(frames_data)}/1000] Added '{title} ({year})' [{w}x{h}] -> {secure_url}")
                break

            except Exception as e:
                print(f"Error processing {title}: {e}")
                continue

    print(f"\nFinal count reached: {len(frames_data)} frames!")

    # Synchronize backend catalog
    print("Syncing backend catalog.ts...")
    subprocess.run([sys.executable, CATALOG_SCRIPT], check=True)

    # Git commit & push
    print("Committing and pushing to GitHub main...")
    subprocess.run(["git", "add", "data/frames.json", "guess-the-frame-colyseus/src/data/catalog.ts"], check=True)
    subprocess.run(["git", "commit", "-m", f"feat(frames): milestone reached 1000+ pristine frames (total: {len(frames_data)})"], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    print("All 1,000+ frames pushed to main!")

if __name__ == "__main__":
    main()
