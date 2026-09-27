"""
Scoopcast Auto-Collector: Cinephile Screencaps (Film-Grab) + Gemini Vision AI + Cloudinary
Automates pure playback frame collection from 4,100+ cinema master stills with Gemini verification.
Focused on globally recognized, popular Hollywood & international classics.
"""

import os
import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
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

# Explicit exclusions for Indian Cinema (per user request to focus exclusively on easy/famous Hollywood/Western frames)
INDIAN_EXCLUSIONS = {
    "india", "hindi", "telugu", "tamil", "malayalam", "kannada", "bengali",
    "bollywood", "tollywood", "kollywood", "mollywood", "sandalwood",
    "satyajit ray", "mira nair", "aparajito", "pather panchali", "charulata",
    "devi", "monsoon wedding", "sholay", "lagaan", "dangal", "3 idiots",
    "rrr", "baahubali", "bahubali", "dilwale", "my name is khan", "tumbbad",
    "swades", "wasseypur", "polite society", "salaam bombay", "lunchbox",
    "jalsaghar", "kanchanjungha", "nayak", "the big city", "dev.d", "gangs of wasseypur"
}

# Universally recognized famous classics to prioritize first (fast, iconic, recognizable)
POPULAR_CLASSICS = [
    "Pulp Fiction", "The Matrix", "Inception", "Fight Club", "Interstellar",
    "Gladiator", "The Shining", "Alien", "Blade Runner", "Goodfellas",
    "Taxi Driver", "The Godfather", "The Godfather Part II", "Whiplash",
    "La La Land", "Spirited Away", "Parasite", "Joker", "No Country for Old Men",
    "There Will Be Blood", "Inglourious Basterds", "Django Unchained",
    "The Grand Budapest Hotel", "Mad Max: Fury Road", "Her", "Arrival",
    "Blade Runner 2049", "Dune", "Drive", "The Social Network",
    "Eternal Sunshine of the Spotless Mind", "Memento", "Se7en",
    "The Silence of the Lambs", "Fargo", "The Big Lebowski", "Boogie Nights",
    "Zodiac", "Prisoners", "Gone Girl", "Shutter Island", "The Departed",
    "Catch Me If You Can", "The Wolf of Wall Street", "American Psycho",
    "The Truman Show", "Requiem for a Dream", "Oldboy", "Pan's Labyrinth",
    "Leon: The Professional", "The Prestige", "Reservoir Dogs",
    "Kill Bill: Vol. 1", "Kill Bill: Vol. 2", "Children of Men",
    "Birdman", "1917", "Oppenheimer", "Barbie", "Spider-Man: Into the Spider-Verse",
    "Everything Everywhere All at Once", "Apocalypse Now", "Full Metal Jacket",
    "A Clockwork Orange", "2001: A Space Odyssey", "Schindler's List",
    "Saving Private Ryan", "Jurassic Park", "Back to the Future",
    "Terminator 2: Judgment Day", "The Terminator", "Die Hard",
    "Raiders of the Lost Ark", "Aliens", "The Thing", "Scarface",
    "Heat", "Casino", "Good Will Hunting", "The Shawshank Redemption",
    "Forrest Gump", "The Green Mile", "Cast Away", "Braveheart",
    "Titanic", "Avatar", "Nightcrawler", "Ex Machina", "Baby Driver",
    "Knives Out", "Glass Onion", "Sicario", "Dunkirk", "Tenet",
    "The Lighthouse", "The Witch", "Midsommar", "Hereditary",
    "Get Out", "Us", "Black Swan", "Stand By Me", "The Breakfast Club",
    "Ferris Bueller's Day Off", "Ghostbusters", "Jaws", "RoboCop",
    "Total Recall", "Starship Troopers", "The Sixth Sense", "Unbreakable",
    "Signs", "Minority Report", "Edge of Tomorrow", "Looper",
    "Source Code", "District 9", "Children of Men", "Gravity",
    "The Martian", "First Man", "Ford v Ferrari", "Rush",
    "Baby Driver", "Scott Pilgrim vs. the World", "Hot Fuzz", "Shaun of the Dead"
]

