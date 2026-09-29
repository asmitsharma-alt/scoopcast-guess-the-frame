// Scoopcast Realtime Multiplayer Client for Android (Neobrutalist Mobile)
// Powered by Colyseus Authoritative Game Server

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
    // English articles, prepositions, pronouns, auxiliaries
    'the', 'a', 'an', 'and', 'or', 'but', 'nor', 'for', 'yet', 'so',
    'in', 'on', 'at', 'to', 'by', 'of', 'off', 'up', 'out', 'over', 'into', 'with', 'from', 'as', 'down', 'about', 'under', 'between', 'through', 'after', 'before', 'without', 'against', 'during', 'around', 'among',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'it', 'its', 'this', 'that', 'these', 'those', 'there', 'here',
    'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their',
    'what', 'which', 'who', 'whom', 'whose', 'why', 'where', 'when', 'how',
    'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
    'not', 'no', 'yes', 'just', 'too', 'very', 'really',
    // Media, cinema, and game fillers
    'movie', 'film', 'cinema', 'frame', 'guess', 'scene', 'part', 'chapter', 'season', 'episode', 'show', 'series', 'star', 'actor', 'actress',
    // Common conversational fillers
    'think', 'know', 'maybe', 'probably', 'sure', 'name',
    // Common Hindi / Hinglish connectives & particles
    'ka', 'ki', 'ke', 'ko', 'se', 'me', 'mein', 'par', 'aur', 'ya', 'ek', 'do', 'hai', 'hain', 'tha', 'thi', 'the', 'ye', 'yeh', 'woh', 'hum', 'tum', 'aap', 'wala', 'wali', 'wale', 'na',
    // Standalone numbers & numerals
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'i', 'ii', 'iii', 'iv', 'v'
  ]),

  normalize(text) {
    if (!text) return '';
    let t = String(text).toLowerCase();
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    t = t.replace(/\(\d{4}\)|\b\d{4}\b/g, '');
    t = t.replace(/&/g, ' and ');
    t = t.replace(/[^\w\s]/g, ' ');
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

  /**
   * Ultra-lenient single-word matcher with adaptive typo tolerance and prefix matching.
   */
  isWordMatch(w1, w2) {
    if (!w1 || !w2) return false;
    w1 = w1.toLowerCase().trim();
    w2 = w2.toLowerCase().trim();
    if (w1 === w2) return true;

    if (this.STOP_WORDS.has(w1) || this.STOP_WORDS.has(w2)) return false;
    if (/^\d+$/.test(w1) || /^\d+$/.test(w2)) return false;
    if (w1.length < 3 || w2.length < 3) return false;

    const c1 = this.canonicalWord(w1);
    const c2 = this.canonicalWord(w2);
    if (c1 === c2) return true;

    const deDup = (s) => s.replace(/(.)\1+/g, '$1');
    const d1 = deDup(c1);
    const d2 = deDup(c2);
    if (d1 === d2) return true;

    const maxLen = Math.max(c1.length, c2.length);
    const minLen = Math.min(c1.length, c2.length);
    const lenDiff = Math.abs(c1.length - c2.length);

    if (minLen >= 5 && minLen / maxLen >= 0.8) {
      if (c1.startsWith(c2) || c2.startsWith(c1)) return true;
      if (d1.startsWith(d2) || d2.startsWith(d1)) return true;
    }

    // Short words (<= 4 chars): 0 typos allowed
    if (maxLen <= 4) {
      return false;
    }

    // Medium words (5 to 7 chars): max 1 typo, length diff <= 1
    if (maxLen <= 7) {
      if (lenDiff > 1) return false;
      return this.levenshtein(c1, c2) <= 1 || this.levenshtein(d1, d2) <= 1;
    }

    // Long words (8+ chars): max 2 typos, length diff <= 2
    if (lenDiff > 2) return false;
    return this.levenshtein(c1, c2) <= 2 || this.levenshtein(d1, d2) <= 2;
  },

  getSignificantWords(normalizedStr) {
    if (!normalizedStr) return [];
    const words = normalizedStr.split(/[\s\-:]+/)
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
    
    const result = [...words];
    for (let i = 0; i < words.length - 1; i++) {
      const combined = words[i] + words[i + 1];
      if (combined.length >= 5 && !result.includes(combined)) {
        result.push(combined);
      }
    }
    return result;
  },

  isMatch(guess, answer) {
    if (!guess || !answer) return false;
    const nGuess = this.normalize(guess);
    const nAns = this.normalize(answer);
    if (!nGuess || !nAns) return false;

    // 1. Exact normalized match
    if (nGuess === nAns) return true;

    // 2. Direct compact comparison without spaces
    const compactGuess = nGuess.replace(/\s+/g, '');
    const compactAns = nAns.replace(/\s+/g, '');
    if (compactGuess === compactAns) return true;
    if (Math.abs(compactGuess.length - compactAns.length) <= 2) {
      const cDist = this.levenshtein(compactGuess, compactAns);
      if (compactAns.length <= 6 && cDist <= 1) return true;
      if (compactAns.length > 6 && cDist <= 2) return true;
    }

    // 3. Whole-string Levenshtein distance
    const lenDiff = Math.abs(nGuess.length - nAns.length);
    if (lenDiff <= 2) {
      const dist = this.levenshtein(nGuess, nAns);
      if (nAns.length <= 5) {
        if (dist <= 1) return true;
      } else if (nAns.length <= 8) {
        if (dist <= 1) return true;
      } else if (nAns.length <= 15) {
        if (dist <= 2) return true;
      } else {
        if (dist <= 3) return true;
      }
    }

    // 4. Subtitle handling
    if (answer.includes(':') || answer.includes(' - ') || answer.includes('–')) {
      const parts = answer.split(/[:–]|\s-\s/).map(p => this.normalize(p)).filter(Boolean);
      for (const part of parts) {
        if (part.length >= 3) {
          if (nGuess === part) return true;
          const compactPart = part.replace(/\s+/g, '');
          if (compactGuess === compactPart) return true;
          if (Math.abs(compactGuess.length - compactPart.length) <= 1 && this.levenshtein(compactGuess, compactPart) <= 1) return true;
          if (Math.abs(nGuess.length - part.length) <= 1 && this.levenshtein(nGuess, part) <= 1) return true;
        }
      }
    }

    const ansSigWords = this.getSignificantWords(nAns);
    const rawAnsWords = String(answer).toLowerCase().split(/[\s\-:\(\)\/\.\_]+/).filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
    for (const rw of rawAnsWords) {
      if (!ansSigWords.includes(rw)) ansSigWords.push(rw);
    }

    const guessTokens = nGuess.split(/[\s\-:\(\)\/\.\_]+/).map(w => w.trim()).filter(Boolean);
    const validGuessWords = guessTokens.filter(t => t.length >= 3 && !this.STOP_WORDS.has(t) && !/^\d+$/.test(t));

    if (ansSigWords.length === 0 || validGuessWords.length === 0) {
      return nGuess === nAns || compactGuess === compactAns;
    }

    // 5. Word-level matching:
    // Case A: Single-word guess
    if (validGuessWords.length === 1) {
      const singleWord = validGuessWords[0];
      for (const aw of ansSigWords) {
        if (this.isWordMatch(singleWord, aw)) {
          return true;
        }
      }
    } else {
      // Case B: Multi-word guess
      let matchCount = 0;
      for (const gw of validGuessWords) {
        let matched = false;
        for (const aw of ansSigWords) {
          if (this.isWordMatch(gw, aw)) {
            matched = true;
            break;
          }
        }
        if (matched) matchCount++;
      }
      if (matchCount > 0 && (matchCount / validGuessWords.length) >= 0.7) {
        return true;
      }
    }

    return false;
  },

  // Deprecated: Warning mechanism removed per user directive. Always returns false.
  isCloseMatch(guess, answer) {
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
      { type: 'image', content: '/GUESSTHEFRAME/American History X (1998).webp', answer: 'AMERICAN HISTORY X', year: '1998', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Avengers Infinity War (2018).webp', answer: 'AVENGERS INFINITY WAR', year: '2018', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Baahubali 2 The Conclusion (2017).webp', answer: 'BAAHUBALI 2 THE CONCLUSION', year: '2017', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Balan - The Boy (2026).webp', answer: 'BALAN - THE BOY', year: '2026', tag: 'new' },
      { type: 'image', content: '/GUESSTHEFRAME/Before Sunset (2004).webp', answer: 'BEFORE SUNSET', year: '2004', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Billu (2009).webp', answer: 'BILLU', year: '2009', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Certified Copy (2010).webp', answer: 'CERTIFIED COPY', year: '2010', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Dallas Buyers Club (2013).webp', answer: 'DALLAS BUYERS CLUB', year: '2013', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Dune Part Two (2024).webp', answer: 'DUNE PART TWO', year: '2024', tag: 'new' },
      { type: 'image', content: '/GUESSTHEFRAME/GO GOA GONE (2013).webp', answer: 'GO GOA GONE', year: '2013', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/I Saw the Devil (2010).webp', answer: 'I SAW THE DEVIL', year: '2010', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Irumudi (2026).webp', answer: 'IRUMUDI', year: '2026', tag: 'new' },
      { type: 'image', content: '/GUESSTHEFRAME/Karwaan (2018).webp', answer: 'KARWAAN', year: '2018', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Nirvanna.the.Band.the.Show.the.Movie (2025).webp', answer: 'NIRVANNA THE BAND THE SHOW THE MOVIE', year: '2025', tag: 'new' },
      { type: 'image', content: '/GUESSTHEFRAME/October (2018).webp', answer: 'OCTOBER', year: '2018', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/premalu (2024).webp', answer: 'PREMALU', year: '2024', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Rang De Basanti (2006).webp', answer: 'RANG DE BASANTI', year: '2006', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Requiem for a Dream (2000).webp', answer: 'REQUIEM FOR A DREAM', year: '2000', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/S_O Satyamurthy (2015).webp', answer: 'S/O SATYAMURTHY', year: '2015', tag: 'classic' },
      { type: 'image', content: '/GUESSTHEFRAME/Stand by Me (1986).webp', answer: 'STAND BY ME', year: '1986', tag: 'classic' }
    ]
  },
  {
    id: 2,
    name: 'Guess the Dialogue',
    frames: [
      { type: 'dialogue', dialogue: "Say hello to my little friend!", answer: "SCARFACE", year: "1983", tag: 'classic' },
      { type: 'dialogue', dialogue: "Some people just want to watch the world burn.", answer: "THE DARK KNIGHT", year: "2008", tag: 'classic' },
      { type: 'dialogue', dialogue: "I don't want to kill you. I don't want to hurt you. I don't want your life.", answer: "CAPTAIN AMERICA: THE WINTER SOLDIER", year: "2014", tag: 'classic' },
      { type: 'dialogue', dialogue: "I drink your milkshake!", answer: "THERE WILL BE BLOOD", year: "2007", tag: 'classic' },
      { type: 'dialogue', dialogue: "What we do in life echoes in eternity.", answer: "GLADIATOR", year: "2000", tag: 'classic' },
      { type: 'dialogue', dialogue: "The city is flying, we're fighting an army of robots, and I have a bow and arrow. None of this makes sense.", answer: "AVENGERS: AGE OF ULTRON", year: "2015", tag: 'classic' },
      { type: 'dialogue', dialogue: "Tareekh pe tareekh.", answer: "DAMINI", year: "1993", tag: 'classic' },
      { type: 'dialogue', dialogue: "Aap purush hi nahi, mahapurush hain.", answer: "ANDAZ APNA APNA", year: "1994", tag: 'classic' },
      { type: 'dialogue', dialogue: "Rishte mein toh hum tumhare baap lagte hain.", answer: "SHAHENSHAH", year: "1988", tag: 'classic' },
      { type: 'dialogue', dialogue: "Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho.", answer: "ZINDAGI NA MILEGI DOBARA", year: "2011", tag: 'classic' }
    ]
  },
  {
    id: 3,
    name: 'Guess the Eye',
    frames: [
      { type: 'eye', content: '/GUESSTHEEYES/Bhuvan Bam copy.webp', revealContent: '/GUESSTHEEYES/Bhuvan Bam.webp', answer: 'BHUVAN BAM', year: '', tag: 'new' },
      { type: 'eye', content: '/GUESSTHEEYES/Daisy Edgar-Jones copy.webp', revealContent: '/GUESSTHEEYES/Daisy Edgar-Jones.webp', answer: 'DAISY EDGAR-JONES', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Dakota Johnson copy.webp', revealContent: '/GUESSTHEEYES/Dakota Johnson.webp', answer: 'DAKOTA JOHNSON', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Dulquer Salmaan copy.webp', revealContent: '/GUESSTHEEYES/Dulquer Salmaan.webp', answer: 'DULQUER SALMAAN', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Elle Fanning copy.webp', revealContent: '/GUESSTHEEYES/Elle Fanning.webp', answer: 'ELLE FANNING', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/kiccha Sudeep copy.webp', revealContent: '/GUESSTHEEYES/kiccha Sudeep.webp', answer: 'KICCHA SUDEEP', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Kyle Chandler copy.webp', revealContent: '/GUESSTHEEYES/Kyle Chandler.webp', answer: 'KYLE CHANDLER', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Robert Pattinson copy.webp', revealContent: '/GUESSTHEEYES/Robert Pattinson.webp', answer: 'ROBERT PATTINSON', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Salma Hayek copy.webp', revealContent: '/GUESSTHEEYES/Salma Hayek.webp', answer: 'SALMA HAYEK', year: '', tag: 'classic' },
      { type: 'eye', content: '/GUESSTHEEYES/Sophie Turner copy.webp', revealContent: '/GUESSTHEEYES/Sophie Turner.webp', answer: 'SOPHIE TURNER', year: '', tag: 'new' }
    ]
  }
];

/* ══════════════════════════════════════════════════════════════════
   UNIFIED REALTIME GAME CLIENT (ANDROID MOBILE ENGINE - COLYSEUS)
   ══════════════════════════════════════════════════════════════════ */
const GameClient = {
  colyseusClient: null,
  colyseusRoom: null,
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
  hostSettings: {
    category: 'all',
    roundsByMode: { frames: 20, eyes: 10, dialogue: 10 },
    rounds: 40,
    timer: 30,
    weeklyOnly: true
  },
  currentPlaylist: [],
  currentPlayIndex: -1,
  currentClientFrame: null,
  currentRoundWinners: [],
  currentMaskedHint: '',
  currentFrame: null,
  hasGuessedThisRound: false,
  hasUsedHintThisRound: false,

  timerRemaining: 30,
  timerInterval: null,
  revealTimerInterval: null,
  pendingRejoinSession: null,

  init() {
    let savedId = localStorage.getItem('gtf_m_player_id');
    if (!savedId) {
      savedId = 'p_m_' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36).slice(-3);
      localStorage.setItem('gtf_m_player_id', savedId);
    }
    this.playerId = savedId;
    this.playerName = localStorage.getItem('gtf_m_name') || 'Cinephile';
    this.playerAvatar = localStorage.getItem('gtf_m_avatar') || 'aman';
    this.prewarmServer();

    if (typeof MediaCache !== 'undefined' && MediaCache.preloadCatalog) {
      MediaCache.preloadCatalog();
    }

    // Fast Host Migration on tab close / reload / navigate away
    const handleLeave = () => {
      if (this.colyseusRoom && this.isHost) {
        try {
          this.colyseusRoom.send("host_leaving");
          this.colyseusRoom.leave(true);
        } catch (e) {}
      }
    };
    window.addEventListener('beforeunload', handleLeave);
    window.addEventListener('pagehide', handleLeave);
  },

  getColyseusEndpoint() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('colyseus');
    if (param) return param;
    const saved = localStorage.getItem('gtf_colyseus_url');
    if (saved) return saved;

    // Check if running on mobile device or native container (Capacitor/Cordova/WebView)
    const isMobileDevice = window.Capacitor !== undefined ||
                           window.location.protocol === 'capacitor:' ||
                           window.location.protocol === 'file:' ||
                           /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (urlParams.has('local')) {
      return 'ws://localhost:2567';
    }

    return 'wss://guess-the-frame-colyseus.onrender.com';
  },

  getHttpEndpoint() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('colyseus_http');
    if (param) return param;
    const saved = localStorage.getItem('gtf_colyseus_http_url');
    if (saved) return saved;

    if (urlParams.has('local')) {
      return 'http://localhost:2567';
    }

    return 'https://guess-the-frame-colyseus.onrender.com';
  },

  async wakeServerIfNeeded(onProgress) {
    const httpEndpoint = this.getHttpEndpoint();
    const maxRetries = 4;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(`${httpEndpoint}/health`, { signal: controller.signal, cache: 'no-store' });
        clearTimeout(timeoutId);
        if (res.ok) return true;
      } catch (e) {
        if (onProgress) onProgress(i + 1, maxRetries);
        await new Promise(r => setTimeout(r, 1500));
      }
    }
    return false;
  },

  prewarmServer() {
    try {
      fetch(`${this.getHttpEndpoint()}/health`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
    } catch (e) {}
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

  cleanupTransport() {
    if (typeof UI !== 'undefined' && UI.hideNetworkStatus) {
      UI.hideNetworkStatus();
    }
    if (this.colyseusRoom) {
      try { this.colyseusRoom.leave(); } catch(e) {}
      this.colyseusRoom = null;
    }
    this.isConnected = false;
  },

  sendEvent(eventType, payload = {}) {
    if (!this.colyseusRoom) return;
    if (eventType === 'UPDATE_HOST_SETTINGS' || eventType === 'SETTINGS_UPDATE') {
      this.colyseusRoom.send('update_settings', payload.settings || payload);
    } else if (eventType === 'HOST_SKIP_BROADCAST') {
      this.colyseusRoom.send('skip_round');
    } else if (eventType === 'PLAYER_LEAVE') {
      this.leaveRoom();
    } else {
      this.colyseusRoom.send(eventType, payload);
    }
  },

  broadcastState(reason = 'UPDATE') {
    if (!this.isHost || !this.colyseusRoom) return;
    this.colyseusRoom.send('update_settings', {
      hostSettings: this.hostSettings,
      reason
    });
  },

  saveActiveSession() {
    try {
      if (!this.roomCode) return;
      const session = {
        roomCode: this.roomCode,
        playerId: this.playerId,
        playerName: this.playerName,
        playerAvatar: this.playerAvatar,
        isHost: !!this.isHost,
        isMatchActive: !!this.isMatchActive,
        hostSettings: this.hostSettings || null,
        timestamp: Date.now()
      };
      localStorage.setItem('gtf_active_session', JSON.stringify(session));
    } catch(e) {}
  },

  clearActiveSession() {
    try {
      localStorage.removeItem('gtf_active_session');
    } catch(e) {}
  },

  checkActiveSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');

    let savedSession = null;
    try {
      const raw = localStorage.getItem('gtf_active_session');
      if (raw) savedSession = JSON.parse(raw);
    } catch(e) {}

    const isRecent = savedSession && savedSession.roomCode && (Date.now() - (savedSession.timestamp || 0) < 15 * 60 * 1000);

    if (roomParam) {
      const upperCode = roomParam.trim().toUpperCase();
      if (isRecent && savedSession.roomCode === upperCode) {
        this.promptRejoinModal(savedSession);
        return;
      }
      this.joinGame(upperCode);
    } else if (isRecent) {
      this.promptRejoinModal(savedSession);
    } else if (savedSession) {
      this.clearActiveSession();
    }
  },

  promptRejoinModal(session) {
    this.pendingRejoinSession = session;
    if (typeof UI !== 'undefined' && UI.promptRejoinModal) {
      UI.promptRejoinModal(session);
    }
  },

  confirmRejoinRoom() {
    const session = this.pendingRejoinSession;
    if (!session || !session.roomCode) return;
    if (typeof UI !== 'undefined' && UI.closeRejoinModal) {
      UI.closeRejoinModal();
    }
    this.joinGame(session.roomCode);
  },

  dismissRejoinAndStartNew() {
    this.clearActiveSession();
    this.pendingRejoinSession = null;
    if (typeof UI !== 'undefined' && UI.closeRejoinModal) {
      UI.closeRejoinModal();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    if (roomParam) {
      this.joinGame(roomParam.trim().toUpperCase());
    }
  },

  async createRoomFromWizard(wizardConfig) {
    const { mode, sections, rounds, totalRounds, playerName, avatar } = wizardConfig;
    this.playerName = playerName || 'Player';
    this.playerAvatar = (avatar && avatar.dataUri) || (typeof avatar === 'string' ? avatar : (avatar && avatar.url ? avatar.url : 'aman'));
    
    const modeCapitalized = mode === 'director' ? "Director's Cut" : (mode.charAt(0).toUpperCase() + mode.slice(1));
    const counts = {
      frames: (sections.includes('frame') ? (rounds.frame || 5) : 0),
      eyes: (sections.includes('eyes') ? (rounds.eyes || 5) : 0),
      dialogue: (sections.includes('dialogue') ? (rounds.dialogue || 5) : 0)
    };
    const totalR = totalRounds || (Object.values(counts).reduce((a, b) => a + b, 0)) || 15;

    localStorage.setItem('gtf_player_name', this.playerName);
    localStorage.setItem('gtf_player_avatar', this.playerAvatar);

    return this.hostGame({
      mode: modeCapitalized,
      category: sections.length >= 3 ? 'all' : (sections.length === 1 ? sections[0] : 'mixed'),
      categories: sections.map(s => s === 'frame' ? 'frames' : s),
      roundsByMode: counts,
      rounds: totalR,
      timer: 30,
      weeklyOnly: true
    });
  },

  async hostGame(options = {}) {
    this.init();
    this.cleanupTransport();
    this.isHost = true;
    this.roomCode = this.generateRoomCode();
    this.roomId = 'room_' + this.roomCode;
    this.hasJoinedAck = false;
    this.isJoining = false;

    const rawCounts = (options.roundsByMode && typeof options.roundsByMode === 'object')
      ? { ...options.roundsByMode }
      : { frames: 20, eyes: 10, dialogue: 10 };
    const counts = {
      frames: Math.min(30, Math.max(0, Number(rawCounts.frames !== undefined ? rawCounts.frames : 20))),
      dialogue: Math.min(30, Math.max(0, Number(rawCounts.dialogue !== undefined ? rawCounts.dialogue : 10))),
      eyes: Math.min(30, Math.max(0, Number(rawCounts.eyes !== undefined ? rawCounts.eyes : 10)))
    };
    const totalR = Object.values(counts).reduce((a, b) => a + b, 0) || 40;

    this.hostSettings = {
      mode: options.mode || 'Popcorn',
      category: options.category || 'all',
      roundsByMode: counts,
      rounds: totalR,
      timer: options.timer || 30,
      weeklyOnly: options.weeklyOnly !== undefined ? options.weeklyOnly : true,
      isLocked: true
    };

    if (typeof UI !== 'undefined' && UI.hostSettings) {
      UI.hostSettings.mode = this.hostSettings.mode;
      UI.hostSettings.roundsByMode = { ...this.hostSettings.roundsByMode };
      UI.hostSettings.timer = this.hostSettings.timer;
      UI.hostSettings.rounds = totalR;
    }

    if (typeof UI !== 'undefined' && UI.showLoading) {
      UI.showLoading('Connecting to server...');
    }

    try {
      await this.wakeServerIfNeeded((attempt, max) => {
        if (typeof UI !== 'undefined' && UI.showLoading) {
          UI.showLoading(`Starting cloud server (${attempt}/${max})...`);
        }
      });

      const endpoint = this.getColyseusEndpoint();
      console.log('[Colyseus] Creating room on', endpoint);
      const client = new Colyseus.Client(endpoint);
      this.colyseusClient = client;

      const activeSections = options.sections || (options.categories ? options.categories : ['frames']);
      const room = await client.create('trivia_room', {
        roomCode: this.roomCode,
        name: this.playerName,
        avatar: this.playerAvatar,
        userId: this.playerId,
        mode: this.hostSettings.mode || options.mode || 'Popcorn',
        sections: activeSections,
        timer: this.hostSettings.timer || 30,
        rounds: totalR,
        category: this.hostSettings.category || 'all',
        roundsByMode: counts,
        weeklyOnly: this.hostSettings.weeklyOnly !== undefined ? this.hostSettings.weeklyOnly : true
      });

      this.colyseusRoom = room;
      this.playerId = room.sessionId;
      this.isHost = true;
      this.hasJoinedAck = true;
      this.isConnected = true;

      this.players = [{
        id: room.sessionId,
        name: this.playerName,
        avatar: this.playerAvatar,
        score: 0,
        isHost: true,
        loaded: false,
        isReady: false,
        assetProgress: 0,
        assetStatus: 'downloading'
      }];

      this.bindColyseusGame(room);
      this.saveActiveSession();

      if (typeof CreateRoomWizard !== 'undefined' && CreateRoomWizard.close) {
        CreateRoomWizard.close();
      }

      if (typeof UI !== 'undefined') {
        if (UI.hideLoading) UI.hideLoading();
        UI.setRoomCode(this.roomCode);
        UI.setHostControlsVisible(true);
        UI.renderLobbyPlayers();
        UI.renderScoreboard();
        UI.showScreen('lobbyScreen');
        const crownIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.crown : '';
        UI.showToast(`${crownIcon} Room ${this.roomCode} created! Share the code with friends.`);
      }

      this.startAssetPreloading();
    } catch(err) {
      console.error('[Colyseus] Failed to create room:', err);
      if (typeof UI !== 'undefined') {
        if (UI.hideLoading) UI.hideLoading();
        UI.showToast('Could not connect to multiplayer server: ' + (err.message || 'Server offline. Please try again.'));
      }
      throw err;
    }
  },

  async joinGame(roomCode) {
    this.init();
    const cleanCode = String(roomCode || '').toUpperCase().trim().replace(/[^A-Z0-9]/g, '');
    if (!cleanCode || cleanCode.length < 3) {
      if (typeof UI !== 'undefined') UI.showToast('Please enter a valid room code!');
      return;
    }

    this.cleanupTransport();
    this.isHost = false;
    this.roomCode = cleanCode;
    this.roomId = 'room_' + this.roomCode;
    this.hasJoinedAck = false;
    this.isJoining = true;

    if (typeof UI !== 'undefined' && UI.showLoading) {
      UI.showLoading(`Connecting to Room ${cleanCode}...`);
    }

    try {
      const httpEndpoint = this.getHttpEndpoint();
      const wsEndpoint = this.getColyseusEndpoint();

      // 1. Wake server & resolve room metadata via fast HTTP API
      let resolvedRoomId = null;
      try {
        await this.wakeServerIfNeeded((attempt, max) => {
          if (typeof UI !== 'undefined' && UI.showLoading) {
            UI.showLoading(`Waking up server (${attempt}/${max})...`);
          }
        });

        const roomRes = await fetch(`${httpEndpoint}/api/room/${cleanCode}`);
        if (roomRes.ok) {
          const roomData = await roomRes.json();
          if (roomData && roomData.exists && roomData.roomId) {
            resolvedRoomId = roomData.roomId;
          }
        } else if (roomRes.status === 404) {
          throw new Error(`Lobby "${cleanCode}" not found. Verify room code with host!`);
        }
      } catch (err) {
        if (err.message && err.message.includes('not found')) {
          throw err;
        }
        console.warn('[Colyseus] Room API lookup fallback:', err);
      }

      if (typeof UI !== 'undefined' && UI.showLoading) {
        UI.showLoading(`Entering Room ${cleanCode}...`);
      }

      console.log('[Colyseus] Joining room', cleanCode, 'resolvedId:', resolvedRoomId, 'on', wsEndpoint);
      const client = new Colyseus.Client(wsEndpoint);
      this.colyseusClient = client;

      // 2. Direct joinById if resolved, otherwise fallback to join with roomCode option
      let room;
      if (resolvedRoomId) {
        room = await client.joinById(resolvedRoomId, {
          roomCode: this.roomCode,
          name: this.playerName,
          avatar: this.playerAvatar
        });
      } else {
        room = await client.join('trivia_room', {
          roomCode: this.roomCode,
          name: this.playerName,
          avatar: this.playerAvatar
        });
      }

      this.colyseusRoom = room;
      this.playerId = room.sessionId;
      this.isHost = false;
      this.hasJoinedAck = true;
      this.isJoining = false;
      this.isConnected = true;

      this.players = [{
        id: room.sessionId,
        name: this.playerName,
        avatar: this.playerAvatar,
        score: 0,
        isHost: false,
        loaded: false,
        isReady: false,
        assetProgress: 0,
        assetStatus: 'downloading'
      }];

      this.bindColyseusGame(room);
      this.saveActiveSession();

      if (typeof UI !== 'undefined') {
        if (UI.hideLoading) UI.hideLoading();
        UI.setRoomCode(this.roomCode);
        UI.setHostControlsVisible(false);
        UI.renderLobbyPlayers();
        UI.renderScoreboard();
        UI.showScreen('lobbyScreen');
        const rocketIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.rocket : '';
        UI.showToast(`${rocketIcon} Connected to room ${this.roomCode}!`);
      }

      this.startAssetPreloading();
    } catch(err) {
      console.error('[Colyseus] Failed to join room:', err);
      this.isJoining = false;
      if (typeof UI !== 'undefined') {
        if (UI.hideLoading) UI.hideLoading();
        const notFound = err.message && (err.message.includes('no rooms') || err.message.includes('not found') || err.message.includes('closed'));
        const warnIcon = typeof SvgIcons !== 'undefined' ? SvgIcons.alert : '';
        UI.showToast(notFound ? `${warnIcon} Lobby "${cleanCode}" not found. Verify room code!` : `${warnIcon} Could not join: ${err.message || 'Server unreachable'}`);
      }
    }
  },

  startAssetPreloading() {
    const getMe = () => (this.players || []).find(p => p.id === this.playerId);
    let me = getMe();
    if (me) {
      me.assetProgress = 0;
      me.assetStatus = 'downloading';
      me.isReady = false;
      me.loaded = false;
    }
    if (typeof UI !== 'undefined') {
      if (UI.renderLobbyPlayers) UI.renderLobbyPlayers();
      if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
    }

    const reportProgress = (pct, status) => {
      const currentMe = getMe();
      if (currentMe && currentMe.isReady && currentMe.assetProgress >= 100) {
        return;
      }
      const validPct = Math.max(0, Math.min(100, Math.round(pct)));
      const isComplete = validPct >= 100;
      if (currentMe) {
        if (validPct < (currentMe.assetProgress || 0)) return;
        currentMe.assetProgress = validPct;
        currentMe.assetStatus = status || (isComplete ? 'ready' : (validPct >= 90 ? 'verifying' : 'downloading'));
        currentMe.isReady = isComplete;
        currentMe.loaded = isComplete;
      }
      if (this.colyseusRoom) {
        try {
          this.colyseusRoom.send('asset_progress', { progress: validPct, status: currentMe ? currentMe.assetStatus : status });
          if (isComplete) {
            this.colyseusRoom.send('player_ready', { isReady: true });
          }
        } catch (e) {
          console.warn('[Colyseus] Failed to send asset progress:', e);
        }
      }
      if (typeof UI !== 'undefined') {
        if (UI.renderLobbyPlayers) UI.renderLobbyPlayers();
        if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
      }
    };

    // Gather assets to preload in background
    const items = [];
    if (typeof GAME_SECTIONS !== 'undefined' && Array.isArray(GAME_SECTIONS)) {
      GAME_SECTIONS.forEach(sec => {
        if (Array.isArray(sec.frames)) {
          sec.frames.forEach(f => {
            if (f.content) items.push({ content: f.content, type: f.type || 'image', revealContent: f.revealContent });
            if (f.revealContent && !items.some(it => it.content === f.revealContent)) {
              items.push({ content: f.revealContent, type: 'image' });
            }
          });
        }
      });
    }

    // Failsafe timer: guarantee full readiness within 1.8s max so host is never stuck
    const failsafe = setTimeout(() => {
      reportProgress(100, 'ready');
    }, 1800);

    if (typeof AssetPreloader !== 'undefined' && AssetPreloader.preloadRoomAssets) {
      AssetPreloader.preloadRoomAssets(items, (pct, status) => {
        if (pct >= 100) clearTimeout(failsafe);
        reportProgress(pct, status);
      });
    } else {
      let step = 20;
      const interval = setInterval(() => {
        step += 25;
        if (step >= 100) {
          clearInterval(interval);
          clearTimeout(failsafe);
          reportProgress(100, 'ready');
        } else {
          reportProgress(step, step >= 85 ? 'verifying' : 'downloading');
        }
      }, 160);
    }
  },

  startGame(options = {}) {
    if (!this.isHost || !this.colyseusRoom) return;

    // Ensure host is always ready
    const me = (this.players || []).find(p => p.id === this.playerId);
    if (me && !me.isReady) {
      me.isReady = true;
      me.loaded = true;
      try { this.colyseusRoom.send('player_ready', { isReady: true }); } catch (e) {}
    }

    const otherUnready = (this.players || []).filter(p => p.id !== this.playerId && !p.isReady && !p.loaded);
    if (otherUnready.length > 0) {
      if (typeof UI !== 'undefined') {
        if (UI.showToast) UI.showToast("Waiting for other players to finish loading assets");
        if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
      }
      return;
    }

    const rawCounts = options.roundsByMode || this.hostSettings.roundsByMode || { frames: 5, eyes: 5, dialogue: 5 };
    const counts = {
      frames: Math.min(30, Math.max(0, Number(rawCounts.frames !== undefined ? rawCounts.frames : 5))),
      dialogue: Math.min(30, Math.max(0, Number(rawCounts.dialogue !== undefined ? rawCounts.dialogue : 5))),
      eyes: Math.min(30, Math.max(0, Number(rawCounts.eyes !== undefined ? rawCounts.eyes : 5)))
    };
    const cat = options.category || this.hostSettings.category || 'all';
    const totalRounds = options.rounds || Object.values(counts).reduce((a, b) => a + b, 0) || 15;
    const timer = Number(options.timer) || this.hostSettings.timer || 30;
    const weeklyOnly = options.weeklyOnly !== undefined ? Boolean(options.weeklyOnly) : (this.hostSettings && this.hostSettings.weeklyOnly !== undefined ? Boolean(this.hostSettings.weeklyOnly) : true);

    this.hostSettings = { ...this.hostSettings, category: cat, rounds: totalRounds, timer, roundsByMode: counts, weeklyOnly };

    this.colyseusRoom.send('start_game', {
      category: cat,
      rounds: totalRounds,
      timer,
      roundsByMode: counts,
      weeklyOnly
    });
  },

  setupRoundUI(frame, timerDuration, roundIndex, totalRounds) {
    totalRounds = totalRounds || 20;

    let revealContent = frame.revealContent || '';
    if (!revealContent && frame.type === 'eye' && frame.content) {
      const eyeSec = typeof GAME_SECTIONS !== 'undefined' && GAME_SECTIONS.find(s => s.id === 3 || s.name === 'Guess the Eye');
      if (eyeSec) {
        const match = eyeSec.frames.find(f => f.content === frame.content || (frame.answer && f.answer === frame.answer));
        if (match && match.revealContent) {
          revealContent = match.revealContent;
        }
      }
    }

    const content = frame.type === 'dialogue' ? frame.dialogue : frame.content;

    // Immediately preload and warm current frame image and reveal image in GPU VRAM
    if (typeof MediaCache !== 'undefined') {
      if (content && frame.type !== 'dialogue') MediaCache.preload(content);
      if (revealContent) MediaCache.preload(revealContent);
    }

    UI.setupRoundMedia({
      type: frame.type,
      content: content,
      revealContent: revealContent,
      year: frame.year || '',
      round: roundIndex + 1,
      totalRounds
    });

    if (typeof Haptics !== 'undefined') Haptics.roundStart();
    UI.showScreen('gameScreen');
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  stopRevealTimer() {
    if (this.revealTimerInterval) {
      clearInterval(this.revealTimerInterval);
      this.revealTimerInterval = null;
    }
  },

  submitGuess(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    if (this.hasGuessedThisRound || this.isRoundFinished) {
      this.sendChat(clean);
      return;
    }

    if (clean.startsWith('/chat ') || clean.startsWith('/c ')) {
      const chatMsg = clean.replace(/^\/(chat|c)\s+/, '');
      if (chatMsg) {
        this.sendChat(chatMsg);
        return;
      }
    }

    if (this.colyseusRoom) {
      this.colyseusRoom.send("submit_guess", { text: clean });
    }
  },

  requestHint() {
    if (this.hasUsedHintThisRound || this.hasGuessedThisRound) return;
    this.hasUsedHintThisRound = true;

    if (this.colyseusRoom) {
      this.colyseusRoom.send("request_hint");
      if (typeof Haptics !== 'undefined') Haptics.hint();
      if (typeof SoundEffects !== 'undefined') SoundEffects.playHint();
    }
  },

  skipRound() {
    if (!this.isHost) return;
    if (this.colyseusRoom) {
      this.colyseusRoom.send("skip_round");
    }
  },

  nextRound() {
    this.stopRevealTimer();
    if (!this.isHost) return;
    if (this.colyseusRoom) {
      this.colyseusRoom.send("next_round");
    } else {
      if (this.currentPlaylist && this.currentPlayIndex + 1 < this.currentPlaylist.length) {
        this.setupRoundUI(this.currentPlaylist[this.currentPlayIndex + 1], 30, this.currentPlayIndex + 1, this.currentPlaylist.length);
      } else {
        this.finishGame();
      }
    }
  },

  endMatch() {
    if (!this.isHost) return;
    if (this.colyseusRoom) {
      try {
        this.colyseusRoom.send("host_end_game");
      } catch (err) {
        console.warn("[GameClient] host_end_game error:", err);
      }
    }
    this.finishGame();
  },

  finishGame() {
    this.stopTimer();
    this.stopRevealTimer();
    if (typeof UI !== 'undefined' && UI.dismissRoundIntro) UI.dismissRoundIntro();
    this.isMatchActive = false;
    this.isRoundFinished = true;
    this.clearActiveSession();

    if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
    if (typeof UI !== 'undefined') {
      UI.showScreen('gameOverScreen');
      UI.renderPodium();
    }
  },

  sendChat(text) {
    const clean = String(text || '').trim();
    if (!clean) return;

    if (this.colyseusRoom) {
      this.colyseusRoom.send("send_chat", { text: clean });
    }
  },

  bindColyseusGame(room) {
    this.colyseusRoom = room;

    room.onMessage("player_asset_update", (data) => {
      if (!data) return;
      const target = (this.players || []).find(p => p.id === data.playerId);
      if (target) {
        target.assetProgress = data.progress !== undefined ? data.progress : target.assetProgress;
        target.assetStatus = data.status || target.assetStatus;
        target.isReady = !!data.isReady;
        target.loaded = !!data.isReady;
        if (typeof UI !== 'undefined') {
          if (UI.renderLobbyPlayers) UI.renderLobbyPlayers();
          if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
        }
      }
    });

    room.onMessage("player_ready", (data) => {
      if (!data) return;
      const target = (this.players || []).find(p => p.id === (data.playerId || this.playerId));
      if (target) {
        target.isReady = true;
        target.loaded = true;
        target.assetProgress = 100;
        target.assetStatus = 'ready';
        if (typeof UI !== 'undefined') {
          if (UI.renderLobbyPlayers) UI.renderLobbyPlayers();
          if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
        }
      }
    });

    room.onMessage("start_error", (data) => {
      if (data) {
        const msg = data.message || "Waiting for players to finish loading assets";
        if (typeof UI !== 'undefined' && UI.showToast) {
          UI.showToast(msg);
          if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
        } else {
          alert(msg);
        }
      }
    });

    room.onMessage("guess_result", (res) => {
      if (res && res.isCorrect) {
        this.hasGuessedThisRound = true;
        if (typeof Haptics !== 'undefined') Haptics.correct();
        if (typeof SoundEffects !== 'undefined') SoundEffects.playSuccess();
        const me = this.players.find(p => p.id === this.playerId);
        if (me) me.score = (me.score || 0) + (res.points || 0);
        if (typeof UI !== 'undefined') {
          const streakBonus = res.streak && res.streak > 1 ? ` 🔥 ${res.streak}x STREAK!` : '';
          if (UI.showGuessSuccess) UI.showGuessSuccess(res.position, res.points, streakBonus);
          else if (UI.showToast) UI.showToast(`🎉 Correct! +${res.points} pts!${streakBonus}`);
          if (UI.renderScoreboard) UI.renderScoreboard();
        }
      } else {
        if (typeof Haptics !== 'undefined') Haptics.wrong();
        if (typeof SoundEffects !== 'undefined') SoundEffects.playWrong();
        if (typeof UI !== 'undefined' && UI.shakeGuessInput) UI.shakeGuessInput();
      }
    });

    room.onMessage("hint_response", (res) => {
      if (res && res.maskedHint) {
        this.currentMaskedHint = res.maskedHint;
        if (typeof UI !== 'undefined' && UI.displayHintBanner) {
          UI.displayHintBanner(res.maskedHint, res.pointsDeducted || 2);
        }
      }
    });

    room.onMessage("chat_warning", (res) => {
      if (res && res.message && typeof UI !== 'undefined' && UI.showToast) {
        UI.showToast(res.message);
      }
    });

    room.onMessage("settings_updated", (data) => {
      if (data && data.hostSettings) {
        this.hostSettings = Object.assign(this.hostSettings || {}, data.hostSettings);
        if (typeof UI !== 'undefined') {
          if (UI.hostSettings && data.hostSettings.roundsByMode) {
            UI.hostSettings.roundsByMode = { ...data.hostSettings.roundsByMode };
          }
          if (UI.hostSettings && data.hostSettings.timer) {
            UI.hostSettings.timer = data.hostSettings.timer;
          }
          if (UI.renderLobbyControls) UI.renderLobbyControls();
          const weeklyToggle = document.getElementById('toggleWeeklyDropsMobile');
          if (weeklyToggle && data.hostSettings.weeklyOnly !== undefined) {
            weeklyToggle.checked = Boolean(data.hostSettings.weeklyOnly);
          }
        }
      }
    });

    room.onMessage("kicked", (data) => {
      alert(data?.message || 'You were removed from the room by the host.');
      this.leaveRoom();
    });

    room.onMessage("return_to_lobby", () => {
      this.isMatchActive = false;
      this.isRoundFinished = false;
      if (typeof UI !== 'undefined') {
        UI.showScreen('lobbyScreen');
        UI.renderLobbyPlayers();
      }
    });

    room.onMessage("host_migrated", (data) => {
      console.log('[Colyseus] Host migrated to:', data);
      const wasHost = this.isHost;
      this.isHost = Boolean(data && data.hostId === this.playerId);
      if (typeof UI !== 'undefined') {
        if (UI.setHostControlsVisible) {
          UI.setHostControlsVisible(this.isHost);
        }
        if (UI.renderLobbyPlayers) {
          UI.renderLobbyPlayers();
        }
        if (UI.renderLobbyControls) {
          UI.renderLobbyControls();
        }
        if (this.isHost && !wasHost && UI.showNotification) {
          UI.showNotification('👑 You are now the Host!', 'success');
        }
      }
      this.saveActiveSession();
    });

    if (room.state && room.state.currentRoundWinners) {
      room.state.currentRoundWinners.onAdd((winner) => {
        if (winner && typeof UI !== 'undefined' && UI.appendChatMessage) {
          UI.appendChatMessage({
            isWinner: true,
            senderId: winner.playerId,
            senderName: winner.playerName,
            senderAvatar: winner.avatar,
            position: winner.position,
            points: winner.points,
            streak: winner.streak
          });
          const dot = document.getElementById('chatUnreadDot');
          const drawer = document.getElementById('chatDrawer');
          if (dot && (!drawer || !drawer.classList.contains('open'))) {
            dot.style.display = 'block';
          }
        }
      });
    }

    if (room.state && room.state.chatMessages) {
      room.state.chatMessages.onAdd((chat) => {
        if (chat && typeof UI !== 'undefined' && UI.appendChatMessage) {
          // Suppress raw server system message if it's a guess/winner notification (handled by currentRoundWinners)
          if (chat.isSystem && typeof chat.text === 'string' && (
            chat.text.includes('guessed correctly') || 
            chat.text.includes('guessed the answer') ||
            (chat.text.includes('pts') && (chat.text.includes('🥇') || chat.text.includes('🥈') || chat.text.includes('🥉')))
          )) {
            return;
          }
          UI.appendChatMessage({
            id: chat.id,
            senderId: chat.senderId,
            senderName: chat.senderName,
            senderAvatar: chat.senderAvatar || chat.avatar || 'aman',
            text: chat.text,
            timestamp: chat.timestamp,
            isSystem: chat.isSystem
          });
          const dot = document.getElementById('chatUnreadDot');
          const drawer = document.getElementById('chatDrawer');
          if (dot && (!drawer || !drawer.classList.contains('open'))) {
            dot.style.display = 'block';
          }
        }
      });
    }

    room.onStateChange((state) => {
      if (!state) return;

      // 1. Sync players and scores
      if (state.players) {
        const currentIds = new Set();
        state.players.forEach((p, sessionId) => {
          currentIds.add(sessionId);
          let localP = this.players.find(lp => lp.id === sessionId);
          if (!localP) {
            localP = {
              id: sessionId,
              name: p.name,
              avatar: p.avatar,
              score: p.score,
              isHost: p.isHost,
              loaded: p.isReady || false,
              isReady: p.isReady || false,
              assetProgress: p.assetProgress || 0,
              assetStatus: p.assetStatus || 'downloading'
            };
            this.players.push(localP);
          } else {
            localP.name = p.name;
            localP.avatar = p.avatar;
            localP.score = p.score;
            localP.isHost = p.isHost;
            if (p.isReady !== undefined) {
              localP.isReady = p.isReady;
              localP.loaded = p.isReady;
            }
            if (p.assetProgress !== undefined) {
              localP.assetProgress = p.assetProgress;
            }
            if (p.assetStatus) {
              localP.assetStatus = p.assetStatus;
            }
          }
          if (sessionId === this.playerId) {
            const hostChanged = (this.isHost !== p.isHost);
            this.isHost = p.isHost;
            if (typeof UI !== 'undefined') {
              if (UI.setHostControlsVisible) UI.setHostControlsVisible(this.isHost);
              if (hostChanged && this.isHost && UI.showNotification) {
                UI.showNotification('👑 You are now the Host!', 'success');
              }
            }
          }
        });
        this.players = this.players.filter(lp => currentIds.has(lp.id));
        if (typeof UI !== 'undefined') {
          if (UI.renderLobbyPlayers) UI.renderLobbyPlayers();
          if (UI.renderScoreboard) UI.renderScoreboard();
          if (UI.updateLobbyStartBtn) UI.updateLobbyStartBtn();
        }
      }

      // 2. Phase transitions
      if (state.phase === "lobby") {
        if (this.isMatchActive) {
          this.isMatchActive = false;
          this.isRoundFinished = false;
          if (typeof UI !== 'undefined') {
            UI.showScreen('lobbyScreen');
            UI.renderLobbyPlayers();
          }
        }
      } else if (state.phase === "countdown") {
        if (typeof UI !== 'undefined' && UI.showCountdownOverlay) {
          UI.showCountdownOverlay();
        }
        if (typeof SoundEffects !== 'undefined') SoundEffects.playTick();
      } else if (state.phase === "playing") {
        const roundNum = state.currentRound || 1;
        const roundIndex = roundNum - 1;
        const needsNewRound = (
          roundIndex !== this.currentPlayIndex ||
          !this.isMatchActive ||
          this.isRoundFinished ||
          !this.currentClientFrame ||
          this.currentClientFrame.content !== (state.currentMediaContent || '') ||
          this.currentClientFrame.roundNum !== roundNum
        );
        if (needsNewRound && state.currentMediaContent) {
          this.isMatchActive = true;
          this.isRoundFinished = false;
          this.currentPlayIndex = roundIndex;
          this.hasGuessedThisRound = false;
          this.hasUsedHintThisRound = false;
          this.currentRoundWinners = [];

          let revealContent = '';
          if (state.currentMediaType === 'eye' && state.currentMediaContent) {
            const eyeSec = typeof GAME_SECTIONS !== 'undefined' && GAME_SECTIONS.find(s => s.id === 3 || s.name === 'Guess the Eye');
            if (eyeSec) {
              const match = eyeSec.frames.find(f => f.content === state.currentMediaContent || (state.revealedAnswer && f.answer === state.revealedAnswer));
              if (match && match.revealContent) {
                revealContent = match.revealContent;
              }
            }
          }

          const clientFrame = {
            type: state.currentMediaType || 'image',
            content: state.currentMediaContent || '',
            year: state.currentYear || '',
            dialogue: state.currentMediaType === 'dialogue' ? state.currentMediaContent : '',
            revealContent: revealContent,
            sectionName: state.currentMediaType === 'dialogue' ? 'Guess the Dialogue' : (state.currentMediaType === 'eye' ? 'Guess the Eye' : 'Guess the Frame'),
            roundNum: roundNum
          };
          this.currentClientFrame = clientFrame;

          this.setupRoundUI(clientFrame, state.timeRemaining || 30, roundIndex, state.totalRounds || 20);
        }

        if (typeof UI !== 'undefined' && UI.updateTimer) {
          UI.updateTimer(state.timeRemaining);
        }
      } else if (state.phase === "round_reveal") {
        if (!this.isRoundFinished) {
          this.isRoundFinished = true;
          const winners = [];
          if (state.currentRoundWinners) {
            state.currentRoundWinners.forEach(w => winners.push({
              playerId: w.playerId,
              playerName: w.playerName,
              position: w.position,
              points: w.points
            }));
          }
          this.currentRoundWinners = winners;
          if (typeof SoundEffects !== 'undefined') SoundEffects.playReveal();
          if (typeof Haptics !== 'undefined') Haptics.correct();
          if (typeof UI !== 'undefined') {
            UI.showScreen('revealScreen');
            UI.renderRoundReveal({
              answer: state.revealedAnswer,
              year: state.currentYear,
              type: state.currentMediaType || 'image',
              content: state.currentMediaType === 'dialogue' ? state.currentMediaContent : state.currentMediaContent,
              revealedContent: state.revealedContent || state.currentMediaContent,
              winners: this.currentRoundWinners
            });
          }
          this.saveActiveSession();
        }
      } else if (state.phase === "game_over") {
        if (this.isMatchActive) {
          this.finishGame();
        }
      }
    });

    room.onMessage("pong", (data) => {
      // Heartbeat acknowledged by server
    });

    if (room.reconnectionToken) {
      sessionStorage.setItem('gtf_m_reconnection_token', room.reconnectionToken);
    }

    if (this._heartbeatInterval) clearInterval(this._heartbeatInterval);
    this._heartbeatInterval = setInterval(() => {
      if (this.colyseusRoom && this.colyseusRoom.connection && this.colyseusRoom.connection.isOpen) {
        this.colyseusRoom.send("ping");
      }
    }, 15000);

    room.onError((code, message) => {
      console.warn(`[Colyseus] Room error (${code}): ${message}`);
    });

    room.onLeave(async (code) => {
      console.log(`[Colyseus] Disconnected from room with code ${code}`);
      if (this._heartbeatInterval) {
        clearInterval(this._heartbeatInterval);
        this._heartbeatInterval = null;
      }

      // If unexpected disconnect (e.g. mobile 4G handover or screen lock), attempt reconnect
      const token = sessionStorage.getItem('gtf_m_reconnection_token');
      if (code !== 1000 && token && !this._isReconnecting) {
        this._isReconnecting = true;
        if (typeof UI !== 'undefined' && UI.showToast) {
          UI.showToast('⚠️ Connection interrupted. Reconnecting...');
        }
        try {
          const endpoint = this.getColyseusEndpoint();
          const client = new Colyseus.Client(endpoint);
          const reconnectedRoom = await client.reconnect(token);
          this._isReconnecting = false;
          this.colyseusRoom = reconnectedRoom;
          this.playerId = reconnectedRoom.sessionId;
          this.bindColyseusGame(reconnectedRoom);
          if (typeof UI !== 'undefined' && UI.showToast) {
            UI.showToast('✅ Restored connection to game!');
          }
          return;
        } catch (e) {
          console.warn('[Colyseus] Automatic reconnection failed:', e);
          this._isReconnecting = false;
        }
      }

      this.colyseusRoom = null;
    });
  },

  leaveRoom() {
    sessionStorage.removeItem('gtf_m_reconnection_token');
    if (this._heartbeatInterval) {
      clearInterval(this._heartbeatInterval);
      this._heartbeatInterval = null;
    }
    this.clearActiveSession();
    if (typeof UI !== 'undefined' && UI.dismissRoundIntro) UI.dismissRoundIntro();
    this.stopTimer();
    this.stopRevealTimer();
    this.cleanupTransport();

    this.roomCode = '';
    this.roomId = '';
    this.isHost = false;
    this.isMatchActive = false;
    this.isRoundFinished = false;
    this.players = [];

    if (typeof UI !== 'undefined') {
      UI.showScreen('homeScreen');
    }
  }
};

window.GameClient = GameClient;
window.NetworkSecurity = NetworkSecurity;
window.FuzzyMatcher = FuzzyMatcher;
