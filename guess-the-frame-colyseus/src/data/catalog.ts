export type MediaType = 'image' | 'dialogue' | 'eye';

export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: MediaType;
  content: string;            // Local image path or dialogue quote text
  revealContent?: string;      // Local full photo reveal for eye mode
  dialogue?: string;          // Quote text if dialogue
  answer: string;             // Authoritative answer (kept secret on server!)
  year?: string;
  aliases?: string[];
  tag?: 'new' | 'classic';
}

export const CATALOG: CatalogItem[] = [
  // ── Guess The Frame (20 Local Frames) ──
  {
    id: "f_1",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/American History X (1998).webp",
    answer: "AMERICAN HISTORY X",
    year: "1998"
  },
  {
    id: "f_2",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Avengers Infinity War (2018).webp",
    answer: "AVENGERS INFINITY WAR",
    year: "2018",
    aliases: ["INFINITY WAR"]
  },
  {
    id: "f_3",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Baahubali 2 The Conclusion (2017).webp",
    answer: "BAAHUBALI 2 THE CONCLUSION",
    year: "2017",
    aliases: ["BAAHUBALI 2", "BAHUBALI 2"]
  },
  {
    id: "f_4",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Balan - The Boy (2026).webp",
    answer: "BALAN - THE BOY",
    year: "2026",
    aliases: ["BALAN THE BOY", "BALAN"]
  },
  {
    id: "f_5",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Before Sunset (2004).webp",
    answer: "BEFORE SUNSET",
    year: "2004"
  },
  {
    id: "f_6",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Billu (2009).webp",
    answer: "BILLU",
    year: "2009",
    aliases: ["BILLU BARBER"]
  },
  {
    id: "f_7",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Certified Copy (2010).webp",
    answer: "CERTIFIED COPY",
    year: "2010"
  },
  {
    id: "f_8",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Dallas Buyers Club (2013).webp",
    answer: "DALLAS BUYERS CLUB",
    year: "2013"
  },
  {
    id: "f_9",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Dune Part Two (2024).webp",
    answer: "DUNE PART TWO",
    year: "2024",
    aliases: ["DUNE 2", "DUNE PART 2"]
  },
  {
    id: "f_10",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/GO GOA GONE (2013).webp",
    answer: "GO GOA GONE",
    year: "2013"
  },
  {
    id: "f_11",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/I Saw the Devil (2010).webp",
    answer: "I SAW THE DEVIL",
    year: "2010"
  },
  {
    id: "f_12",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Irumudi (2026).webp",
    answer: "IRUMUDI",
    year: "2026"
  },
  {
    id: "f_13",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Karwaan (2018).webp",
    answer: "KARWAAN",
    year: "2018"
  },
  {
    id: "f_14",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Nirvanna.the.Band.the.Show.the.Movie (2025).webp",
    answer: "NIRVANNA THE BAND THE SHOW THE MOVIE",
    year: "2025",
    aliases: ["NIRVANNA THE BAND", "NIRVANNA THE BAND THE SHOW"]
  },
  {
    id: "f_15",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/October (2018).webp",
    answer: "OCTOBER",
    year: "2018"
  },
  {
    id: "f_16",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/premalu (2024).webp",
    answer: "PREMALU",
    year: "2024"
  },
  {
    id: "f_17",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Rang De Basanti (2006).webp",
    answer: "RANG DE BASANTI",
    year: "2006",
    aliases: ["RDB"]
  },
  {
    id: "f_18",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Requiem for a Dream (2000).webp",
    answer: "REQUIEM FOR A DREAM",
    year: "2000"
  },
  {
    id: "f_19",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/S_O Satyamurthy (2015).webp",
    answer: "S/O SATYAMURTHY",
    year: "2015",
    aliases: ["SO SATYAMURTHY", "SON OF SATYAMURTHY"]
  },
  {
    id: "f_20",
    category: "frames",
    type: "image",
    content: "/GUESSTHEFRAME/Stand by Me (1986).webp",
    answer: "STAND BY ME",
    year: "1986"
  },

  // ── Guess The Dialogue (10 Local Dialogues) ──
  {
    id: "d_1",
    category: "dialogue",
    type: "dialogue",
    content: "Say hello to my little friend!",
    dialogue: "Say hello to my little friend!",
    answer: "SCARFACE",
    year: "1983"
  },
  {
    id: "d_2",
    category: "dialogue",
    type: "dialogue",
    content: "Some people just want to watch the world burn.",
    dialogue: "Some people just want to watch the world burn.",
    answer: "THE DARK KNIGHT",
    year: "2008",
    aliases: ["DARK KNIGHT"]
  },
  {
    id: "d_3",
    category: "dialogue",
    type: "dialogue",
    content: "I don't want to kill you. I don't want to hurt you. I don't want your life.",
    dialogue: "I don't want to kill you. I don't want to hurt you. I don't want your life.",
    answer: "CAPTAIN AMERICA: THE WINTER SOLDIER",
    year: "2014",
    aliases: ["CAPTAIN AMERICA THE WINTER SOLDIER", "THE WINTER SOLDIER", "WINTER SOLDIER"]
  },
  {
    id: "d_4",
    category: "dialogue",
    type: "dialogue",
    content: "I drink your milkshake!",
    dialogue: "I drink your milkshake!",
    answer: "THERE WILL BE BLOOD",
    year: "2007"
  },
  {
    id: "d_5",
    category: "dialogue",
    type: "dialogue",
    content: "What we do in life echoes in eternity.",
    dialogue: "What we do in life echoes in eternity.",
    answer: "GLADIATOR",
    year: "2000"
  },
  {
    id: "d_6",
    category: "dialogue",
    type: "dialogue",
    content: "The city is flying, we're fighting an army of robots, and I have a bow and arrow. None of this makes sense.",
    dialogue: "The city is flying, we're fighting an army of robots, and I have a bow and arrow. None of this makes sense.",
    answer: "AVENGERS: AGE OF ULTRON",
    year: "2015",
    aliases: ["AVENGERS AGE OF ULTRON", "AGE OF ULTRON"]
  },
  {
    id: "d_7",
    category: "dialogue",
    type: "dialogue",
    content: "Tareekh pe tareekh.",
    dialogue: "Tareekh pe tareekh.",
    answer: "DAMINI",
    year: "1993"
  },
  {
    id: "d_8",
    category: "dialogue",
    type: "dialogue",
    content: "Aap purush hi nahi, mahapurush hain.",
    dialogue: "Aap purush hi nahi, mahapurush hain.",
    answer: "ANDAZ APNA APNA",
    year: "1994"
  },
  {
    id: "d_9",
    category: "dialogue",
    type: "dialogue",
    content: "Rishte mein toh hum tumhare baap lagte hain.",
    dialogue: "Rishte mein toh hum tumhare baap lagte hain.",
    answer: "SHAHENSHAH",
    year: "1988"
  },
  {
    id: "d_10",
    category: "dialogue",
    type: "dialogue",
    content: "Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho.",
    dialogue: "Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho.",
    answer: "ZINDAGI NA MILEGI DOBARA",
    year: "2011",
    aliases: ["ZNMD"]
  },

  // ── Guess The Eye (10 Local Celebrities) ──
  {
    id: "e_1",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Bhuvan Bam copy.webp",
    revealContent: "/GUESSTHEEYES/Bhuvan Bam.webp",
    answer: "BHUVAN BAM",
    year: ""
  },
  {
    id: "e_2",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Daisy Edgar-Jones copy.webp",
    revealContent: "/GUESSTHEEYES/Daisy Edgar-Jones.webp",
    answer: "DAISY EDGAR-JONES",
    aliases: ["DAISY EDGAR JONES"],
    year: ""
  },
  {
    id: "e_3",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Dakota Johnson copy.webp",
    revealContent: "/GUESSTHEEYES/Dakota Johnson.webp",
    answer: "DAKOTA JOHNSON",
    year: ""
  },
  {
    id: "e_4",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Dulquer Salmaan copy.webp",
    revealContent: "/GUESSTHEEYES/Dulquer Salmaan.webp",
    answer: "DULQUER SALMAAN",
    aliases: ["DULQUER SALMAN", "DQ"],
    year: ""
  },
  {
    id: "e_5",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Elle Fanning copy.webp",
    revealContent: "/GUESSTHEEYES/Elle Fanning.webp",
    answer: "ELLE FANNING",
    year: ""
  },
  {
    id: "e_6",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/kiccha Sudeep copy.webp",
    revealContent: "/GUESSTHEEYES/kiccha Sudeep.webp",
    answer: "KICCHA SUDEEP",
    aliases: ["SUDEEP", "KICHCHA SUDEEP"],
    year: ""
  },
  {
    id: "e_7",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Kyle Chandler copy.webp",
    revealContent: "/GUESSTHEEYES/Kyle Chandler.webp",
    answer: "KYLE CHANDLER",
    year: ""
  },
  {
    id: "e_8",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Robert Pattinson copy.webp",
    revealContent: "/GUESSTHEEYES/Robert Pattinson.webp",
    answer: "ROBERT PATTINSON",
    aliases: ["ROB PATTINSON"],
    year: ""
  },
  {
    id: "e_9",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Salma Hayek copy.webp",
    revealContent: "/GUESSTHEEYES/Salma Hayek.webp",
    answer: "SALMA HAYEK",
    year: ""
  },
  {
    id: "e_10",
    category: "eyes",
    type: "eye",
    content: "/GUESSTHEEYES/Sophie Turner copy.webp",
    revealContent: "/GUESSTHEEYES/Sophie Turner.webp",
    answer: "SOPHIE TURNER",
    year: ""
  },

  // ── Tie Breaker (14 Local Tie Breaker Frames) ──
  {
    id: "tb_1",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Anatomy of a Fall (2023).webp",
    answer: "ANATOMY OF A FALL",
    year: "2023"
  },
  {
    id: "tb_2",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Eyes Wide Shut (1999).webp",
    answer: "EYES WIDE SHUT",
    year: "1999"
  },
  {
    id: "tb_3",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Ghilli (2004).webp",
    answer: "GHILLI",
    year: "2004"
  },
  {
    id: "tb_4",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/La Haine(1995).webp",
    answer: "LA HAINE",
    year: "1995"
  },
  {
    id: "tb_5",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Mad Max 2.jpg.webp",
    answer: "MAD MAX 2",
    year: "1981"
  },
  {
    id: "tb_6",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Moonrise Kingdom (2012).webp",
    answer: "MOONRISE KINGDOM",
    year: "2012"
  },
  {
    id: "tb_7",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Batman (2022).webp",
    answer: "THE BATMAN",
    year: "2022"
  },
  {
    id: "tb_8",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Holdovers(2023).webp",
    answer: "THE HOLDOVERS",
    year: "2023"
  },
  {
    id: "tb_9",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Life of Chuck(2024).webp",
    answer: "THE LIFE OF CHUCK",
    year: "2024"
  },
  {
    id: "tb_10",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Lighthouse (2019).webp",
    answer: "THE LIGHTHOUSE",
    year: "2019"
  },
  {
    id: "tb_11",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Wolf of Wall Street (2013).webp",
    answer: "THE WOLF OF WALL STREET",
    year: "2013"
  },
  {
    id: "tb_12",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/They Call Him OG (2025).webp",
    answer: "THEY CALL HIM OG",
    year: "2025"
  },
  {
    id: "tb_13",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Top Gun Maverick (2022).webp",
    answer: "TOP GUN MAVERICK",
    year: "2022"
  },
  {
    id: "tb_14",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Under the Silver Lake (2018).webp",
    answer: "UNDER THE SILVER LAKE",
    year: "2018"
  }
];
