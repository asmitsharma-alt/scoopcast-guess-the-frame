import os
import json
import sqlite3
import re
import time

PROJECT_ROOT = r"C:\Users\admin\Documents\projects\scoopcast.me"
FRAMES_JSON = os.path.join(PROJECT_ROOT, "data", "frames.json")
CATALOG_TS = os.path.join(PROJECT_ROOT, "guess-the-frame-colyseus", "src", "data", "catalog.ts")
ASSETS_MANIFEST_JSON = os.path.join(PROJECT_ROOT, "assets_manifest.json")
SQLITE_DB = os.path.join(PROJECT_ROOT, "guess-the-frame-colyseus", "data", "scoopcast_game.db")
DESKTOP_APP_HTML = os.path.join(PROJECT_ROOT, "desktop_app.html")
DESKTOP_INDEX_HTML = os.path.join(PROJECT_ROOT, "desktop", "index.html")
ANDROID_GAME_CLIENT_JS = os.path.join(PROJECT_ROOT, "android", "js", "gameClient.js")

# The definitive list of EASY, ULTRA-POPULAR, VERY SIMPLE titles
EASY_POPULAR_TITLES = {
    # ── Superheroes & Comic Book Blockbusters ──
    "THE DARK KNIGHT",
    "THE DARK KNIGHT RISES",
    "BATMAN BEGINS",
    "THE BATMAN",
    "BATMAN",
    "JOKER",
    "AVENGERS: ENDGAME",
    "AVENGERS: INFINITY WAR",
    "THE AVENGERS",
    "IRON MAN",
    "THOR: RAGNAROK",
    "CAPTAIN AMERICA: THE WINTER SOLDIER",
    "GUARDIANS OF THE GALAXY",
    "GUARDIANS OF THE GALAXY: VOL. 2",
    "GUARDIANS OF THE GALAXY VOL. 3",
    "DEADPOOL",
    "DEADPOOL 2",
    "DOCTOR STRANGE",
    "SPIDER-MAN: INTO THE SPIDER-VERSE",
    "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
    "SPIDER-MAN: NO WAY HOME",
    "SPIDER-MAN 2",
    "LOGAN",
    "300",
    "WATCHMEN",
    "KICK-ASS",
    
    # ── Mega Franchises: Star Wars, LOTR, Harry Potter, Pirates ──
    "THE LORD OF THE RINGS: THE RETURN OF THE KING",
    "THE LORD OF THE RINGS: THE FELLOWSHIP OF THE RING",
    "THE LORD OF THE RINGS: THE TWO TOWERS",
    "STAR WARS: EPISODE IV - A NEW HOPE",
    "STAR WARS: EPISODE V - THE EMPIRE STRIKES BACK",
    "STAR WARS: EPISODE VI - RETURN OF THE JEDI",
    "STAR WARS: EPISODE III - REVENGE OF THE SITH",
    "ROGUE ONE: A STAR WARS STORY",
    "PIRATES OF THE CARIBBEAN: THE CURSE OF THE BLACK PEARL",
    "JURASSIC PARK",
    "BACK TO THE FUTURE",
    "BACK TO THE FUTURE PART III",
    "TERMINATOR 2: JUDGMENT DAY",
    "THE TERMINATOR",
    "RAIDERS OF THE LOST ARK",
    "INDIANA JONES AND THE LAST CRUSADE",
    "DIE HARD",
    "DIE HARD WITH A VENGEANCE",
    "TOP GUN: MAVERICK",
    "AVATAR",
    "AVATAR: THE WAY OF WATER",
    "DUNE",
    "MAD MAX: FURY ROAD",
    "EDGE OF TOMORROW",
    "JOHN WICK",
    "JOHN WICK: CHAPTER 4",
    "MISSION: IMPOSSIBLE - FALLOUT",
    "MISSION: IMPOSSIBLE - DEAD RECKONING PART ONE",
    "CASINO ROYALE",
    "SKYFALL",
    "OCEAN'S ELEVEN",
    "GHOSTBUSTERS",
    "PREDATOR",
    "ALIENS",
    "THE FIFTH ELEMENT",
    "RISE OF THE PLANET OF THE APES",
    "MINORITY REPORT",
    "BABY DRIVER",
    "SCOTT PILGRIM VS. THE WORLD",
    "TOTAL RECALL",
    "ROBOCOP",
    
    # ── Universal Household Names & Iconic Hits ──
    "THE SHAWSHANK REDEMPTION",
    "THE GODFATHER",
    "THE GODFATHER PART II",
    "INCEPTION",
    "FIGHT CLUB",
    "FORREST GUMP",
    "PULP FICTION",
    "INTERSTELLAR",
    "GOODFELLAS",
    "SEVEN",
    "THE SILENCE OF THE LAMBS",
    "THE GREEN MILE",
    "DJANGO UNCHAINED",
    "THE PRESTIGE",
    "THE DEPARTED",
    "INGLOURIOUS BASTERDS",
    "THE WOLF OF WALL STREET",
    "SHUTTER ISLAND",
    "THE TRUMAN SHOW",
    "TITANIC",
    "CATCH ME IF YOU CAN",
    "THE SIXTH SENSE",
    "OPPENHEIMER",
    "RESERVOIR DOGS",
    "SCARFACE",
    "THE SHINING",
    "PSYCHO",
    "JAWS",
    "THE EXORCIST",
    "BRAVEHEART",
    "AMERICAN PSYCHO",
    "V FOR VENDETTA",
    "GONE GIRL",
    "THE SOCIAL NETWORK",
    "KNIVES OUT",
    "PARASITE",
    "LA LA LAND",
    "WHIPLASH",
    "1917",
    "FORD V FERRARI",
    "GRAVITY",
    "EX MACHINA",
    "A QUIET PLACE",
    "THE CONJURING",
    "SAW",
    "HALLOWEEN",
    "WILLY WONKA & THE CHOCOLATE FACTORY",
    "GROUNDHOG DAY",
    "THE GREATEST SHOWMAN",
    "EDWARD SCISSORHANDS",
    "THE BIG LEBOWSKI",
    "BLADE RUNNER 2049",
    "BLADE RUNNER",
    "NO COUNTRY FOR OLD MEN",
    "HEAT",
    "TRAINING DAY",
    "KILL BILL: VOL. 1",
    "KILL BILL: VOL. 2",
    "THE GRAND BUDAPEST HOTEL",
    "EVERYTHING EVERYWHERE ALL AT ONCE",
    "GET OUT",
    "CREED",
    "ZODIAC",
    "ONCE UPON A TIME IN... HOLLYWOOD",
    "DUNKIRK",
    "LIFE OF PI",
    "THE SOUND OF MUSIC",
    "MARY POPPINS",
    
    # ── Beloved Family & Animated Classics ──
    "THE LION KING",
    "FINDING NEMO",
    "UP",
    "WALL·E",
    "COCO",
    "SOUL",
    "ALADDIN",
    "TOY STORY 4",
    "THE LITTLE MERMAID",
    "SPIRITED AWAY",
    "HOWL'S MOVING CASTLE",
    "THE NIGHTMARE BEFORE CHRISTMAS",
    "CORALINE",
    "E.T. THE EXTRA-TERRESTRIAL"
}

