"""
Scoopcast Auto-Collector: Film-Grab + Franchise Stills + Gemini Vision AI + Cloudinary
Collects iconic, universally recognized movie frames:
- Marvel (Avengers, Iron Man, Spider-Man, Thor, Captain America, Guardians, Black Panther)
- DC (The Dark Knight trilogy, The Batman, Joker, Man of Steel, Wonder Woman)
- Fast & Furious franchise
- Major International Blockbusters & Hits (Matrix, Inception, Interstellar, John Wick, Jurassic Park, Star Wars)
"""

import os
import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)
import re
import subprocess
import json
import time
import argparse
import base64
import html
import random
import urllib.request
import urllib.parse
import urllib.error
import io
from PIL import Image

# Third-party
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
if "cloudinary" in sys.modules and CLOUDINARY_API_KEY:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )

CURL_BIN = "curl.exe" if sys.platform == "win32" else "curl"

BROWSER_HEADERS = [
    "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "-H", "Accept-Language: en-US,en;q=0.9",
]

# Explicit exclusions for Indian Cinema
INDIAN_EXCLUSIONS = {
    "india", "hindi", "telugu", "tamil", "malayalam", "kannada", "bengali",
    "bollywood", "tollywood", "kollywood", "mollywood", "sandalwood",
    "satyajit ray", "mira nair", "aparajito", "pather panchali", "charulata",
    "devi", "monsoon wedding", "sholay", "lagaan", "dangal", "3 idiots",
    "rrr", "baahubali", "bahubali", "dilwale", "my name is khan", "tumbbad",
    "swades", "wasseypur", "polite society", "salaam bombay", "lunchbox"
}

# Targeted Marvel, DC, Fast & Furious, and Top International Hits
PRIORITY_FRANCHISES = [
    # ── Marvel Cinematic Universe & Marvel ──
    "Iron Man", "Iron Man 2", "Iron Man 3",
    "The Avengers", "Avengers: Age of Ultron", "Avengers: Infinity War", "Avengers: Endgame",
    "Captain America: The First Avenger", "Captain America: The Winter Soldier", "Captain America: Civil War",
    "Thor", "Thor: The Dark World", "Thor: Ragnarok", "Thor: Love and Thunder",
    "Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Guardians of the Galaxy Vol. 3",
    "Black Panther", "Black Panther: Wakanda Forever",
    "Doctor Strange", "Doctor Strange in the Multiverse of Madness",
    "Spider-Man", "Spider-Man 2", "Spider-Man: Into the Spider-Verse",
    "Spider-Man: Across the Spider-Verse", "Spider-Man: Far From Home", "Spider-Man: No Way Home",
    "Deadpool", "Deadpool 2", "Logan", "Ant-Man", "Ant-Man and the Wasp",

    # ── DC Universe & Batman ──
    "The Dark Knight", "Batman Begins", "The Dark Knight Rises", "The Batman",
    "Batman", "Batman Returns", "Batman Forever", "Batman & Robin",
    "Batman V Superman: Dawn of Justice", "Man of Steel", "Wonder Woman",
    "Joker", "Suicide Squad", "The Suicide Squad", "Aquaman", "Watchmen",

    # ── Christopher Nolan & Sci-Fi Epics ──
    "Inception", "Interstellar",

    # ── The Matrix Saga ──
    "The Matrix", "The Matrix Reloaded", "The Matrix Revolutions", "The Matrix Resurrections",

    # ── John Wick Franchise ──
    "John Wick", "John Wick: Chapter 2", "John Wick: Chapter 3 - Parabellum", "John Wick: Chapter 4",

    # ── Jurassic Saga ──
    "Jurassic Park", "The Lost World: Jurassic Park", "Jurassic World", "Jurassic World: Fallen Kingdom",

    # ── The Lord of the Rings & Middle-earth ──
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Lord of The Rings: The Two Towers",
    "The Lord of The Rings: The Return of the King",

    # ── Star Wars Saga ──
    "Star Wars", "Star Wars: The Force Awakens", "Star Wars: The Last Jedi",
    "Star Wars: Episode I - The Phantom Menace", "Star Wars: Episode II - Attack of the Clones",
    "Star Wars: Episode III - Revenge of the Sith", "Rogue One: A Star Wars Story", "Solo: A Star Wars Story",

    # ── Harry Potter Saga ──
    "Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban", "Harry Potter & The Goblet of Fire",
    "Harry Potter & The Order of the Phoenix", "Harry Potter & The Half Blood Prince",
    "Harry Potter & The Deathly Hallows Part 1", "Harry Potter & The Deathly Hallows Part 2",

    # ── Dune Saga & Cyberpunk ──
    "Dune (2021)", "Dune: Part 2", "Blade Runner", "Blade Runner 2049",

    # ── Iconic Action & Masterpieces ──
    "Gladiator", "Pulp Fiction", "Fight Club", "The Terminator", "Terminator 2: Judgement Day",
    "Titanic", "The Godfather", "The Godfather Part II", "The Shawshank Redemption",
    "Mad Max: Fury Road", "Django Unchained", "Inglourious Basterds",
    "Alien", "Aliens", "The Shining", "Goodfellas", "Back to the Future", "The Truman Show"
]

