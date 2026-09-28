"""
Scoopcast High-Speed Local Frame Farmer (Target: 10+ frames/minute)
- Multi-threaded parallel workers (ThreadPoolExecutor)
- Film-Grab 1080p Blu-ray cinema master frames
- Dual-key Gemini Vision AI verification (Round-Robin load balancing)
- PIL WebP optimization + Cloudinary upload (folder: scoopcast_frames)
- Thread-safe real-time persistence to data/frames.json
- Live speedometer tracking frames/minute
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
import threading
import itertools
from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.request
import urllib.parse
import urllib.error
import io
from PIL import Image

try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("Error: cloudinary library not found. Run: pip install cloudinary")
    sys.exit(1)

# ═══ 1. LOAD CONFIGURATION (.env.local) ═══
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(ROOT_DIR, ".env.local")
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

GEMINI_KEY_1 = os.getenv("GEMINI_API_KEY", "")
GEMINI_KEY_2 = os.getenv("GEMINI_API_KEY_BACKUP", "")

GEMINI_KEYS = [k for k in [GEMINI_KEY_1, GEMINI_KEY_2] if k]
if not GEMINI_KEYS:
    print("Warning: No GEMINI_API_KEY found in .env.local!")

key_cycle = itertools.cycle(GEMINI_KEYS)
key_cycle_lock = threading.Lock()

def get_next_gemini_key():
    with key_cycle_lock:
        return next(key_cycle) if GEMINI_KEYS else ""

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True
)

DATA_FILE = os.path.join(ROOT_DIR, "data", "frames.json")
CURL_BIN = "curl.exe" if sys.platform == "win32" else "curl"

BROWSER_HEADERS = [
    "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "-H", "Accept-Language: en-US,en;q=0.9",
]

INDIAN_EXCLUSIONS = {
    "india", "hindi", "telugu", "tamil", "malayalam", "kannada", "bengali",
    "bollywood", "tollywood", "kollywood", "mollywood", "sandalwood",
    "satyajit ray", "mira nair", "aparajito", "pather panchali", "charulata",
    "devi", "monsoon wedding", "sholay", "lagaan", "dangal", "3 idiots",
    "rrr", "baahubali", "bahubali", "dilwale", "my name is khan", "tumbbad",
    "swades", "wasseypur", "polite society", "salaam bombay", "lunchbox"
}

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

SEXUAL_AND_ADULT_EXCLUSIONS = {
    "erotic", "sex", "nude", "nudity", "porn", "nekromantik", "lolita", "sensual",
    "lust", "passion", "orgy", "strip", "prostitut", "brothel", "fetish", "bdsm",
    "sadomasochis", "antichrist", "benedetta", "nymphomaniac", "caligula", "flesh",
    "salò", "salo", "emmanuelle", "showgirls", "fatal attraction", "basic instinct",
    "wild things", "eyes wide shut", "blue is the warmest", "50 shades", "fifty shades",
    "shortbus", "love (2015)", "crash (1996)", "tie me up", "bad education", "quills",
    "secretary", "the dreamers", "lie with me", "lust, caution", "intimacy", "polyester",
    "pink flamingos", "sweet movie", "deep water", "titane", "happiness", "lifeforce",
    "kokomo city", "infinity pool", "red rocket", "desert hearts", "the margin",
    "babylon", "love lies bleeding", "the whip and the body", "the naked kiss",
    "femme fatale", "the night porter", "the untamed", "xxxholic", "flashdance"
}

def is_sexual_or_adult_movie(title, url=""):
    t_low = title.lower()
    u_low = url.lower()
    for kw in SEXUAL_AND_ADULT_EXCLUSIONS:
        if kw in t_low or kw in u_low:
            return True
    return False

def is_indian_movie(title, url=""):
    t_low = title.lower()
    u_low = url.lower()
    for kw in INDIAN_EXCLUSIONS:
        if kw in t_low or kw in u_low:
            return True
    return False

def clean_movie_title(raw_title):
    t = html.unescape(raw_title)
    t = t.replace("\u2018", "'").replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    t = t.replace("\u2013", "-").replace("\u2014", "-")
    t = re.sub(r'<[^>]+>', '', t)
    t = re.sub(r'\s*[-–]\s*\[?FILMGRAB\]?.*', '', t, flags=re.IGNORECASE)
    t = re.sub(r'^\s*[\'\"]|[\'\"]\s*$', '', t)
    return t.strip()

def normalize_key(title):
    clean = re.sub(r'\s*\(\d{4}\)\s*$', '', title)
    return re.sub(r'[^A-Z0-9]', '', clean.upper())

def sanitize_public_id(title, year):
    clean = re.sub(r"[^\w\s-]", "", title.replace("&", "and")).strip()
    clean = re.sub(r"[-\s]+", "_", clean)
    return f"{clean}_{year}"

def fetch_url(url, referer=None, binary=False):
    """Fast URL fetch using curl with connect timeout."""
    cmd = [CURL_BIN, "-s", "-L", "--max-time", "12", "--connect-timeout", "6"]
    cmd.extend(BROWSER_HEADERS)
    if referer:
        cmd.extend(["-H", f"Referer: {referer}"])
    cmd.append(url)

    try:
        if binary:
            res = subprocess.run(cmd, capture_output=True, timeout=14)
            return res.stdout
        else:
            res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=14)
            return res.stdout
    except Exception:
        return b"" if binary else ""

def verify_with_gemini(img_bytes, movie_title, year):
    """Verifies a movie frame via Gemini Vision API with automatic key rotation."""
    b64 = base64.b64encode(img_bytes).decode("utf-8")
    prompt = f"""You are an elite film cinematography analyst and frame verifier for a "Guess the Movie from a Frame" game.
