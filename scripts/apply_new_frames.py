import os
import re
import json
import sqlite3
import time

ANSWERS_FILE = r"C:\Users\admin\Downloads\answers (1).md"
DATA_FRAMES_JSON = r"C:\Users\admin\Documents\projects\scoopcast.me\data\frames.json"
CATALOG_TS = r"C:\Users\admin\Documents\projects\scoopcast.me\guess-the-frame-colyseus\src\data\catalog.ts"
DESKTOP_APP_HTML = r"C:\Users\admin\Documents\projects\scoopcast.me\desktop_app.html"
ASSETS_MANIFEST_JSON = r"C:\Users\admin\Documents\projects\scoopcast.me\assets_manifest.json"
SQLITE_DB = r"C:\Users\admin\Documents\projects\scoopcast.me\guess-the-frame-colyseus\data\scoopcast_game.db"
DESKTOP_INDEX_HTML = r"C:\Users\admin\Documents\projects\scoopcast.me\desktop\index.html"
ANDROID_GAME_CLIENT_JS = r"C:\Users\admin\Documents\projects\scoopcast.me\android\js\gameClient.js"

def generate_aliases(title):
    aliases = set()
    upper = title.upper().strip()
    
    # Remove punctuation
    no_punct = re.sub(r'[\':.,!?-]', ' ', upper)
    no_punct_clean = re.sub(r'\s+', ' ', no_punct).strip()
    if no_punct_clean != upper:
        aliases.add(no_punct_clean)
        
    # Remove 'The ' prefix
    if upper.startswith('THE '):
        aliases.add(upper[4:].strip())
        if no_punct_clean.startswith('THE '):
            aliases.add(no_punct_clean[4:].strip())
            
    # Colon splitting
    if ':' in upper:
        main_part = upper.split(':')[0].strip()
        sub_part = upper.split(':')[1].strip()
        aliases.add(main_part)
        aliases.add(sub_part)
        if sub_part.startswith('THE '):
            aliases.add(sub_part[4:].strip())
        if main_part.startswith('THE '):
            aliases.add(main_part[4:].strip())
            
    # Specific major franchises
    if 'LORD OF THE RINGS' in upper:
        aliases.add('LOTR')
        if 'FELLOWSHIP' in upper:
            aliases.update(['LOTR 1', 'LORD OF THE RINGS 1', 'THE FELLOWSHIP OF THE RING', 'FELLOWSHIP OF THE RING'])
        elif 'TWO TOWERS' in upper:
            aliases.update(['LOTR 2', 'LORD OF THE RINGS 2', 'THE TWO TOWERS', 'TWO TOWERS'])
        elif 'RETURN OF THE KING' in upper:
            aliases.update(['LOTR 3', 'LORD OF THE RINGS 3', 'THE RETURN OF THE KING', 'RETURN OF THE KING'])
            
    if 'STAR WARS' in upper:
        if 'EMPIRE STRIKES BACK' in upper:
            aliases.update(['THE EMPIRE STRIKES BACK', 'EMPIRE STRIKES BACK', 'STAR WARS 5'])
        elif 'A NEW HOPE' in upper:
            aliases.update(['STAR WARS', 'A NEW HOPE', 'STAR WARS 4'])
        elif 'RETURN OF THE JEDI' in upper:
            aliases.update(['RETURN OF THE JEDI', 'STAR WARS 6'])
        elif 'REVENGE OF THE SITH' in upper:
            aliases.update(['REVENGE OF THE SITH', 'STAR WARS 3'])
            
    if 'TERMINATOR 2' in upper:
        aliases.update(['T2', 'TERMINATOR 2', 'JUDGMENT DAY'])
        
    if 'GODFATHER PART II' in upper or 'GODFATHER 2' in upper:
        aliases.update(['THE GODFATHER 2', 'GODFATHER 2', 'GODFATHER PART 2'])
        
    if upper == 'SEVEN':
        aliases.add('SE7EN')
    elif upper == 'SE7EN':
        aliases.add('SEVEN')
        
    if upper == 'GOODFELLAS':
        aliases.add('GOOD FELLAS')
    elif upper == 'GOOD FELLAS':
        aliases.add('GOODFELLAS')
        
    if 'WALL·E' in upper or 'WALL-E' in upper or 'WALL E' in upper:
        aliases.update(['WALL-E', 'WALL E', 'WALLE'])
        
    aliases.discard(upper)
    return sorted(list(aliases))