def is_indian_movie(title, url=""):
    t_low = title.lower()
    u_low = url.lower()
    for kw in INDIAN_EXCLUSIONS:
        if kw in t_low or kw in u_low:
            return True
    return False

def fetch_url(url, referer=None, binary=False):
    """Fetches a URL using curl with browser headers and strict timeouts."""
    cmd = [CURL_BIN, "-s", "-L", "--max-time", "15", "--connect-timeout", "8"]
    cmd.extend(BROWSER_HEADERS)
    if referer:
        cmd.extend(["-H", f"Referer: {referer}"])
    cmd.append(url)

    try:
        if binary:
            res = subprocess.run(cmd, capture_output=True, timeout=18)
            return res.stdout
        else:
            res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=18)
            return res.stdout
    except Exception:
        return b"" if binary else ""

def clean_movie_title(raw_title):
    """Cleans up raw movie title from HTML / metadata."""
    t = html.unescape(raw_title)
    t = t.replace("\u2018", "'").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    t = t.replace("\u2013", "-").replace("\u2014", "-")
    t = re.sub(r'<[^>]+>', '', t)
    t = re.sub(r'\s*[-–]\s*\[?FILMGRAB\]?.*', '', t, flags=re.IGNORECASE)
    t = re.sub(r'^\s*[\'\"]|[\'\"]\s*$', '', t)
    return t.strip()

def normalize_key(title):
    """Normalized alphanumeric key for deduplication."""
    return re.sub(r'[^A-Z0-9]', '', title.upper())

def sanitize_public_id(title, year):
    """Creates a safe Cloudinary public ID."""
    clean = re.sub(r"[^\w\s-]", "", title.replace("&", "and")).strip()
    clean = re.sub(r"[-\s]+", "_", clean)
    return f"{clean}_{year}"

def verify_with_gemini(img_bytes, movie_title, year):
    """Sends candidate still to Gemini Vision for strict verification."""
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

    keys_to_try = [CURRENT_GEMINI_KEY]
    if GEMINI_KEY_2 and GEMINI_KEY_2 != CURRENT_GEMINI_KEY:
        keys_to_try.append(GEMINI_KEY_2)
    elif GEMINI_KEY_1 and GEMINI_KEY_1 != CURRENT_GEMINI_KEY:
        keys_to_try.append(GEMINI_KEY_1)

    for attempt_key in keys_to_try:
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
                print(f"     [Gemini Key Notice] Status {e.code}, attempting fallback key...")
                time.sleep(1)
                continue
            else:
                print(f"     [Gemini API Error] {e}")
                break
        except Exception as e:
            print(f"     [Gemini Error] {e}")
            break

    return {"is_movie_frame": False, "confidence": 0, "has_text_or_logos": True, "iconic_score": 0, "reason": "Verification failed"}

def fetch_filmgrab_catalog():
    """Fetches the 4,100+ movie catalog from Film-Grab A-Z."""
    print("Fetching Film-Grab movies catalog (movies-a-z)...")
    html_text = fetch_url("https://film-grab.com/movies-a-z/")
    if not html_text or len(html_text) < 10000:
        return []

    matches = re.findall(r'<a\s+[^>]*href=["\'](https://film-grab\.com/\d{4}/\d{2}/\d{2}/[^/"\']+/?)["\'][^>]*>(.*?)</a>', html_text, re.DOTALL)
    catalog = []
    seen_urls = set()

    for post_url, raw_title in matches:
        if post_url in seen_urls:
            continue
        seen_urls.add(post_url)
        clean_title = clean_movie_title(raw_title)

        if is_indian_movie(clean_title, post_url):
            continue

        if clean_title and len(clean_title) >= 2:
            catalog.append({
                "title": clean_title,
                "url": post_url
            })

    print(f"Discovered {len(catalog)} eligible non-Indian films in Film-Grab archive.")
    return catalog