Determine if this image is a high-quality, authentic, pure MOVIE PLAYBACK FRAME from: "{movie_title} ({year})".

CRITICAL EVALUATION CRITERIA:
1. PURE PLAYBACK FRAME WITH STRICT ZERO TEXT:
   - Genuine screenshot captured directly from film video playback.
   - ABSOLUTELY ZERO TEXT: ZERO marketing text, ZERO title cards, ZERO actor/crew credits, ZERO subtitles, ZERO closed captions, ZERO location/time overlays (e.g. 'Paris, 1999', 'Chapter 1'), ZERO studio logos, and ZERO watermarks.
   - If ANY overlay text, subtitles, or credits appear anywhere in the frame, set 'has_text_or_logos': true immediately.
   - NOT promotional art, NOT a poster, NOT concept art, NOT behind-the-scenes film crew photo.
2. MIDDLE OF MOVIE ONLY (NO INTRO / NO OUTRO):
   - MUST be a live narrative scene from the body/middle of the movie.
   - REJECT opening title sequences, studio logo cards, intro credits, ending resolution cards, and closing/end credits.
   - If from the intro or outro, set 'is_middle_scene': false.
3. VISUAL CLARITY & AESTHETICS:
   - Crisp, sharp, well-exposed, and in focus. Reject pitch-black, severely underexposed, muddy, or pixelated.
4. SCENE IMPORTANCE & MEMORABILITY:
   - Must depict an important, iconic, or memorable moment (key characters, intense dialogue beats, climactic set pieces, iconic locations, or signature cinematography).
   - Reject boring filler frames (empty wall, blurry foot, transitional highway, nondescript door).

5. ZERO SEXUAL / NSFW / ADULT CONTENT:
   - ABSOLUTELY ZERO nudity (full or partial, male or female), zero lingerie/underwear exposure, zero sexual acts, zero erotic posing, zero suggestive intimate scenes, zero sexually explicit themes.
   - If ANY sexual content, nudity, or adult theme is present in the frame, set 'has_sexual_content': true immediately.

Rate:
- 'is_clear_and_sharp': true if high visual clarity and crisp detail, false otherwise.
- 'is_middle_scene': true if from the core narrative middle of the movie, false if intro/outro/credits.
- 'has_text_or_logos': true if ANY text, subtitles, credits, titles, or logos exist.
- 'has_sexual_content': true if ANY nudity, sexual acts, or suggestive adult content exists, false otherwise.
- 'scene_importance': "high" | "medium" | "low".
- 'iconic_score': 0.0 to 1.0.

