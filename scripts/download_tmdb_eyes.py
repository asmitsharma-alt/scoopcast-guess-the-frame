import urllib.request
import urllib.parse
import json
import os
import sys
import cv2
import numpy as np
from PIL import Image

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')


API_KEY = "febd351cb18c057ef65bd6cd832966b6"
BASE_URL = "https://api.themoviedb.org/3"
IMG_BASE = "https://image.tmdb.org/t/p/original"
DEST_DIR = "GUESSTHEEYES"

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

def fetch_actor_eyes(actor_name, custom_aliases=None):
    os.makedirs(DEST_DIR, exist_ok=True)
    print(f"\n==========================================")
    print(f"🎬 Processing: {actor_name}")
    print(f"==========================================")
    
    # 1. Search person
    query = urllib.parse.quote(actor_name)
    search_url = f"{BASE_URL}/search/person?query={query}&api_key={API_KEY}"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Scoopcast/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"❌ Error searching TMDb: {e}")
        return None
        
    if not data.get('results'):
        print(f"❌ No TMDb results for: {actor_name}")
        return None
        
    person = data['results'][0]
    person_id = person['id']
    canonical_name = person['name']
    print(f"✓ Found: {canonical_name} (ID: {person_id})")
    
    # 2. Get profile images
    img_url = f"{BASE_URL}/person/{person_id}/images?api_key={API_KEY}"
    req = urllib.request.Request(img_url, headers={'User-Agent': 'Scoopcast/1.0'})
    with urllib.request.urlopen(req) as resp:
        img_data = json.loads(resp.read().decode())
        
    profiles = img_data.get('profiles', [])
    if not profiles:
        print(f"❌ No profiles found for: {canonical_name}")
        return None
        
    # Sort by resolution and vote average
    profiles.sort(key=lambda p: (p.get('width', 0) * p.get('height', 0), p.get('vote_average', 0)), reverse=True)
    
    # Try downloading and detecting face
    selected_img = None
    face_box = None
    eyes_coords = []
    
    for prof in profiles:
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
                
            # Pick primary face
            faces = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)
            fx, fy, fw, fh = faces[0]
            roi_gray = gray[fy:fy+fh, fx:fx+fw]
            detected_eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 4)
            
            # Require at least 1 or 2 eyes detected in upper half of face
            upper_eyes = [e for e in detected_eyes if e[1] < fh * 0.6]
            if len(upper_eyes) >= 1:
                selected_img = cv_img
                face_box = (fx, fy, fw, fh)
                eyes_coords = upper_eyes
                print(f"✓ Found suitable profile: {prof['width']}x{prof['height']} with {len(upper_eyes)} eyes detected")
                break
        except Exception as e:
            continue
            
    if selected_img is None:
        print(f"❌ Could not detect clear unmasked eyes for {canonical_name}")
        return None
        
    # 3. Compute tight crop "close to eyes only"
    fx, fy, fw, fh = face_box
    if len(eyes_coords) >= 2:
        # Sort left to right
        sorted_eyes = sorted(eyes_coords, key=lambda e: e[0])
        e1, e2 = sorted_eyes[0], sorted_eyes[-1]
        eye_y_center = fy + int((e1[1] + e1[3]/2 + e2[1] + e2[3]/2) / 2)
        eye_x_left = fx + e1[0]
        eye_x_right = fx + e2[0] + e2[2]
        eye_center_x = int((eye_x_left + eye_x_right) / 2)
        span = eye_x_right - eye_x_left
        banner_w = max(int(span * 1.6), int(fw * 0.85))
    else:
        # Fallback to standard facial eye-line: ~35% down the face
        eye_y_center = fy + int(fh * 0.35)
        eye_center_x = fx + int(fw * 0.5)
        banner_w = int(fw * 0.85)
        
    banner_h = int(banner_w / 3.2) # ~3.2:1 aspect ratio close to eyes
    
    x1 = max(0, eye_center_x - banner_w // 2)
    x2 = min(selected_img.shape[1], x1 + banner_w)
    y1 = max(0, eye_y_center - banner_h // 2)
    y2 = min(selected_img.shape[0], y1 + banner_h)
    
    cropped_eyes_cv = selected_img[y1:y2, x1:x2]
    
    # 4. Save to GUESSTHEEYES
    # Convert BGR to RGB for PIL
    crop_rgb = cv2.cvtColor(cropped_eyes_cv, cv2.COLOR_BGR2RGB)
    reveal_rgb = cv2.cvtColor(selected_img, cv2.COLOR_BGR2RGB)
    
    eyes_pil = Image.fromarray(crop_rgb)
    reveal_pil = Image.fromarray(reveal_rgb)
    
    # Scale reveal to max 1600h if huge
    if reveal_pil.height > 1600:
        ratio = 1600.0 / reveal_pil.height
        reveal_pil = reveal_pil.resize((int(reveal_pil.width * ratio), 1600), Image.Resampling.LANCZOS)
        
    copy_path = os.path.join(DEST_DIR, f"{canonical_name} copy.webp")
    reveal_path = os.path.join(DEST_DIR, f"{canonical_name}.webp")
    
    eyes_pil.save(copy_path, 'WEBP', quality=95)
    reveal_pil.save(reveal_path, 'WEBP', quality=95)
    
    print(f"🎉 Saved Eye Strip: {copy_path} ({eyes_pil.size[0]}x{eyes_pil.size[1]})")
    print(f"🎉 Saved Reveal:    {reveal_path} ({reveal_pil.size[0]}x{reveal_pil.size[1]})")
    
    # 5. Generate catalog entry snippet
    aliases_str = ""
    if custom_aliases:
        aliases_json = json.dumps(custom_aliases)
        aliases_str = f"    aliases: {aliases_json},\n"
        
    entry = f"""  {{
    id: "e_NEW",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/{canonical_name} copy.webp",
    revealContent: "/GUESSTHEEYES/{canonical_name}.webp",
    answer: "{canonical_name.upper()}",
{aliases_str}    year: ""
  }},"""
    print("\nCatalog Entry Snippet:")
    print(entry)
    return entry

if __name__ == "__main__":
    import sys
    name = sys.argv[1] if len(sys.argv) > 1 else "Leonardo DiCaprio"
    fetch_actor_eyes(name)