def extract_filmgrab_details(post_url):
    """Fetches movie post from Film-Grab and extracts title, year, and stills."""
    post_html = fetch_url(post_url)
    if not post_html or len(post_html) < 2000:
        return None

    og_title = re.search(r'<meta property="og:title" content="([^"]+)"', post_html)
    if og_title:
        title = clean_movie_title(og_title.group(1))
    else:
        h1 = re.search(r'<h1 class="entry-title">([^<]+)</h1>', post_html)
        title = clean_movie_title(h1.group(1)) if h1 else ""

    if not title or is_indian_movie(title, post_url):
        return None

    year = ""
    og_desc = re.search(r'<meta property="og:description" content="([^"]+)"', post_html)
    if og_desc:
        ym = re.search(r'\b(19\d{2}|20\d{2})\b', og_desc.group(1))
        if ym:
            year = ym.group(1)

    if not year:
        url_ym = re.search(r'film-grab\.com/(\d{4})/', post_url)
        year = url_ym.group(1) if url_ym else "2020"

    raw_imgs = re.findall(
        r'["\'](https?://film-grab\.com/wp-content/uploads/(?:photo-gallery/|(?:\d{4}/\d{2}/))[^"\']+\.(?:jpg|jpeg|png)(?:\?[^"\']*)?)["\']',
        post_html,
        re.IGNORECASE
    )

    stills = []
    seen = set()

    for raw in raw_imgs:
        clean = raw.split("?")[0]
        clean = clean.replace("/thumb/", "/")
        if re.search(r'-\d+x\d+\.(?:jpg|jpeg|png)$', clean, re.IGNORECASE):
            continue
        if any(bad in clean.lower() for bad in ["icon", "logo", "banner", "avatar", "cropped", "wp-content/uploads/2019/02/icon"]):
            continue

        parsed = urllib.parse.urlsplit(clean)
        encoded_path = urllib.parse.quote(urllib.parse.unquote(parsed.path))
        final_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, encoded_path, "", ""))

        if final_url not in seen:
            seen.add(final_url)
            stills.append(final_url)

    return {
        "title": title,
        "year": str(year),
        "stills": stills,
        "source": "Film-Grab"
    }

def fetch_tmdb_franchise_stills(movie_query):
    """Fetches high-res stills for franchise films (e.g. Fast & Furious) via TMDB backdrops."""
    if not TMDB_API_KEY:
        return None

    search_url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={urllib.parse.quote_plus(movie_query)}"
    cmd = [CURL_BIN, "-s", "-L", "-A", "Mozilla/5.0", search_url]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    if not res.stdout or not res.stdout.strip().startswith("{"):
        return None

    try:
        data = json.loads(res.stdout)
        results = data.get("results", [])
        if not results:
            return None
        movie = results[0]
        mid = movie["id"]
        title = movie["title"]
        year = movie.get("release_date", "")[:4] or "2010"

        # Fetch backdrops
        img_url = f"https://api.themoviedb.org/3/movie/{mid}/images?api_key={TMDB_API_KEY}&include_image_language=en,null"
        res_img = subprocess.run([CURL_BIN, "-s", "-L", "-A", "Mozilla/5.0", img_url], capture_output=True, text=True)
        img_data = json.loads(res_img.stdout)
        backdrops = [f"https://image.tmdb.org/t/p/w1280{b['file_path']}" for b in img_data.get("backdrops", []) if b.get("file_path")]
        return {
            "title": title,
            "year": str(year),
            "stills": backdrops,
            "source": "TMDB Cinema"
        }
    except Exception:
        return None

