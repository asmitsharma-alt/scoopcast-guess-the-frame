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
  tag?: 'new' | 'classic';
}

export const CATALOG: CatalogItem[] = [
  // ── Guess The Frame ──
  {
    id: "f_1",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799679/scoopcast/GUESSTHEFRAME/12th_Fail_2023.webp",
    answer: "12TH FAIL",
    year: "2023"
  },
  {
    id: "f_2",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800272/scoopcast/GUESSTHEFRAME/After_Hours_1985.webp",
    answer: "AFTER HOURS",
    year: "1985"
  },
  {
    id: "f_3",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800275/scoopcast/GUESSTHEFRAME/Bramayugam_2024.webp",
    answer: "BRAMAYUGAM",
    year: "2024"
  },
  {
    id: "f_4",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800286/scoopcast/GUESSTHEFRAME/Brothers_2009.webp",
    answer: "BROTHERS",
    year: "2009"
  },
  {
    id: "f_5",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800296/scoopcast/GUESSTHEFRAME/Cocktail_2_2026.webp",
    answer: "COCKTAIL 2",
    year: "2026"
  },
  {
    id: "f_6",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800306/scoopcast/GUESSTHEFRAME/Detective_Byomkesh_Bakshy_2015.webp",
    answer: "DETECTIVE BYOMKESH BAKSHY",
    year: "2015"
  },
  {
    id: "f_7",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800340/scoopcast/GUESSTHEFRAME/Ghanchakkar_2013.webp",
    answer: "GHANCHAKKAR",
    year: "2013"
  },
  {
    id: "f_8",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800363/scoopcast/GUESSTHEFRAME/Lapata_Ladies_2023.webp",
    answer: "LAPATA LADIES",
    year: "2023",
    aliases: ["Laapataa Ladies"]
  },
  {
    id: "f_9",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800367/scoopcast/GUESSTHEFRAME/Lars_and_the_Real_Girl_2007.webp",
    answer: "LARS AND THE REAL GIRL",
    year: "2007"
  },
  {
    id: "f_10",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800389/scoopcast/GUESSTHEFRAME/Mahaan_2022.webp",
    answer: "MAHAAN",
    year: "2022"
  },
  {
    id: "f_11",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800404/scoopcast/GUESSTHEFRAME/One_Night_Only_2026.webp",
    answer: "ONE NIGHT ONLY",
    year: "2026"
  },
  {
    id: "f_12",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800411/scoopcast/GUESSTHEFRAME/Piku_2015.webp",
    answer: "PIKU",
    year: "2015"
  },
  {
    id: "f_13",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800420/scoopcast/GUESSTHEFRAME/Satluj_2026.webp",
    answer: "SATLUJ",
    year: "2026"
  },
  {
    id: "f_14",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800428/scoopcast/GUESSTHEFRAME/The_End_of_Oak_Street_2026.webp",
    answer: "THE END OF OAK STREET",
    year: "2026"
  },
  {
    id: "f_15",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800435/scoopcast/GUESSTHEFRAME/The_French_Dispatch_2021.webp",
    answer: "THE FRENCH DISPATCH",
    year: "2021"
  },
  {
    id: "f_16",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800643/scoopcast/GUESSTHEFRAME/The_Menu_2022.webp",
    answer: "THE MENU",
    year: "2022"
  },
  {
    id: "f_17",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800471/scoopcast/GUESSTHEFRAME/The_Revenant_2015.webp",
    answer: "THE REVENANT",
    year: "2015"
  },
  {
    id: "f_18",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800476/scoopcast/GUESSTHEFRAME/The_Rivals_of_Amziah_King_2026.webp",
    answer: "THE RIVALS OF AMZIAH KING",
    year: "2026"
  },
  {
    id: "f_19",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800357/scoopcast/GUESSTHEFRAME/khosla_ka_gholsa_2006.webp",
    answer: "KHOSLA KA GHOSLA",
    year: "2006"
  },
  {
    id: "f_20",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800482/scoopcast/GUESSTHEFRAME/tony_2026.webp",
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
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799983/scoopcast/GUESSTHEEYES/Aaron_Pierre_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799988/scoopcast/GUESSTHEEYES/Aaron_Pierre.webp",
    answer: "AARON PIERRE",
    year: ""
  },
  {
    id: "e_2",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799996/scoopcast/GUESSTHEEYES/Alexandra_Daddario_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800005/scoopcast/GUESSTHEEYES/Alexandra_Daddario.webp",
    answer: "ALEXANDRA DADDARIO",
    year: ""
  },
  {
    id: "e_3",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800049/scoopcast/GUESSTHEEYES/Angelina_Jolie_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800061/scoopcast/GUESSTHEEYES/Angelina_Jolie.webp",
    answer: "ANGELINA JOLIE",
    year: ""
  },
  {
    id: "e_4",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800066/scoopcast/GUESSTHEEYES/Disha_Patani_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800071/scoopcast/GUESSTHEEYES/Disha_Patani.webp",
    answer: "DISHA PATANI",
    year: ""
  },
  {
    id: "e_5",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800077/scoopcast/GUESSTHEEYES/Hunter_Schafer_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800104/scoopcast/GUESSTHEEYES/Hunter_Schafer.webp",
    answer: "HUNTER SCHAFER",
    year: ""
  },
  {
    id: "e_6",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800148/scoopcast/GUESSTHEEYES/Leonardo_DiCaprio_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800159/scoopcast/GUESSTHEEYES/Leonardo_DiCaprio.webp",
    answer: "LEONARDO DICAPRIO",
    year: ""
  },
  {
    id: "e_7",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800163/scoopcast/GUESSTHEEYES/Meryl_Streep_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800172/scoopcast/GUESSTHEEYES/Meryl_Streep.webp",
    answer: "MERYL STREEP",
    year: ""
  },
  {
    id: "e_8",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800182/scoopcast/GUESSTHEEYES/Nicole_Kidman_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800638/scoopcast/GUESSTHEEYES/Nicole_Kidman.webp",
    answer: "NICOLE KIDMAN",
    year: ""
  },
  {
    id: "e_9",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800245/scoopcast/GUESSTHEEYES/Wamiqa_Gabbi_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800254/scoopcast/GUESSTHEEYES/Wamiqa_Gabbi.webp",
    answer: "WAMIQA GABBI",
    year: ""
  },
  {
    id: "e_10",
    category: "eyes",
    type: "eye",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800260/scoopcast/GUESSTHEEYES/Yash_copy.webp",
    revealContent: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800266/scoopcast/GUESSTHEEYES/Yash.webp",
    answer: "YASH",
    year: ""
  },

  // ── Tie Breaker Frames ──
  {
    id: "tb_1",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800486/scoopcast/tie_breaker/Anatomy_of_a_Fall_2023.webp",
    answer: "ANATOMY OF A FALL",
    year: "2023"
  },
  {
    id: "tb_2",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800490/scoopcast/tie_breaker/Eyes_Wide_Shut_1999.webp",
    answer: "EYES WIDE SHUT",
    year: "1999"
  },
  {
    id: "tb_3",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800495/scoopcast/tie_breaker/Ghilli_2004.webp",
    answer: "GHILLI",
    year: "2004"
  },
  {
    id: "tb_4",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800502/scoopcast/tie_breaker/La_Haine_1995.webp",
    answer: "LA HAINE",
    year: "1995"
  },
  {
    id: "tb_5",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800515/scoopcast/tie_breaker/Mad_Max_2.jpg.webp",
    answer: "MAD MAX 2",
    year: "1981"
  },
  {
    id: "tb_6",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800518/scoopcast/tie_breaker/Moonrise_Kingdom_2012.webp",
    answer: "MOONRISE KINGDOM",
    year: "2012"
  },
  {
    id: "tb_7",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800523/scoopcast/tie_breaker/The_Batman_2022.webp",
    answer: "THE BATMAN",
    year: "2022"
  },
  {
    id: "tb_8",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800526/scoopcast/tie_breaker/The_Holdovers_2023.webp",
    answer: "THE HOLDOVERS",
    year: "2023"
  },
  {
    id: "tb_9",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800530/scoopcast/tie_breaker/The_Life_of_Chuck_2024.webp",
    answer: "THE LIFE OF CHUCK",
    year: "2024"
  },
  {
    id: "tb_10",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800533/scoopcast/tie_breaker/The_Lighthouse_2019.webp",
    answer: "THE LIGHTHOUSE",
    year: "2019"
  },
  {
    id: "tb_11",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800537/scoopcast/tie_breaker/The_Wolf_of_Wall_Street_2013.webp",
    answer: "THE WOLF OF WALL STREET",
    year: "2013"
  },
  {
    id: "tb_12",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800546/scoopcast/tie_breaker/They_Call_Him_OG_2025.webp",
    answer: "THEY CALL HIM OG",
    year: "2025"
  },
  {
    id: "tb_13",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800586/scoopcast/tie_breaker/Top_Gun_Maverick_2022.webp",
    answer: "TOP GUN MAVERICK",
    year: "2022"
  },
  {
    id: "tb_14",
    category: "tie_breaker",
    type: "image",
    content: "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800609/scoopcast/tie_breaker/Under_the_Silver_Lake_2018.webp",
    answer: "UNDER THE SILVER LAKE",
    year: "2018"
  }
];