Return strict JSON:
{{
  "is_movie_frame": boolean,
  "confidence": number,
  "has_text_or_logos": boolean,
  "has_sexual_content": boolean,
  "is_middle_scene": boolean,
  "is_clear_and_sharp": boolean,
  "scene_importance": "high" | "medium" | "low",
  "iconic_score": number,
  "reason": "1 concise sentence explaining the visual content and confirming zero text, zero sexual content, and middle scene"
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

    # Try with model and key rotation and jittered backoff for multi-worker scaling
    candidate_models = ["gemini-3.1-flash-lite", "gemini-flash-lite-latest", "gemini-3.5-flash-lite"]
    keys_tried = 0
    max_attempts = max(6, len(GEMINI_KEYS) * len(candidate_models))
    while keys_tried < max_attempts:
        api_key = get_next_gemini_key()
        model_name = candidate_models[(keys_tried // len(GEMINI_KEYS)) % len(candidate_models)]
        keys_tried += 1
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                raw = res["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(raw)
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                time.sleep(0.8 + random.uniform(0.1, 0.5))
                continue
            if e.code in (403, 404):
                continue
            break
        except Exception:
            break

    return {"is_movie_frame": False, "confidence": 0, "has_text_or_logos": True, "iconic_score": 0, "reason": "Verification failed"}

def fetch_filmgrab_catalog():
    print("[1/3] Fetching Film-Grab master catalog (movies-a-z)...")
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

        if is_indian_movie(clean_title, post_url) or is_sexual_or_adult_movie(clean_title, post_url):
            continue

        m_date = re.search(r'film-grab\.com/(\d{4})/(\d{2})/(\d{2})/', post_url)
        post_date = int(m_date.group(1) + m_date.group(2) + m_date.group(3)) if m_date else 0

        if clean_title and len(clean_title) >= 2:
            catalog.append({
                "title": clean_title,
                "url": post_url,
                "post_date": post_date
            })

    print(f"[1/3] Discovered {len(catalog)} eligible non-Indian films in Film-Grab archive.")
    return catalog

def extract_filmgrab_details(post_url):
    post_html = fetch_url(post_url)
    if not post_html or len(post_html) < 2000:
        return None

    og_title = re.search(r'<meta property="og:title" content="([^"]+)"', post_html)
    if og_title:
        title = clean_movie_title(og_title.group(1))
    else:
        h1 = re.search(r'<h1 class="entry-title">([^<]+)</h1>', post_html)
        title = clean_movie_title(h1.group(1)) if h1 else ""

    if not title or is_indian_movie(title, post_url) or is_sexual_or_adult_movie(title, post_url):
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
        "url": post_url
    }

# ═══ 2. MULTI-THREADED WORKER PIPELINE ═══
db_lock = threading.Lock()
stats_lock = threading.Lock()
added_count = 0
start_time = 0

def process_single_movie(task, frames_data, existing_keys, max_seconds):
    global added_count
    elapsed = time.time() - start_time
    if elapsed >= max_seconds:
        return None

    movie_title = task["title"]
    if is_sexual_or_adult_movie(movie_title, task.get("url", "")):
        return None
    norm_k = normalize_key(movie_title)

    with db_lock:
        if norm_k in existing_keys:
            return None

    details = extract_filmgrab_details(task["url"])
    if not details or not details["stills"]:
        return None

    title = details["title"]
    year = details["year"]
    stills = details["stills"]
    answer_key = title.upper().strip()

    # Pick 4 well-spread candidate stills across the movie
    # Pick candidate stills STRICTLY from the deep narrative middle (38% to 65%)
    # This completely eliminates beginning (intro, studio logos, title cards) and outro (ending, credits)
    n = len(stills)
    if n <= 4:
        candidates = stills
    else:
        indices = [int(n * 0.38), int(n * 0.46), int(n * 0.54), int(n * 0.62)]
        candidates = [stills[i] for i in dict.fromkeys(indices) if 0 <= i < n]

    for cand_url in candidates:
        if time.time() - start_time >= max_seconds:
            return None

        raw_bytes = fetch_url(cand_url, referer=details["url"], binary=True)
        if not raw_bytes or len(raw_bytes) < 30000:
            continue

        # ── STRICT 1080p QUALITY GATE ──
        # Cinema standards: 16:9 (1920x1080), 1.85:1 (1920x1038), 2.39:1 Scope (1920x803)
        # Any image below 1920 width and below 1080 height is rejected immediately
        try:
            im = Image.open(io.BytesIO(raw_bytes))
            w, h = im.size
            if w < 1280 or (w < 1920 and h < 1080) or w <= h:
                continue
        except Exception:
            continue

        verdict = verify_with_gemini(raw_bytes, title, year)
        is_frame = verdict.get("is_movie_frame", False)
        no_text = not verdict.get("has_text_or_logos", True)
        no_sexual = not verdict.get("has_sexual_content", False)
        is_middle = verdict.get("is_middle_scene", True)
        is_clear = verdict.get("is_clear_and_sharp", True)
        importance = str(verdict.get("scene_importance", "medium")).lower()
        score = verdict.get("iconic_score", 0.0)
        conf = verdict.get("confidence", 0.0)

        # Quality gate: 1080p + Zero Text + Zero Sexual/Adult Content + Middle Story Scene + Clear + Iconic
        if is_frame and no_text and no_sexual and is_middle and is_clear and (importance in ("high", "medium")) and conf >= 0.70 and score >= 0.40:
            try:
                public_id = sanitize_public_id(title, year)

                # Upload 100% uncompressed raw master image directly to Cloudinary (zero compression, pure original quality)
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

                # Thread-safe write to database & disk
                with db_lock:
                    if norm_k in existing_keys:
                        return None
                    frames_data.append(entry)
                    existing_keys.add(norm_k)
                    tmp_file = DATA_FILE + ".tmp"
                    with open(tmp_file, "w", encoding="utf-8") as f:
                        json.dump(frames_data, f, indent=2)
                    os.replace(tmp_file, DATA_FILE)

                with stats_lock:
                    added_count += 1
                    current_added = added_count
                    cur_elapsed = max(1, time.time() - start_time)
                    rpm = (current_added / cur_elapsed) * 60.0

                    if current_added % 50 == 0:
                        try:
                            catalog_script = os.path.join(os.path.dirname(__file__), "update_backend_catalog.py")
                            subprocess.run([sys.executable, catalog_script], timeout=30)
                            subprocess.run(["git", "add", "data/frames.json", "guess-the-frame-colyseus/src/data/catalog.ts"], timeout=15)
                            subprocess.run(["git", "commit", "-m", f"feat(frames): milestone +{current_added} frames (total: {len(frames_data)}) [skip ci]"], timeout=15)
                            subprocess.run(["git", "push", "origin", "main"], timeout=30)
                            print(f"📦 [Milestone Sync] Synced +{current_added} frames to GitHub main!")
                        except Exception as sync_err:
                            print(f"Milestone sync note: {sync_err}")

                print(f"[+{current_added}] '{title} ({year})' [{w}x{h} HD] UPLOADED! ({rpm:.1f} frames/min) -> {secure_url}")
                return entry

            except Exception as e:
                # Cloudinary or PIL error
                continue

    return None

def main():
    global start_time, added_count
    parser = argparse.ArgumentParser(description="Scoopcast High-Speed Local Frame Farmer")
    parser.add_argument("--workers", type=int, default=4, help="Number of concurrent worker threads (default: 4)")
    parser.add_argument("--limit", type=int, default=100, help="Target number of frames to add (default: 100)")
    parser.add_argument("--max-minutes", type=int, default=30, help="Maximum runtime in minutes (default: 30)")
    args = parser.parse_args()

    max_seconds = args.max_minutes * 60
    start_time = time.time()

    print("=" * 70)
    print("🚀 SCOOPCAST HIGH-SPEED LOCAL FRAME FARMER")
    print(f"Target Speed: MINIMUM 10+ frames/minute")
    print(f"Workers: {args.workers} concurrent threads")
    print(f"Limit: {args.limit} new frames | Max Runtime: {args.max_minutes} mins")
    print(f"Cloudinary: {CLOUDINARY_CLOUD_NAME} (folder: scoopcast_frames)")
    print(f"Database: {DATA_FILE}")
    print("=" * 70)

    # Load existing database
    frames_data = []
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            try:
                frames_data = json.load(f)
            except Exception:
                frames_data = []

    existing_keys = set(normalize_key(item.get("answer", "")) for item in frames_data)
    print(f"Current database has {len(frames_data)} existing movie frames.\n")

    # Fetch catalog
    catalog = fetch_filmgrab_catalog()
    catalog_by_norm = {normalize_key(m["title"]): m for m in catalog}

    # Build queue: Priority Blockbusters first, then catalog
    target_tasks = []
    for franchise_film in PRIORITY_FRANCHISES:
        k = normalize_key(franchise_film)
        if k in existing_keys:
            continue
        if k in catalog_by_norm:
            target_tasks.append({
                "title": catalog_by_norm[k]["title"],
                "url": catalog_by_norm[k]["url"],
                "post_date": catalog_by_norm[k].get("post_date", 0)
            })

    # Sort priority blockbusters by post_date descending (newer 1080p Blu-ray masters first)
    target_tasks = [t for t in target_tasks if t.get("post_date", 0) >= 20210101]
    target_tasks.sort(key=lambda x: x.get("post_date", 0), reverse=True)

    general_tasks = [
        {"title": m["title"], "url": m["url"], "post_date": m.get("post_date", 0)}
        for m in catalog
        if normalize_key(m["title"]) not in existing_keys and normalize_key(m["title"]) not in {normalize_key(t["title"]) for t in target_tasks}
    ]

    # Split into pristine modern HD era (2021-2026: 100% 1080p) and earlier posts
    recent_general = [m for m in general_tasks if m.get("post_date", 0) >= 20210101]
    older_general = [m for m in general_tasks if m.get("post_date", 0) < 20210101]

    random.seed(42)
    random.shuffle(recent_general)
    random.shuffle(older_general)

    all_tasks = target_tasks + recent_general + older_general
    print(f"[2/3] Built queue: {len(target_tasks)} priority blockbusters + {len(recent_general)} modern 1080p masters + {len(older_general)} archive films ({len(all_tasks)} total).")
    print(f"[3/3] Launching ThreadPoolExecutor with {args.workers} workers...\n")

    # Launch parallel threads
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = []
        for task in all_tasks:
            if added_count >= args.limit or (time.time() - start_time) >= max_seconds:
                break
            futures.append(executor.submit(process_single_movie, task, frames_data, existing_keys, max_seconds))

        for f in as_completed(futures):
            if added_count >= args.limit or (time.time() - start_time) >= max_seconds:
                print("\nTarget limit or time reached. Wrapping up workers...")
                executor.shutdown(wait=False, cancel_futures=True)
                break

    total_time = int(time.time() - start_time)
    avg_speed = (added_count / max(1, total_time)) * 60.0
    print("\n" + "=" * 70)
    print("FARMING SESSION FINISHED")
    print(f"Added in this session: {added_count} new movie frames")
    print(f"Total database frames: {len(frames_data)}")
    print(f"Total time: {total_time // 60}m {total_time % 60}s")
    print(f"Average Speed: {avg_speed:.1f} frames/minute")
    print("=" * 70)

    # Final git sync upon completion
    if added_count > 0:
        try:
            catalog_script = os.path.join(os.path.dirname(__file__), "update_backend_catalog.py")
            subprocess.run([sys.executable, catalog_script], timeout=30)
            subprocess.run(["git", "add", "data/frames.json", "guess-the-frame-colyseus/src/data/catalog.ts"], timeout=15)
            subprocess.run(["git", "commit", "-m", f"feat(frames): successfully harvested {added_count} new 1080p frames (total: {len(frames_data)}) [skip ci]"], timeout=15)
            subprocess.run(["git", "push", "origin", "main"], timeout=30)
            print("📦 Successfully pushed all newly farmed frames to GitHub main!")
        except Exception as e:
            print(f"Git final push note: {e}")

if __name__ == "__main__":
    main()
