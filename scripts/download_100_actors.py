import os
import sys
import json
import time
import urllib.request
import urllib.parse
import cv2
import numpy as np
from PIL import Image

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
DEST_DIR = os.path.join(ROOT_DIR, "GUESSTHEEYES")
EYES_CATALOG_PATH = os.path.join(ROOT_DIR, "guess-the-frame-colyseus", "src", "data", "eyesCatalog.ts")

# Read API credentials
API_KEY = "febd351cb18c057ef65bd6cd832966b6"
BASE_URL = "https://api.themoviedb.org/3"
IMG_BASE = "https://image.tmdb.org/t/p/original"

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

MALE_ACTORS = [
    # ── 50 FAMOUS INDIAN MALE ACTORS ──
    {"name": "Amitabh Bachchan", "aliases": ["BIG B", "AMITABH"], "tag": "bollywood"},
    {"name": "Salman Khan", "aliases": ["BHAI", "SALLU", "SALMAN"], "tag": "bollywood"},
    {"name": "Aamir Khan", "aliases": ["AAMIR"], "tag": "bollywood"},
    {"name": "Akshay Kumar", "aliases": ["AKSHAY", "KHILADI"], "tag": "bollywood"},
    {"name": "Ajay Devgn", "aliases": ["AJAY DEVGAN", "AJAY"], "tag": "bollywood"},
    {"name": "Hrithik Roshan", "aliases": ["HRITHIK", "DUGGU"], "tag": "bollywood"},
    {"name": "Ranbir Kapoor", "aliases": ["RANBIR"], "tag": "bollywood"},
    {"name": "Ranveer Singh", "aliases": ["RANVEER"], "tag": "bollywood"},
    {"name": "Prabhas", "aliases": ["DARLING", "BAAHUBALI"], "tag": "bollywood"},
    {"name": "Allu Arjun", "aliases": ["BUNNY", "PUSHPA"], "tag": "bollywood"},
    {"name": "Ram Charan", "aliases": ["MEGA POWER STAR", "RAM CHARAN TEJA"], "tag": "bollywood"},
    {"name": "N. T. Rama Rao Jr.", "aliases": ["JR NTR", "NTR JR", "TARAK"], "tag": "bollywood"},
    {"name": "Rajinikanth", "aliases": ["THALAIVAR", "SUPERSTAR RAJINIKANTH"], "tag": "bollywood"},
    {"name": "Kamal Haasan", "aliases": ["ULAGANAYAGAN", "KAMAL HASSAN"], "tag": "bollywood"},
    {"name": "Thalapathy Vijay", "aliases": ["VIJAY", "JOSEPH VIJAY"], "tag": "bollywood"},
    {"name": "Ajith Kumar", "aliases": ["THALA", "AJITH"], "tag": "bollywood"},
    {"name": "Suriya", "aliases": ["SURYA", "SURIYA SIVAKUMAR"], "tag": "bollywood"},
    {"name": "Dhanush", "aliases": ["VENKATESH PRABHU"], "tag": "bollywood"},
    {"name": "Vikram", "aliases": ["CHIYAAN VIKRAM", "KENNEDY JOHN VICTOR"], "tag": "bollywood"},
    {"name": "Mohanlal", "aliases": ["LALETTAN"], "tag": "bollywood"},
    {"name": "Mammootty", "aliases": ["MAMMUKKA"], "tag": "bollywood"},
    {"name": "Fahadh Faasil", "aliases": ["FAHADH", "FAFA"], "tag": "bollywood"},
    {"name": "Yash", "aliases": ["ROCKY BHAI", "NAVEEN KUMAR GOWDA"], "tag": "bollywood"},
    {"name": "Rishab Shetty", "aliases": ["RISHAB"], "tag": "bollywood"},
    {"name": "Shahid Kapoor", "aliases": ["SHAHID"], "tag": "bollywood"},
    {"name": "Saif Ali Khan", "aliases": ["SAIF", "CHHOTE NAWAB"], "tag": "bollywood"},
    {"name": "Varun Dhawan", "aliases": ["VARUN"], "tag": "bollywood"},
    {"name": "Sidharth Malhotra", "aliases": ["SIDHARTH", "SID MALHOTRA"], "tag": "bollywood"},
    {"name": "Kartik Aaryan", "aliases": ["KARTIK", "KARTIK TIWARI"], "tag": "bollywood"},
    {"name": "Ayushmann Khurrana", "aliases": ["AYUSHMANN"], "tag": "bollywood"},
    {"name": "Vicky Kaushal", "aliases": ["VICKY"], "tag": "bollywood"},
    {"name": "Rajkummar Rao", "aliases": ["RAJKUMMAR", "RAJKUMAR RAO"], "tag": "bollywood"},
    {"name": "Nawazuddin Siddiqui", "aliases": ["NAWAZ"], "tag": "bollywood"},
    {"name": "Manoj Bajpayee", "aliases": ["MANOJ BAJPAYI"], "tag": "bollywood"},
    {"name": "Pankaj Tripathi", "aliases": ["PANKAJ"], "tag": "bollywood"},
    {"name": "Sanjay Dutt", "aliases": ["SANJU", "SANJAY"], "tag": "bollywood"},
    {"name": "Suniel Shetty", "aliases": ["SUNIL SHETTY", "ANNA"], "tag": "bollywood"},
    {"name": "Anil Kapoor", "aliases": ["ANIL"], "tag": "bollywood"},
    {"name": "Jackie Shroff", "aliases": ["JAGGU DADA", "JACKIE"], "tag": "bollywood"},
    {"name": "Govinda", "aliases": ["CHI CHI", "GOVINDA AHUJA"], "tag": "bollywood"},
    {"name": "Sunny Deol", "aliases": ["AJAY SINGH DEOL", "SUNNY"], "tag": "bollywood"},
    {"name": "Bobby Deol", "aliases": ["LORD BOBBY", "VIJAY SINGH DEOL"], "tag": "bollywood"},
    {"name": "John Abraham", "aliases": ["JOHN"], "tag": "bollywood"},
    {"name": "Emraan Hashmi", "aliases": ["EMRAAN"], "tag": "bollywood"},
    {"name": "Tiger Shroff", "aliases": ["JAI HEMANT SHROFF", "TIGER"], "tag": "bollywood"},
    {"name": "R. Madhavan", "aliases": ["MADHAVAN", "MADDY"], "tag": "bollywood"},
    {"name": "Vijay Sethupathi", "aliases": ["MAKKAL SELVAN"], "tag": "bollywood"},
    {"name": "Sivakarthikeyan", "aliases": ["SK"], "tag": "bollywood"},
    {"name": "Mahesh Babu", "aliases": ["PRINCE", "MAHESH"], "tag": "bollywood"},
    {"name": "Diljit Dosanjh", "aliases": ["DILJIT"], "tag": "bollywood"},

    # ── 50 FAMOUS HOLLYWOOD & INTERNATIONAL MALE ACTORS ──
    {"name": "Tom Cruise", "aliases": ["TOM"], "tag": "classic"},
    {"name": "Brad Pitt", "aliases": ["BRAD"], "tag": "classic"},
    {"name": "Johnny Depp", "aliases": ["CAPTAIN JACK SPARROW", "DEPP"], "tag": "classic"},
    {"name": "Robert Downey Jr.", "aliases": ["RDJ", "IRON MAN", "ROBERT DOWNEY JR"], "tag": "classic"},
    {"name": "Christian Bale", "aliases": ["BALE", "BATMAN"], "tag": "classic"},
    {"name": "Keanu Reeves", "aliases": ["KEANU", "JOHN WICK", "NEO"], "tag": "classic"},
    {"name": "Cillian Murphy", "aliases": ["CILLIAN", "TOMMY SHELBY"], "tag": "classic"},
    {"name": "Ryan Gosling", "aliases": ["RYAN"], "tag": "classic"},
    {"name": "Ryan Reynolds", "aliases": ["DEADPOOL"], "tag": "classic"},
    {"name": "Chris Hemsworth", "aliases": ["THOR", "CHRIS"], "tag": "classic"},
    {"name": "Chris Evans", "aliases": ["CAPTAIN AMERICA"], "tag": "classic"},
    {"name": "Chris Pratt", "aliases": ["STAR LORD"], "tag": "classic"},
    {"name": "Henry Cavill", "aliases": ["SUPERMAN", "THE WITCHER"], "tag": "classic"},
    {"name": "Tom Hardy", "aliases": ["HARDY", "VENOM"], "tag": "classic"},
    {"name": "Hugh Jackman", "aliases": ["WOLVERINE"], "tag": "classic"},
    {"name": "Matthew McConaughey", "aliases": ["MATTHEW"], "tag": "classic"},
    {"name": "Joaquin Phoenix", "aliases": ["JOKER", "JOAQUIN"], "tag": "classic"},
    {"name": "Denzel Washington", "aliases": ["DENZEL"], "tag": "classic"},
    {"name": "Morgan Freeman", "aliases": ["FREEMAN"], "tag": "classic"},
    {"name": "Samuel L. Jackson", "aliases": ["SAMUEL L JACKSON", "SAM JACKSON"], "tag": "classic"},
    {"name": "Al Pacino", "aliases": ["PACINO"], "tag": "classic"},
    {"name": "Robert De Niro", "aliases": ["DE NIRO"], "tag": "classic"},
    {"name": "Tom Hanks", "aliases": ["HANKS"], "tag": "classic"},
    {"name": "Harrison Ford", "aliases": ["INDIANA JONES", "HAN SOLO"], "tag": "classic"},
    {"name": "Will Smith", "aliases": ["FRESH PRINCE"], "tag": "classic"},
    {"name": "Matt Damon", "aliases": ["BOURNE", "DAMON"], "tag": "classic"},
    {"name": "Ben Affleck", "aliases": ["AFFLECK"], "tag": "classic"},
    {"name": "George Clooney", "aliases": ["CLOONEY"], "tag": "classic"},
    {"name": "Daniel Craig", "aliases": ["JAMES BOND", "007"], "tag": "classic"},
    {"name": "Jake Gyllenhaal", "aliases": ["GYLLENHAAL"], "tag": "classic"},
    {"name": "Benedict Cumberbatch", "aliases": ["DOCTOR STRANGE", "SHERLOCK"], "tag": "classic"},
    {"name": "Tom Hiddleston", "aliases": ["LOKI"], "tag": "classic"},
    {"name": "Michael Fassbender", "aliases": ["MAGNETO", "FASSBENDER"], "tag": "classic"},
    {"name": "Javier Bardem", "aliases": ["BARDEM"], "tag": "classic"},
    {"name": "Pedro Pascal", "aliases": ["MANDALORIAN", "PASCAL"], "tag": "classic"},
    {"name": "Timothée Chalamet", "aliases": ["TIMOTHEE CHALAMET", "CHALAMET"], "tag": "classic"},
    {"name": "Austin Butler", "aliases": ["ELVIS"], "tag": "classic"},
    {"name": "Paul Mescal", "aliases": ["MESCAL"], "tag": "classic"},
    {"name": "Andrew Garfield", "aliases": ["SPIDER-MAN", "GARFIELD"], "tag": "classic"},
    {"name": "Michael B. Jordan", "aliases": ["MICHAEL B JORDAN", "CREED"], "tag": "classic"},
    {"name": "Jason Statham", "aliases": ["STATHAM"], "tag": "classic"},
    {"name": "Dwayne Johnson", "aliases": ["THE ROCK"], "tag": "classic"},
    {"name": "Vin Diesel", "aliases": ["DOM TORETTO", "DIESEL"], "tag": "classic"},
    {"name": "Mark Wahlberg", "aliases": ["WAHLBERG"], "tag": "classic"},
    {"name": "Nicolas Cage", "aliases": ["NICK CAGE", "CAGE"], "tag": "classic"},
    {"name": "Jim Carrey", "aliases": ["CARREY"], "tag": "classic"},
    {"name": "Adam Sandler", "aliases": ["SANDLER"], "tag": "classic"},
    {"name": "Bradley Cooper", "aliases": ["COOPER"], "tag": "classic"},
    {"name": "Jared Leto", "aliases": ["LETO"], "tag": "classic"},
    {"name": "Willem Dafoe", "aliases": ["DAFOE", "GREEN GOBLIN"], "tag": "classic"}
]

