export class FuzzyMatcher {
  public static readonly STOP_WORDS: Set<string> = new Set([
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
    // Normalize word numbers and roman numerals to digits
    t = t.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g, (m) => {
      const map: Record<string, string> = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
        'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
      };
      return map[m] || m;
    });
    t = t.replace(/\b(ii|iii|iv|v)\b/g, (m) => {
      const map: Record<string, string> = { 'ii': '2', 'iii': '3', 'iv': '4', 'v': '5' };
      return map[m] || m;
    });
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

  public static isWordMatch(w1: string, w2: string): boolean {
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
  }

  public static getSignificantWords(normalizedStr: string): string[] {
    if (!normalizedStr) return [];
    return normalizedStr.split(' ')
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !this.STOP_WORDS.has(w));
  }

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
      const rawAnsWords = String(answer).toLowerCase().split(/[\s\-:]+/).filter(w => w.length >= 3 && !this.STOP_WORDS.has(w));
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
    if (singleWord) {
      if (!this.STOP_WORDS.has(singleWord) && singleWord.length >= 3) {
        for (const aw of ansSigWords) {
          if (this.isWordMatch(singleWord, aw)) {
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

  public static isCloseMatch(guess: string, answer: string): boolean {
    if (!guess || !answer) return false;
    if (this.isMatch(guess, answer)) return false;

    const nGuess = this.normalize(guess);
    const nAns = this.normalize(answer);
    if (!nGuess || !nAns) return false;

    const compactGuess = nGuess.replace(/\s+/g, '');
    const compactAns = nAns.replace(/\s+/g, '');

    const distCompact = this.levenshtein(compactGuess, compactAns);
    const distNorm = this.levenshtein(nGuess, nAns);
    const dist = Math.min(distCompact, distNorm);

    if (compactAns.length >= 4 && dist === 1) return true;
    if (compactAns.length >= 9 && dist === 2) return true;

    return false;
  }
}
