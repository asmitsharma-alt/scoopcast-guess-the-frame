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
    id: "f_1",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0001.jpg",,
    answer: "THE SHAWSHANK REDEMPTION",,
    year: "1994",,
    tag: "classic",
    aliases: ["SHAWSHANK REDEMPTION"]
  },
  {
    id: "f_2",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878459/imdb-top500-frame-quiz/frame_0002.jpg",,
    answer: "THE GODFATHER",,
    year: "1972",,
    tag: "classic",
    aliases: ["GODFATHER"]
  },
  {
    id: "f_3",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0003.jpg",,
    answer: "THE DARK KNIGHT",,
    year: "2008",,
    tag: "classic",
    aliases: ["DARK KNIGHT"]
  },
  {
    id: "f_4",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0004.jpg",,
    answer: "THE LORD OF THE RINGS: THE RETURN OF THE KING",,
    year: "2003",,
    tag: "classic",
    aliases: ["LORD OF THE RINGS", "LORD OF THE RINGS 3", "LORD OF THE RINGS THE RETURN OF THE KING", "LORD OF THE RINGS: THE RETURN OF THE KING", "LOTR", "LOTR 3", "RETURN OF THE KING", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE RETURN OF THE KING", "THE RETURN OF THE KING"]
  },
  {
    id: "f_5",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878545/imdb-top500-frame-quiz/frame_0005.jpg",,
    answer: "SCHINDLER'S LIST",,
    year: "1993",,
    tag: "classic",
    aliases: ["SCHINDLER S LIST"]
  },
  {
    id: "f_6",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878545/imdb-top500-frame-quiz/frame_0006.jpg",,
    answer: "THE GODFATHER PART II",,
    year: "1974",,
    tag: "classic",
    aliases: ["GODFATHER 2", "GODFATHER PART 2", "GODFATHER PART II", "THE GODFATHER 2"]
  },
  {
    id: "f_7",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878459/imdb-top500-frame-quiz/frame_0007.jpg",,
    answer: "12 ANGRY MEN",,
    year: "1957",,
    tag: "classic"
  },
  {
    id: "f_8",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0008.jpg",,
    answer: "THE LORD OF THE RINGS: THE FELLOWSHIP OF THE RING",,
    year: "2001",,
    tag: "classic",
    aliases: ["FELLOWSHIP OF THE RING", "LORD OF THE RINGS", "LORD OF THE RINGS 1", "LORD OF THE RINGS THE FELLOWSHIP OF THE RING", "LORD OF THE RINGS: THE FELLOWSHIP OF THE RING", "LOTR", "LOTR 1", "THE FELLOWSHIP OF THE RING", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE FELLOWSHIP OF THE RING"]
  },
  {
    id: "f_9",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878545/imdb-top500-frame-quiz/frame_0009.jpg",,
    answer: "INCEPTION",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_10",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0010.jpg",,
    answer: "FIGHT CLUB",,
    year: "1999",,
    tag: "classic",
    displayAnswer: "***** ****"
  },
  {
    id: "f_11",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878354/imdb-top500-frame-quiz/frame_0011.jpg",,
    answer: "FORREST GUMP",,
    year: "1994",,
    tag: "classic"
  },
  {
    id: "f_12",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878575/imdb-top500-frame-quiz/frame_0012.jpg",,
    answer: "PULP FICTION",,
    year: "1994",,
    tag: "classic"
  },
  {
    id: "f_13",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0013.jpg",,
    answer: "THE LORD OF THE RINGS: THE TWO TOWERS",,
    year: "2002",,
    tag: "classic",
    aliases: ["LORD OF THE RINGS", "LORD OF THE RINGS 2", "LORD OF THE RINGS THE TWO TOWERS", "LORD OF THE RINGS: THE TWO TOWERS", "LOTR", "LOTR 2", "THE LORD OF THE RINGS", "THE LORD OF THE RINGS THE TWO TOWERS", "THE TWO TOWERS", "TWO TOWERS"]
  },
  {
    id: "f_14",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0014.jpg",,
    answer: "THE GOOD, THE BAD AND THE UGLY",,
    year: "1966",,
    tag: "classic",
    aliases: ["GOOD THE BAD AND THE UGLY", "GOOD, THE BAD AND THE UGLY", "THE GOOD THE BAD AND THE UGLY"]
  },
  {
    id: "f_15",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0015.jpg",,
    answer: "INTERSTELLAR",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_16",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0017.jpg",,
    answer: "STAR WARS: EPISODE V - THE EMPIRE STRIKES BACK",,
    year: "1980",,
    tag: "classic",
    aliases: ["EMPIRE STRIKES BACK", "EPISODE V - THE EMPIRE STRIKES BACK", "STAR WARS", "STAR WARS 5", "STAR WARS EPISODE V THE EMPIRE STRIKES BACK", "THE EMPIRE STRIKES BACK"]
  },
  {
    id: "f_17",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0018.jpg",,
    answer: "GOODFELLAS",,
    year: "1990",,
    tag: "classic",
    aliases: ["GOOD FELLAS"]
  },
  {
    id: "f_18",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0019.jpg",,
    answer: "SEVEN",,
    year: "1995",,
    tag: "classic",
    aliases: ["SE7EN"]
  },
  {
    id: "f_19",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0020.jpg",,
    answer: "THE SILENCE OF THE LAMBS",,
    year: "1991",,
    tag: "classic",
    aliases: ["SILENCE OF THE LAMBS"]
  },
  {
    id: "f_20",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878576/imdb-top500-frame-quiz/frame_0022.jpg",,
    answer: "STAR WARS: EPISODE IV - A NEW HOPE",,
    year: "1977",,
    tag: "classic",
    aliases: ["A NEW HOPE", "EPISODE IV - A NEW HOPE", "STAR WARS", "STAR WARS 4", "STAR WARS EPISODE IV A NEW HOPE"]
  },
  {
    id: "f_21",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0023.jpg",,
    answer: "THE GREEN MILE",,
    year: "1999",,
    tag: "classic",
    aliases: ["GREEN MILE"]
  },
  {
    id: "f_22",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0024.jpg",,
    answer: "TERMINATOR 2: JUDGMENT DAY",,
    year: "1991",,
    tag: "classic",
    aliases: ["JUDGMENT DAY", "T2", "TERMINATOR 2", "TERMINATOR 2 JUDGMENT DAY"]
  },
  {
    id: "f_23",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0025.jpg",,
    answer: "ONE FLEW OVER THE CUCKOO'S NEST",,
    year: "1975",,
    tag: "classic",
    aliases: ["ONE FLEW OVER THE CUCKOO S NEST"]
  },
  {
    id: "f_24",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878610/imdb-top500-frame-quiz/frame_0026.jpg",,
    answer: "SPIRITED AWAY",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_25",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878610/imdb-top500-frame-quiz/frame_0027.jpg",,
    answer: "CITY OF GOD",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_26",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0029.jpg",,
    answer: "IT'S A WONDERFUL LIFE",,
    year: "1946",,
    tag: "classic",
    aliases: ["IT S A WONDERFUL LIFE"]
  },
  {
    id: "f_27",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0031.jpg",,
    answer: "DJANGO UNCHAINED",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_28",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0033.jpg",,
    answer: "THE PRESTIGE",,
    year: "2006",,
    tag: "classic",
    aliases: ["PRESTIGE"]
  },
  {
    id: "f_29",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0034.jpg",,
    answer: "THE DEPARTED",,
    year: "2006",,
    tag: "classic",
    aliases: ["DEPARTED"]
  },
  {
    id: "f_30",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878611/imdb-top500-frame-quiz/frame_0035.jpg",,
    answer: "BACK TO THE FUTURE",,
    year: "1985",,
    tag: "classic"
  },
  {
    id: "f_31",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0037.jpg",,
    answer: "AMERICAN HISTORY X",,
    year: "1998",,
    tag: "classic"
  },
  {
    id: "f_32",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0038.jpg",,
    answer: "THE LION KING",,
    year: "1994",,
    tag: "classic",
    aliases: ["LION KING"]
  },
  {
    id: "f_33",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0039.jpg",,
    answer: "THE USUAL SUSPECTS",,
    year: "1995",,
    tag: "classic",
    aliases: ["USUAL SUSPECTS"]
  },
  {
    id: "f_34",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0040.jpg",,
    answer: "PARASITE",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_35",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0041.jpg",,
    answer: "WHIPLASH",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_36",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0043.jpg",,
    answer: "THE PIANIST",,
    year: "2002",,
    tag: "classic",
    aliases: ["PIANIST"]
  },
  {
    id: "f_37",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0045.jpg",,
    answer: "PSYCHO",,
    year: "1960",,
    tag: "classic"
  },
  {
    id: "f_38",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0046.jpg",,
    answer: "CASABLANCA",,
    year: "1942",,
    tag: "classic"
  },
  {
    id: "f_39",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0047.jpg",,
    answer: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",,
    year: "2023",,
    tag: "new",
    aliases: ["ACROSS THE SPIDER-VERSE", "SPIDER MAN ACROSS THE SPIDER VERSE", "SPIDER-MAN"]
  },
  {
    id: "f_40",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878638/imdb-top500-frame-quiz/frame_0050.jpg",,
    answer: "GRAVE OF THE FIREFLIES",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_41",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0051.jpg",,
    answer: "ONCE UPON A TIME IN THE WEST",,
    year: "1968",,
    tag: "classic"
  },
  {
    id: "f_42",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0052.jpg",,
    answer: "THE DARK KNIGHT RISES",,
    year: "2012",,
    tag: "classic",
    aliases: ["DARK KNIGHT RISES"]
  },
  {
    id: "f_43",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0053.jpg",,
    answer: "INGLOURIOUS BASTERDS",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_44",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878670/imdb-top500-frame-quiz/frame_0054.jpg",,
    answer: "AVENGERS: ENDGAME",,
    year: "2019",,
    tag: "classic",
    aliases: ["AVENGERS", "AVENGERS ENDGAME", "ENDGAME"]
  },
  {
    id: "f_45",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0055.jpg",,
    answer: "MEMENTO",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_46",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0056.jpg",,
    answer: "AVENGERS: INFINITY WAR",,
    year: "2018",,
    tag: "classic",
    aliases: ["AVENGERS", "AVENGERS INFINITY WAR", "INFINITY WAR"]
  },
  {
    id: "f_47",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0057.jpg",,
    answer: "CINEMA PARADISO",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_48",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878670/imdb-top500-frame-quiz/frame_0058.jpg",,
    answer: "WALL·E",,
    year: "2008",,
    tag: "classic",
    aliases: ["WALL E", "WALL-E", "WALLE"]
  },
  {
    id: "f_49",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0059.jpg",,
    answer: "THE SHINING",,
    year: "1980",,
    tag: "classic",
    aliases: ["SHINING"]
  },
  {
    id: "f_50",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878671/imdb-top500-frame-quiz/frame_0061.jpg",,
    answer: "RAIDERS OF THE LOST ARK",,
    year: "1981",,
    tag: "classic"
  },
  {
    id: "f_51",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0063.jpg",,
    answer: "MODERN TIMES",,
    year: "1936",,
    tag: "classic"
  },
  {
    id: "f_52",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0064.jpg",,
    answer: "ALIENS",,
    year: "1986",,
    tag: "classic"
  },
  {
    id: "f_53",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0065.jpg",,
    answer: "SPIDER-MAN: INTO THE SPIDER-VERSE",,
    year: "2018",,
    tag: "classic",
    aliases: ["INTO THE SPIDER-VERSE", "SPIDER MAN INTO THE SPIDER VERSE", "SPIDER-MAN"]
  },
  {
    id: "f_54",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0067.jpg",,
    answer: "APOCALYPSE NOW",,
    year: "1979",,
    tag: "classic"
  },
  {
    id: "f_55",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0068.jpg",,
    answer: "COCO",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_56",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0070.jpg",,
    answer: "REAR WINDOW",,
    year: "1954",,
    tag: "classic"
  },
  {
    id: "f_57",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0074.jpg",,
    answer: "CITY LIGHTS",,
    year: "1931",,
    tag: "classic"
  },
  {
    id: "f_58",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0075.jpg",,
    answer: "THE LIVES OF OTHERS",,
    year: "2006",,
    tag: "classic",
    aliases: ["LIVES OF OTHERS"]
  },
  {
    id: "f_59",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0076.jpg",,
    answer: "YOUR NAME.",,
    year: "2016",,
    tag: "classic",
    aliases: ["YOUR NAME"]
  },
  {
    id: "f_60",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878703/imdb-top500-frame-quiz/frame_0078.jpg",,
    answer: "JOKER",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_61",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0079.jpg",,
    answer: "AMERICAN BEAUTY",,
    year: "1999",,
    tag: "classic"
  },
  {
    id: "f_62",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0080.jpg",,
    answer: "UP",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_63",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0081.jpg",,
    answer: "STAR WARS: EPISODE VI - RETURN OF THE JEDI",,
    year: "1983",,
    tag: "classic",
    aliases: ["EPISODE VI - RETURN OF THE JEDI", "RETURN OF THE JEDI", "STAR WARS", "STAR WARS 6", "STAR WARS EPISODE VI RETURN OF THE JEDI"]
  },
  {
    id: "f_64",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0083.jpg",,
    answer: "ETERNAL SUNSHINE OF THE SPOTLESS MIND",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_65",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0084.jpg",,
    answer: "BRAVEHEART",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_66",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0085.jpg",,
    answer: "SCARFACE",,
    year: "1983",,
    tag: "classic"
  },
  {
    id: "f_67",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0088.jpg",,
    answer: "REQUIEM FOR A DREAM",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_68",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0089.jpg",,
    answer: "HEAT",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_69",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0090.jpg",,
    answer: "SUNSET BOULEVARD",,
    year: "1950",,
    tag: "classic"
  },
  {
    id: "f_70",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878727/imdb-top500-frame-quiz/frame_0091.jpg",,
    answer: "2001: A SPACE ODYSSEY",,
    year: "1968",,
    tag: "classic",
    aliases: ["2001", "2001 A SPACE ODYSSEY", "A SPACE ODYSSEY"]
  },
  {
    id: "f_71",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0092.jpg",,
    answer: "THE GREAT DICTATOR",,
    year: "1940",,
    tag: "classic",
    aliases: ["GREAT DICTATOR"]
  },
  {
    id: "f_72",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0093.jpg",,
    answer: "OLDBOY",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_73",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0094.jpg",,
    answer: "PATHS OF GLORY",,
    year: "1957",,
    tag: "classic"
  },
  {
    id: "f_74",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0095.jpg",,
    answer: "DR. STRANGELOVE OR: HOW I LEARNED TO STOP WORRYING AND LOVE THE BOMB",,
    year: "1964",,
    tag: "classic",
    aliases: ["DR STRANGELOVE OR HOW I LEARNED TO STOP WORRYING AND LOVE THE BOMB", "DR. STRANGELOVE OR", "HOW I LEARNED TO STOP WORRYING AND LOVE THE BOMB"]
  },
  {
    id: "f_75",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0096.jpg",,
    answer: "PRINCESS MONONOKE",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_76",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0098.jpg",,
    answer: "ONCE UPON A TIME IN AMERICA",,
    year: "1984",,
    tag: "classic"
  },
  {
    id: "f_77",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0100.jpg",,
    answer: "LAWRENCE OF ARABIA",,
    year: "1962",,
    tag: "classic"
  },
  {
    id: "f_78",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0101.jpg",,
    answer: "THE WOLF OF WALL STREET",,
    year: "2013",,
    tag: "classic",
    aliases: ["WOLF OF WALL STREET"]
  },
  {
    id: "f_79",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0102.jpg",,
    answer: "BATMAN BEGINS",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_80",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878755/imdb-top500-frame-quiz/frame_0103.jpg",,
    answer: "SHUTTER ISLAND",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_81",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0105.jpg",,
    answer: "THE TRUMAN SHOW",,
    year: "1998",,
    tag: "classic",
    aliases: ["TRUMAN SHOW"]
  },
  {
    id: "f_82",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0106.jpg",,
    answer: "DAS BOOT",,
    year: "1981",,
    tag: "classic"
  },
  {
    id: "f_83",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0107.jpg",,
    answer: "KILL BILL: VOL. 1",,
    year: "2003",,
    tag: "classic",
    aliases: ["KILL BILL", "KILL BILL VOL 1", "VOL. 1"]
  },
  {
    id: "f_84",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0108.jpg",,
    answer: "SINGIN' IN THE RAIN",,
    year: "1952",,
    tag: "classic",
    aliases: ["SINGIN IN THE RAIN"]
  },
  {
    id: "f_85",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0109.jpg",,
    answer: "FINDING NEMO",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_86",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0110.jpg",,
    answer: "NO COUNTRY FOR OLD MEN",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_87",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0111.jpg",,
    answer: "JURASSIC PARK",,
    year: "1993",,
    tag: "classic"
  },
  {
    id: "f_88",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0112.jpg",,
    answer: "RESERVOIR DOGS",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_89",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0113.jpg",,
    answer: "THE SIXTH SENSE",,
    year: "1999",,
    tag: "classic",
    aliases: ["SIXTH SENSE"]
  },
  {
    id: "f_90",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878783/imdb-top500-frame-quiz/frame_0115.jpg",,
    answer: "OPPENHEIMER",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_91",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0117.jpg",,
    answer: "TAXI DRIVER",,
    year: "1976",,
    tag: "classic"
  },
  {
    id: "f_92",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0118.jpg",,
    answer: "DIE HARD",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_93",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0120.jpg",,
    answer: "PRISONERS",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_94",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0121.jpg",,
    answer: "A CLOCKWORK ORANGE",,
    year: "1971",,
    tag: "classic"
  },
  {
    id: "f_95",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0122.jpg",,
    answer: "TOP GUN: MAVERICK",,
    year: "2022",,
    tag: "new",
    aliases: ["MAVERICK", "TOP GUN", "TOP GUN MAVERICK"]
  },
  {
    id: "f_96",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0123.jpg",,
    answer: "INCENDIES",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_97",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0124.jpg",,
    answer: "INDIANA JONES AND THE LAST CRUSADE",,
    year: "1989",,
    tag: "classic"
  },
  {
    id: "f_98",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0125.jpg",,
    answer: "FULL METAL JACKET",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_99",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0126.jpg",,
    answer: "AMÉLIE",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_100",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878810/imdb-top500-frame-quiz/frame_0127.jpg",,
    answer: "1917",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_101",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0130.jpg",,
    answer: "THERE WILL BE BLOOD",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_102",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0133.jpg",,
    answer: "L.A. CONFIDENTIAL",,
    year: "1997",,
    tag: "classic",
    aliases: ["L A CONFIDENTIAL"]
  },
  {
    id: "f_103",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0135.jpg",,
    answer: "THE APARTMENT",,
    year: "1960",,
    tag: "classic",
    aliases: ["APARTMENT"]
  },
  {
    id: "f_104",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0137.jpg",,
    answer: "THE THING",,
    year: "1982",,
    tag: "classic",
    aliases: ["THING"]
  },
  {
    id: "f_105",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0138.jpg",,
    answer: "HOWL'S MOVING CASTLE",,
    year: "2004",,
    tag: "classic",
    aliases: ["HOWL S MOVING CASTLE"]
  },
  {
    id: "f_106",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878843/imdb-top500-frame-quiz/frame_0139.jpg",,
    answer: "CITIZEN KANE",,
    year: "1941",,
    tag: "classic"
  },
  {
    id: "f_107",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0140.jpg",,
    answer: "UNFORGIVEN",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_108",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0141.jpg",,
    answer: "VERTIGO",,
    year: "1958",,
    tag: "classic"
  },
  {
    id: "f_109",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878842/imdb-top500-frame-quiz/frame_0144.jpg",,
    answer: "DOWNFALL",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_110",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878843/imdb-top500-frame-quiz/frame_0145.jpg",,
    answer: "M",,
    year: "1931",,
    tag: "classic"
  },
  {
    id: "f_111",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878870/imdb-top500-frame-quiz/frame_0146.jpg",,
    answer: "DOUBLE INDEMNITY",,
    year: "1944",,
    tag: "classic"
  },
  {
    id: "f_112",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0147.jpg",,
    answer: "NORTH BY NORTHWEST",,
    year: "1959",,
    tag: "classic"
  },
  {
    id: "f_113",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0148.jpg",,
    answer: "GONE WITH THE WIND",,
    year: "1939",,
    tag: "classic"
  },
  {
    id: "f_114",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0149.jpg",,
    answer: "TO KILL A MOCKINGBIRD",,
    year: "1962",,
    tag: "classic"
  },
  {
    id: "f_115",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0151.jpg",,
    answer: "SOME LIKE IT HOT",,
    year: "1959",,
    tag: "classic"
  },
  {
    id: "f_116",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880601/imdb-top500-frame-quiz/frame_0153.jpg",,
    answer: "FOR A FEW DOLLARS MORE",,
    year: "1965",,
    tag: "classic"
  },
  {
    id: "f_117",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0154.jpg",,
    answer: "THE ELEPHANT MAN",,
    year: "1980",,
    tag: "classic",
    aliases: ["ELEPHANT MAN"]
  },
  {
    id: "f_118",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878870/imdb-top500-frame-quiz/frame_0156.jpg",,
    answer: "PIRATES OF THE CARIBBEAN: THE CURSE OF THE BLACK PEARL",,
    year: "2003",,
    tag: "classic",
    aliases: ["CURSE OF THE BLACK PEARL", "PIRATES OF THE CARIBBEAN", "PIRATES OF THE CARIBBEAN THE CURSE OF THE BLACK PEARL", "THE CURSE OF THE BLACK PEARL"]
  },
  {
    id: "f_119",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878871/imdb-top500-frame-quiz/frame_0158.jpg",,
    answer: "CATCH ME IF YOU CAN",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_120",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881309/imdb-top500-frame-quiz/frame_0159.jpg",,
    answer: "V FOR VENDETTA",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_121",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0160.jpg",,
    answer: "MAD MAX: FURY ROAD",,
    year: "2015",,
    tag: "classic",
    aliases: ["FURY ROAD", "MAD MAX", "MAD MAX FURY ROAD"]
  },
  {
    id: "f_122",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0161.jpg",,
    answer: "GONE GIRL",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_123",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0163.jpg",,
    answer: "SPIDER-MAN: NO WAY HOME",,
    year: "2021",,
    tag: "new",
    aliases: ["NO WAY HOME", "SPIDER MAN NO WAY HOME", "SPIDER-MAN"]
  },
  {
    id: "f_124",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0165.jpg",,
    answer: "THE TERMINATOR",,
    year: "1984",,
    tag: "classic",
    aliases: ["TERMINATOR"]
  },
  {
    id: "f_125",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0166.jpg",,
    answer: "THE GRAND BUDAPEST HOTEL",,
    year: "2014",,
    tag: "classic",
    aliases: ["GRAND BUDAPEST HOTEL"]
  },
  {
    id: "f_126",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0168.jpg",,
    answer: "LOGAN",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_127",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0170.jpg",,
    answer: "THE BIG LEBOWSKI",,
    year: "1998",,
    tag: "classic",
    aliases: ["BIG LEBOWSKI"]
  },
  {
    id: "f_128",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0173.jpg",,
    answer: "BLADE RUNNER",,
    year: "1982",,
    tag: "classic"
  },
  {
    id: "f_129",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0174.jpg",,
    answer: "GRAN TORINO",,
    year: "2008",,
    tag: "classic"
  },
  {
    id: "f_130",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878901/imdb-top500-frame-quiz/frame_0178.jpg",,
    answer: "FARGO",,
    year: "1996",,
    tag: "classic"
  },
  {
    id: "f_131",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0179.jpg",,
    answer: "12 YEARS A SLAVE",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_132",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0180.jpg",,
    answer: "TRAINSPOTTING",,
    year: "1996",,
    tag: "classic"
  },
  {
    id: "f_133",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0183.jpg",,
    answer: "JAWS",,
    year: "1975",,
    tag: "classic"
  },
  {
    id: "f_134",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0192.jpg",,
    answer: "FORD V FERRARI",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_135",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0193.jpg",,
    answer: "RUSH",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_136",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0197.jpg",,
    answer: "COME AND SEE",,
    year: "1985",,
    tag: "classic"
  },
  {
    id: "f_137",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0198.jpg",,
    answer: "METROPOLIS",,
    year: "1927",,
    tag: "classic"
  },
  {
    id: "f_138",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0199.jpg",,
    answer: "THE EXORCIST",,
    year: "1973",,
    tag: "classic",
    aliases: ["EXORCIST"]
  },
  {
    id: "f_139",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0200.jpg",,
    answer: "STAND BY ME",,
    year: "1986",,
    tag: "classic"
  },
  {
    id: "f_140",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878935/imdb-top500-frame-quiz/frame_0202.jpg",,
    answer: "THE WIZARD OF OZ",,
    year: "1939",,
    tag: "classic",
    aliases: ["WIZARD OF OZ"]
  },
  {
    id: "f_141",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0204.jpg",,
    answer: "MY NEIGHBOR TOTORO",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_142",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0206.jpg",,
    answer: "RAGING BULL",,
    year: "1980",,
    tag: "classic"
  },
  {
    id: "f_143",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0209.jpg",,
    answer: "THE DEER HUNTER",,
    year: "1978",,
    tag: "classic",
    aliases: ["DEER HUNTER"]
  },
  {
    id: "f_144",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0212.jpg",,
    answer: "CHINATOWN",,
    year: "1974",,
    tag: "classic"
  },
  {
    id: "f_145",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0217.jpg",,
    answer: "BEFORE SUNSET",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_146",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0219.jpg",,
    answer: "THE SOUND OF MUSIC",,
    year: "1965",,
    tag: "classic",
    aliases: ["SOUND OF MUSIC"]
  },
  {
    id: "f_147",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0224.jpg",,
    answer: "MEMORIES OF MURDER",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_148",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0226.jpg",,
    answer: "THE KID",,
    year: "1921",,
    tag: "classic",
    aliases: ["KID"]
  },
  {
    id: "f_149",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790878973/imdb-top500-frame-quiz/frame_0227.jpg",,
    answer: "THE AVENGERS",,
    year: "2012",,
    tag: "classic",
    aliases: ["AVENGERS"]
  },
  {
    id: "f_150",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0230.jpg",,
    answer: "TITANIC",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_151",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0231.jpg",,
    answer: "GUARDIANS OF THE GALAXY",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_152",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0233.jpg",,
    answer: "DEADPOOL",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_153",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0236.jpg",,
    answer: "DUNE",,
    year: "2021",,
    tag: "new"
  },
  {
    id: "f_154",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0243.jpg",,
    answer: "DONNIE DARKO",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_155",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0246.jpg",,
    answer: "BLACK SWAN",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_156",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0247.jpg",,
    answer: "THE IMITATION GAME",,
    year: "2014",,
    tag: "classic",
    aliases: ["IMITATION GAME"]
  },
  {
    id: "f_157",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0248.jpg",,
    answer: "KILL BILL: VOL. 2",,
    year: "2004",,
    tag: "classic",
    aliases: ["KILL BILL", "KILL BILL VOL 2", "VOL. 2"]
  },
  {
    id: "f_158",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0249.jpg",,
    answer: "LA HAINE",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_159",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0250.jpg",,
    answer: "SIN CITY",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_160",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879016/imdb-top500-frame-quiz/frame_0252.jpg",,
    answer: "LA LA LAND",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_161",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0253.jpg",,
    answer: "BLADE RUNNER 2049",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_162",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0254.jpg",,
    answer: "CASINO ROYALE",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_163",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0255.jpg",,
    answer: "GROUNDHOG DAY",,
    year: "1993",,
    tag: "classic"
  },
  {
    id: "f_164",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0256.jpg",,
    answer: "THE KING'S SPEECH",,
    year: "2010",,
    tag: "classic",
    aliases: ["KING S SPEECH", "KING'S SPEECH", "THE KING S SPEECH"]
  },
  {
    id: "f_165",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0257.jpg",,
    answer: "THE SEVENTH SEAL",,
    year: "1957",,
    tag: "classic",
    aliases: ["SEVENTH SEAL"]
  },
  {
    id: "f_166",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0258.jpg",,
    answer: "INTO THE WILD",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_167",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0260.jpg",,
    answer: "12 MONKEYS",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_168",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0265.jpg",,
    answer: "THE HANDMAIDEN",,
    year: "2016",,
    tag: "classic",
    aliases: ["HANDMAIDEN"]
  },
  {
    id: "f_169",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879040/imdb-top500-frame-quiz/frame_0266.jpg",,
    answer: "BARRY LYNDON",,
    year: "1975",,
    tag: "classic"
  },
  {
    id: "f_170",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0270.jpg",,
    answer: "MARY AND MAX",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_171",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0274.jpg",,
    answer: "ALADDIN",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_172",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0278.jpg",,
    answer: "PLATOON",,
    year: "1986",,
    tag: "classic"
  },
  {
    id: "f_173",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0279.jpg",,
    answer: "SOUL",,
    year: "2020",,
    tag: "new"
  },
  {
    id: "f_174",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0287.jpg",,
    answer: "MAGNOLIA",,
    year: "1999",,
    tag: "classic"
  },
  {
    id: "f_175",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0291.jpg",,
    answer: "DANCES WITH WOLVES",,
    year: "1990",,
    tag: "classic"
  },
  {
    id: "f_176",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0292.jpg",,
    answer: "THE GRADUATE",,
    year: "1967",,
    tag: "classic",
    aliases: ["GRADUATE"]
  },
  {
    id: "f_177",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0296.jpg",,
    answer: "PARIS, TEXAS",,
    year: "1984",,
    tag: "classic",
    aliases: ["PARIS TEXAS"]
  },
  {
    id: "f_178",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0298.jpg",,
    answer: "AMORES PERROS",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_179",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0301.jpg",,
    answer: "ROSEMARY'S BABY",,
    year: "1968",,
    tag: "classic",
    aliases: ["ROSEMARY S BABY"]
  },
  {
    id: "f_180",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879077/imdb-top500-frame-quiz/frame_0302.jpg",,
    answer: "AVATAR",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_181",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0304.jpg",,
    answer: "IP MAN",,
    year: "2008",,
    tag: "classic"
  },
  {
    id: "f_182",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0305.jpg",,
    answer: "IRON MAN",,
    year: "2008",,
    tag: "classic"
  },
  {
    id: "f_183",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0306.jpg",,
    answer: "BUTCH CASSIDY AND THE SUNDANCE KID",,
    year: "1969",,
    tag: "classic"
  },
  {
    id: "f_184",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0312.jpg",,
    answer: "AKIRA",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_185",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0313.jpg",,
    answer: "THE GOLD RUSH",,
    year: "1925",,
    tag: "classic",
    aliases: ["GOLD RUSH"]
  },
  {
    id: "f_186",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0316.jpg",,
    answer: "THOR: RAGNAROK",,
    year: "2017",,
    tag: "classic",
    aliases: ["RAGNAROK", "THOR", "THOR RAGNAROK"]
  },
  {
    id: "f_187",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0317.jpg",,
    answer: "KNIVES OUT",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_188",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0318.jpg",,
    answer: "ARRIVAL",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_189",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0319.jpg",,
    answer: "WILD STRAWBERRIES",,
    year: "1957",,
    tag: "classic"
  },
  {
    id: "f_190",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879104/imdb-top500-frame-quiz/frame_0322.jpg",,
    answer: "EDGE OF TOMORROW",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_191",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879141/imdb-top500-frame-quiz/frame_0325.jpg",,
    answer: "PLANET OF THE APES",,
    year: "1968",,
    tag: "classic"
  },
  {
    id: "f_192",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879142/imdb-top500-frame-quiz/frame_0330.jpg",,
    answer: "HER",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_193",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879141/imdb-top500-frame-quiz/frame_0332.jpg",,
    answer: "LIFE OF PI",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_194",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879142/imdb-top500-frame-quiz/frame_0333.jpg",,
    answer: "IT HAPPENED ONE NIGHT",,
    year: "1934",,
    tag: "classic"
  },
  {
    id: "f_195",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879141/imdb-top500-frame-quiz/frame_0336.jpg",,
    answer: "CASTLE IN THE SKY",,
    year: "1986",,
    tag: "classic"
  },
  {
    id: "f_196",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879141/imdb-top500-frame-quiz/frame_0339.jpg",,
    answer: "NAUSICAÄ OF THE VALLEY OF THE WIND",,
    year: "1984",,
    tag: "classic"
  },
  {
    id: "f_197",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0340.jpg",,
    answer: "COOL HAND LUKE",,
    year: "1967",,
    tag: "classic"
  },
  {
    id: "f_198",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879142/imdb-top500-frame-quiz/frame_0345.jpg",,
    answer: "CHILDREN OF MEN",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_199",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879142/imdb-top500-frame-quiz/frame_0346.jpg",,
    answer: "IN THE MOOD FOR LOVE",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_200",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879142/imdb-top500-frame-quiz/frame_0354.jpg",,
    answer: "JFK",,
    year: "1991",,
    tag: "classic"
  },
  {
    id: "f_201",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0356.jpg",,
    answer: "JOJO RABBIT",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_202",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0358.jpg",,
    answer: "GUARDIANS OF THE GALAXY VOL. 3",,
    year: "2023",,
    tag: "new",
    aliases: ["GUARDIANS OF THE GALAXY VOL 3"]
  },
  {
    id: "f_203",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0362.jpg",,
    answer: "E.T. THE EXTRA-TERRESTRIAL",,
    year: "1982",,
    tag: "classic",
    aliases: ["E T THE EXTRA TERRESTRIAL"]
  },
  {
    id: "f_204",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0363.jpg",,
    answer: "BARAKA",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_205",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0365.jpg",,
    answer: "THE GRAPES OF WRATH",,
    year: "1940",,
    tag: "classic",
    aliases: ["GRAPES OF WRATH"]
  },
  {
    id: "f_206",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0366.jpg",,
    answer: "MULHOLLAND DRIVE",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_207",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0369.jpg",,
    answer: "THE NIGHTMARE BEFORE CHRISTMAS",,
    year: "1993",,
    tag: "classic",
    aliases: ["NIGHTMARE BEFORE CHRISTMAS"]
  },
  {
    id: "f_208",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881354/imdb-top500-frame-quiz/frame_0372.jpg",,
    answer: "DOGVILLE",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_209",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0375.jpg",,
    answer: "BOYHOOD",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_210",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879406/imdb-top500-frame-quiz/frame_0377.jpg",,
    answer: "MARRIAGE STORY",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_211",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0378.jpg",,
    answer: "APOCALYPTO",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_212",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0380.jpg",,
    answer: "STALKER",,
    year: "1979",,
    tag: "classic"
  },
  {
    id: "f_213",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0382.jpg",,
    answer: "THE WRESTLER",,
    year: "2008",,
    tag: "classic",
    aliases: ["WRESTLER"]
  },
  {
    id: "f_214",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0384.jpg",,
    answer: "ALMOST FAMOUS",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_215",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0385.jpg",,
    answer: "FANTASTIC MR. FOX",,
    year: "2009",,
    tag: "classic",
    aliases: ["FANTASTIC MR FOX"]
  },
  {
    id: "f_216",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881832/imdb-top500-frame-quiz/frame_0386.jpg",,
    answer: "BOOGIE NIGHTS",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_217",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0387.jpg",,
    answer: "PAPILLON",,
    year: "1973",,
    tag: "classic"
  },
  {
    id: "f_218",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0389.jpg",,
    answer: "ANNIE HALL",,
    year: "1977",,
    tag: "classic"
  },
  {
    id: "f_219",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0390.jpg",,
    answer: "PERSONA",,
    year: "1966",,
    tag: "classic"
  },
  {
    id: "f_220",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879438/imdb-top500-frame-quiz/frame_0392.jpg",,
    answer: "INFERNAL AFFAIRS",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_221",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0394.jpg",,
    answer: "THE HOLDOVERS",,
    year: "2023",,
    tag: "new",
    aliases: ["HOLDOVERS"]
  },
  {
    id: "f_222",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0396.jpg",,
    answer: "THE 400 BLOWS",,
    year: "1959",,
    tag: "classic",
    aliases: ["400 BLOWS"]
  },
  {
    id: "f_223",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0397.jpg",,
    answer: "TRUE ROMANCE",,
    year: "1993",,
    tag: "classic"
  },
  {
    id: "f_224",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0400.jpg",,
    answer: "A FISTFUL OF DOLLARS",,
    year: "1964",,
    tag: "classic"
  },
  {
    id: "f_225",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0401.jpg",,
    answer: "CARLITO'S WAY",,
    year: "1993",,
    tag: "classic",
    aliases: ["CARLITO S WAY"]
  },
  {
    id: "f_226",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0403.jpg",,
    answer: "PORTRAIT OF A LADY ON FIRE",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_227",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0404.jpg",,
    answer: "PERFECT BLUE",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_228",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0412.jpg",,
    answer: "THE BATMAN",,
    year: "2022",,
    tag: "new",
    aliases: ["BATMAN"]
  },
  {
    id: "f_229",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0414.jpg",,
    answer: "THREE COLORS: RED",,
    year: "1994",,
    tag: "classic",
    aliases: ["RED", "THREE COLORS", "THREE COLORS RED"]
  },
  {
    id: "f_230",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879467/imdb-top500-frame-quiz/frame_0415.jpg",,
    answer: "GET OUT",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_231",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0416.jpg",,
    answer: "THE SOCIAL NETWORK",,
    year: "2010",,
    tag: "classic",
    aliases: ["SOCIAL NETWORK"]
  },
  {
    id: "f_232",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0417.jpg",,
    answer: "DUNKIRK",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_233",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0418.jpg",,
    answer: "SKYFALL",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_234",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0419.jpg",,
    answer: "DRIVE",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_235",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0421.jpg",,
    answer: "ROGUE ONE: A STAR WARS STORY",,
    year: "2016",,
    tag: "classic",
    aliases: ["A STAR WARS STORY", "ROGUE ONE", "ROGUE ONE A STAR WARS STORY"]
  },
  {
    id: "f_236",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0424.jpg",,
    answer: "THE CURIOUS CASE OF BENJAMIN BUTTON",,
    year: "2008",,
    tag: "classic",
    aliases: ["CURIOUS CASE OF BENJAMIN BUTTON"]
  },
  {
    id: "f_237",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0426.jpg",,
    answer: "THE DIVING BELL AND THE BUTTERFLY",,
    year: "2007",,
    tag: "classic",
    aliases: ["DIVING BELL AND THE BUTTERFLY"]
  },
  {
    id: "f_238",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0427.jpg",,
    answer: "HERO",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_239",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0431.jpg",,
    answer: "NIGHTCRAWLER",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_240",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879502/imdb-top500-frame-quiz/frame_0433.jpg",,
    answer: "SHAUN OF THE DEAD",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_241",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0434.jpg",,
    answer: "BEFORE MIDNIGHT",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_242",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0436.jpg",,
    answer: "THE STRAIGHT STORY",,
    year: "1999",,
    tag: "classic",
    aliases: ["STRAIGHT STORY"]
  },
  {
    id: "f_243",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0441.jpg",,
    answer: "HOT FUZZ",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_244",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0442.jpg",,
    answer: "EDWARD SCISSORHANDS",,
    year: "1990",,
    tag: "classic"
  },
  {
    id: "f_245",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0446.jpg",,
    answer: "PERSEPOLIS",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_246",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881832/imdb-top500-frame-quiz/frame_0449.jpg",,
    answer: "GHOST IN THE SHELL",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_247",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0450.jpg",,
    answer: "THE GIRL WITH THE DRAGON TATTOO",,
    year: "2011",,
    tag: "classic",
    aliases: ["GIRL WITH THE DRAGON TATTOO"]
  },
  {
    id: "f_248",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0451.jpg",,
    answer: "TRAINING DAY",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_249",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879532/imdb-top500-frame-quiz/frame_0453.jpg",,
    answer: "THE MALTESE FALCON",,
    year: "1941",,
    tag: "classic",
    aliases: ["MALTESE FALCON"]
  },
  {
    id: "f_250",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0455.jpg",,
    answer: "PREDATOR",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_251",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0457.jpg",,
    answer: "AMERICAN GANGSTER",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_252",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0458.jpg",,
    answer: "GHOSTBUSTERS",,
    year: "1984",,
    tag: "classic"
  },
  {
    id: "f_253",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0459.jpg",,
    answer: "THE WAGES OF FEAR",,
    year: "1953",,
    tag: "classic",
    aliases: ["WAGES OF FEAR"]
  },
  {
    id: "f_254",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879556/imdb-top500-frame-quiz/frame_0460.jpg",,
    answer: "THE IRISHMAN",,
    year: "2019",,
    tag: "classic",
    aliases: ["IRISHMAN"]
  },
  {
    id: "f_255",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0461.jpg",,
    answer: "SAMSARA",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_256",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0464.jpg",,
    answer: "DIABOLIQUE",,
    year: "1955",,
    tag: "classic"
  },
  {
    id: "f_257",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0465.jpg",,
    answer: "ROPE",,
    year: "1948",,
    tag: "classic"
  },
  {
    id: "f_258",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879556/imdb-top500-frame-quiz/frame_0467.jpg",,
    answer: "THE CELEBRATION",,
    year: "1998",,
    tag: "classic",
    aliases: ["CELEBRATION"]
  },
  {
    id: "f_259",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0468.jpg",,
    answer: "ALL QUIET ON THE WESTERN FRONT",,
    year: "1930",,
    tag: "classic"
  },
  {
    id: "f_260",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879557/imdb-top500-frame-quiz/frame_0474.jpg",,
    answer: "THE FIGHTER",,
    year: "2010",,
    tag: "classic",
    aliases: ["FIGHTER"]
  },
  {
    id: "f_261",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0475.jpg",,
    answer: "FANNY AND ALEXANDER",,
    year: "1982",,
    tag: "classic"
  },
  {
    id: "f_262",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0479.jpg",,
    answer: "MOON",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_263",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0481.jpg",,
    answer: "PRIDE & PREJUDICE",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_264",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0485.jpg",,
    answer: "CALL ME BY YOUR NAME",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_265",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0486.jpg",,
    answer: "MANCHESTER BY THE SEA",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_266",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0489.jpg",,
    answer: "THE PASSION OF JOAN OF ARC",,
    year: "1928",,
    tag: "classic",
    aliases: ["PASSION OF JOAN OF ARC"]
  },
  {
    id: "f_267",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0491.jpg",,
    answer: "ALL QUIET ON THE WESTERN FRONT",,
    year: "2022",,
    tag: "new"
  },
  {
    id: "f_268",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0493.jpg",,
    answer: "ATONEMENT",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_269",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0500.jpg",,
    answer: "THE RAID 2",,
    year: "2014",,
    tag: "classic",
    aliases: ["RAID 2"]
  },
  {
    id: "f_270",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879589/imdb-top500-frame-quiz/frame_0501.jpg",,
    answer: "SHERLOCK JR.",,
    year: "1924",,
    tag: "classic",
    aliases: ["SHERLOCK JR"]
  },
  {
    id: "f_271",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0502.jpg",,
    answer: "PINK FLOYD: THE WALL",,
    year: "1982",,
    tag: "classic",
    aliases: ["PINK FLOYD", "PINK FLOYD THE WALL", "THE WALL", "WALL"]
  },
  {
    id: "f_272",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0503.jpg",,
    answer: "CORALINE",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_273",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0504.jpg",,
    answer: "ALL THE PRESIDENT'S MEN",,
    year: "1976",,
    tag: "classic",
    aliases: ["ALL THE PRESIDENT S MEN"]
  },
  {
    id: "f_274",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0508.jpg",,
    answer: "WALK THE LINE",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_275",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0511.jpg",,
    answer: "LA DOLCE VITA",,
    year: "1960",,
    tag: "classic"
  },
  {
    id: "f_276",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0512.jpg",,
    answer: "MISERY",,
    year: "1990",,
    tag: "classic"
  },
  {
    id: "f_277",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0515.jpg",,
    answer: "THE ARTIST",,
    year: "2011",,
    tag: "classic",
    aliases: ["ARTIST"]
  },
  {
    id: "f_278",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0517.jpg",,
    answer: "CAPTAIN FANTASTIC",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_279",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0518.jpg",,
    answer: "DO THE RIGHT THING",,
    year: "1989",,
    tag: "classic"
  },
  {
    id: "f_280",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879619/imdb-top500-frame-quiz/frame_0519.jpg",,
    answer: "WHO'S AFRAID OF VIRGINIA WOOLF?",,
    year: "1966",,
    tag: "classic",
    aliases: ["WHO S AFRAID OF VIRGINIA WOOLF"]
  },
  {
    id: "f_281",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0520.jpg",,
    answer: "DANCER IN THE DARK",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_282",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0521.jpg",,
    answer: "WILLY WONKA & THE CHOCOLATE FACTORY",,
    year: "1971",,
    tag: "classic"
  },
  {
    id: "f_283",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0523.jpg",,
    answer: "LET THE RIGHT ONE IN",,
    year: "2008",,
    tag: "classic"
  },
  {
    id: "f_284",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0529.jpg",,
    answer: "A STREETCAR NAMED DESIRE",,
    year: "1951",,
    tag: "classic"
  },
  {
    id: "f_285",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880601/imdb-top500-frame-quiz/frame_0532.jpg",,
    answer: "BRAZIL",,
    year: "1985",,
    tag: "classic"
  },
  {
    id: "f_286",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0533.jpg",,
    answer: "HIGH NOON",,
    year: "1952",,
    tag: "classic"
  },
  {
    id: "f_287",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0536.jpg",,
    answer: "TOUCH OF EVIL",,
    year: "1958",,
    tag: "classic"
  },
  {
    id: "f_288",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0537.jpg",,
    answer: "ANATOMY OF A MURDER",,
    year: "1959",,
    tag: "classic"
  },
  {
    id: "f_289",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0538.jpg",,
    answer: "ISLE OF DOGS",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_290",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879648/imdb-top500-frame-quiz/frame_0539.jpg",,
    answer: "PATTON",,
    year: "1970",,
    tag: "classic"
  },
  {
    id: "f_291",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0541.jpg",,
    answer: "CHUNGKING EXPRESS",,
    year: "1994",,
    tag: "classic"
  },
  {
    id: "f_292",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0543.jpg",,
    answer: "NOTORIOUS",,
    year: "1946",,
    tag: "classic"
  },
  {
    id: "f_293",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0545.jpg",,
    answer: "PERFECT DAYS",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_294",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0546.jpg",,
    answer: "THE CABINET OF DR. CALIGARI",,
    year: "1920",,
    tag: "classic",
    aliases: ["CABINET OF DR CALIGARI", "CABINET OF DR. CALIGARI", "THE CABINET OF DR CALIGARI"]
  },
  {
    id: "f_295",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0547.jpg",,
    answer: "AMOUR",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_296",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0548.jpg",,
    answer: "MARY POPPINS",,
    year: "1964",,
    tag: "classic"
  },
  {
    id: "f_297",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0551.jpg",,
    answer: "THE NIGHT OF THE HUNTER",,
    year: "1955",,
    tag: "classic",
    aliases: ["NIGHT OF THE HUNTER"]
  },
  {
    id: "f_298",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0552.jpg",,
    answer: "CAPTAIN AMERICA: THE WINTER SOLDIER",,
    year: "2014",,
    tag: "classic",
    aliases: ["CAPTAIN AMERICA", "CAPTAIN AMERICA THE WINTER SOLDIER", "THE WINTER SOLDIER", "WINTER SOLDIER"]
  },
  {
    id: "f_299",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0555.jpg",,
    answer: "TOMBSTONE",,
    year: "1993",,
    tag: "classic"
  },
  {
    id: "f_300",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879681/imdb-top500-frame-quiz/frame_0557.jpg",,
    answer: "STAR WARS: EPISODE III - REVENGE OF THE SITH",,
    year: "2005",,
    tag: "classic",
    aliases: ["EPISODE III - REVENGE OF THE SITH", "REVENGE OF THE SITH", "STAR WARS", "STAR WARS 3", "STAR WARS EPISODE III REVENGE OF THE SITH"]
  },
  {
    id: "f_301",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0558.jpg",,
    answer: "NIGHTS OF CABIRIA",,
    year: "1957",,
    tag: "classic"
  },
  {
    id: "f_302",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0559.jpg",,
    answer: "THE INSIDER",,
    year: "1999",,
    tag: "classic",
    aliases: ["INSIDER"]
  },
  {
    id: "f_303",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0560.jpg",,
    answer: "GRAVITY",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_304",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0561.jpg",,
    answer: "KIKI'S DELIVERY SERVICE",,
    year: "1989",,
    tag: "classic",
    aliases: ["KIKI S DELIVERY SERVICE"]
  },
  {
    id: "f_305",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0563.jpg",,
    answer: "THE KILLING",,
    year: "1956",,
    tag: "classic",
    aliases: ["KILLING"]
  },
  {
    id: "f_306",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0568.jpg",,
    answer: "SILVER LININGS PLAYBOOK",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_307",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0571.jpg",,
    answer: "SOLARIS",,
    year: "1972",,
    tag: "classic"
  },
  {
    id: "f_308",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0573.jpg",,
    answer: "ZODIAC",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_309",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0574.jpg",,
    answer: "OCEAN'S ELEVEN",,
    year: "2001",,
    tag: "classic",
    aliases: ["OCEAN S ELEVEN"]
  },
  {
    id: "f_310",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879720/imdb-top500-frame-quiz/frame_0581.jpg",,
    answer: "PAST LIVES",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_311",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0583.jpg",,
    answer: "SOCIETY OF THE SNOW",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_312",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0584.jpg",,
    answer: "EVERYTHING EVERYWHERE ALL AT ONCE",,
    year: "2022",,
    tag: "new"
  },
  {
    id: "f_313",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0585.jpg",,
    answer: "EX MACHINA",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_314",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0588.jpg",,
    answer: "LA STRADA",,
    year: "1954",,
    tag: "classic"
  },
  {
    id: "f_315",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0597.jpg",,
    answer: "THE THEORY OF EVERYTHING",,
    year: "2014",,
    tag: "classic",
    aliases: ["THEORY OF EVERYTHING"]
  },
  {
    id: "f_316",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0599.jpg",,
    answer: "SONG OF THE SEA",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_317",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0600.jpg",,
    answer: "SHOPLIFTERS",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_318",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0601.jpg",,
    answer: "KING KONG",,
    year: "1933",,
    tag: "classic"
  },
  {
    id: "f_319",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879764/imdb-top500-frame-quiz/frame_0602.jpg",,
    answer: "SHORT TERM 12",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_320",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0603.jpg",,
    answer: "THE GAME",,
    year: "1997",,
    tag: "classic",
    aliases: ["GAME"]
  },
  {
    id: "f_321",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0607.jpg",,
    answer: "BLACK HAWK DOWN",,
    year: "2001",,
    tag: "classic"
  },
  {
    id: "f_322",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0608.jpg",,
    answer: "THE WILD BUNCH",,
    year: "1969",,
    tag: "classic",
    aliases: ["WILD BUNCH"]
  },
  {
    id: "f_323",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0610.jpg",,
    answer: "LE SAMOURAÏ",,
    year: "1967",,
    tag: "classic"
  },
  {
    id: "f_324",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0613.jpg",,
    answer: "MANHATTAN",,
    year: "1979",,
    tag: "classic"
  },
  {
    id: "f_325",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0614.jpg",,
    answer: "MAN ON FIRE",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_326",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0615.jpg",,
    answer: "MISSION: IMPOSSIBLE - FALLOUT",,
    year: "2018",,
    tag: "classic",
    aliases: ["IMPOSSIBLE - FALLOUT", "MISSION", "MISSION IMPOSSIBLE FALLOUT"]
  },
  {
    id: "f_327",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0616.jpg",,
    answer: "POOR THINGS",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_328",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0617.jpg",,
    answer: "NIGHT OF THE LIVING DEAD",,
    year: "1968",,
    tag: "classic"
  },
  {
    id: "f_329",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0618.jpg",,
    answer: "BROKEBACK MOUNTAIN",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_330",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879795/imdb-top500-frame-quiz/frame_0620.jpg",,
    answer: "IN THE HEAT OF THE NIGHT",,
    year: "1967",,
    tag: "classic"
  },
  {
    id: "f_331",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0623.jpg",,
    answer: "PATHER PANCHALI",,
    year: "1955",,
    tag: "classic"
  },
  {
    id: "f_332",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0624.jpg",,
    answer: "MOONRISE KINGDOM",,
    year: "2012",,
    tag: "classic"
  },
  {
    id: "f_333",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0626.jpg",,
    answer: "BEING JOHN MALKOVICH",,
    year: "1999",,
    tag: "classic"
  },
  {
    id: "f_334",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0630.jpg",,
    answer: "O BROTHER, WHERE ART THOU?",,
    year: "2000",,
    tag: "classic",
    aliases: ["O BROTHER WHERE ART THOU"]
  },
  {
    id: "f_335",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0632.jpg",,
    answer: "GATTACA",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_336",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0634.jpg",,
    answer: "DOCTOR ZHIVAGO",,
    year: "1965",,
    tag: "classic"
  },
  {
    id: "f_337",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0635.jpg",,
    answer: "TO BE OR NOT TO BE",,
    year: "1942",,
    tag: "classic"
  },
  {
    id: "f_338",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0636.jpg",,
    answer: "HALLOWEEN",,
    year: "1978",,
    tag: "classic"
  },
  {
    id: "f_339",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0641.jpg",,
    answer: "DAWN OF THE DEAD",,
    year: "1978",,
    tag: "classic"
  },
  {
    id: "f_340",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879834/imdb-top500-frame-quiz/frame_0643.jpg",,
    answer: "THE TALE OF THE PRINCESS KAGUYA",,
    year: "2013",,
    tag: "classic",
    aliases: ["TALE OF THE PRINCESS KAGUYA"]
  },
  {
    id: "f_341",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0646.jpg",,
    answer: "THE KING OF COMEDY",,
    year: "1982",,
    tag: "classic",
    aliases: ["KING OF COMEDY"]
  },
  {
    id: "f_342",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881398/imdb-top500-frame-quiz/frame_0650.jpg",,
    answer: "THE MANCHURIAN CANDIDATE",,
    year: "1962",,
    tag: "classic",
    aliases: ["MANCHURIAN CANDIDATE"]
  },
  {
    id: "f_343",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0651.jpg",,
    answer: "WINGS OF DESIRE",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_344",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0655.jpg",,
    answer: "THE FALL",,
    year: "2006",,
    tag: "classic",
    aliases: ["FALL"]
  },
  {
    id: "f_345",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0659.jpg",,
    answer: "ANDREI RUBLEV",,
    year: "1966",,
    tag: "classic"
  },
  {
    id: "f_346",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0660.jpg",,
    answer: "MISSISSIPPI BURNING",,
    year: "1988",,
    tag: "classic"
  },
  {
    id: "f_347",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0661.jpg",,
    answer: "LITTLE WOMEN",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_348",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0663.jpg",,
    answer: "BEING THERE",,
    year: "1979",,
    tag: "classic"
  },
  {
    id: "f_349",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0674.jpg",,
    answer: "NOSFERATU",,
    year: "1922",,
    tag: "classic"
  },
  {
    id: "f_350",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879880/imdb-top500-frame-quiz/frame_0677.jpg",,
    answer: "MR. NOBODY",,
    year: "2009",,
    tag: "classic",
    aliases: ["MR NOBODY"]
  },
  {
    id: "f_351",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879913/imdb-top500-frame-quiz/frame_0679.jpg",,
    answer: "BLUE VELVET",,
    year: "1986",,
    tag: "classic"
  },
  {
    id: "f_352",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879914/imdb-top500-frame-quiz/frame_0680.jpg",,
    answer: "THREE COLORS: BLUE",,
    year: "1993",,
    tag: "classic",
    aliases: ["BLUE", "THREE COLORS", "THREE COLORS BLUE"]
  },
  {
    id: "f_353",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0687.jpg",,
    answer: "PADDINGTON 2",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_354",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879913/imdb-top500-frame-quiz/frame_0688.jpg",,
    answer: "THE LAST PICTURE SHOW",,
    year: "1971",,
    tag: "classic",
    aliases: ["LAST PICTURE SHOW"]
  },
  {
    id: "f_355",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879913/imdb-top500-frame-quiz/frame_0690.jpg",,
    answer: "THE WIND RISES",,
    year: "2013",,
    tag: "classic",
    aliases: ["WIND RISES"]
  },
  {
    id: "f_356",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879914/imdb-top500-frame-quiz/frame_0695.jpg",,
    answer: "RIO BRAVO",,
    year: "1959",,
    tag: "classic"
  },
  {
    id: "f_357",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879914/imdb-top500-frame-quiz/frame_0696.jpg",,
    answer: "ALL ABOUT MY MOTHER",,
    year: "1999",,
    tag: "classic"
  },
  {
    id: "f_358",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879913/imdb-top500-frame-quiz/frame_0699.jpg",,
    answer: "THE RED SHOES",,
    year: "1948",,
    tag: "classic",
    aliases: ["RED SHOES"]
  },
  {
    id: "f_359",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879913/imdb-top500-frame-quiz/frame_0704.jpg",,
    answer: "AUTUMN SONATA",,
    year: "1978",,
    tag: "classic"
  },
  {
    id: "f_360",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879914/imdb-top500-frame-quiz/frame_0706.jpg",,
    answer: "THE SEARCHERS",,
    year: "1956",,
    tag: "classic",
    aliases: ["SEARCHERS"]
  },
  {
    id: "f_361",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0708.jpg",,
    answer: "SOUND OF METAL",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_362",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0709.jpg",,
    answer: "FIDDLER ON THE ROOF",,
    year: "1971",,
    tag: "classic"
  },
  {
    id: "f_363",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0714.jpg",,
    answer: "ONCE UPON A TIME IN... HOLLYWOOD",,
    year: "2019",,
    tag: "classic",
    aliases: ["ONCE UPON A TIME IN HOLLYWOOD"]
  },
  {
    id: "f_364",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0715.jpg",,
    answer: "300",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_365",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0716.jpg",,
    answer: "AMERICAN PSYCHO",,
    year: "2000",,
    tag: "classic"
  },
  {
    id: "f_366",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0717.jpg",,
    answer: "GUARDIANS OF THE GALAXY: VOL. 2",,
    year: "2017",,
    tag: "classic",
    aliases: ["GUARDIANS OF THE GALAXY", "GUARDIANS OF THE GALAXY VOL 2", "VOL. 2"]
  },
  {
    id: "f_367",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0722.jpg",,
    answer: "WOMAN IN THE DUNES",,
    year: "1964",,
    tag: "classic"
  },
  {
    id: "f_368",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0723.jpg",,
    answer: "DEADPOOL 2",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_369",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0724.jpg",,
    answer: "BOYZ N THE HOOD",,
    year: "1991",,
    tag: "classic"
  },
  {
    id: "f_370",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879942/imdb-top500-frame-quiz/frame_0726.jpg",,
    answer: "4 MONTHS, 3 WEEKS AND 2 DAYS",,
    year: "2007",,
    tag: "classic",
    aliases: ["4 MONTHS 3 WEEKS AND 2 DAYS"]
  },
  {
    id: "f_371",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0731.jpg",,
    answer: "CHARADE",,
    year: "1963",,
    tag: "classic"
  },
  {
    id: "f_372",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0736.jpg",,
    answer: "BATTLESHIP POTEMKIN",,
    year: "1925",,
    tag: "classic"
  },
  {
    id: "f_373",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0739.jpg",,
    answer: "500 DAYS OF SUMMER",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_374",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0740.jpg",,
    answer: "MINORITY REPORT",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_375",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0741.jpg",,
    answer: "KICK-ASS",,
    year: "2010",,
    tag: "classic",
    aliases: ["KICK ASS"]
  },
  {
    id: "f_376",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0744.jpg",,
    answer: "WATCHMEN",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_377",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0745.jpg",,
    answer: "RISE OF THE PLANET OF THE APES",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_378",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0749.jpg",,
    answer: "THE FIFTH ELEMENT",,
    year: "1997",,
    tag: "classic",
    aliases: ["FIFTH ELEMENT"]
  },
  {
    id: "f_379",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0751.jpg",,
    answer: "BRIEF ENCOUNTER",,
    year: "1945",,
    tag: "classic"
  },
  {
    id: "f_380",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879969/imdb-top500-frame-quiz/frame_0754.jpg",,
    answer: "MONEYBALL",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_381",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0755.jpg",,
    answer: "SAW",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_382",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0759.jpg",,
    answer: "MILLER'S CROSSING",,
    year: "1990",,
    tag: "classic",
    aliases: ["MILLER S CROSSING"]
  },
  {
    id: "f_383",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0762.jpg",,
    answer: "KUBO AND THE TWO STRINGS",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_384",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0766.jpg",,
    answer: "A STAR IS BORN",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_385",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0768.jpg",,
    answer: "ONE BATTLE AFTER ANOTHER",,
    year: "2025",,
    tag: "new"
  },
  {
    id: "f_386",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0769.jpg",,
    answer: "THE MACHINIST",,
    year: "2004",,
    tag: "classic",
    aliases: ["MACHINIST"]
  },
  {
    id: "f_387",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0770.jpg",,
    answer: "ME AND EARL AND THE DYING GIRL",,
    year: "2015",,
    tag: "classic"
  },
  {
    id: "f_388",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0772.jpg",,
    answer: "3-IRON",,
    year: "2004",,
    tag: "classic",
    aliases: ["3 IRON"]
  },
  {
    id: "f_389",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879993/imdb-top500-frame-quiz/frame_0776.jpg",,
    answer: "DIE HARD WITH A VENGEANCE",,
    year: "1995",,
    tag: "classic"
  },
  {
    id: "f_390",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790879994/imdb-top500-frame-quiz/frame_0777.jpg",,
    answer: "THE OTHERS",,
    year: "2001",,
    tag: "classic",
    aliases: ["OTHERS"]
  },
  {
    id: "f_391",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0783.jpg",,
    answer: "HAROLD AND MAUDE",,
    year: "1971",,
    tag: "classic"
  },
  {
    id: "f_392",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0784.jpg",,
    answer: "WHITE HEAT",,
    year: "1949",,
    tag: "classic"
  },
  {
    id: "f_393",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881832/imdb-top500-frame-quiz/frame_0786.jpg",,
    answer: "JOHN WICK: CHAPTER 4",,
    year: "2023",,
    tag: "new",
    aliases: ["CHAPTER 4", "JOHN WICK", "JOHN WICK CHAPTER 4"]
  },
  {
    id: "f_394",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0789.jpg",,
    answer: "STALAG 17",,
    year: "1953",,
    tag: "classic"
  },
  {
    id: "f_395",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0795.jpg",,
    answer: "THE CONVERSATION",,
    year: "1974",,
    tag: "classic",
    aliases: ["CONVERSATION"]
  },
  {
    id: "f_396",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0796.jpg",,
    answer: "RAISE THE RED LANTERN",,
    year: "1991",,
    tag: "classic"
  },
  {
    id: "f_397",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0800.jpg",,
    answer: "TRUE GRIT",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_398",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0801.jpg",,
    answer: "THIS IS ENGLAND",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_399",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880029/imdb-top500-frame-quiz/frame_0803.jpg",,
    answer: "THE CHASER",,
    year: "2008",,
    tag: "classic",
    aliases: ["CHASER"]
  },
  {
    id: "f_400",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0805.jpg",,
    answer: "LORD OF WAR",,
    year: "2005",,
    tag: "classic"
  },
  {
    id: "f_401",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0807.jpg",,
    answer: "THE WHITE RIBBON",,
    year: "2009",,
    tag: "classic",
    aliases: ["WHITE RIBBON"]
  },
  {
    id: "f_402",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0809.jpg",,
    answer: "WOLFWALKERS",,
    year: "2020",,
    tag: "new"
  },
  {
    id: "f_403",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0811.jpg",,
    answer: "THE WORST PERSON IN THE WORLD",,
    year: "2021",,
    tag: "new",
    aliases: ["WORST PERSON IN THE WORLD"]
  },
  {
    id: "f_404",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0818.jpg",,
    answer: "CREED",,
    year: "2015",,
    tag: "classic"
  },
  {
    id: "f_405",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0820.jpg",,
    answer: "THE ROYAL TENENBAUMS",,
    year: "2001",,
    tag: "classic",
    aliases: ["ROYAL TENENBAUMS"]
  },
  {
    id: "f_406",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0821.jpg",,
    answer: "MISSION: IMPOSSIBLE - DEAD RECKONING PART ONE",,
    year: "2023",,
    tag: "new",
    aliases: ["IMPOSSIBLE - DEAD RECKONING PART ONE", "MISSION", "MISSION IMPOSSIBLE DEAD RECKONING PART ONE"]
  },
  {
    id: "f_407",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0822.jpg",,
    answer: "NEBRASKA",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_408",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0823.jpg",,
    answer: "THE ADVENTURES OF ROBIN HOOD",,
    year: "1938",,
    tag: "classic",
    aliases: ["ADVENTURES OF ROBIN HOOD"]
  },
  {
    id: "f_409",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0824.jpg",,
    answer: "TOY STORY 4",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_410",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880052/imdb-top500-frame-quiz/frame_0827.jpg",,
    answer: "BONNIE AND CLYDE",,
    year: "1967",,
    tag: "classic"
  },
  {
    id: "f_411",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0833.jpg",,
    answer: "THE LITTLE MERMAID",,
    year: "1989",,
    tag: "classic",
    aliases: ["LITTLE MERMAID"]
  },
  {
    id: "f_412",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0835.jpg",,
    answer: "ROBOCOP",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_413",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0837.jpg",,
    answer: "THE WHALE",,
    year: "2022",,
    tag: "new",
    aliases: ["WHALE"]
  },
  {
    id: "f_414",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0838.jpg",,
    answer: "ROAD TO PERDITION",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_415",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0845.jpg",,
    answer: "BREAKING THE WAVES",,
    year: "1996",,
    tag: "classic"
  },
  {
    id: "f_416",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0846.jpg",,
    answer: "THE LAST EMPEROR",,
    year: "1987",,
    tag: "classic",
    aliases: ["LAST EMPEROR"]
  },
  {
    id: "f_417",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0849.jpg",,
    answer: "EASTERN PROMISES",,
    year: "2007",,
    tag: "classic"
  },
  {
    id: "f_418",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0850.jpg",,
    answer: "PORCO ROSSO",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_419",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0858.jpg",,
    answer: "PAPRIKA",,
    year: "2006",,
    tag: "classic"
  },
  {
    id: "f_420",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880102/imdb-top500-frame-quiz/frame_0861.jpg",,
    answer: "21 GRAMS",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_421",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0862.jpg",,
    answer: "MALCOLM X",,
    year: "1992",,
    tag: "classic"
  },
  {
    id: "f_422",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0872.jpg",,
    answer: "CLOSE ENCOUNTERS OF THE THIRD KIND",,
    year: "1977",,
    tag: "classic"
  },
  {
    id: "f_423",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0874.jpg",,
    answer: "ANATOMY OF A FALL",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_424",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0877.jpg",,
    answer: "THE MOTORCYCLE DIARIES",,
    year: "2004",,
    tag: "classic",
    aliases: ["MOTORCYCLE DIARIES"]
  },
  {
    id: "f_425",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0879.jpg",,
    answer: "GODZILLA MINUS ONE",,
    year: "2023",,
    tag: "new"
  },
  {
    id: "f_426",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0882.jpg",,
    answer: "THE FLY",,
    year: "1986",,
    tag: "classic",
    aliases: ["FLY"]
  },
  {
    id: "f_427",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0888.jpg",,
    answer: "THE BIRDS",,
    year: "1963",,
    tag: "classic",
    aliases: ["BIRDS"]
  },
  {
    id: "f_428",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0889.jpg",,
    answer: "BRINGING UP BABY",,
    year: "1938",,
    tag: "classic"
  },
  {
    id: "f_429",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0890.jpg",,
    answer: "Z",,
    year: "1969",,
    tag: "classic"
  },
  {
    id: "f_430",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880132/imdb-top500-frame-quiz/frame_0892.png",,
    answer: "DAZED AND CONFUSED",,
    year: "1993",,
    tag: "classic"
  },
  {
    id: "f_431",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0894.jpg",,
    answer: "RUN LOLA RUN",,
    year: "1998",,
    tag: "classic"
  },
  {
    id: "f_432",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0899.jpg",,
    answer: "THE ROAD WARRIOR",,
    year: "1981",,
    tag: "classic",
    aliases: ["ROAD WARRIOR"]
  },
  {
    id: "f_433",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0901.jpg",,
    answer: "ADAPTATION.",,
    year: "2002",,
    tag: "classic",
    aliases: ["ADAPTATION"]
  },
  {
    id: "f_434",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0902.jpg",,
    answer: "THE THIN RED LINE",,
    year: "1998",,
    tag: "classic",
    aliases: ["THIN RED LINE"]
  },
  {
    id: "f_435",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0903.jpg",,
    answer: "LOVING VINCENT",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_436",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0904.jpg",,
    answer: "I, DANIEL BLAKE",,
    year: "2016",,
    tag: "classic",
    aliases: ["I DANIEL BLAKE"]
  },
  {
    id: "f_437",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0908.jpg",,
    answer: "RUSHMORE",,
    year: "1998",,
    tag: "classic"
  },
  {
    id: "f_438",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0912.jpg",,
    answer: "SWEET SMELL OF SUCCESS",,
    year: "1957",,
    tag: "classic"
  },
  {
    id: "f_439",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0915.jpg",,
    answer: "EVIL DEAD II",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_440",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880161/imdb-top500-frame-quiz/frame_0916.jpg",,
    answer: "THELMA & LOUISE",,
    year: "1991",,
    tag: "classic"
  },
  {
    id: "f_441",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0920.jpg",,
    answer: "THE RETURN",,
    year: "2003",,
    tag: "classic",
    aliases: ["RETURN"]
  },
  {
    id: "f_442",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0921.jpg",,
    answer: "25TH HOUR",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_443",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0923.jpg",,
    answer: "PONYO",,
    year: "2008",,
    tag: "classic"
  },
  {
    id: "f_444",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0927.jpg",,
    answer: "THE SKIN I LIVE IN",,
    year: "2011",,
    tag: "classic",
    aliases: ["SKIN I LIVE IN"]
  },
  {
    id: "f_445",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0930.jpg",,
    answer: "THE KILLING FIELDS",,
    year: "1984",,
    tag: "classic",
    aliases: ["KILLING FIELDS"]
  },
  {
    id: "f_446",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0931.jpg",,
    answer: "ROMA",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_447",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0932.jpg",,
    answer: "AU REVOIR LES ENFANTS",,
    year: "1987",,
    tag: "classic"
  },
  {
    id: "f_448",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0933.jpg",,
    answer: "CRIMES AND MISDEMEANORS",,
    year: "1989",,
    tag: "classic"
  },
  {
    id: "f_449",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881442/imdb-top500-frame-quiz/frame_0935.jpg",,
    answer: "BLUE IS THE WARMEST COLOUR",,
    year: "2013",,
    tag: "classic"
  },
  {
    id: "f_450",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880193/imdb-top500-frame-quiz/frame_0939.jpg",,
    answer: "LOST HIGHWAY",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_451",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0940.jpg",,
    answer: "BEASTS OF NO NATION",,
    year: "2015",,
    tag: "classic"
  },
  {
    id: "f_452",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0944.jpg",,
    answer: "CLOSE-UP",,
    year: "1990",,
    tag: "classic",
    aliases: ["CLOSE UP"]
  },
  {
    id: "f_453",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0946.jpg",,
    answer: "THE DAY THE EARTH STOOD STILL",,
    year: "1951",,
    tag: "classic",
    aliases: ["DAY THE EARTH STOOD STILL"]
  },
  {
    id: "f_454",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0950.jpg",,
    answer: "DOCTOR STRANGE",,
    year: "2016",,
    tag: "classic"
  },
  {
    id: "f_455",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0951.jpg",,
    answer: "FRANKENSTEIN",,
    year: "1931",,
    tag: "classic"
  },
  {
    id: "f_456",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0953.jpg",,
    answer: "JOHN WICK",,
    year: "2014",,
    tag: "classic"
  },
  {
    id: "f_457",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0954.jpg",,
    answer: "SPIDER-MAN 2",,
    year: "2004",,
    tag: "classic",
    aliases: ["SPIDER MAN 2"]
  },
  {
    id: "f_458",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_0961.jpg",,
    answer: "A MAN ESCAPED",,
    year: "1956",,
    tag: "classic"
  },
  {
    id: "f_459",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0962.jpg",,
    answer: "BABY DRIVER",,
    year: "2017",,
    tag: "classic"
  },
  {
    id: "f_460",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880229/imdb-top500-frame-quiz/frame_0963.jpg",,
    answer: "BRIDE OF FRANKENSTEIN",,
    year: "1935",,
    tag: "classic"
  },
  {
    id: "f_461",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0964.jpg",,
    answer: "THE FRENCH CONNECTION",,
    year: "1971",,
    tag: "classic",
    aliases: ["FRENCH CONNECTION"]
  },
  {
    id: "f_462",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0965.jpg",,
    answer: "BADLANDS",,
    year: "1973",,
    tag: "classic"
  },
  {
    id: "f_463",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0967.jpg",,
    answer: "A QUIET PLACE",,
    year: "2018",,
    tag: "classic"
  },
  {
    id: "f_464",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0970.jpg",,
    answer: "AVATAR: THE WAY OF WATER",,
    year: "2022",,
    tag: "new",
    aliases: ["AVATAR", "AVATAR THE WAY OF WATER", "THE WAY OF WATER", "WAY OF WATER"]
  },
  {
    id: "f_465",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0971.jpg",,
    answer: "THE FLORIDA PROJECT",,
    year: "2017",,
    tag: "classic",
    aliases: ["FLORIDA PROJECT"]
  },
  {
    id: "f_466",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0972.jpg",,
    answer: "THE CONJURING",,
    year: "2013",,
    tag: "classic",
    aliases: ["CONJURING"]
  },
  {
    id: "f_467",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0973.jpg",,
    answer: "OUT OF THE PAST",,
    year: "1947",,
    tag: "classic"
  },
  {
    id: "f_468",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0978.jpg",,
    answer: "SOURCE CODE",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_469",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0984.jpg",,
    answer: "28 DAYS LATER",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_470",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880257/imdb-top500-frame-quiz/frame_0986.jpg",,
    answer: "MOTHER",,
    year: "2009",,
    tag: "classic"
  },
  {
    id: "f_471",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_0989.jpg",,
    answer: "BACK TO THE FUTURE PART III",,
    year: "1990",,
    tag: "classic"
  },
  {
    id: "f_472",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_0991.jpg",,
    answer: "GANGS OF NEW YORK",,
    year: "2002",,
    tag: "classic"
  },
  {
    id: "f_473",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_0994.jpg",,
    answer: "SCOTT PILGRIM VS. THE WORLD",,
    year: "2010",,
    tag: "classic",
    aliases: ["SCOTT PILGRIM VS THE WORLD"]
  },
  {
    id: "f_474",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_0996.jpg",,
    answer: "HAPPINESS",,
    year: "1998",,
    tag: "classic"
  },
  {
    id: "f_475",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_1000.jpg",,
    answer: "COLLATERAL",,
    year: "2004",,
    tag: "classic"
  },
  {
    id: "f_476",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_1002.jpg",,
    answer: "BARTON FINK",,
    year: "1991",,
    tag: "classic"
  },
  {
    id: "f_477",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_1005.jpg",,
    answer: "THE TOWN",,
    year: "2010",,
    tag: "classic",
    aliases: ["TOWN"]
  },
  {
    id: "f_478",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_1007.jpg",,
    answer: "TOKYO GODFATHERS",,
    year: "2003",,
    tag: "classic"
  },
  {
    id: "f_479",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880292/imdb-top500-frame-quiz/frame_1008.jpg",,
    answer: "AFTERSUN",,
    year: "2022",,
    tag: "new"
  },
  {
    id: "f_480",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881832/imdb-top500-frame-quiz/frame_1009.jpg",,
    answer: "EYES WIDE SHUT",,
    year: "1999",,
    tag: "classic"
  },
  {
    id: "f_481",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1010.jpg",,
    answer: "BATMAN",,
    year: "1989",,
    tag: "classic"
  },
  {
    id: "f_482",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1012.jpg",,
    answer: "ARMY OF SHADOWS",,
    year: "1969",,
    tag: "classic"
  },
  {
    id: "f_483",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1015.jpg",,
    answer: "127 HOURS",,
    year: "2010",,
    tag: "classic"
  },
  {
    id: "f_484",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_1018.jpg",,
    answer: "THE AVIATOR",,
    year: "2004",,
    tag: "classic",
    aliases: ["AVIATOR"]
  },
  {
    id: "f_485",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1019.jpg",,
    answer: "DELIVERANCE",,
    year: "1972",,
    tag: "classic"
  },
  {
    id: "f_486",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1020.jpg",,
    answer: "JACKIE BROWN",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_487",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1021.jpg",,
    answer: "THE ILLUSIONIST",,
    year: "2006",,
    tag: "classic",
    aliases: ["ILLUSIONIST"]
  },
  {
    id: "f_488",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1022.jpg",,
    answer: "WEST SIDE STORY",,
    year: "1961",,
    tag: "classic"
  },
  {
    id: "f_489",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1023.jpg",,
    answer: "ONCE UPON A TIME IN ANATOLIA",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_490",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880318/imdb-top500-frame-quiz/frame_1027.jpg",,
    answer: "TOTAL RECALL",,
    year: "1990",,
    tag: "classic"
  },
  {
    id: "f_491",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1037.jpg",,
    answer: "DARK WATERS",,
    year: "2019",,
    tag: "classic"
  },
  {
    id: "f_492",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880520/imdb-top500-frame-quiz/frame_1038.jpg",,
    answer: "THE GREATEST SHOWMAN",,
    year: "2017",,
    tag: "classic",
    aliases: ["GREATEST SHOWMAN"]
  },
  {
    id: "f_493",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_1039.jpg",,
    answer: "A WOMAN UNDER THE INFLUENCE",,
    year: "1974",,
    tag: "classic"
  },
  {
    id: "f_494",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790881479/imdb-top500-frame-quiz/frame_1040.jpg",,
    answer: "THE VIRGIN SPRING",,
    year: "1960",,
    tag: "classic",
    aliases: ["VIRGIN SPRING"]
  },
  {
    id: "f_495",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1041.jpg",,
    answer: "HUGO",,
    year: "2011",,
    tag: "classic"
  },
  {
    id: "f_496",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1044.jpg",,
    answer: "THE PEANUT BUTTER FALCON",,
    year: "2019",,
    tag: "classic",
    aliases: ["PEANUT BUTTER FALCON"]
  },
  {
    id: "f_497",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1045.jpg",,
    answer: "ENTER THE DRAGON",,
    year: "1973",,
    tag: "classic"
  },
  {
    id: "f_498",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1052.jpg",,
    answer: "UGETSU",,
    year: "1953",,
    tag: "classic"
  },
  {
    id: "f_499",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1054.jpg",,
    answer: "CONTACT",,
    year: "1997",,
    tag: "classic"
  },
  {
    id: "f_500",,
    category: "frames",,
    type: "image",,
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790880360/imdb-top500-frame-quiz/frame_1056.jpg",,
    answer: "KILLERS OF THE FLOWER MOON",,
    year: "2023",,
    tag: "new"
  },
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
