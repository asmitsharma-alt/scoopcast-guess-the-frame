// Android Soft-Keyboard Observer & Viewport Manager
// Keeps the movie frame AND the typed answer 100% visible at all times on all Android screens
const KeyboardManager = {
  isKeyboardOpen: false,
  baselineHeight: window.innerHeight,

  init() {
    const input = document.getElementById('mobileGuessInput');
    const chatInput = document.getElementById('chatInput');
    const dock = document.getElementById('mobileActionDock');

    this.baselineHeight = window.innerHeight;

    // Helper: Close all open drawers & backdrops
    const closeDrawers = () => {
      document.querySelectorAll('.drawer-sheet, .sidebar-panel').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.drawer-backdrop').forEach(b => b.classList.remove('active'));
    };

    // 1. Tapping anywhere on the action dock (except buttons) focuses the guess input
    if (dock && input) {
      dock.addEventListener('click', (e) => {
        if (!e.target.closest('#mobileHintBtn') && !e.target.closest('#mobileSubmitGuessBtn')) {
          input.focus();
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
          // Guess input focused: close secondary drawers
          closeDrawers();
          if (typeof Haptics !== 'undefined') Haptics.tap();
        } else if (target === chatInput) {
          // Chat input focused: DO NOT close chat drawer or hijack! Let user chat freely!
          if (typeof Haptics !== 'undefined') Haptics.tap();
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

    // 4. Tap on movie frame dismisses keyboard
    const dismissTriggers = document.querySelectorAll('#gameFrameImage, #gameDialogueBox, .dismiss-kb-backdrop');
    dismissTriggers.forEach(el => {
      el.addEventListener('click', () => {
        if (input && document.activeElement === input) {
          input.blur();
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

    const activeEl = document.activeElement;
    const isInputFocused = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    const vpH = window.innerHeight;
    const heightDiff = vpH - (currentH + currentTop);

    if (isInputFocused || heightDiff > 100) {
      document.body.classList.add('keyboard-open');
      this.isKeyboardOpen = true;
    } else {
      if (!isInputFocused) {
        document.body.classList.remove('keyboard-open');
        this.isKeyboardOpen = false;
      }
    }
  },

  clearInput() {
    const input = document.getElementById('mobileGuessInput');
    if (input) {
      input.value = '';
      input.focus();
      if (typeof Haptics !== 'undefined') Haptics.tap();
    }
  }
};

window.KeyboardManager = KeyboardManager;
