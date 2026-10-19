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

API_KEY = "febd351cb18c057ef65bd6cd832966b6"
BASE_URL = "https://api.themoviedb.org/3"
IMG_BASE = "https://image.tmdb.org/t/p/original"
DEST_DIR = "GUESSTHEEYES"
CATALOG_PATH = os.path.join("guess-the-frame-colyseus", "src", "data", "catalog.ts")

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

ACTRESSES = [
    # --- 50 FAMOUS INDIAN ACTRESSES ---
    {"name": "Deepika Padukone", "aliases": ["DEEPIKA"], "tag": "bollywood"},
    {"name": "Priyanka Chopra", "aliases": ["PRIYANKA CHOPRA JONAS", "PC", "PRIYANKA"], "tag": "bollywood"},
    {"name": "Alia Bhatt", "aliases": ["ALIA"], "tag": "bollywood"},
    {"name": "Katrina Kaif", "aliases": ["KATRINA"], "tag": "bollywood"},
    {"name": "Kareena Kapoor", "aliases": ["KAREENA KAPOOR KHAN", "BEBO", "KAREENA"], "tag": "bollywood"},
    {"name": "Aishwarya Rai", "aliases": ["AISHWARYA RAI BACHCHAN", "AISHWARYA"], "tag": "bollywood"},
    {"name": "Anushka Sharma", "aliases": ["ANUSHKA"], "tag": "bollywood"},
    {"name": "Shraddha Kapoor", "aliases": ["SHRADDHA"], "tag": "bollywood"},
    {"name": "Kiara Advani", "aliases": ["KIARA"], "tag": "bollywood"},
    {"name": "Kriti Sanon", "aliases": ["KRITI"], "tag": "bollywood"},
    {"name": "Samantha Ruth Prabhu", "aliases": ["SAMANTHA", "SAMANTHA AKKINENI"], "tag": "bollywood"},
    {"name": "Nayanthara", "aliases": ["LADY SUPERSTAR"], "tag": "bollywood"},
    {"name": "Rashmika Mandanna", "aliases": ["RASHMIKA"], "tag": "bollywood"},
    {"name": "Trisha Krishnan", "aliases": ["TRISHA"], "tag": "bollywood"},
    {"name": "Sai Pallavi", "aliases": [], "tag": "bollywood"},
    {"name": "Kajol", "aliases": ["KAJOL DEVGN", "KAJOL MUKHERJEE"], "tag": "bollywood"},
    {"name": "Rani Mukerji", "aliases": ["RANI MUKHERJEE", "RANI"], "tag": "bollywood"},
    {"name": "Madhuri Dixit", "aliases": ["MADHURI DIXIT NENE", "MADHURI"], "tag": "bollywood"},
    {"name": "Juhi Chawla", "aliases": ["JUHI"], "tag": "bollywood"},
    {"name": "Preity Zinta", "aliases": ["PREITY"], "tag": "bollywood"},
    {"name": "Vidya Balan", "aliases": ["VIDYA"], "tag": "bollywood"},
    {"name": "Taapsee Pannu", "aliases": ["TAAPSEE"], "tag": "bollywood"},
    {"name": "Kangana Ranaut", "aliases": ["KANGANA"], "tag": "bollywood"},
    {"name": "Sonam Kapoor", "aliases": ["SONAM KAPOOR AHUJA", "SONAM"], "tag": "bollywood"},
    {"name": "Parineeti Chopra", "aliases": ["PARINEETI"], "tag": "bollywood"},
    {"name": "Disha Patani", "aliases": ["DISHA"], "tag": "bollywood"},
    {"name": "Ananya Panday", "aliases": ["ANANYA PANDEY", "ANANYA"], "tag": "bollywood"},
    {"name": "Janhvi Kapoor", "aliases": ["JANHVI"], "tag": "bollywood"},
    {"name": "Sara Ali Khan", "aliases": ["SARA"], "tag": "bollywood"},
    {"name": "Pooja Hegde", "aliases": ["POOJA"], "tag": "bollywood"},
    {"name": "Tamannaah Bhatia", "aliases": ["TAMANNAAH", "TAMANNA"], "tag": "bollywood"},
    {"name": "Kajal Aggarwal", "aliases": ["KAJAL AGARWAL", "KAJAL"], "tag": "bollywood"},
    {"name": "Keerthy Suresh", "aliases": ["KEERTHY"], "tag": "bollywood"},
    {"name": "Anushka Shetty", "aliases": ["SWEETY SHETTY", "DEVASENA"], "tag": "bollywood"},
    {"name": "Radhika Apte", "aliases": ["RADHIKA"], "tag": "bollywood"},
    {"name": "Tabu", "aliases": ["TABASSUM FATIMA HASHMI"], "tag": "bollywood"},
    {"name": "Rekha", "aliases": ["BHANUREKHA GANESAN"], "tag": "bollywood"},
    {"name": "Sridevi", "aliases": ["SRIDEVI KAPOOR"], "tag": "bollywood"},
    {"name": "Hema Malini", "aliases": ["DREAM GIRL"], "tag": "bollywood"},
    {"name": "Sushmita Sen", "aliases": ["SUSH"], "tag": "bollywood"},
    {"name": "Lara Dutta", "aliases": ["LARA DUTTA BHUPATHI"], "tag": "bollywood"},
    {"name": "Shilpa Shetty", "aliases": ["SHILPA SHETTY KUNDRA", "SHILPA"], "tag": "bollywood"},
    {"name": "Raveena Tandon", "aliases": ["RAVEENA"], "tag": "bollywood"},
    {"name": "Karisma Kapoor", "aliases": ["LOLO", "KARISMA"], "tag": "bollywood"},
    {"name": "Bipasha Basu", "aliases": ["BIPASHA"], "tag": "bollywood"},
    {"name": "Yami Gautam", "aliases": ["YAMI GAUTAM DHAR", "YAMI"], "tag": "bollywood"},
    {"name": "Bhumi Pednekar", "aliases": ["BHUMI"], "tag": "bollywood"},
    {"name": "Mrunal Thakur", "aliases": ["MRUNAL"], "tag": "bollywood"},
    {"name": "Triptii Dimri", "aliases": ["TRIPTI DIMRI", "TRIPTII"], "tag": "bollywood"},
    {"name": "Jacqueline Fernandez", "aliases": ["JACQUELINE"], "tag": "bollywood"},

    # --- 50 FAMOUS INTERNATIONAL ACTRESSES ---
    {"name": "Scarlett Johansson", "aliases": ["SCARLETT", "BLACK WIDOW"], "tag": "classic"},
    {"name": "Margot Robbie", "aliases": ["MARGOT", "HARLEY QUINN"], "tag": "classic"},
    {"name": "Emma Stone", "aliases": ["EMMA"], "tag": "classic"},
    {"name": "Jennifer Lawrence", "aliases": ["JLAW", "JENNIFER"], "tag": "classic"},
    {"name": "Zendaya", "aliases": ["ZENDAYA COLEMAN"], "tag": "classic"},
    {"name": "Angelina Jolie", "aliases": ["ANGELINA"], "tag": "classic"},
    {"name": "Anne Hathaway", "aliases": ["ANNE"], "tag": "classic"},
    {"name": "Natalie Portman", "aliases": ["NATALIE"], "tag": "classic"},
    {"name": "Gal Gadot", "aliases": ["WONDER WOMAN"], "tag": "classic"},
    {"name": "Elizabeth Olsen", "aliases": ["SCARLET WITCH", "LIZZIE OLSEN"], "tag": "classic"},
    {"name": "Florence Pugh", "aliases": ["FLORENCE"], "tag": "classic"},
    {"name": "Sydney Sweeney", "aliases": ["SYDNEY"], "tag": "classic"},
    {"name": "Ana de Armas", "aliases": ["ANA"], "tag": "classic"},
    {"name": "Anya Taylor-Joy", "aliases": ["ANYA TAYLOR JOY", "ANYA"], "tag": "classic"},
    {"name": "Charlize Theron", "aliases": ["CHARLIZE"], "tag": "classic"},
    {"name": "Nicole Kidman", "aliases": ["NICOLE"], "tag": "classic"},
    {"name": "Meryl Streep", "aliases": ["MERYL"], "tag": "classic"},
    {"name": "Kate Winslet", "aliases": ["KATE"], "tag": "classic"},
    {"name": "Cate Blanchett", "aliases": ["CATE"], "tag": "classic"},
    {"name": "Julia Roberts", "aliases": ["JULIA"], "tag": "classic"},
    {"name": "Sandra Bullock", "aliases": ["SANDRA"], "tag": "classic"},
    {"name": "Penelope Cruz", "aliases": ["PENELOPE"], "tag": "classic"},
    {"name": "Marion Cotillard", "aliases": ["MARION"], "tag": "classic"},
    {"name": "Eva Green", "aliases": ["EVA"], "tag": "classic"},
    {"name": "Jessica Chastain", "aliases": ["JESSICA"], "tag": "classic"},
    {"name": "Amy Adams", "aliases": ["AMY"], "tag": "classic"},
    {"name": "Emily Blunt", "aliases": ["EMILY"], "tag": "classic"},
    {"name": "Keira Knightley", "aliases": ["KEIRA"], "tag": "classic"},
    {"name": "Rachel McAdams", "aliases": ["RACHEL"], "tag": "classic"},
    {"name": "Mila Kunis", "aliases": ["MILA"], "tag": "classic"},
    {"name": "Amanda Seyfried", "aliases": ["AMANDA"], "tag": "classic"},
    {"name": "Megan Fox", "aliases": ["MEGAN"], "tag": "classic"},
    {"name": "Jessica Alba", "aliases": ["JESSICA"], "tag": "classic"},
    {"name": "Kristen Stewart", "aliases": ["KRISTEN"], "tag": "classic"},
    {"name": "Emma Watson", "aliases": ["HERMIONE", "EMMA"], "tag": "classic"},
    {"name": "Saoirse Ronan", "aliases": ["SAOIRSE"], "tag": "classic"},
    {"name": "Millie Bobby Brown", "aliases": ["ELEVEN", "MBB"], "tag": "classic"},
    {"name": "Jenna Ortega", "aliases": ["WEDNESDAY", "JENNA"], "tag": "classic"},
    {"name": "Hailee Steinfeld", "aliases": ["HAILEE"], "tag": "classic"},
    {"name": "Lily Collins", "aliases": ["LILY"], "tag": "classic"},
    {"name": "Blake Lively", "aliases": ["BLAKE"], "tag": "classic"},
    {"name": "Jennifer Aniston", "aliases": ["RACHEL GREEN", "ANISTON"], "tag": "classic"},
    {"name": "Courteney Cox", "aliases": ["COURTENEY COX ARQUETTE", "MONICA GELLER"], "tag": "classic"},
    {"name": "Halle Berry", "aliases": ["HALLE", "STORM"], "tag": "classic"},
    {"name": "Zoe Saldana", "aliases": ["ZOE SALDAÑA", "GAMORA"], "tag": "classic"},
    {"name": "Lupita Nyong'o", "aliases": ["LUPITA"], "tag": "classic"},
    {"name": "Michelle Yeoh", "aliases": ["MICHELLE"], "tag": "classic"},
    {"name": "Helena Bonham Carter", "aliases": ["HELENA"], "tag": "classic"},
    {"name": "Cameron Diaz", "aliases": ["CAMERON"], "tag": "classic"},
    {"name": "Winona Ryder", "aliases": ["WINONA"], "tag": "classic"}
]

