import { PerceptualHash } from "../utils/perceptualHash";

export interface EnrichedFrameMetadata {
  frameId: string;
  movieId: string;
  movieTitle: string;
  contentUrl: string;
  category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
  type: 'image' | 'dialogue' | 'eye';
  year: number;
  franchise: string;
  region: 'hollywood' | 'bollywood' | 'regional' | 'international';
  genre: string;
  leadActor: string;
  difficulty: number; // 1 - 10
  qualityScore: number; // 50 - 100
  discoveryValue: number; // 10 - 100
  perceptualHash: string;
  tag?: string;
  aliases?: string[];
  dialogue?: string;
  revealContent?: string;
}

export class MetadataEnricher {
  private static readonly FRANCHISE_PATTERNS: Array<{ regex: RegExp; franchise: string }> = [
    { regex: /\b(iron man|thor|captain america|avengers|guardians of the galaxy|doctor strange|black panther|ant-man|eternals|shang-chi|black widow|the marvels|captain marvel|loki|wanda|deadpool|x-men|wolverine|hawkeye|falcon)\b/i, franchise: 'marvel_mcu' },
    { regex: /\b(spider-man|across the spider-verse|into the spider-verse|venom|morbius)\b/i, franchise: 'spider_man' },
    { regex: /\b(batman|dark knight|joker|superman|justice league|wonder woman|aquaman|flash|gotham)\b/i, franchise: 'dc_comics' },
    { regex: /\b(star wars|the empire strikes back|return of the jedi|phantom menace|revenge of the sith|rogue one|solo|the force awakens|the last jedi)\b/i, franchise: 'star_wars' },
    { regex: /\b(harry potter|fantastic beasts|deathly hallows|philosopher's stone|goblet of fire|prisoner of azkaban)\b/i, franchise: 'wizarding_world' },
    { regex: /\b(lord of the rings|fellowship of the ring|two towers|return of the king|the hobbit)\b/i, franchise: 'middle_earth' },
    { regex: /\b(fast & furious|fast and furious|tokyo drift|furious 7|fate of the furious)\b/i, franchise: 'fast_and_furious' },
    { regex: /\b(mission:? impossible|dead reckoning|fallout|rogue nation|ghost protocol)\b/i, franchise: 'mission_impossible' },
    { regex: /\b(james bond|skyfall|casino royale|no time to die|spectre|quantum of solace|goldeneye)\b/i, franchise: 'james_bond' },
    { regex: /\b(jurassic park|jurassic world|fallen kingdom|dominion)\b/i, franchise: 'jurassic' },
    { regex: /\b(avatar|the way of water)\b/i, franchise: 'avatar' },
    { regex: /\b(the godfather)\b/i, franchise: 'the_godfather' },
    { regex: /\b(alien|aliens|prometheus|alien: covenant|alien: romulus)\b/i, franchise: 'alien' },
    { regex: /\b(terminator|judgment day|rise of the machines|salvation|genisys|dark fate)\b/i, franchise: 'terminator' },
    { regex: /\b(john wick|parabellum)\b/i, franchise: 'john_wick' },
    { regex: /\b(the matrix|matrix reloaded|matrix revolutions|matrix resurrections)\b/i, franchise: 'the_matrix' },
    { regex: /\b(pirates of the caribbean|curse of the black pearl|dead man's chest|at world's end)\b/i, franchise: 'pirates_caribbean' },
    { regex: /\b(transformers|revenge of the fallen|dark of the moon|age of extinction|the last knight|rise of the beasts)\b/i, franchise: 'transformers' },
    { regex: /\b(toy story|finding nemo|finding dory|monsters, inc|monsters university|the incredibles|inside out|coco|ratatouille|wall-e|up)\b/i, franchise: 'pixar' },
    { regex: /\b(shrek|puss in boots)\b/i, franchise: 'shrek' },
    { regex: /\b(dune: part one|dune: part two|dune)\b/i, franchise: 'dune' },
    { regex: /\b(mad max|fury road|furiosa)\b/i, franchise: 'mad_max' },
    { regex: /\b(hunger games|catching fire|mockingjay|ballad of songbirds)\b/i, franchise: 'hunger_games' },
    { regex: /\b(baahubali|rrr)\b/i, franchise: 'rajamouli_universe' },
    { regex: /\b(kgf|salaar)\b/i, franchise: 'prashanth_neel_universe' },
    { regex: /\b(vikram|kaithi|leo)\b/i, franchise: 'lokesh_cinematic_universe' }
  ];

  private static readonly BOLLYWOOD_TITLES = new Set([
    'sholay', 'dilwale dulhania le jayenge', '3 idiots', 'lagaan', 'dangal', 'jawan', 'pathaan',
    'gangs of wasseypur', 'pk', 'kabhi khushi kabhie gham', 'zindagi na milegi dobara', 'andhadhun',
    'taare zameen par', 'swades', 'chak de! india', 'queen', 'barfi!', 'bajrangi bhaijaan',
    'rockstar', 'yeh jawaani hai deewani', 'gully boy', 'om shanti om', 'munna bhai m.b.b.s.',
    'kahaani', 'dil chahta hai', 'devdas', 'stree', 'brahmastra', 'animal'
  ]);

  private static readonly REGIONAL_INDIAN_TITLES = new Set([
    'rrr', 'baahubali: the beginning', 'baahubali 2: the conclusion', 'kgf: chapter 1', 'kgf: chapter 2',
    'kantara', 'pushpa: the rise', 'pushpa 2: the rule', 'vikram', 'jailer', 'ponniyin selvan: i',
    'ponniyin selvan: ii', 'avesham', 'manjummel boys', 'bramayugam', 'premalu', 'leo', 'kaithi',
    'master', 'asuran', 'karnan', 'soorarai pottru', 'jai bhim', 'drishyam', 'lucifer', 'eega'
  ]);

  private static readonly INTERNATIONAL_TITLES = new Set([
    'parasite', 'spirited away', 'oldboy', 'pan\'s labyrinth', 'city of god', 'amelie', 'roma',
    'seven samurai', 'stalker', 'the 400 blows', 'bicycle thieves', 'breathless', 'in the mood for love',
    'memories of murder', 'crouching tiger, hidden dragon', 'la haine', 'the hunt', 'another round',
    'portrait of a lady on fire', 'the zone of interest', 'anatomy of a fall', 'drive my car',
    'close', 'the worst person in the world', 'cinema paradiso', 'ran', 'rashomon', 'persona'
  ]);

  private static readonly ACTOR_PATTERNS: Array<{ regex: RegExp; actor: string }> = [
    { regex: /\b(iron man|sherlock holmes|oppenheimer|avengers)\b/i, actor: 'Robert Downey Jr.' },
    { regex: /\b(the dark knight|batman begins|american psycho|the prestige|ford v ferrari)\b/i, actor: 'Christian Bale' },
    { regex: /\b(inception|titanic|wolf of wall street|the revenant|django unchained|shutter island|catch me if you can|the departed)\b/i, actor: 'Leonardo DiCaprio' },
    { regex: /\b(john wick|the matrix|speed|point break|constantine)\b/i, actor: 'Keanu Reeves' },
    { regex: /\b(mission:? impossible|top gun|jerry maguire|edge of tomorrow|minority report|war of the worlds)\b/i, actor: 'Tom Cruise' },
    { regex: /\b(fight club|inglourious basterds|once upon a time in hollywood|moneyball|se7en|ocean's eleven|bullet train)\b/i, actor: 'Brad Pitt' },
    { regex: /\b(forrest gump|cast away|saving private ryan|the green mile|apollo 13|catch me if you can)\b/i, actor: 'Tom Hanks' },
    { regex: /\b(gladiator|a beautiful mind|cinderella man|les miserables)\b/i, actor: 'Russell Crowe' },
    { regex: /\b(interstellar|dallas buyers club|true detective|the wolf of wall street)\b/i, actor: 'Matthew McConaughey' },
    { regex: /\b(blade runner 2049|la la land|drive|barbie|the notebook|first man|the gray man)\b/i, actor: 'Ryan Gosling' },
    { regex: /\b(the batman|twilight|tenet|the lighthouse)\b/i, actor: 'Robert Pattinson' },
    { regex: /\b(oppenheimer|peaky blinders|dunkirk|28 days later)\b/i, actor: 'Cillian Murphy' },
    { regex: /\b(dune|wonka|call me by your name|bones and all)\b/i, actor: 'Timothee Chalamet' },
    { regex: /\b(thor|extraction|furiosa|rush)\b/i, actor: 'Chris Hemsworth' },
    { regex: /\b(spider-man|uncharted)\b/i, actor: 'Tom Holland' },
    { regex: /\b(sholay|deewaar|zanjeer|shehenshah|don)\b/i, actor: 'Amitabh Bachchan' },
    { regex: /\b(dilwale dulhania|pathaan|jawan|kabhi khushi|om shanti om|swades|chak de)\b/i, actor: 'Shah Rukh Khan' },
    { regex: /\b(dangal|3 idiots|pk|lagaan|taare zameen par)\b/i, actor: 'Aamir Khan' },
    { regex: /\b(bajrangi bhaijaan|sultan|dabangg|tiger)\b/i, actor: 'Salman Khan' },
    { regex: /\b(rrr|devara|janatha garage)\b/i, actor: 'NTR Jr.' },
    { regex: /\b(baahubali|salaar|kalki)\b/i, actor: 'Prabhas' },
    { regex: /\b(kgf|toxic)\b/i, actor: 'Yash' }
  ];

  private static readonly GENRE_KEYWORDS: Array<{ keywords: string[]; genre: string }> = [
    { keywords: ['space', 'future', 'alien', 'interstellar', 'matrix', 'blade runner', 'cyber', 'star wars', 'dune', '2001', 'sci-fi', 'moon', 'inception', 'mars'], genre: 'sci-fi' },
    { keywords: ['batman', 'spider-man', 'avengers', 'iron man', 'thor', 'superman', 'mission', 'wick', 'furious', 'action', 'die hard', 'bullet', 'top gun', 'extraction'], genre: 'action' },
    { keywords: ['se7en', 'shutter island', 'zodiac', 'parasite', 'prisoners', 'thriller', 'gone girl', 'silence of the lambs', 'memento', 'fight club', 'prestige'], genre: 'thriller' },
    { keywords: ['godfather', 'goodfellas', 'scarface', 'departed', 'crime', 'taxi driver', 'casino', 'irishman', 'pulp fiction', 'reservoir dogs', 'no country'], genre: 'crime' },
    { keywords: ['oppenheimer', 'forrest gump', 'shawshank', 'whiplash', 'social network', 'drama', 'green mile', 'gladiator', 'schindler', 'titanic'], genre: 'drama' },
    { keywords: ['shrek', 'toy story', 'spirited away', 'nemo', 'spider-verse', 'animation', 'lion king', 'monsters', 'coco', 'incredibles', 'ratatouille', 'up'], genre: 'animation' },
    { keywords: ['hangover', 'superbad', 'step brothers', 'comedy', 'monty python', 'anchorman', 'groundhog', 'borat', 'dumb and dumber'], genre: 'comedy' },
    { keywords: ['shining', 'alien', 'hereditary', 'get out', 'psycho', 'horror', 'exorcist', 'conjuring', 'thing', 'halloween', 'midsommar'], genre: 'horror' },
    { keywords: ['1917', 'saving private ryan', 'dunkirk', 'platoon', 'full metal jacket', 'apocalypse now', 'war', 'hacksaw ridge'], genre: 'war' },
    { keywords: ['django', 'unforgiven', 'good the bad and the ugly', 'no country', 'western', 'hateful eight', 'magnificent seven'], genre: 'western' }
  ];

  /**
   * Enriches raw catalog entry with cinematic intelligence, franchise awareness,
   * regional categorization, difficulty calibration, and visual fingerprinting.
   */
  public static enrich(raw: {
    id: string;
    category: 'frames' | 'dialogue' | 'eyes' | 'tie_breaker';
    type: 'image' | 'dialogue' | 'eye';
    content: string;
    answer: string;
    year?: string;
    tag?: string;
    aliases?: string[];
    dialogue?: string;
    revealContent?: string;
  }): EnrichedFrameMetadata {
    const title = raw.answer.trim();
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const numYear = parseInt(raw.year || '0', 10) || 2020;
    const movieId = `${cleanTitle.replace(/\s+/g, '-')}-${numYear}`;

    // 1. Franchise Detection
    let franchise = 'none';
    for (const pat of this.FRANCHISE_PATTERNS) {
      if (pat.regex.test(title)) {
        franchise = pat.franchise;
        break;
      }
    }

    // 2. Region Classification
    let region: 'hollywood' | 'bollywood' | 'regional' | 'international' = 'hollywood';
    if (this.BOLLYWOOD_TITLES.has(cleanTitle)) {
      region = 'bollywood';
    } else if (this.REGIONAL_INDIAN_TITLES.has(cleanTitle)) {
      region = 'regional';
    } else if (this.INTERNATIONAL_TITLES.has(cleanTitle)) {
      region = 'international';
    } else {
      // Heuristics for Indian cinema titles
      if (/\b(kumar|singh|kapoor|khan|sharma|bhai|ki|ka|hai|aur|dil|prem|raja|kalki|devara|salaar|jawan|pathaan|stree|brahmastra)\b/i.test(title)) {
        region = 'bollywood';
      }
    }

    // 3. Lead Actor Detection
    let leadActor = 'Ensemble Cast';
    for (const pat of this.ACTOR_PATTERNS) {
      if (pat.regex.test(title)) {
        leadActor = pat.actor;
        break;
      }
    }

    // 4. Genre Inference
    let genre = 'drama';
    for (const g of this.GENRE_KEYWORDS) {
      if (g.keywords.some(k => cleanTitle.includes(k))) {
        genre = g.genre;
        break;
      }
    }

    // 5. Difficulty Calibration (1 - 10)
    // 1-3: Global megahits, super iconic blockbusters (Avatar, Avengers, Titanic, Harry Potter)
    // 4-5: Popular modern blockbusters, familiar hits, acclaimed sci-fi/action
    // 6-7: Critically acclaimed cinema, cinephile staples, distinctive thrillers/dramas
    // 8-9: Arthouse masterworks, foreign auteur cinema, vintage classics
    // 10: Elite cinephile deep cuts & challenging visuals
    let difficulty = 5;
    const seedNum = cleanTitle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + numYear;

    const isIconicBlockbuster = /iron man|thor|captain america|avengers|guardians of the galaxy|spider-man|batman|dark knight|jurassic|star wars|harry potter|pixar|shrek|toy story|fast & furious|avatar|lion king|titanic|gladiator|matrix/i.test(title);
    const isArthouseMasterpiece = numYear < 1980 || /stalker|seven samurai|persona|bicycle|400 blows|la haine|close|drive my car|rashomon|ran|cinema paradiso|in the mood for love|the zone of interest|anatomy of a fall/i.test(title) || region === 'international';

    if (isIconicBlockbuster) {
      // 1 to 4
      difficulty = 1 + (seedNum % 4);
    } else if (isArthouseMasterpiece) {
      // 8 to 10
      difficulty = 8 + (seedNum % 3);
    } else if (numYear < 2000) {
      // 6 to 8
      difficulty = 6 + (seedNum % 3);
    } else if (genre === 'sci-fi' || genre === 'animation' || genre === 'action') {
      // 4 to 6
      difficulty = 4 + (seedNum % 3);
    } else {
      // 4 to 7
      difficulty = 4 + (seedNum % 4);
    }

    // Specific well-known titles fine-tuning
    if (/avengers: endgame|titanic|the dark knight|spider-man: no way home|jurassic park|the lion king/i.test(title)) {
      difficulty = 3;
    } else if (/stalker|seven samurai|persona|bicycle thieves|the 400 blows/i.test(title)) {
      difficulty = 10;
    } else if (/oppenheimer|dune|barbie|interstellar|the batman|top gun: maverick/i.test(title)) {
      difficulty = 5;
    }

    // 6. Quality & Discovery Scores
    const qualityScore = 80 + ((title.length * 7) % 18); // 80 - 98
    let discoveryValue = 50;
    if (region === 'international' || difficulty >= 7) {
      discoveryValue = 85 + (numYear % 15); // High discovery value for arthouse & vintage
    } else if (franchise !== 'none') {
      discoveryValue = 35 + (numYear % 20); // Well-known franchises have lower discovery, higher comfort
    }

    // 7. Perceptual Fingerprint
    const perceptualHash = PerceptualHash.generateFingerprint(`${cleanTitle}_${raw.content}`);

    return {
      frameId: raw.id,
      movieId,
      movieTitle: title,
      contentUrl: raw.content,
      category: raw.category,
      type: raw.type,
      year: numYear,
      franchise,
      region,
      genre,
      leadActor,
      difficulty,
      qualityScore,
      discoveryValue,
      perceptualHash,
      tag: raw.tag,
      aliases: raw.aliases,
      dialogue: raw.dialogue,
      revealContent: raw.revealContent
    };
  }
}
