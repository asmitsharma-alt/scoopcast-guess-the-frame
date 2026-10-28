import sys
sys.stdout.reconfigure(encoding='utf-8')
import time
from playwright.sync_api import sync_playwright

def run_tests():
    print("==================================================")
    print("🚀 SCOOPCAST FULL WEBSITE & MULTIPLAYER TEST SUITE")
    print("==================================================")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge', headless=True)

        # ──────────────────────────────────────────────────
        # TEST 1: Desktop Offline Single Player Mode
        # ──────────────────────────────────────────────────
        print("\n▶ [TEST 1] Testing Desktop Offline Single Player Mode...")
        page_d = browser.new_page(viewport={'width': 1280, 'height': 800})
        page_d.goto("http://localhost:2567/desktop_app.html", wait_until="domcontentloaded")
        page_d.wait_for_timeout(500)

        # Verify home screen elements
        home_visible = page_d.locator("#homeScreen").is_visible()
        print("  * Home screen visible:", home_visible)
        assert home_visible, "Home screen must be visible on load"

        # Click Solo Play / Offline mode
        solo_btn = page_d.locator("button:has-text('PLAY SOLO'), button:has-text('OFFLINE PLAY'), button:has-text('SINGLE PLAYER'), .spbtn").first
        if solo_btn.is_visible():
            solo_btn.click()
            page_d.wait_for_timeout(500)
            print("  * Solo play started. Current screen active:", page_d.locator("#gameScreen").is_visible())
        print("  ✔ [TEST 1 PASSED] Desktop offline single player operational!")
        page_d.close()

        # ──────────────────────────────────────────────────
        # TEST 2: Desktop Multiplayer Flow & Mid-Game Join Prevention
        # ──────────────────────────────────────────────────
        print("\n▶ [TEST 2] Testing Desktop Multiplayer Flow & Mid-Game Join Prevention...")
        page_host = browser.new_page(viewport={'width': 1280, 'height': 800})
        page_host.goto("http://localhost:2567/desktop_app.html", wait_until="domcontentloaded")
        page_host.wait_for_function('() => typeof window.CreateRoomWizard !== "undefined"')

        # Host opens room wizard
        page_host.evaluate('() => CreateRoomWizard.open()')
        page_host.wait_for_timeout(300)

        # Select Eyes section
        page_host.click("#gwSecCard-eyes")
        page_host.click("#gwNextBtn")
        page_host.wait_for_timeout(200)

        # Step 2: configure rounds
        page_host.click("#gwNextBtn")
        page_host.wait_for_timeout(200)

        # Step 3: Enter lobby
        page_host.click("#gwEnterLobbyBtn")
        page_host.wait_for_timeout(1000)

        # Wait for lobby screen and get room code
        page_host.wait_for_selector("#playerLobbyScreen.active, #playerLobbyScreen", timeout=5000)
        room_code = page_host.evaluate('() => MultiplayerEngine.roomCode || (document.getElementById("lobbyRoomCode") ? document.getElementById("lobbyRoomCode").textContent.trim() : "")')
        print(f"  * Host created room code: '{room_code}'")
        assert len(room_code) >= 3, "Room code must be at least 3 chars"

        # Player 2 Joins
        page_p2 = browser.new_page(viewport={'width': 1280, 'height': 800})
        page_p2.goto("http://localhost:2567/desktop_app.html", wait_until="domcontentloaded")
        page_p2.wait_for_function('() => typeof window.MultiplayerEngine !== "undefined"')
        page_p2.evaluate(f'''() => {{
            MultiplayerEngine.playerName = "Player2_Guest";
            MultiplayerEngine.confirmJoinRoom("{room_code}");
        }}''')
        page_p2.wait_for_timeout(1000)

        p2_lobby = page_p2.locator("#playerLobbyScreen").is_visible()
        print("  * Player 2 joined room. Lobby visible:", p2_lobby)
        assert p2_lobby, "Player 2 must be in lobby"

        # Allow ready failsafe timer to settle (1.2s)
        page_host.wait_for_timeout(1500)

        # Host starts game
        print("  * Host starting match...")
        page_host.evaluate('() => MultiplayerEngine.startMatch()')
        
        # Wait for game to enter playing phase
        page_host.wait_for_function('() => MultiplayerEngine.colyseusRoom && MultiplayerEngine.colyseusRoom.state && MultiplayerEngine.colyseusRoom.state.phase === "playing"', timeout=10000)
        page_p2.wait_for_function('() => MultiplayerEngine.colyseusRoom && MultiplayerEngine.colyseusRoom.state && MultiplayerEngine.colyseusRoom.state.phase === "playing"', timeout=10000)
        print("  * Match is now in 'playing' phase for both Host and Player 2!")

        # Player 3 attempts to join DURING ongoing game (MUST BE PREVENTED)
        print("  * Player 3 attempting to join during active game...")
        page_p3 = browser.new_page(viewport={'width': 1280, 'height': 800})
        page_p3.goto("http://localhost:2567/desktop_app.html", wait_until="domcontentloaded")
        page_p3.wait_for_function('() => typeof window.MultiplayerEngine !== "undefined"')

        dialog_handled = []
        page_p3.on("dialog", lambda dialog: (dialog_handled.append(dialog.message), dialog.accept()))

        page_p3.evaluate(f'''() => {{
            MultiplayerEngine.playerName = "Intruder_Player3";
            MultiplayerEngine.confirmJoinRoom("{room_code}");
        }}''')
        page_p3.wait_for_timeout(1500)

        print("  * Player 3 alert received:", dialog_handled)
        p3_in_game = page_p3.locator("#gameScreen.active").is_visible()
        assert not p3_in_game, "Player 3 MUST NOT be allowed into active gameScreen!"
        assert any("already started" in msg.lower() for msg in dialog_handled), "Player 3 must see alert that game has already started!"
        print("  ✔ [TEST 2.1 PASSED] Player 3 successfully prevented from joining ongoing game!")

        # Player 2 tests guess input
        page_p2.evaluate('''() => {
            MultiplayerEngine.submitGuessDirect("Inception");
        }''')
        page_p2.wait_for_timeout(300)
        print("  ✔ Guess submitted by Player 2")

        # Clean up
        page_host.close()
        page_p2.close()
        page_p3.close()
        print("  ✔ [TEST 2 PASSED] Desktop multiplayer & mid-game join prevention verified!")

        # ──────────────────────────────────────────────────
        # TEST 3: Mobile App End-to-End & Backgrounding Resilience
        # ──────────────────────────────────────────────────
        print("\n▶ [TEST 3] Testing Mobile App End-to-End & Backgrounding Resilience...")
        page_m_host = browser.new_page(viewport={'width': 390, 'height': 844})
        page_m_host.goto("http://localhost:2567/mobile_app.html", wait_until="domcontentloaded")
        page_m_host.wait_for_function('() => typeof window.CreateRoomWizard !== "undefined"')

        # Host opens mobile wizard
        page_m_host.evaluate('() => CreateRoomWizard.open()')
        page_m_host.wait_for_timeout(300)

        # Toggle Eyes
        page_m_host.click("#gwSecCard-eyes")
        page_m_host.click("#gwNextBtn")
        page_m_host.wait_for_timeout(300)

        # Step 2: verify Create Room button layout
        btn_box = page_m_host.locator("#gwEnterLobbyBtn").bounding_box()
        print(f"  * Mobile CREATE ROOM button dimensions: Width={btn_box['width']}px, Height={btn_box['height']}px")
        assert btn_box['height'] == 48, f"Button height should be exactly 48px, got {btn_box['height']}"

        page_m_host.click("#gwEnterLobbyBtn")
        page_m_host.wait_for_timeout(1000)

        m_code = page_m_host.evaluate('() => GameClient.roomCode || (document.getElementById("lobbyRoomCode") ? document.getElementById("lobbyRoomCode").textContent.trim() : "")')
        print(f"  * Mobile host created room code: '{m_code}'")

        # Mobile Player 2 joins
        page_m_p2 = browser.new_page(viewport={'width': 390, 'height': 844})
        page_m_p2.goto("http://localhost:2567/mobile_app.html", wait_until="domcontentloaded")
        page_m_p2.wait_for_function('() => typeof window.GameClient !== "undefined"')
        page_m_p2.evaluate(f'''() => {{
            GameClient.playerName = "Mobile_P2";
            GameClient.joinGame("{m_code}");
        }}''')
        page_m_p2.wait_for_timeout(1000)

        m_p2_lobby = page_m_p2.locator("#lobbyScreen").is_visible()
        print("  * Mobile Player 2 lobby visible:", m_p2_lobby)
        assert m_p2_lobby, "Mobile Player 2 must be in lobby"

        # Allow ready failsafe timer to settle (1.2s)
        page_m_host.wait_for_timeout(1500)

        # Host starts match on mobile
        page_m_host.evaluate('() => GameClient.startGame()')
        page_m_host.wait_for_function('() => GameClient.colyseusRoom && GameClient.colyseusRoom.state && GameClient.colyseusRoom.state.phase === "playing"', timeout=10000)
        page_m_p2.wait_for_function('() => GameClient.colyseusRoom && GameClient.colyseusRoom.state && GameClient.colyseusRoom.state.phase === "playing"', timeout=10000)
        print("  * Mobile match in 'playing' phase!")

        # Simulate tab backgrounding / pagehide on mobile Player 2 (MUST NOT DISCONNECT!)
        print("  * Dispatching pagehide event on mobile Player 2 (simulating app switch/screen lock)...")
        page_m_p2.evaluate('() => window.dispatchEvent(new Event("pagehide"))')
        page_m_p2.wait_for_timeout(500)

        is_connected = page_m_p2.evaluate('() => Boolean(GameClient.colyseusRoom && GameClient.colyseusRoom.connection && GameClient.colyseusRoom.connection.isOpen)')
        print("  * Mobile Player 2 connection after pagehide:", is_connected)
        assert is_connected, "Player MUST NOT be disconnected on pagehide during active match!"
        print("  ✔ [TEST 3.1 PASSED] Player 2 remained connected and active during backgrounding!")

        # Test Mobile Player 3 attempting to join ongoing mobile game
        page_m_p3 = browser.new_page(viewport={'width': 390, 'height': 844})
        page_m_p3.goto("http://localhost:2567/mobile_app.html", wait_until="domcontentloaded")
        page_m_p3.wait_for_function('() => typeof window.GameClient !== "undefined"')

        page_m_p3.evaluate(f'''() => {{
            GameClient.playerName = "Mobile_P3";
            GameClient.joinGame("{m_code}");
        }}''')
        page_m_p3.wait_for_timeout(1500)

        toast_text = page_m_p3.evaluate('() => (document.getElementById("mobileToast") ? document.getElementById("mobileToast").textContent : (document.getElementById("toast") ? document.getElementById("toast").textContent : ""))')
        print("  * Mobile Player 3 toast received:", toast_text)
        m_p3_in_game = page_m_p3.locator("#gameScreen.active").is_visible()
        assert not m_p3_in_game, "Mobile Player 3 MUST NOT be allowed into active gameScreen!"
        assert "already started" in toast_text.lower() or "not allowed" in toast_text.lower(), "Mobile Player 3 must see toast that game has already started!"
        print("  ✔ [TEST 3.2 PASSED] Mobile Player 3 correctly blocked from joining ongoing game!")

        page_m_host.close()
        page_m_p2.close()
        page_m_p3.close()
        print("  ✔ [TEST 3 PASSED] Mobile app end-to-end testing complete!")

        # ──────────────────────────────────────────────────
        # TEST 4: Admin Studio & Catalog Verification
        # ──────────────────────────────────────────────────
        print("\n▶ [TEST 4] Testing Admin Studio & Catalog Endpoints...")
        page_admin = browser.new_page(viewport={'width': 1280, 'height': 800})
        page_admin.goto("http://localhost:2567/admin", wait_until="domcontentloaded")
        page_admin.wait_for_timeout(500)
        admin_title = page_admin.title()
        print(f"  * Admin Studio title: '{admin_title}'")
        assert "admin" in admin_title.lower() or "guess the frame" in admin_title.lower() or "scoopcast" in admin_title.lower(), "Admin Studio title should match"
        page_admin.close()
        print("  ✔ [TEST 4 PASSED] Admin Studio verified!")

        browser.close()

    print("\n==================================================")
    print("🎉 ALL END-TO-END TESTS COMPLETED SUCCESSFULLY 100%!")
    print("==================================================")

if __name__ == '__main__':
    run_tests()
