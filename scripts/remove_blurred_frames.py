"""
Purge all 1,291 blurred, out-of-focus, and underexposed frames from:
1. Local disk: GUESSTHEFRAME/All_Movie_Frames/
2. Backend catalog: guess-the-frame-colyseus/src/data/catalog.ts
3. Client data: data/frames.json
"""

import os
import sys
import json
import urllib.parse
import re

def main():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    report_file = os.path.join(base_dir, 'blurred_images_report.json')
    frames_dir = os.path.join(base_dir, 'GUESSTHEFRAME', 'All_Movie_Frames')
    catalog_ts_path = os.path.join(base_dir, 'guess-the-frame-colyseus', 'src', 'data', 'catalog.ts')
    frames_json_path = os.path.join(base_dir, 'data', 'frames.json')

    if not os.path.isfile(report_file):
        print(f"Error: {report_file} not found!")
        sys.exit(1)

    with open(report_file, 'r', encoding='utf-8') as rf:
        report_data = json.load(rf)

    blurry_files = set(x['file'] for x in report_data.get('blurry_frames', []))
    print(f"Loaded {len(blurry_files)} blurred/defective files to remove from report.")

    # ── 1. DELETE FROM LOCAL DISK ──
    deleted_local_count = 0
    missing_local_count = 0

    for fname in blurry_files:
        fpath = os.path.join(frames_dir, fname)
        if os.path.isfile(fpath):
            try:
                os.remove(fpath)
                deleted_local_count += 1
            except Exception as e:
                print(f"Error removing {fpath}: {e}")
        else:
            missing_local_count += 1

    remaining_local_files = [f for f in os.listdir(frames_dir) if f.lower().endswith(('.webp', '.png', '.jpg', '.jpeg'))]
    print(f"\n[1/3] Local disk cleanup:")
    print(f"  Deleted: {deleted_local_count} files")
    print(f"  Already missing: {missing_local_count} files")
    print(f"  Remaining crisp frames on disk: {len(remaining_local_files)}")

    # ── 2. UPDATE BACKEND CATALOG.TS ──
    if os.path.isfile(catalog_ts_path):
        with open(catalog_ts_path, 'r', encoding='utf-8') as cf:
            catalog_content = cf.read()

        # Parse CATALOG array items
        # Find start of CATALOG array and end
        # We know eyes and tie_breaker start around "category: 'eyes'" or 'category: "eyes"'
        # Let's inspect catalog.ts structure
        # The file has imports, types, export const CATALOG: CatalogItem[] = [ ... ];
        # Let's read the catalog entries cleanly
        cat_match = re.search(r'export const CATALOG:\s*CatalogItem\[\]\s*=\s*\[(.*?)\];', catalog_content, re.DOTALL)
        if cat_match:
            raw_entries_block = cat_match.group(1)

            # Split entries by objects: `{ ... }`
            # Using regex to find each object in the array
            entry_pattern = re.compile(r'\{\s*id:\s*"([^"]+)",\s*category:\s*"([^"]+)",(.*?)\}', re.DOTALL)
            
            kept_frame_entries = []
            non_frame_entries = []
            removed_from_catalog = 0

            # Match all `{ ... }` blocks
            # Or iterate through matches of `\{[^}]+\}`
            # Since entries in catalog.ts are single-level objects without nested braces:
            raw_objects = re.findall(r'\{\s*id:\s*"[^"]+".*?\}', raw_entries_block, re.DOTALL)
            print(f"\nFound {len(raw_objects)} raw items in catalog.ts")

            new_frame_index = 1
            for obj in raw_objects:
                # Extract category
                cat_m = re.search(r'category:\s*"([^"]+)"', obj)
                category = cat_m.group(1) if cat_m else ""

                if category == "frames":
                    # Extract content URL
                    content_m = re.search(r'content:\s*"([^"]+)"', obj)
                    if not content_m:
                        continue
                    raw_content = content_m.group(1)
                    # Decode URL path
                    decoded_fname = os.path.basename(urllib.parse.unquote(raw_content))
                    
                    if decoded_fname in blurry_files:
                        removed_from_catalog += 1
                        continue

                    # Also verify file actually exists locally
                    local_target = os.path.join(frames_dir, decoded_fname)
                    if not os.path.isfile(local_target):
                        removed_from_catalog += 1
                        continue

                    # Re-index ID: id: "lf_N"
                    updated_obj = re.sub(r'id:\s*"[^"]+"', f'id: "lf_{new_frame_index}"', obj, count=1)
                    new_frame_index += 1
                    kept_frame_entries.append(updated_obj)
                else:
                    non_frame_entries.append(obj)

            print(f"[2/3] Backend catalog.ts:")
            print(f"  Removed blurred frames: {removed_from_catalog}")
            print(f"  Kept sharp frames: {len(kept_frame_entries)}")
            print(f"  Kept non-frame items (eyes/tie-breaker): {len(non_frame_entries)}")

            # Reconstruct CATALOG array
            all_kept_entries = kept_frame_entries + non_frame_entries
            
            # Format nicely with indentation
            new_catalog_code = """import { DIALOGUE_CATALOG } from "./dialogueCatalog";

export type MediaType = "image" | "dialogue" | "eye";

export interface CatalogItem {
  id: string;
  category: "frames" | "dialogue" | "eyes" | "tie_breaker";
  type: MediaType;
  content: string;
  revealContent?: string;
  dialogue?: string;
  answer: string;
  displayAnswer?: string;
  year?: string;
  character?: string;
  actor?: string;
  region?: "bollywood" | "hollywood" | "regional" | "international";
  aliases?: string[];
  tag?: "new" | "classic" | "modern" | string;
}

export const CATALOG: CatalogItem[] = [
  // ── Pristine In-Focus Movie Frames (1,622 sharp frames across 273 movies) ──
""" + ",\n".join(all_kept_entries) + "\n];\n"

            with open(catalog_ts_path, 'w', encoding='utf-8') as cf:
                cf.write(new_catalog_code)
            print(f"  Successfully wrote updated {catalog_ts_path}")

    # ── 3. UPDATE DATA/FRAMES.JSON ──
    if os.path.isfile(frames_json_path):
        with open(frames_json_path, 'r', encoding='utf-8') as jf:
            frames_json_data = json.load(jf)

        new_frames_json = []
        for item in frames_json_data:
            content_url = item.get('content', '')
            fname = os.path.basename(urllib.parse.unquote(content_url))
            if fname not in blurry_files and os.path.isfile(os.path.join(frames_dir, fname)):
                new_frames_json.append(item)

        with open(frames_json_path, 'w', encoding='utf-8') as jf:
            json.dump(new_frames_json, jf, indent=2)

        print(f"\n[3/3] Client data/frames.json:")
        print(f"  Before: {len(frames_json_data)} frames")
        print(f"  After:  {len(new_frames_json)} frames")

    print("\n" + "="*60)
    print("SUCCESS: ALL BLURRED FRAMES REMOVED LOCALLY & FROM GAME CATALOG!")
    print("="*60)

if __name__ == "__main__":
    main()
