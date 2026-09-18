export class HintGenerator {
  public static generateMaskedHint(title: string): string {
    if (!title || typeof title !== 'string') return '';
    const cleanTitle = title.trim();
    if (!cleanTitle) return '';

    return cleanTitle.split(/\s+/).map(word => {
      const alphaIndices: number[] = [];
      for (let i = 0; i < word.length; i++) {
        if (/[a-zA-Z0-9]/i.test(word[i])) {
          alphaIndices.push(i);
        }
      }
      const L = alphaIndices.length;
      if (L === 0) return word;

      // Strictly guarantee NO word >= 2 characters is ever fully revealed:
      // L === 1: 0 revealed (shown as '_')
      // L === 2: exactly 1 revealed, 1 hidden (e.g. "D _" or "_ C")
      // L === 3 to 5: exactly 1 revealed (e.g. "R _ _", "D _ _ _")
      // L >= 6: at most ~30% revealed, always leaving at least 3 characters masked
      let revealCount = 1;
      if (L === 1) {
        revealCount = 0;
      } else if (L === 2) {
        revealCount = 1;
      } else if (L <= 5) {
        revealCount = 1;
      } else {
        revealCount = Math.max(1, Math.min(Math.floor(L * 0.3), L - 3));
      }

      const shuffled = [...alphaIndices].sort(() => Math.random() - 0.5);
      const revealSet = new Set(shuffled.slice(0, revealCount));

      const res: string[] = [];
      for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        if (!/[a-zA-Z0-9]/i.test(ch)) {
          res.push(ch); // Preserve hyphens, colons, apostrophes, etc.
        } else if (revealSet.has(i)) {
          res.push(ch.toUpperCase());
        } else {
          res.push('_');
        }
      }
      return res.join(' ');
    }).join('   ');
  }
}
