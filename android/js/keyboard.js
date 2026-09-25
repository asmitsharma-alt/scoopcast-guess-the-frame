// Android Soft-Keyboard Observer & Viewport Manager
// Keeps the movie frame AND the typed answer 100% visible at all times on all Android screens
const KeyboardManager = {
  isKeyboardOpen: false,
  baselineHeight: window.innerHeight,

  init() {
    const input = document.getElementById('mobileGuessInput');
    const chatInput = document.getElementById('chatInput');
    const dock = document.getElementById('mobileActionDock');
    const mirror = document.getElementById('liveTypingMirror');
    const mirrorText = document.getElementById('liveTypingMirrorText');

    this.baselineHeight = window.innerHeight;

    // Helper: Close all open drawers & backdrops
    const closeDrawers = () => {
      document.querySelectorAll('.drawer-sheet, .sidebar-panel').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.drawer-backdrop').forEach(b => b.classList.remove('active'));
    };

    // Helper: Dynamic font sizing for long titles to ensure full visibility while typing
    const updateMirrorText = (rawVal) => {
      if (!mirrorText) return;
      const val = (rawVal || '').toUpperCase();
      mirrorText.textContent = val || 'TYPE YOUR GUESS...';
      if (val.length > 22) {
        mirrorText.style.fontSize = '0.86rem';
      } else if (val.length > 15) {
        mirrorText.style.fontSize = '1.02rem';
      } else {
        mirrorText.style.fontSize = '';
      }
    };

    this._updateMirrorText = updateMirrorText;

    // 1. Mirror keystrokes in real time into the high-contrast mirror bar
    if (input) {
      input.addEventListener('input', () => {
        updateMirrorText(input.value);
        if (mirror) {
          mirror.style.display = 'flex';
        }
      });
    }

    // 2. Global Focus / Blur handling for ALL inputs on Android
    document.addEventListener('focusin', (e) => {
      const target = e.target;
      if (!target || !target.tagName) return;
      const tag = target.tagName.toUpperCase();

      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        document.body.classList.add('keyboard-open');
        this.isKeyboardOpen = true;

        if (target === input) {
          closeDrawers();
          if (typeof Haptics !== 'undefined') Haptics.tap();
          if (mirror) {
            mirror.style.display = 'flex';
            updateMirrorText(input.value);
          }
        } else if (target === chatInput) {
          const gameScreen = document.getElementById('gameScreen');
          if (gameScreen && gameScreen.classList.contains('active') && input) {
            closeDrawers();
            input.focus();
            return;
          }
        } else {
          // For nickname input, search inputs, etc.: smoothly scroll into view
          setTimeout(() => {
            try {
              target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (_) {}
          }, 150);
        }

        this.updateViewportLayout();
      }
    });

    document.addEventListener('focusout', (e) => {
      // Delay so button clicks or tabbing between inputs don't jitter
      setTimeout(() => {
        const active = document.activeElement;
        const isActiveInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');

        if (!isActiveInput) {
          document.body.classList.remove('keyboard-open');
          this.isKeyboardOpen = false;
          if (dock) dock.style.bottom = '0px';
          if (mirror) mirror.style.display = 'none';
          this.updateViewportLayout();
        }
      }, 150);
    });

    // 3. Visual Viewport API (Standard on modern Android Chrome, Samsung Internet, Firefox)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        this.updateViewportLayout();
      });
      window.visualViewport.addEventListener('scroll', () => {
        this.updateViewportLayout();
      });
    }

    window.addEventListener('resize', () => {
      this.updateViewportLayout();
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.baselineHeight = window.innerHeight;
        this.updateViewportLayout();
      }, 250);
    });

    // 4. Tap outside dismisses the soft keyboard and restores UI elements
    const dismissTriggers = document.querySelectorAll('#frameStage, #frameMediaContainer, #gameFrameImage, #gameDialogueBox, #gameScreen, .dismiss-kb');
    dismissTriggers.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('#mobileActionDock') || e.target.closest('#liveTypingMirror')) return;
        if (input && document.activeElement === input) {
          input.blur();
          closeDrawers();
        } else if (chatInput && document.activeElement === chatInput) {
          chatInput.blur();
          closeDrawers();
        }
      });
    });

    // Initial measurement
    this.updateViewportLayout();
  },

  updateViewportLayout() {
    const vv = window.visualViewport;
    const currentH = vv ? vv.height : window.innerHeight;
    const currentTop = vv ? vv.offsetTop : 0;
    const currentW = vv ? vv.width : window.innerWidth;

    // Set CSS custom properties on documentElement for precise sizing
    document.documentElement.style.setProperty('--visual-viewport-height', `${currentH}px`);
    document.documentElement.style.setProperty('--visual-viewport-top', `${currentTop}px`);
    document.documentElement.style.setProperty('--visual-viewport-width', `${currentW}px`);

    const dock = document.getElementById('mobileActionDock');
    if (!dock) return;

    const activeEl = document.activeElement;
    const isInputFocused = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    // Height difference check against baseline
    const vpH = window.innerHeight;
    const heightDiff = vpH - (currentH + currentTop);

    if (isInputFocused || heightDiff > 100) {
      document.body.classList.add('keyboard-open');
      this.isKeyboardOpen = true;

      // Ensure dock is anchored at bottom of visual viewport
      dock.style.bottom = '0px';
    } else {
      if (!isInputFocused) {
        document.body.classList.remove('keyboard-open');
        this.isKeyboardOpen = false;
        dock.style.bottom = '0px';
      }
    }
  },

  clearInput() {
    const input = document.getElementById('mobileGuessInput');
    const mirror = document.getElementById('liveTypingMirror');
    const mirrorText = document.getElementById('liveTypingMirrorText');

    if (input) {
      input.value = '';
      if (mirrorText) {
        mirrorText.textContent = 'TYPE YOUR GUESS...';
        mirrorText.style.fontSize = '';
      }
      input.focus();
      if (typeof Haptics !== 'undefined') Haptics.tap();
    }
  }
};

window.KeyboardManager = KeyboardManager;
