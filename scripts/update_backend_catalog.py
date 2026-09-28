import json
import re
import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
frames_file = os.path.join(root_dir, 'data', 'frames.json')
catalog_file = os.path.join(root_dir, 'guess-the-frame-colyseus', 'src', 'data', 'catalog.ts')

with open(frames_file, 'r', encoding='utf-8') as f:
    frames = json.load(f)

with open(catalog_file, 'r', encoding='utf-8') as f:
    cat_text = f.read()

m = re.search(r'(// ── Guess The Dialogue.*)', cat_text, re.DOTALL)
if not m:
    print('Error: Could not find dialogue marker in catalog.ts')
    exit(1)
non_frames_code = m.group(1)

lines = [
    "export type MediaType = 'image' | 'dialogue' | 'eye';",
    "",
    "export interface CatalogItem {",
    "  id: string;",
    "  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';",
    "  type: MediaType;",
    "  content: string;",
    "  revealContent?: string;",
    "  dialogue?: string;",
    "  answer: string;",
    "  year?: string;",
    "  aliases?: string[];",
    "  tag?: 'new' | 'classic';",
    "}",
    "",
    "export const CATALOG: CatalogItem[] = [",
    f"  // ── Guess The Frame ({len(frames)} Dynamic Cinema Frames) ──"
]

for idx, f in enumerate(frames):
    ans = f.get('answer', '').strip().replace('\\', '\\\\').replace('"', '\\"')
    url = f.get('content', '').strip().replace('\\', '\\\\').replace('"', '\\"')
    yr = str(f.get('year', '')).strip()
    tag = f.get('tag', 'classic')
    
    item_str = f"""  {{
    id: "f_{idx+1}",
    category: "frames",
    type: "image",
    content: "{url}",
    answer: "{ans}",
    year: "{yr}",
    tag: "{tag}"
  }},"""
    lines.append(item_str)

full_code = '\n'.join(lines) + '\n\n  ' + non_frames_code

with open(catalog_file, 'w', encoding='utf-8') as f:
    f.write(full_code)

print(f"Successfully updated catalog.ts with {len(frames)} frames!")