def main():
    parser = argparse.ArgumentParser(description="Scoopcast Franchise Frame Auto-Collector")
    parser.add_argument("--max-minutes", type=int, default=int(os.getenv("MAX_RUNTIME_MINUTES", "60")), help="Maximum runtime in minutes (default: 60)")
    parser.add_argument("--limit", type=int, default=1000, help="Max movies to collect in this run")
    args = parser.parse_args()

    max_seconds = args.max_minutes * 60
    start_time = time.time()

    print("=" * 65)
    print("SCOOPCAST FRANCHISE AUTO-FRAME COLLECTOR")
    print("Franchises: Marvel, DC, Fast & Furious, and International Blockbusters")
    print(f"Max Runtime: {args.max_minutes} minutes ({max_seconds} seconds)")
    print(f"Limit: {args.limit} new frames")
    print(f"Database: {DATA_FILE}")
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

    existing_keys = set(normalize_key(item.get("answer", "")) for item in frames_data)
    print(f"Current database has {len(frames_data)} existing movie frames.")

    # 1. Fetch Film-Grab Catalog
    catalog = fetch_filmgrab_catalog()
    catalog_by_norm = {normalize_key(m["title"]): m for m in catalog}

    # 2. Build Target Priority Queue
    target_tasks = []
    for franchise_film in PRIORITY_FRANCHISES:
        k = normalize_key(franchise_film)
        if k in existing_keys:
            continue
        if k in catalog_by_norm:
            target_tasks.append({"title": catalog_by_norm[k]["title"], "type": "filmgrab", "url": catalog_by_norm[k]["url"]})

    print(f"Queued {len(target_tasks)} targeted franchise films (Marvel, DC, Blockbusters) from Film-Grab.")

    # Add remaining Film-Grab catalog as secondary pool
    general_tasks = [
        {"title": m["title"], "type": "filmgrab", "url": m["url"]}
        for m in catalog
        if normalize_key(m["title"]) not in existing_keys and normalize_key(m["title"]) not in {normalize_key(t["title"]) for t in target_tasks}
    ]
    random.seed(int(time.time()))
    random.shuffle(general_tasks)

    all_tasks = target_tasks + general_tasks
    print(f"Total queue size: {len(all_tasks)} films.")

    added_count = 0

    for idx, task in enumerate(all_tasks, 1):
        elapsed = time.time() - start_time
        if elapsed >= max_seconds:
            print(f"\n[Timer Reached] Runtime reached {args.max_minutes} minutes. Gracefully stopping.")
            break

        if added_count >= args.limit:
            print(f"\n[Limit Reached] Reached target limit of {args.limit} frames. Stopping.")
            break

        movie_title = task["title"]
        norm_key = normalize_key(movie_title)
        if norm_key in existing_keys:
            continue

        print(f"\n[{idx}/{len(all_tasks)}] Inspecting: {movie_title} (Source: {task['type'].upper()})")

        # Extract details based on type
        if task["type"] == "filmgrab":
            details = extract_filmgrab_details(task["url"])
        else:
            details = fetch_tmdb_franchise_stills(task["query"])

        if not details or not details["stills"]:
            print("  -> No usable stills found.")
            time.sleep(0.3)
            continue

        title = details["title"]
        year = details["year"]
        stills = details["stills"]
        answer_key = title.upper().strip()

        print(f"  Title: '{title}' ({year}) | Stills Available: {len(stills)}")

        # Pick candidate stills across narrative arc
        n = len(stills)
        if n <= 4:
            picked_stills = stills
        else:
            indices = [int(n * 0.25), int(n * 0.45), int(n * 0.65), int(n * 0.80)]
            picked_stills = [stills[i] for i in dict.fromkeys(indices) if i < n]

        for still_idx, still_url in enumerate(picked_stills, 1):
            if time.time() - start_time >= max_seconds:
                break

            print(f"  -> Testing candidate still [{still_idx}/{len(picked_stills)}]: {still_url}")
            ref = task.get("url") if task["type"] == "filmgrab" else None
            raw_bytes = fetch_url(still_url, referer=ref, binary=True)
            if not raw_bytes or len(raw_bytes) < 20000:
                print("     [Skip] Image bytes too small or fetch failed.")
                continue

            verdict = verify_with_gemini(raw_bytes, title, year)
            is_frame = verdict.get("is_movie_frame", False)
            no_text = not verdict.get("has_text_or_logos", True)
            is_clear = verdict.get("is_clear_and_sharp", True)
            importance = str(verdict.get("scene_importance", "medium")).lower()
            score = verdict.get("iconic_score", 0.0)
            conf = verdict.get("confidence", 0.0)
            reason = verdict.get("reason", "")

            print(f"     Verdict: frame={is_frame} | no_text={no_text} | clear={is_clear} | importance={importance} | score={score} | conf={conf}")
            print(f"     Reason: {reason}")

            # Strict quality gate
            if is_frame and no_text and is_clear and (importance in ("high", "medium")) and conf >= 0.70 and score >= 0.65:
                print("     [VERIFIED] Frame passed quality criteria! Processing for Cloudinary...")
                try:
                    # Convert to WebP
                    im = Image.open(io.BytesIO(raw_bytes))
                    im = im.convert("RGB")
                    webp_buf = io.BytesIO()
                    im.save(webp_buf, format="WEBP", quality=88)
                    webp_bytes = webp_buf.getvalue()

                    public_id = sanitize_public_id(title, year)
                    print(f"     Uploading to Cloudinary (public_id: {public_id})...")

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
                    existing_keys.add(normalize_key(title))
                    added_count += 1

                    # Immediately persist to data/frames.json
                    with open(DATA_FILE, "w", encoding="utf-8") as f:
                        json.dump(frames_data, f, indent=2)

                    print(f"  >>> [ADDED #{len(frames_data)}] '{title} ({year})' uploaded successfully! URL: {secure_url}\n")
                    break  # Move to next movie
                except Exception as e:
                    print(f"     [Error Uploading] {e}")
            else:
                print("     [Rejected by Quality Gate] Trying next candidate...")

            time.sleep(0.4)

        time.sleep(0.4)

    total_time = int(time.time() - start_time)
    print("\n" + "=" * 65)
    print("COLLECTION RUN COMPLETED")
    print(f"Added in this run: {added_count} new movie frames")
    print(f"Total catalog size: {len(frames_data)} frames")
    print(f"Total time elapsed: {total_time // 60}m {total_time % 60}s")
    print("=" * 65)

if __name__ == "__main__":
    main()