def main():
    print("=" * 70)
    print("APPLYING EASY, ULTRA-POPULAR, VERY SIMPLE FRAMES FILTER")
    print("=" * 70)
    
    # 1. Read existing data/frames.json (from answers (1).md)
    with open(FRAMES_JSON, 'r', encoding='utf-8') as f:
        all_frames = json.load(f)
    print(f"Loaded {len(all_frames)} total frames from {FRAMES_JSON}")
    
    # Filter to only easy & popular
    easy_frames = []
    for f in all_frames:
        if f['answer'] in EASY_POPULAR_TITLES:
            easy_frames.append(f)
            
    print(f"Selected {len(easy_frames)} easy & ultra-popular frames.")
    
    # Re-assign sequential IDs: f_1, f_2, ..., f_N
    for i, f in enumerate(easy_frames, start=1):
        f['id'] = f"f_{i}"
        
    # 2. Write filtered data/frames.json
    print(f"\n1. Writing filtered frames to {FRAMES_JSON}...")
    with open(FRAMES_JSON, 'w', encoding='utf-8') as f:
        json.dump(easy_frames, f, indent=2, ensure_ascii=False)
    print(f"   -> Wrote {len(easy_frames)} easy & popular frames to {FRAMES_JSON}")
    
    # 3. Update catalog.ts
    print(f"\n2. Updating {CATALOG_TS}...")
    with open(CATALOG_TS, 'r', encoding='utf-8') as f:
        catalog_src = f.read()
        
    dialogue_idx = catalog_src.find("export const DIALOGUE_CATALOG")
    if dialogue_idx == -1:
        dialogue_idx = catalog_src.find("// ── Guess The Dialogue")
    if dialogue_idx == -1:
        dialogue_idx = catalog_src.find("...DIALOGUE_CATALOG")
        
    catalog_header = """export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: 'image' | 'dialogue' | 'eye' | 'quote' | 'text';
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
    for f in easy_frames:
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
    print(f"   -> Updated catalog.ts with {len(easy_frames)} easy frames + dialogues + eyes + tie_breaker")
    
    # 4. Update assets_manifest.json
    print(f"\n3. Updating {ASSETS_MANIFEST_JSON}...")
    if os.path.exists(ASSETS_MANIFEST_JSON):
        with open(ASSETS_MANIFEST_JSON, 'r', encoding='utf-8') as f:
            manifest_items = json.load(f)
            
        non_frames = [item for item in manifest_items if item.get('category') != 'frames']
        new_manifest_frames = []
        for i, f in enumerate(easy_frames, start=1):
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

    # 5. Update SQLite database
    print(f"\n4. Updating SQLite database {SQLITE_DB}...")
    if os.path.exists(SQLITE_DB):
        conn = sqlite3.connect(SQLITE_DB)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM frames_metadata WHERE category = 'frames';")
        now_ms = int(time.time() * 1000)
        
        insert_rows = []
        for i, f in enumerate(easy_frames, start=1):
            slug = re.sub(r'[^\w\s-]', '', f['answer'].lower()).strip()
            slug = re.sub(r'[\s]+', '-', slug)
            movie_id = f"{slug}-{f['year']}"
            aliases_json = json.dumps(f['aliases']) if f['aliases'] else None
            disp_ans = f.get('displayAnswer')
            
            insert_rows.append((
                f['id'], movie_id, f['answer'], f['content'], 'frames', 'image',
                int(f['year']) if f['year'].isdigit() else 2000, 'standalone', 'hollywood',
                'cinema', '', 1, 98.0, 50.0, '', f['tag'], aliases_json,
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

    # 6. Update fallback frames in desktop_app.html, desktop/index.html, and android/js/gameClient.js
    top_fallback = easy_frames[:16]
    fallback_js_lines = []
    for f in top_fallback:
        line = f'            {{ type: "image", content: "{f["content"]}", answer: {json.dumps(f["answer"])}, year: "{f["year"]}", tag: "{f["tag"]}" }}'
        fallback_js_lines.append(line)
    new_fallback_block = ",\n".join(fallback_js_lines)
    
    pattern = r"(id:\s*1,\s*name:\s*'Guess the Frame'[^\]]*frames:\s*\[)[^\]]*(\])"
    replacement = rf"\g<1>\n{new_fallback_block}\n          \g<2>"
    
    print(f"\n5. Updating fallback frames in {DESKTOP_APP_HTML}...")
    with open(DESKTOP_APP_HTML, 'r', encoding='utf-8') as f:
        html = f.read()
    updated_html = re.sub(pattern, replacement, html)
    with open(DESKTOP_APP_HTML, 'w', encoding='utf-8') as f:
        f.write(updated_html)
    print("   -> Updated desktop_app.html")
    
    if os.path.exists(DESKTOP_INDEX_HTML):
        print(f"\n6. Updating fallback frames in {DESKTOP_INDEX_HTML}...")
        with open(DESKTOP_INDEX_HTML, 'r', encoding='utf-8') as f:
            d_html = f.read()
        d_updated = re.sub(pattern, replacement, d_html)
        with open(DESKTOP_INDEX_HTML, 'w', encoding='utf-8') as f:
            f.write(d_updated)
        print("   -> Updated desktop/index.html")

    if os.path.exists(ANDROID_GAME_CLIENT_JS):
        print(f"\n7. Updating fallback frames in {ANDROID_GAME_CLIENT_JS}...")
        with open(ANDROID_GAME_CLIENT_JS, 'r', encoding='utf-8') as f:
            a_js = f.read()
        a_updated = re.sub(pattern, replacement, a_js)
        with open(ANDROID_GAME_CLIENT_JS, 'w', encoding='utf-8') as f:
            f.write(a_updated)
        print("   -> Updated android/js/gameClient.js")

    print("\nSUCCESS: All datasets filtered strictly to easy & ultra-popular frames only!")

if __name__ == '__main__':
    main()
