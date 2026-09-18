// Scoopcast Realtime Multiplayer Client for Android (Neobrutalist Mobile)
// Compatible with Desktop MultiplayerEngine over public MQTT broker (broker.emqx.io)

/* ══════════════════════════════════════════════════════════════════
   NETWORK SECURITY & CRYPTOGRAPHIC SIGNATURES
   ══════════════════════════════════════════════════════════════════ */
const NetworkSecurity = {
  _secretKey: 'GTF_PROD_SEC_KEY_9921#*!',
  _rateLimits: {},

  getRoomTopic(roomCode) {
    if (!roomCode) return 'gtf_sec_v2/default';
    const code = String(roomCode).toUpperCase().trim();
    let hash = 0x811c9dc5;
    const seed = this._secretKey + ':' + code;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, '0');
    return 'gtf_sec_v2/' + hex + '_' + code;
  },

  getTopicHash(roomCode) {
    const t = this.getRoomTopic(roomCode);
    return t.replace(/[^a-zA-Z0-9_]/g, '_');
  },

  generateToken(roomCode, playerId, isHost) {
    const code = String(roomCode || '').toUpperCase().trim();
    const pid = String(playerId || '').trim();
    const role = isHost ? '1' : '0';
    const ts = Date.now().toString(36);
    const payload = code + '|' + pid + '|' + role + '|' + ts;
    let hash = 0x811c9dc5;
    const input = this._secretKey + '|' + payload;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    const sig = (hash >>> 0).toString(16).padStart(8, '0');
    return payload + '|' + sig;
  },

  validateIncomingMessage(msg, currentRoomCode) {
    if (!msg || typeof msg !== 'object') return false;
    const msgCode = String(msg.roomCode || '').trim().toUpperCase();
    const expectedCode = String(currentRoomCode || '').trim().toUpperCase();
    if (msgCode !== expectedCode) return false;
    return true;
  }
};

/* ══════════════════════════════════════════════════════════════════
   SMART FUZZY MATCHER (Identical to Desktop)
   ══════════════════════════════════════════════════════════════════ */
const FuzzyMatcher = {
  STOP_WORDS: new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'nor', 'for', 'yet', 'so',
    'in', 'on', 'at', 'to', 'by', 'of', 'off', 'up', 'out', 'over', 'into', 'with', 'from', 'as', 'down', 'about', 'under', 'between', 'through', 'after', 'before', 'without', 'against', 'during', 'around', 'among',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'it', 'its', 'this', 'that', 'these', 'those', 'there', 'here',
    'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their',
    'what', 'which', 'who', 'whom', 'whose', 'why', 'where', 'when', 'how',
    'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
    'not', 'no', 'yes', 'just', 'too', 'very', 'really',
    'movie', 'film', 'cinema', 'frame', 'guess', 'scene'
  ]),

  normalize(text) {
    if (!text) return '';
    let t = String(text).toLowerCase();
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    t = t.replace(/\(\d{4}\)|\b\d{4}\b/g, '');
    t = t.replace(/&/g, ' and ');
    t = t.replace(/[^\w\s]/g, ' ');
    t = t.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g, m => {
      const map = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10' };
      return map[m] || m;
    });
    t = t.replace(/\b(ii|iii|iv|v)\b/g, m => {
      const map = { 'ii': '2', 'iii': '3', 'iv': '4', 'v': '5' };
      return map[m] || m;
    });
    t = t.replace(/^(the|a|an|el|la|le|les)\s+/i, '').trim();
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  },

  levenshtein(s1, s2) {
    if (s1.length < s2.length) return this.levenshtein(s2, s1);
    if (s2.length === 0) return s1.length;
    let prev = [];
    for (let i = 0; i <= s2.length; i++) prev[i] = i;
    for (let i = 0; i < s1.length; i++) {
      let curr = [i + 1];
      for (let j = 0; j < s2.length; j++) {
        let ins = prev[j + 1] + 1;
        let del = curr[j] + 1;
        let sub = prev[j] + (s1[i] === s2[j] ? 0 : 1);
        curr[j + 1] = Math.min(ins, del, sub);
      }
      prev = curr;
    }
    return prev[s2.length];
  },

  canonicalWord(w) {
    if (!w) return '';
    if (w.length >= 4 && w.endsWith('s') && !w.endsWith('ss')) {
      return w.slice(0, -1);
    }
    return w;
  },

  isWordMatch(w1, w2) {
    if (!w1 || !w2) return false;
    if (w1 === w2) return true;
    const c1 = this.canonicalWord(w1);
    const c2 = this.canonicalWord(w2);
    if (c1 === c2) return true;
    const lenDiff = Math.abs(c1.length - c2.length);
    if (lenDiff > 2) return false;
    if (Math.min(c1.length, c2.length) >= 4) {
      const dist = this.levenshtein(c1, c2);
      if (Math.max(c1.length, c2.length) <= 6 && dist <= 1) return true;
      if (Math.max(c1.length, c2.length) > 6 && dist <= 2) return true;
    }
    return false;
  },

  getSignificantWords(normalizedStr) {
    if (!normalizedStr) return [];
    return normalizedStr.split(' ')
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !this.STOP_WORDS.has(w));
  },

  isMatch(guess, answer) {
    if (!guess || !answer) return false;
    const nGuess = this.normalize(guess);
    const nAns = this.normalize(answer);
    if (!nGuess || !nAns) return false;

    // 1. Exact normalized match
    if (nGuess === nAns) return true;

    // Compact comparison without spaces
    const compactGuess = nGuess.replace(/\s+/g, '');
    const compactAns = nAns.replace(/\s+/g, '');
    if (compactGuess === compactAns) return true;
    if (Math.abs(compactGuess.length - compactAns.length) <= 2) {
      const cDist = this.levenshtein(compactGuess, compactAns);
      if (compactAns.length <= 6 && cDist <= 1) return true;
      if (compactAns.length > 6 && cDist <= 2) return true;
    }

    // 2. Whole-string Levenshtein distance
    const lenDiff = Math.abs(nGuess.length - nAns.length);
    if (lenDiff <= 3) {
      const dist = this.levenshtein(nGuess, nAns);
      if (nAns.length <= 4) {
        if (dist === 0) return true;
      } else if (nAns.length <= 8) {
        if (dist <= 1) return true;
      } else if (nAns.length <= 15) {
        if (dist <= 2) return true;
      } else {
        if (dist <= 3) return true;
      }
    }

    // 3. Subtitle handling
    if (answer.includes(':') || answer.includes(' - ') || answer.includes('–')) {
      const parts = answer.split(/[:–]|\s-\s/).map(p => this.normalize(p)).filter(Boolean);
      for (const part of parts) {
        if (part.length >= 3) {
          if (nGuess === part) return true;
          const compactPart = part.replace(/\s+/g, '');
          if (compactGuess === compactPart) return true;
          if (Math.abs(compactGuess.length - compactPart.length) <= 2 && this.levenshtein(compactGuess, compactPart) <= 1) return true;
          if (Math.abs(nGuess.length - part.length) <= 2 && this.levenshtein(nGuess, part) <= 1) return true;
        }
      }
    }

    const ansSigWords = this.getSignificantWords(nAns);
    const guessSigWords = this.getSignificantWords(nGuess);

    if (ansSigWords.length === 0) {
      return nGuess === nAns || compactGuess === compactAns || this.levenshtein(nGuess, nAns) <= 1;
    }

    // 4. Multi-word guess matching
    if (guessSigWords.length > 1) {
      let matchedCount = 0;
      for (const gw of guessSigWords) {
        if (ansSigWords.some(aw => this.isWordMatch(gw, aw))) {
          matchedCount++;
        }
      }
      if (matchedCount === guessSigWords.length) return true;
      if (guessSigWords.length >= 3 && (matchedCount / guessSigWords.length) >= 0.66) return true;
      return false;
    }

    // 5. Single significant word guess
    const singleWord = guessSigWords.length === 1 ? guessSigWords[0] : (nGuess.split(' ').length === 1 ? nGuess : null);
    if (singleWord && !this.STOP_WORDS.has(singleWord) && singleWord.length >= 3) {
      for (const aw of ansSigWords) {
        if (this.isWordMatch(singleWord, aw)) return true;
      }
    }

    // 6. Substring inclusion check
    if (nAns.length >= 4) {
      const ansBoundaryRegex = new RegExp('(?:^|\\s)' + nAns + '(?:$|\\s)', 'i');
      if (ansBoundaryRegex.test(nGuess)) return true;
    }

    return false;
  }
};

