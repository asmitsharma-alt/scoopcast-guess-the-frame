// Android Vibration Haptics Controller
const Haptics = {
  enabled: true,

  vibrate(pattern) {
    if (!this.enabled) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  },

  tap() {
    this.vibrate(10);
  },

  correct() {
    // Celebratory double-pulse
    this.vibrate([35, 60, 35]);
  },

  wrong() {
    // Warning buzz
    this.vibrate([70]);
  },

  hint() {
    this.vibrate([20, 30, 20]);
  },

  roundStart() {
    this.vibrate([50, 80, 50, 80, 100]);
  },

  countdownTick() {
    this.vibrate(18);
  },

  countdownFinal() {
    this.vibrate([30, 40, 70]);
  },

  reveal() {
    this.vibrate([35, 45, 80]);
  }
};

window.Haptics = Haptics;
