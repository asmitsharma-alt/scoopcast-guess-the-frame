// Android Soft-Keyboard Observer & Zen Focus Manager
// Shows ONLY the full cinema frame and the "TYPE YOUR GUESS" option when typing, hiding all clutter
const KeyboardManager = {
  isKeyboardOpen: false,

  init() {
    const input = document.getElementById('mobileGuessInput');
    const chatInput = document.getElementById('chatInput');
    const dock = document.getElementById('mobileActionDock');
    const mirror = document.getElementById('liveTypingMirror');
    const mirrorText = document.getElementById('liveTypingMirrorText');

    if (!input || !dock) return;

    // Helper: Close all open drawers & backdrops
    const closeDrawers = () => {
      document.querySelectorAll('.drawer-sheet').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.drawer-backdrop').forEach(b => b.classList.remove('active'));
    };

    // 1. Mirror keystrokes in real time into the high-contrast mirror bar
    input.addEventListener('input', () => {
      const val = input.value.toUpperCase();
      if (mirrorText) {
        mirrorText.textContent = val || 'TYPE YOUR GUESS...';
      }
      if (mirror) {
        mirror.style.display = val ? 'flex' : 'none';
      }
    });

    // 2. Keyboard Focus / Blur state for Guess Input
    input.addEventListener('focus', () => {
      closeDrawers();
      document.body.classList.add('keyboard-open');
      this.isKeyboardOpen = true;
      if (typeof Haptics !== 'undefined') Haptics.tap();
      if (input.value && mirror) {
        mirror.style.display = 'flex';
      }
      this.updateViewportLayout();
    });

    input.addEventListener('blur', () => {
      // Delay so tap outside or submit button can process
      setTimeout(() => {
        if (document.activeElement !== input && document.activeElement !== chatInput) {
          document.body.classList.remove('keyboard-open');
          this.isKeyboardOpen = false;
          dock.style.bottom = '0px';
          if (mirror) mirror.style.display = 'none';
        }
      }, 120);
    });

    // 3. If Chat Input is focused while on Game Screen, switch seamlessly to Guess Dock
    if (chatInput) {
      chatInput.addEventListener('focus', () => {
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen && gameScreen.classList.contains('active')) {
          closeDrawers();
          input.focus();
        } else {
          document.body.classList.add('keyboard-open');
          this.isKeyboardOpen = true;
        }
      });

      chatInput.addEventListener('blur', () => {
        setTimeout(() => {
          if (document.activeElement !== input && document.activeElement !== chatInput) {
            document.body.classList.remove('keyboard-open');
            this.isKeyboardOpen = false;
          }
        }, 120);
      });
    }

    // 4. Visual Viewport API (Standard on Android Chrome 108+, Samsung Internet, Firefox)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        this.updateViewportLayout();
      });
      window.visualViewport.addEventListener('scroll', () => {
        this.updateViewportLayout();
      });
    }

    // 5. Tap outside dismisses the soft keyboard and restores all UI elements
    const dismissTriggers = document.querySelectorAll('#frameStage, #frameMediaContainer, #gameFrameImage, #gameDialogueBox, #gameScreen, .dismiss-kb');
    dismissTriggers.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('#mobileActionDock') || e.target.closest('#liveTypingMirror')) return;
        if (document.activeElement === input || document.activeElement === chatInput) {
          if (input) input.blur();
          if (chatInput) chatInput.blur();
          closeDrawers();
        }
      });
    });
  },

  updateViewportLayout() {
    if (!window.visualViewport) return;
    const dock = document.getElementById('mobileActionDock');
    if (!dock) return;

    const vv = window.visualViewport;
    const vpH = document.documentElement.clientHeight || window.innerHeight;
    const heightDiff = vpH - (vv.height + vv.offsetTop);

    if (heightDiff > 120) {
      document.body.classList.add('keyboard-open');
      dock.style.bottom = `${Math.max(0, heightDiff)}px`;
    } else {
      dock.style.bottom = '0px';
    }
  },

  clearInput() {
    const input = document.getElementById('mobileGuessInput');
    const mirror = document.getElementById('liveTypingMirror');
    const mirrorText = document.getElementById('liveTypingMirrorText');

    if (input) {
      input.value = '';
      if (mirrorText) mirrorText.textContent = '';
      if (mirror) mirror.style.display = 'none';
      input.focus();
      if (typeof Haptics !== 'undefined') Haptics.tap();
    }
  }
};

window.KeyboardManager = KeyboardManager;