/* ══════════════════════════════════════════════════════════════════
   GAME SECTIONS & MEDIA DATABASE (Identical to Desktop)
   ══════════════════════════════════════════════════════════════════ */
const GAME_SECTIONS = [
  {
    id: 1,
    name: 'Guess the Frame',
    frames: [
      { type: 'image', content: 'GUESSTHEFRAME/12th Fail (2023).webp', answer: '12TH FAIL', year: '2023' },
      { type: 'image', content: 'GUESSTHEFRAME/After Hours (1985).webp', answer: 'AFTER HOURS', year: '1985' },
      { type: 'image', content: 'GUESSTHEFRAME/Bramayugam (2024).webp', answer: 'BRAMAYUGAM', year: '2024' },
      { type: 'image', content: 'GUESSTHEFRAME/Brothers (2009).webp', answer: 'BROTHERS', year: '2009' },
      { type: 'image', content: 'GUESSTHEFRAME/Cocktail 2 (2026).webp', answer: 'COCKTAIL 2', year: '2026' },
      { type: 'image', content: 'GUESSTHEFRAME/Detective Byomkesh Bakshy (2015).webp', answer: 'DETECTIVE BYOMKESH BAKSHY', year: '2015' },
      { type: 'image', content: 'GUESSTHEFRAME/Ghanchakkar (2013).webp', answer: 'GHANCHAKKAR', year: '2013' },
      { type: 'image', content: 'GUESSTHEFRAME/Lapata Ladies (2023).webp', answer: 'LAPATA LADIES', year: '2023' },
      { type: 'image', content: 'GUESSTHEFRAME/Lars and the Real Girl (2007).webp', answer: 'LARS AND THE REAL GIRL', year: '2007' },
      { type: 'image', content: 'GUESSTHEFRAME/Mahaan (2022).webp', answer: 'MAHAAN', year: '2022' },
      { type: 'image', content: 'GUESSTHEFRAME/One Night Only (2026).webp', answer: 'ONE NIGHT ONLY', year: '2026' },
      { type: 'image', content: 'GUESSTHEFRAME/Piku (2015).webp', answer: 'PIKU', year: '2015' },
      { type: 'image', content: 'GUESSTHEFRAME/Satluj (2026).webp', answer: 'SATLUJ', year: '2026' },
      { type: 'image', content: 'GUESSTHEFRAME/The End of Oak Street (2026).webp', answer: 'THE END OF OAK STREET', year: '2026' },
      { type: 'image', content: 'GUESSTHEFRAME/The French Dispatch (2021).webp', answer: 'THE FRENCH DISPATCH', year: '2021' },
      { type: 'image', content: 'GUESSTHEFRAME/The Menu (2022).webp', answer: 'THE MENU', year: '2022' },
      { type: 'image', content: 'GUESSTHEFRAME/The Revenant (2015).webp', answer: 'THE REVENANT', year: '2022' },
      { type: 'image', content: 'GUESSTHEFRAME/The Rivals of Amziah King (2026).webp', answer: 'THE RIVALS OF AMZIAH KING', year: '2026' },
      { type: 'image', content: 'GUESSTHEFRAME/khosla ka gholsa(2006).webp', answer: 'KHOSLA KA GHOSLA', year: '2006' },
      { type: 'image', content: 'GUESSTHEFRAME/tony (2026).webp', answer: 'TONY', year: '2026' }
    ]
  },
  {
    id: 2,
    name: 'Guess the Dialogue',
    frames: [
      { type: 'dialogue', dialogue: "Dur Chale Gaye ho kya Ram. Main wahi khad hu jaha tum mujhe chor kar gayi thi", answer: "96", year: "2018" },
      { type: 'dialogue', dialogue: "That haircut should be against your vows", answer: "SUPERMAN", year: "2025" },
      { type: 'dialogue', dialogue: "They replace me. They'll replace you.", answer: "LANTERNS", year: "2026" },
      { type: 'dialogue', dialogue: "Rohit kuch piyoge Tea, Coffee. Bournvita", answer: "KOI MIL GAYA", year: "2003" },
      { type: 'dialogue', dialogue: "1 baat yaad rakhna beta is duniya mein bas 2 kism ke insaan hai, ache insaan jo acha kaam karte hai aur bure jo bura, bas yahi 1 farq hai insaano mein aur koi nahi", answer: "MY NAME IS KHAN", year: "2010" },
      { type: 'dialogue', dialogue: "The Hardest Choices Requires The Strongest wills", answer: "AVENGERS INFINITY WAR", year: "2018" },
      { type: 'dialogue', dialogue: "Look how they massacred my boy.", answer: "THE GODFATHER", year: "1972" },
      { type: 'dialogue', dialogue: "You can't handle the truth", answer: "A FEW GOOD MEN", year: "1992" },
      { type: 'dialogue', dialogue: "Why do we Fall sir", answer: "BATMAN BEGINS", year: "2005" },
      { type: 'dialogue', dialogue: "Saalo se muh cheepata hua phir raha hu aur ye gala faad ke Gafoor, Gafoor, Gafoor chilla raha hai", answer: "THE BADS OF BOLLYWOOD", year: "2025" }
    ]
  },
  {
    id: 3,
    name: 'Guess the Eye',
    frames: [
      { type: 'eye', content: 'GUESSTHEEYES/Aaron Pierre copy.webp', revealContent: 'GUESSTHEEYES/Aaron Pierre.webp', answer: 'AARON PIERRE', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Alexandra Daddario copy.webp', revealContent: 'GUESSTHEEYES/Alexandra Daddario.webp', answer: 'ALEXANDRA DADDARIO', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Angelina Jolie copy.webp', revealContent: 'GUESSTHEEYES/Angelina Jolie.webp', answer: 'ANGELINA JOLIE', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Disha Patani copy.webp', revealContent: 'GUESSTHEEYES/Disha Patani.webp', answer: 'DISHA PATANI', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Hunter Schafer copy.webp', revealContent: 'GUESSTHEEYES/Hunter Schafer.webp', answer: 'HUNTER SCHAFER', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Leonardo DiCaprio copy.webp', revealContent: 'GUESSTHEEYES/Leonardo DiCaprio.webp', answer: 'LEONARDO DICAPRIO', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Meryl Streep copy.webp', revealContent: 'GUESSTHEEYES/Meryl Streep.webp', answer: 'MERYL STREEP', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Nicole Kidman copy.webp', revealContent: 'GUESSTHEEYES/Nicole Kidman.webp', answer: 'NICOLE KIDMAN', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Wamiqa Gabbi copy.webp', revealContent: 'GUESSTHEEYES/Wamiqa Gabbi.webp', answer: 'WAMIQA GABBI', year: '' },
      { type: 'eye', content: 'GUESSTHEEYES/Yash copy.webp', revealContent: 'GUESSTHEEYES/Yash.webp', answer: 'YASH', year: '' }
    ]
  }
];

