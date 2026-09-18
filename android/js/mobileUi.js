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

  init() {
    this.bindAvatarPicker();
    this.bindButtons();
    this.loadSavedUser();
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

    document.querySelectorAll('.avatar-chip').forEach(chip => {
      chip.classList.toggle('selected', chip.dataset.avatar === av);
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
        const rounds = Number(document.getElementById('settingRounds')?.value) || 20;
        const timer = Number(document.getElementById('settingTimer')?.value) || 30;
        const category = document.querySelector('.cat-pill.active')?.dataset.category || 'all';
        GameClient.startGame({ rounds, timer, category });
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
        const url = window.location.origin + '/android/?room=' + code;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url);
          UI.showToast('📋 Room link copied to clipboard!');
        }
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }

    // 9. WhatsApp Share
    const shareBtn = document.getElementById('btnShareRoom');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const code = GameClient.roomCode || '';
        const url = window.location.origin + '/android/?room=' + code;
        const text = `Join my cinema frame guessing party on Scoopcast! Room Code: ${code} 👉 ${url}`;
        if (navigator.share) {
          navigator.share({ title: 'Guess The Frame', text, url });
        } else {
          window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text), '_blank');
        }
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    }

    // Category Selector in lobby
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        if (typeof Haptics !== 'undefined') Haptics.tap();
      });
    });
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
  },

  showToast(message) {
    const toast = document.getElementById('mobileToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2600);
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

    if (hostControls) hostControls.style.display = isHost ? 'block' : 'none';
    if (startBtn) startBtn.style.display = isHost ? 'flex' : 'none';
    if (waitingNotice) waitingNotice.style.display = isHost ? 'none' : 'block';
    if (hostNextBtn) hostNextBtn.style.display = isHost ? 'flex' : 'none';
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
      if (me) myScore.textContent = `⭐ ${me.score || 0} PTS`;
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
    const medal = position === 1 ? '🥇 1ST PLACE!' : (position === 2 ? '🥈 2ND PLACE!' : '🥉 3RD PLACE!');
    if (input) {
      input.value = '';
      input.disabled = false;
      input.placeholder = 'YOU GUESSED IT! CHAT FREELY...';
    }
    this.showToast(`🎉 Correct! ${medal} (+${points} pts)`);
  },

  shakeGuessInput() {
    const dock = document.getElementById('mobileActionDock');
    if (dock) {
      dock.classList.add('shake-anim');
      setTimeout(() => dock.classList.remove('shake-anim'), 360);
    }
    this.showToast('❌ Not quite, try again!');
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
    this.showToast(`💡 Hint unlocked (-${pointsDeducted} pts)!`);
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
          const medal = w.position === 1 ? '🥇' : (w.position === 2 ? '🥈' : '🥉');
          const cls = w.position === 1 ? 'gold' : (w.position === 2 ? 'silver' : 'bronze');
          return `
            <div class="winner-row-nb ${cls}">
              <span>${medal} ${this.escapeHtml(w.playerName)}</span>
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
      const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
      const cls = idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''));
      return `
        <div class="winner-row-nb ${cls}">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${medal}</span>
            <img src="/avvtar/${p.avatar || 'aman'}.svg" style="width:28px; height:28px; border-radius:50%; border:1px solid #1a1a1a;" onerror="this.src='/avvtar/aman.svg';">
            <span>${this.escapeHtml(p.name)}</span>
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
    grid.innerHTML = players.map(p => `
      <div class="player-chip-nb">
        <img src="/avvtar/${p.avatar || 'aman'}.svg" alt="${this.escapeHtml(p.name)}" onerror="this.src='/avvtar/aman.svg';">
        <div style="overflow:hidden; flex:1;">
          <div class="player-chip-name">${this.escapeHtml(p.name)}</div>
          <div class="player-chip-badge">${p.isHost ? '👑 HOST' : 'PLAYER'}</div>
        </div>
      </div>
    `).join('');
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
          <img src="/avvtar/${p.avatar || 'aman'}.svg" style="width:30px; height:30px; border-radius:50%; border:1.5px solid #1a1a1a;" onerror="this.src='/avvtar/aman.svg';">
          <span>${this.escapeHtml(p.name)}</span>
        </div>
        <span style="font-family:var(--font-mono); font-weight:900;">${p.score || 0} PTS</span>
      </div>
    `).join('');

    // Also keep HUD score pill updated
    const myScore = document.getElementById('hudScorePill');
    if (myScore && Array.isArray(GameClient.players)) {
      const me = GameClient.players.find(p => p.id === GameClient.playerId);
      if (me) myScore.textContent = `⭐ ${me.score || 0} PTS`;
    }
  },

  appendChatMessage(chat) {
    const stream = document.getElementById('chatMessagesStream');
    if (!stream) return;

    const msg = document.createElement('div');
    msg.style.marginBottom = '8px';
    msg.style.fontSize = '0.9rem';

    if (chat.isSystem) {
      msg.innerHTML = `<span style="font-weight:900; color:var(--nb-pink);">${chat.text}</span>`;
    } else {
      msg.innerHTML = `<strong>${this.escapeHtml(chat.senderName)}:</strong> <span>${this.escapeHtml(chat.text)}</span>`;
    }

    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
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
  }
};

window.UI = UI;
window.resolveMediaPath = resolveMediaPath;