def fetch_and_process_actor(actor_info, index, total):
    name = actor_info["name"]
    print(f"[{index}/{total}] Searching TMDb for: {name}...", flush=True)

    query = urllib.parse.quote(name)
    search_url = f"{BASE_URL}/search/person?query={query}&api_key={API_KEY}"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Scoopcast/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ Error searching TMDb: {e}", flush=True)
        return None

    results = data.get('results', [])
    if not results:
        print(f"  ❌ No results found for: {name}", flush=True)
        return None

    person = results[0]
    pid = person['id']
    canonical = person['name']

    # Fetch profile images
    img_url = f"{BASE_URL}/person/{pid}/images?api_key={API_KEY}"
    req = urllib.request.Request(img_url, headers={'User-Agent': 'Scoopcast/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            idata = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ Error fetching images for {canonical}: {e}", flush=True)
        return None

    profiles = idata.get('profiles', [])
    if not profiles:
        print(f"  ❌ No profile photos for {canonical}", flush=True)
        return None

    # Sort profiles by resolution descending
    profiles.sort(key=lambda p: (p.get('width', 0) * p.get('height', 0), p.get('vote_average', 0)), reverse=True)

    selected_cv = None
    face_box = None
    eyes_list = []

    for prof in profiles[:8]:
        fpath = prof['file_path']
        full_url = f"{IMG_BASE}{fpath}"
        try:
            r = urllib.request.Request(full_url, headers={'User-Agent': 'Scoopcast/1.0'})
            with urllib.request.urlopen(r, timeout=15) as resp:
                raw_bytes = resp.read()
            nparr = np.frombuffer(raw_bytes, np.uint8)
            cv_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if cv_img is None:
                continue

            gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.2, 5)
            if len(faces) == 0:
                continue

            faces = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)
            fx, fy, fw, fh = faces[0]
            roi = gray[fy:fy+fh, fx:fx+fw]
            detected = eye_cascade.detectMultiScale(roi, 1.1, 4)
            upper = [e for e in detected if e[1] < fh * 0.55]

            selected_cv = cv_img
            face_box = (fx, fy, fw, fh)
            eyes_list = upper
            break
        except Exception:
            continue

    # Fallback to highest res image if cascade failed to detect eyes
    if selected_cv is None and profiles:
        try:
            full_url = f"{IMG_BASE}{profiles[0]['file_path']}"
            r = urllib.request.Request(full_url, headers={'User-Agent': 'Scoopcast/1.0'})
            with urllib.request.urlopen(r, timeout=15) as resp:
                raw_bytes = resp.read()
            nparr = np.frombuffer(raw_bytes, np.uint8)
            selected_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            h, w = selected_cv.shape[:2]
            face_box = (int(w * 0.2), int(h * 0.15), int(w * 0.6), int(h * 0.6))
            eyes_list = []
        except Exception as e:
            print(f"  ❌ Fallback download failed for {canonical}: {e}", flush=True)
            return None

    if selected_cv is None:
        print(f"  ❌ Failed to load any portrait for {canonical}", flush=True)
        return None

    fx, fy, fw, fh = face_box
    if len(eyes_list) >= 2:
        sorted_eyes = sorted(eyes_list, key=lambda e: e[0])
        e1, e2 = sorted_eyes[0], sorted_eyes[-1]
        eye_y = fy + int((e1[1] + e1[3]/2 + e2[1] + e2[3]/2) / 2)
        eye_left = fx + e1[0]
        eye_right = fx + e2[0] + e2[2]
        eye_x = int((eye_left + eye_right) / 2)
        span = eye_right - eye_left
        bw = max(int(span * 1.55), int(fw * 0.82))
    else:
        eye_y = fy + int(fh * 0.38)
        eye_x = fx + int(fw * 0.5)
        bw = int(fw * 0.82)

    bh = int(bw / 3.2)  # 3.2:1 tight eye crop

    x1 = max(0, eye_x - bw // 2)
    x2 = min(selected_cv.shape[1], x1 + bw)
    y1 = max(0, eye_y - bh // 2)
    y2 = min(selected_cv.shape[0], y1 + bh)

    crop_cv = selected_cv[y1:y2, x1:x2]

    crop_pil = Image.fromarray(cv2.cvtColor(crop_cv, cv2.COLOR_BGR2RGB))
    reveal_pil = Image.fromarray(cv2.cvtColor(selected_cv, cv2.COLOR_BGR2RGB))

    if reveal_pil.height > 1600:
        ratio = 1600.0 / reveal_pil.height
        reveal_pil = reveal_pil.resize((int(reveal_pil.width * ratio), 1600), Image.Resampling.LANCZOS)

    os.makedirs(DEST_DIR, exist_ok=True)
    crop_path = os.path.join(DEST_DIR, f"{canonical} copy.webp")
    rev_path = os.path.join(DEST_DIR, f"{canonical}.webp")

    crop_pil.save(crop_path, 'WEBP', quality=95)
    reveal_pil.save(rev_path, 'WEBP', quality=95)

    print(f"  ✅ Saved {canonical}: eye crop={crop_pil.size[0]}x{crop_pil.size[1]}, reveal={reveal_pil.size[0]}x{reveal_pil.size[1]}", flush=True)

    return {
        "name": canonical,
        "answer": canonical.upper(),
        "aliases": actor_info.get("aliases", []),
        "tag": actor_info.get("tag", "classic"),
        "content": f"/GUESSTHEEYES/{canonical} copy.webp",
        "revealContent": f"/GUESSTHEEYES/{canonical}.webp"
    }

def update_eyes_catalog(new_items):
    with open(EYES_CATALOG_PATH, "r", encoding="utf-8") as f:
        src = f.read()

    # Find highest existing id
    import re
    ids = [int(m) for m in re.findall(r'id:\s*"e_(\d+)"', src)]
    next_id = max(ids) + 1 if ids else 1

    # Remove the trailing '];' from eyesCatalog.ts
    src_clean = src.rstrip()
    if src_clean.endswith("];"):
        src_clean = src_clean[:-2].rstrip()

    new_entries = []
    for item in new_items:
        entry_lines = [
            '  {',
            f'    id: "e_{next_id}",',
            '    category: "eyes",',
            '    type: "eye",',
            f'    content: "{item["content"]}",',
            f'    revealContent: "{item["revealContent"]}",',
            f'    answer: "{item["answer"]}",'
        ]
        if item.get("aliases"):
            aliases_json = json.dumps(item["aliases"], ensure_ascii=False)
            entry_lines.append(f'    aliases: {aliases_json},')
        entry_lines.append('    year: ""')
        entry_lines.append('  }')
        new_entries.append('\n'.join(entry_lines))
        next_id += 1

    updated_src = src_clean + ',\n' + ',\n'.join(new_entries) + '\n];\n'

    with open(EYES_CATALOG_PATH, "w", encoding="utf-8") as f:
        f.write(updated_src)

    print(f"\n[CATALOG] Updated {EYES_CATALOG_PATH} with {len(new_items)} new male actors. Total eyes now: {next_id - 1}", flush=True)

def main():
    print(f"Starting TMDb batch collection and eye extraction for {len(MALE_ACTORS)} male actors...", flush=True)
    successful = []

    for i, actor in enumerate(MALE_ACTORS, 1):
        res = fetch_and_process_actor(actor, i, len(MALE_ACTORS))
        if res:
            successful.append(res)
        time.sleep(0.2)  # TMDb API rate pacing

    print(f"\n==========================================", flush=True)
    print(f"🎉 Completed: {len(successful)}/{len(MALE_ACTORS)} male actors successfully processed!", flush=True)
    print(f"==========================================", flush=True)

    # Save metadata backup
    with open(os.path.join(ROOT_DIR, "data", "downloaded_male_actors.json"), "w", encoding="utf-8") as f:
        json.dump(successful, f, indent=2, ensure_ascii=False)

    if successful:
        update_eyes_catalog(successful)

if __name__ == "__main__":
    main()