/* ══════════════════════════════════════════════════════════════════
   UNIFIED REALTIME GAME CLIENT (ANDROID MOBILE ENGINE)
   ══════════════════════════════════════════════════════════════════ */
const GameClient = {
  mqttClient: null,
  broadcastChannel: null,
  playerId: '',
  playerName: 'Cinephile',
  playerAvatar: 'aman',
  roomCode: '',
  roomId: '',
  isHost: false,
  isConnected: false,
  hasJoinedAck: false,
  isJoining: false,
  isMatchActive: false,
  isRoundFinished: false,

  players: [],
  hostSettings: { category: 'all', rounds: 20, timer: 30 },
  currentPlaylist: [],
  currentPlayIndex: 0,
  currentRoundWinners: [],
  currentMaskedHint: '',
  currentFrame: null,
  hasGuessedThisRound: false,
  hasUsedHintThisRound: false,

  timerRemaining: 30,
  timerInterval: null,
  joinRetryTimer: null,
  joinTimeoutTimer: null,
  heartbeatTimer: null,
  messageQueue: [],

  init() {
    let savedId = localStorage.getItem('gtf_m_player_id');
    if (!savedId) {
      savedId = 'p_m_' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36).slice(-3);
      localStorage.setItem('gtf_m_player_id', savedId);
    }
    this.playerId = savedId;
    this.playerName = localStorage.getItem('gtf_m_name') || 'Cinephile';
    this.playerAvatar = localStorage.getItem('gtf_m_avatar') || 'aman';
  },

  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  generateMaskedHint(title) {
    if (!title || typeof title !== 'string') return '';
    const clean = title.trim();
    if (!clean) return '';

    return clean.split(/\s+/).map(word => {
      const alphaIndices = [];
      for (let i = 0; i < word.length; i++) {
        if (/[a-zA-Z0-9]/i.test(word[i])) alphaIndices.push(i);
      }
      const L = alphaIndices.length;
      if (L === 0) return word;

      let revealCount = 1;
      if (L === 1) revealCount = 0;
      else if (L <= 5) revealCount = 1;
      else revealCount = Math.max(1, Math.min(Math.floor(L * 0.3), L - 3));

      const shuffled = [...alphaIndices].sort(() => Math.random() - 0.5);
      const revealSet = new Set(shuffled.slice(0, revealCount));

      const res = [];
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (!/[a-zA-Z0-9]/i.test(ch)) res.push(ch);
        else if (revealSet.has(i)) res.push(ch.toUpperCase());
        else res.push('_');
      }
      return res.join(' ');
    }).join('   ');
  },

  setupTransport(roomCode) {
    this.cleanupTransport();
    const topic = NetworkSecurity.getRoomTopic(roomCode);

    // 1. Same-device BroadcastChannel
    try {
      this.broadcastChannel = new BroadcastChannel('gtf_bc_' + NetworkSecurity.getTopicHash(roomCode));
      this.broadcastChannel.onmessage = (e) => {
        if (e && e.data) this.handleIncomingEvent(e.data);
      };
    } catch(err) {}

    // 2. Cloud MQTT WebSocket Broker
    if (typeof mqtt !== 'undefined') {
      const brokerList = [
        'wss://broker.emqx.io:8084/mqtt',
        'wss://broker.hivemq.com:8884/mqtt'
      ];
      try {
        const clientInstance = mqtt.connect(brokerList[0], {
          keepalive: 30,
          reconnectPeriod: 2000,
          connectTimeout: 5000,
          clientId: 'gtf_m_' + this.playerId + '_' + Math.random().toString(16).substring(2, 6)
        });
        this.mqttClient = clientInstance;

        clientInstance.on('connect', () => {
          if (this.mqttClient !== clientInstance) return;
          this.isConnected = true;
          console.log('[Realtime] Connected to Cloud MQTT Broker for room:', roomCode);
          clientInstance.subscribe(topic, { qos: 1 });
          this.flushMessageQueue();

          if (this.isHost) {
            this.broadcastState('HOST_ONLINE');
          } else if (this.isJoining && !this.hasJoinedAck) {
            this.sendJoinWithRetry();
          }
        });

        clientInstance.on('message', (t, payload) => {
          if (this.mqttClient !== clientInstance) return;
          try {
            const msg = JSON.parse(payload.toString());
            this.handleIncomingEvent(msg);
          } catch(e) {
            console.error('[Realtime] JSON parse error:', e);
          }
        });

        clientInstance.on('offline', () => {
          this.isConnected = false;
        });

        clientInstance.on('error', (err) => {
          console.warn('[Realtime] MQTT Error:', err.message);
        });
      } catch(err) {
        console.warn('[Realtime] Connect exception:', err);
      }
    }
  },

  cleanupTransport() {
    if (this.mqttClient) {
      try { this.mqttClient.end(true); } catch(e) {}
      this.mqttClient = null;
    }
    if (this.broadcastChannel) {
      try { this.broadcastChannel.close(); } catch(e) {}
      this.broadcastChannel = null;
    }
    this.isConnected = false;
  },

  sendEvent(eventType, payload = {}) {
    const token = NetworkSecurity.generateToken(this.roomCode, this.playerId, this.isHost);
    const msg = {
      token,
      type: eventType,
      roomId: this.roomId,
      roomCode: this.roomCode,
      senderId: this.playerId,
      timestamp: Date.now(),
      ...payload
    };

    // 1. BroadcastChannel (local tabs)
    if (this.broadcastChannel) {
      try { this.broadcastChannel.postMessage(msg); } catch(e) {}
    }

    // 2. Cloud MQTT
    if (this.mqttClient && this.mqttClient.connected) {
      const topic = NetworkSecurity.getRoomTopic(this.roomCode);
      this.mqttClient.publish(topic, JSON.stringify(msg), { qos: 1 });
    } else {
      if (!this.messageQueue) this.messageQueue = [];
      this.messageQueue.push({ topic: NetworkSecurity.getRoomTopic(this.roomCode), payload: JSON.stringify(msg) });
    }
  },

  flushMessageQueue() {
    if (!this.mqttClient || !this.mqttClient.connected || !this.messageQueue) return;
    while (this.messageQueue.length > 0) {
      const item = this.messageQueue.shift();
      this.mqttClient.publish(item.topic, item.payload, { qos: 1 });
    }
  },

  hostGame(options = {}) {
    this.init();
    this.isHost = true;
    this.roomCode = this.generateRoomCode();
    this.roomId = 'room_' + this.roomCode;
    this.hasJoinedAck = true;
    this.isJoining = false;

    this.hostSettings = {
      category: options.category || 'all',
      rounds: options.rounds || 20,
      timer: options.timer || 30
    };

    this.players = [{
      id: this.playerId,
      name: this.playerName,
      avatar: this.playerAvatar,
      score: 0,
      isHost: true,
      loaded: true
    }];

    this.setupTransport(this.roomCode);
    this.startHeartbeat();

    UI.setRoomCode(this.roomCode);
    UI.setHostControlsVisible(true);
    UI.renderLobbyPlayers();
    UI.renderScoreboard();
    UI.showScreen('lobbyScreen');
    const crownIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.crown : '';
    UI.showToast(`${crownIcon} Room ${this.roomCode} created! Share the code with friends.`);
  },

  joinGame(roomCode) {
    this.init();
    const cleanCode = String(roomCode || '').toUpperCase().trim();
    if (!cleanCode || cleanCode.length !== 4) {
      UI.showToast('Please enter a valid 4-letter room code!');
      return;
    }

    this.isHost = false;
    this.roomCode = cleanCode;
    this.roomId = 'room_' + this.roomCode;
    this.hasJoinedAck = false;
    this.isJoining = true;

    this.players = [{
      id: this.playerId,
      name: this.playerName,
      avatar: this.playerAvatar,
      score: 0,
      isHost: false,
      loaded: true
    }];

    UI.showLoading(`Connecting to Room ${cleanCode}...`);
    this.setupTransport(this.roomCode);

    // Timeout after 14 seconds if no host responds
    if (this.joinTimeoutTimer) clearTimeout(this.joinTimeoutTimer);
    this.joinTimeoutTimer = setTimeout(() => {
      if (!this.hasJoinedAck && this.isJoining) {
        this.isJoining = false;
        if (this.joinRetryTimer) clearInterval(this.joinRetryTimer);
        this.cleanupTransport();
        UI.hideLoading();
        const warnIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.alert : '';
        UI.showToast(`${warnIcon} Lobby not found. Please verify your room code and make sure the host is online.`);
      }
    }, 14000);
  },

  sendJoinWithRetry() {
    if (this.joinRetryTimer) clearInterval(this.joinRetryTimer);
    const sendJoin = () => {
      if (this.hasJoinedAck || this.isHost) {
        if (this.joinRetryTimer) clearInterval(this.joinRetryTimer);
        return;
      }
      this.sendEvent('PLAYER_JOIN', {
        id: this.playerId,
        name: this.playerName,
        avatar: this.playerAvatar
      });
    };
    sendJoin();
    this.joinRetryTimer = setInterval(sendJoin, 1400);
  },

  broadcastState(reason = 'UPDATE') {
    if (!this.isHost) return;
    this.sendEvent('SYNC_ROOM_STATE', {
      reason,
      players: this.players,
      hostSettings: this.hostSettings,
      currentPlaylist: this.currentPlaylist,
      currentPlayIndex: this.currentPlayIndex,
      currentRoundWinners: this.currentRoundWinners,
      timeRemaining: this.timerRemaining
    });
  },

  handleIncomingEvent(msg) {
    if (!msg || !msg.type) return;
    const incomingRoom = String(msg.roomCode || '').trim().toUpperCase();
    const currentRoom = String(this.roomCode || '').trim().toUpperCase();
    if (!incomingRoom || !currentRoom || incomingRoom !== currentRoom) return;
    if (msg.senderId === this.playerId && msg.type !== 'SYNC_ROOM_STATE') return;

    if (!NetworkSecurity.validateIncomingMessage(msg, this.roomCode)) return;

    switch (msg.type) {
      case 'PLAYER_JOIN': {
        if (this.isHost) {
          const joiningId = msg.id || msg.senderId;
          const joiningName = msg.name || 'Player';
          const joiningAvatar = msg.avatar || 'aman';

          let existing = this.players.find(p => p.id === joiningId);
          if (existing) {
            existing.name = joiningName;
            existing.avatar = joiningAvatar;
          } else {
            this.players.push({
              id: joiningId,
              name: joiningName,
              avatar: joiningAvatar,
              score: 0,
              isHost: false,
              loaded: true
            });
            const waveIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.wave : '';
            UI.showToast(`${waveIcon} ${joiningName} joined the room!`);
            if (typeof SoundEffects !== 'undefined') SoundEffects.playPop();
          }

          UI.renderLobbyPlayers();
          UI.renderScoreboard();
          this.broadcastState('PLAYER_JOINED');
        }
        break;
      }

      case 'SYNC_ROOM_STATE': {
        const wasJoining = this.isJoining && !this.hasJoinedAck;
        this.hasJoinedAck = true;
        this.isJoining = false;
        if (this.joinRetryTimer) clearInterval(this.joinRetryTimer);
        if (this.joinTimeoutTimer) clearTimeout(this.joinTimeoutTimer);

        if (Array.isArray(msg.players) && msg.players.length > 0) {
          this.players = msg.players;
        }
        if (msg.hostSettings) this.hostSettings = msg.hostSettings;
        if (msg.currentPlaylist && msg.currentPlaylist.length > 0) this.currentPlaylist = msg.currentPlaylist;
        if (msg.currentPlayIndex !== undefined) this.currentPlayIndex = msg.currentPlayIndex;
        if (msg.currentRoundWinners) this.currentRoundWinners = msg.currentRoundWinners;

        const hostPlayer = this.players.find(p => p.isHost);
        this.isHost = !!(hostPlayer && hostPlayer.id === this.playerId);

        UI.hideLoading();
        UI.setRoomCode(this.roomCode);
        UI.setHostControlsVisible(this.isHost);
        UI.renderLobbyPlayers();
        UI.renderScoreboard();

        if (wasJoining) {
          UI.showScreen('lobbyScreen');
          const rocketIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.rocket : '';
          UI.showToast(`${rocketIcon} Connected to room ${this.roomCode}!`);
          this.startHeartbeat();
        }
        break;
      }

      case 'GAME_START_COUNTDOWN': {
        this.isMatchActive = true;
        this.isRoundFinished = false;
        if (msg.players) this.players = msg.players;
        if (msg.playlist) this.currentPlaylist = msg.playlist;
        if (msg.hostSettings) this.hostSettings = msg.hostSettings;
        this.currentPlayIndex = 0;

        UI.showCountdownOverlay();
        if (typeof SoundEffects !== 'undefined') SoundEffects.playTick();
        break;
      }

      case 'ROUND_START': {
        this.handleRemoteRoundStart(msg);
        break;
      }

      case 'SUBMIT_GUESS': {
        if (this.isHost) {
          this.validateAndProcessGuess(msg);
        }
        break;
      }

      case 'GUESS_RESULT': {
        if (msg.targetPlayerId === this.playerId && !msg.isCorrect) {
          if (typeof SoundEffects !== 'undefined') SoundEffects.playWrong();
          if (typeof Haptics !== 'undefined') Haptics.wrong();
          UI.shakeGuessInput();
        }
        break;
      }

      case 'GUESS_CORRECT_BROADCAST': {
        this.handleRemoteCorrectGuess(msg);
        break;
      }

      case 'ROUND_FINISH_BROADCAST': {
        this.handleRemoteRoundFinish(msg);
        break;
      }

      case 'PLAYER_USED_HINT': {
        if (msg.updatedPlayers) {
          this.players = msg.updatedPlayers;
          UI.renderScoreboard();
        }
        break;
      }

      case 'HOST_SKIP_BROADCAST': {
        const skipIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.skip : '';
        UI.showToast(`${skipIcon} Host skipped the round!`);
        if (typeof SoundEffects !== 'undefined') SoundEffects.playWrong();
        break;
      }

      case 'GAME_OVER_BROADCAST': {
        this.isMatchActive = false;
        this.isRoundFinished = true;
        if (msg.players) this.players = msg.players;
        if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
        UI.showScreen('gameOverScreen');
        UI.renderPodium();
        break;
      }

      case 'CHAT_MESSAGE': {
        if (msg.msg) {
          UI.appendChatMessage(msg.msg);
          const dot = document.getElementById('chatUnreadDot');
          const drawer = document.getElementById('chatDrawer');
          if (dot && (!drawer || !drawer.classList.contains('open'))) {
            dot.style.display = 'block';
          }
        }
        break;
      }

      case 'PLAYER_LEAVE': {
        const leavingId = msg.playerId || msg.senderId;
        if (leavingId) {
          this.players = this.players.filter(p => p.id !== leavingId);
          UI.renderLobbyPlayers();
          UI.renderScoreboard();
        }
        break;
      }
    }
  },

  startGame(options = {}) {
    if (!this.isHost) return;

    const cat = options.category || this.hostSettings.category || 'all';
    const totalRounds = Number(options.rounds) || this.hostSettings.rounds || 20;
    const timer = Number(options.timer) || this.hostSettings.timer || 30;

    this.hostSettings = { category: cat, rounds: totalRounds, timer };

    // Build playlist from sections
    let pool = [];
    if (cat === 'frames') {
      const s1 = GAME_SECTIONS.find(s => s.id === 1);
      if (s1) pool = [...s1.frames].sort(() => 0.5 - Math.random()).slice(0, totalRounds);
    } else if (cat === 'dialogue') {
      const s2 = GAME_SECTIONS.find(s => s.id === 2);
      if (s2) pool = [...s2.frames].sort(() => 0.5 - Math.random()).slice(0, totalRounds);
    } else if (cat === 'eyes') {
      const s3 = GAME_SECTIONS.find(s => s.id === 3);
      if (s3) pool = [...s3.frames].sort(() => 0.5 - Math.random()).slice(0, totalRounds);
    } else {
      // 'all' category: balanced mix
      const s1 = GAME_SECTIONS.find(s => s.id === 1);
      const s2 = GAME_SECTIONS.find(s => s.id === 2);
      const s3 = GAME_SECTIONS.find(s => s.id === 3);

      const fFrames = s1 ? [...s1.frames].sort(() => 0.5 - Math.random()).slice(0, 20) : [];
      const fDial = s2 ? [...s2.frames].sort(() => 0.5 - Math.random()).slice(0, 10) : [];
      const fEyes = s3 ? [...s3.frames].sort(() => 0.5 - Math.random()).slice(0, 10) : [];
      pool = [...fFrames, ...fDial, ...fEyes].slice(0, totalRounds);
    }

    if (pool.length === 0) {
      const s1 = GAME_SECTIONS.find(s => s.id === 1);
      pool = s1 ? [...s1.frames] : [];
    }

    this.currentPlaylist = pool;
    this.currentPlayIndex = 0;
    this.isMatchActive = true;
    this.isRoundFinished = false;

    this.players.forEach(p => p.score = 0);

    // Broadcast countdown to all clients
    this.sendEvent('GAME_START_COUNTDOWN', {
      totalRounds: this.currentPlaylist.length,
      hostSettings: this.hostSettings,
      players: this.players,
      playlist: this.currentPlaylist
    });

    UI.showCountdownOverlay();
    if (typeof SoundEffects !== 'undefined') SoundEffects.playTick();

    setTimeout(() => {
      this.startRound(0);
    }, 3200);
  },

  startRound(roundIndex) {
    if (!this.isHost) return;
    if (!this.currentPlaylist || roundIndex >= this.currentPlaylist.length) {
      this.finishGame();
      return;
    }

    this.currentPlayIndex = roundIndex;
    this.currentRoundWinners = [];
    this.hasGuessedThisRound = false;
    this.hasUsedHintThisRound = false;
    this.isRoundFinished = false;

    const frame = this.currentPlaylist[roundIndex];
    this.currentFrame = frame;
    this.currentMaskedHint = this.generateMaskedHint(frame.answer);
    const timerDuration = this.hostSettings.timer || 30;

    // Send sanitized frame to clients (strip answer/year)
    const clientFrame = {
      type: frame.type,
      content: frame.content,
      revealContent: frame.revealContent,
      dialogue: frame.dialogue,
      context: frame.context,
      sectionName: frame.sectionName || (frame.type === 'dialogue' ? 'Guess the Dialogue' : (frame.type === 'eye' ? 'Guess the Eye' : 'Guess the Frame'))
    };

    this.sendEvent('ROUND_START', {
      roundIndex,
      totalRounds: this.currentPlaylist.length,
      frame: clientFrame,
      timerDuration,
      maskedHint: this.currentMaskedHint
    });

    this.setupRoundUI(clientFrame, timerDuration, roundIndex);
  },

  handleRemoteRoundStart(msg) {
    this.isMatchActive = true;
    this.isRoundFinished = false;
    this.currentPlayIndex = msg.roundIndex;
    this.currentRoundWinners = [];
    this.hasGuessedThisRound = false;
    this.hasUsedHintThisRound = false;
    this.currentMaskedHint = msg.maskedHint || '';
    this.currentFrame = msg.frame;

    const timerDuration = msg.timerDuration || 30;
    this.setupRoundUI(msg.frame, timerDuration, msg.roundIndex, msg.totalRounds);
  },

  setupRoundUI(frame, timerDuration, roundIndex, totalRounds) {
    totalRounds = totalRounds || (this.currentPlaylist ? this.currentPlaylist.length : 20);

    if (typeof Haptics !== 'undefined') Haptics.roundStart();
    UI.showScreen('gameScreen');
    UI.setupRoundMedia({
      type: frame.type,
      content: frame.type === 'dialogue' ? frame.dialogue : frame.content,
      year: '',
      round: roundIndex + 1,
      totalRounds
    });

    this.startTimer(timerDuration);
  },

  startTimer(duration) {
    this.stopTimer();
    this.timerRemaining = duration;
    UI.updateTimer(this.timerRemaining);

    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      UI.updateTimer(this.timerRemaining);

      if (this.timerRemaining <= 0) {
        this.stopTimer();
        if (this.isHost) {
          this.endRound();
        }
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  submitGuess(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    if (this.hasGuessedThisRound || this.isRoundFinished) {
      this.sendChat(clean);
      return;
    }

    if (this.isHost) {
      this.validateAndProcessGuess({
        playerId: this.playerId,
        playerName: this.playerName,
        playerAvatar: this.playerAvatar,
        guess: clean,
        roundIndex: this.currentPlayIndex
      });
    } else {
      this.sendEvent('SUBMIT_GUESS', {
        playerId: this.playerId,
        playerName: this.playerName,
        playerAvatar: this.playerAvatar,
        guess: clean,
        roundIndex: this.currentPlayIndex
      });
    }
  },

  validateAndProcessGuess(data) {
    if (!this.isHost) return;
    if (data.roundIndex !== this.currentPlayIndex) return;
    if (this.currentRoundWinners.some(w => w.playerId === data.playerId)) return;

    const currentFrame = this.currentPlaylist[this.currentPlayIndex];
    if (!currentFrame || !currentFrame.answer) return;

    const isMatch = FuzzyMatcher.isMatch(data.guess, currentFrame.answer);
    if (isMatch) {
      const pos = this.currentRoundWinners.length + 1;
      const pts = pos === 1 ? 10 : (pos === 2 ? 7 : (pos === 3 ? 5 : 0));

      const player = this.players.find(p => p.id === data.playerId);
      if (player) {
        player.score = (player.score || 0) + pts;
      }

      const winRecord = {
        playerId: data.playerId,
        playerName: data.playerName,
        avatar: data.playerAvatar,
        position: pos,
        points: pts,
        timestamp: Date.now()
      };
      this.currentRoundWinners.push(winRecord);

      if (data.playerId === this.playerId) {
        this.hasGuessedThisRound = true;
        if (typeof Haptics !== 'undefined') Haptics.correct();
        if (typeof SoundEffects !== 'undefined') SoundEffects.playCorrect();
        UI.showGuessSuccess(pos, pts);
      }

      UI.renderScoreboard();

      this.sendEvent('GUESS_CORRECT_BROADCAST', {
        winRecord,
        updatedPlayers: this.players
      });

      if (this.currentRoundWinners.length >= 3) {
        setTimeout(() => this.endRound(), 600);
      }
    } else {
      if (data.playerId === this.playerId) {
        if (typeof Haptics !== 'undefined') Haptics.wrong();
        if (typeof SoundEffects !== 'undefined') SoundEffects.playWrong();
        UI.shakeGuessInput();
      } else {
        this.sendEvent('GUESS_RESULT', {
          targetPlayerId: data.playerId,
          isCorrect: false
        });
      }
    }
  },

  handleRemoteCorrectGuess(msg) {
    const winRecord = msg.winRecord;
    if (winRecord && !this.currentRoundWinners.some(w => w.playerId === winRecord.playerId)) {
      this.currentRoundWinners.push(winRecord);
    }
    if (msg.updatedPlayers) {
      this.players = msg.updatedPlayers;
      UI.renderScoreboard();
    }

    if (winRecord && winRecord.playerId === this.playerId) {
      this.hasGuessedThisRound = true;
      if (typeof Haptics !== 'undefined') Haptics.correct();
      if (typeof SoundEffects !== 'undefined') SoundEffects.playCorrect();
      UI.showGuessSuccess(winRecord.position, winRecord.points);
    }
  },

  requestHint() {
    if (this.hasUsedHintThisRound || this.hasGuessedThisRound) return;
    this.hasUsedHintThisRound = true;

    // Deduct 2 points
    const me = this.players.find(p => p.id === this.playerId);
    if (me) {
      me.score = Math.max(0, (me.score || 0) - 2);
    }

    if (typeof Haptics !== 'undefined') Haptics.hint();
    if (typeof SoundEffects !== 'undefined') SoundEffects.playHint();
    UI.displayHintBanner(this.currentMaskedHint || 'H _ N T', 2);
    UI.renderScoreboard();

    this.sendEvent('PLAYER_USED_HINT', {
      playerId: this.playerId,
      playerName: this.playerName,
      playerAvatar: this.playerAvatar,
      updatedPlayers: this.players
    });
  },

  endRound() {
    this.stopTimer();
    this.isRoundFinished = true;

    const currentFrame = (this.currentPlaylist && this.currentPlaylist[this.currentPlayIndex]) || this.currentFrame;
    if (!currentFrame) return;

    if (this.isHost) {
      this.sendEvent('ROUND_FINISH_BROADCAST', {
        currentRoundWinners: this.currentRoundWinners,
        currentPlayIndex: this.currentPlayIndex,
        revealedAnswer: currentFrame.answer || '',
        revealedYear: currentFrame.year || '',
        revealedContent: currentFrame.revealContent || currentFrame.content
      });
    }

    if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
    if (typeof Haptics !== 'undefined') Haptics.correct();

    UI.showScreen('revealScreen');
    UI.renderRoundReveal({
      answer: currentFrame.answer,
      year: currentFrame.year,
      type: currentFrame.type,
      content: currentFrame.type === 'dialogue' ? currentFrame.dialogue : currentFrame.content,
      revealedContent: currentFrame.revealContent || currentFrame.content,
      winners: this.currentRoundWinners
    });
  },

  handleRemoteRoundFinish(msg) {
    this.stopTimer();
    this.isRoundFinished = true;
    this.currentRoundWinners = msg.currentRoundWinners || [];

    const currentFrame = (this.currentPlaylist && this.currentPlaylist[this.currentPlayIndex]) || this.currentFrame || {};

    if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
    if (typeof Haptics !== 'undefined') Haptics.correct();

    UI.showScreen('revealScreen');
    UI.renderRoundReveal({
      answer: msg.revealedAnswer || currentFrame.answer,
      year: msg.revealedYear || currentFrame.year,
      type: currentFrame.type || 'image',
      content: currentFrame.content || '',
      revealedContent: msg.revealedContent || currentFrame.revealContent || currentFrame.content,
      winners: this.currentRoundWinners
    });
  },

  nextRound() {
    if (!this.isHost) return;
    const nextIdx = this.currentPlayIndex + 1;
    if (nextIdx < this.currentPlaylist.length) {
      this.startRound(nextIdx);
    } else {
      this.finishGame();
    }
  },

  skipRound() {
    if (!this.isHost) return;
    this.sendEvent('HOST_SKIP_BROADCAST');
    this.endRound();
  },

  finishGame() {
    this.stopTimer();
    this.isMatchActive = false;
    this.isRoundFinished = true;

    if (this.isHost) {
      this.sendEvent('GAME_OVER_BROADCAST', {
        players: this.players,
        totalRounds: this.currentPlaylist.length
      });
    }

    if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
    UI.showScreen('gameOverScreen');
    UI.renderPodium();
  },

  sendChat(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    // Spoiler prevention: check if message matches current round answer
    const currentAns = (this.currentPlaylist && this.currentPlaylist[this.currentPlayIndex]?.answer) ||
      (this.currentFrame && this.currentFrame.answer);

    if (this.isMatchActive && !this.isRoundFinished && currentAns && FuzzyMatcher.isMatch(clean, currentAns)) {
      if (!this.hasGuessedThisRound) {
        this.submitGuess(clean);
        return;
      } else {
        const warnIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.alert : '';
        UI.showToast(`${warnIcon} Shh! That's the answer! Don't spoil it in chat!`);
        return;
      }
    }

    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      senderId: this.playerId,
      senderName: this.playerName,
      senderAvatar: this.playerAvatar,
      text: clean,
      timestamp: Date.now()
    };

    UI.appendChatMessage(msg);
    this.sendEvent('CHAT_MESSAGE', { msg });
  },

  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (!this.roomCode) return;
      const type = this.isHost ? 'HOST_HEARTBEAT' : 'CLIENT_HEARTBEAT';
      this.sendEvent(type, {
        playerId: this.playerId,
        name: this.playerName
      });
    }, 4000);
  },

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  },

  leaveRoom() {
    if (this.roomCode) {
      this.sendEvent('PLAYER_LEAVE', { playerId: this.playerId });
    }
    this.stopTimer();
    this.stopHeartbeat();
    if (this.joinRetryTimer) clearInterval(this.joinRetryTimer);
    if (this.joinTimeoutTimer) clearTimeout(this.joinTimeoutTimer);
    this.cleanupTransport();

    this.roomCode = '';
    this.roomId = '';
    this.isHost = false;
    this.isMatchActive = false;
    this.isRoundFinished = false;
    this.players = [];

    UI.showScreen('homeScreen');
  }
};

window.GameClient = GameClient;
window.NetworkSecurity = NetworkSecurity;
window.FuzzyMatcher = FuzzyMatcher;
