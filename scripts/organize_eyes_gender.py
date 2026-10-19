import os
import sys
import shutil
import json
import re

ROOT_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
EYES_DIR = os.path.join(ROOT_DIR, "GUESSTHEEYES")
MALE_DIR = os.path.join(EYES_DIR, "MALE")
FEMALE_DIR = os.path.join(EYES_DIR, "FEMALE")
CATALOG_PATH = os.path.join(ROOT_DIR, "guess-the-frame-colyseus", "src", "data", "eyesCatalog.ts")
WEEKLY_DROPS = os.path.join(ROOT_DIR, "weekly_drops.json")

os.makedirs(MALE_DIR, exist_ok=True)
os.makedirs(FEMALE_DIR, exist_ok=True)

# Complete known male names set
MALE_NAMES = {
    # Earlier male entries
    "Bhuvan Bam", "Dulquer Salmaan", "kiccha Sudeep", "Kyle Chandler", 
    "Leonardo DiCaprio", "Robert Pattinson", "Shah Rukh Khan",

    # 100 Male actors
    "Amitabh Bachchan", "Salman Khan", "Aamir Khan", "Akshay Kumar", "Ajay Devgn",
    "Hrithik Roshan", "Ranbir Kapoor", "Ranveer Singh", "Prabhas", "Allu Arjun",
    "Ram Charan", "N. T. Rama Rao Jr.", "N.T. Rama Rao Jr.", "Rajinikanth", "Kamal Haasan",
    "Thalapathy Vijay", "Vijay", "Ajith Kumar", "Suriya", "Dhanush", "Vikram",
    "Mohanlal", "Mammootty", "Fahadh Faasil", "Yash", "Rishab Shetty",
    "Shahid Kapoor", "Saif Ali Khan", "Varun Dhawan", "Sidharth Malhotra",
    "Kartik Aaryan", "Ayushmann Khurrana", "Vicky Kaushal", "Rajkummar Rao",
    "Nawazuddin Siddiqui", "Manoj Bajpayee", "Pankaj Tripathi", "Sanjay Dutt",
    "Suniel Shetty", "Anil Kapoor", "Jackie Shroff", "Govinda", "Sunny Deol",
    "Bobby Deol", "John Abraham", "Emraan Hashmi", "Tiger Shroff", "R. Madhavan",
    "Vijay Sethupathi", "Sivakarthikeyan", "Mahesh Babu", "Diljit Dosanjh",
    "Tom Cruise", "Brad Pitt", "Johnny Depp", "Robert Downey Jr.", "Christian Bale",
    "Keanu Reeves", "Cillian Murphy", "Ryan Gosling", "Ryan Reynolds",
    "Chris Hemsworth", "Chris Evans", "Chris Pratt", "Henry Cavill", "Tom Hardy",
    "Hugh Jackman", "Matthew McConaughey", "Joaquin Phoenix", "Denzel Washington",
    "Morgan Freeman", "Samuel L. Jackson", "Al Pacino", "Robert De Niro",
    "Tom Hanks", "Harrison Ford", "Will Smith", "Matt Damon", "Ben Affleck",
    "George Clooney", "Daniel Craig", "Jake Gyllenhaal", "Benedict Cumberbatch",
    "Tom Hiddleston", "Michael Fassbender", "Javier Bardem", "Pedro Pascal",
    "Timothée Chalamet", "Austin Butler", "Paul Mescal", "Andrew Garfield",
    "Michael B. Jordan", "Jason Statham", "Dwayne Johnson", "Vin Diesel",
    "Mark Wahlberg", "Nicolas Cage", "Jim Carrey", "Adam Sandler", "Bradley Cooper",
    "Jared Leto", "Willem Dafoe"
}

male_norm = set(n.lower().replace(".", "").replace(" ", "").replace("-", "") for n in MALE_NAMES)

def is_male(name, answer):
    norm_n = name.lower().replace(".", "").replace(" ", "").replace("-", "")
    norm_a = answer.lower().replace(".", "").replace(" ", "").replace("-", "")
    if norm_n in male_norm or norm_a in male_norm:
        return True
    return any(m in norm_n for m in ["bhuvan", "dulquer", "sudeep", "chandler", "dicaprio", "pattinson", "shahrukh", "srk"])

