"""
Scoopcast Auto-Collector: TMDB + Cinephile Stills + Gemini Vision AI + Cloudinary
Automates frame collection for Indian (Hindi, Telugu, Tamil, Malayalam, Kannada) & Hollywood cinema.
"""

import os
import sys
import re
import subprocess
import json
import time
import argparse
import base64
import urllib.request
import urllib.parse
import io
from PIL import Image

# Third-party (ensure installed via pip)
try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("Warning: cloudinary library not found. Install via: pip install cloudinary")

# ═══ LOAD ENVIRONMENT VARIABLES (.env.local for local, GitHub Secrets in CI) ═══
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "nvwgbyr3")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "")

TMDB_API_KEY = os.getenv("TMDB_API_KEY", "")

# Dual-Key Gemini Vision Setup
GEMINI_KEY_1 = os.getenv("GEMINI_API_KEY", "")
GEMINI_KEY_2 = os.getenv("GEMINI_API_KEY_BACKUP", "")
CURRENT_GEMINI_KEY = GEMINI_KEY_1

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "frames.json")

# Configure Cloudinary
if "cloudinary" in sys.modules:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )

def sanitize_public_id(title, year):
    clean = re.sub(r"[^\w\s-]", "", title.replace("&", "and")).strip()
    clean = re.sub(r"[-\s]+", "_", clean)
    return f"{clean}_{year}"

def get_headers():
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }

def verify_with_gemini(img_bytes, movie_title, year):
    global CURRENT_GEMINI_KEY
    b64 = base64.b64encode(img_bytes).decode("utf-8")
    
    prompt = f"""You are an elite film cinematography analyst and frame verifier for a "Guess the Movie from a Frame" game.
Your task is to determine if this image is a high-quality, authentic, pure MOVIE PLAYBACK FRAME from: "{movie_title} ({year})".

CRITICAL EVALUATION CRITERIA:
1. PURE PLAYBACK FRAME:
   - Genuine screenshot captured directly from film video playback (natural cinematic lighting, film grain, or digital master).
   - ZERO marketing text, ZERO title typography, ZERO credit overlays, ZERO watermarks, and ZERO subtitles.
   - NOT promotional art, NOT a poster, NOT concept art, NOT behind-the-scenes film crew photo.

2. VISUAL CLARITY & AESTHETICS (Must look clear and visually appealing):
   - Image MUST be crisp, sharp, well-exposed, and in focus.
   - REJECT images that are pitch-black, severely underexposed, muddy, pixelated, or heavily motion-blurred.

3. SCENE IMPORTANCE & MEMORABILITY (Must be a significant or recognizable scene):
   - Scene MUST depict an important, iconic, or memorable moment (e.g. key characters, intense dialogue beats, climactic set pieces, iconic locations, or signature cinematography).
   - REJECT boring filler frames (e.g. an empty wall, a blurry foot, a transitional highway, a random nondescript door, or an unrecognizable background extra).

Rate:
- 'is_clear_and_sharp': true if high visual clarity and crisp detail, false if blurry/dark/muddy.
- 'scene_importance': "high" (pivotal/iconic scene), "medium" (good character/scenic shot), or "low" (generic filler/unimportant).
- 'iconic_score': 0.0 to 1.0 (how recognizable, atmospheric, or visually representative of {movie_title} it is).

Return strict JSON:
{{
  "is_movie_frame": boolean,
  "confidence": number,
  "has_text_or_logos": boolean,
  "is_clear_and_sharp": boolean,
  "scene_importance": "high" | "medium" | "low",
  "iconic_score": number,
  "reason": "1 concise sentence explaining the visual content, its clarity, and why this specific scene is important or memorable"
}}"""

    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "image/jpeg", "data": b64}}
            ]
        }],
        "generationConfig": {"response_mime_type": "application/json"}
    }

    # Try primary key, fallback to backup key on failure
    for attempt_key in [CURRENT_GEMINI_KEY, GEMINI_KEY_2 if CURRENT_GEMINI_KEY == GEMINI_KEY_1 else GEMINI_KEY_1]:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key={attempt_key}"
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                raw = res["candidates"][0]["content"]["parts"][0]["text"]
                CURRENT_GEMINI_KEY = attempt_key
                return json.loads(raw)
        except urllib.error.HTTPError as e:
            if e.code in (429, 403, 503):
                print(f"     [Gemini Key Notice] Status {e.code}, failing over to backup key...")
                CURRENT_GEMINI_KEY = GEMINI_KEY_2
                time.sleep(1)
                continue
            else:
                print(f"     [Gemini API Error] {e}")
                break
        except Exception as e:
            print(f"     [Gemini Error] {e}")
            break

    return {"is_movie_frame": False, "confidence": 0, "has_text_or_logos": True, "iconic_score": 0, "reason": "Verification failed"}