def is_indian_movie(title, url):
    t_low = title.lower()
    u_low = url.lower()
    for kw in INDIAN_EXCLUSIONS:
        if kw in t_low or kw in u_low:
            return True
    return False

def fetch_url(url, referer=None, binary=False):
    """Fetches a URL using curl with browser headers."""
    cmd = [CURL_BIN, "-s", "-L"]
    cmd.extend(BROWSER_HEADERS)
    if referer:
        cmd.extend(["-H", f"Referer: {referer}"])
    cmd.append(url)

    if binary:
        res = subprocess.run(cmd, capture_output=True)
        return res.stdout
    else:
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
        return res.stdout

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

    # Try primary key, fallback to backup key on failure
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
    """Fetches the 4,100+ movie catalog from Film-Grab A-Z, filtering out Indian films."""
    print("Fetching Film-Grab movies catalog (movies-a-z)...")
    html_text = fetch_url("https://film-grab.com/movies-a-z/")
    if not html_text or len(html_text) < 10000:
        print(f"Warning: Failed or short HTML response ({len(html_text)} bytes).")
        return []

    matches = re.findall(r'<a\s+[^>]*href=["\'](https://film-grab\.com/\d{4}/\d{2}/\d{2}/[^/"\']+/?)["\'][^>]*>(.*?)</a>', html_text, re.DOTALL)
    catalog = []
    seen_urls = set()

    for post_url, raw_title in matches:
        if post_url in seen_urls:
            continue
        seen_urls.add(post_url)
        clean_title = clean_movie_title(raw_title)

        # Skip Indian movies explicitly
        if is_indian_movie(clean_title, post_url):
            continue

        if clean_title and len(clean_title) >= 2:
            catalog.append({
                "title": clean_title,
                "url": post_url
            })

    print(f"Discovered {len(catalog)} eligible non-Indian films in Film-Grab archive.")
    return catalog

def extract_movie_details(post_url):
    """Fetches movie post and extracts title, year, and high-res stills."""
    post_html = fetch_url(post_url)
    if not post_html or len(post_html) < 2000:
        return None

    # Title extraction
    og_title = re.search(r'<meta property="og:title" content="([^"]+)"', post_html)
    if og_title:
        title = clean_movie_title(og_title.group(1))
    else:
        h1 = re.search(r'<h1 class="entry-title">([^<]+)</h1>', post_html)
        title = clean_movie_title(h1.group(1)) if h1 else ""

    if not title or is_indian_movie(title, post_url):
        return None

    # Year extraction (from og:description "[Director – Year]" or post URL)
    year = ""
    og_desc = re.search(r'<meta property="og:description" content="([^"]+)"', post_html)
    if og_desc:
        ym = re.search(r'\b(19\d{2}|20\d{2})\b', og_desc.group(1))
        if ym:
            year = ym.group(1)

    if not year:
        url_ym = re.search(r'film-grab\.com/(\d{4})/', post_url)
        year = url_ym.group(1) if url_ym else "2020"

    # Extract all stills
    raw_imgs = re.findall(
        r'["\'](https?://film-grab\.com/wp-content/uploads/(?:photo-gallery/|(?:\d{4}/\d{2}/))[^"\']+\.(?:jpg|jpeg|png)(?:\?[^"\']*)?)["\']',
        post_html,
        re.IGNORECASE
    )

    stills = []
    seen = set()

    for raw in raw_imgs:
        clean = raw.split("?")[0]
        # Remove thumbnails and downscaled sizes
        clean = clean.replace("/thumb/", "/")
        if re.search(r'-\d+x\d+\.(?:jpg|jpeg|png)$', clean, re.IGNORECASE):
            continue
        if any(bad in clean.lower() for bad in ["icon", "logo", "banner", "avatar", "cropped", "wp-content/uploads/2019/02/icon"]):
            continue

        # Properly quote spaces and unicode chars in URL path
        parsed = urllib.parse.urlsplit(clean)
        encoded_path = urllib.parse.quote(urllib.parse.unquote(parsed.path))
        final_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, encoded_path, "", ""))

        if final_url not in seen:
            seen.add(final_url)
            stills.append(final_url)

    return {
        "title": title,
        "year": str(year),
        "stills": stills
    }

