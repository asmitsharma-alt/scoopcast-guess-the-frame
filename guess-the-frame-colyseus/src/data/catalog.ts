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
  // ── Guess The Frame (905 Dynamic Cinema Frames) ──
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
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587185/scoopcast_frames/Renfield_2023.webp",
    answer: "RENFIELD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_44",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587186/scoopcast_frames/Women_Talking_2022.webp",
    answer: "WOMEN TALKING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_45",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587191/scoopcast_frames/Branded_To_Kill_1967.webp",
    answer: "BRANDED TO KILL",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_46",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587194/scoopcast_frames/Mon_Crime_2023.webp",
    answer: "MON CRIME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_47",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587198/scoopcast_frames/Mayday_2021.webp",
    answer: "MAYDAY",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_48",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587204/scoopcast_frames/The_Wages_of_Fear_1953.webp",
    answer: "THE WAGES OF FEAR",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_49",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587206/scoopcast_frames/Wild_Zero_1999.webp",
    answer: "WILD ZERO",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_50",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587207/scoopcast_frames/Challengers_2024.webp",
    answer: "CHALLENGERS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_51",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587213/scoopcast_frames/The_Frighteners_1996.webp",
    answer: "THE FRIGHTENERS",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_52",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587215/scoopcast_frames/The_Pod_Generation_2023.webp",
    answer: "THE POD GENERATION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_53",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587219/scoopcast_frames/She_Came_To_Me_2023.webp",
    answer: "SHE CAME TO ME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_54",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587229/scoopcast_frames/Once_Within_A_Time_2022.webp",
    answer: "ONCE WITHIN A TIME",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_55",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587230/scoopcast_frames/The_Rocketeer_1991.webp",
    answer: "THE ROCKETEER",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_56",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587231/scoopcast_frames/The_Sky_Is_Everywhere_2022.webp",
    answer: "THE SKY IS EVERYWHERE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_57",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587235/scoopcast_frames/Live_and_Let_Die_1973.webp",
    answer: "LIVE AND LET DIE",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_58",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587241/scoopcast_frames/Something_Wild_1961_1961.webp",
    answer: "SOMETHING WILD (1961)",
    year: "1961",
    tag: "classic"
  },
  {
    id: "f_59",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587243/scoopcast_frames/Forrest_Gump_1994.webp",
    answer: "FORREST GUMP",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_60",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587244/scoopcast_frames/Octopussy_1983.webp",
    answer: "OCTOPUSSY",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_61",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587249/scoopcast_frames/Invention_For_Destruction_1958.webp",
    answer: "INVENTION FOR DESTRUCTION",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_62",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587251/scoopcast_frames/Red_Rooms_2023.webp",
    answer: "RED ROOMS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_63",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587252/scoopcast_frames/The_Peasants_2023.webp",
    answer: "THE PEASANTS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_64",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587253/scoopcast_frames/France_2021.webp",
    answer: "FRANCE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_65",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587387/scoopcast_frames/Le_Plaisir_1952.webp",
    answer: "LE PLAISIR",
    year: "1952",
    tag: "classic"
  },
  {
    id: "f_66",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587389/scoopcast_frames/Kiss_of_Death_1947.webp",
    answer: "KISS OF DEATH",
    year: "1947",
    tag: "classic"
  },
  {
    id: "f_67",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587393/scoopcast_frames/Fiddler_On_The_Roof_1971.webp",
    answer: "FIDDLER ON THE ROOF",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_68",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587394/scoopcast_frames/The_Prince_of_Tides_1991.webp",
    answer: "THE PRINCE OF TIDES",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_69",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587396/scoopcast_frames/The_Creator_2023.webp",
    answer: "THE CREATOR",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_70",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587403/scoopcast_frames/Encounter_of_the_Spooky_Kind_1980.webp",
    answer: "ENCOUNTER OF THE SPOOKY KIND",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_71",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587405/scoopcast_frames/Triple_Frontier_2019.webp",
    answer: "TRIPLE FRONTIER",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_72",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587410/scoopcast_frames/The_Cranes_Are_Flying_1957.webp",
    answer: "THE CRANES ARE FLYING",
    year: "1957",
    tag: "classic"
  },
  {
    id: "f_73",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587419/scoopcast_frames/The_Spider_Labyrinth_1988.webp",
    answer: "THE SPIDER LABYRINTH",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_74",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587426/scoopcast_frames/An_Angel_At_My_Table_1990.webp",
    answer: "AN ANGEL AT MY TABLE",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_75",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587428/scoopcast_frames/Lingua_Franca_2019.webp",
    answer: "LINGUA FRANCA",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_76",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587428/scoopcast_frames/Wildcat_2023.webp",
    answer: "WILDCAT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_77",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587432/scoopcast_frames/The_Dark_Crystal_1982.webp",
    answer: "THE DARK CRYSTAL",
    year: "1982",
    tag: "classic"
  },
  {
    id: "f_78",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587435/scoopcast_frames/Pandora_and_the_Flying_Dutchman_1951.webp",
    answer: "PANDORA AND THE FLYING DUTCHMAN",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_79",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587438/scoopcast_frames/Dont_Breathe_2_2021.webp",
    answer: "DON'T BREATHE 2",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_80",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587440/scoopcast_frames/Beetlejuice_Beetlejuice_2024.webp",
    answer: "BEETLEJUICE BEETLEJUICE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_81",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587442/scoopcast_frames/Falcon_Lake_2022.webp",
    answer: "FALCON LAKE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_82",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587443/scoopcast_frames/Opening_Night_1977.webp",
    answer: "OPENING NIGHT",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_83",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587465/scoopcast_frames/The_Sacrifice_Game_2023.webp",
    answer: "THE SACRIFICE GAME",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_84",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587466/scoopcast_frames/StageFright_1950.webp",
    answer: "STAGEFRIGHT",
    year: "1950",
    tag: "classic"
  },
  {
    id: "f_85",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587474/scoopcast_frames/Swing_Kids_2018.webp",
    answer: "SWING KIDS",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_86",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587482/scoopcast_frames/Under_The_Sand_2000.webp",
    answer: "UNDER THE SAND",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_87",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587484/scoopcast_frames/Legend_1985.webp",
    answer: "LEGEND",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_88",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587497/scoopcast_frames/Teen_Spirit_2023.webp",
    answer: "TEEN SPIRIT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_89",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587515/scoopcast_frames/Girlfight_2000.webp",
    answer: "GIRLFIGHT",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_90",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587527/scoopcast_frames/The_Many_Saints_of_Newark_2021.webp",
    answer: "THE MANY SAINTS OF NEWARK",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_91",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587528/scoopcast_frames/Black_Widow_2021.webp",
    answer: "BLACK WIDOW",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_92",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587529/scoopcast_frames/Diary_of_a_Mad_Housewife_1970.webp",
    answer: "DIARY OF A MAD HOUSEWIFE",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_93",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587543/scoopcast_frames/Flash_Gordon_1980.webp",
    answer: "FLASH GORDON",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_94",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587544/scoopcast_frames/Breaker_Morant_1980.webp",
    answer: "BREAKER MORANT",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_95",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587553/scoopcast_frames/True_Lies_1994.webp",
    answer: "TRUE LIES",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_96",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587557/scoopcast_frames/The_Lost_Boys_1987.webp",
    answer: "THE LOST BOYS",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_97",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587562/scoopcast_frames/Fallen_Leaves_2023.webp",
    answer: "FALLEN LEAVES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_98",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587573/scoopcast_frames/Peggy_Sue_Got_Married_1986.webp",
    answer: "PEGGY SUE GOT MARRIED",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_99",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587575/scoopcast_frames/Planet_Terror_2007.webp",
    answer: "PLANET TERROR",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_100",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587576/scoopcast_frames/Do_Revenge_2022.webp",
    answer: "DO REVENGE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_101",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587583/scoopcast_frames/The_Golem_1920.webp",
    answer: "THE GOLEM",
    year: "1920",
    tag: "classic"
  },
  {
    id: "f_102",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587592/scoopcast_frames/At_Eternitys_Gate_2018.webp",
    answer: "AT ETERNITY'S GATE",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_103",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587592/scoopcast_frames/The_Life_and_Death_of_Colonel_Blimp_1943.webp",
    answer: "THE LIFE AND DEATH OF COLONEL BLIMP",
    year: "1943",
    tag: "classic"
  },
  {
    id: "f_104",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587595/scoopcast_frames/The_Amityville_Horror_1979.webp",
    answer: "THE AMITYVILLE HORROR",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_105",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587608/scoopcast_frames/Stopmotion_2023.webp",
    answer: "STOPMOTION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_106",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587610/scoopcast_frames/Snake_Eyes_1998.webp",
    answer: "SNAKE EYES",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_107",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587612/scoopcast_frames/Rebel_Ridge_2024.webp",
    answer: "REBEL RIDGE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_108",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587618/scoopcast_frames/Inexorable_2021.webp",
    answer: "INEXORABLE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_109",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587621/scoopcast_frames/White_River_2023.webp",
    answer: "WHITE RIVER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_110",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587624/scoopcast_frames/I_Came_By_2022.webp",
    answer: "I CAME BY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_111",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587632/scoopcast_frames/Empire_Records_1995.webp",
    answer: "EMPIRE RECORDS",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_112",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587634/scoopcast_frames/Nandor_Fodor_and_the_Talking_Mongoose_2023.webp",
    answer: "NANDOR FODOR AND THE TALKING MONGOOSE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_113",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587638/scoopcast_frames/Vulcanizadora_2024.webp",
    answer: "VULCANIZADORA",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_114",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587647/scoopcast_frames/Shoot_Em_Up_2007.webp",
    answer: "SHOOT 'EM UP",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_115",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587653/scoopcast_frames/The_Beyond_1981.webp",
    answer: "THE BEYOND",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_116",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587666/scoopcast_frames/When_Evil_Lurks_2023.webp",
    answer: "WHEN EVIL LURKS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_117",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587688/scoopcast_frames/Monkey_Man_2024.webp",
    answer: "MONKEY MAN",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_118",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587691/scoopcast_frames/The_Strawberry_Blonde_1941.webp",
    answer: "THE STRAWBERRY BLONDE",
    year: "1941",
    tag: "classic"
  },
  {
    id: "f_119",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587693/scoopcast_frames/Lord_of_War_2005.webp",
    answer: "LORD OF WAR",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_120",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587694/scoopcast_frames/She_Said_2022.webp",
    answer: "SHE SAID",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_121",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587714/scoopcast_frames/Contact_1997.webp",
    answer: "CONTACT",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_122",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587724/scoopcast_frames/Settlers_2021.webp",
    answer: "SETTLERS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_123",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587727/scoopcast_frames/Inside_2023_2023.webp",
    answer: "INSIDE (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_124",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587731/scoopcast_frames/Elvis_2022.webp",
    answer: "ELVIS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_125",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587745/scoopcast_frames/Kubi_2023.webp",
    answer: "KUBI",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_126",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587750/scoopcast_frames/The_Book_of_Clarence_2023.webp",
    answer: "THE BOOK OF CLARENCE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_127",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587752/scoopcast_frames/La_Abuela_2021.webp",
    answer: "LA ABUELA",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_128",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587754/scoopcast_frames/Charm_City_Kings_2020.webp",
    answer: "CHARM CITY KINGS",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_129",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587770/scoopcast_frames/Opera_1987.webp",
    answer: "OPERA",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_130",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587809/scoopcast_frames/The_Empty_Man_2020.webp",
    answer: "THE EMPTY MAN",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_131",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587810/scoopcast_frames/Bringing_Up_Baby_1938.webp",
    answer: "BRINGING UP BABY",
    year: "1938",
    tag: "classic"
  },
  {
    id: "f_132",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587824/scoopcast_frames/Speed_1994.webp",
    answer: "SPEED",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_133",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587831/scoopcast_frames/The_Killer_1989_1989.webp",
    answer: "THE KILLER (1989)",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_134",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587836/scoopcast_frames/Long_Shot_2019.webp",
    answer: "LONG SHOT",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_135",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587867/scoopcast_frames/A_View_to_a_Kill_1985.webp",
    answer: "A VIEW TO A KILL",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_136",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587875/scoopcast_frames/Songs_For_A_Sloth_2021.webp",
    answer: "SONGS FOR A SLOTH",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_137",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587887/scoopcast_frames/The_Man_With_the_Golden_Gun_1974.webp",
    answer: "THE MAN WITH THE GOLDEN GUN",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_138",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587890/scoopcast_frames/Dream_Scenario_2023.webp",
    answer: "DREAM SCENARIO",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_139",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587893/scoopcast_frames/Night_of_the_Creeps_1986.webp",
    answer: "NIGHT OF THE CREEPS",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_140",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587928/scoopcast_frames/Starve_Acre_2023.webp",
    answer: "STARVE ACRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_141",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587930/scoopcast_frames/A_Generation_1955.webp",
    answer: "A GENERATION",
    year: "1955",
    tag: "classic"
  },
  {
    id: "f_142",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588010/scoopcast_frames/The_Spy_Who_Loved_Me_1977.webp",
    answer: "THE SPY WHO LOVED ME",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_143",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588011/scoopcast_frames/The_Scent_of_Green_Papaya_1993.webp",
    answer: "THE SCENT OF GREEN PAPAYA",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_144",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588045/scoopcast_frames/Walk_Up_2022.webp",
    answer: "WALK UP",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_145",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588050/scoopcast_frames/Spencer_2021.webp",
    answer: "SPENCER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_146",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588066/scoopcast_frames/A_Woman_Kills_1968.webp",
    answer: "A WOMAN KILLS",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_147",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588067/scoopcast_frames/At_Midnight_Ill_Take_Your_Soul_1964.webp",
    answer: "AT MIDNIGHT I'LL TAKE YOUR SOUL",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_148",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588069/scoopcast_frames/One_Fine_Morning_2022.webp",
    answer: "ONE FINE MORNING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_149",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588073/scoopcast_frames/Riceboy_Sleeps_2022.webp",
    answer: "RICEBOY SLEEPS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_150",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588109/scoopcast_frames/A_Better_Tomorrow_1986.webp",
    answer: "A BETTER TOMORROW",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_151",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588132/scoopcast_frames/Thesis_1996.webp",
    answer: "THESIS",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_152",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588134/scoopcast_frames/Downfall_2004.webp",
    answer: "DOWNFALL",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_153",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588134/scoopcast_frames/Sleeping_Beauty_1959_2022.webp",
    answer: "SLEEPING BEAUTY (1959)",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_154",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588136/scoopcast_frames/Hagazussa_2017.webp",
    answer: "HAGAZUSSA",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_155",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588169/scoopcast_frames/Trim_Season_2023.webp",
    answer: "TRIM SEASON",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_156",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588173/scoopcast_frames/Space_is_the_Place_1974.webp",
    answer: "SPACE IS THE PLACE",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_157",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588185/scoopcast_frames/Nanny_2022.webp",
    answer: "NANNY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_158",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588188/scoopcast_frames/The_Gift_2015.webp",
    answer: "THE GIFT",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_159",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588231/scoopcast_frames/Vesper_2022.webp",
    answer: "VESPER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_160",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588253/scoopcast_frames/Old_2021.webp",
    answer: "OLD",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_161",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588254/scoopcast_frames/As_In_Heaven_2021.webp",
    answer: "AS IN HEAVEN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_162",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588295/scoopcast_frames/Tommy_1975.webp",
    answer: "TOMMY",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_163",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588710/scoopcast_frames/Three_Colours_Blue_1993.webp",
    answer: "THREE COLOURS: BLUE",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_164",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588803/scoopcast_frames/The_Last_Boy_Scout_1991.jpg",
    answer: "THE LAST BOY SCOUT",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_165",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588805/scoopcast_frames/All_Dirt_Roads_Taste_of_Salt_2023.jpg",
    answer: "ALL DIRT ROADS TASTE OF SALT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_166",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588808/scoopcast_frames/Bigger_Than_Life_1956.jpg",
    answer: "BIGGER THAN LIFE",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_167",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588810/scoopcast_frames/House_By_The_River_1950.jpg",
    answer: "HOUSE BY THE RIVER",
    year: "1950",
    tag: "classic"
  },
  {
    id: "f_168",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588817/scoopcast_frames/Last_Night_1998.jpg",
    answer: "LAST NIGHT",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_169",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588819/scoopcast_frames/Strawberry_Mansion_2021.jpg",
    answer: "STRAWBERRY MANSION",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_170",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588821/scoopcast_frames/The_Set_Up_1949.jpg",
    answer: "THE SET-UP",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_171",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588822/scoopcast_frames/Fortress_1992.jpg",
    answer: "FORTRESS",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_172",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588824/scoopcast_frames/Fremont_2023.jpg",
    answer: "FREMONT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_173",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588827/scoopcast_frames/Infernal_Affairs_2002.jpg",
    answer: "INFERNAL AFFAIRS",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_174",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588829/scoopcast_frames/The_Magnificent_Seven_2016_2016.jpg",
    answer: "THE MAGNIFICENT SEVEN (2016)",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_175",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588186/scoopcast_frames/Napoleon_2023_2023.jpg",
    answer: "NAPOLEON (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_176",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588833/scoopcast_frames/Wonka_2023.jpg",
    answer: "WONKA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_177",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588834/scoopcast_frames/Spectre_2015.jpg",
    answer: "SPECTRE",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_178",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588840/scoopcast_frames/The_Book_of_Eli_2010.jpg",
    answer: "THE BOOK OF ELI",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_179",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588842/scoopcast_frames/Phantom_of_the_Paradise_1974.jpg",
    answer: "PHANTOM OF THE PARADISE",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_180",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588845/scoopcast_frames/Point_Blank_1967.jpg",
    answer: "POINT BLANK",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_181",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588846/scoopcast_frames/The_Harder_They_Fall_2021.jpg",
    answer: "THE HARDER THEY FALL",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_182",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588848/scoopcast_frames/Amanda_2022.jpg",
    answer: "AMANDA",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_183",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588851/scoopcast_frames/The_Whale_2022.jpg",
    answer: "THE WHALE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_184",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588853/scoopcast_frames/Casino_Royale_1967_1967.jpg",
    answer: "CASINO ROYALE (1967)",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_185",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588856/scoopcast_frames/Letter_From_An_Unknown_Woman_1948.jpg",
    answer: "LETTER FROM AN UNKNOWN WOMAN",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_186",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588868/scoopcast_frames/Safety_Last_1923.jpg",
    answer: "SAFETY LAST!",
    year: "1923",
    tag: "classic"
  },
  {
    id: "f_187",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588869/scoopcast_frames/The_Touch_1971.jpg",
    answer: "THE TOUCH",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_188",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588869/scoopcast_frames/The_Last_Emperor_1987.jpg",
    answer: "THE LAST EMPEROR",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_189",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588875/scoopcast_frames/Mona_Lisa_and_the_Blood_Moon_2021.jpg",
    answer: "MONA LISA AND THE BLOOD MOON",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_190",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588879/scoopcast_frames/Random_Acts_of_Violence_2019.jpg",
    answer: "RANDOM ACTS OF VIOLENCE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_191",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588885/scoopcast_frames/The_Others_2001.jpg",
    answer: "THE OTHERS",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_192",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588887/scoopcast_frames/From_Russia_With_Love_1963.jpg",
    answer: "FROM RUSSIA WITH LOVE",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_193",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588892/scoopcast_frames/Silver_Haze_2023.jpg",
    answer: "SILVER HAZE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_194",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588901/scoopcast_frames/Hellraiser_Revelations_2011.jpg",
    answer: "HELLRAISER: REVELATIONS",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_195",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588903/scoopcast_frames/Millennium_Mambo_2001.jpg",
    answer: "MILLENNIUM MAMBO",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_196",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588907/scoopcast_frames/Hellraiser_Hellseeker_2002.jpg",
    answer: "HELLRAISER: HELLSEEKER",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_197",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588909/scoopcast_frames/Ip_Man_2_2010.jpg",
    answer: "IP MAN 2",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_198",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588911/scoopcast_frames/One_And_Four_2021.jpg",
    answer: "ONE AND FOUR",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_199",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588914/scoopcast_frames/The_Sun_In_A_Net_1963.jpg",
    answer: "THE SUN IN A NET",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_200",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588929/scoopcast_frames/The_Baby_Carriage_1963.jpg",
    answer: "THE BABY CARRIAGE",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_201",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588931/scoopcast_frames/One_False_Move_1991.jpg",
    answer: "ONE FALSE MOVE",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_202",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588940/scoopcast_frames/The_War_of_the_Worlds_1953_1953.jpg",
    answer: "THE WAR OF THE WORLDS (1953)",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_203",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588959/scoopcast_frames/Demons_1985.jpg",
    answer: "DEMONS",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_204",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588960/scoopcast_frames/Anatomy_of_a_Murder_1959.jpg",
    answer: "ANATOMY OF A MURDER",
    year: "1959",
    tag: "classic"
  },
  {
    id: "f_205",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588963/scoopcast_frames/Rift_2017.jpg",
    answer: "RIFT",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_206",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588964/scoopcast_frames/The_Killing_of_a_Chinese_Bookie_1976.jpg",
    answer: "THE KILLING OF A CHINESE BOOKIE",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_207",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588988/scoopcast_frames/Autumn_Tale_1998.jpg",
    answer: "AUTUMN TALE",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_208",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588991/scoopcast_frames/Fuzzy_Head_2023.jpg",
    answer: "FUZZY HEAD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_209",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588996/scoopcast_frames/Sometimes_I_Think_About_Dying_2023.jpg",
    answer: "SOMETIMES I THINK ABOUT DYING",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_210",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588997/scoopcast_frames/Abigail_2024.jpg",
    answer: "ABIGAIL",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_211",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589006/scoopcast_frames/Curse_of_the_Crimson_Altar_1968.jpg",
    answer: "CURSE OF THE CRIMSON ALTAR",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_212",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589009/scoopcast_frames/Them_1954.jpg",
    answer: "THEM!",
    year: "1954",
    tag: "classic"
  },
  {
    id: "f_213",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589018/scoopcast_frames/Robot_Dreams_2023.jpg",
    answer: "ROBOT DREAMS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_214",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589021/scoopcast_frames/Flowers_of_Shanghai_1998.jpg",
    answer: "FLOWERS OF SHANGHAI",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_215",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589049/scoopcast_frames/Touch_1997.jpg",
    answer: "TOUCH",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_216",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589050/scoopcast_frames/Christmas_Bloody_Christmas_2022.jpg",
    answer: "CHRISTMAS BLOODY CHRISTMAS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_217",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589055/scoopcast_frames/Halloween_Kills_2021.jpg",
    answer: "HALLOWEEN KILLS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_218",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589057/scoopcast_frames/Fahrenheit_451_2018_2018.jpg",
    answer: "FAHRENHEIT 451 (2018)",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_219",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589061/scoopcast_frames/The_Good_Nurse_2022.jpg",
    answer: "THE GOOD NURSE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_220",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589068/scoopcast_frames/Universal_Soldier_Day_of_Reckoning_2012.jpg",
    answer: "UNIVERSAL SOLDIER: DAY OF RECKONING",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_221",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589070/scoopcast_frames/Kingdom_of_Heaven_2005.jpg",
    answer: "KINGDOM OF HEAVEN",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_222",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589072/scoopcast_frames/Barbie_2023.jpg",
    answer: "BARBIE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_223",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589076/scoopcast_frames/Canoa_A_Shameful_Memory_1976.jpg",
    answer: "CANOA: A SHAMEFUL MEMORY",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_224",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589081/scoopcast_frames/The_Naked_City_1948.jpg",
    answer: "THE NAKED CITY",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_225",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589083/scoopcast_frames/Gasoline_Rainbow_2023.jpg",
    answer: "GASOLINE RAINBOW",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_226",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589085/scoopcast_frames/Village_of_the_Damned_1960.jpg",
    answer: "VILLAGE OF THE DAMNED",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_227",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589113/scoopcast_frames/Domain_2016.jpg",
    answer: "DOMAIN",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_228",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589114/scoopcast_frames/Altered_States_1980.jpg",
    answer: "ALTERED STATES",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_229",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589115/scoopcast_frames/Starred_Up_2013.jpg",
    answer: "STARRED UP",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_230",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589127/scoopcast_frames/The_Host_2006.jpg",
    answer: "THE HOST",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_231",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589128/scoopcast_frames/Creed_III_2023.jpg",
    answer: "CREED III",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_232",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589131/scoopcast_frames/Leave_The_World_Behind_2023.jpg",
    answer: "LEAVE THE WORLD BEHIND",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_233",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589134/scoopcast_frames/Inside_The_Yellow_Cocoon_Shell_2023.jpg",
    answer: "INSIDE THE YELLOW COCOON SHELL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_234",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589137/scoopcast_frames/The_Tragedy_of_Macbeth_2021.jpg",
    answer: "THE TRAGEDY OF MACBETH",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_235",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589139/scoopcast_frames/Macbeth_1971_1971.jpg",
    answer: "MACBETH (1971)",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_236",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589142/scoopcast_frames/Babel_2006.jpg",
    answer: "BABEL",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_237",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588133/scoopcast_frames/My_Policeman_2022.jpg",
    answer: "MY POLICEMAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_238",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589145/scoopcast_frames/Straight_Time_1978.jpg",
    answer: "STRAIGHT TIME",
    year: "1978",
    tag: "classic"
  },
  {
    id: "f_239",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589147/scoopcast_frames/Key_Largo_1948.jpg",
    answer: "KEY LARGO",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_240",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589168/scoopcast_frames/Teenage_Mutant_Ninja_Turtles_Mutant_Mayhem_2023.jpg",
    answer: "TEENAGE MUTANT NINJA TURTLES: MUTANT MAYHEM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_241",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589172/scoopcast_frames/Copshop_2021.jpg",
    answer: "COPSHOP",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_242",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589175/scoopcast_frames/The_Lodge_2019.jpg",
    answer: "THE LODGE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_243",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589177/scoopcast_frames/Ikarie_XB_1_1963.jpg",
    answer: "IKARIE XB 1",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_244",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589181/scoopcast_frames/Chevalier_2015.jpg",
    answer: "CHEVALIER",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_245",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589184/scoopcast_frames/The_World_of_Kanako_2014.jpg",
    answer: "THE WORLD OF KANAKO",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_246",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589187/scoopcast_frames/Linoleum_2022.jpg",
    answer: "LINOLEUM",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_247",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589189/scoopcast_frames/3_Godfathers_1948.jpg",
    answer: "3 GODFATHERS",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_248",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589193/scoopcast_frames/Ma_Vie_En_Rose_1997.jpg",
    answer: "MA VIE EN ROSE",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_249",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589196/scoopcast_frames/The_Bikeriders_2023.jpg",
    answer: "THE BIKERIDERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_250",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589197/scoopcast_frames/Come_and_See_1985.jpg",
    answer: "COME AND SEE",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_251",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589198/scoopcast_frames/The_Bride_Wore_Black_1968.jpg",
    answer: "THE BRIDE WORE BLACK",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_252",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589199/scoopcast_frames/The_World_is_Not_Enough_1999.jpg",
    answer: "THE WORLD IS NOT ENOUGH",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_253",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589200/scoopcast_frames/The_Ruins_2008.jpg",
    answer: "THE RUINS",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_254",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589201/scoopcast_frames/Insidious_Chapter_2_2013.jpg",
    answer: "INSIDIOUS: CHAPTER 2",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_255",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589204/scoopcast_frames/You_Are_Not_My_Mother_2021.jpg",
    answer: "YOU ARE NOT MY MOTHER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_256",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589230/scoopcast_frames/Ip_Man_2008.jpg",
    answer: "IP MAN",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_257",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589232/scoopcast_frames/Kuroneko_1968.jpg",
    answer: "KURONEKO",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_258",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589233/scoopcast_frames/Crazy_About_Her_2021.jpg",
    answer: "CRAZY ABOUT HER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_259",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589235/scoopcast_frames/Alex_Wheatle_2020.jpg",
    answer: "ALEX WHEATLE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_260",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589237/scoopcast_frames/Tomorrow_Never_Dies_1997.jpg",
    answer: "TOMORROW NEVER DIES",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_261",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589244/scoopcast_frames/Anna_and_the_Apocalypse_2017.jpg",
    answer: "ANNA AND THE APOCALYPSE",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_262",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589246/scoopcast_frames/Immaculate_2024.jpg",
    answer: "IMMACULATE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_263",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589250/scoopcast_frames/LaRoy_Texas_2023.jpg",
    answer: "LAROY, TEXAS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_264",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589251/scoopcast_frames/Knock_at_the_Cabin_2023.jpg",
    answer: "KNOCK AT THE CABIN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_265",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589253/scoopcast_frames/Dont_Worry_Darling_2022.jpg",
    answer: "DON'T WORRY DARLING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_266",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589253/scoopcast_frames/The_Thin_Man_1934.jpg",
    answer: "THE THIN MAN",
    year: "1934",
    tag: "classic"
  },
  {
    id: "f_267",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589260/scoopcast_frames/Serie_Noire_1979.jpg",
    answer: "SERIE NOIRE",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_268",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589262/scoopcast_frames/A_Day_At_The_Races_1937.jpg",
    answer: "A DAY AT THE RACES",
    year: "1937",
    tag: "classic"
  },
  {
    id: "f_269",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589288/scoopcast_frames/Bardo_False_Chronicle_of_a_Handful_of_Truths_2022.jpg",
    answer: "BARDO: FALSE CHRONICLE OF A HANDFUL OF TRUTHS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_270",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589289/scoopcast_frames/The_Card_Counter_2021.jpg",
    answer: "THE CARD COUNTER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_271",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589293/scoopcast_frames/Mouchette_1967.jpg",
    answer: "MOUCHETTE",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_272",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589296/scoopcast_frames/The_Adjuster_1991.jpg",
    answer: "THE ADJUSTER",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_273",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589298/scoopcast_frames/Shang_Chi_and_the_Legend_of_the_Ten_Rings_2021.jpg",
    answer: "SHANG-CHI AND THE LEGEND OF THE TEN RINGS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_274",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589301/scoopcast_frames/The_Misfits_1961.jpg",
    answer: "THE MISFITS",
    year: "1961",
    tag: "classic"
  },
  {
    id: "f_275",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589302/scoopcast_frames/Glass_Onion_2022.jpg",
    answer: "GLASS ONION",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_276",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589303/scoopcast_frames/The_Little_Mermaid_1989.jpg",
    answer: "THE LITTLE MERMAID",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_277",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589304/scoopcast_frames/A_Confucian_Confusion_1994.jpg",
    answer: "A CONFUCIAN CONFUSION",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_278",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589306/scoopcast_frames/Last_Action_Hero_1993.jpg",
    answer: "LAST ACTION HERO",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_279",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589308/scoopcast_frames/Thelma_and_Louise_1991.jpg",
    answer: "THELMA & LOUISE",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_280",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589309/scoopcast_frames/The_Mask_1994.jpg",
    answer: "THE MASK",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_281",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589313/scoopcast_frames/Outland_1981.jpg",
    answer: "OUTLAND",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_282",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589315/scoopcast_frames/Shirley_2020.jpg",
    answer: "SHIRLEY",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_283",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587828/scoopcast_frames/Bunny_Lake_Is_Missing_1965.jpg",
    answer: "BUNNY LAKE IS MISSING",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_284",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589316/scoopcast_frames/Grave_of_the_Fireflies_1988.jpg",
    answer: "GRAVE OF THE FIREFLIES",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_285",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589318/scoopcast_frames/Life_Is_Sweet_1990.jpg",
    answer: "LIFE IS SWEET",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_286",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589322/scoopcast_frames/Triangle_of_Sadness_2022.jpg",
    answer: "TRIANGLE OF SADNESS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_287",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589324/scoopcast_frames/Gaslight_1944.jpg",
    answer: "GASLIGHT",
    year: "1944",
    tag: "classic"
  },
  {
    id: "f_288",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589327/scoopcast_frames/Top_Gun_Maverick_2022.jpg",
    answer: "TOP GUN: MAVERICK",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_289",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589330/scoopcast_frames/Reds_1981.jpg",
    answer: "REDS",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_290",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589332/scoopcast_frames/Mississippi_Masala_1991.jpg",
    answer: "MISSISSIPPI MASALA",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_291",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589350/scoopcast_frames/3_Iron_2004.jpg",
    answer: "3-IRON",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_292",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589352/scoopcast_frames/Snowbound_2017.jpg",
    answer: "SNOWBOUND",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_293",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589352/scoopcast_frames/The_Black_Phone_2021.jpg",
    answer: "THE BLACK PHONE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_294",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589354/scoopcast_frames/Faust_1994_1994.jpg",
    answer: "FAUST (1994)",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_295",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589356/scoopcast_frames/A_Room_With_A_View_1985.jpg",
    answer: "A ROOM WITH A VIEW",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_296",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589358/scoopcast_frames/Visible_Secret_2001.jpg",
    answer: "VISIBLE SECRET",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_297",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589362/scoopcast_frames/Monster_2023.jpg",
    answer: "MONSTER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_298",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589367/scoopcast_frames/Bullet_Train_2022.jpg",
    answer: "BULLET TRAIN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_299",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589368/scoopcast_frames/For_Your_Eyes_Only_1981.jpg",
    answer: "FOR YOUR EYES ONLY",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_300",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589370/scoopcast_frames/Ferrari_2023.jpg",
    answer: "FERRARI",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_301",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589370/scoopcast_frames/The_Big_Easy_1986.jpg",
    answer: "THE BIG EASY",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_302",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589371/scoopcast_frames/Sasquatch_Sunset_2024.jpg",
    answer: "SASQUATCH SUNSET",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_303",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589371/scoopcast_frames/The_Duellists_1977.jpg",
    answer: "THE DUELLISTS",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_304",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589373/scoopcast_frames/The_Spirit_2008.jpg",
    answer: "THE SPIRIT",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_305",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589376/scoopcast_frames/The_Karate_Kid_1984.jpg",
    answer: "THE KARATE KID",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_306",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589382/scoopcast_frames/Abuse_of_Weakness_2013.jpg",
    answer: "ABUSE OF WEAKNESS",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_307",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589386/scoopcast_frames/Maggie_Moores_2023.jpg",
    answer: "MAGGIE MOORE(S)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_308",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589388/scoopcast_frames/Prey_2022.jpg",
    answer: "PREY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_309",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589408/scoopcast_frames/T%C3%A1r_2022.jpg",
    answer: "TÁR",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_310",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589409/scoopcast_frames/Criss_Cross_1949.jpg",
    answer: "CRISS CROSS",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_311",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589411/scoopcast_frames/Azrael_2024.jpg",
    answer: "AZRAEL",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_312",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589411/scoopcast_frames/Sidonie_in_Japan_2023.jpg",
    answer: "SIDONIE IN JAPAN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_313",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589413/scoopcast_frames/Anselm_2023.jpg",
    answer: "ANSELM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_314",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589415/scoopcast_frames/Peppermint_Candy_1999.jpg",
    answer: "PEPPERMINT CANDY",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_315",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589417/scoopcast_frames/National_Anthem_2023.jpg",
    answer: "NATIONAL ANTHEM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_316",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589418/scoopcast_frames/Evil_Does_Not_Exist_2023.jpg",
    answer: "EVIL DOES NOT EXIST",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_317",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589419/scoopcast_frames/Priscilla_2023.jpg",
    answer: "PRISCILLA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_318",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589420/scoopcast_frames/Outside_Satan_2011.jpg",
    answer: "OUTSIDE SATAN",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_319",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589422/scoopcast_frames/The_Legend_of_the_7_Golden_Vampires_1974.jpg",
    answer: "THE LEGEND OF THE 7 GOLDEN VAMPIRES",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_320",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589424/scoopcast_frames/City_of_the_Living_Dead_1980.jpg",
    answer: "CITY OF THE LIVING DEAD",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_321",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Body_of_Lies_2008.jpg",
    answer: "BODY OF LIES",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_322",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Medium_Cool_1969.jpg",
    answer: "MEDIUM COOL",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_323",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589427/scoopcast_frames/The_Texas_Chainsaw_Massacre_2003.jpg",
    answer: "THE TEXAS CHAINSAW MASSACRE",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_324",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589426/scoopcast_frames/Typhoon_Club_1985.jpg",
    answer: "TYPHOON CLUB",
    year: "1985",
    tag: "classic"
  },
  {
    id: "f_325",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589428/scoopcast_frames/The_Worst_Person_in_the_World_2021.jpg",
    answer: "THE WORST PERSON IN THE WORLD",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_326",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589428/scoopcast_frames/Life_and_Nothing_More_1992.jpg",
    answer: "LIFE, AND NOTHING MORE",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_327",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589433/scoopcast_frames/Anatomy_of_a_Fall_2023.jpg",
    answer: "ANATOMY OF A FALL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_328",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589435/scoopcast_frames/Mami_Wata_2023.jpg",
    answer: "MAMI WATA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_329",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589435/scoopcast_frames/Westworld_1973.jpg",
    answer: "WESTWORLD",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_330",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589437/scoopcast_frames/Red_River_1948.jpg",
    answer: "RED RIVER",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_331",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589438/scoopcast_frames/Hidden_Away_2020.jpg",
    answer: "HIDDEN AWAY",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_332",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589439/scoopcast_frames/RMN_2022.jpg",
    answer: "R.M.N.",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_333",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589439/scoopcast_frames/Showing_Up_2022.jpg",
    answer: "SHOWING UP",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_334",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589440/scoopcast_frames/Amores_Perros_2000.jpg",
    answer: "AMORES PERROS",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_335",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589468/scoopcast_frames/The_Woman_King_2022.jpg",
    answer: "THE WOMAN KING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_336",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589470/scoopcast_frames/The_Hunt_2020.jpg",
    answer: "THE HUNT",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_337",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589470/scoopcast_frames/Three_Thousand_Years_of_Longing_2022.jpg",
    answer: "THREE THOUSAND YEARS OF LONGING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_338",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587646/scoopcast_frames/Kinds_of_Kindness_2024.jpg",
    answer: "KINDS OF KINDNESS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_339",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589471/scoopcast_frames/Candyman_2021_2021.jpg",
    answer: "CANDYMAN (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_340",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589472/scoopcast_frames/Master_Gardener_2022.jpg",
    answer: "MASTER GARDENER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_341",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589473/scoopcast_frames/Nostalghia_1983.jpg",
    answer: "NOSTALGHIA",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_342",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589476/scoopcast_frames/The_Holdovers_2023.jpg",
    answer: "THE HOLDOVERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_343",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589480/scoopcast_frames/Perfect_Days_2023.jpg",
    answer: "PERFECT DAYS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_344",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589480/scoopcast_frames/Death_Sentence_2007.jpg",
    answer: "DEATH SENTENCE",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_345",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589481/scoopcast_frames/American_Fiction_2023.jpg",
    answer: "AMERICAN FICTION",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_346",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589482/scoopcast_frames/Ip_Man_3_2015.jpg",
    answer: "IP MAN 3",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_347",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589484/scoopcast_frames/We_Are_Zombies_2023.jpg",
    answer: "WE ARE ZOMBIES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_348",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589484/scoopcast_frames/God_Told_Me_To_1976.jpg",
    answer: "GOD TOLD ME TO",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_349",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589485/scoopcast_frames/Sid_and_Nancy_1986.jpg",
    answer: "SID AND NANCY",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_350",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589527/scoopcast_frames/Out_of_Darkness_2022.jpg",
    answer: "OUT OF DARKNESS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_351",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589529/scoopcast_frames/A_Man_Escaped_1956.jpg",
    answer: "A MAN ESCAPED",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_352",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588007/scoopcast_frames/Rebel_Moon_Part_One_A_Child_of_Fire_2023.jpg",
    answer: "REBEL MOON - PART ONE: A CHILD OF FIRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_353",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790589532/scoopcast_frames/The_Big_Heat_1953.jpg",
    answer: "THE BIG HEAT",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_354",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597314/scoopcast_frames/Red_Sorghum_1988.jpg",
    answer: "RED SORGHUM",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_355",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597326/scoopcast_frames/Blindfire_2020.jpg",
    answer: "BLINDFIRE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_356",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597355/scoopcast_frames/Razorback_1984.jpg",
    answer: "RAZORBACK",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_357",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597355/scoopcast_frames/Hellraiser_2022_2022.jpg",
    answer: "HELLRAISER (2022)",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_358",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597356/scoopcast_frames/The_Eyes_of_Tammy_Faye_2021.jpg",
    answer: "THE EYES OF TAMMY FAYE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_359",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597357/scoopcast_frames/Empire_of_Light_2022.jpg",
    answer: "EMPIRE OF LIGHT",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_360",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597358/scoopcast_frames/Sibyl_2019.jpg",
    answer: "SIBYL",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_361",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597365/scoopcast_frames/A_Haunting_In_Venice_2023.jpg",
    answer: "A HAUNTING IN VENICE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_362",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597368/scoopcast_frames/The_Wonderful_Story_of_Henry_Sugar_2023.jpg",
    answer: "THE WONDERFUL STORY OF HENRY SUGAR",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_363",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597374/scoopcast_frames/Wendell_and_Wild_2022.jpg",
    answer: "WENDELL & WILD",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_364",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597376/scoopcast_frames/Bliss_2021_2021.jpg",
    answer: "BLISS (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_365",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597377/scoopcast_frames/The_Outsiders_1983.jpg",
    answer: "THE OUTSIDERS",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_366",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597381/scoopcast_frames/Landscape_With_Invisible_Hand_2023.jpg",
    answer: "LANDSCAPE WITH INVISIBLE HAND",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_367",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597382/scoopcast_frames/Spontaneous_2020.jpg",
    answer: "SPONTANEOUS",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_368",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597384/scoopcast_frames/The_Big_4_2022.jpg",
    answer: "THE BIG 4",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_369",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597387/scoopcast_frames/The_Last_Stand_2013.jpg",
    answer: "THE LAST STAND",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_370",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597391/scoopcast_frames/They_Cloned_Tyrone_2023.jpg",
    answer: "THEY CLONED TYRONE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_371",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597392/scoopcast_frames/Sky_Captain_and_the_World_of_Tomorrow_2004.jpg",
    answer: "SKY CAPTAIN AND THE WORLD OF TOMORROW",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_372",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597394/scoopcast_frames/Arabian_Nights_1974.jpg",
    answer: "ARABIAN NIGHTS",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_373",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597394/scoopcast_frames/Helll_Hole_2024.jpg",
    answer: "HELLL HOLE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_374",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597394/scoopcast_frames/Goodbye_Dragon_Inn_2003.jpg",
    answer: "GOODBYE, DRAGON INN",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_375",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597395/scoopcast_frames/Pedro_P%C3%A1ramo_2024.jpg",
    answer: "PEDRO PÁRAMO",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_376",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597396/scoopcast_frames/Black_Sea_2014.jpg",
    answer: "BLACK SEA",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_377",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597399/scoopcast_frames/The_Game_1997.jpg",
    answer: "THE GAME",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_378",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597401/scoopcast_frames/The_Loved_Ones_2009.jpg",
    answer: "THE LOVED ONES",
    year: "2009",
    tag: "classic"
  },
  {
    id: "f_379",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597403/scoopcast_frames/The_House_That_Screamed_1969.jpg",
    answer: "THE HOUSE THAT SCREAMED",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_380",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597404/scoopcast_frames/The_Divine_Fury_2019.jpg",
    answer: "THE DIVINE FURY",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_381",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597426/scoopcast_frames/The_Munsters_2022.jpg",
    answer: "THE MUNSTERS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_382",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597430/scoopcast_frames/Barking_Dogs_Never_Bite_2000.jpg",
    answer: "BARKING DOGS NEVER BITE",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_383",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597432/scoopcast_frames/Water_For_Elephants_2011.jpg",
    answer: "WATER FOR ELEPHANTS",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_384",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597434/scoopcast_frames/The_Ugly_Stepsister_2025.jpg",
    answer: "THE UGLY STEPSISTER",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_385",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597437/scoopcast_frames/Causeway_2022.jpg",
    answer: "CAUSEWAY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_386",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597438/scoopcast_frames/The_Flight_of_the_Phoenix_1965.jpg",
    answer: "THE FLIGHT OF THE PHOENIX",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_387",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597440/scoopcast_frames/Little_Shop_of_Horrors_1986.jpg",
    answer: "LITTLE SHOP OF HORRORS",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_388",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597441/scoopcast_frames/House_of_Gucci_2021.jpg",
    answer: "HOUSE OF GUCCI",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_389",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597444/scoopcast_frames/Green_Inferno_2013.jpg",
    answer: "GREEN INFERNO",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_390",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597445/scoopcast_frames/Never_Look_Away_2018.jpg",
    answer: "NEVER LOOK AWAY",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_391",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597448/scoopcast_frames/Impetigore_2019.jpg",
    answer: "IMPETIGORE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_392",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587770/scoopcast_frames/The_Popes_Exorcist_2023.jpg",
    answer: "THE POPE'S EXORCIST",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_393",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597450/scoopcast_frames/The_Motorcycle_Diaries_2004.jpg",
    answer: "THE MOTORCYCLE DIARIES",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_394",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597451/scoopcast_frames/The_Woman_Who_Ran_2020.jpg",
    answer: "THE WOMAN WHO RAN",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_395",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597459/scoopcast_frames/Amsterdam_2022.jpg",
    answer: "AMSTERDAM",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_396",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597460/scoopcast_frames/Like_Someone_In_Love_2012.jpg",
    answer: "LIKE SOMEONE IN LOVE",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_397",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597461/scoopcast_frames/Guillermo_del_Toros_Pinocchio_2022.jpg",
    answer: "GUILLERMO DEL TORO'S PINOCCHIO",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_398",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597461/scoopcast_frames/The_Rain_People_1969.jpg",
    answer: "THE RAIN PEOPLE",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_399",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597463/scoopcast_frames/Project_Wolf_Hunting_2022.jpg",
    answer: "PROJECT WOLF HUNTING",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_400",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587830/scoopcast_frames/In_My_Mothers_Skin_2023.jpg",
    answer: "IN MY MOTHER'S SKIN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_401",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597468/scoopcast_frames/Mangrove_2020.jpg",
    answer: "MANGROVE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_402",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597485/scoopcast_frames/Furiosa_2024.jpg",
    answer: "FURIOSA",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_403",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597487/scoopcast_frames/Universal_Soldier_1992.jpg",
    answer: "UNIVERSAL SOLDIER",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_404",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597489/scoopcast_frames/Billion_Dollar_Brain_1967.jpg",
    answer: "BILLION DOLLAR BRAIN",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_405",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597493/scoopcast_frames/Still_Walking_2008.jpg",
    answer: "STILL WALKING",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_406",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597495/scoopcast_frames/A_Good_Year_2006.jpg",
    answer: "A GOOD YEAR",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_407",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597496/scoopcast_frames/Playtime_1967.jpg",
    answer: "PLAYTIME",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_408",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597500/scoopcast_frames/Prospect_2018.jpg",
    answer: "PROSPECT",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_409",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597507/scoopcast_frames/Point_Break_1991.jpg",
    answer: "POINT BREAK",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_410",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597510/scoopcast_frames/Fresh_2022.jpg",
    answer: "FRESH",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_411",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597512/scoopcast_frames/Dead_Men_Dont_Wear_Plaid_1982.jpg",
    answer: "DEAD MEN DON'T WEAR PLAID",
    year: "1982",
    tag: "classic"
  },
  {
    id: "f_412",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597513/scoopcast_frames/House_of_Games_1987.jpg",
    answer: "HOUSE OF GAMES",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_413",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587750/scoopcast_frames/Shin_Ultraman_2022.jpg",
    answer: "SHIN ULTRAMAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_414",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597518/scoopcast_frames/The_Sect_1991.jpg",
    answer: "THE SECT",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_415",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597522/scoopcast_frames/Diabolique_1955.jpg",
    answer: "DIABOLIQUE",
    year: "1955",
    tag: "classic"
  },
  {
    id: "f_416",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597550/scoopcast_frames/High_Noon_1952.jpg",
    answer: "HIGH NOON",
    year: "1952",
    tag: "classic"
  },
  {
    id: "f_417",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597554/scoopcast_frames/The_Chaser_2008.jpg",
    answer: "THE CHASER",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_418",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597557/scoopcast_frames/EO_2022.jpg",
    answer: "EO",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_419",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597568/scoopcast_frames/Rouge_1987.jpg",
    answer: "ROUGE",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_420",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597570/scoopcast_frames/The_Seven_Year_Itch_1955.jpg",
    answer: "THE SEVEN YEAR ITCH",
    year: "1955",
    tag: "classic"
  },
  {
    id: "f_421",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597571/scoopcast_frames/The_Greatest_Hits_2024.jpg",
    answer: "THE GREATEST HITS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_422",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597580/scoopcast_frames/Men_2022.jpg",
    answer: "MEN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_423",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597582/scoopcast_frames/A_Touch_of_Zen_1971.jpg",
    answer: "A TOUCH OF ZEN",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_424",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597583/scoopcast_frames/Hit_Man_2023.jpg",
    answer: "HIT MAN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_425",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597610/scoopcast_frames/The_Great_Gatsby_2013_2013.jpg",
    answer: "THE GREAT GATSBY (2013)",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_426",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597615/scoopcast_frames/On_Dangerous_Ground_1951.jpg",
    answer: "ON DANGEROUS GROUND",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_427",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597617/scoopcast_frames/Of_An_Age_2022.jpg",
    answer: "OF AN AGE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_428",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597619/scoopcast_frames/Nope_2022.jpg",
    answer: "NOPE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_429",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597619/scoopcast_frames/T_Blockers_2023.jpg",
    answer: "T BLOCKERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_430",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597619/scoopcast_frames/Rosalie_2023.jpg",
    answer: "ROSALIE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_431",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597623/scoopcast_frames/The_Green_Knight_2021.jpg",
    answer: "THE GREEN KNIGHT",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_432",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597624/scoopcast_frames/Drive_Away_Dykes_2024.jpg",
    answer: "DRIVE-AWAY DYKES",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_433",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597626/scoopcast_frames/Moonrise_1948.jpg",
    answer: "MOONRISE",
    year: "1948",
    tag: "classic"
  },
  {
    id: "f_434",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597629/scoopcast_frames/Battle_Beyond_the_Stars_1980.jpg",
    answer: "BATTLE BEYOND THE STARS",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_435",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597631/scoopcast_frames/Hellraiser_Judgement_2018.jpg",
    answer: "HELLRAISER: JUDGEMENT",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_436",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597632/scoopcast_frames/Godzilla_x_Kong_The_New_Empire_2024.jpg",
    answer: "GODZILLA X KONG: THE NEW EMPIRE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_437",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597633/scoopcast_frames/Talk_To_Me_2022.jpg",
    answer: "TALK TO ME",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_438",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597634/scoopcast_frames/Passages_2023.jpg",
    answer: "PASSAGES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_439",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597636/scoopcast_frames/Night_Teeth_2021.jpg",
    answer: "NIGHT TEETH",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_440",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597644/scoopcast_frames/Investigation_of_a_Citizen_Above_Suspicion_1970.jpg",
    answer: "INVESTIGATION OF A CITIZEN ABOVE SUSPICION",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_441",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597646/scoopcast_frames/Fast_Company_1979.jpg",
    answer: "FAST COMPANY",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_442",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597646/scoopcast_frames/Reprise_2006.jpg",
    answer: "REPRISE",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_443",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597649/scoopcast_frames/Balloon_2019.jpg",
    answer: "BALLOON",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_444",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597652/scoopcast_frames/Once_Upon_a_Time_in_China_1991.jpg",
    answer: "ONCE UPON A TIME IN CHINA",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_445",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597666/scoopcast_frames/La_Llorona_2019.jpg",
    answer: "LA LLORONA",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_446",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597668/scoopcast_frames/Victims_of_Sin_1951.jpg",
    answer: "VICTIMS OF SIN",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_447",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597671/scoopcast_frames/Shin_Kamen_Rider_2023.jpg",
    answer: "SHIN KAMEN RIDER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_448",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597672/scoopcast_frames/Seneca_On_The_Creation_Of_Earthquakes_2023.jpg",
    answer: "SENECA: ON THE CREATION OF EARTHQUAKES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_449",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597675/scoopcast_frames/The_Swan_2023.jpg",
    answer: "THE SWAN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_450",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597674/scoopcast_frames/The_Grand_Duel_1972.jpg",
    answer: "THE GRAND DUEL",
    year: "1972",
    tag: "classic"
  },
  {
    id: "f_451",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597674/scoopcast_frames/Master_Z_The_Ip_Man_Legacy_2018.jpg",
    answer: "MASTER Z: THE IP MAN LEGACY",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_452",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588187/scoopcast_frames/The_Incident_1967.jpg",
    answer: "THE INCIDENT",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_453",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597679/scoopcast_frames/Carmen_From_Kawachi_1966.jpg",
    answer: "CARMEN FROM KAWACHI",
    year: "1966",
    tag: "classic"
  },
  {
    id: "f_454",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597684/scoopcast_frames/On_Her_Majestys_Secret_Service_1969.jpg",
    answer: "ON HER MAJESTY'S SECRET SERVICE",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_455",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597686/scoopcast_frames/After_Blue_2021.jpg",
    answer: "AFTER BLUE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_456",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597687/scoopcast_frames/Blackbird_Blackbird_Blackberry_2023.jpg",
    answer: "BLACKBIRD BLACKBIRD BLACKBERRY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_457",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597687/scoopcast_frames/No_Time_To_Die_2021.jpg",
    answer: "NO TIME TO DIE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_458",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597688/scoopcast_frames/You_Only_Live_Twice_1967.jpg",
    answer: "YOU ONLY LIVE TWICE",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_459",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597690/scoopcast_frames/Beverly_Hills_Cop_II_1987.jpg",
    answer: "BEVERLY HILLS COP II",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_460",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597693/scoopcast_frames/Dogman_2018.jpg",
    answer: "DOGMAN",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_461",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597694/scoopcast_frames/Kneecap_2024.jpg",
    answer: "KNEECAP",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_462",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597695/scoopcast_frames/Eileen_2023.jpg",
    answer: "EILEEN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_463",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597696/scoopcast_frames/The_Ritual_2017.jpg",
    answer: "THE RITUAL",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_464",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597701/scoopcast_frames/The_Girl_Who_Leapt_Through_Time_2006.jpg",
    answer: "THE GIRL WHO LEAPT THROUGH TIME",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_465",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597703/scoopcast_frames/Through_The_Olive_Trees_1994.jpg",
    answer: "THROUGH THE OLIVE TREES",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_466",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597706/scoopcast_frames/Do_Not_Expect_Too_Much_from_the_End_of_the_World_2023.jpg",
    answer: "DO NOT EXPECT TOO MUCH FROM THE END OF THE WORLD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_467",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597708/scoopcast_frames/Saltburn_2023.jpg",
    answer: "SALTBURN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_468",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597709/scoopcast_frames/Armageddon_1998.jpg",
    answer: "ARMAGEDDON",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_469",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597711/scoopcast_frames/Oppenheimer_2023.jpg",
    answer: "OPPENHEIMER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_470",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597733/scoopcast_frames/A_Star_Is_Born_1976_1976.jpg",
    answer: "A STAR IS BORN (1976)",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_471",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597735/scoopcast_frames/Celine_and_Julie_Go_Boating_1974.jpg",
    answer: "CELINE AND JULIE GO BOATING",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_472",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597738/scoopcast_frames/The_Human_Condition_II_Road_to_Eternity_1959.jpg",
    answer: "THE HUMAN CONDITION II: ROAD TO ETERNITY",
    year: "1959",
    tag: "classic"
  },
  {
    id: "f_473",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597738/scoopcast_frames/Oceans_Twelve_2004.jpg",
    answer: "OCEAN'S TWELVE",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_474",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597738/scoopcast_frames/Dance_Girl_Dance_1940.jpg",
    answer: "DANCE, GIRL, DANCE",
    year: "1940",
    tag: "classic"
  },
  {
    id: "f_475",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597739/scoopcast_frames/More_Than_Ever_2022.jpg",
    answer: "MORE THAN EVER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_476",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597742/scoopcast_frames/Introduction_2021.jpg",
    answer: "INTRODUCTION",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_477",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597744/scoopcast_frames/The_Dark_Mirror_1946.jpg",
    answer: "THE DARK MIRROR",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_478",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597745/scoopcast_frames/Dungeons_and_Dragons_Honor_Among_Thieves_2023.jpg",
    answer: "DUNGEONS & DRAGONS: HONOR AMONG THIEVES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_479",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597748/scoopcast_frames/The_Mexican_2001.jpg",
    answer: "THE MEXICAN",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_480",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597749/scoopcast_frames/Atlantics_2019.jpg",
    answer: "ATLANTICS",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_481",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597748/scoopcast_frames/Unlocked_2023.jpg",
    answer: "UNLOCKED",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_482",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597754/scoopcast_frames/Goldfinger_1964.jpg",
    answer: "GOLDFINGER",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_483",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597755/scoopcast_frames/The_Bad_and_the_Beautiful_1952.jpg",
    answer: "THE BAD AND THE BEAUTIFUL",
    year: "1952",
    tag: "classic"
  },
  {
    id: "f_484",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597756/scoopcast_frames/Nightmare_Alley_2021.jpg",
    answer: "NIGHTMARE ALLEY",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_485",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597757/scoopcast_frames/Mon_Oncle_1958.jpg",
    answer: "MON ONCLE",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_486",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587664/scoopcast_frames/Robin_Hood_1973_1973.jpg",
    answer: "ROBIN HOOD (1973)",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_487",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597760/scoopcast_frames/Beyond_The_Valley_Of_The_Dolls_1970.jpg",
    answer: "BEYOND THE VALLEY OF THE DOLLS",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_488",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597761/scoopcast_frames/Sissy_2022.jpg",
    answer: "SISSY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_489",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597764/scoopcast_frames/Punishment_Park_1971.jpg",
    answer: "PUNISHMENT PARK",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_490",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597766/scoopcast_frames/Bad_Day_At_Black_Rock_1955.jpg",
    answer: "BAD DAY AT BLACK ROCK",
    year: "1955",
    tag: "classic"
  },
  {
    id: "f_491",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597769/scoopcast_frames/A_Streetcar_Named_Desire_1951.jpg",
    answer: "A STREETCAR NAMED DESIRE",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_492",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597771/scoopcast_frames/Afire_2023.jpg",
    answer: "AFIRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_493",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597791/scoopcast_frames/Stop_Making_Sense_1984.jpg",
    answer: "STOP MAKING SENSE",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_494",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597792/scoopcast_frames/The_Promised_Land_2023.jpg",
    answer: "THE PROMISED LAND",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_495",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597793/scoopcast_frames/The_Electrical_Life_of_Louis_Wain_2021.jpg",
    answer: "THE ELECTRICAL LIFE OF LOUIS WAIN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_496",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597794/scoopcast_frames/Song_of_the_Sea_2014.jpg",
    answer: "SONG OF THE SEA",
    year: "2014",
    tag: "classic"
  },
  {
    id: "f_497",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597795/scoopcast_frames/Giant_1956.jpg",
    answer: "GIANT",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_498",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597797/scoopcast_frames/Desert_Fury_1947.jpg",
    answer: "DESERT FURY",
    year: "1947",
    tag: "classic"
  },
  {
    id: "f_499",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597798/scoopcast_frames/The_Taste_of_Things_2023.jpg",
    answer: "THE TASTE OF THINGS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_500",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597799/scoopcast_frames/Cat_People_1942.jpg",
    answer: "CAT PEOPLE",
    year: "1942",
    tag: "classic"
  },
  {
    id: "f_501",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597799/scoopcast_frames/Parallel_Mothers_2021.jpg",
    answer: "PARALLEL MOTHERS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_502",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597800/scoopcast_frames/Awaken_2018.jpg",
    answer: "AWAKEN",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_503",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597801/scoopcast_frames/Fat_Girl_2001.jpg",
    answer: "FAT GIRL",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_504",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587644/scoopcast_frames/Fair_Play_2023.jpg",
    answer: "FAIR PLAY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_505",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587947/scoopcast_frames/Alien_Romulus_2024.jpg",
    answer: "ALIEN: ROMULUS",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_506",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597806/scoopcast_frames/Hellraiser_Deader_2005.jpg",
    answer: "HELLRAISER: DEADER",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_507",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597808/scoopcast_frames/Society_of_the_Snow_2023.jpg",
    answer: "SOCIETY OF THE SNOW",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_508",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588253/scoopcast_frames/Le_Samoura%C3%AF_1967.jpg",
    answer: "LE SAMOURAÏ",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_509",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597814/scoopcast_frames/The_Mercenary_1968.jpg",
    answer: "THE MERCENARY",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_510",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597822/scoopcast_frames/Bull_2021.jpg",
    answer: "BULL",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_511",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597829/scoopcast_frames/Fright_Night_2011_2011.jpg",
    answer: "FRIGHT NIGHT (2011)",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_512",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597845/scoopcast_frames/Dogfight_1991.jpg",
    answer: "DOGFIGHT",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_513",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597848/scoopcast_frames/Kin_dza_dza_1986.jpg",
    answer: "KIN-DZA-DZA!",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_514",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597849/scoopcast_frames/Speak_No_Evil_2022.jpg",
    answer: "SPEAK NO EVIL",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_515",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597852/scoopcast_frames/The_Cat_In_The_Hat_2003.jpg",
    answer: "THE CAT IN THE HAT",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_516",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597853/scoopcast_frames/Passing_2021.jpg",
    answer: "PASSING",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_517",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597853/scoopcast_frames/Fear_X_2003.jpg",
    answer: "FEAR X",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_518",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597854/scoopcast_frames/Bugonia_2025.jpg",
    answer: "BUGONIA",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_519",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597854/scoopcast_frames/Happening_2021.jpg",
    answer: "HAPPENING",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_520",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597856/scoopcast_frames/Until_The_End_Of_The_World_1991.jpg",
    answer: "UNTIL THE END OF THE WORLD",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_521",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597857/scoopcast_frames/Persepolis_2007.jpg",
    answer: "PERSEPOLIS",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_522",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597862/scoopcast_frames/The_Day_of_the_Locust_1975.jpg",
    answer: "THE DAY OF THE LOCUST",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_523",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597866/scoopcast_frames/Poison_2023_2023.jpg",
    answer: "POISON (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_524",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597870/scoopcast_frames/Bo_Burnham_Inside_2021.jpg",
    answer: "BO BURNHAM: INSIDE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_525",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587888/scoopcast_frames/The_Tales_of_Hoffmann_1951.jpg",
    answer: "THE TALES OF HOFFMANN",
    year: "1951",
    tag: "classic"
  },
  {
    id: "f_526",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597873/scoopcast_frames/Hellbound_Hellraiser_II_1988.jpg",
    answer: "HELLBOUND: HELLRAISER II",
    year: "1988",
    tag: "classic"
  },
  {
    id: "f_527",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597874/scoopcast_frames/The_Mimic_2017.jpg",
    answer: "THE MIMIC",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_528",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597878/scoopcast_frames/Sick_of_Myself_2022.jpg",
    answer: "SICK OF MYSELF",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_529",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597880/scoopcast_frames/Fantastic_Planet_1973.jpg",
    answer: "FANTASTIC PLANET",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_530",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587886/scoopcast_frames/Patton_1970.jpg",
    answer: "PATTON",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_531",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597885/scoopcast_frames/The_Tale_of_Princess_Kaguya_2013.jpg",
    answer: "THE TALE OF PRINCESS KAGUYA",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_532",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597887/scoopcast_frames/The_Zone_Of_Interest_2023.jpg",
    answer: "THE ZONE OF INTEREST",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_533",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597888/scoopcast_frames/Black_Christmas_2006_2006.jpg",
    answer: "BLACK CHRISTMAS (2006)",
    year: "2006",
    tag: "classic"
  },
  {
    id: "f_534",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597909/scoopcast_frames/The_Menu_2022.jpg",
    answer: "THE MENU",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_535",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597916/scoopcast_frames/Space_Sweepers_2021.jpg",
    answer: "SPACE SWEEPERS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_536",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597918/scoopcast_frames/Hackers_1995.jpg",
    answer: "HACKERS",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_537",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597919/scoopcast_frames/How_To_Blow_Up_A_Pipeline_2022.jpg",
    answer: "HOW TO BLOW UP A PIPELINE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_538",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597919/scoopcast_frames/Cobweb_%EA%B1%B0%EB%AF%B8%EC%A7%91_2023.jpg",
    answer: "COBWEB (거미집)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_539",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597924/scoopcast_frames/The_Nowhere_Inn_2020.jpg",
    answer: "THE NOWHERE INN",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_540",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597925/scoopcast_frames/Earwig_2021.jpg",
    answer: "EARWIG",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_541",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597927/scoopcast_frames/Last_Night_in_Soho_2021.jpg",
    answer: "LAST NIGHT IN SOHO",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_542",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597933/scoopcast_frames/The_Appaloosa_1996.jpg",
    answer: "THE APPALOOSA",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_543",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587656/scoopcast_frames/Eros_2004.jpg",
    answer: "EROS",
    year: "2004",
    tag: "classic"
  },
  {
    id: "f_544",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597935/scoopcast_frames/Poor_Things_2023.jpg",
    answer: "POOR THINGS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_545",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597935/scoopcast_frames/Kaboom_2010.jpg",
    answer: "KABOOM",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_546",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597936/scoopcast_frames/The_Banshees_of_Inisherin_2022.jpg",
    answer: "THE BANSHEES OF INISHERIN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_547",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597936/scoopcast_frames/Revealer_2022.jpg",
    answer: "REVEALER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_548",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597937/scoopcast_frames/The_Colour_Purple_2023_2023.jpg",
    answer: "THE COLOUR PURPLE (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_549",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597938/scoopcast_frames/The_Souvenir_2019.jpg",
    answer: "THE SOUVENIR",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_550",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597943/scoopcast_frames/The_Greatest_Showman_2017.jpg",
    answer: "THE GREATEST SHOWMAN",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_551",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597945/scoopcast_frames/Singapore_Sling_1990.jpg",
    answer: "SINGAPORE SLING",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_552",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587641/scoopcast_frames/A_Matter_of_Life_and_Death_1946.jpg",
    answer: "A MATTER OF LIFE AND DEATH",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_553",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588116/scoopcast_frames/All_The_Presidents_Men_1976.jpg",
    answer: "ALL THE PRESIDENT'S MEN",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_554",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597969/scoopcast_frames/The_Weather_Man_2005.jpg",
    answer: "THE WEATHER MAN",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_555",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597973/scoopcast_frames/Kajillionaire_2020.jpg",
    answer: "KAJILLIONAIRE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_556",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597974/scoopcast_frames/The_Call_2020.jpg",
    answer: "THE CALL",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_557",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597974/scoopcast_frames/Blue_Jean_2022.jpg",
    answer: "BLUE JEAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_558",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597978/scoopcast_frames/Saint_Omer_2022.jpg",
    answer: "SAINT OMER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_559",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597981/scoopcast_frames/Shanghai_Triad_1995.jpg",
    answer: "SHANGHAI TRIAD",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_560",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597982/scoopcast_frames/Rabid_1977.jpg",
    answer: "RABID",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_561",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597982/scoopcast_frames/Dillinger_is_Dead_1969.jpg",
    answer: "DILLINGER IS DEAD",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_562",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597983/scoopcast_frames/Hard_Target_1993.jpg",
    answer: "HARD TARGET",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_563",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597986/scoopcast_frames/The_Count_of_Monte_Cristo_2024.jpg",
    answer: "THE COUNT OF MONTE-CRISTO",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_564",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597990/scoopcast_frames/Wrong_Move_1975.jpg",
    answer: "WRONG MOVE",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_565",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597991/scoopcast_frames/The_NeverEnding_Story_1984.jpg",
    answer: "THE NEVERENDING STORY",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_566",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597993/scoopcast_frames/Leave_Her_To_Heaven_1945.jpg",
    answer: "LEAVE HER TO HEAVEN",
    year: "1945",
    tag: "classic"
  },
  {
    id: "f_567",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597995/scoopcast_frames/Duel_1971.jpg",
    answer: "DUEL",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_568",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597996/scoopcast_frames/The_Uninvited_1944.jpg",
    answer: "THE UNINVITED",
    year: "1944",
    tag: "classic"
  },
  {
    id: "f_569",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597996/scoopcast_frames/Club_Zero_2023.jpg",
    answer: "CLUB ZERO",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_570",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790597996/scoopcast_frames/West_Side_Story_2021_2021.jpg",
    answer: "WEST SIDE STORY (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_571",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598001/scoopcast_frames/Suicide_Club_2001.jpg",
    answer: "SUICIDE CLUB",
    year: "2001",
    tag: "classic"
  },
  {
    id: "f_572",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598002/scoopcast_frames/The_Night_House_2020.jpg",
    answer: "THE NIGHT HOUSE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_573",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598007/scoopcast_frames/Comrades_Almost_A_Love_Story_1996.jpg",
    answer: "COMRADES: ALMOST A LOVE STORY",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_574",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598024/scoopcast_frames/Pain_and_Gain_2013.jpg",
    answer: "PAIN & GAIN",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_575",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588011/scoopcast_frames/The_Coward_1965.jpg",
    answer: "THE COWARD",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_576",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598031/scoopcast_frames/You_Wont_Be_Alone_2022.jpg",
    answer: "YOU WON'T BE ALONE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_577",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598031/scoopcast_frames/Phantom_Lady_1944.jpg",
    answer: "PHANTOM LADY",
    year: "1944",
    tag: "classic"
  },
  {
    id: "f_578",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598032/scoopcast_frames/Evil_Dead_Rise_2023.jpg",
    answer: "EVIL DEAD RISE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_579",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598033/scoopcast_frames/The_Mountain_1956_1956.jpg",
    answer: "THE MOUNTAIN (1956)",
    year: "1956",
    tag: "classic"
  },
  {
    id: "f_580",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598035/scoopcast_frames/Alienoid_2022.jpg",
    answer: "ALIENOID",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_581",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598037/scoopcast_frames/Memoirs_of_a_Geisha_2005.jpg",
    answer: "MEMOIRS OF A GEISHA",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_582",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598037/scoopcast_frames/Unfaithful_2002.jpg",
    answer: "UNFAITHFUL",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_583",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598039/scoopcast_frames/Parasite_2019.jpg",
    answer: "PARASITE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_584",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598039/scoopcast_frames/No_One_Will_Save_You_2023.jpg",
    answer: "NO ONE WILL SAVE YOU",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_585",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598042/scoopcast_frames/His_Three_Daughters_2023.jpg",
    answer: "HIS THREE DAUGHTERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_586",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598045/scoopcast_frames/Whispering_Corridors_1998.jpg",
    answer: "WHISPERING CORRIDORS",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_587",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598045/scoopcast_frames/Falling_2020.jpg",
    answer: "FALLING",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_588",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598046/scoopcast_frames/The_Hunger_Games_The_Ballad_of_Songbirds_and_Snakes_2023.jpg",
    answer: "THE HUNGER GAMES: THE BALLAD OF SONGBIRDS & SNAKES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_589",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598047/scoopcast_frames/The_Abyss_1989.jpg",
    answer: "THE ABYSS",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_590",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598048/scoopcast_frames/Murder_By_Contract_1958.jpg",
    answer: "MURDER BY CONTRACT",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_591",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598050/scoopcast_frames/Society_1989.jpg",
    answer: "SOCIETY",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_592",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598052/scoopcast_frames/The_Peoples_Joker_2022.jpg",
    answer: "THE PEOPLE'S JOKER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_593",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598052/scoopcast_frames/Coup_De_Torchon_1981.jpg",
    answer: "COUP DE TORCHON",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_594",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598053/scoopcast_frames/Lord_of_Misrule_2023.jpg",
    answer: "LORD OF MISRULE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_595",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598056/scoopcast_frames/Bones_and_All_2022.jpg",
    answer: "BONES AND ALL",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_596",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598058/scoopcast_frames/Were_All_Going_to_the_Worlds_Fair_2021.jpg",
    answer: "WE'RE ALL GOING TO THE WORLD'S FAIR",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_597",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588258/scoopcast_frames/The_Feast_2021.jpg",
    answer: "THE FEAST",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_598",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598086/scoopcast_frames/Blue_Steel_1990.jpg",
    answer: "BLUE STEEL",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_599",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598087/scoopcast_frames/Frankenstein_2025_2025.jpg",
    answer: "FRANKENSTEIN (2025)",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_600",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598091/scoopcast_frames/Apollo_10%C2%BD_A_Space_Age_Childhood_2022.jpg",
    answer: "APOLLO 10½: A SPACE AGE CHILDHOOD",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_601",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598092/scoopcast_frames/The_Three_Musketeers_1973.jpg",
    answer: "THE THREE MUSKETEERS",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_602",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598093/scoopcast_frames/Babysitter_2022.jpg",
    answer: "BABYSITTER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_603",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598093/scoopcast_frames/The_Apartment_1960.jpg",
    answer: "THE APARTMENT",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_604",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598096/scoopcast_frames/Aladdin_1992.jpg",
    answer: "ALADDIN",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_605",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598101/scoopcast_frames/Sniper_GRIT_2023.jpg",
    answer: "SNIPER: G.R.I.T.",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_606",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598103/scoopcast_frames/Suzhou_River_2000.jpg",
    answer: "SUZHOU RIVER",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_607",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598105/scoopcast_frames/Hellraiser_Inferno_2000.jpg",
    answer: "HELLRAISER: INFERNO",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_608",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598106/scoopcast_frames/The_Blue_Caftan_2022.jpg",
    answer: "THE BLUE CAFTAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_609",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598107/scoopcast_frames/Unwelcome_2022.jpg",
    answer: "UNWELCOME",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_610",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598107/scoopcast_frames/In_Front_Of_Your_Face_2021.jpg",
    answer: "IN FRONT OF YOUR FACE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_611",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598107/scoopcast_frames/Master_of_the_House_1925.jpg",
    answer: "MASTER OF THE HOUSE",
    year: "1925",
    tag: "classic"
  },
  {
    id: "f_612",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598108/scoopcast_frames/Once_A_Thief_1991.jpg",
    answer: "ONCE A THIEF",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_613",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598109/scoopcast_frames/Hellraiser_Bloodline_1996.jpg",
    answer: "HELLRAISER: BLOODLINE",
    year: "1996",
    tag: "classic"
  },
  {
    id: "f_614",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598113/scoopcast_frames/Hellraiser_Hellworld_2005.jpg",
    answer: "HELLRAISER: HELLWORLD",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_615",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598114/scoopcast_frames/Close_Your_Eyes_2023.jpg",
    answer: "CLOSE YOUR EYES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_616",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598115/scoopcast_frames/Shadow_2018.jpg",
    answer: "SHADOW",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_617",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598116/scoopcast_frames/Pendas_Fen_1974.jpg",
    answer: "PENDA'S FEN",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_618",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598116/scoopcast_frames/Litan_1982.jpg",
    answer: "LITAN",
    year: "1982",
    tag: "classic"
  },
  {
    id: "f_619",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598116/scoopcast_frames/Birds_of_Paradise_2021.jpg",
    answer: "BIRDS OF PARADISE",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_620",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598121/scoopcast_frames/Soft_Liquid_Center_2023.jpg",
    answer: "SOFT LIQUID CENTER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_621",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598122/scoopcast_frames/Insidious_2010.jpg",
    answer: "INSIDIOUS",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_622",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598125/scoopcast_frames/To_Be_or_Not_To_Be_1942.jpg",
    answer: "TO BE OR NOT TO BE",
    year: "1942",
    tag: "classic"
  },
  {
    id: "f_623",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598128/scoopcast_frames/About_Dry_Grasses_2023.jpg",
    answer: "ABOUT DRY GRASSES",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_624",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598131/scoopcast_frames/House_of_Wax_2005.jpg",
    answer: "HOUSE OF WAX",
    year: "2005",
    tag: "classic"
  },
  {
    id: "f_625",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598144/scoopcast_frames/I_Wake_Up_Screaming_1941.jpg",
    answer: "I WAKE UP SCREAMING",
    year: "1941",
    tag: "classic"
  },
  {
    id: "f_626",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598150/scoopcast_frames/Oxygen_2021.jpg",
    answer: "OXYGEN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_627",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598151/scoopcast_frames/The_Strange_Love_of_Martha_Ivers_1946.jpg",
    answer: "THE STRANGE LOVE OF MARTHA IVERS",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_628",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598152/scoopcast_frames/The_Nameless_1999.jpg",
    answer: "THE NAMELESS",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_629",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598154/scoopcast_frames/Phase_IV_1974.jpg",
    answer: "PHASE IV",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_630",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598155/scoopcast_frames/The_Eternal_Daughter_2022.jpg",
    answer: "THE ETERNAL DAUGHTER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_631",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598156/scoopcast_frames/The_Invisible_Man_1933_1933.jpg",
    answer: "THE INVISIBLE MAN (1933)",
    year: "1933",
    tag: "classic"
  },
  {
    id: "f_632",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598157/scoopcast_frames/The_39_Steps_1935.jpg",
    answer: "THE 39 STEPS",
    year: "1935",
    tag: "classic"
  },
  {
    id: "f_633",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598159/scoopcast_frames/Orlando_My_Political_Biography_2023.jpg",
    answer: "ORLANDO: MY POLITICAL BIOGRAPHY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_634",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598159/scoopcast_frames/Diamonds_Are_Forever_1971.jpg",
    answer: "DIAMONDS ARE FOREVER",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_635",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598159/scoopcast_frames/The_Twentieth_Century_2019.jpg",
    answer: "THE TWENTIETH CENTURY",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_636",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598161/scoopcast_frames/Fire_In_The_Sky_1993.jpg",
    answer: "FIRE IN THE SKY",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_637",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598164/scoopcast_frames/Heroic_Trio_2_Executioners_1993.jpg",
    answer: "HEROIC TRIO 2: EXECUTIONERS",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_638",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588007/scoopcast_frames/Hotel_Monterey_1973.jpg",
    answer: "HOTEL MONTEREY",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_639",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598169/scoopcast_frames/Our_Sunhi_2013.jpg",
    answer: "OUR SUNHI",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_640",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598171/scoopcast_frames/In_A_Violent_Nature_2024.jpg",
    answer: "IN A VIOLENT NATURE",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_641",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598172/scoopcast_frames/Kundun_1997.jpg",
    answer: "KUNDUN",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_642",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598173/scoopcast_frames/The_Manchurian_Candidate_1962_1962.jpg",
    answer: "THE MANCHURIAN CANDIDATE (1962)",
    year: "1962",
    tag: "classic"
  },
  {
    id: "f_643",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598174/scoopcast_frames/Die_My_Love_2025.jpg",
    answer: "DIE MY LOVE",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_644",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598175/scoopcast_frames/The_Feeling_That_the_Time_for_Doing_Something_Has_Passed_2023.jpg",
    answer: "THE FEELING THAT THE TIME FOR DOING SOMETHING HAS PASSED",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_645",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598180/scoopcast_frames/The_End_We_Start_From_2023.jpg",
    answer: "THE END WE START FROM",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_646",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598182/scoopcast_frames/Enys_Men_2022.jpg",
    answer: "ENYS MEN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_647",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598184/scoopcast_frames/Highlander_II_The_Quickening_1991.jpg",
    answer: "HIGHLANDER II: THE QUICKENING",
    year: "1991",
    tag: "classic"
  },
  {
    id: "f_648",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598188/scoopcast_frames/The_Novelists_Film_2022.jpg",
    answer: "THE NOVELIST'S FILM",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_649",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598202/scoopcast_frames/Suzume_2022.jpg",
    answer: "SUZUME",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_650",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598207/scoopcast_frames/The_Third_Part_of_the_Night_1971.jpg",
    answer: "THE THIRD PART OF THE NIGHT",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_651",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598209/scoopcast_frames/Shivers_1975.jpg",
    answer: "SHIVERS",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_652",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598211/scoopcast_frames/Bacurau_2019.jpg",
    answer: "BACURAU",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_653",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598212/scoopcast_frames/Janet_Planet_2023.jpg",
    answer: "JANET PLANET",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_654",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598213/scoopcast_frames/Joyland_2022.jpg",
    answer: "JOYLAND",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_655",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598215/scoopcast_frames/Boy_Kills_World_2023.jpg",
    answer: "BOY KILLS WORLD",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_656",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598221/scoopcast_frames/To_Leslie_2022.jpg",
    answer: "TO LESLIE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_657",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598223/scoopcast_frames/Some_Kind_Of_Heaven_2020.jpg",
    answer: "SOME KIND OF HEAVEN",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_658",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598225/scoopcast_frames/Comanche_Station_1960.jpg",
    answer: "COMANCHE STATION",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_659",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598225/scoopcast_frames/Double_Blind_2023.jpg",
    answer: "DOUBLE BLIND",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_660",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598227/scoopcast_frames/The_Goldfinch_2019.jpg",
    answer: "THE GOLDFINCH",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_661",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598227/scoopcast_frames/George_Washington_2000.jpg",
    answer: "GEORGE WASHINGTON",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_662",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598228/scoopcast_frames/8_Women_2002.jpg",
    answer: "8 WOMEN",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_663",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598231/scoopcast_frames/Water_Drops_on_Burning_Rocks_2000.jpg",
    answer: "WATER DROPS ON BURNING ROCKS",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_664",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598234/scoopcast_frames/The_Royal_Hotel_2023.jpg",
    answer: "THE ROYAL HOTEL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_665",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598236/scoopcast_frames/DOA_1949.jpg",
    answer: "D.O.A.",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_666",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587748/scoopcast_frames/My_Animal_2023.jpg",
    answer: "MY ANIMAL",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_667",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598238/scoopcast_frames/Dark_Water_2002_2002.jpg",
    answer: "DARK WATER (2002)",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_668",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598238/scoopcast_frames/The_Fearmakers_1958.jpg",
    answer: "THE FEARMAKERS",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_669",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598240/scoopcast_frames/Evil_Dead_Trap_2020.jpg",
    answer: "EVIL DEAD TRAP",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_670",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598246/scoopcast_frames/Close_Up_1990.jpg",
    answer: "CLOSE-UP",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_671",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598263/scoopcast_frames/The_Reckless_Moment_1949.jpg",
    answer: "THE RECKLESS MOMENT",
    year: "1949",
    tag: "classic"
  },
  {
    id: "f_672",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598264/scoopcast_frames/The_Machine_Girl_2008.jpg",
    answer: "THE MACHINE GIRL",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_673",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588079/scoopcast_frames/Terrified_2017.jpg",
    answer: "TERRIFIED",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_674",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598267/scoopcast_frames/The_Cook_The_Thief_His_Wife_and_Her_Lover_1989.jpg",
    answer: "THE COOK, THE THIEF, HIS WIFE & HER LOVER",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_675",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598269/scoopcast_frames/Magic_Mikes_Last_Dance_2023.jpg",
    answer: "MAGIC MIKE'S LAST DANCE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_676",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598271/scoopcast_frames/Barbarian_2022.jpg",
    answer: "BARBARIAN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_677",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598271/scoopcast_frames/Round_Midnight_1986.jpg",
    answer: "ROUND MIDNIGHT",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_678",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598272/scoopcast_frames/Glass_2019.jpg",
    answer: "GLASS",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_679",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587828/scoopcast_frames/Shane_1953.jpg",
    answer: "SHANE",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_680",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598274/scoopcast_frames/Eyimofe_This_Is_My_Desire_2020.jpg",
    answer: "EYIMOFE (THIS IS MY DESIRE)",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_681",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598273/scoopcast_frames/The_Last_Stop_in_Yuma_County_2023.jpg",
    answer: "THE LAST STOP IN YUMA COUNTY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_682",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598275/scoopcast_frames/Witness_In_The_City_1959.jpg",
    answer: "WITNESS IN THE CITY",
    year: "1959",
    tag: "classic"
  },
  {
    id: "f_683",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598279/scoopcast_frames/In_The_Heat_Of_The_Night_1967.jpg",
    answer: "IN THE HEAT OF THE NIGHT",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_684",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598283/scoopcast_frames/I_Wanna_Hold_Your_Hand_1978.jpg",
    answer: "I WANNA HOLD YOUR HAND",
    year: "1978",
    tag: "classic"
  },
  {
    id: "f_685",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598285/scoopcast_frames/Under_The_Light_2023.jpg",
    answer: "UNDER THE LIGHT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_686",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598285/scoopcast_frames/The_Housemaid_2010_2010.jpg",
    answer: "THE HOUSEMAID (2010)",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_687",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598285/scoopcast_frames/Uzumaki_2000.jpg",
    answer: "UZUMAKI",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_688",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598286/scoopcast_frames/Your_Name_2016.jpg",
    answer: "YOUR NAME.",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_689",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598286/scoopcast_frames/The_Doom_Generation_1995.jpg",
    answer: "THE DOOM GENERATION",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_690",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598286/scoopcast_frames/Luce_2019.jpg",
    answer: "LUCE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_691",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598286/scoopcast_frames/Festen_1998.jpg",
    answer: "FESTEN",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_692",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598293/scoopcast_frames/Orgasmo_1969.jpg",
    answer: "ORGASMO",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_693",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598295/scoopcast_frames/Project_Power_2020.jpg",
    answer: "PROJECT POWER",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_694",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598296/scoopcast_frames/Harakiri_1962.jpg",
    answer: "HARAKIRI",
    year: "1962",
    tag: "classic"
  },
  {
    id: "f_695",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598297/scoopcast_frames/Daliland_2022.jpg",
    answer: "DALILAND",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_696",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598298/scoopcast_frames/Malignant_2021.jpg",
    answer: "MALIGNANT",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_697",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598325/scoopcast_frames/The_Lady_Vanishes_1938.jpg",
    answer: "THE LADY VANISHES",
    year: "1938",
    tag: "classic"
  },
  {
    id: "f_698",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598327/scoopcast_frames/Radioactive_2019.jpg",
    answer: "RADIOACTIVE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_699",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598330/scoopcast_frames/Io_Capitano_2023.jpg",
    answer: "IO CAPITANO",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_700",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598331/scoopcast_frames/It_Chapter_Two_2019.jpg",
    answer: "IT CHAPTER TWO",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_701",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598332/scoopcast_frames/His_House_2020.jpg",
    answer: "HIS HOUSE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_702",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588122/scoopcast_frames/Great_Expectations_1946_1946.jpg",
    answer: "GREAT EXPECTATIONS (1946)",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_703",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598335/scoopcast_frames/Test_Pattern_2019.jpg",
    answer: "TEST PATTERN",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_704",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598337/scoopcast_frames/Addams_Family_Values_1993.jpg",
    answer: "ADDAMS FAMILY VALUES",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_705",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598337/scoopcast_frames/Hundreds_of_Beavers_2022.jpg",
    answer: "HUNDREDS OF BEAVERS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_706",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598339/scoopcast_frames/Red_White_and_Blue_2020.jpg",
    answer: "RED, WHITE & BLUE",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_707",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598341/scoopcast_frames/The_Green_Mile_1999.jpg",
    answer: "THE GREEN MILE",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_708",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598343/scoopcast_frames/Something_In_The_Dirt_2022.jpg",
    answer: "SOMETHING IN THE DIRT",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_709",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598344/scoopcast_frames/The_Living_Daylights_1987.jpg",
    answer: "THE LIVING DAYLIGHTS",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_710",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598346/scoopcast_frames/The_Ox_Bow_Incident_1942.jpg",
    answer: "THE OX-BOW INCIDENT",
    year: "1942",
    tag: "classic"
  },
  {
    id: "f_711",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598348/scoopcast_frames/Cuckoo_2024.jpg",
    answer: "CUCKOO",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_712",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587746/scoopcast_frames/A_White_White_Day_2019.jpg",
    answer: "A WHITE, WHITE DAY",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_713",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598353/scoopcast_frames/King_and_Country_1964.jpg",
    answer: "KING & COUNTRY",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_714",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598354/scoopcast_frames/La_Verite_1960.jpg",
    answer: "LA VERITE",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_715",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598355/scoopcast_frames/Asteroid_City_2023.jpg",
    answer: "ASTEROID CITY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_716",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598358/scoopcast_frames/The_Spiral_Staircase_1946.jpg",
    answer: "THE SPIRAL STAIRCASE",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_717",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598359/scoopcast_frames/Black_Bag_2025.jpg",
    answer: "BLACK BAG",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_718",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598391/scoopcast_frames/Fr%C3%A9waka_2024.jpg",
    answer: "FRÉWAKA",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_719",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598393/scoopcast_frames/Dick_Tracy_1990.jpg",
    answer: "DICK TRACY",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_720",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598393/scoopcast_frames/Election_1999.jpg",
    answer: "ELECTION",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_721",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598393/scoopcast_frames/Compa%C3%B1eros_1970.jpg",
    answer: "COMPAÑEROS",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_722",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598395/scoopcast_frames/Illang_The_Wolf_Brigade_2018.jpg",
    answer: "ILLANG: THE WOLF BRIGADE",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_723",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598397/scoopcast_frames/Chicken_With_Plums_2011.jpg",
    answer: "CHICKEN WITH PLUMS",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_724",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598399/scoopcast_frames/The_Fabelmans_2022.jpg",
    answer: "THE FABELMANS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_725",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598400/scoopcast_frames/Imitation_of_Life_1959.jpg",
    answer: "IMITATION OF LIFE",
    year: "1959",
    tag: "classic"
  },
  {
    id: "f_726",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598401/scoopcast_frames/The_Killers_1946.jpg",
    answer: "THE KILLERS",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_727",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598405/scoopcast_frames/Highlander_1986.jpg",
    answer: "HIGHLANDER",
    year: "1986",
    tag: "classic"
  },
  {
    id: "f_728",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598408/scoopcast_frames/The_Exorcist_Believer_2023.jpg",
    answer: "THE EXORCIST: BELIEVER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_729",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598409/scoopcast_frames/All_Of_Us_Strangers_2023.jpg",
    answer: "ALL OF US STRANGERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_730",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598412/scoopcast_frames/Hard_Boiled_1992.jpg",
    answer: "HARD BOILED",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_731",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598413/scoopcast_frames/Cmon_Cmon_2021.jpg",
    answer: "C'MON C'MON",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_732",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598417/scoopcast_frames/What_Have_They_Done_To_Your_Daughters_1974.jpg",
    answer: "WHAT HAVE THEY DONE TO YOUR DAUGHTERS?",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_733",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598419/scoopcast_frames/The_White_Tiger_2021.jpg",
    answer: "THE WHITE TIGER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_734",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598419/scoopcast_frames/The_Good_The_Bad_The_Weird_2008.jpg",
    answer: "THE GOOD THE BAD THE WEIRD",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_735",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598419/scoopcast_frames/State_of_Siege_1972.jpg",
    answer: "STATE OF SIEGE",
    year: "1972",
    tag: "classic"
  },
  {
    id: "f_736",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598424/scoopcast_frames/Prisoners_of_the_Ghostland_2021.jpg",
    answer: "PRISONERS OF THE GHOSTLAND",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_737",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598443/scoopcast_frames/4_months_3_Weeks_and_2_Days_2007.jpg",
    answer: "4 MONTHS, 3 WEEKS AND 2 DAYS",
    year: "2007",
    tag: "classic"
  },
  {
    id: "f_738",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598448/scoopcast_frames/Men_In_Black_1997.jpg",
    answer: "MEN IN BLACK",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_739",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588296/scoopcast_frames/The_Wonder_2022.jpg",
    answer: "THE WONDER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_740",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598451/scoopcast_frames/Quantum_of_Solace_2008.jpg",
    answer: "QUANTUM OF SOLACE",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_741",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598453/scoopcast_frames/Born_On_The_Fourth_of_July_1989.jpg",
    answer: "BORN ON THE FOURTH OF JULY",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_742",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598456/scoopcast_frames/Influencer_2022.jpg",
    answer: "INFLUENCER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_743",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598458/scoopcast_frames/All_You_Need_Is_Death_2023.jpg",
    answer: "ALL YOU NEED IS DEATH",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_744",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598460/scoopcast_frames/Education_2020.jpg",
    answer: "EDUCATION",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_745",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598460/scoopcast_frames/Beatrice_Cenci_1969.jpg",
    answer: "BEATRICE CENCI",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_746",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598460/scoopcast_frames/The_Purple_Plain_1954.jpg",
    answer: "THE PURPLE PLAIN",
    year: "1954",
    tag: "classic"
  },
  {
    id: "f_747",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598461/scoopcast_frames/Panique_1946.jpg",
    answer: "PANIQUE",
    year: "1946",
    tag: "classic"
  },
  {
    id: "f_748",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598462/scoopcast_frames/Riddle_of_Fire_2023.jpg",
    answer: "RIDDLE OF FIRE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_749",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598462/scoopcast_frames/The_Innocents_2021_2021.jpg",
    answer: "THE INNOCENTS (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_750",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598464/scoopcast_frames/Chess_of_the_Wind_1976.jpg",
    answer: "CHESS OF THE WIND",
    year: "1976",
    tag: "classic"
  },
  {
    id: "f_751",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598467/scoopcast_frames/Letter_Never_Sent_1960.jpg",
    answer: "LETTER NEVER SENT",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_752",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598468/scoopcast_frames/Psychokinesis_2018.jpg",
    answer: "PSYCHOKINESIS",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_753",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598469/scoopcast_frames/Lovers_Rock_2020.jpg",
    answer: "LOVER'S ROCK",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_754",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598470/scoopcast_frames/Grabbers_2012.jpg",
    answer: "GRABBERS",
    year: "2012",
    tag: "classic"
  },
  {
    id: "f_755",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598472/scoopcast_frames/Everything_Everywhere_All_At_Once_2022.jpg",
    answer: "EVERYTHING EVERYWHERE ALL AT ONCE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_756",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598474/scoopcast_frames/Rye_Lane_2023.jpg",
    answer: "RYE LANE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_757",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598478/scoopcast_frames/BirthRebirth_2023.jpg",
    answer: "BIRTH/REBIRTH",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_758",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598480/scoopcast_frames/Shin_Godzilla_2016.jpg",
    answer: "SHIN GODZILLA",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_759",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598480/scoopcast_frames/Deadly_Circuit_1983.jpg",
    answer: "DEADLY CIRCUIT",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_760",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598509/scoopcast_frames/Misericordia_2024.jpg",
    answer: "MISERICORDIA",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_761",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598510/scoopcast_frames/We_Grown_Now_2023.jpg",
    answer: "WE GROWN NOW",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_762",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598513/scoopcast_frames/Return_To_Seoul_2022.jpg",
    answer: "RETURN TO SEOUL",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_763",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598515/scoopcast_frames/Memories_of_Murder_2003.jpg",
    answer: "MEMORIES OF MURDER",
    year: "2003",
    tag: "classic"
  },
  {
    id: "f_764",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598515/scoopcast_frames/Oldboy_2013_2013.jpg",
    answer: "OLDBOY (2013)",
    year: "2013",
    tag: "classic"
  },
  {
    id: "f_765",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598518/scoopcast_frames/Norwegian_Wood_2010.jpg",
    answer: "NORWEGIAN WOOD",
    year: "2010",
    tag: "classic"
  },
  {
    id: "f_766",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598519/scoopcast_frames/El_Chicano_2018.jpg",
    answer: "EL CHICANO",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_767",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598520/scoopcast_frames/Boys_Go_To_Jupiter_2024.jpg",
    answer: "BOYS GO TO JUPITER",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_768",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598521/scoopcast_frames/Woman_in_the_Dunes_1964.jpg",
    answer: "WOMAN IN THE DUNES",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_769",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598522/scoopcast_frames/Doubt_2008.jpg",
    answer: "DOUBT",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_770",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598522/scoopcast_frames/Hellbender_2021.jpg",
    answer: "HELLBENDER",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_771",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598524/scoopcast_frames/Frankenhooker_1990.jpg",
    answer: "FRANKENHOOKER",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_772",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598525/scoopcast_frames/The_Rat_Catcher_2023.jpg",
    answer: "THE RAT CATCHER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_773",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598526/scoopcast_frames/A_Face_In_The_Crowd_1957.jpg",
    answer: "A FACE IN THE CROWD",
    year: "1957",
    tag: "classic"
  },
  {
    id: "f_774",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598528/scoopcast_frames/The_Beast_2023_2023.jpg",
    answer: "THE BEAST (2023)",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_775",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598528/scoopcast_frames/Tchaikovskys_Wife_2022.jpg",
    answer: "TCHAIKOVSKY'S WIFE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_776",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598531/scoopcast_frames/May_December_2023.jpg",
    answer: "MAY DECEMBER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_777",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588254/scoopcast_frames/Australia_2008.jpg",
    answer: "AUSTRALIA",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_778",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598535/scoopcast_frames/Silent_Night_2023.jpg",
    answer: "SILENT NIGHT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_779",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598535/scoopcast_frames/Moonraker_1979.jpg",
    answer: "MOONRAKER",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_780",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598566/scoopcast_frames/Texas_Adios_1966.jpg",
    answer: "TEXAS, ADIOS",
    year: "1966",
    tag: "classic"
  },
  {
    id: "f_781",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598569/scoopcast_frames/Dog_Soldiers_2002.jpg",
    answer: "DOG SOLDIERS",
    year: "2002",
    tag: "classic"
  },
  {
    id: "f_782",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598571/scoopcast_frames/How_The_Grinch_Stole_Christmas_2000.jpg",
    answer: "HOW THE GRINCH STOLE CHRISTMAS",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_783",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598571/scoopcast_frames/Boston_Strangler_2023.jpg",
    answer: "BOSTON STRANGLER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_784",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598572/scoopcast_frames/Bergman_Island_2021.jpg",
    answer: "BERGMAN ISLAND",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_785",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598573/scoopcast_frames/The_Phantom_Carriage_1921.jpg",
    answer: "THE PHANTOM CARRIAGE",
    year: "1921",
    tag: "classic"
  },
  {
    id: "f_786",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598573/scoopcast_frames/Avatar_The_Way_of_Water_2022.jpg",
    answer: "AVATAR: THE WAY OF WATER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_787",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598573/scoopcast_frames/The_Deeper_You_Dig_2019.jpg",
    answer: "THE DEEPER YOU DIG",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_788",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598577/scoopcast_frames/What_A_Way_To_Go_1964.jpg",
    answer: "WHAT A WAY TO GO!",
    year: "1964",
    tag: "classic"
  },
  {
    id: "f_789",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598578/scoopcast_frames/The_Marvels_2023.jpg",
    answer: "THE MARVELS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_790",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598580/scoopcast_frames/Moonstruck_1987.jpg",
    answer: "MOONSTRUCK",
    year: "1987",
    tag: "classic"
  },
  {
    id: "f_791",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598580/scoopcast_frames/Universal_Soldier_The_Return_1999.jpg",
    answer: "UNIVERSAL SOLDIER: THE RETURN",
    year: "1999",
    tag: "classic"
  },
  {
    id: "f_792",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598583/scoopcast_frames/Ballerina_2023.jpg",
    answer: "BALLERINA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_793",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598586/scoopcast_frames/All_I_Desire_1953.jpg",
    answer: "ALL I DESIRE",
    year: "1953",
    tag: "classic"
  },
  {
    id: "f_794",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598587/scoopcast_frames/Nightsiren_2022.jpg",
    answer: "NIGHTSIREN",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_795",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598589/scoopcast_frames/Mountains_of_the_Moon_1990.jpg",
    answer: "MOUNTAINS OF THE MOON",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_796",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598578/scoopcast_frames/The_Toxic_Avenger_2023.jpg",
    answer: "THE TOXIC AVENGER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_797",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598592/scoopcast_frames/Neptune_Frost_2021.jpg",
    answer: "NEPTUNE FROST",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_798",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587944/scoopcast_frames/Divinity_2023.jpg",
    answer: "DIVINITY",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_799",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598594/scoopcast_frames/Violet_2021_2021.jpg",
    answer: "VIOLET (2021)",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_800",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598597/scoopcast_frames/I_Spit_On_Your_Grave_1978.jpg",
    answer: "I SPIT ON YOUR GRAVE",
    year: "1978",
    tag: "classic"
  },
  {
    id: "f_801",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598598/scoopcast_frames/Mandabi_1968.jpg",
    answer: "MANDABI",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_802",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598599/scoopcast_frames/Nitram_2021.jpg",
    answer: "NITRAM",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_803",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598623/scoopcast_frames/Anna_2019.jpg",
    answer: "ANNA",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_804",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598631/scoopcast_frames/Last_Days_in_the_Desert_2015.jpg",
    answer: "LAST DAYS IN THE DESERT",
    year: "2015",
    tag: "classic"
  },
  {
    id: "f_805",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598632/scoopcast_frames/The_Monkey_2025.jpg",
    answer: "THE MONKEY",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_806",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598633/scoopcast_frames/When_You_Finish_Saving_The_World_2022.jpg",
    answer: "WHEN YOU FINISH SAVING THE WORLD",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_807",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598634/scoopcast_frames/The_Silent_Twins_2022.jpg",
    answer: "THE SILENT TWINS",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_808",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598635/scoopcast_frames/The_Suspicious_Death_of_a_Minor_1975.jpg",
    answer: "THE SUSPICIOUS DEATH OF A MINOR",
    year: "1975",
    tag: "classic"
  },
  {
    id: "f_809",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587750/scoopcast_frames/My_Sole_Desire_2022.jpg",
    answer: "MY SOLE DESIRE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_810",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598637/scoopcast_frames/The_Four_Musketeers_1974.jpg",
    answer: "THE FOUR MUSKETEERS",
    year: "1974",
    tag: "classic"
  },
  {
    id: "f_811",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598638/scoopcast_frames/Bait_2019.jpg",
    answer: "BAIT",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_812",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598639/scoopcast_frames/Memoria_2021.jpg",
    answer: "MEMORIA",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_813",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598640/scoopcast_frames/Full_River_Red_2023.jpg",
    answer: "FULL RIVER RED",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_814",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598641/scoopcast_frames/Finding_Forrester_2000.jpg",
    answer: "FINDING FORRESTER",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_815",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598642/scoopcast_frames/Dellamorte_Dellamore_1994.jpg",
    answer: "DELLAMORTE DELLAMORE",
    year: "1994",
    tag: "classic"
  },
  {
    id: "f_816",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598645/scoopcast_frames/The_Monk_and_The_Gun_2023.jpg",
    answer: "THE MONK AND THE GUN",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_817",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598647/scoopcast_frames/Phantom_of_the_Opera_1943_1943.jpg",
    answer: "PHANTOM OF THE OPERA (1943)",
    year: "1943",
    tag: "classic"
  },
  {
    id: "f_818",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598647/scoopcast_frames/The_Decameron_1971.jpg",
    answer: "THE DECAMERON",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_819",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587636/scoopcast_frames/Thunderball_1965.jpg",
    answer: "THUNDERBALL",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_820",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598652/scoopcast_frames/Star_Wars_Episode_IX_The_Rise_of_Skywalker_2019.jpg",
    answer: "STAR WARS: EPISODE IX - THE RISE OF SKYWALKER",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_821",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598655/scoopcast_frames/The_Last_Year_of_Darkness_2023.jpg",
    answer: "THE LAST YEAR OF DARKNESS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_822",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588253/scoopcast_frames/The_Dead_Dont_Hurt_2023.jpg",
    answer: "THE DEAD DON'T HURT",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_823",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598657/scoopcast_frames/Help_2021.jpg",
    answer: "HELP",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_824",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598661/scoopcast_frames/Chopper_2000.jpg",
    answer: "CHOPPER",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_825",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598664/scoopcast_frames/The_Church_1989.jpg",
    answer: "THE CHURCH",
    year: "1989",
    tag: "classic"
  },
  {
    id: "f_826",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598665/scoopcast_frames/Dobermann_1997.jpg",
    answer: "DOBERMANN",
    year: "1997",
    tag: "classic"
  },
  {
    id: "f_827",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598684/scoopcast_frames/Zola_2020.jpg",
    answer: "ZOLA",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_828",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598690/scoopcast_frames/Meet_Me_In_St_Louis_1944.jpg",
    answer: "MEET ME IN ST. LOUIS",
    year: "1944",
    tag: "classic"
  },
  {
    id: "f_829",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598691/scoopcast_frames/Sinners_2025.jpg",
    answer: "SINNERS",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_830",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598691/scoopcast_frames/Baby_Its_You_1983.jpg",
    answer: "BABY IT'S YOU",
    year: "1983",
    tag: "classic"
  },
  {
    id: "f_831",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598692/scoopcast_frames/Beau_Is_Afraid_2023.jpg",
    answer: "BEAU IS AFRAID",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_832",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598693/scoopcast_frames/Peeping_Tom_1960.jpg",
    answer: "PEEPING TOM",
    year: "1960",
    tag: "classic"
  },
  {
    id: "f_833",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598696/scoopcast_frames/Zigeunerweisen_1980.jpg",
    answer: "ZIGEUNERWEISEN",
    year: "1980",
    tag: "classic"
  },
  {
    id: "f_834",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598698/scoopcast_frames/The_Heroic_Trio_1993.jpg",
    answer: "THE HEROIC TRIO",
    year: "1993",
    tag: "classic"
  },
  {
    id: "f_835",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598699/scoopcast_frames/Wanted_2008.jpg",
    answer: "WANTED",
    year: "2008",
    tag: "classic"
  },
  {
    id: "f_836",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587745/scoopcast_frames/The_Last_of_Sheila_1973.jpg",
    answer: "THE LAST OF SHEILA",
    year: "1973",
    tag: "classic"
  },
  {
    id: "f_837",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588005/scoopcast_frames/Brooklyn_45_2023.jpg",
    answer: "BROOKLYN 45",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_838",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598704/scoopcast_frames/King_of_New_York_1990.jpg",
    answer: "KING OF NEW YORK",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_839",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598706/scoopcast_frames/Crimson_Tide_1995.jpg",
    answer: "CRIMSON TIDE",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_840",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598708/scoopcast_frames/Conan_The_Destroyer_1984.jpg",
    answer: "CONAN THE DESTROYER",
    year: "1984",
    tag: "classic"
  },
  {
    id: "f_841",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598709/scoopcast_frames/Joker_Folie_%C3%A0_Deux_2024.jpg",
    answer: "JOKER: FOLIE À DEUX",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_842",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598712/scoopcast_frames/GoldenEye_1995.jpg",
    answer: "GOLDENEYE",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_843",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598713/scoopcast_frames/Dracula_2025_Jude_2025.jpg",
    answer: "DRACULA (2025) (JUDE)",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_844",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598717/scoopcast_frames/Anything_For_Jackson_2020.jpg",
    answer: "ANYTHING FOR JACKSON",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_845",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598719/scoopcast_frames/Scrapper_2023.jpg",
    answer: "SCRAPPER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_846",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598726/scoopcast_frames/Il_Boom_1963.jpg",
    answer: "IL BOOM",
    year: "1963",
    tag: "classic"
  },
  {
    id: "f_847",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598742/scoopcast_frames/Creed_II_2018.jpg",
    answer: "CREED II",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_848",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587945/scoopcast_frames/Believer_2018.jpg",
    answer: "BELIEVER",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_849",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598750/scoopcast_frames/Andrei_Rublev_1966.jpg",
    answer: "ANDREI RUBLEV",
    year: "1966",
    tag: "classic"
  },
  {
    id: "f_850",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598750/scoopcast_frames/The_Vertical_Ray_of_the_Sun_2000.jpg",
    answer: "THE VERTICAL RAY OF THE SUN",
    year: "2000",
    tag: "classic"
  },
  {
    id: "f_851",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598751/scoopcast_frames/Intrusion_2021.jpg",
    answer: "INTRUSION",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_852",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598752/scoopcast_frames/Gun_Crazy_1950.jpg",
    answer: "GUN CRAZY",
    year: "1950",
    tag: "classic"
  },
  {
    id: "f_853",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598753/scoopcast_frames/Petite_Maman_2021.jpg",
    answer: "PETITE MAMAN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_854",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598754/scoopcast_frames/Tank_Girl_1995.jpg",
    answer: "TANK GIRL",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_855",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587872/scoopcast_frames/Bend_of_the_River_1952.jpg",
    answer: "BEND OF THE RIVER",
    year: "1952",
    tag: "classic"
  },
  {
    id: "f_856",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598758/scoopcast_frames/My_First_Summer_2020.jpg",
    answer: "MY FIRST SUMMER",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_857",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598760/scoopcast_frames/Im_Thinking_of_Ending_Things_2020.jpg",
    answer: "I'M THINKING OF ENDING THINGS",
    year: "2020",
    tag: "classic"
  },
  {
    id: "f_858",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598761/scoopcast_frames/Wait_Until_Dark_1967.jpg",
    answer: "WAIT UNTIL DARK",
    year: "1967",
    tag: "classic"
  },
  {
    id: "f_859",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598763/scoopcast_frames/The_Quiet_Girl_2022.jpg",
    answer: "THE QUIET GIRL",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_860",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598763/scoopcast_frames/The_Life_of_Chuck_2024.jpg",
    answer: "THE LIFE OF CHUCK",
    year: "2024",
    tag: "new"
  },
  {
    id: "f_861",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598764/scoopcast_frames/Decision_To_Leave_2022.jpg",
    answer: "DECISION TO LEAVE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_862",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598766/scoopcast_frames/Planet_of_the_Apes_1968_1968.jpg",
    answer: "PLANET OF THE APES (1968)",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_863",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598768/scoopcast_frames/Maestro_2023.jpg",
    answer: "MAESTRO",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_864",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598770/scoopcast_frames/Through_Fire_Water_and_Brass_Pipes_1968.jpg",
    answer: "THROUGH FIRE, WATER AND… BRASS PIPES",
    year: "1968",
    tag: "classic"
  },
  {
    id: "f_865",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598772/scoopcast_frames/After_Yang_2021.jpg",
    answer: "AFTER YANG",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_866",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598773/scoopcast_frames/Anon_2018.jpg",
    answer: "ANON",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_867",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598775/scoopcast_frames/Doctor_X_1932.jpg",
    answer: "DOCTOR X",
    year: "1932",
    tag: "classic"
  },
  {
    id: "f_868",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598774/scoopcast_frames/The_Music_Room_1958.jpg",
    answer: "THE MUSIC ROOM",
    year: "1958",
    tag: "classic"
  },
  {
    id: "f_869",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598775/scoopcast_frames/The_Unknown_Country_2022.jpg",
    answer: "THE UNKNOWN COUNTRY",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_870",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598776/scoopcast_frames/A_Dark_Song_2016.jpg",
    answer: "A DARK SONG",
    year: "2016",
    tag: "classic"
  },
  {
    id: "f_871",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598778/scoopcast_frames/Ringu_1998.jpg",
    answer: "RINGU",
    year: "1998",
    tag: "classic"
  },
  {
    id: "f_872",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598780/scoopcast_frames/The_Night_Comes_for_Us_2018.jpg",
    answer: "THE NIGHT COMES FOR US",
    year: "2018",
    tag: "classic"
  },
  {
    id: "f_873",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790588252/scoopcast_frames/Army_of_Darkness_1992.jpg",
    answer: "ARMY OF DARKNESS",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_874",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598806/scoopcast_frames/Please_Baby_Please_2022.jpg",
    answer: "PLEASE BABY PLEASE",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_875",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598808/scoopcast_frames/Humanist_Vampire_Seeking_Consenting_Suicidal_Person_2023.jpg",
    answer: "HUMANIST VAMPIRE SEEKING CONSENTING SUICIDAL PERSON",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_876",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598810/scoopcast_frames/Die_Hard_with_a_Vengeance_1995.jpg",
    answer: "DIE HARD WITH A VENGEANCE",
    year: "1995",
    tag: "classic"
  },
  {
    id: "f_877",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598812/scoopcast_frames/Dracula_2025_Besson_2025.jpg",
    answer: "DRACULA (2025) (BESSON)",
    year: "2025",
    tag: "new"
  },
  {
    id: "f_878",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598814/scoopcast_frames/Mission_Impossible_Dead_Reckoning_Part_One_2023.jpg",
    answer: "MISSION: IMPOSSIBLE - DEAD RECKONING PART ONE",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_879",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598814/scoopcast_frames/Hellraiser_III_Hell_on_Earth_1992.jpg",
    answer: "HELLRAISER III: HELL ON EARTH",
    year: "1992",
    tag: "classic"
  },
  {
    id: "f_880",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598816/scoopcast_frames/Quadrophenia_1979.jpg",
    answer: "QUADROPHENIA",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_881",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598817/scoopcast_frames/Utama_2022.jpg",
    answer: "UTAMA",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_882",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598818/scoopcast_frames/Major_Dundee_1965.jpg",
    answer: "MAJOR DUNDEE",
    year: "1965",
    tag: "classic"
  },
  {
    id: "f_883",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598818/scoopcast_frames/Rose_Plays_Julie_2019.jpg",
    answer: "ROSE PLAYS JULIE",
    year: "2019",
    tag: "classic"
  },
  {
    id: "f_884",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598819/scoopcast_frames/Night_of_the_Blood_Monster_1970.jpg",
    answer: "NIGHT OF THE BLOOD MONSTER",
    year: "1970",
    tag: "classic"
  },
  {
    id: "f_885",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598820/scoopcast_frames/Sisu_2022.jpg",
    answer: "SISU",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_886",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598821/scoopcast_frames/Watcher_2022.jpg",
    answer: "WATCHER",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_887",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598823/scoopcast_frames/Death_Game_1977.jpg",
    answer: "DEATH GAME",
    year: "1977",
    tag: "classic"
  },
  {
    id: "f_888",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598825/scoopcast_frames/The_Last_Duel_2021.jpg",
    answer: "THE LAST DUEL",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_889",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598827/scoopcast_frames/Christ_Stopped_at_Eboli_1979.jpg",
    answer: "CHRIST STOPPED AT EBOLI",
    year: "1979",
    tag: "classic"
  },
  {
    id: "f_890",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598829/scoopcast_frames/El_Cid_1961.jpg",
    answer: "EL CID",
    year: "1961",
    tag: "classic"
  },
  {
    id: "f_891",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598829/scoopcast_frames/In_Time_2011.jpg",
    answer: "IN TIME",
    year: "2011",
    tag: "classic"
  },
  {
    id: "f_892",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598830/scoopcast_frames/The_Mauritanian_2021.jpg",
    answer: "THE MAURITANIAN",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_893",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790587633/scoopcast_frames/Larks_On_A_String_1969.jpg",
    answer: "LARKS ON A STRING",
    year: "1969",
    tag: "classic"
  },
  {
    id: "f_894",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598833/scoopcast_frames/Bloodsuckers_2021.jpg",
    answer: "BLOODSUCKERS",
    year: "2021",
    tag: "classic"
  },
  {
    id: "f_895",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598837/scoopcast_frames/Le_Corbeau_1943.jpg",
    answer: "LE CORBEAU",
    year: "1943",
    tag: "classic"
  },
  {
    id: "f_896",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598838/scoopcast_frames/Last_Summer_2023.jpg",
    answer: "LAST SUMMER",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_897",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598838/scoopcast_frames/Earth_Mama_2023.jpg",
    answer: "EARTH MAMA",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_898",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598838/scoopcast_frames/The_Old_Dark_House_1932.jpg",
    answer: "THE OLD DARK HOUSE",
    year: "1932",
    tag: "classic"
  },
  {
    id: "f_899",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598867/scoopcast_frames/Halloween_II_1981_1981.jpg",
    answer: "HALLOWEEN II (1981)",
    year: "1981",
    tag: "classic"
  },
  {
    id: "f_900",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598872/scoopcast_frames/The_Witches_1990.jpg",
    answer: "THE WITCHES",
    year: "1990",
    tag: "classic"
  },
  {
    id: "f_901",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598874/scoopcast_frames/On_The_Beach_At_Night_Alone_2017.jpg",
    answer: "ON THE BEACH AT NIGHT ALONE",
    year: "2017",
    tag: "classic"
  },
  {
    id: "f_902",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598876/scoopcast_frames/The_Settlers_2023.jpg",
    answer: "THE SETTLERS",
    year: "2023",
    tag: "classic"
  },
  {
    id: "f_903",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598876/scoopcast_frames/Death_Walks_On_High_Heels_1971.jpg",
    answer: "DEATH WALKS ON HIGH HEELS",
    year: "1971",
    tag: "classic"
  },
  {
    id: "f_904",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598880/scoopcast_frames/Gods_Creatures_2022.jpg",
    answer: "GOD'S CREATURES",
    year: "2022",
    tag: "classic"
  },
  {
    id: "f_905",
    category: "frames",
    type: "image",
    content: "https://res.cloudinary.com/nvwgbyr3/image/upload/v1790598881/scoopcast_frames/The_Tarnished_Angels_1957.jpg",
    answer: "THE TARNISHED ANGELS",
    year: "1957",
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
