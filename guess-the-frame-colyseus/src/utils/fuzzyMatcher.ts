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
   * Ultra-lenient single-word matcher with adaptive typo tolerance and prefix matching.
   * - Strips common stopwords and numbers.
   * - Allows prefixes: typing "rob" matches "robert", "gladiat" matches "gladiator".
   * - Allows duplicate letters: "baahubali" matches "bahubali", "pattinson" matches "patinson".
   * - Typo distances: length 3 allows dist <= 1, 4-5 allows dist <= 1-2, 6-8 allows dist <= 2, 9+ allows dist <= 3.
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

    // Prefix matching for 3+ letter stems (e.g. "rob" matches "robert", "americ" matches "american")
    if (w1.length >= 3 && w2.length >= 3) {
      if (w1.startsWith(w2) || w2.startsWith(w1)) return true;
      if (c1.startsWith(c2) || c2.startsWith(c1)) return true;
    }

    // Substring inclusion: if one word is inside the other and long enough
    if (w1.length >= 4 && w2.length >= 4) {
      if (w1.includes(w2) || w2.includes(w1)) return true;
      if (c1.includes(c2) || c2.includes(c1)) return true;
    }

    // Collapse duplicate letters: "baahubali" -> "bahubali", "pattinson" -> "patinson"
    const deDup = (s: string) => s.replace(/(.)\1+/g, '$1');
    const d1 = deDup(c1);
    const d2 = deDup(c2);
    if (d1 === d2) return true;
    if (d1.length >= 4 && d2.length >= 4 && (d1.includes(d2) || d2.includes(d1))) return true;

    const maxLen = Math.max(c1.length, c2.length);
    const lenDiff = Math.abs(c1.length - c2.length);

    if (maxLen === 3) return this.levenshtein(c1, c2) <= 1;
    if (maxLen <= 5) {
      if (lenDiff > 2) return false;
      return this.levenshtein(c1, c2) <= 1 || this.levenshtein(d1, d2) <= 1;
    }
    if (maxLen <= 8) {
      if (lenDiff > 3) return false;
      return this.levenshtein(c1, c2) <= 2 || this.levenshtein(d1, d2) <= 2;
    }
    if (lenDiff > 4) return false;
    return this.levenshtein(c1, c2) <= 3 || this.levenshtein(d1, d2) <= 3;
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

    // 2. Direct compact comparison without spaces
    const compactGuess = nGuess.replace(/\s+/g, '');
    const compactAns = nAns.replace(/\s+/g, '');
    if (compactGuess === compactAns) return true;
    if (Math.abs(compactGuess.length - compactAns.length) <= 3) {
      const cDist = this.levenshtein(compactGuess, compactAns);
      if (compactAns.length <= 6 && cDist <= 1) return true;
      if (compactAns.length > 6 && cDist <= 3) return true;
    }

    // 3. Whole-string Levenshtein distance
    const lenDiff = Math.abs(nGuess.length - nAns.length);
    if (lenDiff <= 4) {
      const dist = this.levenshtein(nGuess, nAns);
      if (nAns.length <= 4) {
        if (dist <= 1) return true;
      } else if (nAns.length <= 8) {
        if (dist <= 2) return true;
      } else if (nAns.length <= 15) {
        if (dist <= 3) return true;
      } else {
        if (dist <= 4) return true;
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
          if (Math.abs(compactGuess.length - compactPart.length) <= 2 && this.levenshtein(compactGuess, compactPart) <= 2) return true;
          if (Math.abs(nGuess.length - part.length) <= 2 && this.levenshtein(nGuess, part) <= 2) return true;
        }
      }
    }

    // 5. Extract significant words from both answer and guess
    const ansSigWords = this.getSignificantWords(nAns);
    const guessSigWords = this.getSignificantWords(nGuess);

    // If answer has raw words (e.g. from hyphenated/bracketed titles)
    const rawAnsWords = String(answer).toLowerCase().split(/[\s\-:\(\)\/\.\_]+/).filter(w => w.length >= 3 && !this.STOP_WORDS.has(w) && !/^\d+$/.test(w));
    for (const rw of rawAnsWords) {
      if (!ansSigWords.includes(rw)) ansSigWords.push(rw);
    }

    if (ansSigWords.length === 0) {
      return nGuess === nAns || compactGuess === compactAns || this.levenshtein(nGuess, nAns) <= 2;
    }

    // 6. ANY-WORD MATCH:
    // If the guess contains ANY significant word matching ANY significant word of the answer:
    for (const gw of guessSigWords) {
      for (const aw of ansSigWords) {
        if (this.isWordMatch(gw, aw)) {
          return true;
        }
      }
    }

    // Also check every individual token in the guess
    const guessTokens = nGuess.split(/[\s\-:\(\)\/\.\_]+/).map(w => w.trim()).filter(Boolean);
    for (const token of guessTokens) {
      if (token.length >= 3 && !this.STOP_WORDS.has(token) && !/^\d+$/.test(token)) {
        for (const aw of ansSigWords) {
          if (this.isWordMatch(token, aw)) {
            return true;
          }
        }
      }
    }

    // Check if the entire guess itself (if not a stopword) matches any significant word
    if (!this.STOP_WORDS.has(nGuess) && nGuess.length >= 3) {
      for (const aw of ansSigWords) {
        if (this.isWordMatch(nGuess, aw)) {
          return true;
        }
      }
    }

    // 7. Substring inclusion check (if answer contains guess or guess contains answer)
    if (nAns.length >= 4 && !this.STOP_WORDS.has(nGuess) && nGuess.length >= 4) {
      if (nAns.includes(nGuess) || nGuess.includes(nAns)) return true;
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
