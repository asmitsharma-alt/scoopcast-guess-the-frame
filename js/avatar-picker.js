/**
 * AvatarPickerStudio - Universal High-Performance 1,800+ Avatar Engine
 * Exact replica of join_room_replica.html logic for Desktop and Android.
 * Pure Lucide SVGs (Zero Emoji Policy).
 */
(function(window) {
  'use strict';

  const INITIAL_BATCH = 48;
  const BATCH_INCREMENT = 32;

  const CHECK_SVG = '<svg class="lucide ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px;"><polyline points="20 6 9 17 4 12"/></svg>';

  const TRANSPARENT_CATEGORIES = new Set([
    'doraemon', 'pokemon', 'minecraft', 'dragon-ball', 'south-park',
    'spongebob', 'ben-10', 'adventure-time', 'founders', 'the-simpsons',
    'futurama', 'bobs-burgers', 'final-space', 'disney', 'overwatch', 'genshin'
  ]);

  const AvatarPicker = {
    selectedAvatar: '/avvtar/aman.svg',
    currentCategory: 'all',
    searchQuery: '',
    loadedCount: INITIAL_BATCH,
    customAvatarObj: null,
    currentShuffledList: null,
    onSelectCallback: null,

    init(options = {}) {
      if (options.initialAvatar) {
        this.selectedAvatar = options.initialAvatar;
      } else {
        const saved = localStorage.getItem('gtf_player_avatar') || localStorage.getItem('gtf_m_avatar');
        if (saved) this.selectedAvatar = saved;
      }
      if (typeof options.onSelect === 'function') {
        this.onSelectCallback = options.onSelect;
      }
      this.updateAllPreviews();
    },

    getCatalog() {
      if (window.AVATAR_DATA && Array.isArray(window.AVATAR_DATA.avatars)) {
        return window.AVATAR_DATA.avatars;
      }
      return [
        { id: 'av_0', name: 'Aman', category: 'founders', categoryLabel: 'Founders', url: '/avvtar/aman.svg', format: 'SVG', color: 'facc15', isVector: true, isTransparent: true },
        { id: 'av_1', name: 'Amish', category: 'founders', categoryLabel: 'Founders', url: '/avvtar/amish.svg', format: 'SVG', color: 'ff6b9d', isVector: true, isTransparent: true },
        { id: 'av_2', name: 'Aziz', category: 'founders', categoryLabel: 'Founders', url: '/avvtar/aziz.svg', format: 'SVG', color: '38bdf8', isVector: true, isTransparent: true },
        { id: 'av_3', name: 'Vish', category: 'founders', categoryLabel: 'Founders', url: '/avvtar/vish.svg', format: 'SVG', color: '84cc16', isVector: true, isTransparent: true }
      ];
    },

    getCategories() {
      if (window.AVATAR_DATA && Array.isArray(window.AVATAR_DATA.categories)) {
        return window.AVATAR_DATA.categories;
      }
      return [{ id: 'all', label: 'All Mega-Mix' }, { id: 'founders', label: 'Founders' }];
    },

    isAvatarTransparent(item) {
      if (!item) return false;
      if (item.isTransparent || item.isVector) return true;
      const url = item.url || '';
      if (url.includes('/avvtar/') || url.endsWith('.svg') || url.includes('dicebear.com') ||
          url.includes('showdown') || url.includes('mc-heads.net') ||
          url.includes('dragonball-api.com') || url.includes('finalspaceapi.com')) {
        return true;
      }
      if (item.category && TRANSPARENT_CATEGORIES.has(item.category)) {
        return true;
      }
      return false;
    },

    getAvatarMeta(urlOrId) {
      if (this.customAvatarObj && (urlOrId === this.customAvatarObj.url || urlOrId === this.customAvatarObj.id)) {
        return this.customAvatarObj;
      }
      const catalog = this.getCatalog();
      if (!urlOrId) return catalog[0];
      const clean = String(urlOrId).trim();
      const lower = clean.toLowerCase();

      let found = catalog.find(a => a.url === clean || a.id === clean);
      if (found) return found;

      found = catalog.find(a => 
        a.name.toLowerCase() === lower ||
        a.url.toLowerCase() === lower ||
        a.url.toLowerCase().endsWith('/' + lower + '.svg') ||
        a.url.toLowerCase().endsWith(lower)
      );
      if (found) return found;

      return {
        id: 'custom',
        name: 'Selected Avatar',
        category: 'custom',
        categoryLabel: 'Custom Avatar',
        url: urlOrId,
        format: clean.includes('.svg') ? 'SVG' : 'PNG',
        color: 'facc15',
        isTransparent: clean.includes('.svg') || clean.includes('/avvtar/'),
        isVector: clean.includes('.svg')
      };
    },

    getFilteredAvatars() {
      const catalog = this.getCatalog();
      let list;
      const query = (this.searchQuery || '').trim().toLowerCase();

      if (query) {
        list = catalog.filter(a => {
          const matchName = a.name.toLowerCase().includes(query);
          const matchCat = (a.categoryLabel || a.category || '').toLowerCase().includes(query);
          if (this.currentCategory !== 'all') {
            return (a.category === this.currentCategory) && (matchName || matchCat);
          }
          return matchName || matchCat;
        });
      } else {
        if (this.currentCategory === 'all') {
          if (!this.currentShuffledList) {
            const founders = catalog.filter(a => a.category === 'founders');
            const rest = catalog.filter(a => a.category !== 'founders');
            for (let i = rest.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [rest[i], rest[j]] = [rest[j], rest[i]];
            }
            this.currentShuffledList = [...founders, ...rest];
          }
          list = this.currentShuffledList;
        } else {
          list = catalog.filter(a => a.category === this.currentCategory);
        }
      }

      return list;
    },

    renderCategories(containerId) {
      const targetIds = containerId ? [containerId] : ['categoryBar', 'hostCategoryBar', 'androidCategoryBar'];
      const cats = this.getCategories();

      targetIds.forEach(id => {
        const bar = document.getElementById(id);
        if (!bar) return;
        bar.innerHTML = '';

        cats.forEach(cat => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `mp-category-tab ${this.currentCategory === cat.id ? 'active' : ''}`;
          btn.innerText = cat.label;
          btn.onclick = () => {
            this.playClick();
            this.currentCategory = cat.id;
            this.loadedCount = INITIAL_BATCH;
            document.querySelectorAll('.mp-category-tab').forEach(b => {
              if (b.innerText === cat.label) b.classList.add('active');
              else b.classList.remove('active');
            });
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            this.renderGrid();
          };
          bar.appendChild(btn);
        });
      });
    },

    renderGrid(gridId, indicatorId) {
      const gridIds = gridId ? [gridId] : ['avatarGrid', 'hostAvatarGrid', 'androidAvatarGrid'];
      const indIds = indicatorId ? [indicatorId] : ['loadingIndicator', 'hostLoadingIndicator', 'androidLoadingIndicator'];
      const filtered = this.getFilteredAvatars();
      const visible = filtered.slice(0, this.loadedCount);

      gridIds.forEach((gid, idx) => {
        const grid = document.getElementById(gid);
        if (!grid) return;

        grid.innerHTML = '';

        visible.forEach(item => {
          const isSelected = this.selectedAvatar === item.url ||
            (item.category === 'founders' && (this.selectedAvatar === item.id || this.selectedAvatar === item.name.toLowerCase() || this.selectedAvatar === item.url));
          const cardBg = item.isKnownDark ? '#111827' : `#${item.color || 'ffffff'}`;
          const isCardTransparent = this.isAvatarTransparent(item);
          const zoomClass = isCardTransparent ? 'img-contain-fit' : (item.isKnownPortrait ? 'img-portrait-zoom' : 'img-cover-zoom');

          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `mp-circular-avatar-btn ${isSelected ? 'selected' : ''}`;
          btn.style.backgroundColor = cardBg;
          btn.title = `${item.name} (${item.categoryLabel || item.category})`;
          btn.onclick = () => this.selectAvatar(item.url);

          btn.innerHTML = `
            <img
              src="${item.url}"
              alt="${item.name}"
              loading="lazy"
              decoding="async"
              class="${zoomClass}"
              onerror="AvatarPicker.handleImgError(this)"
            />
            ${isSelected ? `<span class="mp-avatar-item-check">${CHECK_SVG}</span>` : ''}
          `;

          grid.appendChild(btn);
        });

        const ind = document.getElementById(indIds[idx]) || document.getElementById(indIds[0]);
        if (ind) {
          ind.style.display = visible.length >= filtered.length ? 'none' : 'flex';
        }
      });
    },

    selectAvatar(urlOrId) {
      this.playPop();
      this.selectedAvatar = urlOrId;
      try {
        localStorage.setItem('gtf_player_avatar', urlOrId);
        localStorage.setItem('gtf_m_avatar', urlOrId);
      } catch (e) {}

      if (typeof MultiplayerEngine !== 'undefined') {
        MultiplayerEngine.selectedAvatarForModal = urlOrId;
        MultiplayerEngine.playerAvatar = urlOrId;
      }
      if (typeof GameClient !== 'undefined') {
        GameClient.playerAvatar = urlOrId;
      }
      if (typeof UI !== 'undefined' && UI.selectedAvatar !== undefined) {
        UI.selectedAvatar = urlOrId;
      }

      this.updateAllPreviews();
      this.renderGrid();

      if (typeof this.onSelectCallback === 'function') {
        this.onSelectCallback(urlOrId, this.getAvatarMeta(urlOrId));
      }
    },

    updateAllPreviews() {
      const meta = this.getAvatarMeta(this.selectedAvatar);
      const isTransparent = this.isAvatarTransparent(meta);
      const zoomClass = isTransparent ? 'img-contain-fit' : (meta.isKnownPortrait ? 'img-portrait-zoom' : 'img-cover-zoom');
      const bg = meta.isKnownDark ? '#111827' : `#${meta.color || 'facc15'}`;

      // Update preview images
      ['heroPreviewImg', 'hostPreviewImg', 'mobileTriggerImg', 'androidTriggerImg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.src = meta.url;
          el.alt = meta.name;
          el.className = zoomClass;
        }
      });

      // Update frame background colors
      ['heroPreviewFrame', 'hostPreviewFrame', 'mobileTriggerFrame', 'androidTriggerFrame'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.backgroundColor = bg;
      });

      // Update character names
      ['heroCharName', 'hostCharName', 'mobileTriggerName', 'androidTriggerName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = meta.name || 'Selected';
      });

      // Update category tags
      ['heroCatTag', 'hostCatTag', 'mobileTriggerCat', 'androidTriggerCategory'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = meta.categoryLabel || meta.category || 'Character';
      });

      // Update format tags
      ['heroFormatTag', 'hostFormatTag'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = meta.format || 'IMG';
      });

      // Sync any chip on screen
      document.querySelectorAll('.avatar-chip').forEach(chip => {
        const chipAv = chip.dataset.avatar;
        const matches = chipAv === meta.id || chipAv === meta.name.toLowerCase() || chipAv === this.selectedAvatar;
        chip.classList.toggle('selected', matches);
      });
    },

    handleSearch(query, clearBtnId = 'searchClearBtn') {
      this.searchQuery = query;
      this.loadedCount = INITIAL_BATCH;
      ['searchClearBtn', 'hostSearchClearBtn', 'androidSearchClearBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = query ? 'flex' : 'none';
      });
      this.renderGrid();
    },

    clearSearch(inputId = 'avatarSearchInput', clearBtnId = 'searchClearBtn') {
      this.playClick();
      this.searchQuery = '';
      ['avatarSearchInput', 'hostAvatarSearchInput', 'androidAvatarSearchInput'].forEach(id => {
        const inp = document.getElementById(id);
        if (inp) inp.value = '';
      });
      ['searchClearBtn', 'hostSearchClearBtn', 'androidSearchClearBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = 'none';
      });
      this.loadedCount = INITIAL_BATCH;
      this.renderGrid();
    },

    handleShuffle(scrollAreaId = 'avatarScrollArea') {
      this.playClick();
      this.currentShuffledList = null;
      this.loadedCount = INITIAL_BATCH;
      ['avatarScrollArea', 'hostAvatarScrollArea', 'androidAvatarScrollArea'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.scrollTop = 0;
      });
      this.renderGrid();
    },

    handleInfiniteScroll(scrollAreaId = 'avatarScrollArea') {
      const el = document.getElementById(scrollAreaId);
      if (!el) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 160) {
        this.loadedCount += BATCH_INCREMENT;
        this.renderGrid();
      }
    },

    handleFileUpload(e, callback) {
      const file = e.target.files?.[0];
      if (!file) return;

      const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
      if (file.type && !validMimes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
        alert('Invalid file format! Please upload a valid image file (PNG, JPG, WEBP, SVG, or GIF).');
        e.target.value = '';
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        alert('Avatar file too large! Please choose an image under 3 MB.');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        this.playSuccess();
        const dataUrl = evt.target?.result;
        const safeName = file.name.replace(/[^\w\s.-]/gi, '').replace(/\.[^/.]+$/, '').trim().slice(0, 16) || 'Avatar';
        const isSvg = file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml';
        const isGif = file.name.toLowerCase().endsWith('.gif') || file.type === 'image/gif';
        const isPng = file.name.toLowerCase().endsWith('.png') || file.type === 'image/png';
        this.customAvatarObj = {
          id: 'custom_upload_' + Date.now(),
          name: safeName,
          category: 'custom',
          categoryLabel: 'Custom Upload',
          url: dataUrl,
          format: isSvg ? 'SVG' : (isGif ? 'GIF' : 'IMG'),
          color: '38bdf8',
          isKnownDark: false,
          isKnownPortrait: false,
          isVector: isSvg,
          isTransparent: isSvg || isPng
        };
        this.selectAvatar(dataUrl);
        if (typeof callback === 'function') callback(dataUrl);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },

    handleImgError(img) {
      img.onerror = null;
      const seed = img.getAttribute('alt') || 'Hero';
      img.src = `https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(seed)}&backgroundColor=facc15`;
      img.className = 'img-contain-fit';
    },

    playTone(freq, type, dur, vol) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch (e) {}
    },

    playClick() { this.playTone(540, 'square', 0.04, 0.06); },
    playPop() { this.playTone(750, 'sine', 0.06, 0.12); },
    playSuccess() {
      this.playTone(440, 'triangle', 0.08, 0.12);
      setTimeout(() => this.playTone(660, 'triangle', 0.08, 0.12), 70);
      setTimeout(() => this.playTone(880, 'triangle', 0.12, 0.16), 140);
    }
  };

  window.AvatarPicker = AvatarPicker;
})(typeof window !== 'undefined' ? window : globalThis);
