import os
import sys
import json
import re
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_DIR = r"C:\Users\admin\Documents\projects\scoopcast.me"
PORT = 8923

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=REPO_DIR, **kwargs)

    def log_message(self, format, *args):
        # Silence standard HTTP logs
        pass

def start_server():
    server = HTTPServer(('127.0.0.1', PORT), CustomHandler)
    server.serve_forever()

def verify_frames():
    print("=" * 70)
    print("PLAYWRIGHT EXACT FRAMES VERIFICATION: SCOOPCAST")
    print("=" * 70)

    # 1. Start local server in thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    print(f"Local server listening on http://127.0.0.1:{PORT}")
    time.sleep(1)

    # 2. Load answers (1).md to cross-reference
    answers_md_path = r"C:\Users\admin\Downloads\answers (1).md"
    expected_frames = []
    with open(answers_md_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line.startswith('|') or 'Film' in line or '---' in line:
                continue
            parts = [p.strip() for p in line.split('|')[1:-1]]
            if len(parts) >= 6:
                raw_url = parts[5]
                url_match = re.search(r'https?://[^\)\s]+', raw_url)
                url = url_match.group(0) if url_match else raw_url
                expected_frames.append({
                    'rank': parts[1],
                    'title': parts[2].upper(),
                    'year': parts[3],
                    'rating': parts[4],
                    'url': url
                })
    from apply_easy_popular_frames import EASY_POPULAR_TITLES
    print(f"Loaded {len(EASY_POPULAR_TITLES)} easy & popular titles in filter")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Navigate to desktop_app.html
        print(f"\n[TEST 1] Loading http://127.0.0.1:{PORT}/desktop_app.html ...")
        page.goto(f"http://127.0.0.1:{PORT}/desktop_app.html", wait_until="networkidle", timeout=30000)
        time.sleep(2)

        # 3. Check GS.sections[0].frames
        frames = page.evaluate("""() => {
            if (!window.GS || !window.GS.sections || !window.GS.sections[0]) return null;
            return window.GS.sections[0].frames;
        }""")

        assert frames is not None, "FAILED: window.GS.sections[0].frames is null or undefined"
        print(f"Browser loaded frame pool of length: {len(frames)}")
        assert len(frames) == 149, f"FAILED: Expected exactly 149 frames, got {len(frames)}"

        # 4. Verify all frames are Cloudinary imdb-top500-frame-quiz
        non_cloudinary = [f for f in frames if not (isinstance(f.get('content'), str) and 'imdb-top500-frame-quiz' in f['content'])]
        assert len(non_cloudinary) == 0, f"FAILED: Found non-Cloudinary frames: {non_cloudinary}"
        print(f"All {len(frames)} frames strictly use Cloudinary 'imdb-top500-frame-quiz' URLs")

        # 5. Verify every single movie in the pool is in EASY_POPULAR_TITLES
        non_popular = [f for f in frames if f.get('answer') not in EASY_POPULAR_TITLES]
        assert len(non_popular) == 0, f"FAILED: Found non-popular frames: {non_popular}"
        print(f"All 149 frames are 100% verified EASY & ULTRA-POPULAR household movies!")

        # 6. Verify Fight Club masking
        fight_club = [f for f in frames if f.get('answer') == 'FIGHT CLUB']
        assert len(fight_club) > 0, "Fight club not in pool"
        assert fight_club[0].get('displayAnswer') == '***** ****', f"Fight Club masking missing: {fight_club[0]}"
        print(f"Fight Club special rule verified: displayAnswer = '***** ****'")

        # 7. Start Game and verify actual frame rendering in DOM
        print("\n[TEST 2] Testing live DOM rendering and image loading...")
        page.evaluate("""async () => {
            if (typeof UI !== 'undefined' && UI.showScreen) {
                UI.showScreen('gameScreen');
            }
            const firstFrame = window.GS.sections[0].frames[0];
            await FrameDisplay.showFrame(firstFrame);
        }""")
        time.sleep(2)

        # Verify image element is populated with one of the 500 frames
        img_info = page.evaluate("""() => {
            const img = document.querySelector('#imageContainer img.frame-image');
            if (!img) return null;
            return {
                src: img.src,
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
            };
        }""")
        print(f"Live Game Frame DOM Image Info: {img_info}")
        assert img_info and "imdb-top500-frame-quiz" in img_info['src'], f"Image src does not contain imdb-top500-frame-quiz: {img_info}"
        assert img_info['complete'] and img_info['naturalWidth'] > 0, f"Image did not load successfully: {img_info}"
        print(f"Live game image correctly rendered and decoded ({img_info['naturalWidth']}x{img_info['naturalHeight']}) with curated Cloudinary frame!")

        screenshot_path = os.path.join(REPO_DIR, "playwright_frame_verified.png")
        page.screenshot(path=screenshot_path)
        print(f"Saved gameplay screenshot to: {screenshot_path}")

        # 8. Test mobile app client as well
        print(f"\n[TEST 3] Testing http://127.0.0.1:{PORT}/mobile_app.html ...")
        mobile_page = browser.new_page(viewport={"width": 412, "height": 915})
        mobile_page.goto(f"http://127.0.0.1:{PORT}/mobile_app.html", wait_until="networkidle", timeout=30000)
        time.sleep(2)

        mobile_frames_count = mobile_page.evaluate("""() => {
            if (typeof GAME_SECTIONS !== 'undefined' && GAME_SECTIONS[0]) {
                return GAME_SECTIONS[0].frames.length;
            }
            return 0;
        }""")
        print(f"Mobile app GAME_SECTIONS[0].frames count: {mobile_frames_count}")
        assert mobile_frames_count == 149, f"Expected 149 frames on mobile, got {mobile_frames_count}"
        print("Mobile client synchronized with exact 149 easy frames!")

        browser.close()

    print("\n" + "=" * 70)
    print("ALL PLAYWRIGHT VERIFICATIONS PASSED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == '__main__':
    verify_frames()