def tmdb_get(endpoint, params=None):
    if params is None:
        params = {}
    params["api_key"] = TMDB_API_KEY
    query = urllib.parse.urlencode(params)
    url = f"https://api.themoviedb.org/3/{endpoint}?{query}"
    
    cmd = [
        "curl.exe", "-s", "-L",
        "--resolve", "api.themoviedb.org:443:3.175.86.103",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        url
    ]
    for _ in range(3):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
            if res.stdout and res.stdout.startswith("{"):
                return json.loads(res.stdout)
        except Exception:
            time.sleep(1.0)
    return None

def fetch_movies_to_process():
    """Fetches high-quality candidates across Indian and International Cinema."""
    collected = []
    seen_ids = set()

    # Define Discovery streams: Indian Languages + Top Rated
    streams = [
        # Indian Languages: Top Voted
        {"endpoint": "discover/movie", "params": {"with_original_language": "hi", "sort_by": "vote_count.desc", "vote_count.gte": 25}},
        {"endpoint": "discover/movie", "params": {"with_original_language": "te", "sort_by": "vote_count.desc", "vote_count.gte": 15}},
        {"endpoint": "discover/movie", "params": {"with_original_language": "ta", "sort_by": "vote_count.desc", "vote_count.gte": 15}},
        {"endpoint": "discover/movie", "params": {"with_original_language": "ml", "sort_by": "vote_count.desc", "vote_count.gte": 10}},
        {"endpoint": "discover/movie", "params": {"with_original_language": "kn", "sort_by": "vote_count.desc", "vote_count.gte": 10}},
        # Top Rated Indian Films
        {"endpoint": "discover/movie", "params": {"with_origin_country": "IN", "sort_by": "vote_average.desc", "vote_count.gte": 40}},
        # Hollywood & International Classics / Top Rated
        {"endpoint": "movie/top_rated", "params": {"page": 1}},
        {"endpoint": "movie/top_rated", "params": {"page": 2}},
        {"endpoint": "discover/movie", "params": {"sort_by": "vote_count.desc", "vote_count.gte": 2000}}
    ]

    for stream in streams:
        for page in range(1, 4):
            p = stream["params"].copy()
            p["page"] = page
            data = tmdb_get(stream["endpoint"], p)
            if not data or "results" not in data:
                break
            for m in data["results"]:
                mid = m.get("id")
                title = m.get("title")
                release = m.get("release_date", "")
                year = release[:4] if release else ""
                backdrop = m.get("backdrop_path")
                
                if mid and title and year and backdrop and mid not in seen_ids:
                    seen_ids.add(mid)
                    collected.append({
                        "tmdb_id": mid,
                        "title": title,
                        "year": year,
                        "lang": m.get("original_language", "en")
                    })
            time.sleep(0.3)

    return collected

