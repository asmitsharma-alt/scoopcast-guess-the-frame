/**
 * ═════════════════════════════════════════════════════════════════════
 * ScoopCast AAA Game Creation Wizard & Asset Preloader
 * 100% SVG Only | Zero Emoji Policy | Glassmorphism Cinematic UI
 * ═════════════════════════════════════════════════════════════════════
 */

(function(window) {
  'use strict';

  // ── Custom SVG Icons Library (Strict Zero-Emoji Policy) ──
  const WIZARD_ICONS = {
    popcorn: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8a3 3 0 0 0-3-3 3 3 0 0 0-6 0 3 3 0 0 0-3 3"/>
      <path d="M6 8l1.8 12.6A2 2 0 0 0 9.8 22h4.4a2 2 0 0 0 2-1.4L18 8"/>
      <line x1="10" y1="12" x2="9" y2="22"/>
      <line x1="14" y1="12" x2="15" y2="22"/>
      <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
    </svg>`,

    filmReel: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="7" cy="8.5" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="8.5" r="1.5" fill="currentColor"/>
      <circle cx="7" cy="15.5" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="15.5" r="1.5" fill="currentColor"/>
    </svg>`,

    clapperboard: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4z"/>
      <path d="m4 11 16-4v4H4z"/>
      <path d="m7 7 3-3"/>
      <path d="m13 5.5 3-3"/>
      <path d="m4 11 3-3"/>
    </svg>`,

    frame: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>`,

    dialogue: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <line x1="8" y1="9" x2="16" y2="9"/>
      <line x1="8" y1="13" x2="13" y2="13"/>
    </svg>`,

    eyes: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3.2"/>
      <circle cx="13" cy="11" r="1" fill="currentColor"/>
    </svg>`,

    lock: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>`,

    check: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`,

    cloudDownload: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
      <path d="M12 12v9"/>
      <path d="m8 17 4 4 4-4"/>
    </svg>`,

    user: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`,

    sparkles: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
    </svg>`,

    crown: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>`,

    arrowRight: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>`,

    arrowLeft: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>`,

    close: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`,

    share: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>`,

    copy: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`
  };

  // ── Create Room Multi-Step Wizard Controller ──
  const CreateRoomWizard = {
    currentStep: 1,
    state: {
      mode: 'cinephile', // 'popcorn' | 'cinephile' | 'director'
      sections: ['frame', 'dialogue'], // 'frame', 'dialogue', 'eyes'
      rounds: {
        frame: 7,
        dialogue: 5,
        eyes: 5
      },
      playerName: '',
      avatarUrl: ''
    },

    init() {
      // Load saved preferences if available
      const savedName = localStorage.getItem('gtf_player_name') || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerName : '') || 'Maverick';
      if (savedName) this.state.playerName = savedName;

      const savedAvatar = localStorage.getItem('gtf_player_avatar') || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerAvatar : '') || 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';
      this.state.avatarUrl = savedAvatar;
    },

    open() {
      this.init();
      this.currentStep = 1;
      this.render();
      const modal = document.getElementById('gameCreationWizardModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    close() {
      const modal = document.getElementById('gameCreationWizardModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    goToStep(stepNum) {
      if (stepNum < 1 || stepNum > 4) return;

      // Validation before leaving Step 2 (at least one section must be chosen)
      if (this.currentStep === 2 && stepNum > 2) {
        if (!this.state.sections || this.state.sections.length === 0) {
          this.showNotice('Please select at least one challenge section.');
          return;
        }
      }

      // Validation before leaving Step 3 (rounds between 3 and 30)
      if (this.currentStep === 3 && stepNum > 3) {
        const total = this.getTotalRounds();
        if (total < 3) {
          this.showNotice('Minimum game length is 3 rounds.');
          return;
        }
        if (total > 30) {
          this.showNotice('Maximum game length is 30 rounds.');
          return;
        }
      }

      this.currentStep = stepNum;
      this.render();

      // Focus name input and render avatar picker when landing on Step 4
      if (this.currentStep === 4) {
        if (typeof AvatarPicker !== 'undefined') {
          const currentAvatar = this.state.avatarUrl || localStorage.getItem('gtf_player_avatar') || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerAvatar : null) || 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';
          AvatarPicker.selectedAvatar = currentAvatar;
          AvatarPicker.updateAllPreviews();
          AvatarPicker.renderCategories('hostCategoryBar');
          AvatarPicker.renderGrid('hostAvatarGrid', 'hostLoadingIndicator');
        }
        setTimeout(() => {
          const input = document.getElementById('hostPlayerNameInput');
          if (input) {
            input.focus();
            input.select();
          }
        }, 150);
      }
    },

    nextStep() {
      this.goToStep(this.currentStep + 1);
    },

    prevStep() {
      this.goToStep(this.currentStep - 1);
    },

    // ── STEP 1: Difficulty Mode ──
    selectMode(modeId) {
      if (['popcorn', 'cinephile', 'director'].includes(modeId)) {
        this.state.mode = modeId;
        this.renderStep1();
      }
    },

    // ── STEP 2: Game Sections Multi-Select ──
    toggleSection(sectionKey) {
      const idx = this.state.sections.indexOf(sectionKey);
      if (idx > -1) {
        // Prevent deselecting if it's the last selected section
        if (this.state.sections.length === 1) {
          this.showNotice('At least one challenge section is required.');
          return;
        }
        this.state.sections.splice(idx, 1);
      } else {
        this.state.sections.push(sectionKey);
      }
      this.renderStep2();
    },

    // ── STEP 3: Round Configuration ──
    setSectionRounds(sectionKey, amount) {
      const val = Math.max(1, Math.min(20, Number(amount) || 5));
      this.state.rounds[sectionKey] = val;
      this.renderStep3();
    },

    adjustSectionRounds(sectionKey, delta) {
      const current = this.state.rounds[sectionKey] || 5;
      const next = Math.max(1, Math.min(20, current + delta));
      this.setSectionRounds(sectionKey, next);
    },

    getTotalRounds() {
      return this.state.sections.reduce((acc, sec) => acc + (this.state.rounds[sec] || 0), 0);
    },

    // ── STEP 4: Player Profile ──
    setPlayerName(name) {
      this.state.playerName = (name || '').trim();
    },

    // ── STEP 5: Create Lobby & Lock Configuration ──
    async enterLobby() {
      const nameInput = document.getElementById('hostPlayerNameInput');
      const enteredName = (nameInput && nameInput.value.trim()) || this.state.playerName || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerName : '') || 'Maverick';

      const selectedAvatar = (typeof AvatarPicker !== 'undefined' ? AvatarPicker.selectedAvatar : null) || this.state.avatarUrl || localStorage.getItem('gtf_player_avatar') || 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';

      this.state.playerName = enteredName;
      this.state.avatarUrl = selectedAvatar;

      localStorage.setItem('gtf_player_name', enteredName);
      localStorage.setItem('gtf_player_avatar', selectedAvatar);

      if (typeof MultiplayerEngine !== 'undefined') {
        MultiplayerEngine.playerName = enteredName;
        MultiplayerEngine.playerAvatar = selectedAvatar;
      }

      const totalRounds = this.getTotalRounds();
      if (totalRounds < 3 || totalRounds > 30) {
        this.showNotice('Please ensure total rounds are between 3 and 30.');
        this.goToStep(3);
        return;
      }

      const submitBtn = document.getElementById('gwEnterLobbyBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `${WIZARD_ICONS.cloudDownload} <span>Creating Lobby...</span>`;
      }

      try {
        // Delegate to MultiplayerEngine to build Colyseus room with locked settings
        if (typeof MultiplayerEngine !== 'undefined' && MultiplayerEngine.createRoomFromWizard) {
          await MultiplayerEngine.createRoomFromWizard({
            mode: this.state.mode,
            sections: [...this.state.sections],
            rounds: { ...this.state.rounds },
            totalRounds: totalRounds,
            playerName: enteredName,
            avatar: selectedAvatar
          });
        }
        this.close();
      } catch (err) {
        console.error('[CreateRoomWizard] Error creating room:', err);
        this.showNotice('Failed to create lobby: ' + (err.message || 'Server offline. Try again.'));
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Enter Lobby</span> ${WIZARD_ICONS.arrowRight}`;
        }
      }
    },

    showNotice(message) {
      let toast = document.getElementById('gwToastNotice');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'gwToastNotice';
        toast.className = 'gw-toast';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<span style="color:var(--wizard-accent-gold);">${WIZARD_ICONS.lock}</span> <span>${message}</span>`;
      toast.classList.add('active');
      clearTimeout(toast._timeout);
      toast._timeout = setTimeout(() => {
        toast.classList.remove('active');
      }, 3200);
    },

    // ── Render Methods ──
    render() {
      this.renderStepper();
      this.renderStep1();
      this.renderStep2();
      this.renderStep3();
      this.renderStep4();
      this.updateNavigationButtons();
    },

    renderStepper() {
      for (let i = 1; i <= 4; i++) {
        const node = document.getElementById(`gwStepNode-${i}`);
        const label = document.getElementById(`gwStepLabel-${i}`);
        const pane = document.getElementById(`gwStepPane-${i}`);

        if (node) {
          node.classList.remove('active', 'completed');
          if (i === this.currentStep) node.classList.add('active');
          else if (i < this.currentStep) node.classList.add('completed');
        }

        if (label) {
          label.classList.toggle('active', i === this.currentStep);
        }

        if (pane) {
          pane.classList.toggle('active', i === this.currentStep);
        }
      }
    },

    renderStep1() {
      const cards = {
        popcorn: document.getElementById('gwDiffCard-popcorn'),
        cinephile: document.getElementById('gwDiffCard-cinephile'),
        director: document.getElementById('gwDiffCard-director')
      };

      Object.entries(cards).forEach(([key, el]) => {
        if (!el) return;
        el.classList.toggle('selected', this.state.mode === key);
      });
    },

    renderStep2() {
      const sections = ['frame', 'dialogue', 'eyes'];
      sections.forEach(sec => {
        const card = document.getElementById(`gwSecCard-${sec}`);
        if (!card) return;
        const isSelected = this.state.sections.includes(sec);
        card.classList.toggle('selected', isSelected);
      });

      const countBadge = document.getElementById('gwSelectedSectionsCount');
      if (countBadge) {
        countBadge.innerHTML = `${WIZARD_ICONS.check} Selected: ${this.state.sections.length} of 3`;
      }
    },

    renderStep3() {
      const container = document.getElementById('gwRoundsContainer');
      if (!container) return;

      const secMeta = {
        frame: { name: 'Guess The Frame', icon: WIZARD_ICONS.frame, chips: [5, 7, 10] },
        dialogue: { name: 'Guess The Dialogue', icon: WIZARD_ICONS.dialogue, chips: [5, 7] },
        eyes: { name: 'Guess The Eyes', icon: WIZARD_ICONS.eyes, chips: [5, 7] }
      };

      const html = this.state.sections.map(secKey => {
        const meta = secMeta[secKey];
        const currentCount = this.state.rounds[secKey] || 5;

        const chipsHtml = meta.chips.map(num => `
          <button type="button" 
                  class="gw-quick-chip ${currentCount === num ? 'active' : ''}" 
                  onclick="CreateRoomWizard.setSectionRounds('${secKey}', ${num})">
            ${num} rounds
          </button>
        `).join('');

        return `
          <div class="gw-round-row-card">
            <div class="gw-round-row-left">
              <span class="gw-sec-icon-wrap" style="width:36px;height:36px;border-radius:10px;">
                ${meta.icon}
              </span>
              <span class="gw-round-sec-name">${meta.name}</span>
            </div>

            <div class="gw-round-stepper-wrap">
              <div class="hidden sm:flex items-center gap-1.5 mr-2">
                ${chipsHtml}
              </div>
              <button type="button" class="gw-step-btn" onclick="CreateRoomWizard.adjustSectionRounds('${secKey}', -1)" aria-label="Decrease rounds">−</button>
              <span class="gw-stepper-val">${currentCount}</span>
              <button type="button" class="gw-step-btn" onclick="CreateRoomWizard.adjustSectionRounds('${secKey}', 1)" aria-label="Increase rounds">+</button>
            </div>
          </div>
        `;
      }).join('');

      const total = this.getTotalRounds();
      const isValid = total >= 3 && total <= 30;

      container.innerHTML = html + `
        <div class="gw-rounds-summary-bar">
          <div class="flex flex-col text-left">
            <span class="gw-summary-label">Total Match Rounds</span>
            <span style="font-size:11px; color:${isValid ? 'var(--wizard-text-muted)' : '#f87171'};">
              ${isValid ? 'Min 3 rounds • Max 30 rounds' : (total < 3 ? 'Requires at least 3 rounds' : 'Exceeds maximum 30 rounds')}
            </span>
          </div>
          <span class="gw-summary-count">${total}</span>
        </div>
      `;
    },

    renderStep4() {
      const nameInput = document.getElementById('hostPlayerNameInput');
      if (nameInput) {
        if (!nameInput.value || !nameInput.value.trim()) {
          nameInput.value = this.state.playerName || localStorage.getItem('gtf_player_name') || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerName : '') || 'Maverick';
        }
        this.state.playerName = nameInput.value.trim();
      }

      if (typeof AvatarPicker !== 'undefined') {
        const currentAvatar = this.state.avatarUrl || localStorage.getItem('gtf_player_avatar') || (typeof MultiplayerEngine !== 'undefined' ? MultiplayerEngine.playerAvatar : null) || 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';
        AvatarPicker.selectedAvatar = currentAvatar;
        AvatarPicker.updateAllPreviews();
        AvatarPicker.renderCategories('hostCategoryBar');
        AvatarPicker.renderGrid('hostAvatarGrid', 'hostLoadingIndicator');
      }
    },

    updateNavigationButtons() {
      const prevBtn = document.getElementById('gwPrevBtn');
      const nextBtn = document.getElementById('gwNextBtn');
      const enterBtn = document.getElementById('gwEnterLobbyBtn');

      if (prevBtn) {
        prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
      }

      if (nextBtn) {
        nextBtn.style.display = this.currentStep < 4 ? 'inline-flex' : 'none';
        if (this.currentStep === 3) {
          const total = this.getTotalRounds();
          nextBtn.disabled = total < 3 || total > 30;
        } else {
          nextBtn.disabled = false;
        }
      }

      if (enterBtn) {
        enterBtn.style.display = this.currentStep === 4 ? 'inline-flex' : 'none';
      }
    }
  };

  // ── AAA Client Asset Preloader & Verifier ──
  const AssetPreloader = {
    isPreloading: false,
    verifiedCount: 0,
    totalAssets: 0,
    failedCount: 0,

    async preloadRoomAssets(playlist, onProgress) {
      if (!Array.isArray(playlist) || playlist.length === 0) {
        if (onProgress) onProgress(100, 'ready');
        return true;
      }

      this.isPreloading = true;
      this.verifiedCount = 0;
      this.failedCount = 0;

      const assetUrls = [];

      playlist.forEach(item => {
        if (item.content) assetUrls.push({ url: item.content, type: item.type || 'image' });
        if (item.revealContent) assetUrls.push({ url: item.revealContent, type: 'image' });
        if (item.audioUrl) assetUrls.push({ url: item.audioUrl, type: 'audio' });
      });

      this.totalAssets = Math.max(1, assetUrls.length);

      // Report initial download state
      if (onProgress) onProgress(5, 'downloading');

      // Preload in batches of 4 for low latency
      const BATCH_SIZE = 4;
      for (let i = 0; i < assetUrls.length; i += BATCH_SIZE) {
        const batch = assetUrls.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map(item => this.verifySingleAsset(item)));
        
        const currentProgress = Math.min(92, Math.round(((i + batch.length) / this.totalAssets) * 90));
        if (onProgress) onProgress(currentProgress, 'downloading');
      }

      // Verification phase
      if (onProgress) onProgress(95, 'verifying');
      await new Promise(r => setTimeout(r, 200));

      this.isPreloading = false;
      if (onProgress) onProgress(100, 'ready');
      return true;
    },

    verifySingleAsset(item) {
      return new Promise(resolve => {
        if (item.type === 'audio') {
          const audio = new Audio();
          audio.preload = 'auto';
          audio.oncanplaythrough = () => { this.verifiedCount++; resolve(true); };
          audio.onerror = () => { this.failedCount++; resolve(false); };
          audio.src = item.url;
        } else {
          const img = new Image();
          img.onload = () => { this.verifiedCount++; resolve(true); };
          img.onerror = () => { this.failedCount++; resolve(false); };
          img.src = item.url;
        }
      });
    }
  };

  // Expose to window
  window.WIZARD_ICONS = WIZARD_ICONS;
  window.CreateRoomWizard = CreateRoomWizard;
  window.AssetPreloader = AssetPreloader;

})(window);