def parse_answers_file():
    with open(ANSWERS_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    items = []
    for line in lines:
        line = line.strip()
        if not line.startswith('|') or 'IMDb rank' in line or '---|---' in line:
            continue
        parts = [p.strip() for p in line.split('|')[1:-1]]
        if len(parts) >= 6:
            num, imdb_rank, film, year, rating, link_md = parts[:6]
            url_match = re.search(r'\((https?://[^\)]+)\)', link_md)
            if url_match:
                url = url_match.group(1)
                idx = int(num)
                yr = int(year) if year.isdigit() else 2000
                tag = 'new' if yr >= 2020 else 'classic'
                upper_title = film.upper()
                aliases = generate_aliases(film)
                
                item = {
                    'id': f"f_{idx}",
                    'category': 'frames',
                    'type': 'image',
                    'content': url,
                    'answer': upper_title,
                    'year': str(year),
                    'tag': tag,
                    'aliases': aliases
                }
                if upper_title == 'FIGHT CLUB':
                    item['displayAnswer'] = '***** ****'
                items.append(item)
    return items

def main():
    print(f"Reading answers from {ANSWERS_FILE}...")
    frames = parse_answers_file()
    print(f"Parsed {len(frames)} frames.")
    assert len(frames) == 500, f"Expected 500 frames, got {len(frames)}"
    
    # 1. Update data/frames.json
    print(f"1. Updating {DATA_FRAMES_JSON}...")
    with open(DATA_FRAMES_JSON, 'w', encoding='utf-8') as f:
        json.dump(frames, f, indent=2, ensure_ascii=False)
    print(f"   -> Wrote {len(frames)} frames to data/frames.json")
    
    # 2. Update guess-the-frame-colyseus/src/data/catalog.ts
    print(f"2. Updating {CATALOG_TS}...")
    with open(CATALOG_TS, 'r', encoding='utf-8') as f:
        catalog_src = f.read()
        
    dialogue_idx = catalog_src.find("...DIALOGUE_CATALOG,")
    if dialogue_idx == -1:
        raise ValueError("Could not find ...DIALOGUE_CATALOG, in catalog.ts")
        
    catalog_header = """import { DIALOGUE_CATALOG } from "./dialogueCatalog";

export type MediaType = 'image' | 'dialogue' | 'eye';

export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: MediaType;
  content: string;
  revealContent?: string;
  dialogue?: string;
  answer: string;
  displayAnswer?: string; // What to show when revealed (e.g. '***** ****' for Fight Club)
  year?: string;
  character?: string;
  actor?: string;
  region?: 'bollywood' | 'hollywood' | 'regional' | 'international';
  aliases?: string[];
  tag?: 'new' | 'classic' | 'modern' | string;
}

export const CATALOG: CatalogItem[] = [
"""
    frame_entries = []
    for f in frames:
        props = [
            f'    id: "{f["id"]}",',
            '    category: "frames",',
            '    type: "image",',
            f'    content: "{f["content"]}",',
            f'    answer: {json.dumps(f["answer"], ensure_ascii=False)},',
            f'    year: "{f["year"]}",',
            f'    tag: "{f["tag"]}"',
        ]
        if 'displayAnswer' in f:
            props.append(f'    displayAnswer: "{f["displayAnswer"]}"')
        if f.get('aliases'):
            props.append(f'    aliases: {json.dumps(f["aliases"], ensure_ascii=False)}')
        entry = "  {\n" + ",\n".join(props) + "\n  },"
        frame_entries.append(entry)
        
    frames_block = "\n".join(frame_entries)
    rest_of_catalog = catalog_src[dialogue_idx:]
    
    new_catalog_code = f"{catalog_header}{frames_block}\n// ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──\n  {rest_of_catalog}"
    with open(CATALOG_TS, 'w', encoding='utf-8') as f:
        f.write(new_catalog_code)
    print(f"   -> Updated catalog.ts with {len(frames)} frames + dialogues + eyes + tie_breaker")
    
    # 3. Update assets_manifest.json
    print(f"3. Updating {ASSETS_MANIFEST_JSON}...")
    if os.path.exists(ASSETS_MANIFEST_JSON):
        with open(ASSETS_MANIFEST_JSON, 'r', encoding='utf-8') as f:
            manifest_items = json.load(f)
            
        non_frames = [item for item in manifest_items if item.get('category') != 'frames']
        new_manifest_frames = []
        for i, f in enumerate(frames, start=1):
            new_manifest_frames.append({
                "category": "frames",
                "label": "Movie Frame",
                "name": f"{f['answer']} ({f['year']})",
                "filename": f"frame_{i:04d}.jpg",
                "path": f['content'],
                "size": 150000,
                "tag": f['tag'],
                "year": f['year']
            })
        full_manifest = new_manifest_frames + non_frames
        with open(ASSETS_MANIFEST_JSON, 'w', encoding='utf-8') as f:
            json.dump(full_manifest, f, indent=2, ensure_ascii=False)
        print(f"   -> Updated assets_manifest.json: {len(new_manifest_frames)} frames + {len(non_frames)} others = {len(full_manifest)} total")

    # 4. Update SQLite database (guess-the-frame-colyseus/data/scoopcast_game.db)
    print(f"4. Updating SQLite database {SQLITE_DB}...")
    if os.path.exists(SQLITE_DB):
        conn = sqlite3.connect(SQLITE_DB)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM frames_metadata WHERE category = 'frames';")
        now_ms = int(time.time() * 1000)
        
        insert_rows = []
        for i, f in enumerate(frames, start=1):
            slug = re.sub(r'[^\w\s-]', '', f['answer'].lower()).strip()
            slug = re.sub(r'[\s]+', '-', slug)
            movie_id = f"{slug}-{f['year']}"
            aliases_json = json.dumps(f['aliases']) if f['aliases'] else None
            disp_ans = f.get('displayAnswer')
            
            insert_rows.append((
                f['id'], movie_id, f['answer'], f['content'], 'frames', 'image',
                int(f['year']) if f['year'].isdigit() else 2000, 'standalone', 'hollywood',
                'cinema', '', 2, 95.0, 50.0, '', f['tag'], aliases_json,
                None, None, None, disp_ans, 1, now_ms
            ))
            
        cursor.executemany("""
            INSERT INTO frames_metadata (
                frame_id, movie_id, movie_title, content_url, category, type,
                year, franchise, region, genre, lead_actor, difficulty, quality_score,
                discovery_value, perceptual_hash, tag, aliases_json, dialogue,
                reveal_content, character, display_answer, is_active, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, insert_rows)
        conn.commit()
        cursor.execute("SELECT count(*) FROM frames_metadata WHERE category = 'frames'")
        cnt = cursor.fetchone()[0]
        conn.close()
        print(f"   -> SQLite frames_metadata updated with {cnt} rows.")
        
    # 5. Update desktop_app.html fallback frames
    print(f"5. Updating fallback frames in {DESKTOP_APP_HTML}...")
    with open(DESKTOP_APP_HTML, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Build 16 top classic/modern frames from the new 500
    top_fallback = frames[:16]
    fallback_js_lines = []
    for f in top_fallback:
        line = f'            {{ type: "image", content: "{f["content"]}", answer: {json.dumps(f["answer"])}, year: "{f["year"]}", tag: "{f["tag"]}" }}'
        fallback_js_lines.append(line)
    new_fallback_block = ",\n".join(fallback_js_lines)
    
    # Replace the frames array inside Section 1 in desktop_app.html
    pattern = r"(id:\s*1,\s*name:\s*'Guess the Frame'[^\]]*frames:\s*\[)[^\]]*(\])"
    replacement = rf"\g<1>\n{new_fallback_block}\n          \g<2>"
    updated_html = re.sub(pattern, replacement, html)
    with open(DESKTOP_APP_HTML, 'w', encoding='utf-8') as f:
        f.write(updated_html)
    print(f"   -> Updated fallback frames in desktop_app.html")
    
    # 6. Update desktop/index.html fallback frames if exists
    if os.path.exists(DESKTOP_INDEX_HTML):
        print(f"6. Updating fallback frames in {DESKTOP_INDEX_HTML}...")
        with open(DESKTOP_INDEX_HTML, 'r', encoding='utf-8') as f:
            d_html = f.read()
        d_updated = re.sub(pattern, replacement, d_html)
        with open(DESKTOP_INDEX_HTML, 'w', encoding='utf-8') as f:
            f.write(d_updated)
        print(f"   -> Updated fallback frames in desktop/index.html")

    # 7. Update android/js/gameClient.js fallback frames if exists
    if os.path.exists(ANDROID_GAME_CLIENT_JS):
        print(f"7. Updating fallback frames in {ANDROID_GAME_CLIENT_JS}...")
        with open(ANDROID_GAME_CLIENT_JS, 'r', encoding='utf-8') as f:
            a_js = f.read()
        a_updated = re.sub(pattern, replacement, a_js)
        with open(ANDROID_GAME_CLIENT_JS, 'w', encoding='utf-8') as f:
            f.write(a_updated)
        print(f"   -> Updated fallback frames in android/js/gameClient.js")

    print("\nALL FRAMES REPLACED SUCCESSFULLY WITH THE 500 EXACT FRAMES FROM answers (1).md!")

if __name__ == '__main__':
    main()