def main():
    parser = argparse.ArgumentParser(description="Scoopcast Auto-Collector")
    parser.add_argument("--max-minutes", type=int, default=int(os.getenv("MAX_RUNTIME_MINUTES", "60")), help="Maximum runtime in minutes (default: 60)")
    parser.add_argument("--limit", type=int, default=1000, help="Max movies to collect in this run")
    args = parser.parse_args()

    max_seconds = args.max_minutes * 60
    start_time = time.time()

    print("=" * 65)
    print(f"SCOOPCAST AUTO-FRAME COLLECTOR STARTING")
    print(f"Max Runtime: {args.max_minutes} minutes ({max_seconds} seconds)")
    print(f"Target Database: {DATA_FILE}")
    print(f"Cloudinary: {CLOUDINARY_CLOUD_NAME}")
    print("=" * 65)

    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    frames_data = []
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            try:
                frames_data = json.load(f)
            except Exception:
                frames_data = []

    # Map of existing answers to avoid any duplicates
    existing_titles = set(item.get("answer", "").upper().strip() for item in frames_data)
    print(f"Current database has {len(frames_data)} existing movie frames.")

    print("\nFetching movie catalog from TMDB...")
    candidate_movies = fetch_movies_to_process()
    print(f"Discovered {len(candidate_movies)} candidate movies.")

    added_count = 0

    for idx, movie in enumerate(candidate_movies, 1):
        # 1. Check time limit
        elapsed = time.time() - start_time
        if elapsed >= max_seconds:
            print(f"\n[Timer Reached] Runtime exceeded {args.max_minutes} minutes. Gracefully stopping.")
            break

        if added_count >= args.limit:
            print(f"\n[Limit Reached] Reached target limit of {args.limit} frames. Stopping.")
            break

        title = movie["title"]
        year = movie["year"]
        tmdb_id = movie["tmdb_id"]
        answer_key = title.upper().strip()

        # Check deduplication
        if answer_key in existing_titles:
            continue

        print(f"\n[{idx}/{len(candidate_movies)}] Checking: {title} ({year}) [ID: {tmdb_id}, Lang: {movie['lang']}]")

        # 2. Get movie backdrops
        img_data = tmdb_get(f"movie/{tmdb_id}/images", {"include_image_language": "en,null"})
        if not img_data or "backdrops" not in img_data or not img_data["backdrops"]:
            print("  -> No backdrops available.")
            continue

        # Sort backdrops by resolution/vote
        backdrops = [b for b in img_data["backdrops"] if b.get("file_path") and (b.get("aspect_ratio", 0) >= 1.6)]
        if not backdrops:
            print("  -> No widescreen backdrops.")
            continue

        # Test up to 3 candidate backdrops
        best_candidate = None
        best_verdict = None
        best_img_bytes = None

        for b in backdrops[:4]:
            file_path = b["file_path"]
            img_url = f"https://image.tmdb.org/t/p/w1280{file_path}"
            
            try:
                res = subprocess.run(["curl.exe", "-s", "-L", "-A", "Mozilla/5.0", img_url], capture_output=True)
                raw_bytes = res.stdout
            except Exception:
                continue

            if len(raw_bytes) < 15000:
                continue

            verdict = verify_with_gemini(raw_bytes, title, year)
            is_frame = verdict.get("is_movie_frame", False)
            no_text = not verdict.get("has_text_or_logos", True)
            is_clear = verdict.get("is_clear_and_sharp", True)
            importance = str(verdict.get("scene_importance", "medium")).lower()
            score = verdict.get("iconic_score", 0.0)
            conf = verdict.get("confidence", 0.0)

            print(f"  -> Candidate: frame={is_frame} | no_text={no_text} | clear={is_clear} | importance={importance} | score={score} | conf={conf}", flush=True)
            print(f"     Reason: {verdict.get('reason', '')}", flush=True)

            # Strict quality gate: Must be playback frame, 0 text, clear/sharp, and important scene
            if is_frame and no_text and is_clear and (importance in ("high", "medium")) and conf >= 0.75 and score >= 0.70:
                if best_verdict is None or score > best_verdict.get("iconic_score", 0):
                    best_verdict = verdict
                    best_candidate = img_url
                    best_img_bytes = raw_bytes
                    if score >= 0.85 and importance == "high":
                        print("     [Top-Tier Scene] High-clarity iconic key scene locked in!", flush=True)
                        break

            time.sleep(0.5)

        # 3. If verified, convert to WebP and upload to Cloudinary
        if best_img_bytes and best_verdict:
            try:
                im = Image.open(io.BytesIO(best_img_bytes))
                im = im.convert("RGB")
                webp_buf = io.BytesIO()
                im.save(webp_buf, format="WEBP", quality=88)
                webp_bytes = webp_buf.getvalue()

                public_id = sanitize_public_id(title, year)
                print(f"  -> Uploading to Cloudinary (id: {public_id})...")
                
                upload_res = cloudinary.uploader.upload(
                    webp_bytes,
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
                existing_titles.add(answer_key)
                added_count += 1

                # Save JSON immediately so no progress is ever lost
                with open(DATA_FILE, "w", encoding="utf-8") as f:
                    json.dump(frames_data, f, indent=2)

                print(f"  [SUCCESS] Added {title} ({year})! Total in DB: {len(frames_data)}", flush=True)
                if added_count >= args.limit:
                    print(f"\n[Limit Reached] Reached target limit of {args.limit} frames. Stopping.", flush=True)
                    break
            except Exception as e:
                print(f"  [Error Uploading to Cloudinary] {e}", flush=True)

        time.sleep(0.5)

    total_time = int(time.time() - start_time)
    print("\n" + "=" * 65)
    print(f"COLLECTION SUMMARY")
    print(f"Added in this run: {added_count} new movie frames")
    print(f"Total catalog size: {len(frames_data)} frames")
    print(f"Total time elapsed: {total_time // 60}m {total_time % 60}s")
    print("=" * 65)

if __name__ == "__main__":
    main()
