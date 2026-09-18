// Mobile UI State & DOM Controller (Neobrutalist Android)
function resolveMediaPath(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }
  return '/' + src;
}

const UI = {
  currentScreen: 'homeScreen',
  selectedAvatar: 'aman',
  hostSettings: {
    activeTab: 'frames',
    roundsByMode: { frames: 10, eyes: 10, dialogue: 10 },
    timer: 30
  },

  init() {
    this.bindAvatarPicker();
    this.bindButtons();
    this.loadSavedUser();
    if (typeof AvatarPicker !== 'undefined') {
      AvatarPicker.init({
        initialAvatar: this.selectedAvatar,
        onSelect: (url, meta) => {
          this.selectAvatar(url);
        }
      });
      AvatarPicker.renderCategories('androidCategoryBar');
      AvatarPicker.renderGrid('androidAvatarGrid', 'androidLoadingIndicator');
    }
  },

  openAvatarStudio() {
    if (typeof Haptics !== 'undefined') Haptics.tap();
    const modal = document.getElementById('androidAvatarModal');
    if (modal) {
      modal.classList.add('active');
      if (typeof AvatarPicker !== 'undefined') {
        AvatarPicker.selectedAvatar = this.selectedAvatar;
        AvatarPicker.updateAllPreviews();
        AvatarPicker.renderCategories('androidCategoryBar');
        AvatarPicker.renderGrid('androidAvatarGrid', 'androidLoadingIndicator');
      }
    }
  },

  closeAvatarStudio() {
    if (typeof Haptics !== 'undefined') Haptics.tap();
    const modal = document.getElementById('androidAvatarModal');
    if (modal) modal.classList.remove('active');
  },

  getAvatarSrc(av) {
    if (!av) return '/avvtar/aman.svg';
    if (typeof AvatarPicker !== 'undefined') {
      const meta = AvatarPicker.getAvatarMeta(av);
      if (meta && meta.url) return meta.url;
    }
    if (av.startsWith('http://') || av.startsWith('https://') || av.startsWith('data:') || av.startsWith('/')) {
      return av;
    }
    return '/avvtar/' + av + '.svg';
  },

  getAvatarBg(av) {
    if (typeof AvatarPicker !== 'undefined') {
      const meta = AvatarPicker.getAvatarMeta(av);
      if (meta) return meta.isKnownDark ? '#111827' : ('#' + (meta.color || 'facc15'));
    }
    return '#facc15';
  },

  getAvatarFit(av) {
    if (typeof AvatarPicker !== 'undefined') {
      const meta = AvatarPicker.getAvatarMeta(av);
      if (meta && meta.isTransparent) return 'object-fit: contain; padding: 2px;';
      if (meta && meta.isKnownPortrait) return 'object-fit: cover; object-position: center 12%;';
    }
    return 'object-fit: cover;';
  },

  loadSavedUser() {
    const nameInput = document.getElementById('playerNameInput');
    const savedName = localStorage.getItem('gtf_m_name');
    const savedAvatar = localStorage.getItem('gtf_m_avatar');

    if (savedName && nameInput) nameInput.value = savedName;
    if (savedAvatar) this.selectAvatar(savedAvatar);
  },

  bindAvatarPicker() {
    const chips = document.querySelectorAll('.avatar-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const av = chip.dataset.avatar;
        if (av) {
          this.selectAvatar(av);
          if (typeof Haptics !== 'undefined') Haptics.tap();
        }
      });
    });
  },

  selectAvatar(av) {
    this.selectedAvatar = av;
    localStorage.setItem('gtf_m_avatar', av);
    if (typeof GameClient !== 'undefined') GameClient.playerAvatar = av;

    if (typeof AvatarPicker !== 'undefined') {
      AvatarPicker.selectedAvatar = av;
      AvatarPicker.updateAllPreviews();
    } else {
      const mobImg = document.getElementById('mobileTriggerImg');
      const mobName = document.getElementById('mobileTriggerName');
      if (mobImg) mobImg.src = this.getAvatarSrc(av);
      if (mobName) mobName.innerText = av ? (av.charAt(0).toUpperCase() + av.slice(1)) : 'Aman';
    }

    document.querySelectorAll('.avatar-chip').forEach(chip => {
      const chipAv = chip.dataset.avatar;
      chip.classList.toggle('selected', chipAv === av || (av && av.includes('/' + chipAv + '.')));
    });
  },

  bindButtons() {
    // 1. Host Game Button
    const hostBtn = document.getElementById('btnHostGame');
    if (hostBtn) {
      hostBtn.addEventListener('click', () => {
        this.saveName();
        if (typeof Haptics !== 'undefined') Haptics.tap();
        GameClient.hostGame();
      });
    }

    // 2. Open Join Modal Button
    const openJoinBtn = document.getElementById('btnOpenJoin');
    const joinModal = document.getElementById('joinModal');
    if (openJoinBtn && joinModal) {
      openJoinBtn.addEventListener('click', () => {
        this.saveName();
        if (typeof Haptics !== 'undefined') Haptics.tap();
        joinModal.classList.add('active');
        const joinInput = document.getElementById('joinCodeInput');
        if (joinInput) {
          joinInput.value = '';
          joinInput.focus();
        }
      });
    }

    // 3. Confirm Join Button
    const confirmJoinBtn = document.getElementById('btnConfirmJoin');
    if (confirmJoinBtn) {
      confirmJoinBtn.addEventListener('click', () => {
        const joinInput = document.getElementById('joinCodeInput');
        if (joinInput) {
          if (typeof Haptics !== 'undefined') Haptics.tap();
          GameClient.joinGame(joinInput.value);
          joinModal.classList.remove('active');
        }
      });
    }

    // 4. Start Match Button (Host in Lobby)
    const startMatchBtn = document.getElementById('btnStartMatch');
    if (startMatchBtn) {
      startMatchBtn.addEventListener('click', () => {
        if (typeof Haptics !== 'undefined') Haptics.tap();
        if (startMatchBtn.disabled) return;
        startMatchBtn.disabled = true;
        startMatchBtn.innerHTML = `STARTING MATCH <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`;
        const counts = UI.hostSettings.roundsByMode;
        const totalRounds = Object.values(counts).reduce((a, b) => a + b, 0);
        if (totalRounds <= 0) {
          startMatchBtn.disabled = false;
          UI.showToast('Please select at least 1 round to start!');
          return;
        }
        startMatchBtn.disabled = true;
        startMatchBtn.innerHTML = `STARTING MATCH <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`;
        const timer = UI.hostSettings.timer || 30;
        const activeModes = Object.keys(counts).filter(k => counts[k] > 0);
        const category = activeModes.length === 1 ? activeModes[0] : (activeModes.length === 3 ? 'all' : 'mixed');
        GameClient.startGame({ roundsByMode: counts, rounds: totalRounds, timer, category });
      });
    }

    // 5. Submit Guess
    const submitBtn = document.getElementById('mobileSubmitGuessBtn');
    const guessInput = document.getElementById('mobileGuessInput');
    const doSubmit = () => {
      if (!guessInput) return;
      const text = guessInput.value.trim();
      if (!text) return;
      if (typeof Haptics !== 'undefined') Haptics.tap();
      GameClient.submitGuess(text);
      KeyboardManager.clearInput();
    };

    if (submitBtn) submitBtn.addEventListener('click', doSubmit);
    if (guessInput) {
      guessInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          doSubmit();
        }
      });
    }

    // 6. Request Hint Button
    const hintBtn = document.getElementById('mobileHintBtn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        GameClient.requestHint();
      });
    }

    // 7. Next Round Button (Host in reveal)
    const nextRoundBtn = document.getElementById('btnNextRound');
    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => {
        if (typeof Haptics !== 'undefined') Haptics.tap();
        GameClient.nextRound();
      });
    }

    // 8. Copy Link
    const copyLinkBtn = document.getElementById('btnCopyLink');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        const code = GameClient.roomCode || '';
        const url = window.location.origin + '/?room=' + code;
        if (window.AnalyticsEngine) AnalyticsEngine.trackShare('copy_link');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url);
          UI.showToast((typeof SvgIcons !== 'undefined' ? SvgIcons.copy : '') + ' Room link copied to clipboard!');
        }
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }

    // 9. WhatsApp Share
    const shareBtn = document.getElementById('btnShareRoom');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const code = GameClient.roomCode || '';
        const url = window.location.origin + '/?room=' + code;
        const text = `Join my cinema frame guessing party on Scoopcast! Room Code: ${code} | ${url}`;
        if (window.AnalyticsEngine) AnalyticsEngine.trackShare('whatsapp');
        if (navigator.share) {
          navigator.share({ title: 'Guess The Frame', text, url });
        } else {
          window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text), '_blank');
        }
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }

    // Lobby Mode Tabs (Frames, Eyes, Dialogue)
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) UI.setLobbyActiveTab(tab);
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    });

    // Rounds Stepper (- and +)
    const btnRoundMinus = document.getElementById('btnRoundMinus');
    const btnRoundPlus = document.getElementById('btnRoundPlus');
    if (btnRoundMinus) {
      btnRoundMinus.addEventListener('click', () => {
        UI.adjustLobbyRounds(-1);
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }
    if (btnRoundPlus) {
      btnRoundPlus.addEventListener('click', () => {
        UI.adjustLobbyRounds(1);
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }

    // Timer Stepper (- and +)
    const btnTimerMinus = document.getElementById('btnTimerMinus');
    const btnTimerPlus = document.getElementById('btnTimerPlus');
    if (btnTimerMinus) {
      btnTimerMinus.addEventListener('click', () => {
        UI.adjustLobbyTimer(-5);
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }
    if (btnTimerPlus) {
      btnTimerPlus.addEventListener('click', () => {
        UI.adjustLobbyTimer(5);
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }
  },

  setLobbyActiveTab(tab) {
    this.hostSettings.activeTab = tab;
    document.querySelectorAll('.mode-tab-btn').forEach(b => {
      const isCurrent = b.dataset.tab === tab;
      b.classList.toggle('active', isCurrent);
      b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });
    this.renderLobbyControls();
  },

  adjustLobbyRounds(delta) {
    const tab = this.hostSettings.activeTab || 'frames';
    let current = this.hostSettings.roundsByMode[tab] !== undefined ? this.hostSettings.roundsByMode[tab] : 10;
    current = Math.max(0, Math.min(30, current + delta));
    this.hostSettings.roundsByMode[tab] = current;
    this.renderLobbyControls();
    this.syncHostSettings();
  },

  adjustLobbyTimer(delta) {
    let current = Number(this.hostSettings.timer) || 30;
    current = Math.max(5, Math.min(90, current + delta));
    this.hostSettings.timer = current;
    this.renderLobbyControls();
    this.syncHostSettings();
  },

  renderLobbyControls() {
    const tab = this.hostSettings.activeTab || 'frames';
    const currentRounds = this.hostSettings.roundsByMode[tab] !== undefined ? this.hostSettings.roundsByMode[tab] : 10;

    // Update tab badges & classes
    ['frames', 'eyes', 'dialogue'].forEach(m => {
      const count = this.hostSettings.roundsByMode[m] !== undefined ? this.hostSettings.roundsByMode[m] : 10;
      const pill = document.getElementById(`tabPill${m.charAt(0).toUpperCase() + m.slice(1)}`);
      if (pill) pill.textContent = count;
      const btn = document.getElementById(`tabBtn${m.charAt(0).toUpperCase() + m.slice(1)}`);
      if (btn) btn.classList.toggle('mode-off', count === 0);
    });

    // Update current round stepper title & value
    const roundTitle = document.getElementById('currentTabRoundsTitle');
    if (roundTitle) roundTitle.textContent = `${tab.toUpperCase()} ROUNDS`;
    const roundVal = document.getElementById('currentRoundValue');
    if (roundVal) roundVal.textContent = currentRounds;

    // Total rounds summary
    const total = Object.values(this.hostSettings.roundsByMode).reduce((a, b) => a + b, 0);
    const summary = document.getElementById('totalRoundsSummary');
    if (summary) summary.textContent = `Total: ${total}`;

    // Update timer stepper
    const timerVal = document.getElementById('currentTimerValue');
    if (timerVal) timerVal.textContent = this.hostSettings.timer || 30;
  },

  syncHostSettings() {
    if (typeof GameClient !== 'undefined' && GameClient.isHost) {
      const s = {
        roundsByMode: { ...this.hostSettings.roundsByMode },
        timer: this.hostSettings.timer || 30,
        rounds: Object.values(this.hostSettings.roundsByMode).reduce((a, b) => a + b, 0)
      };
      GameClient.hostSettings = Object.assign(GameClient.hostSettings || {}, s);
      GameClient.sendEvent('UPDATE_HOST_SETTINGS', { settings: s });
    }
  },

  saveName() {
    const nameInput = document.getElementById('playerNameInput');
    const val = (nameInput?.value || 'Cinephile').trim().slice(0, 16);
    localStorage.setItem('gtf_m_name', val);
    if (typeof GameClient !== 'undefined') GameClient.playerName = val;
  },

  showScreen(screenId) {
    this.currentScreen = screenId;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }
    // Dismiss keyboard on screen shift
    if (document.activeElement) document.activeElement.blur();

    // Close any open drawers when shifting to homeScreen
    if (screenId === 'homeScreen') {
      document.querySelectorAll('.drawer-sheet').forEach(d => d.classList.remove('open'));
      const backdrop = document.getElementById('sheetBackdrop');
      if (backdrop) backdrop.classList.remove('active');
    }

    // Toggle top-bar chat button: visible only in room/game screens, hidden on home screen
    const chatBtn = document.getElementById('btnChatToggle');
    if (chatBtn) {
      chatBtn.style.display = (screenId !== 'homeScreen') ? 'flex' : 'none';
    }
  },

  toggleChatDrawer() {
    if (typeof Haptics !== 'undefined') Haptics.tap();
    const drawer = document.getElementById('chatDrawer');
    const backdrop = document.getElementById('sheetBackdrop');
    const dot = document.getElementById('chatUnreadDot');
    if (dot) dot.style.display = 'none';

    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
    } else {
      document.querySelectorAll('.drawer-sheet').forEach(d => d.classList.remove('open'));
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      const chatInput = document.getElementById('mobileChatInput');
      if (chatInput) {
        setTimeout(() => chatInput.focus(), 150);
      }
    }
  },

  showToast(message) {
    const toast = document.getElementById('mobileToast');
    if (!toast) return;
    toast.innerHTML = typeof SvgIcons !== 'undefined' ? SvgIcons.replaceEmojis(message) : message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2600);
  },

  updateSoundBtn() {
    const btn = document.getElementById('btnSoundToggle');
    if (!btn) return;
    if (typeof SvgIcons !== 'undefined') {
      btn.innerHTML = SoundEffects.muted ? SvgIcons.volumeX : SvgIcons.volume2;
    }
  },

  setRoomCode(code) {
    const el = document.getElementById('lobbyRoomCodeText');
    if (el) el.textContent = code || '----';
  },

  setHostControlsVisible(isHost) {
    const hostControls = document.getElementById('lobbyHostControls');
    const startBtn = document.getElementById('btnStartMatch');
    const waitingNotice = document.getElementById('lobbyWaitingNotice');
    const hostNextBtn = document.getElementById('btnNextRound');

    if (hostControls) hostControls.style.display = isHost ? 'flex' : 'none';
    if (startBtn) {
      startBtn.style.display = isHost ? 'flex' : 'none';
      startBtn.disabled = false;
      startBtn.innerHTML = `START MATCH <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`;
    }
    if (waitingNotice) {
      waitingNotice.style.display = isHost ? 'none' : 'block';
      const s = (typeof GameClient !== 'undefined' && GameClient.hostSettings) ? GameClient.hostSettings : null;
      if (s && s.roundsByMode) {
        waitingNotice.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><span style="font-size:0.85rem; font-weight:900;"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg> Waiting for Host to start match...</span><span style="font-size:0.75rem; color:#64748b; font-family:var(--font-mono);">${s.roundsByMode.frames || 0} Frames • ${s.roundsByMode.eyes || 0} Eyes • ${s.roundsByMode.dialogue || 0} Dialogue • ${s.timer || 30}s Timer</span></div>`;
      }
    }
    if (hostNextBtn) hostNextBtn.style.display = isHost ? 'flex' : 'none';

    if (isHost) {
      this.renderLobbyControls();
    }
  },

  updateTimer(timeRemaining) {
    const timerText = document.getElementById('hudTimerText');
    if (timerText) {
      timerText.textContent = `${timeRemaining}s`;
      if (timeRemaining <= 5 && timeRemaining > 0) {
        SoundEffects.playTick();
        timerText.style.color = '#EF4444';
      } else {
        timerText.style.color = 'var(--nb-ink)';
      }
    }
  },

  setupRoundMedia({ type, content, year, round, totalRounds }) {
    const input = document.getElementById('mobileGuessInput');
    const hintBtn = document.getElementById('mobileHintBtn');
    const banner = document.getElementById('activeHintBanner');
    const roundPill = document.getElementById('hudRoundPill');
    const myScore = document.getElementById('hudScorePill');

    if (input) {
      input.value = '';
      input.disabled = false;
      input.placeholder = 'TYPE YOUR GUESS...';
    }
    if (hintBtn) {
      hintBtn.disabled = false;
      hintBtn.style.opacity = '1';
    }
    if (banner) banner.style.display = 'none';
    if (roundPill) roundPill.textContent = `ROUND ${round}/${totalRounds}`;

    // Update player score in HUD
    if (myScore && Array.isArray(GameClient.players)) {
      const me = GameClient.players.find(p => p.id === GameClient.playerId);
      if (me) myScore.innerHTML = `${typeof SvgIcons !== 'undefined' ? SvgIcons.star : ''} <span id="hudScore">${me.score || 0}</span> PTS`;
    }

    // Display appropriate media
    const imgEl = document.getElementById('gameFrameImage');
    const dialogueBox = document.getElementById('gameDialogueBox');
    const dialogueText = document.getElementById('gameDialogueText');

    if (type === 'dialogue') {
      if (imgEl) imgEl.style.display = 'none';
      if (dialogueBox) {
        dialogueBox.style.display = 'flex';
        if (dialogueText) dialogueText.textContent = `"${content}"`;
      }
    } else {
      if (dialogueBox) dialogueBox.style.display = 'none';
      if (imgEl) {
        imgEl.style.display = 'block';
        imgEl.src = resolveMediaPath(content);
      }
    }
  },

  showGuessSuccess(position, points) {
    const input = document.getElementById('mobileGuessInput');
    const medalIcon = typeof SvgIcons !== 'undefined'
      ? (position === 1 ? SvgIcons.medal1 : (position === 2 ? SvgIcons.medal2 : SvgIcons.medal3))
      : '';
    const posLabel = position === 1 ? '1ST PLACE!' : (position === 2 ? '2ND PLACE!' : '3RD PLACE!');
    if (input) {
      input.value = '';
      input.disabled = false;
      input.placeholder = 'YOU GUESSED IT! CHAT FREELY...';
    }
    const partyIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.party : '';
    this.showToast(`${partyIcon} Correct! ${medalIcon} ${posLabel} (+${points} pts)`);
  },

  shakeGuessInput() {
    const dock = document.getElementById('mobileActionDock');
    if (dock) {
      dock.classList.add('shake-anim');
      setTimeout(() => dock.classList.remove('shake-anim'), 360);
    }
    const crossIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.cross : '';
    this.showToast(`${crossIcon} Not quite, try again!`);
  },

  displayHintBanner(maskedHint, pointsDeducted) {
    const banner = document.getElementById('activeHintBanner');
    const bannerText = document.getElementById('activeHintText');
    const hintBtn = document.getElementById('mobileHintBtn');

    if (banner && bannerText) {
      bannerText.textContent = maskedHint;
      banner.style.display = 'block';
    }
    if (hintBtn) {
      hintBtn.disabled = true;
      hintBtn.style.opacity = '0.5';
    }
    const bulbIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.lightbulb : '';
    this.showToast(`${bulbIcon} Hint unlocked (-${pointsDeducted} pts)!`);
  },

  renderRoundReveal({ answer, year, type, content, revealedContent, winners }) {
    const titleEl = document.getElementById('revealTitle');
    const yearEl = document.getElementById('revealYear');
    const imgEl = document.getElementById('revealImage');
    const podiumEl = document.getElementById('revealWinnersRow');

    if (titleEl) titleEl.textContent = answer;
    if (yearEl) yearEl.textContent = year ? `(${year})` : '';
    if (imgEl) {
      const rawSrc = (type === 'eye' && revealedContent) ? revealedContent : content;
      imgEl.src = resolveMediaPath(rawSrc);
    }

    if (podiumEl) {
      if (!winners || winners.length === 0) {
        podiumEl.innerHTML = '<div style="color:#666; font-weight:800;">Time ran out! No one guessed it.</div>';
      } else {
        podiumEl.innerHTML = winners.map(w => {
          const medal = typeof SvgIcons !== 'undefined'
            ? (w.position === 1 ? SvgIcons.medal1 : (w.position === 2 ? SvgIcons.medal2 : SvgIcons.medal3))
            : (w.position === 1 ? '#1' : (w.position === 2 ? '#2' : '#3'));
          const cls = w.position === 1 ? 'gold' : (w.position === 2 ? 'silver' : 'bronze');
          return `
            <div class="winner-row-nb ${cls}">
              <span>${medal} ${this.formatName(w.playerName)}</span>
              <span style="color:var(--nb-ink); font-weight:900;">+${w.points} PTS</span>
            </div>
          `;
        }).join('');
      }
    }
  },

  renderPodium() {
    const podiumEl = document.getElementById('finalPodiumRow');
    if (!podiumEl) return;

    const players = [...(GameClient.players || [])]
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    podiumEl.innerHTML = players.map((p, idx) => {
      const medal = typeof SvgIcons !== 'undefined'
        ? (idx === 0 ? SvgIcons.medal1 : (idx === 1 ? SvgIcons.medal2 : (idx === 2 ? SvgIcons.medal3 : `#${idx + 1}`)))
        : `#${idx + 1}`;
      const cls = idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''));
      return `
        <div class="winner-row-nb ${cls}">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${medal}</span>
            <div style="width:28px; height:28px; min-width:28px; border-radius:50%; border:1px solid #1a1a1a; background:${this.getAvatarBg(p.avatar)}; display:flex; align-items:center; justify-content:center; overflow:hidden;"><img src="${this.getAvatarSrc(p.avatar)}" style="width:100%; height:100%; ${this.getAvatarFit(p.avatar)}" onerror="this.src='/avvtar/aman.svg';"></div>
            <span>${this.formatName(p.name)}</span>
          </div>
          <span>${p.score || 0} PTS</span>
        </div>
      `;
    }).join('');
  },

  renderLobbyPlayers() {
    const grid = document.getElementById('lobbyPlayersGrid');
    if (!grid) return;

    const players = GameClient.players || [];
    const crownIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.crown : '';
    grid.innerHTML = players.map(p => {
      const avSrc = this.getAvatarSrc(p.avatar);
      const avBg = this.getAvatarBg(p.avatar);
      const avFit = this.getAvatarFit(p.avatar);
      return `
        <div class="player-chip-nb">
          <div style="width:36px; height:36px; min-width:36px; border-radius:10px; border:2px solid #1a1a1a; background:${avBg}; display:flex; align-items:center; justify-content:center; overflow:hidden;">
            <img src="${avSrc}" alt="${this.escapeHtml(p.name)}" style="width:100%; height:100%; ${avFit}" onerror="this.src='/avvtar/aman.svg';">
          </div>
          <div style="overflow:hidden; flex:1;">
            <div class="player-chip-name">${this.formatName(p.name)}</div>
            <div class="player-chip-badge">${p.isHost ? `${crownIcon} HOST` : 'PLAYER'}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderScoreboard() {
    const list = document.getElementById('scoreboardList');
    if (!list) return;

    const players = [...(GameClient.players || [])]
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    list.innerHTML = players.map((p, idx) => `
      <div class="winner-row-nb" style="margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-weight:900; font-family:var(--font-mono);">${idx + 1}.</span>
          <div style="width:30px; height:30px; min-width:30px; border-radius:8px; border:1.5px solid #1a1a1a; background:${this.getAvatarBg(p.avatar)}; display:flex; align-items:center; justify-content:center; overflow:hidden;"><img src="${this.getAvatarSrc(p.avatar)}" style="width:100%; height:100%; ${this.getAvatarFit(p.avatar)}" onerror="this.src='/avvtar/aman.svg';"></div>
          <span>${this.formatName(p.name)}</span>
        </div>
        <span style="font-family:var(--font-mono); font-weight:900;">${p.score || 0} PTS</span>
      </div>
    `).join('');

    // Also keep HUD score pill updated
    const myScore = document.getElementById('hudScorePill');
    if (myScore && Array.isArray(GameClient.players)) {
      const me = GameClient.players.find(p => p.id === GameClient.playerId);
      if (me) myScore.innerHTML = `${typeof SvgIcons !== 'undefined' ? SvgIcons.star : ''} <span id="hudScore">${me.score || 0}</span> PTS`;
    }
  },

  appendChatMessage(chat) {
    if (!chat) return;

    const isMe = (typeof GameClient !== 'undefined' && chat.senderId === GameClient.playerId);
    const parsedText = typeof SvgIcons !== 'undefined' ? SvgIcons.replaceEmojis(this.escapeHtml(chat.text || '')) : this.escapeHtml(chat.text || '');
    const parsedName = typeof SvgIcons !== 'undefined' ? SvgIcons.replaceEmojis(this.escapeHtml(chat.senderName || 'Player')) : this.escapeHtml(chat.senderName || 'Player');

    // 1. In-game live chat stream (#gameInGameChatStream in gameScreen empty space)
    const gameStream = document.getElementById('gameInGameChatStream');
    if (gameStream) {
      const placeholder = document.getElementById('gameChatPlaceholder');
      if (placeholder) placeholder.remove();

      const item = document.createElement('div');
      if (chat.isWinner) {
        item.className = 'chat-row-event winner';
        const trophySvg = typeof SvgIcons !== 'undefined' ? SvgIcons.trophy : '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>';
        item.innerHTML = `${trophySvg} <span><strong>${parsedName}</strong> guessed the frame! (+${chat.points || 10} pts)</span>`;
      } else if (chat.isHint) {
        item.className = 'chat-row-event hint';
        const hintSvg = typeof SvgIcons !== 'undefined' ? SvgIcons.lightbulb : '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>';
        item.innerHTML = `${hintSvg} <span>${parsedText}</span>`;
      } else if (chat.isSystem) {
        item.className = 'chat-row-event system';
        item.innerHTML = `<span>${parsedText}</span>`;
      } else {
        item.className = `chat-row-item ${isMe ? 'chat-me' : ''}`;
        const avatarSrc = this.getAvatarSrc(chat.senderAvatar);
        item.innerHTML = `
          <img class="chat-row-avatar" src="${avatarSrc}" alt="${parsedName}">
          <div class="chat-row-body">
            <span class="chat-row-name">${parsedName}${isMe ? ' (You)' : ''}</span>
            <span class="chat-row-text">${parsedText}</span>
          </div>
        `;
      }
      gameStream.appendChild(item);
      gameStream.scrollTop = gameStream.scrollHeight;
    }

    // 2. Drawer chat stream (#chatMessagesStream in bottom sheet drawer)
    const drawerStream = document.getElementById('chatMessagesStream');
    if (drawerStream) {
      const msg = document.createElement('div');
      msg.style.marginBottom = '8px';
      msg.style.fontSize = '0.9rem';

      if (chat.isWinner) {
        const trophySvg = typeof SvgIcons !== 'undefined' ? SvgIcons.trophy : '';
        msg.innerHTML = `<span style="font-weight:900; color:#ca8a04;">${trophySvg} ${parsedName} guessed the frame! (+${chat.points || 10} pts)</span>`;
      } else if (chat.isHint) {
        const hintSvg = typeof SvgIcons !== 'undefined' ? SvgIcons.lightbulb : '';
        msg.innerHTML = `<span style="font-weight:800; color:#c2410c;">${hintSvg} ${parsedText}</span>`;
      } else if (chat.isSystem) {
        msg.innerHTML = `<span style="font-weight:900; color:var(--nb-pink);">${parsedText}</span>`;
      } else {
        msg.innerHTML = `<strong>${parsedName}:</strong> <span>${parsedText}</span>`;
      }

      drawerStream.appendChild(msg);
      drawerStream.scrollTop = drawerStream.scrollHeight;
    }
  },

  renderRoundNotice(round, totalRounds) {
    const gameStream = document.getElementById('gameInGameChatStream');
    if (gameStream) {
      const placeholder = document.getElementById('gameChatPlaceholder');
      if (placeholder) placeholder.remove();

      const divider = document.createElement('div');
      divider.className = 'chat-round-divider';
      divider.innerHTML = `<span>ROUND ${round}/${totalRounds}</span>`;
      gameStream.appendChild(divider);
      gameStream.scrollTop = gameStream.scrollHeight;
    }
  },


  showLoading(text) {
    const loader = document.getElementById('loadingOverlay');
    const loaderText = document.getElementById('loadingText');
    if (loader && loaderText) {
      loaderText.textContent = text || 'Connecting...';
      loader.classList.add('active');
    }
  },

  hideLoading() {
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.classList.remove('active');
  },

  showCountdownOverlay() {
    const overlay = document.getElementById('countdownOverlay');
    const num = document.getElementById('countdownNumber');
    if (!overlay || !num) return;

    overlay.classList.add('active');
    let count = 3;
    num.textContent = count;

    const iv = setInterval(() => {
      count--;
      if (count > 0) {
        num.textContent = count;
        SoundEffects.playTick();
      } else {
        clearInterval(iv);
        overlay.classList.remove('active');
      }
    }, 1000);
  },

  escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  formatName(name) {
    const escaped = this.escapeHtml(name || 'Player');
    return typeof SvgIcons !== 'undefined' ? SvgIcons.replaceEmojis(escaped) : escaped;
  }
};

window.UI = UI;
window.resolveMediaPath = resolveMediaPath;
