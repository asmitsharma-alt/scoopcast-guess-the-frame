import os
import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(line_buffering=True, encoding="utf-8")
import base64
import io
import json
import time
import re
import urllib.parse
import requests
from PIL import Image

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
CACHE_FILE = os.path.join(ROOT_DIR, "data", "frame_verification_cache.json")
MISMATCHES_FILE = os.path.join(ROOT_DIR, "data", "frame_mismatches_report.json")
FRAMES_JSON = os.path.join(ROOT_DIR, "data", "frames.json")

# Load environment
env_path = os.path.join(ROOT_DIR, ".env.local")
with open(env_path, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

api_key = os.environ.get("GEMINI_API_KEY", "")

MODELS = [
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite"
]

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)

def save_mismatches(cache):
    mismatches = []
    for rel_path, data in cache.items():
        if data.get("match") is False:
            mismatches.append({
                "file": os.path.basename(rel_path),
                "path": rel_path,
                "claimed_movie": data.get("claimed_movie", ""),
                "actual_movie": data.get("actual_movie", ""),
                "details": data.get("details", "")
            })
    with open(MISMATCHES_FILE, "w", encoding="utf-8") as f:
        json.dump(mismatches, f, indent=2)

def verify_batch(batch):
    parts = []
    prompt = f"""Examine the following {len(batch)} movie frames numbered 1 to {len(batch)}.
For each frame, determine:
1. Does it actually come from the claimed movie? (true if yes, false if it is from a different movie, sequel, prequel, spin-off, or unrelated film)
2. What movie is it actually from?
3. Brief description of characters, actors, or scene.

Return a JSON array of {len(batch)} objects:
[
  {{"index": 1, "match": true/false, "actual_movie": "...", "details": "..."}},
  ...
]"""
    parts.append({"text": prompt})

    for idx, it in enumerate(batch, 1):
        img = Image.open(it["abs_path"])
        img.thumbnail((480, 480))
        buf = io.BytesIO()
        img.convert("RGB").save(buf, format="JPEG", quality=75)
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        parts.append({"text": f"--- Frame {idx}: Claimed: \"{it['movie']}\" ({it['year']}) | File: {it['filename']} ---"})
        parts.append({"inline_data": {"mime_type": "image/jpeg", "data": b64}})

    for attempt in range(3):
        for model in MODELS:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
            payload = {
                "contents": [{"parts": parts}],
                "generationConfig": {
                    "response_mime_type": "application/json",
                    "temperature": 0.1
                }
            }
            try:
                r = requests.post(url, json=payload, timeout=30)
                if r.status_code == 200:
                    text = r.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
                    if text.startswith("```"):
                        text = re.sub(r"^```(?:json)?\s*", "", text)
                        text = re.sub(r"\s*```$", "", text)
                    results = json.loads(text)
                    return results
                elif r.status_code in (429, 503):
                    time.sleep(3 + attempt * 2)
                    continue
            except Exception as e:
                time.sleep(2)
                continue

    return None

def main():
    with open(FRAMES_JSON, "r", encoding="utf-8") as f:
        catalog = json.load(f)

    cache = load_cache()
    print(f"Loaded {len(catalog)} frames from catalog. Cache contains {len(cache)} entries.", flush=True)

    # Franchise ordering first, then remaining
    franchise_keywords = [
        'spider', 'avenger', 'batman', 'star wars', 'lord of the rings', 'potter',
        'matrix', 'terminator', 'fast', 'mission', 'alien', 'predator', 'pirates',
        'planet of the apes', 'x-men', 'x2', 'wolverine', 'deadpool', 'iron man',
        'captain america', 'thor', 'guardians', 'hulk', 'ant-man', 'black panther',
        'doctor strange', 'jurassic', 'toy story', 'shrek', 'mad max', 'die hard',
        'bourne', 'godfather', 'kill bill', 'blade runner', 'blade', 'dune',
        'hunger games', 'twilight', 'superman', 'wonder woman', 'aquaman', 'justice league',
        'rocky', 'creed', 'rambo', 'indiana jones', 'john wick', 'back to the future'
    ]

    all_items = []
    for fr in catalog:
        content_url = fr["content"]
        filename = urllib.parse.unquote(os.path.basename(content_url))
        rel_path = f"GUESSTHEFRAME/All_Movie_Frames/{filename}"
        abs_path = os.path.join(ROOT_DIR, rel_path)
        movie = fr.get("movie", fr.get("answer"))
        year = fr.get("year", "")

        all_items.append({
            "id": fr["id"],
            "movie": movie,
            "year": year,
            "filename": filename,
            "rel_path": rel_path,
            "abs_path": abs_path,
            "is_franchise": any(k in movie.lower() for k in franchise_keywords)
        })

    # Filter uncached
    uncached = [it for it in all_items if it["rel_path"] not in cache or cache[it["rel_path"]].get("match") is None]
    # Sort uncached: franchise first
    uncached.sort(key=lambda x: (not x["is_franchise"], x["movie"], x["filename"]))

    print(f"Frames to scan: {len(uncached)} / {len(all_items)} total.", flush=True)

    # Batch into groups of 5
    BATCH_SIZE = 5
    batches = [uncached[i:i + BATCH_SIZE] for i in range(0, len(uncached), BATCH_SIZE)]
    print(f"Divided into {len(batches)} batches of {BATCH_SIZE} frames.", flush=True)

    mismatch_count = sum(1 for v in cache.values() if v.get("match") is False)
    processed_count = len(all_items) - len(uncached)

    for b_idx, batch in enumerate(batches, 1):
        t0 = time.time()
        results = verify_batch(batch)
        dur = time.time() - t0

        if results and isinstance(results, list):
            for i, it in enumerate(batch):
                res = results[i] if i < len(results) else {"match": None}
                # Store in cache
                cache[it["rel_path"]] = {
                    "match": res.get("match"),
                    "claimed_movie": it["movie"],
                    "claimed_year": it["year"],
                    "actual_movie": res.get("actual_movie", it["movie"]),
                    "details": res.get("details", "")
                }
                processed_count += 1
                if res.get("match") is False:
                    mismatch_count += 1
                    print(f"❌ MISMATCH [{processed_count}/{len(all_items)}]: {it['filename']} (Claimed: {it['movie']}) -> {res.get('actual_movie')}", flush=True)
                    print(f"   Details: {res.get('details')}", flush=True)

            save_cache(cache)
            save_mismatches(cache)
            print(f"Batch {b_idx}/{len(batches)} ({processed_count}/{len(all_items)}) verified in {dur:.1f}s | Total Mismatches: {mismatch_count}", flush=True)
        else:
            print(f"⚠️ Batch {b_idx}/{len(batches)} failed or timed out. Skipping to next.", flush=True)

        # Rate limit pacing: 2.5 seconds between batches
        time.sleep(2.5)

    print(f"\nScan completed! Total frames scanned: {processed_count}. Total mismatches: {mismatch_count}", flush=True)

if __name__ == "__main__":
    main()
