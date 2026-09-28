import json
import os
import re
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "frames.json")

# Explicit blocklist of titles containing sexual content, nudity, erotic thrillers, or inappropriate themes
SEXUAL_CONTENT_BLOCKLIST = [
    # Explicit titles identified in catalog
    "NEKROMANTIK",
    "CRIMES OF PASSION",
    "LOLITA (1997)",
    "LOLITA",
    "THE WHIP AND THE BODY",
    "THE NAKED KISS",
    "ANTICHRIST",
    "BENEDETTA",
    "DEEP WATER",
    "TITANE",
    "HAPPINESS",
    "FATAL ATTRACTION",
    "FEMME FATALE",
    "THE NIGHT PORTER",
    "THE UNTAMED",
    "LIFEFORCE",
    "KOKOMO CITY",
    "INFINITY POOL",
    "RED ROCKET",
    "DESERT HEARTS",
    "THE MARGIN",
    "BABYLON",
    "LOVE LIES BLEEDING",
    "FLASHDANCE",
    
    # Generic erotic/adult markers
    "CALIGULA",
    "SALÒ",
    "SALO",
    "NYMPHOMANIAC",
    "BASIC INSTINCT",
    "WILD THINGS",
    "SHOWGIRLS",
    "FIFTY SHADES",
    "50 SHADES",
    "SHORTBUS",
    "CRASH (1996)",
    "THE DREAMERS",
    "BLUE IS THE WARMEST COLOR",
    "LUST, CAUTION",
    "TIE ME UP! TIE ME DOWN!",
    "INTIMACY",
    "LIE WITH ME",
    "PINK FLAMINGOS"
]

def clean_frames():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        frames = json.load(f)
    
    original_count = len(frames)
    purged = []
    retained = []
    
    for f in frames:
        title = f.get("answer", "").strip().upper()
        # Check against blocklist
        is_blocked = False
        for b in SEXUAL_CONTENT_BLOCKLIST:
            if b in title:
                is_blocked = True
                break
        
        # Check URL or tags for sexual keywords
        url = f.get("content", "").lower()
        if any(w in url for w in ["erotic", "nude", "porn", "xxx", "nekromantik", "lolita"]):
            is_blocked = True
            
        if is_blocked:
            purged.append(f"{title} ({f.get('year', '')})")
        else:
            retained.append(f)
            
    print(f"Original frames: {original_count}")
    print(f"Purged {len(purged)} frames with sexual/inappropriate content:")
    for p in purged:
        print(f"  ❌ Removed: {p}")
        
    print(f"Remaining clean frames: {len(retained)}")
    
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(retained, f, indent=2, ensure_ascii=False)
        
    print("✓ data/frames.json successfully updated with zero sexual content.")

if __name__ == "__main__":
    clean_frames()
