export class FuzzyMatcher {
  public static readonly STOP_WORDS: Set<string> = new Set([
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
    'ka', 'ki', 'ke', 'ko', 'se', 'me', 'mein', 'par', 'aur', 'ya', 'ek', 'do', 'hai', 'hain', 'tha', 'thi', 'the', 'ye', 'yeh', 'woh', 'hum', 'tum', 'aap', 'wala', 'wali', 'wale',
    // Standalone numbers & numerals
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'i', 'ii', 'iii', 'iv', 'v'
  ]);

  public static normalize(text: string): string {
    if (!text) return '';
    let t = String(text).toLowerCase();
    // Normalize unicode diacritics / accents (e.g. Amélie -> Amelie)
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Remove year patterns like (1968) or 1968
    t = t.replace(/\(\d{4}\)|\b\d{4}\b/g, '');
    // Replace '&' with 'and'
    t = t.replace(/&/g, ' and ');
    // Remove all punctuation except alphanumeric and whitespace
    t = t.replace(/[^\w\s]/g, ' ');
    // Strip leading common articles
    t = t.replace(/^(the|a|an|el|la|le|les)\s+/i, '').trim();
    // Collapse multiple spaces
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  public static levenshtein(s1: string, s2: string): number {
    if (s1.length < s2.length) return this.levenshtein(s2, s1);
    if (s2.length === 0) return s1.length;
    let prev: number[] = [];
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
  }

  public static canonicalWord(w: string): string {
    if (!w) return '';
    if (w.length >= 4 && w.endsWith('s') && !w.endsWith('ss')) {
      return w.slice(0, -1);
    }
    return w;
  }

  /**
   * Lenient word matcher with adaptive typo tolerance based on word length.
   * - Length 3: exact or canonical match only (prevents false positives on tiny words)
   * - Length 4-5: allows distance <= 1 (e.g. "feil" for "fail", "falll" for "fall")
   * - Length 6-8: allows distance <= 2 (e.g. "rockstr" for "rockstar", "byomkes" for "byomkesh")
   * - Length 9+: allows distance <= 3 (e.g. "bramyugam" for "bramayugam", "ghanchakar" for "ghanchakkar")
   */
  public static isWordMatch(w1: string, w2: string): boolean {
    if (!w1 || !w2) return false;
    if (w1 === w2) return true;
    const c1 = this.canonicalWord(w1);
    const c2 = this.canonicalWord(w2);
    if (c1 === c2) return true;

    const minLen = Math.min(c1.length, c2.length);
    const maxLen = Math.max(c1.length, c2.length);
    const lenDiff = Math.abs(c1.length - c2.length);

    if (minLen < 4) return false;

    if (maxLen <= 5) {
      if (lenDiff > 1) return false;
      return this.levenshtein(c1, c2) <= 1;
    }

    if (maxLen <= 8) {
      if (lenDiff > 2) return false;
      return this.levenshtein(c1, c2) <= 2;
    }

    if (lenDiff > 3) return false;
    return this.levenshtein(c1, c2) <= 3;
  }

  public static getSignificantWords(normalizedStr: string): string[] {
    if (!normalizedStr) return [];
    return normalizedStr.split(' ')
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
  }

  /**
   * Ultra-lenient matching:
   * 1. Exact / compact / subtitle / whole-title match
   * 2. Any single significant word from the answer (even with typos) matches!
   * 3. Common words, stop words, and standalone digits are barred from winning alone.
   */
  public static isMatch(guess: string, answer: string): boolean {
    if (!guess || !answer) return false;
    const nGuess = this.normalize(guess);
    const nAns = this.normalize(answer);
    if (!nGuess || !nAns) return false;

    // 1. Exact normalized match
    if (nGuess === nAns) return true;

    // Direct compact comparison without spaces
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

    // Extract significant words
    const ansSigWords = this.getSignificantWords(nAns);
    const guessSigWords = this.getSignificantWords(nGuess);

    if (answer.includes('-') || answer.includes(' ')) {
      const rawAnsWords = String(answer).toLowerCase().split(/[\s\-:]+/).filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
      for (const rw of rawAnsWords) {
        if (!ansSigWords.includes(rw)) ansSigWords.push(rw);
      }
      for (let i = 0; i < rawAnsWords.length - 1; i++) {
        const joined = rawAnsWords[i] + rawAnsWords[i + 1];
        if (joined.length >= 5 && !ansSigWords.includes(joined)) {
          ansSigWords.push(joined);
        }
      }
    }

    if (ansSigWords.length === 0) {
      return nGuess === nAns || compactGuess === compactAns || this.levenshtein(nGuess, nAns) <= 1;
    }

    // 4. ANY-WORD MATCH: If any word in player's guess matches any significant word in the answer (even with typos)
    for (const gw of guessSigWords) {
      for (const aw of ansSigWords) {
        if (this.isWordMatch(gw, aw)) {
          return true;
        }
      }
    }

    // 5. Check raw single-word guess (e.g. player typed "byomkes" or "fail" or "war")
    const words = nGuess.split(' ').map(w => w.trim()).filter(Boolean);
    for (const w of words) {
      if (w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w)) {
        for (const aw of ansSigWords) {
          if (this.isWordMatch(w, aw)) {
            return true;
          }
        }
      }
    }

    // 6. Substring inclusion check
    if (nAns.length >= 4) {
      const ansBoundaryRegex = new RegExp('(?:^|\\s)' + nAns + '(?:$|\\s)', 'i');
      if (ansBoundaryRegex.test(nGuess)) return true;
    }

    return false;
  }

  public static isAnswerOrSpoiler(text: string, answer: string): boolean {
    if (!text || !answer) return false;
    if (this.isMatch(text, answer)) return true;

    const nText = this.normalize(text);
    const nAns = this.normalize(answer);
    if (!nText || !nAns) return false;
    if (nText === nAns) return true;

    const commonChatWords = new Set([
      'what', 'that', 'this', 'with', 'from', 'have', 'were', 'will', 'good', 'time',
      'like', 'just', 'know', 'take', 'some', 'them', 'come', 'here', 'there', 'think',
      'about', 'really', 'and', 'the', 'for', 'you', 'can', 'not'
    ]);

    if (nAns.length >= 3 && !commonChatWords.has(nAns)) {
      const ansBoundaryRegex = new RegExp('(?:^|\\s)' + nAns + '(?:$|\\s)', 'i');
      if (ansBoundaryRegex.test(nText)) return true;
    }

    if (nAns.length >= 5 && nText.includes(nAns)) return true;

    const ansWords = nAns.split(' ').filter(w => w.length >= 4 && !commonChatWords.has(w));
    for (const w of ansWords) {
      const wordRegex = new RegExp('(?:^|\\s)' + w + '(?:$|\\s)', 'i');
      if (wordRegex.test(nText)) return true;
    }

    return false;
  }

  // Deprecated: Warning mechanism removed per user directive. Always returns false.
  public static isCloseMatch(guess: string, answer: string): boolean {
    return false;
  }
}