def fetch_and_process(actress_info, index, total):
    name = actress_info["name"]
    print(f"[{index}/{total}] Searching TMDb for: {name}...")
    
    query = urllib.parse.quote(name)
    search_url = f"{BASE_URL}/search/person?query={query}&api_key={API_KEY}"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Scoopcast/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ Error querying TMDb search: {e}")
        return None
        
    results = data.get('results', [])
    if not results:
        print(f"  ❌ No results found for: {name}")
        return None
        
    person = results[0]
    pid = person['id']
    canonical = person['name']
    
    # Get profile images
    img_url = f"{BASE_URL}/person/{pid}/images?api_key={API_KEY}"
    req = urllib.request.Request(img_url, headers={'User-Agent': 'Scoopcast/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            idata = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ Error fetching images for {canonical}: {e}")
        return None
        
    profiles = idata.get('profiles', [])
    if not profiles:
        print(f"  ❌ No profile photos for {canonical}")
        return None
        
    # Sort by resolution (width*height) descending
    profiles.sort(key=lambda p: (p.get('width', 0) * p.get('height', 0), p.get('vote_average', 0)), reverse=True)
    
    selected_cv = None
    face_box = None
    eyes_list = []
    
    for prof in profiles[:8]:
        fpath = prof['file_path']
        full_url = f"{IMG_BASE}{fpath}"
        try:
            r = urllib.request.Request(full_url, headers={'User-Agent': 'Scoopcast/1.0'})
            with urllib.request.urlopen(r) as resp:
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
            
    if selected_cv is None:
        print(f"  ❌ No clear frontal face found for {canonical}")
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
        
    bh = int(bw / 3.2) # ~3.2:1 tight eye crop
    
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
    
    print(f"  ✅ Saved {canonical}: crop={crop_pil.size[0]}x{crop_pil.size[1]}, reveal={reveal_pil.size[0]}x{reveal_pil.size[1]}")
    
    return {
        "name": canonical,
        "answer": canonical.upper(),
        "aliases": actress_info.get("aliases", []),
        "tag": actress_info.get("tag", "classic"),
        "content": f"/GUESSTHEEYES/{canonical} copy.webp",
        "revealContent": f"/GUESSTHEEYES/{canonical}.webp"
    }

def main():
    print(f"Starting batch download and eye extraction for {len(ACTRESSES)} actresses...")
    successful = []
    
    for i, a in enumerate(ACTRESSES, 1):
        res = fetch_and_process(a, i, len(ACTRESSES))
        if res:
            successful.append(res)
        time.sleep(0.15) # respect rate limit
        
    print(f"\n==========================================")
    print(f"🎉 Completed: {len(successful)}/{len(ACTRESSES)} actresses successfully processed!")
    print(f"==========================================")
    
    # Save JSON record
    with open("downloaded_actresses.json", "w", encoding="utf-8") as f:
        json.dump(successful, f, indent=2)
        
    # Append to catalog.ts
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        catalog_src = f.read()
        
    # Find existing eyes IDs to determine starting index
    import re
    existing_eyes = re.findall(r'id:\s*"e_(\d+)"', catalog_src)
    start_id = max([int(x) for x in existing_eyes]) + 1 if existing_eyes else 13
    print(f"Assigning catalog IDs starting at: e_{start_id}")
    
    new_entries = []
    curr_id = start_id
    for item in successful:
        aliases_code = ""
        if item["aliases"]:
            aliases_code = f"    aliases: {json.dumps(item['aliases'])},\n"
        entry = f"""  {{
    id: "e_{curr_id}",
    category: "eyes",
    type: "eye",
    content: "{item['content']}",
    revealContent: "{item['revealContent']}",
    answer: "{item['answer']}",
{aliases_code}    year: ""
  }},"""
        new_entries.append(entry)
        curr_id += 1
        
    all_new_code = "\n" + "\n".join(new_entries)
    
    # Insert right before `{ id: "tb_1"`
    target = '  {\n    id: "tb_1",'
    if target not in catalog_src:
        target = '{\n    id: "tb_1",'
        
    if target in catalog_src:
        updated_catalog = catalog_src.replace(target, all_new_code + "\n" + target, 1)
        with open(CATALOG_PATH, "w", encoding="utf-8") as f:
            f.write(updated_catalog)
        print(f"✅ Successfully inserted {len(new_entries)} new eyes into {CATALOG_PATH}!")
    else:
        print(f"⚠️ Could not find insertion target in {CATALOG_PATH}. Check manually.")

if __name__ == "__main__":
    main()
