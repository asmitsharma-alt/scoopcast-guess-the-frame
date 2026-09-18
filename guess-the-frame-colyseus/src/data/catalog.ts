export type MediaType = 'image' | 'dialogue' | 'eye';

export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: MediaType;
  content: string;            // Image path or dialogue quote text
  revealContent?: string;      // Full photo reveal for eye mode
  dialogue?: string;          // Quote text if dialogue
  answer: string;             // Authoritative answer (kept secret on server!)
  year?: string;
  aliases?: string[];
}

export const CATALOG: CatalogItem[] = [
  // ── Guess The Frame ──
  {
    id: "f_1",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/12th Fail (2023).webp",
    answer: "12TH FAIL",
    year: "2023"
  },
  {
    id: "f_2",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/After Hours (1985).webp",
    answer: "AFTER HOURS",
    year: "1985"
  },
  {
    id: "f_3",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Bramayugam (2024).webp",
    answer: "BRAMAYUGAM",
    year: "2024"
  },
  {
    id: "f_4",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Brothers (2009).webp",
    answer: "BROTHERS",
    year: "2009"
  },
  {
    id: "f_5",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Cocktail 2 (2026).webp",
    answer: "COCKTAIL 2",
    year: "2026"
  },
  {
    id: "f_6",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Detective Byomkesh Bakshy (2015).webp",
    answer: "DETECTIVE BYOMKESH BAKSHY",
    year: "2015"
  },
  {
    id: "f_7",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Ghanchakkar (2013).webp",
    answer: "GHANCHAKKAR",
    year: "2013"
  },
  {
    id: "f_8",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Lapata Ladies (2023).webp",
    answer: "LAPATA LADIES",
    year: "2023",
    aliases: ["Laapataa Ladies"]
  },
  {
    id: "f_9",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Lars and the Real Girl (2007).webp",
    answer: "LARS AND THE REAL GIRL",
    year: "2007"
  },
  {
    id: "f_10",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Mahaan (2022).webp",
    answer: "MAHAAN",
    year: "2022"
  },
  {
    id: "f_11",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/One Night Only (2026).webp",
    answer: "ONE NIGHT ONLY",
    year: "2026"
  },
  {
    id: "f_12",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Piku (2015).webp",
    answer: "PIKU",
    year: "2015"
  },
  {
    id: "f_13",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/Satluj (2026).webp",
    answer: "SATLUJ",
    year: "2026"
  },
  {
    id: "f_14",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/The End of Oak Street (2026).webp",
    answer: "THE END OF OAK STREET",
    year: "2026"
  },
  {
    id: "f_15",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/The French Dispatch (2021).webp",
    answer: "THE FRENCH DISPATCH",
    year: "2021"
  },
  {
    id: "f_16",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/The Menu (2022).webp",
    answer: "THE MENU",
    year: "2022"
  },
  {
    id: "f_17",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/The Revenant (2015).webp",
    answer: "THE REVENANT",
    year: "2015"
  },
  {
    id: "f_18",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/The Rivals of Amziah King (2026).webp",
    answer: "THE RIVALS OF AMZIAH KING",
    year: "2026"
  },
  {
    id: "f_19",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/khosla ka gholsa(2006).webp",
    answer: "KHOSLA KA GHOSLA",
    year: "2006"
  },
  {
    id: "f_20",
    category: "frames",
    type: "image",
    content: "GUESSTHEFRAME/tony (2026).webp",
    answer: "TONY",
    year: "2026"
  },

  // ── Guess The Dialogue ──
  {
    id: "d_1",
    category: "dialogue",
    type: "dialogue",
    content: "Dur Chale Gaye ho kya Ram. Main wahi khad hu jaha tum mujhe chor kar gayi thi",
    dialogue: "Dur Chale Gaye ho kya Ram. Main wahi khad hu jaha tum mujhe chor kar gayi thi",
    answer: "96",
    year: "2018"
  },
  {
    id: "d_2",
    category: "dialogue",
    type: "dialogue",
    content: "That haircut should be against your vows",
    dialogue: "That haircut should be against your vows",
    answer: "SUPERMAN",
    year: "2025"
  },
  {
    id: "d_3",
    category: "dialogue",
    type: "dialogue",
    content: "They replace me. They'll replace you.",
    dialogue: "They replace me. They'll replace you.",
    answer: "LANTERNS",
    year: "2026"
  },
  {
    id: "d_4",
    category: "dialogue",
    type: "dialogue",
    content: "Rohit kuch piyoge Tea, Coffee. Bournvita",
    dialogue: "Rohit kuch piyoge Tea, Coffee. Bournvita",
    answer: "KOI MIL GAYA",
    year: "2003"
  },
  {
    id: "d_5",
    category: "dialogue",
    type: "dialogue",
    content: "1 baat yaad rakhna beta is duniya mein bas 2 kism ke insaan hai, ache insaan jo acha kaam karte hai aur bure jo bura, bas yahi 1 farq hai insaano mein aur koi nahi",
    dialogue: "1 baat yaad rakhna beta is duniya mein bas 2 kism ke insaan hai, ache insaan jo acha kaam karte hai aur bure jo bura, bas yahi 1 farq hai insaano mein aur koi nahi",
    answer: "MY NAME IS KHAN",
    year: "2010"
  },
  {
    id: "d_6",
    category: "dialogue",
    type: "dialogue",
    content: "The Hardest Choices Requires The Strongest wills",
    dialogue: "The Hardest Choices Requires The Strongest wills",
    answer: "AVENGERS INFINITY WAR",
    year: "2018"
  },
  {
    id: "d_7",
    category: "dialogue",
    type: "dialogue",
    content: "Look how they massacred my boy.",
    dialogue: "Look how they massacred my boy.",
    answer: "THE GODFATHER",
    year: "1972"
  },
  {
    id: "d_8",
    category: "dialogue",
    type: "dialogue",
    content: "You can't handle the truth",
    dialogue: "You can't handle the truth",
    answer: "A FEW GOOD MEN",
    year: "1992"
  },
  {
    id: "d_9",
    category: "dialogue",
    type: "dialogue",
    content: "Why do we Fall sir",
    dialogue: "Why do we Fall sir",
    answer: "BATMAN BEGINS",
    year: "2005"
  },
  {
    id: "d_10",
    category: "dialogue",
    type: "dialogue",
    content: "Saalo se muh cheepata hua phir raha hu aur ye gala faad ke Gafoor, Gafoor, Gafoor chilla raha hai",
    dialogue: "Saalo se muh cheepata hua phir raha hu aur ye gala faad ke Gafoor, Gafoor, Gafoor chilla raha hai",
    answer: "THE BADS OF BOLLYWOOD",
    year: "2025"
  },

  // ── Guess The Eye ──
  {
    id: "e_1",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Aaron Pierre copy.webp",
    revealContent: "GUESSTHEEYES/Aaron Pierre.webp",
    answer: "AARON PIERRE",
    year: ""
  },
  {
    id: "e_2",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Alexandra Daddario copy.webp",
    revealContent: "GUESSTHEEYES/Alexandra Daddario.webp",
    answer: "ALEXANDRA DADDARIO",
    year: ""
  },
  {
    id: "e_3",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Angelina Jolie copy.webp",
    revealContent: "GUESSTHEEYES/Angelina Jolie.webp",
    answer: "ANGELINA JOLIE",
    year: ""
  },
  {
    id: "e_4",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Disha Patani copy.webp",
    revealContent: "GUESSTHEEYES/Disha Patani.webp",
    answer: "DISHA PATANI",
    year: ""
  },
  {
    id: "e_5",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Hunter Schafer copy.webp",
    revealContent: "GUESSTHEEYES/Hunter Schafer.webp",
    answer: "HUNTER SCHAFER",
    year: ""
  },
  {
    id: "e_6",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Leonardo DiCaprio copy.webp",
    revealContent: "GUESSTHEEYES/Leonardo DiCaprio.webp",
    answer: "LEONARDO DICAPRIO",
    year: ""
  },
  {
    id: "e_7",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Meryl Streep copy.webp",
    revealContent: "GUESSTHEEYES/Meryl Streep.webp",
    answer: "MERYL STREEP",
    year: ""
  },
  {
    id: "e_8",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Nicole Kidman copy.webp",
    revealContent: "GUESSTHEEYES/Nicole Kidman.webp",
    answer: "NICOLE KIDMAN",
    year: ""
  },
  {
    id: "e_9",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Wamiqa Gabbi copy.webp",
    revealContent: "GUESSTHEEYES/Wamiqa Gabbi.webp",
    answer: "WAMIQA GABBI",
    year: ""
  },
  {
    id: "e_10",
    category: "eyes",
    type: "eye",
    content: "GUESSTHEEYES/Yash copy.webp",
    revealContent: "GUESSTHEEYES/Yash.webp",
    answer: "YASH",
    year: ""
  },

  // ── Tie Breaker Frames ──
  {
    id: "tb_1",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Anatomy of a Fall (2023).webp",
    answer: "ANATOMY OF A FALL",
    year: "2023"
  },
  {
    id: "tb_2",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Eyes Wide Shut (1999).webp",
    answer: "EYES WIDE SHUT",
    year: "1999"
  },
  {
    id: "tb_3",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Ghilli (2004).webp",
    answer: "GHILLI",
    year: "2004"
  },
  {
    id: "tb_4",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/La Haine(1995).webp",
    answer: "LA HAINE",
    year: "1995"
  },
  {
    id: "tb_5",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Mad Max 2.jpg.webp",
    answer: "MAD MAX 2",
    year: "1981"
  },
  {
    id: "tb_6",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Moonrise Kingdom (2012).webp",
    answer: "MOONRISE KINGDOM",
    year: "2012"
  },
  {
    id: "tb_7",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/The Batman (2022).webp",
    answer: "THE BATMAN",
    year: "2022"
  },
  {
    id: "tb_8",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/The Holdovers(2023).webp",
    answer: "THE HOLDOVERS",
    year: "2023"
  },
  {
    id: "tb_9",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/The Life of Chuck(2024).webp",
    answer: "THE LIFE OF CHUCK",
    year: "2024"
  },
  {
    id: "tb_10",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/The Lighthouse (2019).webp",
    answer: "THE LIGHTHOUSE",
    year: "2019"
  },
  {
    id: "tb_11",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/The Wolf of Wall Street (2013).webp",
    answer: "THE WOLF OF WALL STREET",
    year: "2013"
  },
  {
    id: "tb_12",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/They Call Him OG (2025).webp",
    answer: "THEY CALL HIM OG",
    year: "2025"
  },
  {
    id: "tb_13",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Top Gun Maverick (2022).webp",
    answer: "TOP GUN MAVERICK",
    year: "2022"
  },
  {
    id: "tb_14",
    category: "tie_breaker",
    type: "image",
    content: "tie breaker/Under the Silver Lake (2018).webp",
    answer: "UNDER THE SILVER LAKE",
    year: "2018"
  }
];
