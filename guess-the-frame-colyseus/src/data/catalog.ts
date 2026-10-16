import { DIALOGUE_CATALOG } from "./dialogueCatalog";

export type MediaType = 'image' | 'dialogue' | 'eye';

export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: MediaType;
  content: string;
  revealContent?: string;
  dialogue?: string;
  answer: string;
  displayAnswer?: string; // What to show when revealed (e.g. '***** ****' for Fight Club)
  year?: string;
  character?: string;
  actor?: string;
  region?: 'bollywood' | 'hollywood' | 'regional' | 'international';
  aliases?: string[];
  tag?: 'new' | 'classic' | 'modern' | string;
}

export const CATALOG: CatalogItem[] = [
  {
    id: "f_1",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0001.jpg",
    answer: "THE SHAWSHANK REDEMPTION",
    year: "1994",
    tag: "classic",
    aliases: ["SHAWSHANK REDEMPTION"]
  },
  {
    id: "f_2",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878459/imdb-top500-frame-quiz/frame_0002.jpg",
    answer: "THE GODFATHER",
    year: "1972",
    tag: "classic",
    aliases: ["GODFATHER"]
  },
  {
    id: "f_3",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0003.jpg",
    answer: "THE DARK KNIGHT",
    year: "2008",
    tag: "classic",
    aliases: ["DARK KNIGHT"]
  },
  {
    id: "f_4",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0004.jpg",
    answer: "THE LORD OF THE RINGS: THE RETURN OF THE KING",
    year: "2003",
    tag: "classic",
    aliases: ["LORD OF THE RINGS", "LORD OF THE RINGS 3", "LORD OF THE RINGS THE RETURN OF THE KING", "LORD OF THE RINGS: THE RETURN OF THE KING", "LOTR", "LOTR 3", "RETURN OF THE KING", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE RETURN OF THE KING", "THE RETURN OF THE KING"]
  },
  {
    id: "f_5",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878545/imdb-top500-frame-quiz/frame_0006.jpg",
    answer: "THE GODFATHER PART II",
    year: "1974",
    tag: "classic",
    aliases: ["GODFATHER 2", "GODFATHER PART 2", "GODFATHER PART II", "THE GODFATHER 2"]
  },
  {
    id: "f_6",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0008.jpg",
    answer: "THE LORD OF THE RINGS: THE FELLOWSHIP OF THE RING",
    year: "2001",
    tag: "classic",
    aliases: ["FELLOWSHIP OF THE RING", "LORD OF THE RINGS", "LORD OF THE RINGS 1", "LORD OF THE RINGS THE FELLOWSHIP OF THE RING", "LORD OF THE RINGS: THE FELLOWSHIP OF THE RING", "LOTR", "LOTR 1", "THE FELLOWSHIP OF THE RING", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE FELLOWSHIP OF THE RING"]
  },
  {
    id: "f_7",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878545/imdb-top500-frame-quiz/frame_0009.jpg",
    answer: "INCEPTION",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_8",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0010.jpg",
    answer: "FIGHT CLUB",
    year: "1999",
    tag: "classic",
    displayAnswer: "***** ****"
  },
  {
    id: "f_9",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0011.jpg",
    answer: "FORREST GUMP",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_10",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878575/imdb-top500-frame-quiz/frame_0012.jpg",
    answer: "PULP FICTION",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_11",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0013.jpg",
    answer: "THE LORD OF THE RINGS: THE TWO TOWERS",
    year: "2002",
    tag: "classic",
    aliases: ["LORD OF THE RINGS", "LORD OF THE RINGS 2", "LORD OF THE RINGS THE TWO TOWERS", "LORD OF THE RINGS: THE TWO TOWERS", "LOTR", "LOTR 2", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE TWO TOWERS", "THE TWO TOWERS", "TWO TOWERS"]
  },
  {
    id: "f_12",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0015.jpg",
    answer: "INTERSTELLAR",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_13",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0017.jpg",
    answer: "STAR WARS: EPISODE V - THE EMPIRE STRIKES BACK",
    year: "1980",
    tag: "classic",
    aliases: ["EMPIRE STRIKES BACK", "EPISODE V - THE EMPIRE STRIKES BACK", "STAR WARS", "STAR WARS 5", "STAR WARS EPISODE V THE EMPIRE STRIKES BACK", "THE EMPIRE STRIKES BACK"]
  },
  {
    id: "f_14",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0018.jpg",
    answer: "GOODFELLAS",
    year: "1990",
    tag: "classic",
    aliases: ["GOOD FELLAS"]
  },
  {
    id: "f_15",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0019.jpg",
    answer: "SEVEN",
    year: "1995",
    tag: "classic",
    aliases: ["SE7EN"]
  },
  {
    id: "f_16",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0020.jpg",
    answer: "THE SILENCE OF THE LAMBS",
    year: "1991",
    tag: "classic",
    aliases: ["SILENCE OF THE LAMBS"]
  },
  {
    id: "f_17",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0022.jpg",
    answer: "STAR WARS: EPISODE IV - A NEW HOPE",
    year: "1977",
    tag: "classic",
    aliases: ["A NEW HOPE", "EPISODE IV - A NEW HOPE", "STAR WARS", "STAR WARS 4", "STAR WARS EPISODE IV A NEW HOPE"]
  },
  {
    id: "f_18",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0023.jpg",
    answer: "THE GREEN MILE",
    year: "1999",
    tag: "classic",
    aliases: ["GREEN MILE"]
  },
  {
    id: "f_19",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0024.jpg",
    answer: "TERMINATOR 2: JUDGMENT DAY",
    year: "1991",
    tag: "classic",
    aliases: ["JUDGMENT DAY", "T2", "TERMINATOR 2", "TERMINATOR 2 JUDGMENT DAY"]
  },
  {
    id: "f_20",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878610/imdb-top500-frame-quiz/frame_0026.jpg",
    answer: "SPIRITED AWAY",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_21",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0031.jpg",
    answer: "DJANGO UNCHAINED",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_22",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0033.jpg",
    answer: "THE PRESTIGE",
    year: "2006",
    tag: "classic",
    aliases: ["PRESTIGE"]
  },
  {
    id: "f_23",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0034.jpg",
    answer: "THE DEPARTED",
    year: "2006",
    tag: "classic",
    aliases: ["DEPARTED"]
  },
  {
    id: "f_24",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0035.jpg",
    answer: "BACK TO THE FUTURE",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_25",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0038.jpg",
    answer: "THE LION KING",
    year: "1994",
    tag: "classic",
    aliases: ["LION KING"]
  },
  {
    id: "f_26",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0040.jpg",
    answer: "PARASITE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_27",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0041.jpg",
    answer: "WHIPLASH",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_28",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0045.jpg",
    answer: "PSYCHO",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_29",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0047.jpg",
    answer: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
    year: "2023",
    tag: "new",
    aliases: ["ACROSS THE SPIDER-VERSE", "SPIDER MAN ACROSS THE SPIDER VERSE", "SPIDER-MAN"]
  },
  {
    id: "f_30",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0052.jpg",
    answer: "THE DARK KNIGHT RISES",
    year: "2012",
    tag: "classic",
    aliases: ["DARK KNIGHT RISES"]
  },
  {
    id: "f_31",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0053.jpg",
    answer: "INGLOURIOUS BASTERDS",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_32",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878670/imdb-top500-frame-quiz/frame_0054.jpg",
    answer: "AVENGERS: ENDGAME",
    year: "2019",
    tag: "classic",
    aliases: ["AVENGERS", "AVENGERS ENDGAME", "ENDGAME"]
  },
  {
    id: "f_33",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0056.jpg",
    answer: "AVENGERS: INFINITY WAR",
    year: "2018",
    tag: "classic",
    aliases: ["AVENGERS", "AVENGERS INFINITY WAR", "INFINITY WAR"]
  },
  {
    id: "f_34",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878670/imdb-top500-frame-quiz/frame_0058.jpg",
    answer: "WALL·E",
    year: "2008",
    tag: "classic",
    aliases: ["WALL E", "WALL-E", "WALLE"]
  },
  {
    id: "f_35",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0059.jpg",
    answer: "THE SHINING",
    year: "1980",
    tag: "classic",
    aliases: ["SHINING"]
  },
  {
    id: "f_36",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0061.jpg",
    answer: "RAIDERS OF THE LOST ARK",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_37",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0064.jpg",
    answer: "ALIENS",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_38",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0065.jpg",
    answer: "SPIDER-MAN: INTO THE SPIDER-VERSE",
    year: "2018",
    tag: "classic",
    aliases: ["INTO THE SPIDER-VERSE", "SPIDER MAN INTO THE SPIDER VERSE", "SPIDER-MAN"]
  },
  {
    id: "f_39",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0068.jpg",
    answer: "COCO",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_40",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0078.jpg",
    answer: "JOKER",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_41",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0080.jpg",
    answer: "UP",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_42",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0081.jpg",
    answer: "STAR WARS: EPISODE VI - RETURN OF THE JEDI",
    year: "1983",
    tag: "classic",
    aliases: ["EPISODE VI - RETURN OF THE JEDI", "RETURN OF THE JEDI", "STAR WARS", "STAR WARS 6", "STAR WARS EPISODE VI RETURN OF THE JEDI"]
  },
  {
    id: "f_43",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0084.jpg",
    answer: "BRAVEHEART",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_44",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0085.jpg",
    answer: "SCARFACE",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_45",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0089.jpg",
    answer: "HEAT",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_46",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0101.jpg",
    answer: "THE WOLF OF WALL STREET",
    year: "2013",
    tag: "classic",
    aliases: ["WOLF OF WALL STREET"]
  },
  {
    id: "f_47",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0102.jpg",
    answer: "BATMAN BEGINS",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_48",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0103.jpg",
    answer: "SHUTTER ISLAND",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_49",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0105.jpg",
    answer: "THE TRUMAN SHOW",
    year: "1998",
    tag: "classic",
    aliases: ["TRUMAN SHOW"]
  },
  {
    id: "f_50",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0107.jpg",
    answer: "KILL BILL: VOL. 1",
    year: "2003",
    tag: "classic",
    aliases: ["KILL BILL", "KILL BILL VOL 1", "VOL. 1"]
  },
  {
    id: "f_51",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0109.jpg",
    answer: "FINDING NEMO",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_52",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0110.jpg",
    answer: "NO COUNTRY FOR OLD MEN",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_53",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0111.jpg",
    answer: "JURASSIC PARK",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_54",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0112.jpg",
    answer: "RESERVOIR DOGS",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_55",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0113.jpg",
    answer: "THE SIXTH SENSE",
    year: "1999",
    tag: "classic",
    aliases: ["SIXTH SENSE"]
  },
  {
    id: "f_56",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0115.jpg",
    answer: "OPPENHEIMER",
    year: "2023",
    tag: "new"
  },
  {
    id: "f_57",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0118.jpg",
    answer: "DIE HARD",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_58",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0122.jpg",
    answer: "TOP GUN: MAVERICK",
    year: "2022",
    tag: "new",
    aliases: ["MAVERICK", "TOP GUN", "TOP GUN MAVERICK"]
  },
  {
    id: "f_59",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0124.jpg",
    answer: "INDIANA JONES AND THE LAST CRUSADE",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_60",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0127.jpg",
    answer: "1917",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_61",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0138.jpg",
    answer: "HOWL'S MOVING CASTLE",
    year: "2004",
    tag: "classic",
    aliases: ["HOWL S MOVING CASTLE"]
  },
  {
    id: "f_62",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878870/imdb-top500-frame-quiz/frame_0156.jpg",
    answer: "PIRATES OF THE CARIBBEAN: THE CURSE OF THE BLACK PEARL",
    year: "2003",
    tag: "classic",
    aliases: ["CURSE OF THE BLACK PEARL", "PIRATES OF THE CARIBBEAN", "PIRATES OF THE CARIBBEAN THE CURSE OF THE BLACK PEARL", "THE CURSE OF THE BLACK PEARL"]
  },
  {
    id: "f_63",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0158.jpg",
    answer: "CATCH ME IF YOU CAN",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_64",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0159.jpg",
    answer: "V FOR VENDETTA",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_65",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0160.jpg",
    answer: "MAD MAX: FURY ROAD",
    year: "2015",
    tag: "classic",
    aliases: ["FURY ROAD", "MAD MAX", "MAD MAX FURY ROAD"]
  },
  {
    id: "f_66",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0161.jpg",
    answer: "GONE GIRL",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_67",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0163.jpg",
    answer: "SPIDER-MAN: NO WAY HOME",
    year: "2021",
    tag: "new",
    aliases: ["NO WAY HOME", "SPIDER MAN NO WAY HOME", "SPIDER-MAN"]
  },
  {
    id: "f_68",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0165.jpg",
    answer: "THE TERMINATOR",
    year: "1984",
    tag: "classic",
    aliases: ["TERMINATOR"]
  },
  {
    id: "f_69",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0166.jpg",
    answer: "THE GRAND BUDAPEST HOTEL",
    year: "2014",
    tag: "classic",
    aliases: ["GRAND BUDAPEST HOTEL"]
  },
  {
    id: "f_70",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0168.jpg",
    answer: "LOGAN",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_71",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0170.jpg",
    answer: "THE BIG LEBOWSKI",
    year: "1998",
    tag: "classic",
    aliases: ["BIG LEBOWSKI"]
  },
  {
    id: "f_72",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0173.jpg",
    answer: "BLADE RUNNER",
    year: "1982",
    tag: "classic"
  },
  {
    id: "f_73",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0183.jpg",
    answer: "JAWS",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_74",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0192.jpg",
    answer: "FORD V FERRARI",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_75",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0199.jpg",
    answer: "THE EXORCIST",
    year: "1973",
    tag: "classic",
    aliases: ["EXORCIST"]
  },
  {
    id: "f_76",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0219.jpg",
    answer: "THE SOUND OF MUSIC",
    year: "1965",
    tag: "classic",
    aliases: ["SOUND OF MUSIC"]
  },
  {
    id: "f_77",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0227.jpg",
    answer: "THE AVENGERS",
    year: "2012",
    tag: "classic",
    aliases: ["AVENGERS"]
  },
  {
    id: "f_78",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0230.jpg",
    answer: "TITANIC",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_79",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0231.jpg",
    answer: "GUARDIANS OF THE GALAXY",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_80",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0233.jpg",
    answer: "DEADPOOL",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_81",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0236.jpg",
    answer: "DUNE",
    year: "2021",
    tag: "new"
  },
  {
    id: "f_82",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0248.jpg",
    answer: "KILL BILL: VOL. 2",
    year: "2004",
    tag: "classic",
    aliases: ["KILL BILL", "KILL BILL VOL 2", "VOL. 2"]
  },
  {
    id: "f_83",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0252.jpg",
    answer: "LA LA LAND",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_84",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0253.jpg",
    answer: "BLADE RUNNER 2049",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_85",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0254.jpg",
    answer: "CASINO ROYALE",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_86",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0255.jpg",
    answer: "GROUNDHOG DAY",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_87",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0274.jpg",
    answer: "ALADDIN",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_88",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0279.jpg",
    answer: "SOUL",
    year: "2020",
    tag: "new"
  },
  {
    id: "f_89",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0302.jpg",
    answer: "AVATAR",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_90",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0305.jpg",
    answer: "IRON MAN",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_91",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0316.jpg",
    answer: "THOR: RAGNAROK",
    year: "2017",
    tag: "classic",
    aliases: ["RAGNAROK", "THOR", "THOR RAGNAROK"]
  },
  {
    id: "f_92",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0317.jpg",
    answer: "KNIVES OUT",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_93",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0322.jpg",
    answer: "EDGE OF TOMORROW",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_94",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879141/imdb-top500-frame-quiz/frame_0332.jpg",
    answer: "LIFE OF PI",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_95",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0358.jpg",
    answer: "GUARDIANS OF THE GALAXY VOL. 3",
    year: "2023",
    tag: "new",
    aliases: ["GUARDIANS OF THE GALAXY VOL 3"]
  },
  {
    id: "f_96",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0362.jpg",
    answer: "E.T. THE EXTRA-TERRESTRIAL",
    year: "1982",
    tag: "classic",
    aliases: ["E T THE EXTRA TERRESTRIAL"]
  },
  {
    id: "f_97",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0369.jpg",
    answer: "THE NIGHTMARE BEFORE CHRISTMAS",
    year: "1993",
    tag: "classic",
    aliases: ["NIGHTMARE BEFORE CHRISTMAS"]
  },
  {
    id: "f_98",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0412.jpg",
    answer: "THE BATMAN",
    year: "2022",
    tag: "new",
    aliases: ["BATMAN"]
  },
  {
    id: "f_99",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0415.jpg",
    answer: "GET OUT",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_100",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0416.jpg",
    answer: "THE SOCIAL NETWORK",
    year: "2010",
    tag: "classic",
    aliases: ["SOCIAL NETWORK"]
  },
  {
    id: "f_101",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0417.jpg",
    answer: "DUNKIRK",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_102",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0418.jpg",
    answer: "SKYFALL",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_103",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0421.jpg",
    answer: "ROGUE ONE: A STAR WARS STORY",
    year: "2016",
    tag: "classic",
    aliases: ["A STAR WARS STORY", "ROGUE ONE", "ROGUE ONE A STAR WARS STORY"]
  },
  {
    id: "f_104",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0442.jpg",
    answer: "EDWARD SCISSORHANDS",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_105",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0451.jpg",
    answer: "TRAINING DAY",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_106",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0455.jpg",
    answer: "PREDATOR",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_107",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0458.jpg",
    answer: "GHOSTBUSTERS",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_108",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0503.jpg",
    answer: "CORALINE",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_109",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0521.jpg",
    answer: "WILLY WONKA & THE CHOCOLATE FACTORY",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_110",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0548.jpg",
    answer: "MARY POPPINS",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_111",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0552.jpg",
    answer: "CAPTAIN AMERICA: THE WINTER SOLDIER",
    year: "2014",
    tag: "classic",
    aliases: ["CAPTAIN AMERICA", "CAPTAIN AMERICA THE WINTER SOLDIER", "THE WINTER SOLDIER", "WINTER SOLDIER"]
  },
  {
    id: "f_112",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0557.jpg",
    answer: "STAR WARS: EPISODE III - REVENGE OF THE SITH",
    year: "2005",
    tag: "classic",
    aliases: ["EPISODE III - REVENGE OF THE SITH", "REVENGE OF THE SITH", "STAR WARS", "STAR WARS 3", "STAR WARS EPISODE III REVENGE OF THE SITH"]
  },
  {
    id: "f_113",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0560.jpg",
    answer: "GRAVITY",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_114",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0573.jpg",
    answer: "ZODIAC",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_115",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0574.jpg",
    answer: "OCEAN'S ELEVEN",
    year: "2001",
    tag: "classic",
    aliases: ["OCEAN S ELEVEN"]
  },
  {
    id: "f_116",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0584.jpg",
    answer: "EVERYTHING EVERYWHERE ALL AT ONCE",
    year: "2022",
    tag: "new"
  },
  {
    id: "f_117",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0585.jpg",
    answer: "EX MACHINA",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_118",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0615.jpg",
    answer: "MISSION: IMPOSSIBLE - FALLOUT",
    year: "2018",
    tag: "classic",
    aliases: ["IMPOSSIBLE - FALLOUT", "MISSION", "MISSION IMPOSSIBLE FALLOUT"]
  },
  {
    id: "f_119",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0636.jpg",
    answer: "HALLOWEEN",
    year: "1978",
    tag: "classic"
  },
  {
    id: "f_120",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0714.jpg",
    answer: "ONCE UPON A TIME IN... HOLLYWOOD",
    year: "2019",
    tag: "classic",
    aliases: ["ONCE UPON A TIME IN HOLLYWOOD"]
  },
  {
    id: "f_121",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0715.jpg",
    answer: "300",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_122",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0716.jpg",
    answer: "AMERICAN PSYCHO",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_123",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0717.jpg",
    answer: "GUARDIANS OF THE GALAXY: VOL. 2",
    year: "2017",
    tag: "classic",
    aliases: ["GUARDIANS OF THE GALAXY", "GUARDIANS OF THE GALAXY VOL 2", "VOL. 2"]
  },
  {
    id: "f_124",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0723.jpg",
    answer: "DEADPOOL 2",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_125",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0740.jpg",
    answer: "MINORITY REPORT",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_126",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0741.jpg",
    answer: "KICK-ASS",
    year: "2010",
    tag: "classic",
    aliases: ["KICK ASS"]
  },
  {
    id: "f_127",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0744.jpg",
    answer: "WATCHMEN",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_128",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0745.jpg",
    answer: "RISE OF THE PLANET OF THE APES",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_129",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0749.jpg",
    answer: "THE FIFTH ELEMENT",
    year: "1997",
    tag: "classic",
    aliases: ["FIFTH ELEMENT"]
  },
  {
    id: "f_130",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0755.jpg",
    answer: "SAW",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_131",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0776.jpg",
    answer: "DIE HARD WITH A VENGEANCE",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_132",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881832/imdb-top500-frame-quiz/frame_0786.jpg",
    answer: "JOHN WICK: CHAPTER 4",
    year: "2023",
    tag: "new",
    aliases: ["CHAPTER 4", "JOHN WICK", "JOHN WICK CHAPTER 4"]
  },
  {
    id: "f_133",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0818.jpg",
    answer: "CREED",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_134",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0821.jpg",
    answer: "MISSION: IMPOSSIBLE - DEAD RECKONING PART ONE",
    year: "2023",
    tag: "new",
    aliases: ["IMPOSSIBLE - DEAD RECKONING PART ONE", "MISSION", "MISSION IMPOSSIBLE DEAD RECKONING PART ONE"]
  },
  {
    id: "f_135",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0824.jpg",
    answer: "TOY STORY 4",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_136",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0833.jpg",
    answer: "THE LITTLE MERMAID",
    year: "1989",
    tag: "classic",
    aliases: ["LITTLE MERMAID"]
  },
  {
    id: "f_137",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0835.jpg",
    answer: "ROBOCOP",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_138",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0950.jpg",
    answer: "DOCTOR STRANGE",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_139",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0953.jpg",
    answer: "JOHN WICK",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_140",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0954.jpg",
    answer: "SPIDER-MAN 2",
    year: "2004",
    tag: "classic",
    aliases: ["SPIDER MAN 2"]
  },
  {
    id: "f_141",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0962.jpg",
    answer: "BABY DRIVER",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_142",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0967.jpg",
    answer: "A QUIET PLACE",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_143",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0970.jpg",
    answer: "AVATAR: THE WAY OF WATER",
    year: "2022",
    tag: "new",
    aliases: ["AVATAR", "AVATAR THE WAY OF WATER", "THE WAY OF WATER", "WAY OF WATER"]
  },
  {
    id: "f_144",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0972.jpg",
    answer: "THE CONJURING",
    year: "2013",
    tag: "classic",
    aliases: ["CONJURING"]
  },
  {
    id: "f_145",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_0989.jpg",
    answer: "BACK TO THE FUTURE PART III",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_146",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_0994.jpg",
    answer: "SCOTT PILGRIM VS. THE WORLD",
    year: "2010",
    tag: "classic",
    aliases: ["SCOTT PILGRIM VS THE WORLD"]
  },
  {
    id: "f_147",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1010.jpg",
    answer: "BATMAN",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_148",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1027.jpg",
    answer: "TOTAL RECALL",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_149",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_1038.jpg",
    answer: "THE GREATEST SHOWMAN",
    year: "2017",
    tag: "classic",
    aliases: ["GREATEST SHOWMAN"]
  },
// ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──
  // ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──
  // ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──
  // ── Guess The Dialogue (400 Curated Dialogues: 200 Bollywood + 200 Hollywood) ──
  ...DIALOGUE_CATALOG,

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

  // ── Tie Breaker (Popular Global Blockbusters Only) ──
  {
    id: "tb_1",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Batman (2022).webp",
    answer: "THE BATMAN",
    year: "2022"
  },
  {
    id: "tb_2",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/The Wolf of Wall Street (2013).webp",
    answer: "THE WOLF OF WALL STREET",
    year: "2013"
  },
  {
    id: "tb_3",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Top Gun Maverick (2022).webp",
    answer: "TOP GUN MAVERICK",
    year: "2022"
  },
  {
    id: "tb_4",
    category: "tie_breaker",
    type: "image",
    content: "/tie_breaker/Mad Max 2.jpg.webp",
    answer: "MAD MAX 2",
    year: "1981"
  }
];
