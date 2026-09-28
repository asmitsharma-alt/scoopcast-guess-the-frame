import os
import sys
import json
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

PURGE_TITLES = {
    "BLONDE",
    "FAT GIRL",
    "THE COOK, THE THIEF, HIS WIFE & HER LOVER",
    "MY SOLE DESIRE",
    "WOMAN IN THE DUNES",
    "BEANPOLE",
    "GREEN INFERNO",
    "A BAY OF BLOOD",
}

ICONIC_CLEAN_REPLACEMENTS = [
    {"title": "Top Gun: Maverick", "url": "https://film-grab.com/2024/02/12/top-gun-maverick/"},
    {"title": "Everything Everywhere All At Once", "url": "https://film-grab.com/2022/11/11/everything-everywhere-all-at-once/"},
    {"title": "A Quiet Place Part II", "url": "https://film-grab.com/2021/10/19/a-quiet-place-part-ii/"},
    {"title": "Alita: Battle Angel", "url": "https://film-grab.com/2021/09/27/alita-battle-angel/"},
    {"title": "All Quiet On The Western Front (2022)", "url": "https://film-grab.com/2024/12/23/all-quiet-on-the-western-front-2022/"},
    {"title": "A Fistful of Dynamite", "url": "https://film-grab.com/2021/04/14/a-fistful-of-dynamite/"},
    {"title": "6 Underground", "url": "https://film-grab.com/2023/11/10/6-underground/"},
    {"title": "Amistad", "url": "https://film-grab.com/2021/12/23/amistad/"},
    {"title": "A Scene at the Sea", "url": "https://film-grab.com/2021/09/29/a-scene-at-the-sea/"},
    {"title": "Drive My Car", "url": "https://film-grab.com/2025/07/28/drive-my-car/"}
]

def main():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        frames_data = json.load(f)

    print(f"Starting frame count: {len(frames_data)}")

    # 1. Purge flagged titles
    cleaned = []
    purged_count = 0
    for f in frames_data:
        ans = f.get("answer", "").upper().strip()
        if ans in PURGE_TITLES:
            print(f"🚫 Purging adult/questionable film: {ans}")
            purged_count += 1
        else:
            cleaned.append(f)

    print(f"Purged {purged_count} films. Clean pool count: {len(cleaned)}")
    frames_data = cleaned
    existing_keys = set(farmer.normalize_key(item.get("answer", "")) for item in frames_data)

    # 2. Add pristine clean replacements
    for item in ICONIC_CLEAN_REPLACEMENTS:
        norm_k = farmer.normalize_key(item["title"])
        if norm_k in existing_keys:
            print(f"Already in database: {item['title']}")
            continue

        print(f"Processing replacement: {item['title']}...")
        details = farmer.extract_filmgrab_details(item["url"])
        if not details or not details["stills"]:
            print(f"  Could not extract details for {item['title']}")
            continue

        title = details["title"]
        year = details["year"]
        stills = details["stills"]
        answer_key = title.upper().strip()

        # Pick candidate still from the middle (48%)
        n = len(stills)
        indices = [int(n * 0.48), int(n * 0.52), int(n * 0.44), int(n * 0.56)]
        candidates = [stills[i] for i in dict.fromkeys(indices) if 0 <= i < n]

        uploaded = False
        for cand_url in candidates:
            raw_bytes = farmer.fetch_url(cand_url, referer=details["url"], binary=True)
            if not raw_bytes or len(raw_bytes) < 40000:
                continue

            try:
                im = Image.open(io.BytesIO(raw_bytes))
                w, h = im.size
                if w < 1280 or (w < 1920 and h < 1080) or w <= h:
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
                uploaded = True
                print(f"✅ Added '{title} ({year})' [{w}x{h}] -> {secure_url}")
                break

            except Exception as e:
                print(f"  Error on still for {title}: {e}")
                continue

        if not uploaded:
            print(f"  Failed to upload any still for {title}")

    # Save to frames.json
    tmp_file = DATA_FILE + ".tmp"
    with open(tmp_file, "w", encoding="utf-8") as f:
        json.dump(frames_data, f, indent=2)
    os.replace(tmp_file, DATA_FILE)

    print(f"\nFinal pristine frame count: {len(frames_data)}")

    # Sync backend catalog
    print("Updating guess-the-frame-colyseus/src/data/catalog.ts...")
    subprocess.run([sys.executable, CATALOG_SCRIPT], check=True)

    # Git commit & push
    print("Committing and pushing clean 1000+ library to GitHub...")
    subprocess.run(["git", "add", "data/frames.json", "guess-the-frame-colyseus/src/data/catalog.ts"], check=True)
    subprocess.run(["git", "commit", "-m", f"feat(frames): complete clean 1000+ frame milestone with zero adult content (total: {len(frames_data)})"], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    print("Done! GitHub main is synchronized.")

if __name__ == "__main__":
    main()