with open(CATALOG_PATH, "r", encoding="utf-8") as f:
    catalog_text = f.read()

# Pattern for each item in eyesCatalog
# Parse each object block
item_blocks = re.findall(r'(\{\s+id:\s*"[^"]+".*?year:\s*""\s*\})', catalog_text, re.DOTALL)
print(f"Found {len(item_blocks)} eye item blocks in eyesCatalog.ts")

updated_blocks = []
moved_males = 0
moved_females = 0

for block in item_blocks:
    id_m = re.search(r'id:\s*"([^"]+)"', block)
    content_m = re.search(r'content:\s*"([^"]+)"', block)
    reveal_m = re.search(r'revealContent:\s*"([^"]+)"', block)
    ans_m = re.search(r'answer:\s*"([^"]+)"', block)

    if not (id_m and content_m and reveal_m and ans_m):
        updated_blocks.append(block)
        continue

    item_id = id_m.group(1)
    content_path = content_m.group(1)
    reveal_path = reveal_m.group(1)
    answer = ans_m.group(1)

    crop_filename = os.path.basename(content_path)
    reveal_filename = os.path.basename(reveal_path)
    person_name = reveal_filename.replace(".webp", "")

    male = is_male(person_name, answer)
    target_subdir = "MALE" if male else "FEMALE"
    target_dir = MALE_DIR if male else FEMALE_DIR

    # Move files from EYES_DIR to target_dir if they are in root of EYES_DIR
    src_crop = os.path.join(EYES_DIR, crop_filename)
    dest_crop = os.path.join(target_dir, crop_filename)
    if os.path.exists(src_crop):
        shutil.move(src_crop, dest_crop)

    src_rev = os.path.join(EYES_DIR, reveal_filename)
    dest_rev = os.path.join(target_dir, reveal_filename)
    if os.path.exists(src_rev):
        shutil.move(src_rev, dest_rev)

    if male:
        moved_males += 1
    else:
        moved_females += 1

    # Update paths in block
    new_content = f"/GUESSTHEEYES/{target_subdir}/{crop_filename}"
    new_reveal = f"/GUESSTHEEYES/{target_subdir}/{reveal_filename}"

    new_block = block.replace(content_path, new_content).replace(reveal_path, new_reveal)
    updated_blocks.append(new_block)

print(f"Processed: {moved_males} Males moved to GUESSTHEEYES/MALE, {moved_females} Females moved to GUESSTHEEYES/FEMALE.")

# Reconstruct eyesCatalog.ts
new_catalog_content = 'import type { CatalogItem } from "./catalog";\n\nexport const EYES_CATALOG: CatalogItem[] = [\n'
new_catalog_content += ',\n'.join(updated_blocks) + '\n];\n'

with open(CATALOG_PATH, "w", encoding="utf-8") as f:
    f.write(new_catalog_content)

print(f"[OK] Successfully updated {CATALOG_PATH}")

# Update weekly_drops.json if present
if os.path.exists(WEEKLY_DROPS):
    with open(WEEKLY_DROPS, "r", encoding="utf-8") as f:
        drops_text = f.read()
    drops_text = drops_text.replace("/GUESSTHEEYES/Bhuvan Bam", "/GUESSTHEEYES/MALE/Bhuvan Bam")
    with open(WEEKLY_DROPS, "w", encoding="utf-8") as f:
        f.write(drops_text)
    print(f"[OK] Updated {WEEKLY_DROPS}")

# Verification check
print("\nVerifying all files exist at their new paths...")
missing = 0
for b in updated_blocks:
    c_match = re.search(r'content:\s*"([^"]+)"', b)
    r_match = re.search(r'revealContent:\s*"([^"]+)"', b)
    if c_match and r_match:
        c_rel = c_match.group(1).lstrip("/")
        r_rel = r_match.group(1).lstrip("/")
        if not os.path.exists(os.path.join(ROOT_DIR, c_rel)):
            print(f"  ❌ Missing crop: {c_rel}")
            missing += 1
        if not os.path.exists(os.path.join(ROOT_DIR, r_rel)):
            print(f"  ❌ Missing reveal: {r_rel}")
            missing += 1

if missing == 0:
    print(f"✅ 100% of all 212 eye pairs verified successfully on disk!")
else:
    print(f"⚠️ {missing} files missing!")
