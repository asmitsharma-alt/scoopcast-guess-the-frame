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
    'ka', 'ki', 'ke', 'ko', 'se', 'me', 'mein', 'par', 'aur', 'ya', 'ek', 'do', 'hai', 'hain', 'tha', 'thi', 'the', 'ye', 'yeh', 'woh', 'hum', 'tum', 'aap', 'wala', 'wali', 'wale', 'na',
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
   * Robust single-word matcher with controlled typo tolerance.
   * - Strips common stopwords and numbers.
   * - Handles duplicate letters: "baahubali" matches "bahubali", "pattinson" matches "patinson".
   * - Short words (<= 4 chars): 0 typos allowed. Must match exact, canonical, or deduplicated.
   * - Medium words (5-7 chars): Max 1 typo allowed, max length difference of 1.
   * - Long words (8+ chars): Max 2 typos allowed, max length difference of 2.
   * - Arbitrary substring overlap (e.g. "kishan" inside/overlapping "kiccha") is strictly rejected.
   */
  public static isWordMatch(w1: string, w2: string): boolean {
    if (!w1 || !w2) return false;
    w1 = w1.toLowerCase().trim();
    w2 = w2.toLowerCase().trim();
    if (w1 === w2) return true;

    // Reject stopwords or pure digits
    if (this.STOP_WORDS.has(w1) || this.STOP_WORDS.has(w2)) return false;
    if (/^\d+$/.test(w1) || /^\d+$/.test(w2)) return false;
    if (w1.length < 3 || w2.length < 3) return false;

    const c1 = this.canonicalWord(w1);
    const c2 = this.canonicalWord(w2);
    if (c1 === c2) return true;

    // Collapse duplicate letters: "baahubali" -> "bahubali", "pattinson" -> "patinson"
    const deDup = (s: string) => s.replace(/(.)\1+/g, '$1');
    const d1 = deDup(c1);
    const d2 = deDup(c2);
    if (d1 === d2) return true;

    const maxLen = Math.max(c1.length, c2.length);
    const minLen = Math.min(c1.length, c2.length);
    const lenDiff = Math.abs(c1.length - c2.length);

    // Stems / prefix check: only valid if stem is long (>= 5 chars) and covers >= 80% of longer word
    if (minLen >= 5 && minLen / maxLen >= 0.8) {
      if (c1.startsWith(c2) || c2.startsWith(c1)) return true;
      if (d1.startsWith(d2) || d2.startsWith(d1)) return true;
    }

    // Short words (<= 4 chars, e.g. "star", "dark", "ring", "man"): 0 typos allowed
    if (maxLen <= 4) {
      return false;
    }

    // Medium words (5 to 7 chars, e.g. "kiccha", "sudeep", "batman"): max 1 typo, length diff <= 1
    if (maxLen <= 7) {
      if (lenDiff > 1) return false;
      return this.levenshtein(c1, c2) <= 1 || this.levenshtein(d1, d2) <= 1;
    }

    // Long words (8+ chars, e.g. "oppenheimer", "interstellar", "bramayugam"): max 2 typos, length diff <= 2
    if (lenDiff > 2) return false;
    return this.levenshtein(c1, c2) <= 2 || this.levenshtein(d1, d2) <= 2;
  }

  public static getSignificantWords(normalizedStr: string): string[] {
    if (!normalizedStr) return [];
    const words = normalizedStr.split(/[\s\-:]+/)
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
    
    // Also include adjacent concatenated pairs if applicable (e.g. "afterhours", "wintersoilder")
    const result: string[] = [...words];
    for (let i = 0; i < words.length - 1; i++) {
      const combined = words[i] + words[i + 1];
      if (combined.length >= 5 && !result.includes(combined)) {
        result.push(combined);
      }
    }
    return result;
  }

  /**
   * Robust multi-tier matching:
   * 1. Exact normalized match
   * 2. Direct compact comparison without spaces
   * 3. Whole-string Levenshtein distance with strict thresholds
   * 4. Subtitle handling
   * 5. Word-level matching: single-word guess matches genuine answer word; multi-word guess requires >= 70% word alignment without intruder words.
   */
  public static isMatch(guess: string, answer: string): boolean {
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

    // 3. Whole-string Levenshtein distance with strict length diff
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

    // 4. Subtitle handling (e.g. "Captain America: The Winter Soldier")
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

    // 5. Extract significant words from both answer and guess
    const ansSigWords = this.getSignificantWords(nAns);

    // If answer has raw words (e.g. from hyphenated/bracketed titles)
    const rawAnsWords = String(answer).toLowerCase().split(/[\s\-:\(\)\/\.\_]+/).filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
    for (const rw of rawAnsWords) {
      if (!ansSigWords.includes(rw)) ansSigWords.push(rw);
    }

    const guessTokens = nGuess.split(/[\s\-:\(\)\/\.\_]+/).map(w => w.trim()).filter(Boolean);
    const validGuessWords = guessTokens.filter(t => t.length >= 3 && !this.STOP_WORDS.has(t) && !/^\d+$/.test(t));

    if (ansSigWords.length === 0 || validGuessWords.length === 0) {
      return nGuess === nAns || compactGuess === compactAns;
    }

    // 6. Word-level matching:
    // Case A: Single-word guess (e.g. player typed "sudeep" or "kiccha" or "interstellar")
    // If the guess contains only ONE significant word, it must match one of the answer's words with strict typo tolerance.
    if (validGuessWords.length === 1) {
      const singleWord = validGuessWords[0];
      for (const aw of ansSigWords) {
        if (this.isWordMatch(singleWord, aw)) {
          return true;
        }
      }
    } else {
      // Case B: Multi-word guess (e.g. "ravi kishan", "kiccha sudeep", "the dark knight", "star wars")
      // In a multi-word guess, we check how many words match the answer.
      // Every matched word must genuinely match an answer word.
      // Unrelated intruder words (e.g. "ravi" in "ravi sudeep" or "ravi kishan") prevent false awards.
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