def main():
    parser = argparse.ArgumentParser(description="Scoopcast Auto-Collector (Film-Grab + Gemini AI + Cloudinary)")
    parser.add_argument("--max-minutes", type=int, default=int(os.getenv("MAX_RUNTIME_MINUTES", "60")), help="Maximum runtime in minutes (default: 60)")
    parser.add_argument("--limit", type=int, default=1000, help="Max movies to collect in this run")
    parser.add_argument("--no-shuffle", action="store_true", help="Do not shuffle general candidates")
    args = parser.parse_args()

    max_seconds = args.max_minutes * 60
    start_time = time.time()

    print("=" * 65)
    print("SCOOPCAST AUTO-FRAME COLLECTOR (FILM-GRAB CINEPHILE ARCHIVE)")
    print("Focus: Iconic, famous Hollywood & international hits (Zero Indian films)")
    print(f"Max Runtime: {args.max_minutes} minutes ({max_seconds} seconds)")
    print(f"Limit: {args.limit} new frames")
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

    # Map of normalized keys to avoid duplicates
    existing_keys = set(normalize_key(item.get("answer", "")) for item in frames_data)
    print(f"Current database has {len(frames_data)} existing movie frames.")

    # 1. Fetch catalog
    catalog = fetch_filmgrab_catalog()
    if not catalog:
        print("Error: Could not retrieve movie catalog. Exiting.")
        return

    # Map catalog by normalized title for quick lookup
    catalog_by_norm = {normalize_key(m["title"]): m for m in catalog}

    # 2. Prioritize Popular Classics first!
    prioritized_candidates = []
    seen_in_priority = set()

    for famous_title in POPULAR_CLASSICS:
        k = normalize_key(famous_title)
        if k in catalog_by_norm and k not in existing_keys and k not in seen_in_priority:
            seen_in_priority.add(k)
            prioritized_candidates.append(catalog_by_norm[k])

    print(f"Queued {len(prioritized_candidates)} universally famous classics as Tier 1 priority.")

    # General candidates (the rest of Film-Grab catalog, excluding existing & priority)
    general_candidates = [
        m for m in catalog
        if normalize_key(m["title"]) not in existing_keys and normalize_key(m["title"]) not in seen_in_priority
    ]

    if not args.no_shuffle:
        random.seed(int(time.time()))
        random.shuffle(general_candidates)

    # Combined candidate pipeline: Famous classics first, then diverse general catalog
    all_candidates = prioritized_candidates + general_candidates
    print(f"Total eligible new candidates: {len(all_candidates)}")

    added_count = 0

    for idx, movie in enumerate(all_candidates, 1):
        elapsed = time.time() - start_time
        if elapsed >= max_seconds:
            print(f"\n[Timer Reached] Runtime reached {args.max_minutes} minutes. Gracefully stopping.")
            break

        if added_count >= args.limit:
            print(f"\n[Limit Reached] Reached target limit of {args.limit} frames. Stopping.")
            break

        movie_title = movie["title"]
        norm_key = normalize_key(movie_title)
        if norm_key in existing_keys:
            continue

        print(f"\n[{idx}/{len(all_candidates)}] Inspecting: {movie_title} -> {movie['url']}")
        details = extract_movie_details(movie["url"])
        if not details or not details["stills"]:
            print("  -> No usable stills found on page.")
            time.sleep(0.4)
            continue

        title = details["title"]
        year = details["year"]
        stills = details["stills"]
        answer_key = title.upper().strip()

        print(f"  Title: '{title}' ({year}) | Available Stills: {len(stills)}")

        # Pick up to 4 high-yield candidates (spaced across 25% to 80% of the film)
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
            raw_bytes = fetch_url(still_url, referer=movie["url"], binary=True)
            if not raw_bytes or len(raw_bytes) < 20000:
                print("     [Skip] Image bytes too small or fetch failed.")
                continue

            # Verify with Gemini Vision
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
                    # Convert to optimized WebP
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
