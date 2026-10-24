import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
import json
import re
import shutil
import urllib.parse
from PIL import Image

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
TARGET_FRAMES_DIR = os.path.join(ROOT_DIR, "GUESSTHEFRAME", "All_Movie_Frames")
DATA_FRAMES_JSON = os.path.join(ROOT_DIR, "data", "frames.json")
ASSETS_MANIFEST_JSON = os.path.join(ROOT_DIR, "assets_manifest.json")
CATALOG_TS = os.path.join(ROOT_DIR, "guess-the-frame-colyseus", "src", "data", "catalog.ts")

os.makedirs(TARGET_FRAMES_DIR, exist_ok=True)

def clean_movie_title(raw_title):
    # Strip any leading numbers like '001. '
    t = re.sub(r'^\d+\.\s*', '', raw_title)
    # Extract clean title and year
    m = re.search(r'^(.*?)\s*\((\d{4})\)', t)
    if m:
        clean_name = m.group(1).strip()
        year = m.group(2).strip()
    else:
        clean_name = t.split('|')[0].split('[')[0].strip()
        year = "2020"
        
    # Replace illegal characters for filesystem
    safe_name = "".join(c for c in clean_name.replace(':', ' -') if c.isalnum() or c in (' ', '-', '(', ')', '\'')).strip()
    safe_name = " ".join(safe_name.split())
    return safe_name, year

def normalize_key(t):
    t_clean = re.sub(r'\s*\(\d{4}\)', '', t)
    t_clean = re.sub(r'[:\-–]', ' ', t_clean)
    return " ".join(t_clean.lower().split())

# 1. Gather all Indian movie candidates
indian_movie_pool = {}

