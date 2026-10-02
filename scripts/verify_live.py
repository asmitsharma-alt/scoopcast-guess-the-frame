import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

def main():
    print("Verifying live production site https://scoopcast.me ...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge', headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto('https://scoopcast.me', wait_until='networkidle', timeout=30000)
        time.sleep(2)
        
        frames_count = page.evaluate('() => window.GS && window.GS.sections && window.GS.sections[0] ? window.GS.sections[0].frames.length : 0')
        all_curated = page.evaluate('() => window.GS.sections[0].frames.every(f => typeof f.content === "string" && f.content.includes("imdb-top500-frame-quiz"))')
        sample = page.evaluate('() => window.GS.sections[0].frames.slice(0, 3).map(f => ({ answer: f.answer, url: f.content }))')
        
        print(f"Live Production Total Frames: {frames_count}")
        print(f"All 100% Curated Cloudinary URLs: {all_curated}")
        print(f"Sample First 3 Frames: {sample}")
        
        assert frames_count == 149, f"Expected 149 frames, got {frames_count}"
        assert all_curated, "Not all frames are from the curated Cloudinary set"
        
        # Take a live screenshot
        page.screenshot(path="live_production_verified.png")
        print("Live screenshot saved to live_production_verified.png")
        browser.close()
        
    print("LIVE PRODUCTION VERIFICATION 100% SUCCESSFUL!")

if __name__ == '__main__':
    main()
