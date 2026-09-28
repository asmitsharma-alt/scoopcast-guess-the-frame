export type MediaType = 'image' | 'dialogue' | 'eye';

export interface CatalogItem {
  id: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: MediaType;
  content: string;
  revealContent?: string;
  dialogue?: string;
  answer: string;
  year?: string;
  aliases?: string[];
  tag?: 'new' | 'classic';
}

export const CATALOG: CatalogItem[] = [
  // ── Guess The Frame (377 Dynamic Cinema Frames) ──
  {
    id: "f_1",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573790/scoopcast_frames/Thor_Love_and_Thunder_2022.webp",
    answer: "THOR: LOVE AND THUNDER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_2",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573395/scoopcast_frames/Iron_Man_3_2013.webp",
    answer: "IRON MAN 3",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_3",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573376/scoopcast_frames/Iron_Man_2008.webp",
    answer: "IRON MAN",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_4",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573386/scoopcast_frames/Iron_Man_2_2014.webp",
    answer: "IRON MAN 2",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_5",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573968/scoopcast_frames/Spider_Man_No_Way_Home_2021.webp",
    answer: "SPIDER-MAN: NO WAY HOME",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_6",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573849/scoopcast_frames/Black_Panther_Wakanda_Forever_2022.webp",
    answer: "BLACK PANTHER: WAKANDA FOREVER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_7",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573871/scoopcast_frames/Doctor_Strange_in_the_Multiverse_of_Madness_2022.webp",
    answer: "DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_8",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573828/scoopcast_frames/Guardians_of_the_Galaxy_Vol_3_2023.webp",
    answer: "GUARDIANS OF THE GALAXY VOL. 3",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_9",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790573925/scoopcast_frames/Spider_Man_Across_the_Spider_Verse_2023.webp",
    answer: "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_10",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574093/scoopcast_frames/The_Batman_2022.webp",
    answer: "THE BATMAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_11",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574186/scoopcast_frames/Man_Of_Steel_2013.webp",
    answer: "MAN OF STEEL",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_12",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574649/scoopcast_frames/The_Suicide_Squad_2021.webp",
    answer: "THE SUICIDE SQUAD",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_13",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574732/scoopcast_frames/The_Matrix_Resurrections_2021.webp",
    answer: "THE MATRIX RESURRECTIONS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_14",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574783/scoopcast_frames/John_Wick_Chapter_3_Parabellum_2019.webp",
    answer: "JOHN WICK: CHAPTER 3 - PARABELLUM",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_15",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790574795/scoopcast_frames/John_Wick_Chapter_4_2023.webp",
    answer: "JOHN WICK: CHAPTER 4",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_16",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790575598/scoopcast_frames/Mad_Fate_2023.webp",
    answer: "MAD FATE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_17",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790576259/scoopcast_frames/A_Summers_Tale_1996.webp",
    answer: "A SUMMER'S TALE",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_18",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790576591/scoopcast_frames/Insomnia_1997_1997.webp",
    answer: "INSOMNIA (1997)",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_19",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585852/scoopcast_frames/Star_Wars_1977.webp",
    answer: "STAR WARS",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_20",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585960/scoopcast_frames/Dune_Part_2_2021.webp",
    answer: "DUNE: PART 2",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_21",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585963/scoopcast_frames/Dune_2021_2021.webp",
    answer: "DUNE (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_22",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585978/scoopcast_frames/Titanic_1997.webp",
    answer: "TITANIC",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_23",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585997/scoopcast_frames/Aliens_1986.webp",
    answer: "ALIENS",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_24",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790585993/scoopcast_frames/Django_Unchained_2012.webp",
    answer: "DJANGO UNCHAINED",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_25",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586012/scoopcast_frames/The_Iron_Claw_2023.webp",
    answer: "THE IRON CLAW",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_26",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586006/scoopcast_frames/Back_to_the_Future_1985.webp",
    answer: "BACK TO THE FUTURE",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_27",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586020/scoopcast_frames/The_Immigrant_2013.webp",
    answer: "THE IMMIGRANT",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_28",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586029/scoopcast_frames/Tiger_Stripes_2023.webp",
    answer: "TIGER STRIPES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_29",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586038/scoopcast_frames/Trap_2024.webp",
    answer: "TRAP",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_30",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586051/scoopcast_frames/Kimi_2022.webp",
    answer: "KIMI",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_31",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586137/scoopcast_frames/Live_By_Night_2016.webp",
    answer: "LIVE BY NIGHT",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_32",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586056/scoopcast_frames/Oddity_2024.webp",
    answer: "ODDITY",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_33",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586049/scoopcast_frames/The_Boy_and_The_Heron_2023.webp",
    answer: "THE BOY AND THE HERON",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_34",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586141/scoopcast_frames/Ip_Man_4_The_Finale_2019.webp",
    answer: "IP MAN 4: THE FINALE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_35",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586148/scoopcast_frames/Tokyo_Godfathers_2003.webp",
    answer: "TOKYO GODFATHERS",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_36",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586152/scoopcast_frames/The_New_Boy_2023.webp",
    answer: "THE NEW BOY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_37",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586144/scoopcast_frames/Godzilla_Minus_One_2023.webp",
    answer: "GODZILLA MINUS ONE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_38",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586680/scoopcast_frames/Braveheart_1995.webp",
    answer: "BRAVEHEART",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_39",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790586685/scoopcast_frames/The_Adventures_of_Buckaroo_Banzai_Across_the_8th_Dimension_1984.webp",
    answer: "THE ADVENTURES OF BUCKAROO BANZAI ACROSS THE 8TH DIMENSION",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_40",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587177/scoopcast_frames/Vivarium_2019.webp",
    answer: "VIVARIUM",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_41",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587178/scoopcast_frames/The_Lovely_Bones_2009.webp",
    answer: "THE LOVELY BONES",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_42",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587183/scoopcast_frames/Rosaline_2022.webp",
    answer: "ROSALINE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_43",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587184/scoopcast_frames/Desert_Hearts_1985.webp",
    answer: "DESERT HEARTS",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_44",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587185/scoopcast_frames/Renfield_2023.webp",
    answer: "RENFIELD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_45",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587186/scoopcast_frames/Women_Talking_2022.webp",
    answer: "WOMEN TALKING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_46",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587191/scoopcast_frames/Branded_To_Kill_1967.webp",
    answer: "BRANDED TO KILL",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_47",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587194/scoopcast_frames/Mon_Crime_2023.webp",
    answer: "MON CRIME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_48",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587198/scoopcast_frames/Mayday_2021.webp",
    answer: "MAYDAY",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_49",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587201/scoopcast_frames/Lifeforce_1985.webp",
    answer: "LIFEFORCE",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_50",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587202/scoopcast_frames/Kokomo_City_2023.webp",
    answer: "KOKOMO CITY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_51",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587204/scoopcast_frames/The_Wages_of_Fear_1953.webp",
    answer: "THE WAGES OF FEAR",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_52",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587206/scoopcast_frames/Wild_Zero_1999.webp",
    answer: "WILD ZERO",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_53",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587207/scoopcast_frames/Challengers_2024.webp",
    answer: "CHALLENGERS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_54",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587213/scoopcast_frames/The_Frighteners_1996.webp",
    answer: "THE FRIGHTENERS",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_55",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587215/scoopcast_frames/The_Pod_Generation_2023.webp",
    answer: "THE POD GENERATION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_56",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587219/scoopcast_frames/She_Came_To_Me_2023.webp",
    answer: "SHE CAME TO ME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_57",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587229/scoopcast_frames/Once_Within_A_Time_2022.webp",
    answer: "ONCE WITHIN A TIME",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_58",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587230/scoopcast_frames/The_Rocketeer_1991.webp",
    answer: "THE ROCKETEER",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_59",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587231/scoopcast_frames/The_Sky_Is_Everywhere_2022.webp",
    answer: "THE SKY IS EVERYWHERE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_60",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587235/scoopcast_frames/Live_and_Let_Die_1973.webp",
    answer: "LIVE AND LET DIE",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_61",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587241/scoopcast_frames/Something_Wild_1961_1961.webp",
    answer: "SOMETHING WILD (1961)",
    year: "1961",
    tag: "classic"
  },
  {
    id: "f_62",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587243/scoopcast_frames/Forrest_Gump_1994.webp",
    answer: "FORREST GUMP",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_63",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587244/scoopcast_frames/Octopussy_1983.webp",
    answer: "OCTOPUSSY",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_64",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587249/scoopcast_frames/Invention_For_Destruction_1958.webp",
    answer: "INVENTION FOR DESTRUCTION",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_65",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587251/scoopcast_frames/Red_Rooms_2023.webp",
    answer: "RED ROOMS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_66",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587252/scoopcast_frames/The_Peasants_2023.webp",
    answer: "THE PEASANTS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_67",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587253/scoopcast_frames/France_2021.webp",
    answer: "FRANCE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_68",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587387/scoopcast_frames/Le_Plaisir_1952.webp",
    answer: "LE PLAISIR",
    year: "1952",
    tag: "classic"
  },
  {
    id: "f_69",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587389/scoopcast_frames/Kiss_of_Death_1947.webp",
    answer: "KISS OF DEATH",
    year: "1947",
    tag: "classic"
  },
  {
    id: "f_70",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587393/scoopcast_frames/Fiddler_On_The_Roof_1971.webp",
    answer: "FIDDLER ON THE ROOF",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_71",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587394/scoopcast_frames/The_Prince_of_Tides_1991.webp",
    answer: "THE PRINCE OF TIDES",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_72",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587396/scoopcast_frames/The_Creator_2023.webp",
    answer: "THE CREATOR",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_73",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587403/scoopcast_frames/Encounter_of_the_Spooky_Kind_1980.webp",
    answer: "ENCOUNTER OF THE SPOOKY KIND",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_74",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587405/scoopcast_frames/Triple_Frontier_2019.webp",
    answer: "TRIPLE FRONTIER",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_75",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587410/scoopcast_frames/The_Cranes_Are_Flying_1957.webp",
    answer: "THE CRANES ARE FLYING",
    year: "1957",
    tag: "classic"
  },
  {
    id: "f_76",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587419/scoopcast_frames/The_Spider_Labyrinth_1988.webp",
    answer: "THE SPIDER LABYRINTH",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_77",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587420/scoopcast_frames/Infinity_Pool_2023.webp",
    answer: "INFINITY POOL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_78",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587423/scoopcast_frames/Red_Rocket_2021.webp",
    answer: "RED ROCKET",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_79",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587426/scoopcast_frames/An_Angel_At_My_Table_1990.webp",
    answer: "AN ANGEL AT MY TABLE",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_80",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587428/scoopcast_frames/Lingua_Franca_2019.webp",
    answer: "LINGUA FRANCA",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_81",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587428/scoopcast_frames/Wildcat_2023.webp",
    answer: "WILDCAT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_82",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587432/scoopcast_frames/The_Dark_Crystal_1982.webp",
    answer: "THE DARK CRYSTAL",
    year: "1982",
    tag: "classic"
  },
  {
    id: "f_83",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587435/scoopcast_frames/Pandora_and_the_Flying_Dutchman_1951.webp",
    answer: "PANDORA AND THE FLYING DUTCHMAN",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_84",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587438/scoopcast_frames/Dont_Breathe_2_2021.webp",
    answer: "DON'T BREATHE 2",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_85",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587440/scoopcast_frames/Beetlejuice_Beetlejuice_2024.webp",
    answer: "BEETLEJUICE BEETLEJUICE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_86",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587442/scoopcast_frames/Falcon_Lake_2022.webp",
    answer: "FALCON LAKE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_87",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587443/scoopcast_frames/Opening_Night_1977.webp",
    answer: "OPENING NIGHT",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_88",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587465/scoopcast_frames/The_Sacrifice_Game_2023.webp",
    answer: "THE SACRIFICE GAME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_89",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587466/scoopcast_frames/StageFright_1950.webp",
    answer: "STAGEFRIGHT",
    year: "1950",
    tag: "classic"
  },
  {
    id: "f_90",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587474/scoopcast_frames/Swing_Kids_2018.webp",
    answer: "SWING KIDS",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_91",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587482/scoopcast_frames/Under_The_Sand_2000.webp",
    answer: "UNDER THE SAND",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_92",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587484/scoopcast_frames/Legend_1985.webp",
    answer: "LEGEND",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_93",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587497/scoopcast_frames/Teen_Spirit_2023.webp",
    answer: "TEEN SPIRIT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_94",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587515/scoopcast_frames/Girlfight_2000.webp",
    answer: "GIRLFIGHT",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_95",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587527/scoopcast_frames/The_Many_Saints_of_Newark_2021.webp",
    answer: "THE MANY SAINTS OF NEWARK",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_96",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587528/scoopcast_frames/Black_Widow_2021.webp",
    answer: "BLACK WIDOW",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_97",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587529/scoopcast_frames/Diary_of_a_Mad_Housewife_1970.webp",
    answer: "DIARY OF A MAD HOUSEWIFE",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_98",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587543/scoopcast_frames/Flash_Gordon_1980.webp",
    answer: "FLASH GORDON",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_99",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587544/scoopcast_frames/Breaker_Morant_1980.webp",
    answer: "BREAKER MORANT",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_100",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587547/scoopcast_frames/Flashdance_1983.webp",
    answer: "FLASHDANCE",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_101",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587553/scoopcast_frames/True_Lies_1994.webp",
    answer: "TRUE LIES",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_102",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587557/scoopcast_frames/The_Lost_Boys_1987.webp",
    answer: "THE LOST BOYS",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_103",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587562/scoopcast_frames/Fallen_Leaves_2023.webp",
    answer: "FALLEN LEAVES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_104",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587573/scoopcast_frames/Peggy_Sue_Got_Married_1986.webp",
    answer: "PEGGY SUE GOT MARRIED",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_105",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587575/scoopcast_frames/Planet_Terror_2007.webp",
    answer: "PLANET TERROR",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_106",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587576/scoopcast_frames/Do_Revenge_2022.webp",
    answer: "DO REVENGE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_107",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587583/scoopcast_frames/The_Golem_1920.webp",
    answer: "THE GOLEM",
    year: "1920",
    tag: "classic"
  },
  {
    id: "f_108",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587592/scoopcast_frames/At_Eternitys_Gate_2018.webp",
    answer: "AT ETERNITY'S GATE",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_109",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587592/scoopcast_frames/The_Life_and_Death_of_Colonel_Blimp_1943.webp",
    answer: "THE LIFE AND DEATH OF COLONEL BLIMP",
    year: "1943",
    tag: "classic"
  },
  {
    id: "f_110",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587595/scoopcast_frames/The_Amityville_Horror_1979.webp",
    answer: "THE AMITYVILLE HORROR",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_111",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587608/scoopcast_frames/Stopmotion_2023.webp",
    answer: "STOPMOTION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_112",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587610/scoopcast_frames/Snake_Eyes_1998.webp",
    answer: "SNAKE EYES",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_113",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587612/scoopcast_frames/Rebel_Ridge_2024.webp",
    answer: "REBEL RIDGE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_114",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587618/scoopcast_frames/Inexorable_2021.webp",
    answer: "INEXORABLE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_115",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587621/scoopcast_frames/White_River_2023.webp",
    answer: "WHITE RIVER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_116",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587624/scoopcast_frames/I_Came_By_2022.webp",
    answer: "I CAME BY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_117",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587632/scoopcast_frames/Empire_Records_1995.webp",
    answer: "EMPIRE RECORDS",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_118",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587634/scoopcast_frames/Nandor_Fodor_and_the_Talking_Mongoose_2023.webp",
    answer: "NANDOR FODOR AND THE TALKING MONGOOSE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_119",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587638/scoopcast_frames/Vulcanizadora_2024.webp",
    answer: "VULCANIZADORA",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_120",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587647/scoopcast_frames/Shoot_Em_Up_2007.webp",
    answer: "SHOOT 'EM UP",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_121",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587653/scoopcast_frames/The_Beyond_1981.webp",
    answer: "THE BEYOND",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_122",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587666/scoopcast_frames/When_Evil_Lurks_2023.webp",
    answer: "WHEN EVIL LURKS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_123",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587688/scoopcast_frames/Monkey_Man_2024.webp",
    answer: "MONKEY MAN",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_124",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587691/scoopcast_frames/The_Strawberry_Blonde_1941.webp",
    answer: "THE STRAWBERRY BLONDE",
    year: "1941",
    tag: "classic"
  },
  {
    id: "f_125",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587693/scoopcast_frames/Lord_of_War_2005.webp",
    answer: "LORD OF WAR",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_126",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587694/scoopcast_frames/She_Said_2022.webp",
    answer: "SHE SAID",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_127",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587714/scoopcast_frames/Contact_1997.webp",
    answer: "CONTACT",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_128",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587724/scoopcast_frames/Settlers_2021.webp",
    answer: "SETTLERS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_129",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587727/scoopcast_frames/Inside_2023_2023.webp",
    answer: "INSIDE (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_130",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587731/scoopcast_frames/Elvis_2022.webp",
    answer: "ELVIS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_131",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587745/scoopcast_frames/Kubi_2023.webp",
    answer: "KUBI",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_132",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587750/scoopcast_frames/The_Book_of_Clarence_2023.webp",
    answer: "THE BOOK OF CLARENCE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_133",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587752/scoopcast_frames/La_Abuela_2021.webp",
    answer: "LA ABUELA",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_134",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587754/scoopcast_frames/Charm_City_Kings_2020.webp",
    answer: "CHARM CITY KINGS",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_135",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587767/scoopcast_frames/Fatal_Attraction_1987.webp",
    answer: "FATAL ATTRACTION",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_136",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587770/scoopcast_frames/Opera_1987.webp",
    answer: "OPERA",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_137",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587809/scoopcast_frames/The_Empty_Man_2020.webp",
    answer: "THE EMPTY MAN",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_138",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587810/scoopcast_frames/Bringing_Up_Baby_1938.webp",
    answer: "BRINGING UP BABY",
    year: "1938",
    tag: "classic"
  },
  {
    id: "f_139",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587824/scoopcast_frames/Speed_1994.webp",
    answer: "SPEED",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_140",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587831/scoopcast_frames/The_Killer_1989_1989.webp",
    answer: "THE KILLER (1989)",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_141",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587836/scoopcast_frames/Long_Shot_2019.webp",
    answer: "LONG SHOT",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_142",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587867/scoopcast_frames/A_View_to_a_Kill_1985.webp",
    answer: "A VIEW TO A KILL",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_143",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587875/scoopcast_frames/Songs_For_A_Sloth_2021.webp",
    answer: "SONGS FOR A SLOTH",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_144",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587887/scoopcast_frames/The_Man_With_the_Golden_Gun_1974.webp",
    answer: "THE MAN WITH THE GOLDEN GUN",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_145",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587890/scoopcast_frames/Dream_Scenario_2023.webp",
    answer: "DREAM SCENARIO",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_146",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587893/scoopcast_frames/Night_of_the_Creeps_1986.webp",
    answer: "NIGHT OF THE CREEPS",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_147",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587928/scoopcast_frames/Starve_Acre_2023.webp",
    answer: "STARVE ACRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_148",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587930/scoopcast_frames/A_Generation_1955.webp",
    answer: "A GENERATION",
    year: "1955",
    tag: "classic"
  },
  {
    id: "f_149",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588010/scoopcast_frames/The_Spy_Who_Loved_Me_1977.webp",
    answer: "THE SPY WHO LOVED ME",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_150",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588011/scoopcast_frames/The_Scent_of_Green_Papaya_1993.webp",
    answer: "THE SCENT OF GREEN PAPAYA",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_151",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588045/scoopcast_frames/Walk_Up_2022.webp",
    answer: "WALK UP",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_152",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588050/scoopcast_frames/Spencer_2021.webp",
    answer: "SPENCER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_153",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588066/scoopcast_frames/A_Woman_Kills_1968.webp",
    answer: "A WOMAN KILLS",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_154",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588067/scoopcast_frames/At_Midnight_Ill_Take_Your_Soul_1964.webp",
    answer: "AT MIDNIGHT I'LL TAKE YOUR SOUL",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_155",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588069/scoopcast_frames/One_Fine_Morning_2022.webp",
    answer: "ONE FINE MORNING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_156",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588073/scoopcast_frames/Riceboy_Sleeps_2022.webp",
    answer: "RICEBOY SLEEPS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_157",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588109/scoopcast_frames/A_Better_Tomorrow_1986.webp",
    answer: "A BETTER TOMORROW",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_158",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588132/scoopcast_frames/Thesis_1996.webp",
    answer: "THESIS",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_159",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588134/scoopcast_frames/Downfall_2004.webp",
    answer: "DOWNFALL",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_160",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588134/scoopcast_frames/Sleeping_Beauty_1959_2022.webp",
    answer: "SLEEPING BEAUTY (1959)",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_161",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588136/scoopcast_frames/Hagazussa_2017.webp",
    answer: "HAGAZUSSA",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_162",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588169/scoopcast_frames/Trim_Season_2023.webp",
    answer: "TRIM SEASON",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_163",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588173/scoopcast_frames/Space_is_the_Place_1974.webp",
    answer: "SPACE IS THE PLACE",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_164",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588185/scoopcast_frames/Nanny_2022.webp",
    answer: "NANNY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_165",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588188/scoopcast_frames/The_Gift_2015.webp",
    answer: "THE GIFT",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_166",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588231/scoopcast_frames/Vesper_2022.webp",
    answer: "VESPER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_167",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588251/scoopcast_frames/The_Margin_1976.webp",
    answer: "THE MARGIN",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_168",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588253/scoopcast_frames/Old_2021.webp",
    answer: "OLD",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_169",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588254/scoopcast_frames/As_In_Heaven_2021.webp",
    answer: "AS IN HEAVEN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_170",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588295/scoopcast_frames/Tommy_1975.webp",
    answer: "TOMMY",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_171",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588297/scoopcast_frames/Benedetta_2021.webp",
    answer: "BENEDETTA",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_172",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588710/scoopcast_frames/Three_Colours_Blue_1993.webp",
    answer: "THREE COLOURS: BLUE",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_173",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588715/scoopcast_frames/Antichrist_2009.webp",
    answer: "ANTICHRIST",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_174",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588803/scoopcast_frames/The_Last_Boy_Scout_1991.jpg",
    answer: "THE LAST BOY SCOUT",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_175",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588805/scoopcast_frames/All_Dirt_Roads_Taste_of_Salt_2023.jpg",
    answer: "ALL DIRT ROADS TASTE OF SALT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_176",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588808/scoopcast_frames/Bigger_Than_Life_1956.jpg",
    answer: "BIGGER THAN LIFE",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_177",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588810/scoopcast_frames/House_By_The_River_1950.jpg",
    answer: "HOUSE BY THE RIVER",
    year: "1950",
    tag: "classic"
  },
  {
    id: "f_178",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588817/scoopcast_frames/Last_Night_1998.jpg",
    answer: "LAST NIGHT",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_179",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588819/scoopcast_frames/Strawberry_Mansion_2021.jpg",
    answer: "STRAWBERRY MANSION",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_180",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588821/scoopcast_frames/The_Set_Up_1949.jpg",
    answer: "THE SET-UP",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_181",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588822/scoopcast_frames/Fortress_1992.jpg",
    answer: "FORTRESS",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_182",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588824/scoopcast_frames/Fremont_2023.jpg",
    answer: "FREMONT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_183",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588827/scoopcast_frames/Infernal_Affairs_2002.jpg",
    answer: "INFERNAL AFFAIRS",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_184",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588829/scoopcast_frames/The_Magnificent_Seven_2016_2016.jpg",
    answer: "THE MAGNIFICENT SEVEN (2016)",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_185",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588186/scoopcast_frames/Napoleon_2023_2023.jpg",
    answer: "NAPOLEON (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_186",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588833/scoopcast_frames/Wonka_2023.jpg",
    answer: "WONKA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_187",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588834/scoopcast_frames/Spectre_2015.jpg",
    answer: "SPECTRE",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_188",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588840/scoopcast_frames/The_Book_of_Eli_2010.jpg",
    answer: "THE BOOK OF ELI",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_189",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588842/scoopcast_frames/Phantom_of_the_Paradise_1974.jpg",
    answer: "PHANTOM OF THE PARADISE",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_190",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588845/scoopcast_frames/Point_Blank_1967.jpg",
    answer: "POINT BLANK",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_191",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588846/scoopcast_frames/The_Harder_They_Fall_2021.jpg",
    answer: "THE HARDER THEY FALL",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_192",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588848/scoopcast_frames/Amanda_2022.jpg",
    answer: "AMANDA",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_193",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588851/scoopcast_frames/The_Whale_2022.jpg",
    answer: "THE WHALE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_194",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588853/scoopcast_frames/Casino_Royale_1967_1967.jpg",
    answer: "CASINO ROYALE (1967)",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_195",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588856/scoopcast_frames/Letter_From_An_Unknown_Woman_1948.jpg",
    answer: "LETTER FROM AN UNKNOWN WOMAN",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_196",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588868/scoopcast_frames/Safety_Last_1923.jpg",
    answer: "SAFETY LAST!",
    year: "1923",
    tag: "classic"
  },
  {
    id: "f_197",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588869/scoopcast_frames/The_Touch_1971.jpg",
    answer: "THE TOUCH",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_198",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588869/scoopcast_frames/The_Last_Emperor_1987.jpg",
    answer: "THE LAST EMPEROR",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_199",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588875/scoopcast_frames/Mona_Lisa_and_the_Blood_Moon_2021.jpg",
    answer: "MONA LISA AND THE BLOOD MOON",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_200",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588879/scoopcast_frames/Random_Acts_of_Violence_2019.jpg",
    answer: "RANDOM ACTS OF VIOLENCE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_201",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588885/scoopcast_frames/The_Others_2001.jpg",
    answer: "THE OTHERS",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_202",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588887/scoopcast_frames/From_Russia_With_Love_1963.jpg",
    answer: "FROM RUSSIA WITH LOVE",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_203",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588892/scoopcast_frames/Silver_Haze_2023.jpg",
    answer: "SILVER HAZE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_204",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588901/scoopcast_frames/Hellraiser_Revelations_2011.jpg",
    answer: "HELLRAISER: REVELATIONS",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_205",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588903/scoopcast_frames/Millennium_Mambo_2001.jpg",
    answer: "MILLENNIUM MAMBO",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_206",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588907/scoopcast_frames/Hellraiser_Hellseeker_2002.jpg",
    answer: "HELLRAISER: HELLSEEKER",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_207",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588909/scoopcast_frames/Ip_Man_2_2010.jpg",
    answer: "IP MAN 2",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_208",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588911/scoopcast_frames/One_And_Four_2021.jpg",
    answer: "ONE AND FOUR",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_209",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588914/scoopcast_frames/The_Sun_In_A_Net_1963.jpg",
    answer: "THE SUN IN A NET",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_210",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588929/scoopcast_frames/The_Baby_Carriage_1963.jpg",
    answer: "THE BABY CARRIAGE",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_211",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588931/scoopcast_frames/One_False_Move_1991.jpg",
    answer: "ONE FALSE MOVE",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_212",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588940/scoopcast_frames/The_War_of_the_Worlds_1953_1953.jpg",
    answer: "THE WAR OF THE WORLDS (1953)",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_213",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588959/scoopcast_frames/Demons_1985.jpg",
    answer: "DEMONS",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_214",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588960/scoopcast_frames/Anatomy_of_a_Murder_1959.jpg",
    answer: "ANATOMY OF A MURDER",
    year: "1959",
    tag: "classic"
  },
  {
    id: "f_215",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588963/scoopcast_frames/Rift_2017.jpg",
    answer: "RIFT",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_216",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588964/scoopcast_frames/The_Killing_of_a_Chinese_Bookie_1976.jpg",
    answer: "THE KILLING OF A CHINESE BOOKIE",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_217",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588988/scoopcast_frames/Autumn_Tale_1998.jpg",
    answer: "AUTUMN TALE",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_218",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588989/scoopcast_frames/Nekromantik_1988.jpg",
    answer: "NEKROMANTIK",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_219",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588991/scoopcast_frames/Fuzzy_Head_2023.jpg",
    answer: "FUZZY HEAD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_220",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588996/scoopcast_frames/Sometimes_I_Think_About_Dying_2023.jpg",
    answer: "SOMETIMES I THINK ABOUT DYING",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_221",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588997/scoopcast_frames/Abigail_2024.jpg",
    answer: "ABIGAIL",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_222",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589006/scoopcast_frames/Curse_of_the_Crimson_Altar_1968.jpg",
    answer: "CURSE OF THE CRIMSON ALTAR",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_223",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589009/scoopcast_frames/Them_1954.jpg",
    answer: "THEM!",
    year: "1954",
    tag: "classic"
  },
  {
    id: "f_224",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589018/scoopcast_frames/Robot_Dreams_2023.jpg",
    answer: "ROBOT DREAMS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_225",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589021/scoopcast_frames/Flowers_of_Shanghai_1998.jpg",
    answer: "FLOWERS OF SHANGHAI",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_226",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589049/scoopcast_frames/Touch_1997.jpg",
    answer: "TOUCH",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_227",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589050/scoopcast_frames/Christmas_Bloody_Christmas_2022.jpg",
    answer: "CHRISTMAS BLOODY CHRISTMAS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_228",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589052/scoopcast_frames/Babylon_2022.jpg",
    answer: "BABYLON",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_229",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589055/scoopcast_frames/Halloween_Kills_2021.jpg",
    answer: "HALLOWEEN KILLS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_230",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589057/scoopcast_frames/Fahrenheit_451_2018_2018.jpg",
    answer: "FAHRENHEIT 451 (2018)",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_231",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589061/scoopcast_frames/The_Good_Nurse_2022.jpg",
    answer: "THE GOOD NURSE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_232",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589068/scoopcast_frames/Universal_Soldier_Day_of_Reckoning_2012.jpg",
    answer: "UNIVERSAL SOLDIER: DAY OF RECKONING",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_233",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589070/scoopcast_frames/Kingdom_of_Heaven_2005.jpg",
    answer: "KINGDOM OF HEAVEN",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_234",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589072/scoopcast_frames/Barbie_2023.jpg",
    answer: "BARBIE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_235",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589076/scoopcast_frames/Canoa_A_Shameful_Memory_1976.jpg",
    answer: "CANOA: A SHAMEFUL MEMORY",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_236",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589081/scoopcast_frames/The_Naked_City_1948.jpg",
    answer: "THE NAKED CITY",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_237",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589083/scoopcast_frames/Gasoline_Rainbow_2023.jpg",
    answer: "GASOLINE RAINBOW",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_238",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589085/scoopcast_frames/Village_of_the_Damned_1960.jpg",
    answer: "VILLAGE OF THE DAMNED",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_239",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589113/scoopcast_frames/Domain_2016.jpg",
    answer: "DOMAIN",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_240",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589114/scoopcast_frames/Altered_States_1980.jpg",
    answer: "ALTERED STATES",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_241",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589115/scoopcast_frames/Starred_Up_2013.jpg",
    answer: "STARRED UP",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_242",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589127/scoopcast_frames/The_Host_2006.jpg",
    answer: "THE HOST",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_243",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589128/scoopcast_frames/Creed_III_2023.jpg",
    answer: "CREED III",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_244",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589131/scoopcast_frames/Leave_The_World_Behind_2023.jpg",
    answer: "LEAVE THE WORLD BEHIND",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_245",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589134/scoopcast_frames/Inside_The_Yellow_Cocoon_Shell_2023.jpg",
    answer: "INSIDE THE YELLOW COCOON SHELL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_246",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589137/scoopcast_frames/The_Tragedy_of_Macbeth_2021.jpg",
    answer: "THE TRAGEDY OF MACBETH",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_247",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589139/scoopcast_frames/Macbeth_1971_1971.jpg",
    answer: "MACBETH (1971)",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_248",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589142/scoopcast_frames/Babel_2006.jpg",
    answer: "BABEL",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_249",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588133/scoopcast_frames/My_Policeman_2022.jpg",
    answer: "MY POLICEMAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_250",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589145/scoopcast_frames/Straight_Time_1978.jpg",
    answer: "STRAIGHT TIME",
    year: "1978",
    tag: "classic"
  },
  {
    id: "f_251",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589147/scoopcast_frames/Key_Largo_1948.jpg",
    answer: "KEY LARGO",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_252",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589168/scoopcast_frames/Teenage_Mutant_Ninja_Turtles_Mutant_Mayhem_2023.jpg",
    answer: "TEENAGE MUTANT NINJA TURTLES: MUTANT MAYHEM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_253",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589172/scoopcast_frames/Copshop_2021.jpg",
    answer: "COPSHOP",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_254",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589175/scoopcast_frames/The_Lodge_2019.jpg",
    answer: "THE LODGE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_255",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589176/scoopcast_frames/Femme_Fatale_2002.jpg",
    answer: "FEMME FATALE",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_256",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589177/scoopcast_frames/Ikarie_XB_1_1963.jpg",
    answer: "IKARIE XB 1",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_257",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589181/scoopcast_frames/Chevalier_2015.jpg",
    answer: "CHEVALIER",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_258",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589184/scoopcast_frames/The_World_of_Kanako_2014.jpg",
    answer: "THE WORLD OF KANAKO",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_259",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589187/scoopcast_frames/Linoleum_2022.jpg",
    answer: "LINOLEUM",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_260",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589189/scoopcast_frames/3_Godfathers_1948.jpg",
    answer: "3 GODFATHERS",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_261",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589193/scoopcast_frames/Ma_Vie_En_Rose_1997.jpg",
    answer: "MA VIE EN ROSE",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_262",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589196/scoopcast_frames/The_Bikeriders_2023.jpg",
    answer: "THE BIKERIDERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_263",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589197/scoopcast_frames/Come_and_See_1985.jpg",
    answer: "COME AND SEE",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_264",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589198/scoopcast_frames/The_Bride_Wore_Black_1968.jpg",
    answer: "THE BRIDE WORE BLACK",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_265",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589199/scoopcast_frames/The_World_is_Not_Enough_1999.jpg",
    answer: "THE WORLD IS NOT ENOUGH",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_266",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589200/scoopcast_frames/The_Ruins_2008.jpg",
    answer: "THE RUINS",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_267",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589201/scoopcast_frames/Insidious_Chapter_2_2013.jpg",
    answer: "INSIDIOUS: CHAPTER 2",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_268",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589204/scoopcast_frames/You_Are_Not_My_Mother_2021.jpg",
    answer: "YOU ARE NOT MY MOTHER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_269",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589206/scoopcast_frames/The_Night_Porter_1974.jpg",
    answer: "THE NIGHT PORTER",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_270",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587805/scoopcast_frames/The_Whip_and_The_Body_1963.jpg",
    answer: "THE WHIP AND THE BODY",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_271",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589230/scoopcast_frames/Ip_Man_2008.jpg",
    answer: "IP MAN",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_272",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589232/scoopcast_frames/Kuroneko_1968.jpg",
    answer: "KURONEKO",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_273",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589233/scoopcast_frames/Crazy_About_Her_2021.jpg",
    answer: "CRAZY ABOUT HER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_274",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589235/scoopcast_frames/Alex_Wheatle_2020.jpg",
    answer: "ALEX WHEATLE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_275",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589237/scoopcast_frames/Tomorrow_Never_Dies_1997.jpg",
    answer: "TOMORROW NEVER DIES",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_276",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589244/scoopcast_frames/Anna_and_the_Apocalypse_2017.jpg",
    answer: "ANNA AND THE APOCALYPSE",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_277",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589246/scoopcast_frames/Crimes_of_Passion_1984.jpg",
    answer: "CRIMES OF PASSION",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_278",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589246/scoopcast_frames/Immaculate_2024.jpg",
    answer: "IMMACULATE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_279",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589250/scoopcast_frames/LaRoy_Texas_2023.jpg",
    answer: "LAROY, TEXAS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_280",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589251/scoopcast_frames/Knock_at_the_Cabin_2023.jpg",
    answer: "KNOCK AT THE CABIN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_281",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589253/scoopcast_frames/Dont_Worry_Darling_2022.jpg",
    answer: "DON'T WORRY DARLING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_282",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589253/scoopcast_frames/The_Thin_Man_1934.jpg",
    answer: "THE THIN MAN",
    year: "1934",
    tag: "classic"
  },
  {
    id: "f_283",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589256/scoopcast_frames/Happiness_1998.jpg",
    answer: "HAPPINESS",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_284",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589260/scoopcast_frames/Serie_Noire_1979.jpg",
    answer: "SERIE NOIRE",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_285",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589262/scoopcast_frames/A_Day_At_The_Races_1937.jpg",
    answer: "A DAY AT THE RACES",
    year: "1937",
    tag: "classic"
  },
  {
    id: "f_286",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589288/scoopcast_frames/Bardo_False_Chronicle_of_a_Handful_of_Truths_2022.jpg",
    answer: "BARDO: FALSE CHRONICLE OF A HANDFUL OF TRUTHS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_287",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589289/scoopcast_frames/The_Card_Counter_2021.jpg",
    answer: "THE CARD COUNTER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_288",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589293/scoopcast_frames/Mouchette_1967.jpg",
    answer: "MOUCHETTE",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_289",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589296/scoopcast_frames/The_Adjuster_1991.jpg",
    answer: "THE ADJUSTER",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_290",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589298/scoopcast_frames/Shang_Chi_and_the_Legend_of_the_Ten_Rings_2021.jpg",
    answer: "SHANG-CHI AND THE LEGEND OF THE TEN RINGS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_291",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589301/scoopcast_frames/The_Misfits_1961.jpg",
    answer: "THE MISFITS",
    year: "1961",
    tag: "classic"
  },
  {
    id: "f_292",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589302/scoopcast_frames/Deep_Water_2022.jpg",
    answer: "DEEP WATER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_293",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589302/scoopcast_frames/Glass_Onion_2022.jpg",
    answer: "GLASS ONION",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_294",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589303/scoopcast_frames/The_Little_Mermaid_1989.jpg",
    answer: "THE LITTLE MERMAID",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_295",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589304/scoopcast_frames/A_Confucian_Confusion_1994.jpg",
    answer: "A CONFUCIAN CONFUSION",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_296",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589306/scoopcast_frames/Last_Action_Hero_1993.jpg",
    answer: "LAST ACTION HERO",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_297",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589308/scoopcast_frames/Thelma_and_Louise_1991.jpg",
    answer: "THELMA & LOUISE",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_298",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589309/scoopcast_frames/The_Mask_1994.jpg",
    answer: "THE MASK",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_299",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589313/scoopcast_frames/Outland_1981.jpg",
    answer: "OUTLAND",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_300",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589315/scoopcast_frames/Shirley_2020.jpg",
    answer: "SHIRLEY",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_301",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587828/scoopcast_frames/Bunny_Lake_Is_Missing_1965.jpg",
    answer: "BUNNY LAKE IS MISSING",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_302",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589316/scoopcast_frames/Grave_of_the_Fireflies_1988.jpg",
    answer: "GRAVE OF THE FIREFLIES",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_303",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589317/scoopcast_frames/The_Untamed_2016.jpg",
    answer: "THE UNTAMED",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_304",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589318/scoopcast_frames/Life_Is_Sweet_1990.jpg",
    answer: "LIFE IS SWEET",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_305",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589322/scoopcast_frames/Triangle_of_Sadness_2022.jpg",
    answer: "TRIANGLE OF SADNESS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_306",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589324/scoopcast_frames/Gaslight_1944.jpg",
    answer: "GASLIGHT",
    year: "1944",
    tag: "classic"
  },
  {
    id: "f_307",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589327/scoopcast_frames/Top_Gun_Maverick_2022.jpg",
    answer: "TOP GUN: MAVERICK",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_308",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589330/scoopcast_frames/Reds_1981.jpg",
    answer: "REDS",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_309",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589332/scoopcast_frames/Mississippi_Masala_1991.jpg",
    answer: "MISSISSIPPI MASALA",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_310",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589350/scoopcast_frames/3_Iron_2004.jpg",
    answer: "3-IRON",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_311",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589352/scoopcast_frames/Snowbound_2017.jpg",
    answer: "SNOWBOUND",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_312",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589352/scoopcast_frames/xxxHolic_2022.jpg",
    answer: "XXXHOLIC",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_313",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589352/scoopcast_frames/The_Black_Phone_2021.jpg",
    answer: "THE BLACK PHONE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_314",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589354/scoopcast_frames/Faust_1994_1994.jpg",
    answer: "FAUST (1994)",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_315",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589356/scoopcast_frames/A_Room_With_A_View_1985.jpg",
    answer: "A ROOM WITH A VIEW",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_316",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589358/scoopcast_frames/Visible_Secret_2001.jpg",
    answer: "VISIBLE SECRET",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_317",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589362/scoopcast_frames/Monster_2023.jpg",
    answer: "MONSTER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_318",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589363/scoopcast_frames/Love_Lies_Bleeding_2024.jpg",
    answer: "LOVE LIES BLEEDING",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_319",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589367/scoopcast_frames/Bullet_Train_2022.jpg",
    answer: "BULLET TRAIN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_320",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587815/scoopcast_frames/The_Naked_Kiss_1964.jpg",
    answer: "THE NAKED KISS",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_321",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589368/scoopcast_frames/For_Your_Eyes_Only_1981.jpg",
    answer: "FOR YOUR EYES ONLY",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_322",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589370/scoopcast_frames/Ferrari_2023.jpg",
    answer: "FERRARI",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_323",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589370/scoopcast_frames/The_Big_Easy_1986.jpg",
    answer: "THE BIG EASY",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_324",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589371/scoopcast_frames/Sasquatch_Sunset_2024.jpg",
    answer: "SASQUATCH SUNSET",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_325",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589371/scoopcast_frames/The_Duellists_1977.jpg",
    answer: "THE DUELLISTS",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_326",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589373/scoopcast_frames/The_Spirit_2008.jpg",
    answer: "THE SPIRIT",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_327",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589376/scoopcast_frames/The_Karate_Kid_1984.jpg",
    answer: "THE KARATE KID",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_328",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589382/scoopcast_frames/Abuse_of_Weakness_2013.jpg",
    answer: "ABUSE OF WEAKNESS",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_329",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589386/scoopcast_frames/Maggie_Moores_2023.jpg",
    answer: "MAGGIE MOORE(S)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_330",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589388/scoopcast_frames/Prey_2022.jpg",
    answer: "PREY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_331",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589408/scoopcast_frames/T%C3%A1r_2022.jpg",
    answer: "TÁR",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_332",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589409/scoopcast_frames/Criss_Cross_1949.jpg",
    answer: "CRISS CROSS",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_333",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589411/scoopcast_frames/Azrael_2024.jpg",
    answer: "AZRAEL",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_334",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589411/scoopcast_frames/Sidonie_in_Japan_2023.jpg",
    answer: "SIDONIE IN JAPAN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_335",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589413/scoopcast_frames/Anselm_2023.jpg",
    answer: "ANSELM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_336",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589414/scoopcast_frames/Titane_2021.jpg",
    answer: "TITANE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_337",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589415/scoopcast_frames/Peppermint_Candy_1999.jpg",
    answer: "PEPPERMINT CANDY",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_338",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589417/scoopcast_frames/National_Anthem_2023.jpg",
    answer: "NATIONAL ANTHEM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_339",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589418/scoopcast_frames/Evil_Does_Not_Exist_2023.jpg",
    answer: "EVIL DOES NOT EXIST",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_340",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589419/scoopcast_frames/Priscilla_2023.jpg",
    answer: "PRISCILLA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_341",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589420/scoopcast_frames/Outside_Satan_2011.jpg",
    answer: "OUTSIDE SATAN",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_342",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589422/scoopcast_frames/The_Legend_of_the_7_Golden_Vampires_1974.jpg",
    answer: "THE LEGEND OF THE 7 GOLDEN VAMPIRES",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_343",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589424/scoopcast_frames/City_of_the_Living_Dead_1980.jpg",
    answer: "CITY OF THE LIVING DEAD",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_344",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Body_of_Lies_2008.jpg",
    answer: "BODY OF LIES",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_345",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Medium_Cool_1969.jpg",
    answer: "MEDIUM COOL",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_346",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589427/scoopcast_frames/The_Texas_Chainsaw_Massacre_2003.jpg",
    answer: "THE TEXAS CHAINSAW MASSACRE",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_347",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Typhoon_Club_1985.jpg",
    answer: "TYPHOON CLUB",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_348",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589428/scoopcast_frames/The_Worst_Person_in_the_World_2021.jpg",
    answer: "THE WORST PERSON IN THE WORLD",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_349",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589428/scoopcast_frames/Life_and_Nothing_More_1992.jpg",
    answer: "LIFE, AND NOTHING MORE",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_350",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589433/scoopcast_frames/Anatomy_of_a_Fall_2023.jpg",
    answer: "ANATOMY OF A FALL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_351",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589435/scoopcast_frames/Mami_Wata_2023.jpg",
    answer: "MAMI WATA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_352",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589435/scoopcast_frames/Westworld_1973.jpg",
    answer: "WESTWORLD",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_353",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589437/scoopcast_frames/Red_River_1948.jpg",
    answer: "RED RIVER",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_354",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589438/scoopcast_frames/Hidden_Away_2020.jpg",
    answer: "HIDDEN AWAY",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_355",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589439/scoopcast_frames/RMN_2022.jpg",
    answer: "R.M.N.",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_356",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589439/scoopcast_frames/Showing_Up_2022.jpg",
    answer: "SHOWING UP",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_357",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589440/scoopcast_frames/Amores_Perros_2000.jpg",
    answer: "AMORES PERROS",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_358",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589468/scoopcast_frames/The_Woman_King_2022.jpg",
    answer: "THE WOMAN KING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_359",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589470/scoopcast_frames/The_Hunt_2020.jpg",
    answer: "THE HUNT",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_360",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589470/scoopcast_frames/Three_Thousand_Years_of_Longing_2022.jpg",
    answer: "THREE THOUSAND YEARS OF LONGING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_361",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587646/scoopcast_frames/Kinds_of_Kindness_2024.jpg",
    answer: "KINDS OF KINDNESS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_362",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589471/scoopcast_frames/Candyman_2021_2021.jpg",
    answer: "CANDYMAN (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_363",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589472/scoopcast_frames/Master_Gardener_2022.jpg",
    answer: "MASTER GARDENER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_364",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589473/scoopcast_frames/Nostalghia_1983.jpg",
    answer: "NOSTALGHIA",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_365",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589476/scoopcast_frames/The_Holdovers_2023.jpg",
    answer: "THE HOLDOVERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_366",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589477/scoopcast_frames/Lolita_1997_1997.jpg",
    answer: "LOLITA (1997)",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_367",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589480/scoopcast_frames/Perfect_Days_2023.jpg",
    answer: "PERFECT DAYS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_368",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589480/scoopcast_frames/Death_Sentence_2007.jpg",
    answer: "DEATH SENTENCE",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_369",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589481/scoopcast_frames/American_Fiction_2023.jpg",
    answer: "AMERICAN FICTION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_370",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589482/scoopcast_frames/Ip_Man_3_2015.jpg",
    answer: "IP MAN 3",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_371",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589484/scoopcast_frames/We_Are_Zombies_2023.jpg",
    answer: "WE ARE ZOMBIES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_372",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589484/scoopcast_frames/God_Told_Me_To_1976.jpg",
    answer: "GOD TOLD ME TO",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_373",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589485/scoopcast_frames/Sid_and_Nancy_1986.jpg",
    answer: "SID AND NANCY",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_374",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589527/scoopcast_frames/Out_of_Darkness_2022.jpg",
    answer: "OUT OF DARKNESS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_375",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589529/scoopcast_frames/A_Man_Escaped_1956.jpg",
    answer: "A MAN ESCAPED",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_376",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588007/scoopcast_frames/Rebel_Moon_Part_One_A_Child_of_Fire_2023.jpg",
    answer: "REBEL MOON - PART ONE: A CHILD OF FIRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_377",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589532/scoopcast_frames/The_Big_Heat_1953.jpg",
    answer: "THE BIG HEAT",
    year: "1953",
    tag: "classic"
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