# From 100_famous_indian_movies
f100_path = os.path.join(ROOT_DIR, "download", "100_famous_indian_movies", "manifest.json")
if os.path.exists(f100_path):
    with open(f100_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for m in data:
        t = m.get('title', '')
        norm = normalize_key(t)
        frames = []
        for fk in ['frame_1', 'frame_2', 'frame_3']:
            p = m.get('frames', {}).get(fk, {}).get('path')
            if p and os.path.exists(p) and os.path.getsize(p) > 5000:
                frames.append(p)
        if norm not in indian_movie_pool and len(frames) >= 1:
            safe_t, y = clean_movie_title(t)
            indian_movie_pool[norm] = {
                "title": safe_t,
                "year": y,
                "region": "bollywood",
                "frames": frames
            }

# From imdb_top_100_indian_movies
imdb_path = os.path.join(ROOT_DIR, "download", "imdb_top_100_indian_movies", "manifest.json")
if os.path.exists(imdb_path):
    with open(imdb_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for m in data:
        t = m.get('title', '')
        norm = normalize_key(t)
        frames = []
        for fk in ['frame_1', 'frame_2', 'frame_3']:
            p = m.get('frames', {}).get(fk, {}).get('path')
            if p and os.path.exists(p) and os.path.getsize(p) > 5000:
                frames.append(p)
        if norm not in indian_movie_pool and len(frames) >= 1:
            safe_t, y = clean_movie_title(t)
            indian_movie_pool[norm] = {
                "title": safe_t,
                "year": y,
                "region": "bollywood",
                "frames": frames
            }

# From 200_regional_indian_movies (complete_hd_movies.json)
reg_path = os.path.join(ROOT_DIR, "download", "200_regional_indian_movies", "complete_hd_movies.json")
if os.path.exists(reg_path):
    with open(reg_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for m in data:
        t = m.get('title', '')
        norm = normalize_key(t)
        frames = []
        for fk, res, p in m.get('frames', []):
            if p and os.path.exists(p) and os.path.getsize(p) > 5000:
                frames.append(p)
        if norm not in indian_movie_pool and len(frames) >= 1:
            safe_t, y = clean_movie_title(t)
            ind = m.get('industry', '')
            region_tag = "bollywood" if "bollywood" in ind.lower() else "regional"
            indian_movie_pool[norm] = {
                "title": safe_t,
                "year": y,
                "region": region_tag,
                "frames": frames
            }

print(f"Total unique Indian movies ready for ingestion: {len(indian_movie_pool)}")

# Copy Indian frames into GUESSTHEFRAME/All_Movie_Frames/
copied_frames = 0
for norm, info in indian_movie_pool.items():
    title = info['title']
    year = info['year']
    frames = info['frames']
    for idx, src_path in enumerate(frames, 1):
        target_filename = f"{title} ({year}) - Frame {idx:02d}.webp"
        dest_path = os.path.join(TARGET_FRAMES_DIR, target_filename)
        
        # If destination doesn't exist or is smaller, copy it
        if not os.path.exists(dest_path) or os.path.getsize(dest_path) < os.path.getsize(src_path):
            try:
                shutil.copy2(src_path, dest_path)
                copied_frames += 1
            except Exception as e:
                print(f"Error copying {src_path} -> {dest_path}: {e}")

print(f"Copied/Updated {copied_frames} Indian frames into {TARGET_FRAMES_DIR}")

# Function to generate smart aliases
def generate_aliases(title: str) -> list[str]:
    aliases = []
    upper_title = title.upper()
    
    if upper_title.startswith("THE "):
        aliases.append(upper_title[4:].strip())
    elif upper_title.startswith("A "):
        aliases.append(upper_title[2:].strip())
        
    if ":" in upper_title:
        parts = [p.strip() for p in upper_title.split(":") if p.strip()]
        for p in parts:
            if p not in aliases and p != upper_title:
                aliases.append(p)
        no_colon = upper_title.replace(":", " ")
        cleaned = re.sub(r"\s+", " ", no_colon).strip()
        if cleaned not in aliases and cleaned != upper_title:
            aliases.append(cleaned)
            
    if " - " in upper_title:
        parts = [p.strip() for p in upper_title.split(" - ") if p.strip()]
        for p in parts:
            if p not in aliases and p != upper_title:
                aliases.append(p)
        no_hyphen = upper_title.replace(" - ", " ")
        cleaned = re.sub(r"\s+", " ", no_hyphen).strip()
        if cleaned not in aliases and cleaned != upper_title:
            aliases.append(cleaned)
            
    no_punct = re.sub(r"[^\w\s]", " ", upper_title)
    no_punct_clean = re.sub(r"\s+", " ", no_punct).strip()
    if no_punct_clean != upper_title and no_punct_clean not in aliases:
        aliases.append(no_punct_clean)
        
    return [a for a in aliases if len(a) >= 2]

# Now parse ALL files in All_Movie_Frames
PATTERN = re.compile(r"^(.*?)\s*\((\d{4})\)\s*-\s*Frame\s*(\d+)\.webp$", re.IGNORECASE)
files = sorted(os.listdir(TARGET_FRAMES_DIR))
print(f"\nTotal files in All_Movie_Frames now: {len(files)}")

catalog_frame_items = []
manifest_frames = []
indian_movie_count = set()
international_movie_count = set()

for idx, filename in enumerate(files, start=1):
    m = PATTERN.match(filename)
    if not m:
        continue
    raw_title = m.group(1).strip()
    year = m.group(2)
    frame_num = int(m.group(3))
    
    norm = normalize_key(raw_title)
    is_indian = (norm in indian_movie_pool)
    
    if is_indian:
        region = indian_movie_pool[norm]['region']
        indian_movie_count.add(f"{raw_title} ({year})")
    else:
        region = "hollywood" if int(year) >= 1970 else "international"
        international_movie_count.add(f"{raw_title} ({year})")
        
    encoded_filename = urllib.parse.quote(filename)
    content_url = f"/GUESSTHEFRAME/All_Movie_Frames/{encoded_filename}"
    answer = raw_title.upper()
    aliases = generate_aliases(raw_title)
    tag = "modern" if int(year) >= 2015 else "classic"
    
    item = {
        "id": f"lf_{idx}",
        "category": "frames",
        "type": "image",
        "content": content_url,
        "answer": answer,
        "movie": raw_title,
        "year": year,
        "frameNumber": frame_num,
        "region": region,
        "tag": tag
    }
    if aliases:
        item["aliases"] = aliases
        
    catalog_frame_items.append(item)
    
    manifest_frames.append({
        "category": "frames",
        "label": "Movie Frame",
        "name": f"{answer} ({year})",
        "filename": filename,
        "path": content_url,
        "size": 150000,
        "tag": tag,
        "year": year,
        "region": region
    })

print(f"Total parsed frames: {len(catalog_frame_items)}")
print(f"  - Indian movies: {len(indian_movie_count)} movies")
print(f"  - International movies: {len(international_movie_count)} movies")

# 1. Save data/frames.json
with open(DATA_FRAMES_JSON, "w", encoding="utf-8") as f:
    json.dump(catalog_frame_items, f, indent=2, ensure_ascii=False)
print(f"✅ Saved {len(catalog_frame_items)} items to {DATA_FRAMES_JSON}")

# 2. Update assets_manifest.json
try:
    with open(ASSETS_MANIFEST_JSON, "r", encoding="utf-8") as f:
        existing_manifest = json.load(f)
except Exception:
    existing_manifest = []

non_frames = [it for it in existing_manifest if it.get("category") != "frames"]
combined_manifest = manifest_frames + non_frames
with open(ASSETS_MANIFEST_JSON, "w", encoding="utf-8") as f:
    json.dump(combined_manifest, f, indent=2, ensure_ascii=False)
print(f"✅ Saved {len(combined_manifest)} items to {ASSETS_MANIFEST_JSON}")

# 3. Rebuild guess-the-frame-colyseus/src/data/catalog.ts
with open(CATALOG_TS, "r", encoding="utf-8") as f:
    catalog_text = f.read()

eyes_and_tb_match = re.search(r"(\s*// ── Guess The Eye.*)", catalog_text, re.DOTALL)
eyes_and_tb = eyes_and_tb_match.group(1).rstrip() if eyes_and_tb_match else ""
if eyes_and_tb.endswith("];"):
    eyes_and_tb = eyes_and_tb[:-2].rstrip()
elif eyes_and_tb.endswith("]"):
    eyes_and_tb = eyes_and_tb[:-1].rstrip()

ts_code = [
    'import { DIALOGUE_CATALOG } from "./dialogueCatalog";',
    '',
    'export type MediaType = "image" | "dialogue" | "eye";',
    '',
    'export interface CatalogItem {',
    '  id: string;',
    '  category: "frames" | "dialogue" | "eyes" | "tie_breaker";',
    '  type: MediaType;',
    '  content: string;',
    '  revealContent?: string;',
    '  dialogue?: string;',
    '  answer: string;',
    '  displayAnswer?: string;',
    '  year?: string;',
    '  character?: string;',
    '  actor?: string;',
    '  region?: "bollywood" | "hollywood" | "regional" | "international";',
    '  aliases?: string[];',
    '  tag?: "new" | "classic" | "modern" | string;',
    '}',
    '',
    'export const CATALOG: CatalogItem[] = [',
    f'  // ── Movie Frames ({len(catalog_frame_items)} frames across {len(indian_movie_count)} Indian & {len(international_movie_count)} International movies) ──'
]

for it in catalog_frame_items:
    ts_code.append('  {')
    ts_code.append(f'    id: "{it["id"]}",')
    ts_code.append('    category: "frames",')
    ts_code.append('    type: "image",')
    ts_code.append(f'    content: "{it["content"]}",')
    escaped_ans = it["answer"].replace('"', '\\"')
    ts_code.append(f'    answer: "{escaped_ans}",')
    ts_code.append(f'    year: "{it["year"]}",')
    ts_code.append(f'    region: "{it["region"]}",')
    ts_code.append(f'    tag: "{it["tag"]}",')
    if "aliases" in it and it["aliases"]:
        aliases_str = json.dumps(it["aliases"], ensure_ascii=False)
        ts_code.append(f'    aliases: {aliases_str}')
    ts_code.append('  },')

ts_code.append('')
ts_code.append('  // ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──')
ts_code.append('  ...DIALOGUE_CATALOG,')
ts_code.append('')
if eyes_and_tb:
    ts_code.append(eyes_and_tb)
ts_code.append('];')
ts_code.append('')

with open(CATALOG_TS, "w", encoding="utf-8") as f:
    f.write("\n".join(ts_code))

print(f"✅ Rebuilt {CATALOG_TS} with {len(catalog_frame_items)} frames + dialogues + eyes + tie_breakers.")
