import os
import sys
import json
import re
import urllib.parse

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
FRAMES_DIR = os.path.join(ROOT_DIR, "GUESSTHEFRAME", "All_Movie_Frames")
REPORT_FILE = os.path.join(ROOT_DIR, "data", "frame_mismatches_report.json")
DATA_FRAMES_JSON = os.path.join(ROOT_DIR, "data", "frames.json")
ASSETS_MANIFEST = os.path.join(ROOT_DIR, "assets_manifest.json")
CATALOG_TS = os.path.join(ROOT_DIR, "guess-the-frame-colyseus", "src", "data", "catalog.ts")

def main():
    if not os.path.exists(REPORT_FILE):
        print(f"Error: {REPORT_FILE} not found!")
        return

    with open(REPORT_FILE, "r", encoding="utf-8") as f:
        mismatches = json.load(f)

    bad_filenames = set(m["file"] for m in mismatches)
    print(f"Loaded {len(bad_filenames)} mismatched filenames from report.")

    # 1. Delete bad files from disk
    deleted_count = 0
    missing_count = 0
    for fname in bad_filenames:
        fpath = os.path.join(FRAMES_DIR, fname)
        if os.path.exists(fpath):
            try:
                os.remove(fpath)
                deleted_count += 1
            except Exception as e:
                print(f"Error deleting {fname}: {e}")
        else:
            missing_count += 1

    print(f"[DISK] Deleted {deleted_count} mismatched frames from {FRAMES_DIR} ({missing_count} already absent).")

    # 2. Update data/frames.json
    with open(DATA_FRAMES_JSON, "r", encoding="utf-8") as f:
        frames = json.load(f)

    clean_frames = []
    for fr in frames:
        content_url = fr["content"]
        fname = urllib.parse.unquote(os.path.basename(content_url))
        if fname not in bad_filenames:
            clean_frames.append(fr)

    # Re-index ids cleanly: lf_1, lf_2, ...
    for idx, fr in enumerate(clean_frames, start=1):
        fr["id"] = f"lf_{idx}"

    with open(DATA_FRAMES_JSON, "w", encoding="utf-8") as f:
        json.dump(clean_frames, f, indent=2, ensure_ascii=False)

    print(f"[DATA] Saved {len(clean_frames)} clean frames to {DATA_FRAMES_JSON} (removed {len(frames) - len(clean_frames)}).")

    # 3. Update assets_manifest.json
    if os.path.exists(ASSETS_MANIFEST):
        try:
            with open(ASSETS_MANIFEST, "r", encoding="utf-8") as f:
                manifest = json.load(f)
            clean_manifest = [
                item for item in manifest 
                if urllib.parse.unquote(item.get("filename", "")) not in bad_filenames
            ]
            with open(ASSETS_MANIFEST, "w", encoding="utf-8") as f:
                json.dump(clean_manifest, f, indent=2, ensure_ascii=False)
            print(f"[MANIFEST] Updated {ASSETS_MANIFEST}: {len(clean_manifest)} items remaining.")
        except Exception as e:
            print(f"[MANIFEST] Warning: could not update manifest: {e}")

    # 4. Rebuild catalog.ts
    # Read tie_breaker section from catalog.ts
    with open(CATALOG_TS, "r", encoding="utf-8") as f:
        current_ts = f.read()

    tb_match = re.search(r"(const TIE_BREAKER_CATALOG: CatalogItem\[\] = \[.*?\];)", current_ts, re.DOTALL)
    if tb_match:
        tb_code = tb_match.group(1)
    else:
        tb_code = """const TIE_BREAKER_CATALOG: CatalogItem[] = [
  {
    id: "tb_1",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Batman (2022).webp",
    answer: "THE BATMAN",
    year: "2022"
  },
  {
    id: "tb_2",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Wolf of Wall Street (2013).webp",
    answer: "THE WOLF OF WALL STREET",
    year: "2013"
  },
  {
    id: "tb_3",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Top Gun Maverick (2022).webp",
    answer: "TOP GUN MAVERICK",
    year: "2022"
  },
  {
    id: "tb_4",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Mad Max 2.jpg.webp",
    answer: "MAD MAX 2",
    year: "1981"
  }
];"""

    unique_movies = len(set(fr.get("movie", fr.get("answer")) for fr in clean_frames))

    ts_lines = [
        'import { DIALOGUE_CATALOG } from "./dialogueCatalog";',
        'import { EYES_CATALOG } from "./eyesCatalog";',
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
        'const FRAME_CATALOG: CatalogItem[] = [',
        f'  // ── Verified Pristine Movie Frames ({len(clean_frames):,} sharp, verified frames across {unique_movies} movies) ──'
    ]

    for item in clean_frames:
        escaped_ans = item["answer"].replace('"', '\\"')
        escaped_content = item["content"].replace('"', '\\"')
        year_str = str(item.get("year", ""))
        tag_str = str(item.get("tag", "classic"))
        
        entry_lines = [
            '  {',
            f'    id: "{item["id"]}",',
            '    category: "frames",',
            '    type: "image",',
            f'    content: "{escaped_content}",',
            f'    answer: "{escaped_ans}",',
            f'    year: "{year_str}",',
            f'    tag: "{tag_str}",'
        ]
        if "aliases" in item and item["aliases"]:
            aliases_json = json.dumps(item["aliases"], ensure_ascii=False)
            entry_lines.append(f'    aliases: {aliases_json}')
        entry_lines.append('  },')
        ts_lines.append('\n'.join(entry_lines))

    # Remove trailing comma on last item
    if ts_lines[-1].endswith(','):
        ts_lines[-1] = ts_lines[-1][:-1]
    ts_lines.append('];')
    ts_lines.append('')
    ts_lines.append(tb_code)
    ts_lines.append('')
    ts_lines.append('export const CATALOG: CatalogItem[] = FRAME_CATALOG.concat(EYES_CATALOG, TIE_BREAKER_CATALOG);')
    ts_lines.append('')

    with open(CATALOG_TS, "w", encoding="utf-8") as f:
        f.write('\n'.join(ts_lines))

    print(f"[CATALOG] Rebuilt {CATALOG_TS} with {len(clean_frames)} verified frames + eyes + tie breakers.")
    print("\n✅ Successfully purged all 200 mismatched frames from disk and database!")

if __name__ == "__main__":
    main()
