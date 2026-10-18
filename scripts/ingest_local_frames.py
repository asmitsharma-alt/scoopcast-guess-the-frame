import os
import re
import json
import urllib.parse

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
FRAMES_DIR = os.path.join(ROOT_DIR, "GUESSTHEFRAME", "All_Movie_Frames")
DATA_FRAMES_JSON = os.path.join(ROOT_DIR, "data", "frames.json")
ASSETS_MANIFEST_JSON = os.path.join(ROOT_DIR, "assets_manifest.json")
CATALOG_TS = os.path.join(ROOT_DIR, "guess-the-frame-colyseus", "src", "data", "catalog.ts")

# Regex pattern: Movie Title (YYYY) - Frame XX.webp
PATTERN = re.compile(r"^(.*?)\s*\((\d{4})\)\s*-\s*Frame\s*(\d+)\.webp$", re.IGNORECASE)

def generate_aliases(title: str) -> list[str]:
    aliases = []
    upper_title = title.upper()
    
    # 1. Remove leading "The " or "A "
    if upper_title.startswith("THE "):
        aliases.append(upper_title[4:].strip())
    elif upper_title.startswith("A "):
        aliases.append(upper_title[2:].strip())
        
    # 2. Subtitle handling (colon, hyphen)
    if ":" in upper_title:
        parts = [p.strip() for p in upper_title.split(":") if p.strip()]
        for p in parts:
            if p not in aliases and p != upper_title:
                aliases.append(p)
        # Without colon
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
            
    # 3. Punctuation removal
    no_punct = re.sub(r"[^\w\s]", " ", upper_title)
    no_punct_clean = re.sub(r"\s+", " ", no_punct).strip()
    if no_punct_clean != upper_title and no_punct_clean not in aliases:
        aliases.append(no_punct_clean)
        
    return [a for a in aliases if len(a) >= 2]

def main():
    files = sorted(os.listdir(FRAMES_DIR))
    print(f"Found {len(files)} files in {FRAMES_DIR}")
    
    frame_items = []
    movies_set = set()
    
    for idx, filename in enumerate(files, start=1):
        m = PATTERN.match(filename)
        if not m:
            print(f"⚠️ Unmatched file: {filename}")
            continue
            
        raw_title = m.group(1).strip()
        year = m.group(2)
        frame_num = int(m.group(3))
        
        movies_set.add(f"{raw_title} ({year})")
        
        # Local web-accessible content path (encoded URL)
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
            "tag": tag
        }
        if aliases:
            item["aliases"] = aliases
            
        frame_items.append(item)
        
    print(f"Parsed {len(frame_items)} frame items across {len(movies_set)} unique movies.")
    
    # 1. Write data/frames.json
    with open(DATA_FRAMES_JSON, "w", encoding="utf-8") as f:
        json.dump(frame_items, f, indent=2, ensure_ascii=False)
    print(f"[OK] Saved {len(frame_items)} items to {DATA_FRAMES_JSON}")
    
    # 2. Update assets_manifest.json
    try:
        with open(ASSETS_MANIFEST_JSON, "r", encoding="utf-8") as f:
            manifest = json.load(f)
    except Exception:
        manifest = []
        
    non_frames = [item for item in manifest if item.get("category") != "frames"]
    
    new_manifest_frames = []
    for item in frame_items:
        new_manifest_frames.append({
            "category": "frames",
            "label": "Movie Frame",
            "name": f"{item['answer']} ({item['year']})",
            "filename": os.path.basename(item['content']),
            "path": item['content'],
            "size": 150000,
            "tag": item['tag'],
            "year": item['year']
        })
        
    combined_manifest = new_manifest_frames + non_frames
    with open(ASSETS_MANIFEST_JSON, "w", encoding="utf-8") as f:
        json.dump(combined_manifest, f, indent=2, ensure_ascii=False)
    print(f"[OK] Saved {len(combined_manifest)} items to {ASSETS_MANIFEST_JSON}")
    
    # 3. Read existing non-frame items from catalog.ts (eyes & tie_breaker)
    with open(CATALOG_TS, "r", encoding="utf-8") as f:
        catalog_text = f.read()
        
    # Extract eye and tie_breaker items
    eyes_and_tb_match = re.search(r"(\s*// ── Guess The Eye.*)", catalog_text, re.DOTALL)
    eyes_and_tb = eyes_and_tb_match.group(1).rstrip() if eyes_and_tb_match else ""
    
    # Clean closing bracket
    if eyes_and_tb.endswith("];"):
        eyes_and_tb = eyes_and_tb[:-2].rstrip()
    elif eyes_and_tb.endswith("]"):
        eyes_and_tb = eyes_and_tb[:-1].rstrip()
        
    # Generate catalog.ts content
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
        'export const CATALOG: CatalogItem[] = ['
    ]
    
    # Add all local frame items
    ts_code.append('  // ── Local Movie Frames (2,913 frames across 286 unique movies) ──')
    for item in frame_items:
        ts_code.append('  {')
        ts_code.append(f'    id: "{item["id"]}",')
        ts_code.append('    category: "frames",')
        ts_code.append('    type: "image",')
        ts_code.append(f'    content: "{item["content"]}",')
        # Escaping quotes in title
        escaped_ans = item["answer"].replace('"', '\\"')
        ts_code.append(f'    answer: "{escaped_ans}",')
        ts_code.append(f'    year: "{item["year"]}",')
        ts_code.append(f'    tag: "{item["tag"]}",')
        if "aliases" in item and item["aliases"]:
            aliases_str = json.dumps(item["aliases"], ensure_ascii=False)
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
    print(f"[OK] Rebuilt {CATALOG_TS} with {len(frame_items)} local frames + dialogues + eyes + tie breakers.")

if __name__ == "__main__":
    main()
