import json

with open('data/bollywood_200_dialogues.json', encoding='utf-8') as f:
    data = json.load(f)

# Deduplicate by dialogue (ignoring case)
seen = set()
unique_items = []
for d in data:
    norm = d['dialogue'].strip().lower()
    if norm not in seen:
        seen.add(norm)
        unique_items.append(d)

print(f"Total unique dialogues available: {len(unique_items)}")

# Take exact top 200
top_200 = unique_items[:200]
for idx, item in enumerate(top_200, 1):
    item['id'] = f"d_{idx}"

with open('data/bollywood_200_dialogues.json', 'w', encoding='utf-8') as f:
    json.dump(top_200, f, indent=2, ensure_ascii=False)

with open('data/bollywood_200_dialogues.md', 'w', encoding='utf-8') as f:
    f.write("# 🎬 Top 200 Famous Bollywood Dialogues (IMDb Master Collection)\n\n")
    f.write("A curated, production-ready dataset of the **200 most iconic, legendary, and culture-defining dialogues in Bollywood cinema history** from top IMDb films.\n\n")
    f.write("| # | Dialogue | Movie | Year | Star / Character | IMDb | English Meaning |\n")
    f.write("|---|---|---|---|---|---|---|\n")
    for d in top_200:
        f.write(f"| {d['id']} | **\"{d['dialogue']}\"** | {d['movie']} | {d['year']} | {d['actor']} (*{d['character']}*) | ⭐ {d['imdb_rating']} | {d['english_translation']} |\n")

print(f"[OK] Successfully written exactly {len(top_200)} dialogues to:")
print(" - data/bollywood_200_dialogues.json")
print(" - data/bollywood_200_dialogues.md")
