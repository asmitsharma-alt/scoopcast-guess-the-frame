import json
import os

dialogues_data = [
    # Sholay (1975) - IMDb: 8.1
    {
        "dialogue": "Kitne aadmi the?",
        "english": "How many men were there?",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amjad Khan",
        "character": "Gabbar Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Yeh haath humko de de Thakur!",
        "english": "Give these hands to me, Thakur!",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amjad Khan",
        "character": "Gabbar Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Jo darr gaya, samjho marr gaya.",
        "english": "He who gets scared, consider him dead.",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amjad Khan",
        "character": "Gabbar Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Basanti, in kutton ke samne mat nachna!",
        "english": "Basanti, do not dance in front of these dogs!",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Dharmendra",
        "character": "Veeru",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Tumhara naam kya hai, Basanti?",
        "english": "What is your name, Basanti?",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amitabh Bachchan",
        "character": "Jai",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Yahan se pachaas pachaas kos door gaon mein, jab bachha raat ko rota hai, toh maa kehti hai beta soja, nahi toh Gabbar aa jayega.",
        "english": "In villages fifty miles from here, when a child cries at night, the mother says sleep child, or Gabbar will arrive.",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amjad Khan",
        "character": "Gabbar Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Hum angrezon ke zamane ke jailor hain, ha ha!",
        "english": "I am a jailor from the British era, ha ha!",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Asrani",
        "character": "Jailor",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },
    {
        "dialogue": "Arre o Sambha, kitna inaam rakhe hain sarkar hum par?",
        "english": "Hey Sambha, how much bounty has the government placed on me?",
        "movie": "Sholay",
        "year": 1975,
        "actor": "Amjad Khan",
        "character": "Gabbar Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure",
        "tag": "classic"
    },

    # Deewaar (1975) - IMDb: 8.0
    {
        "dialogue": "Mere paas maa hai!",
        "english": "I have mother with me!",
        "movie": "Deewaar",
        "year": 1975,
        "actor": "Shashi Kapoor",
        "character": "Ravi Verma",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Aaj mere paas building hai, property hai, bank balance hai, bangla hai, gaadi hai... tumhare paas kya hai?",
        "english": "Today I have buildings, property, bank balance, a mansion, cars... what do you have?",
        "movie": "Deewaar",
        "year": 1975,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Verma",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Main aaj bhi phenke hue paise nahi uthata.",
        "english": "Even today, I don't pick up money that is thrown at me.",
        "movie": "Deewaar",
        "year": 1975,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Verma",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Uff tumhare usool, tumhare aadarsh! Kis kaam ke hain yeh usool?",
        "english": "Oh your principles, your ideals! What good are these principles?",
        "movie": "Deewaar",
        "year": 1975,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Verma",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Jao pehle us aadmi ka sign le kar aao jisne mere baap ko chor kaha tha.",
        "english": "Go first and bring the signature of that man who called my father a thief.",
        "movie": "Deewaar",
        "year": 1975,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Verma",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Anand (1971) - IMDb: 8.2
    {
        "dialogue": "Babumoshai, zindagi badi honi chahiye, lambi nahi.",
        "english": "Babumoshai, life should be grand, not long.",
        "movie": "Anand",
        "year": 1971,
        "actor": "Rajesh Khanna",
        "character": "Anand Saigal",
        "imdb_rating": 8.2,
        "genre": "Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Maut toh ek pal hai... babumoshai, maut aur zindagi toh upar wale ke haath mein hai.",
        "english": "Death is just a moment... life and death are in the hands of the Almighty above.",
        "movie": "Anand",
        "year": 1971,
        "actor": "Rajesh Khanna",
        "character": "Anand Saigal",
        "imdb_rating": 8.2,
        "genre": "Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Hum sab rangmanch ki kathputliyan hain jinki dor upar wale ke haath mein hai.",
        "english": "We are all puppets on a stage whose strings are pulled by the One above.",
        "movie": "Anand",
        "year": 1971,
        "actor": "Rajesh Khanna",
        "character": "Anand Saigal",
        "imdb_rating": 8.2,
        "genre": "Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Anand mara nahi, Anand marte nahi.",
        "english": "Anand didn't die, people like Anand never die.",
        "movie": "Anand",
        "year": 1971,
        "actor": "Amitabh Bachchan",
        "character": "Dr. Bhaskar Banerjee",
        "imdb_rating": 8.2,
        "genre": "Drama / Musical",
        "tag": "classic"
    },

    # 3 Idiots (2009) - IMDb: 8.4
    {
        "dialogue": "All is well!",
        "english": "All is well!",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "Aamir Khan",
        "character": "Rancho",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Kamyab hone ke liye nahi, kabil hone ke liye padho. Success ke peeche mat bhago, excellence ka peecha karo, success jhak maarke peeche aayegi.",
        "english": "Study not to be successful, but to be capable. Pursue excellence, and success will inevitably chase you.",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "Aamir Khan",
        "character": "Rancho",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Dost fail ho jaye toh dukh hota hai, lekin dost first aa jaye toh zyada dukh hota hai.",
        "english": "If a friend fails, you feel bad. But if a friend comes first, you feel even worse.",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "R. Madhavan",
        "character": "Farhan Qureshi",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Life is a race... if you don't run fast, you will be like a broken egg.",
        "english": "Life is a race... if you don't run fast, you will be crushed like a broken egg.",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "Boman Irani",
        "character": "Virus (Viru Sahastrabuddhe)",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Arey kehna kya chahte ho?",
        "english": "What exactly are you trying to say?",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "Aamir Khan",
        "character": "Rancho",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Jahanpanah tussi great ho, tohfa kabool karo!",
        "english": "Your majesty, you are great, please accept our tribute!",
        "movie": "3 Idiots",
        "year": 2009,
        "actor": "Sharman Joshi & R. Madhavan",
        "character": "Raju & Farhan",
        "imdb_rating": 8.4,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Dilwale Dulhania Le Jayenge (1995) - IMDb: 8.0
    {
        "dialogue": "Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita.",
        "english": "In big countries, such small things keep happening, Senorita.",
        "movie": "Dilwale Dulhania Le Jayenge",
        "year": 1995,
        "actor": "Shah Rukh Khan",
        "character": "Raj Malhotra",
        "imdb_rating": 8.0,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Jaa Simran jaa, jee le apni zindagi.",
        "english": "Go Simran, go live your life.",
        "movie": "Dilwale Dulhania Le Jayenge",
        "year": 1995,
        "actor": "Amrish Puri",
        "character": "Chaudhry Baldev Singh",
        "imdb_rating": 8.0,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Agar yeh tujhe pyaar karti hai toh yeh palat ke dekhegi... Palat... Palat... Palat!",
        "english": "If she loves you, she will turn back and look... Turn... Turn... Turn!",
        "movie": "Dilwale Dulhania Le Jayenge",
        "year": 1995,
        "actor": "Shah Rukh Khan",
        "character": "Raj Malhotra",
        "imdb_rating": 8.0,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Koi bhi sapna poora hone se pehle sach nahi lagta.",
        "english": "No dream feels real until it comes true.",
        "movie": "Dilwale Dulhania Le Jayenge",
        "year": 1995,
        "actor": "Shah Rukh Khan",
        "character": "Raj Malhotra",
        "imdb_rating": 8.0,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Gangs of Wasseypur (2012) - IMDb: 8.2
    {
        "dialogue": "Baap ka, dada ka, bhai ka... sabka badla lega re tera Faizal!",
        "english": "Father's, grandfather's, brother's... your Faizal will avenge everyone!",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Nawazuddin Siddiqui",
        "character": "Faizal Khan",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Beta, tumse na ho payega.",
        "english": "Son, you won't be able to pull this off.",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Tigmanshu Dhulia",
        "character": "Ramadhir Singh",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hindustan mein jab tak cinema hai, log ch***ya bante rahenge.",
        "english": "As long as there is cinema in India, people will continue to be fooled.",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Tigmanshu Dhulia",
        "character": "Ramadhir Singh",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hazrat hazrat hazrat... Khan saab ka pehla qatl!",
        "english": "Ladies and gentlemen... Khan saab's first murder!",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Piyush Mishra",
        "character": "Nasir",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Yahan har koi hero banna chahta hai apni picture ka.",
        "english": "Everyone here wants to be the hero of their own movie.",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Manoj Bajpayee",
        "character": "Sardar Khan",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Teri keh ke lunga!",
        "english": "I will openly take my revenge and announce it beforehand!",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Manoj Bajpayee",
        "character": "Sardar Khan",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Andaz Apna Apna (1994) - IMDb: 8.0
    {
        "dialogue": "Aap purush hi nahi, mahapurush hain!",
        "english": "You are not just a man, you are a great soul!",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Aamir Khan",
        "character": "Amar Manohar",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Crime Master Gogo naam hai mera, aankhen nikaal kar gotiyan khelta hoon!",
        "english": "Crime Master Gogo is my name, I pluck out eyeballs and play marbles with them!",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Shakti Kapoor",
        "character": "Crime Master Gogo",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Teja main hoon, mark idhar hai.",
        "english": "I am Teja, the mark is right here.",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Paresh Rawal",
        "character": "Teja / Shyam Gopal Bajaj",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Aaya hoon, kuch toh loot kar jaunga... khandani chor hoon main!",
        "english": "I have come, I won't leave empty-handed... I am an ancestral thief!",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Shakti Kapoor",
        "character": "Crime Master Gogo",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Galti se mistake ho gaya.",
        "english": "A mistake happened by error.",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Aamir Khan & Salman Khan",
        "character": "Amar & Prem",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Do dost ek pyaali mein chai piyenge, isse dosti badhti hai.",
        "english": "Two friends drinking tea from the same cup, that deepens friendship.",
        "movie": "Andaz Apna Apna",
        "year": 1994,
        "actor": "Aamir Khan",
        "character": "Amar Manohar",
        "imdb_rating": 8.0,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },

    # Don (1978 & 2006) - IMDb: 7.7 / 7.2
    {
        "dialogue": "Don ko pakadna mushkil hi nahi, namumkin hai.",
        "english": "Catching Don is not just difficult, it is impossible.",
        "movie": "Don",
        "year": 1978,
        "actor": "Amitabh Bachchan",
        "character": "Don",
        "imdb_rating": 7.7,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Don ke dushman ki sabse badi galti yeh hai ki woh Don ka dushman hai.",
        "english": "The biggest mistake of Don's enemy is that he is Don's enemy.",
        "movie": "Don",
        "year": 2006,
        "actor": "Shah Rukh Khan",
        "character": "Don",
        "imdb_rating": 7.2,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Don apne doston ka haal jaane ya na jaane, apne dushmano ki khabar zaroor rakhta hai.",
        "english": "Whether Don knows how his friends are doing or not, he always keeps track of his enemies.",
        "movie": "Don",
        "year": 2006,
        "actor": "Shah Rukh Khan",
        "character": "Don",
        "imdb_rating": 7.2,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Mujhe jungli billiyan bahut pasand hain.",
        "english": "I really like wild cats.",
        "movie": "Don",
        "year": 2006,
        "actor": "Shah Rukh Khan",
        "character": "Don",
        "imdb_rating": 7.2,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Hera Pheri (2000) & Phir Hera Pheri (2006) - IMDb: 8.2 / 7.2
    {
        "dialogue": "Yeh Baburao ka style hai!",
        "english": "This is Baburao's style!",
        "movie": "Hera Pheri",
        "year": 2000,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 8.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Khopdi tod, khopdi tod saale ka!",
        "english": "Break his skull, smash this fellow's skull!",
        "movie": "Hera Pheri",
        "year": 2000,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 8.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Utha le re baba, utha le... mereko nahi re, in dono ko utha le!",
        "english": "Take them away Lord, take them away... not me, take these two away!",
        "movie": "Hera Pheri",
        "year": 2000,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 8.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Kutreya... main Baburao bol raha hoon!",
        "english": "You dog... this is Baburao speaking!",
        "movie": "Hera Pheri",
        "year": 2000,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 8.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Golmaal hai bhai sab golmaal hai.",
        "english": "Everything is fishy here, brother.",
        "movie": "Hera Pheri",
        "year": 2000,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 8.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "21 din mein paisa double!",
        "english": "Double your money in 21 days!",
        "movie": "Phir Hera Pheri",
        "year": 2006,
        "actor": "Akshay Kumar",
        "character": "Raju",
        "imdb_rating": 7.2,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Zor zor se bolke logon ko scheme bata de!",
        "english": "Shout loudly and leak the scheme to everyone!",
        "movie": "Phir Hera Pheri",
        "year": 2006,
        "actor": "Akshay Kumar",
        "character": "Raju",
        "imdb_rating": 7.2,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Dene ka re baba, isko dene ka.",
        "english": "Give it to him brother, give it to him.",
        "movie": "Phir Hera Pheri",
        "year": 2006,
        "actor": "Paresh Rawal",
        "character": "Baburao Ganpatrao Apte",
        "imdb_rating": 7.2,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },

    # Munna Bhai M.B.B.S. (2003) & Lage Raho Munna Bhai (2006) - IMDb: 8.1 / 8.0
    {
        "dialogue": "Jaadu ki jhappi!",
        "english": "A magical hug!",
        "movie": "Munna Bhai M.B.B.S.",
        "year": 2003,
        "actor": "Sanjay Dutt",
        "character": "Munna Bhai",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Carrom ramwanu, juice peewanu, majja ni life!",
        "english": "Play carrom, drink juice, enjoy life to the fullest!",
        "movie": "Munna Bhai M.B.B.S.",
        "year": 2003,
        "actor": "Boman Irani & Kurush Deboo",
        "character": "Dr. Asthana & Dr. Rustam",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Bole toh ekdum rapchik!",
        "english": "In other words, completely stunning!",
        "movie": "Munna Bhai M.B.B.S.",
        "year": 2003,
        "actor": "Arshad Warsi",
        "character": "Circuit",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Tension lene ka nahi, sirf dene ka!",
        "english": "Never take stress, only give stress!",
        "movie": "Munna Bhai M.B.B.S.",
        "year": 2003,
        "actor": "Sanjay Dutt",
        "character": "Munna Bhai",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Desh toh apna aazad ho gaya par hum aaj bhi aazad nahi hain.",
        "english": "Our country gained freedom, yet we are still not truly free.",
        "movie": "Lage Raho Munna Bhai",
        "year": 2006,
        "actor": "Sanjay Dutt",
        "character": "Munna Bhai",
        "imdb_rating": 8.0,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Mughal-e-Azam (1960) - IMDb: 8.1
    {
        "dialogue": "Salim tujhe marne nahi dega, aur hum Anarkali tujhe jeene nahi denge.",
        "english": "Salim will not let you die, and I, Anarkali, will not let you live.",
        "movie": "Mughal-e-Azam",
        "year": 1960,
        "actor": "Prithviraj Kapoor",
        "character": "Emperor Akbar",
        "imdb_rating": 8.1,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "Taqdeerein badal jaati hain, zamana badal jaata hai, mulkon ki tarikh badal jaati hai... magar mohabbat jis insaan ka daaman thaam leti hai, woh insaan nahi badalta.",
        "english": "Destinies change, eras change, the histories of nations change... but the person held by true love never changes.",
        "movie": "Mughal-e-Azam",
        "year": 1960,
        "actor": "Dilip Kumar",
        "character": "Prince Salim",
        "imdb_rating": 8.1,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "Kanton ko murjhane ka khauf nahi hota.",
        "english": "Thorns do not fear withering away.",
        "movie": "Mughal-e-Azam",
        "year": 1960,
        "actor": "Madhubala",
        "character": "Anarkali",
        "imdb_rating": 8.1,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },

    # Mr. India (1987) - IMDb: 7.7
    {
        "dialogue": "Mogambo khush hua!",
        "english": "Mogambo is pleased!",
        "movie": "Mr. India",
        "year": 1987,
        "actor": "Amrish Puri",
        "character": "Mogambo",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Mogambo ki dushmani aur dosti dono buri hoti hain.",
        "english": "Both Mogambo's friendship and enmity are deadly.",
        "movie": "Mr. India",
        "year": 1987,
        "actor": "Amrish Puri",
        "character": "Mogambo",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Shahenshah (1988) - IMDb: 6.4
    {
        "dialogue": "Rishte mein toh hum tumhare baap lagte hain, naam hai Shahenshah.",
        "english": "In terms of relations, I am your father, my name is Shahenshah.",
        "movie": "Shahenshah",
        "year": 1988,
        "actor": "Amitabh Bachchan",
        "character": "Inspector Vijay Kumar Srivastava / Shahenshah",
        "imdb_rating": 6.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Kaalia (1981) - IMDb: 7.0
    {
        "dialogue": "Hum jahan khade ho jaate hain, line wahin se shuru hoti hai.",
        "english": "Where I stand, the queue starts from there.",
        "movie": "Kaalia",
        "year": 1981,
        "actor": "Amitabh Bachchan",
        "character": "Kallu / Kaalia",
        "imdb_rating": 7.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Agneepath (1990 & 2012) - IMDb: 7.6 / 6.9
    {
        "dialogue": "Vijay Dinanath Chauhan, poora naam. Baap ka naam Dinanath Chauhan, maa ka naam Suhasini Chauhan. Gaon Mandwa.",
        "english": "Vijay Dinanath Chauhan, full name. Father's name Dinanath Chauhan, mother's name Suhasini Chauhan. Village Mandwa.",
        "movie": "Agneepath",
        "year": 1990,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Deenanath Chauhan",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hawa tez chalti hai Dinkar Rao, toh topi ud jaati hai!",
        "english": "When the wind blows fiercely Dinkar Rao, hats fly off!",
        "movie": "Agneepath",
        "year": 1990,
        "actor": "Amitabh Bachchan",
        "character": "Vijay Deenanath Chauhan",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Tum kya leke aaye the, aur kya leke jaoge?",
        "english": "What did you bring into this world, and what will you take with you?",
        "movie": "Agneepath",
        "year": 2012,
        "actor": "Sanjay Dutt",
        "character": "Kancha Cheena",
        "imdb_rating": 6.9,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Zindagi Na Milegi Dobara (2011) - IMDb: 8.2
    {
        "dialogue": "Insaan ko dibbe mein sirf tab hona chahiye jab woh mar chuka ho.",
        "english": "A person should only be boxed inside a container when they are dead.",
        "movie": "Zindagi Na Milegi Dobara",
        "year": 2011,
        "actor": "Katrina Kaif",
        "character": "Laila",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Seize the day my friend, pehle is din ko poori tarah jiyo, phir 40 ke baare mein sochna.",
        "english": "Seize the day my friend, live today completely first before worrying about turning forty.",
        "movie": "Zindagi Na Milegi Dobara",
        "year": 2011,
        "actor": "Katrina Kaif",
        "character": "Laila",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Dilon mein tum apni betabiyan leke chal rahe ho toh zinda ho tum.",
        "english": "If you carry unrestrained passions in your heart, then you are alive.",
        "movie": "Zindagi Na Milegi Dobara",
        "year": 2011,
        "actor": "Farhan Akhtar",
        "character": "Imran Qureshi",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Mujhe afsos karna nahi aata.",
        "english": "I don't know how to live in regret.",
        "movie": "Zindagi Na Milegi Dobara",
        "year": 2011,
        "actor": "Katrina Kaif",
        "character": "Laila",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Dangal (2016) - IMDb: 8.3
    {
        "dialogue": "Mhari chhoriyan chhoron se kam hain ke?",
        "english": "Are my girls any less than boys?",
        "movie": "Dangal",
        "year": 2016,
        "actor": "Aamir Khan",
        "character": "Mahavir Singh Phogat",
        "imdb_rating": 8.3,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Medal ped pe nahi ugte, unhe banana padta hai... pyaar se, mehnat se, lagan se.",
        "english": "Medals don't grow on trees, they have to be nurtured... with love, effort, and dedication.",
        "movie": "Dangal",
        "year": 2016,
        "actor": "Aamir Khan",
        "character": "Mahavir Singh Phogat",
        "imdb_rating": 8.3,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Silver jeeti toh aaj nahi toh kal log tanne bhool javenge... Gold jeeti toh misaal ban javegi.",
        "english": "If you win silver, people will forget you sooner or later... if you win gold, you will become a legend.",
        "movie": "Dangal",
        "year": 2016,
        "actor": "Aamir Khan",
        "character": "Mahavir Singh Phogat",
        "imdb_rating": 8.3,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },

    # Om Shanti Om (2007) - IMDb: 6.8
    {
        "dialogue": "Kehte hain agar kisi cheez ko dil se chaho, toh poori kainath usse tumse milane ki koshish mein lag jaati hai.",
        "english": "They say that if you truly desire something from the heart, the entire universe conspires to bring it to you.",
        "movie": "Om Shanti Om",
        "year": 2007,
        "actor": "Shah Rukh Khan",
        "character": "Om Prakash Makhija",
        "imdb_rating": 6.8,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hamari filmon ki tarah, hamari zindagi mein bhi end mein sab theek ho hi jaata hai... Happys Ending. Aur agar theek na ho, toh picture abhi baaki hai mere dost!",
        "english": "Just like in our movies, in real life too everything turns out fine in the end... Happy Ending. And if it's not fine, then the movie isn't over yet my friend!",
        "movie": "Om Shanti Om",
        "year": 2007,
        "actor": "Shah Rukh Khan",
        "character": "Om Prakash Makhija",
        "imdb_rating": 6.8,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Ek chutki sindoor ki keemat tum kya jaano Ramesh babu!",
        "english": "What would you know of the value of a pinch of vermilion, Ramesh babu!",
        "movie": "Om Shanti Om",
        "year": 2007,
        "actor": "Deepika Padukone",
        "character": "Shantipriya",
        "imdb_rating": 6.8,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },

    # Yeh Jawaani Hai Deewani (2013) - IMDb: 7.3
    {
        "dialogue": "Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon... bas rukna nahi chahta.",
        "english": "I want to fly, I want to run, I even want to fall... I just never want to stop.",
        "movie": "Yeh Jawaani Hai Deewani",
        "year": 2013,
        "actor": "Ranbir Kapoor",
        "character": "Kabir 'Bunny' Thapar",
        "imdb_rating": 7.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Kahin pahunchne ke liye, kahin se nikalna bahut zaroori hota hai.",
        "english": "To reach somewhere, it is very important to leave from somewhere first.",
        "movie": "Yeh Jawaani Hai Deewani",
        "year": 2013,
        "actor": "Ranbir Kapoor",
        "character": "Kabir 'Bunny' Thapar",
        "imdb_rating": 7.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Tum pehle bhi itni khoobsurat thi ya waqt ne kiya koi haseen sitam?",
        "english": "Were you always this beautiful, or has time performed a wondrous enchantment?",
        "movie": "Yeh Jawaani Hai Deewani",
        "year": 2013,
        "actor": "Ranbir Kapoor",
        "character": "Kabir 'Bunny' Thapar",
        "imdb_rating": 7.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Jitna bhi try karo Bunny, life mein kuch na kuch toh chhootega hi. Toh jahan hain, wahin ka maza lete hain na!",
        "english": "No matter how hard you try Bunny, you'll always miss out on something in life. So let's just enjoy where we are right now!",
        "movie": "Yeh Jawaani Hai Deewani",
        "year": 2013,
        "actor": "Deepika Padukone",
        "character": "Naina Talwar",
        "imdb_rating": 7.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Baazigar (1993) - IMDb: 7.6
    {
        "dialogue": "Kabhi kabhi jeetne ke liye kuch haarna bhi padta hai, aur haar kar jeetne wale ko Baazigar kehte hain.",
        "english": "Sometimes to win, you have to lose something, and the one who wins after losing is called a Baazigar (gambler).",
        "movie": "Baazigar",
        "year": 1993,
        "actor": "Shah Rukh Khan",
        "character": "Ajay Sharma / Vicky Malhotra",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Darr (1993) - IMDb: 7.6
    {
        "dialogue": "I love you, K-K-K-Kiran!",
        "english": "I love you, K-K-K-Kiran!",
        "movie": "Darr",
        "year": 1993,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Mehra",
        "imdb_rating": 7.6,
        "genre": "Drama / Romance / Thriller",
        "tag": "classic"
    },

    # Dil Chahta Hai (2001) - IMDb: 8.1
    {
        "dialogue": "Hum dost the, hain, aur hamesha rahenge.",
        "english": "We were friends, we are friends, and we will remain friends forever.",
        "movie": "Dil Chahta Hai",
        "year": 2001,
        "actor": "Aamir Khan",
        "character": "Akash Malhotra",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Ya toh dosti gehri hai, ya yeh photo 3D hai.",
        "english": "Either the friendship is deep, or this photo is in 3D.",
        "movie": "Dil Chahta Hai",
        "year": 2001,
        "actor": "Saif Ali Khan",
        "character": "Sameer",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Swades (2004) - IMDb: 8.2
    {
        "dialogue": "Main nahi manta hamara desh duniya ka sabse mahan desh hai... lekin yeh zaroor manta hoon ki hum mein kabiliyat hai, taqat hai, isse mahan banane ki.",
        "english": "I don't believe our country is the greatest in the world... but I strongly believe we have the capability and strength to make it great.",
        "movie": "Swades",
        "year": 2004,
        "actor": "Shah Rukh Khan",
        "character": "Mohan Bhargava",
        "imdb_rating": 8.2,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Apne hi paani mein pighal jaana barf ka muqaddar hota hai.",
        "english": "To melt in its own water is the destiny of ice.",
        "movie": "Swades",
        "year": 2004,
        "actor": "Shah Rukh Khan",
        "character": "Mohan Bhargava",
        "imdb_rating": 8.2,
        "genre": "Drama",
        "tag": "classic"
    },

    # Chak De! India (2007) - IMDb: 8.1
    {
        "dialogue": "Sattar minute, sattar minute hai tumhare paas... shayad tumhari zindagi ke sabse khaas sattar minute.",
        "english": "Seventy minutes, you have seventy minutes... perhaps the most precious seventy minutes of your entire life.",
        "movie": "Chak De! India",
        "year": 2007,
        "actor": "Shah Rukh Khan",
        "character": "Kabir Khan",
        "imdb_rating": 8.1,
        "genre": "Drama / Sport",
        "tag": "classic"
    },
    {
        "dialogue": "Mujhe states ke naam na sunai dete hain na dikhai dete hain... sirf ek mulk ka naam sunai deta hai: INDIA!",
        "english": "I neither hear nor see state names... I only hear one nation's name: INDIA!",
        "movie": "Chak De! India",
        "year": 2007,
        "actor": "Shah Rukh Khan",
        "character": "Kabir Khan",
        "imdb_rating": 8.1,
        "genre": "Drama / Sport",
        "tag": "classic"
    },

    # Lagaan (2001) - IMDb: 8.1
    {
        "dialogue": "Sharat manjoor hai!",
        "english": "The bet is accepted!",
        "movie": "Lagaan",
        "year": 2001,
        "actor": "Aamir Khan",
        "character": "Bhuvan",
        "imdb_rating": 8.1,
        "genre": "Adventure / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Sach aur sahas hai jiske mann mein, ant mein jeet usi ki hogi.",
        "english": "Whoever has truth and courage in their heart will ultimately triumph in the end.",
        "movie": "Lagaan",
        "year": 2001,
        "actor": "Aamir Khan",
        "character": "Bhuvan",
        "imdb_rating": 8.1,
        "genre": "Adventure / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Teen guna lagaan dena padega!",
        "english": "You will have to pay triple the land tax!",
        "movie": "Lagaan",
        "year": 2001,
        "actor": "Paul Blackthorne",
        "character": "Captain Andrew Russell",
        "imdb_rating": 8.1,
        "genre": "Adventure / Drama / Musical",
        "tag": "classic"
    },

    # Dabangg (2010) - IMDb: 6.2
    {
        "dialogue": "Thappad se darr nahi lagta sahab, pyaar se lagta hai.",
        "english": "I'm not afraid of slaps sir, I'm afraid of love.",
        "movie": "Dabangg",
        "year": 2010,
        "actor": "Sonakshi Sinha",
        "character": "Rajjo",
        "imdb_rating": 6.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Hum yahan ke Robinhood hain... Robinhood Pandey!",
        "english": "I am the Robinhood of this place... Robinhood Pandey!",
        "movie": "Dabangg",
        "year": 2010,
        "actor": "Salman Khan",
        "character": "Chulbul Pandey",
        "imdb_rating": 6.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Hum tum mein itne chhed karenge ki confuse ho jaoge ki saans kahan se lein aur...",
        "english": "I will put so many holes in you that you'll be confused where to breathe from and...",
        "movie": "Dabangg",
        "year": 2010,
        "actor": "Salman Khan",
        "character": "Chulbul Pandey",
        "imdb_rating": 6.2,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },

    # Wanted (2009) - IMDb: 6.6
    {
        "dialogue": "Ek baar jo maine commitment kar di, uske baad toh main khud ki bhi nahi sunta.",
        "english": "Once I make a commitment, after that I don't even listen to myself.",
        "movie": "Wanted",
        "year": 2009,
        "actor": "Salman Khan",
        "character": "Radhe",
        "imdb_rating": 6.6,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Singham (2011) - IMDb: 6.8
    {
        "dialogue": "Aata maajhi satakli!",
        "english": "Now I have lost my temper!",
        "movie": "Singham",
        "year": 2011,
        "actor": "Ajay Devgn",
        "character": "Bajirao Singham",
        "imdb_rating": 6.8,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Jisme hai dum, toh fakht Bajirao Singham!",
        "english": "If anyone has true courage, it is only Bajirao Singham!",
        "movie": "Singham",
        "year": 2011,
        "actor": "Ajay Devgn",
        "character": "Bajirao Singham",
        "imdb_rating": 6.8,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Damini (1993) - IMDb: 7.7
    {
        "dialogue": "Tareekh pe tareekh, tareekh pe tareekh milti rahi hai janab, lekin insaaf nahi mila!",
        "english": "Date after date, court date after court date we received my lord, but never justice!",
        "movie": "Damini",
        "year": 1993,
        "actor": "Sunny Deol",
        "character": "Govind Srivastav",
        "imdb_rating": 7.7,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Yeh dhaai kilo ka haath jab kisi pe padta hai na, toh aadmi uthta nahi, uth jaata hai!",
        "english": "When this two-and-a-half kilo hand strikes someone, they don't get up, they ascend to heaven!",
        "movie": "Damini",
        "year": 1993,
        "actor": "Sunny Deol",
        "character": "Govind Srivastav",
        "imdb_rating": 7.7,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Ghatak (1996) - IMDb: 7.5
    {
        "dialogue": "Yeh majdoor ka haath hai Katya, loha pighlakar uska aakaar badal deta hai!",
        "english": "This is a laborer's hand Katya, it melts iron and alters its shape!",
        "movie": "Ghatak",
        "year": 1996,
        "actor": "Sunny Deol",
        "character": "Kashi Nath",
        "imdb_rating": 7.5,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Gadar: Ek Prem Katha (2001) - IMDb: 7.3
    {
        "dialogue": "Hamara Hindustan zindabad tha, zindabad hai, aur zindabad rahega!",
        "english": "Our India was victorious, is victorious, and will remain victorious forever!",
        "movie": "Gadar: Ek Prem Katha",
        "year": 2001,
        "actor": "Sunny Deol",
        "character": "Tara Singh",
        "imdb_rating": 7.3,
        "genre": "Action / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Barsaat se bachne ki haisiyat nahi aur goli barsaane ki baat kar rahe hain aap log.",
        "english": "You don't even have the shelter to escape the rain, and you talk about raining bullets.",
        "movie": "Gadar: Ek Prem Katha",
        "year": 2001,
        "actor": "Sunny Deol",
        "character": "Tara Singh",
        "imdb_rating": 7.3,
        "genre": "Action / Drama / Romance",
        "tag": "classic"
    },

    # Taare Zameen Par (2007) - IMDb: 8.3
    {
        "dialogue": "Har bachhe ki apni ek khoobi hoti hai, apni ek kabiliyat hoti hai, apni ek alag shakti hoti hai.",
        "english": "Every child has their own special quality, their own talent, their own unique inner strength.",
        "movie": "Taare Zameen Par",
        "year": 2007,
        "actor": "Aamir Khan",
        "character": "Ram Shankar Nikumbh",
        "imdb_rating": 8.3,
        "genre": "Drama / Family",
        "tag": "classic"
    },
    {
        "dialogue": "Duniya mein aisi aisi hire paida huye hain, jinhone saari duniya ka naqsha hi badal diya.",
        "english": "Diamonds have been born in this world who ended up changing the entire map of human understanding.",
        "movie": "Taare Zameen Par",
        "year": 2007,
        "actor": "Aamir Khan",
        "character": "Ram Shankar Nikumbh",
        "imdb_rating": 8.3,
        "genre": "Drama / Family",
        "tag": "classic"
    },

    # PK (2014) - IMDb: 8.1
    {
        "dialogue": "Lul ho gayi hamri life!",
        "english": "Our life turned completely upside down!",
        "movie": "PK",
        "year": 2014,
        "actor": "Aamir Khan",
        "character": "PK",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Wrong number hai!",
        "english": "That is a wrong number!",
        "movie": "PK",
        "year": 2014,
        "actor": "Aamir Khan",
        "character": "PK",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Kaun bhagwan ko maane hum? Jo sabko banaya, ya jisko tum log banaye ho?",
        "english": "Which God should I believe in? The One who created everyone, or the one that you people fabricated?",
        "movie": "PK",
        "year": 2014,
        "actor": "Aamir Khan",
        "character": "PK",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Sci-Fi",
        "tag": "classic"
    },

    # Queen (2013) - IMDb: 8.1
    {
        "dialogue": "Mera haal na Gupta uncle jaisa ho gaya hai... Gupta uncle ko na cancer ho gaya tha, unhone kabhi bidi nahi pee thi!",
        "english": "My state is just like Gupta uncle... Gupta uncle got cancer even though he never smoked a single bidi!",
        "movie": "Queen",
        "year": 2013,
        "actor": "Kangana Ranaut",
        "character": "Rani Mehra",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Indian ladkiyan burp nahi karti, seedha dakaar leti hain!",
        "english": "Indian girls don't burp delicately, they let out full hearty belches!",
        "movie": "Queen",
        "year": 2013,
        "actor": "Kangana Ranaut",
        "character": "Rani Mehra",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Piku (2015) - IMDb: 7.6
    {
        "dialogue": "Motion se hi toh emotion juda hai.",
        "english": "Emotion is intimately tied to bowel motion.",
        "movie": "Piku",
        "year": 2015,
        "actor": "Amitabh Bachchan",
        "character": "Bhashkor Banerjee",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Death aur shith... yeh do cheezein kisi ko, kahin bhi, kabhi bhi aa sakti hain.",
        "english": "Death and shit... these two can visit anyone, anywhere, anytime.",
        "movie": "Piku",
        "year": 2015,
        "actor": "Amitabh Bachchan",
        "character": "Bhashkor Banerjee",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Gangubai Kathiawadi (2022) - IMDb: 7.8
    {
        "dialogue": "Gangu chaand thi aur chaand hi rahegi.",
        "english": "Gangu was the moon, and the moon she shall remain.",
        "movie": "Gangubai Kathiawadi",
        "year": 2022,
        "actor": "Alia Bhatt",
        "character": "Gangubai Kathiawadi",
        "imdb_rating": 7.8,
        "genre": "Biography / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Izzat se jeene ka, kisi se darne ka nahi... na police se, na neta se, na mantri se, na kisi ke baap se!",
        "english": "Live with dignity and fear nobody... not the police, not politicians, not ministers, nor anyone's father!",
        "movie": "Gangubai Kathiawadi",
        "year": 2022,
        "actor": "Alia Bhatt",
        "character": "Gangubai Kathiawadi",
        "imdb_rating": 7.8,
        "genre": "Biography / Crime / Drama",
        "tag": "modern"
    },

    # Stree (2018) - IMDb: 7.5
    {
        "dialogue": "O Stree kal aana!",
        "english": "O Stree, come tomorrow!",
        "movie": "Stree",
        "year": 2018,
        "actor": "Rajkummar Rao",
        "character": "Vicky",
        "imdb_rating": 7.5,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },
    {
        "dialogue": "Woh stree hai, woh kuch bhi kar sakti hai!",
        "english": "She is a woman, she is capable of anything!",
        "movie": "Stree",
        "year": 2018,
        "actor": "Pankaj Tripathi",
        "character": "Rudra",
        "imdb_rating": 7.5,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },

    # Kahaani (2012) - IMDb: 8.1
    {
        "dialogue": "Nomoshkar! Ek minute...",
        "english": "Greetings! Just one minute...",
        "movie": "Kahaani",
        "year": 2012,
        "actor": "Saswata Chatterjee",
        "character": "Bob Biswas",
        "imdb_rating": 8.1,
        "genre": "Mystery / Thriller",
        "tag": "classic"
    },

    # Barfi! (2012) - IMDb: 8.1
    {
        "dialogue": "Life mein sabse bada risk hota hai... kabhi koi risk na lena.",
        "english": "The biggest risk in life is to never take any risk at all.",
        "movie": "Barfi!",
        "year": 2012,
        "actor": "Ranbir Kapoor",
        "character": "Murphy 'Barfi' Johnson",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Black (2005) - IMDb: 8.1
    {
        "dialogue": "Life is an ice cream, enjoy it before it melts.",
        "english": "Life is an ice cream, enjoy it before it melts.",
        "movie": "Black",
        "year": 2005,
        "actor": "Amitabh Bachchan",
        "character": "Debraj Sahai",
        "imdb_rating": 8.1,
        "genre": "Drama",
        "tag": "classic"
    },

    # Haider (2014) - IMDb: 8.0
    {
        "dialogue": "Hum hain ki hum nahi?",
        "english": "To be or not to be?",
        "movie": "Haider",
        "year": 2014,
        "actor": "Shahid Kapoor",
        "character": "Haider Meer",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Inteqaam se sirf inteqaam paida hota hai.",
        "english": "Revenge only breeds more revenge.",
        "movie": "Haider",
        "year": 2014,
        "actor": "Tabu",
        "character": "Ghazala Meer",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Talvar (2015) - IMDb: 8.1
    {
        "dialogue": "Insaaf andha hota hai par aakhein sabki khuli rehti hain.",
        "english": "Justice is blind, but everyone's eyes remain wide open.",
        "movie": "Talvar",
        "year": 2015,
        "actor": "Irrfan Khan",
        "character": "Ashwin Kumar",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },

    # The Lunchbox (2013) - IMDb: 7.8
    {
        "dialogue": "Kabhi kabhi galat train bhi sahi jagah pahuncha deti hai.",
        "english": "Sometimes the wrong train can lead you to the right station.",
        "movie": "The Lunchbox",
        "year": 2013,
        "actor": "Irrfan Khan & Nawazuddin Siddiqui",
        "character": "Saajan Fernandes & Shaikh",
        "imdb_rating": 7.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Paan Singh Tomar (2012) - IMDb: 8.2
    {
        "dialogue": "Bihad mein toh baaghi hote hain, dacoit milte hain parliament mein.",
        "english": "In the ravines dwell rebels; the real dacoits are found in Parliament.",
        "movie": "Paan Singh Tomar",
        "year": 2012,
        "actor": "Irrfan Khan",
        "character": "Paan Singh Tomar",
        "imdb_rating": 8.2,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },

    # Hindi Medium (2017) - IMDb: 7.9
    {
        "dialogue": "Angrezi Bharat mein zuban nahi hai, class hai.",
        "english": "English in India isn't just a language, it's a social class.",
        "movie": "Hindi Medium",
        "year": 2017,
        "actor": "Irrfan Khan",
        "character": "Raj Batra",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Badhaai Ho (2018) - IMDb: 7.9
    {
        "dialogue": "Mummy papa sex karte hain toh sharminda kyun hote hain sab?",
        "english": "If parents have sex, why is everyone so embarrassed about it?",
        "movie": "Badhaai Ho",
        "year": 2018,
        "actor": "Ayushmann Khurrana",
        "character": "Nakul Kaushik",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Andhadhun (2018) - IMDb: 8.2
    {
        "dialogue": "What is life? It depends on the liver.",
        "english": "What is life? It depends on the liver.",
        "movie": "Andhadhun",
        "year": 2018,
        "actor": "Ayushmann Khurrana",
        "character": "Akash",
        "imdb_rating": 8.2,
        "genre": "Crime / Mystery / Thriller",
        "tag": "modern"
    },

    # Article 15 (2019) - IMDb: 8.1
    {
        "dialogue": "In sabki aukaat humein yaad dilani padti hai sir... Article 15 kehta hai sab barabar hain.",
        "english": "We must remind them of their status sir... Article 15 declares everyone is equal.",
        "movie": "Article 15",
        "year": 2019,
        "actor": "Ayushmann Khurrana",
        "character": "Ayan Ranjan",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Mystery",
        "tag": "modern"
    },

    # Tumbbad (2018) - IMDb: 8.2
    {
        "dialogue": "Yeh duniya kisi ki laalach ke liye nahi, zaroorat ke liye bani hai.",
        "english": "This world was created to satisfy human need, not human greed.",
        "movie": "Tumbbad",
        "year": 2018,
        "actor": "Sohum Shah",
        "character": "Vinayak Rao",
        "imdb_rating": 8.2,
        "genre": "Drama / Fantasy / Horror",
        "tag": "modern"
    },
    {
        "dialogue": "Soja varna Hastar aa jayega!",
        "english": "Go to sleep or Hastar will come for you!",
        "movie": "Tumbbad",
        "year": 2018,
        "actor": "Sohum Shah",
        "character": "Vinayak Rao",
        "imdb_rating": 8.2,
        "genre": "Drama / Fantasy / Horror",
        "tag": "modern"
    },

    # Uri: The Surgical Strike (2019) - IMDb: 8.2
    {
        "dialogue": "How's the josh? High, Sir!",
        "english": "How's the spirit? High, Sir!",
        "movie": "Uri: The Surgical Strike",
        "year": 2019,
        "actor": "Vicky Kaushal",
        "character": "Major Vihaan Singh Shergill",
        "imdb_rating": 8.2,
        "genre": "Action / Drama / War",
        "tag": "modern"
    },
    {
        "dialogue": "Yeh naya Hindustan hai, yeh ghar mein ghusega bhi aur marega bhi!",
        "english": "This is a new India, it will enter your home and strike you down!",
        "movie": "Uri: The Surgical Strike",
        "year": 2019,
        "actor": "Paresh Rawal",
        "character": "Govind Bhardwaj",
        "imdb_rating": 8.2,
        "genre": "Action / Drama / War",
        "tag": "modern"
    },

    # Sardar Udham (2021) - IMDb: 8.4
    {
        "dialogue": "Freedom is the birthright of every human being.",
        "english": "Freedom is the birthright of every human being.",
        "movie": "Sardar Udham",
        "year": 2021,
        "actor": "Vicky Kaushal",
        "character": "Udham Singh",
        "imdb_rating": 8.4,
        "genre": "Biography / Crime / Drama",
        "tag": "modern"
    },

    # 12th Fail (2023) - IMDb: 8.9
    {
        "dialogue": "Restart! Agar ek baar nahi hua, toh dobara restart karenge!",
        "english": "Restart! If it didn't happen the first time, we will restart all over again!",
        "movie": "12th Fail",
        "year": 2023,
        "actor": "Vikrant Massey",
        "character": "Manoj Kumar Sharma",
        "imdb_rating": 8.9,
        "genre": "Biography / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Haar tab hoti hai jab aap ladna chhod dete hain.",
        "english": "Defeat only happens when you stop fighting.",
        "movie": "12th Fail",
        "year": 2023,
        "actor": "Vikrant Massey",
        "character": "Manoj Kumar Sharma",
        "imdb_rating": 8.9,
        "genre": "Biography / Drama",
        "tag": "modern"
    },

    # Shershaah (2021) - IMDb: 8.3
    {
        "dialogue": "Yeh dil maange more!",
        "english": "This heart yearns for more!",
        "movie": "Shershaah",
        "year": 2021,
        "actor": "Sidharth Malhotra",
        "character": "Captain Vikram Batra",
        "imdb_rating": 8.3,
        "genre": "Action / Biography / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Tiranga lehra kar aaoonga, nahi toh usme lipat kar aaoonga, lekin aaoonga zaroor.",
        "english": "I will either return waving the tricolor, or wrapped inside it, but I will return for sure.",
        "movie": "Shershaah",
        "year": 2021,
        "actor": "Sidharth Malhotra",
        "character": "Captain Vikram Batra",
        "imdb_rating": 8.3,
        "genre": "Action / Biography / Drama",
        "tag": "modern"
    },

    # K.G.F: Chapter 1 & 2 (2018 / 2022) - IMDb: 8.2 / 8.3
    {
        "dialogue": "Violence, violence, violence... I don't like it. I avoid! But violence likes me, I can't avoid!",
        "english": "Violence, violence, violence... I don't like it. I avoid! But violence likes me, I can't avoid!",
        "movie": "K.G.F: Chapter 2",
        "year": 2022,
        "actor": "Yash",
        "character": "Rocky Bhai",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Ghayal sher ki saansein uski dahaad se zyada khatarnak hoti hain.",
        "english": "A wounded lion's breath is far more dangerous than its roar.",
        "movie": "K.G.F: Chapter 1",
        "year": 2018,
        "actor": "Yash",
        "character": "Rocky Bhai",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # RRR (2022) - IMDb: 7.8
    {
        "dialogue": "Yudh se pehle shanti zaroori hoti hai.",
        "english": "Before war, calm is necessary.",
        "movie": "RRR",
        "year": 2022,
        "actor": "Ram Charan",
        "character": "Alluri Sitarama Raju",
        "imdb_rating": 7.8,
        "genre": "Action / Drama",
        "tag": "modern"
    },

    # Baahubali: The Beginning & The Conclusion (2015 / 2017) - IMDb: 8.0 / 8.2
    {
        "dialogue": "Mera vachan hi hai mera shasan!",
        "english": "My word itself is my law!",
        "movie": "Baahubali: The Beginning",
        "year": 2015,
        "actor": "Ramya Krishnan",
        "character": "Sivagami Devi",
        "imdb_rating": 8.0,
        "genre": "Action / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Kattappa ne Baahubali ko kyun maara?",
        "english": "Why did Kattappa kill Baahubali?",
        "movie": "Baahubali 2: The Conclusion",
        "year": 2017,
        "actor": "Sathyaraj",
        "character": "Kattappa",
        "imdb_rating": 8.2,
        "genre": "Action / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Devasena ko kisi ne haath lagaya toh samjho Baahubali ki talwar ko dhaar di!",
        "english": "If anyone lays a finger on Devasena, consider it sharpening Baahubali's blade!",
        "movie": "Baahubali 2: The Conclusion",
        "year": 2017,
        "actor": "Prabhas",
        "character": "Amarendra Baahubali",
        "imdb_rating": 8.2,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Pushpa: The Rise (2021) - IMDb: 7.6
    {
        "dialogue": "Pushpa... Pushparaj... Main jhukega nahi sala!",
        "english": "Pushpa... Pushparaj... I will never bow down!",
        "movie": "Pushpa: The Rise",
        "year": 2021,
        "actor": "Allu Arjun",
        "character": "Pushpa Raj",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Pushpa naam sunke flower samjhe kya? Fire hai main!",
        "english": "Hearing the name Pushpa, did you think I was a flower? I am fire!",
        "movie": "Pushpa: The Rise",
        "year": 2021,
        "actor": "Allu Arjun",
        "character": "Pushpa Raj",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Jawan (2023) - IMDb: 7.0
    {
        "dialogue": "Bete ko haath lagane se pehle, baap se baat kar!",
        "english": "Before you lay a hand on the son, talk to the father!",
        "movie": "Jawan",
        "year": 2023,
        "actor": "Shah Rukh Khan",
        "character": "Vikram Rathore",
        "imdb_rating": 7.0,
        "genre": "Action / Thriller",
        "tag": "modern"
    },
    {
        "dialogue": "Main kaun hoon? Punya hoon ya paap hoon... bas jo hoon, aap hoon.",
        "english": "Who am I? Virtue or sin... whatever I am, I am you.",
        "movie": "Jawan",
        "year": 2023,
        "actor": "Shah Rukh Khan",
        "character": "Azad / Vikram Rathore",
        "imdb_rating": 7.0,
        "genre": "Action / Thriller",
        "tag": "modern"
    },

    # Pathaan (2023) - IMDb: 5.9
    {
        "dialogue": "Party agar Pathaan ke ghar rakhoge, toh mehmaannawazi ke liye Pathaan toh aayega hi!",
        "english": "If you throw a party at Pathaan's house, then Pathaan will surely arrive to host you!",
        "movie": "Pathaan",
        "year": 2023,
        "actor": "Shah Rukh Khan",
        "character": "Pathaan",
        "imdb_rating": 5.9,
        "genre": "Action / Adventure / Thriller",
        "tag": "modern"
    },
    {
        "dialogue": "Apni kursi ki peti baandh lo, mausam bigadne wala hai!",
        "english": "Fasten your seatbelts, the weather is about to turn rough!",
        "movie": "Pathaan",
        "year": 2023,
        "actor": "Shah Rukh Khan",
        "character": "Pathaan",
        "imdb_rating": 5.9,
        "genre": "Action / Adventure / Thriller",
        "tag": "modern"
    },

    # Animal (2023) - IMDb: 6.2
    {
        "dialogue": "Papa ke liye main duniya jala sakta hoon.",
        "english": "For my father, I can burn the entire world down.",
        "movie": "Animal",
        "year": 2023,
        "actor": "Ranbir Kapoor",
        "character": "Ranvijay Singh",
        "imdb_rating": 6.2,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Kabhi Khushi Kabhie Gham... (2001) - IMDb: 7.4
    {
        "dialogue": "Kaun hai yeh jisne doobara mudke mujhe nahi dekha? Who is he?",
        "english": "Who is this person who didn't turn back to look at me again? Who is he?",
        "movie": "Kabhi Khushi Kabhie Gham...",
        "year": 2001,
        "actor": "Kareena Kapoor",
        "character": "Pooja 'Poo' Sharma",
        "imdb_rating": 7.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Keh diya na, bas keh diya!",
        "english": "I said it, and that is final!",
        "movie": "Kabhi Khushi Kabhie Gham...",
        "year": 2001,
        "actor": "Amitabh Bachchan",
        "character": "Yashvardhan Raichand",
        "imdb_rating": 7.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Zindagi mein kuch banna ho, kuch haasil karna ho, toh hamesha apne dil ki suno.",
        "english": "If you want to achieve something in life, always listen to your heart.",
        "movie": "Kabhi Khushi Kabhie Gham...",
        "year": 2001,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Raichand",
        "imdb_rating": 7.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Kuch Kuch Hota Hai (1998) - IMDb: 7.6
    {
        "dialogue": "Kuch kuch hota hai Rahul, tum nahi samjhoge.",
        "english": "Something happens inside Rahul, you wouldn't understand.",
        "movie": "Kuch Kuch Hota Hai",
        "year": 1998,
        "actor": "Shah Rukh Khan & Kajol",
        "character": "Rahul & Anjali",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Pyaar dosti hai... agar woh meri sabse achhi dost nahi ban sakti, toh main usse kabhi pyaar kar hi nahi sakta.",
        "english": "Love is friendship... if she cannot be my best friend, I can never truly love her.",
        "movie": "Kuch Kuch Hota Hai",
        "year": 1998,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Khanna",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Hum ek baar jeete hain, ek baar marte hain, shaadi bhi ek baar hoti hai... aur pyaar, pyaar bhi ek hi baar hota hai.",
        "english": "We live once, we die once, marriage happens once... and love, love also happens only once.",
        "movie": "Kuch Kuch Hota Hai",
        "year": 1998,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Khanna",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Kal Ho Naa Ho (2003) - IMDb: 7.9
    {
        "dialogue": "Hanso, muskurao, kya pata kal ho naa ho!",
        "english": "Laugh, smile, who knows if tomorrow will ever come!",
        "movie": "Kal Ho Naa Ho",
        "year": 2003,
        "actor": "Shah Rukh Khan",
        "character": "Aman Mathur",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Aaj ek hasi aur baant lo, aaj ek dua aur maang lo... kya pata kal ho naa ho.",
        "english": "Share one more smile today, say one more prayer today... who knows if tomorrow will come.",
        "movie": "Kal Ho Naa Ho",
        "year": 2003,
        "actor": "Shah Rukh Khan",
        "character": "Aman Mathur",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Pyaar toh bahut log karte hain, lekin mere jaisa pyaar koi nahi kar sakta kyunki kisi ke paas tum jo nahi ho.",
        "english": "Many people love, but no one can love like me because no one else has you.",
        "movie": "Kal Ho Naa Ho",
        "year": 2003,
        "actor": "Shah Rukh Khan",
        "character": "Aman Mathur",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Musical",
        "tag": "classic"
    },

    # Mohabbatein (2000) - IMDb: 7.0
    {
        "dialogue": "Parampara, Pratishtha, Anushasan... yeh is Gurukul ke teen stambh hain.",
        "english": "Tradition, Prestige, Discipline... these are the three pillars of this Gurukul.",
        "movie": "Mohabbatein",
        "year": 2000,
        "actor": "Amitabh Bachchan",
        "character": "Narayan Shankar",
        "imdb_rating": 7.0,
        "genre": "Musical / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Duniya mein kitni hai nafratein, phir bhi dilon mein hai mohabbatein.",
        "english": "However much hatred exists in the world, love still resides within our hearts.",
        "movie": "Mohabbatein",
        "year": 2000,
        "actor": "Shah Rukh Khan",
        "character": "Raj Aryan Malhotra",
        "imdb_rating": 7.0,
        "genre": "Musical / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Mohabbat bhi zindagi ki tarah hoti hai, har mod aasan nahi hota.",
        "english": "Love is just like life, not every turn is easy.",
        "movie": "Mohabbatein",
        "year": 2000,
        "actor": "Shah Rukh Khan",
        "character": "Raj Aryan Malhotra",
        "imdb_rating": 7.0,
        "genre": "Musical / Drama / Romance",
        "tag": "classic"
    },

    # Devdas (2002) - IMDb: 7.5
    {
        "dialogue": "Babuji ne kaha gaon chhod do, sab ne kaha Paro ko chhod do, Paro ne kaha sharab chhod do... aaj tumne keh diya haweli chhod do, ek din aayega jab woh kahenge duniya hi chhod do.",
        "english": "Father said leave the village, everyone said leave Paro, Paro said leave alcohol... today you said leave the mansion, one day will come when they say leave the world entirely.",
        "movie": "Devdas",
        "year": 2002,
        "actor": "Shah Rukh Khan",
        "character": "Devdas Mukherjee",
        "imdb_rating": 7.5,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Kaun kambakht bardaasht karne ko peeta hai? Main toh peeta hoon ki bas saans le sakoon.",
        "english": "What wretched person drinks merely to endure? I drink only so that I can breathe.",
        "movie": "Devdas",
        "year": 2002,
        "actor": "Shah Rukh Khan",
        "character": "Devdas Mukherjee",
        "imdb_rating": 7.5,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Zanjeer (1973) - IMDb: 7.5
    {
        "dialogue": "Yeh police station hai, tumhare baap ka ghar nahi. Isliye seedhe khade raho!",
        "english": "This is a police station, not your father's home. So stand straight!",
        "movie": "Zanjeer",
        "year": 1973,
        "actor": "Amitabh Bachchan",
        "character": "Inspector Vijay Khanna",
        "imdb_rating": 7.5,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Sher khan ka dost banna chahta hai ya dushman?",
        "english": "Do you want to become Sher Khan's friend or enemy?",
        "movie": "Zanjeer",
        "year": 1973,
        "actor": "Pran",
        "character": "Sher Khan",
        "imdb_rating": 7.5,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Amar Akbar Anthony (1977) - IMDb: 7.4
    {
        "dialogue": "Aisa toh aadmi doich time bhagta hai... Olympic ka race ho ya police ka case ho!",
        "english": "A man runs like this only two times... either it's an Olympic race or a police case!",
        "movie": "Amar Akbar Anthony",
        "year": 1977,
        "actor": "Amitabh Bachchan",
        "character": "Anthony Gonsalves",
        "imdb_rating": 7.4,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },

    # Muqaddar Ka Sikandar (1978) - IMDb: 7.4
    {
        "dialogue": "Zindagi toh bewafa hai ek din thukrayegi... maut mehbooba hai apne saath lekar jayegi.",
        "english": "Life is unfaithful and will forsake you one day... death is the true lover who will take you along.",
        "movie": "Muqaddar Ka Sikandar",
        "year": 1978,
        "actor": "Amitabh Bachchan",
        "character": "Sikandar",
        "imdb_rating": 7.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Namak Halaal (1982) - IMDb: 7.2
    {
        "dialogue": "I can talk English, I can walk English, I can laugh English because English is a very phunny language!",
        "english": "I can talk English, I can walk English, I can laugh English because English is a very funny language!",
        "movie": "Namak Halaal",
        "year": 1982,
        "actor": "Amitabh Bachchan",
        "character": "Arjun Singh",
        "imdb_rating": 7.2,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Silsila (1981) - IMDb: 7.2
    {
        "dialogue": "Yeh kahan aa gaye hum, yunhi saath saath chalte.",
        "english": "Where have we arrived, just walking along side by side.",
        "movie": "Silsila",
        "year": 1981,
        "actor": "Amitabh Bachchan",
        "character": "Amit Malhotra",
        "imdb_rating": 7.2,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Kabhie Kabhie (1976) - IMDb: 7.1
    {
        "dialogue": "Kabhi kabhie mere dil mein khayal aata hai... ki jaise tujhko banaya gaya hai mere liye.",
        "english": "Sometimes a thought crosses my heart... as if you were created just for me.",
        "movie": "Kabhie Kabhie",
        "year": 1976,
        "actor": "Amitabh Bachchan",
        "character": "Amitabh Malhotra",
        "imdb_rating": 7.1,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Pakeezah (1972) - IMDb: 7.3
    {
        "dialogue": "Aapke paon dekhe, bahut haseen hain... inhe zameen par mat utariyega, maile ho jayenge.",
        "english": "I saw your feet, they are exquisite... please do not place them on the ground, they will get soiled.",
        "movie": "Pakeezah",
        "year": 1972,
        "actor": "Raaj Kumar",
        "character": "Salim Ahmed Khan",
        "imdb_rating": 7.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Waqt (1965) - IMDb: 7.7
    {
        "dialogue": "Jinke apne ghar sheeshe ke hote hain, woh doosron ke gharon par patthar nahi phenka karte.",
        "english": "Those who live in glass houses shouldn't throw stones at others.",
        "movie": "Waqt",
        "year": 1965,
        "actor": "Raaj Kumar",
        "character": "Raja",
        "imdb_rating": 7.7,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Yeh bachhon ke khelne ki cheez nahi, haath kat jaye toh khoon nikal aata hai!",
        "english": "This is not a toy for children, if your hand gets cut, blood will flow!",
        "movie": "Waqt",
        "year": 1965,
        "actor": "Raaj Kumar",
        "character": "Raja",
        "imdb_rating": 7.7,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Saudagar (1991) - IMDb: 6.4
    {
        "dialogue": "Hum tumhe marenge, aur zaroor marenge... lekin bandook bhi hamari hogi, goli bhi hamari hogi aur waqt bhi hamara hoga!",
        "english": "I will kill you, and kill you for sure... but the gun will be mine, the bullet will be mine, and the time will be mine!",
        "movie": "Saudagar",
        "year": 1991,
        "actor": "Raaj Kumar",
        "character": "Rajeshwar Singh",
        "imdb_rating": 6.4,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Tirangaa (1993) - IMDb: 5.8
    {
        "dialogue": "Na talwar ki dhar se, na goliyon ki bauchar se... banda darta hai toh sirf parvardigar se!",
        "english": "Neither by blade's edge nor bullet shower... this man fears none but the Almighty Creator!",
        "movie": "Tirangaa",
        "year": 1993,
        "actor": "Raaj Kumar",
        "character": "Brigadier Suryadev Singh",
        "imdb_rating": 5.8,
        "genre": "Action / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Apna usool kehta hai... har galti ki sazaa maut hai!",
        "english": "My principle dictates... the penalty for every betrayal is death!",
        "movie": "Tirangaa",
        "year": 1993,
        "actor": "Raaj Kumar",
        "character": "Brigadier Suryadev Singh",
        "imdb_rating": 5.8,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Kranti (1981) - IMDb: 7.2
    {
        "dialogue": "Zindagi maut se shuru hoti hai aur maut par khatam hoti hai.",
        "english": "Life begins from struggle and concludes in death.",
        "movie": "Kranti",
        "year": 1981,
        "actor": "Manoj Kumar",
        "character": "Bharat / Kranti",
        "imdb_rating": 7.2,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },

    # Mother India (1957) - IMDb: 8.0
    {
        "dialogue": "Main ek aurat hoon, par pehle ek maa hoon.",
        "english": "I am a woman, but first and foremost I am a mother.",
        "movie": "Mother India",
        "year": 1957,
        "actor": "Nargis",
        "character": "Radha",
        "imdb_rating": 8.0,
        "genre": "Drama / Musical",
        "tag": "classic"
    },

    # Guide (1965) - IMDb: 8.4
    {
        "dialogue": "Na koi marta hai, na koi maarta hai... aatma ajar amar hai.",
        "english": "Nobody dies, nobody kills... the soul is immortal and imperishable.",
        "movie": "Guide",
        "year": 1965,
        "actor": "Dev Anand",
        "character": "Raju",
        "imdb_rating": 8.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Pyaasa (1957) - IMDb: 8.3
    {
        "dialogue": "Yeh mehlon, yeh takhton, yeh taajon ki duniya... agar mil bhi jaye toh kya hai?",
        "english": "This world of palaces, thrones, and crowns... even if one wins it all, what is it worth?",
        "movie": "Pyaasa",
        "year": 1957,
        "actor": "Guru Dutt",
        "character": "Vijay",
        "imdb_rating": 8.3,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Kaagaz Ke Phool (1959) - IMDb: 7.8
    {
        "dialogue": "Waqt ne kiya kya haseen sitam... tum rahe na tum, hum rahe na hum.",
        "english": "What sweet tyranny time has wrought... you are no longer you, and I am no longer I.",
        "movie": "Kaagaz Ke Phool",
        "year": 1959,
        "actor": "Guru Dutt",
        "character": "Suresh Sinha",
        "imdb_rating": 7.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Gol Maal (1979) - IMDb: 8.5
    {
        "dialogue": "Moochh nahi toh kuch nahi! A man without a moustache is like a cup without a handle.",
        "english": "No moustache means no manliness! A man without a moustache is like a cup without a handle.",
        "movie": "Gol Maal",
        "year": 1979,
        "actor": "Utpal Dutt",
        "character": "Bhawani Shankar",
        "imdb_rating": 8.5,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Kurta phaad ke gussa dikhana hamari aadat nahi!",
        "english": "Tearing my shirt to express anger is not my style!",
        "movie": "Gol Maal",
        "year": 1979,
        "actor": "Amol Palekar",
        "character": "Ramprasad Dashrathprasad Sharma",
        "imdb_rating": 8.5,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },

    # Chupke Chupke (1975) - IMDb: 8.3
    {
        "dialogue": "Shuddh Hindi bolne mein jo anand hai, woh kisi aur bhasha mein nahi.",
        "english": "The delight in speaking pure Hindi is unparalleled in any other tongue.",
        "movie": "Chupke Chupke",
        "year": 1975,
        "actor": "Dharmendra",
        "character": "Dr. Parimal Tripathi / Pyare Mohan",
        "imdb_rating": 8.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Jaane Bhi Do Yaaro (1983) - IMDb: 8.3
    {
        "dialogue": "Draupadi teri akele ki nahi hai... hum sab share holder hain!",
        "english": "Draupadi is not yours alone... we are all shareholders here!",
        "movie": "Jaane Bhi Do Yaaro",
        "year": 1983,
        "actor": "Pankaj Kapur",
        "character": "Tarneja",
        "imdb_rating": 8.3,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Shaant gadadhari Bheem, shaant!",
        "english": "Calm down mace-wielding Bheem, calm down!",
        "movie": "Jaane Bhi Do Yaaro",
        "year": 1983,
        "actor": "Satish Shah",
        "character": "D'Mello / Duryodhan",
        "imdb_rating": 8.3,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Satya (1998) - IMDb: 8.3
    {
        "dialogue": "Mumbai ka king kaun? Bhiku Mhatre!",
        "english": "Who is the king of Mumbai? Bhiku Mhatre!",
        "movie": "Satya",
        "year": 1998,
        "actor": "Manoj Bajpayee",
        "character": "Bhiku Mhatre",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Goli maar bheje mein, bheja shor karta hai!",
        "english": "Shoot a bullet in the brain, the brain makes too much noise!",
        "movie": "Satya",
        "year": 1998,
        "actor": "Manoj Bajpayee",
        "character": "Bhiku Mhatre",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Company (2002) - IMDb: 8.0
    {
        "dialogue": "Ganda hai par dhanda hai yeh!",
        "english": "It may be dirty, but it's business!",
        "movie": "Company",
        "year": 2002,
        "actor": "Ajay Devgn",
        "character": "Malik",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Sarkar (2005) - IMDb: 7.6
    {
        "dialogue": "Mujhe jo sahi lagta hai main karta hoon, chahe woh bhagwan ke khilaaf ho, kanoon ke khilaaf ho ya poore system ke khilaaf!",
        "english": "I do whatever feels right to me, whether it goes against God, against the law, or against the entire system!",
        "movie": "Sarkar",
        "year": 2005,
        "actor": "Amitabh Bachchan",
        "character": "Subhash Nagre 'Sarkar'",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Nazdeeki fayda dekhne se pehle, door ka nuksaan sochna chahiye.",
        "english": "Before looking at short-term gain, one should calculate the long-term loss.",
        "movie": "Sarkar",
        "year": 2005,
        "actor": "Amitabh Bachchan",
        "character": "Subhash Nagre 'Sarkar'",
        "imdb_rating": 7.6,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Black Friday (2004) - IMDb: 8.4
    {
        "dialogue": "Kanoon andha hota hai par judge toh dekh sakta hai!",
        "english": "The law is blind, but the judge can surely see!",
        "movie": "Black Friday",
        "year": 2004,
        "actor": "Kay Kay Menon",
        "character": "DCP Rakesh Maria",
        "imdb_rating": 8.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Rang De Basanti (2006) - IMDb: 8.1
    {
        "dialogue": "Zindagi jeene ke do hi tareeqe hote hain... ek jo ho raha hai hone do, bardaasht karte jao... ya phir zimmedari uthao usse badalne ki.",
        "english": "There are only two ways to live life... either endure whatever is happening, or take responsibility to change it.",
        "movie": "Rang De Basanti",
        "year": 2006,
        "actor": "Aamir Khan",
        "character": "Daljit 'DJ' Singh",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Koi bhi desh perfect nahi hota, usse behtar banana padta hai.",
        "english": "No country is perfect, it has to be made better.",
        "movie": "Rang De Basanti",
        "year": 2006,
        "actor": "Sharman Joshi",
        "character": "Sukhi Ram",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "College ki boundary ke bahar ek duniya hai, jahan sab kuch alag hai.",
        "english": "Outside the boundary of college lies a world where everything is different.",
        "movie": "Rang De Basanti",
        "year": 2006,
        "actor": "Kunal Kapoor",
        "character": "Aslam Khan",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / History",
        "tag": "classic"
    },

    # Guru (2007) - IMDb: 7.7
    {
        "dialogue": "Jab log tumhare khilaaf bolne lagein, samajh lo tarakki kar rahe ho.",
        "english": "When people start speaking against you, understand that you are progressing in life.",
        "movie": "Guru",
        "year": 2007,
        "actor": "Abhishek Bachchan",
        "character": "Gurukant Desai",
        "imdb_rating": 7.7,
        "genre": "Biography / Drama",
        "tag": "classic"
    },

    # Rock On!! (2008) - IMDb: 7.7
    {
        "dialogue": "Agar sapne dekhna chhod diya, toh jeena chhod diya.",
        "english": "If you stop dreaming, you stop living.",
        "movie": "Rock On!!",
        "year": 2008,
        "actor": "Farhan Akhtar",
        "character": "Aditya Shroff",
        "imdb_rating": 7.7,
        "genre": "Drama / Music",
        "tag": "classic"
    },

    # Jab We Met (2007) - IMDb: 7.9
    {
        "dialogue": "Main apni favorite hoon!",
        "english": "I am my own favorite!",
        "movie": "Jab We Met",
        "year": 2007,
        "actor": "Kareena Kapoor",
        "character": "Geet Dhillon",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Sikhni hoon main Bhatinda ki!",
        "english": "I am a fierce Sikh girl from Bhatinda!",
        "movie": "Jab We Met",
        "year": 2007,
        "actor": "Kareena Kapoor",
        "character": "Geet Dhillon",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Akeli ladki khuli hui tijori ki tarah hoti hai.",
        "english": "A girl traveling alone is considered like an open treasury.",
        "movie": "Jab We Met",
        "year": 2007,
        "actor": "Kishore Pradhan",
        "character": "Station Master",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Wake Up Sid (2009) - IMDb: 7.6
    {
        "dialogue": "Apne shauq ko profession banana hi sabse badi kamyabi hai.",
        "english": "Turning your passion into your profession is the greatest success of all.",
        "movie": "Wake Up Sid",
        "year": 2009,
        "actor": "Ranbir Kapoor",
        "character": "Siddharth 'Sid' Mehra",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Rocket Singh: Salesman of the Year (2009) - IMDb: 7.5
    {
        "dialogue": "Risk toh Spiderman ko bhi lena padta hai, main toh phir bhi salesman hoon!",
        "english": "Even Spiderman has to take risks, after all I am still a salesman!",
        "movie": "Rocket Singh: Salesman of the Year",
        "year": 2009,
        "actor": "Ranbir Kapoor",
        "character": "Harpreet Singh Bedi",
        "imdb_rating": 7.5,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Business number nahi, business log hain.",
        "english": "Business is not numbers, business is about people.",
        "movie": "Rocket Singh: Salesman of the Year",
        "year": 2009,
        "actor": "Ranbir Kapoor",
        "character": "Harpreet Singh Bedi",
        "imdb_rating": 7.5,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Rockstar (2011) - IMDb: 7.8
    {
        "dialogue": "Pata hai, yahan se bahut door, galat aur sahi ke paar, ek maidan hai... main wahan milunga tujhe.",
        "english": "You know, far away from here, beyond right and wrong, there is a field... I will meet you there.",
        "movie": "Rockstar",
        "year": 2011,
        "actor": "Ranbir Kapoor",
        "character": "Janardhan 'Jordan' Jakhar",
        "imdb_rating": 7.8,
        "genre": "Drama / Music / Musical",
        "tag": "classic"
    },
    {
        "dialogue": "Toote hue dil se hi sangeet nikalta hai.",
        "english": "True music only emerges from a shattered heart.",
        "movie": "Rockstar",
        "year": 2011,
        "actor": "Kumud Mishra",
        "character": "Khatana",
        "imdb_rating": 7.8,
        "genre": "Drama / Music / Musical",
        "tag": "classic"
    },

    # Barfi! (2012)
    {
        "dialogue": "Pyaar mein khamoshi bhi ek bhasha hoti hai.",
        "english": "In love, silence too is a language.",
        "movie": "Barfi!",
        "year": 2012,
        "actor": "Ileana D'Cruz",
        "character": "Shruti Ghosh",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Bhaag Milkha Bhaag (2013) - IMDb: 8.2
    {
        "dialogue": "Log kehte hain ki race paon se daudi jaati hai, par sach yeh hai ki race hausle se jeeti jaati hai.",
        "english": "People say races are run with feet, but the truth is races are won with willpower.",
        "movie": "Bhaag Milkha Bhaag",
        "year": 2013,
        "actor": "Farhan Akhtar",
        "character": "Milkha Singh",
        "imdb_rating": 8.2,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Yeh aapki zindagi ki aakhri race ho sakti hai... Daudoonga bhi waise hi!",
        "english": "This could be the last race of your life... And I will run it exactly like that!",
        "movie": "Bhaag Milkha Bhaag",
        "year": 2013,
        "actor": "Farhan Akhtar",
        "character": "Milkha Singh",
        "imdb_rating": 8.2,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },

    # Bajrangi Bhaijaan (2015) - IMDb: 8.1
    {
        "dialogue": "Hamare Bajrangbali jhoot bolne nahi dete.",
        "english": "My Lord Hanuman does not permit me to tell lies.",
        "movie": "Bajrangi Bhaijaan",
        "year": 2015,
        "actor": "Salman Khan",
        "character": "Pawan Kumar Chaturvedi 'Bajrangi'",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Nafrat bahut aasaani se bikti hai, par mohabbat ko khareedne wala koi nahi hota.",
        "english": "Hatred sells very easily, but there are few buyers for genuine love.",
        "movie": "Bajrangi Bhaijaan",
        "year": 2015,
        "actor": "Nawazuddin Siddiqui",
        "character": "Chand Nawab",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Yeh Chand Nawab hai, Karachi se... live!",
        "english": "This is Chand Nawab, reporting from Karachi... live!",
        "movie": "Bajrangi Bhaijaan",
        "year": 2015,
        "actor": "Nawazuddin Siddiqui",
        "character": "Chand Nawab",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Comedy",
        "tag": "classic"
    },

    # Sultan (2016) - IMDb: 7.0
    {
        "dialogue": "Kismat ko aukaat dikhana mera kaam hai.",
        "english": "Showing destiny its rightful place is my duty.",
        "movie": "Sultan",
        "year": 2016,
        "actor": "Salman Khan",
        "character": "Sultan Ali Khan",
        "imdb_rating": 7.0,
        "genre": "Action / Drama / Sport",
        "tag": "classic"
    },
    {
        "dialogue": "Koi tumhe tab tak nahi hara sakta, jab tak tum khud se na haar jao.",
        "english": "No one can defeat you until you accept defeat from within yourself.",
        "movie": "Sultan",
        "year": 2016,
        "actor": "Salman Khan",
        "character": "Sultan Ali Khan",
        "imdb_rating": 7.0,
        "genre": "Action / Drama / Sport",
        "tag": "classic"
    },

    # Super 30 (2019) - IMDb: 7.9
    {
        "dialogue": "Raja ka beta raja nahi banega, raja wahi banega jo haqdaar hoga!",
        "english": "A king's son will no longer automatically become king, only the deserving will rule!",
        "movie": "Super 30",
        "year": 2019,
        "actor": "Hrithik Roshan",
        "character": "Anand Kumar",
        "imdb_rating": 7.9,
        "genre": "Biography / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Aapatti se hi aavishkaar hota hai.",
        "english": "Adversity is the true mother of invention.",
        "movie": "Super 30",
        "year": 2019,
        "actor": "Hrithik Roshan",
        "character": "Anand Kumar",
        "imdb_rating": 7.9,
        "genre": "Biography / Drama",
        "tag": "modern"
    },

    # War (2019) - IMDb: 6.5
    {
        "dialogue": "Khalid kabhi nahi darta Kabir sir se... bas unhe dekh kar dhyan bhatak jaata hai.",
        "english": "Khalid is never afraid of Kabir sir... his focus just slips when he looks at him.",
        "movie": "War",
        "year": 2019,
        "actor": "Tiger Shroff",
        "character": "Khalid Rahmani",
        "imdb_rating": 6.5,
        "genre": "Action / Thriller",
        "tag": "modern"
    },
    {
        "dialogue": "Kaha tha na... goli seedhe maathe pe lagegi!",
        "english": "Didn't I say... the bullet will strike straight between the brows!",
        "movie": "War",
        "year": 2019,
        "actor": "Hrithik Roshan",
        "character": "Kabir Luthra",
        "imdb_rating": 6.5,
        "genre": "Action / Thriller",
        "tag": "modern"
    },

    # Krrish (2006) - IMDb: 6.4
    {
        "dialogue": "Meri taqat meri kamzori nahi ban sakti.",
        "english": "My strength can never become my weakness.",
        "movie": "Krrish",
        "year": 2006,
        "actor": "Hrithik Roshan",
        "character": "Krishna Mehra / Krrish",
        "imdb_rating": 6.4,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },

    # Dhoom 2 (2006) - IMDb: 6.6
    {
        "dialogue": "Are you like a check? Because you bounce everywhere!",
        "english": "Are you like a check? Because you bounce everywhere!",
        "movie": "Dhoom 2",
        "year": 2006,
        "actor": "Hrithik Roshan & Aishwarya Rai",
        "character": "Aryan Singh & Sunehri",
        "imdb_rating": 6.6,
        "genre": "Action / Thriller",
        "tag": "classic"
    },

    # Lakshya (2004) - IMDb: 7.9
    {
        "dialogue": "Yeh ladai meri ladai hai.",
        "english": "This battle is my own battle.",
        "movie": "Lakshya",
        "year": 2004,
        "actor": "Hrithik Roshan",
        "character": "Lt. Karan Shergill",
        "imdb_rating": 7.9,
        "genre": "Action / Drama / War",
        "tag": "classic"
    },
    {
        "dialogue": "Haan, main Karan hoon. Main theek hoon.",
        "english": "Yes, I am Karan. I am doing fine.",
        "movie": "Lakshya",
        "year": 2004,
        "actor": "Hrithik Roshan",
        "character": "Lt. Karan Shergill",
        "imdb_rating": 7.9,
        "genre": "Action / Drama / War",
        "tag": "classic"
    },

    # Gupt (1997) - IMDb: 7.4
    {
        "dialogue": "Duniya haseeno ka mela hai, par har haseen bewafa hai.",
        "english": "The world is a carnival of beauties, but beauty can be treacherous.",
        "movie": "Gupt",
        "year": 1997,
        "actor": "Bobby Deol",
        "character": "Sahil Sinha",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Soldier (1998) - IMDb: 6.2
    {
        "dialogue": "Jo desh ke liye ladte hain, unka koi mazhab nahi hota.",
        "english": "Those who fight for their country have no religion other than the motherland.",
        "movie": "Soldier",
        "year": 1998,
        "actor": "Bobby Deol",
        "character": "Vicky / Raju",
        "imdb_rating": 6.2,
        "genre": "Action / Drama / Romance",
        "tag": "classic"
    },

    # Border (1997) - IMDb: 7.9
    {
        "dialogue": "Hum hi hum hain toh kya hum hain, tum hi tum ho toh kya tum ho!",
        "english": "If it is only us then what are we, and if it is only you then what are you!",
        "movie": "Border",
        "year": 1997,
        "actor": "Sunny Deol",
        "character": "Major Kuldip Singh Chandpuri",
        "imdb_rating": 7.9,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Pehli goli woh chalayenge aur aakhri goli hum!",
        "english": "The first bullet will be fired by them, but the final bullet will be fired by us!",
        "movie": "Border",
        "year": 1997,
        "actor": "Sunny Deol",
        "character": "Major Kuldip Singh Chandpuri",
        "imdb_rating": 7.9,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Zindagi aur maut waheguru ke haath mein hai.",
        "english": "Life and death rest solely in the hands of the Almighty.",
        "movie": "Border",
        "year": 1997,
        "actor": "Sunny Deol",
        "character": "Major Kuldip Singh Chandpuri",
        "imdb_rating": 7.9,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },

    # Khakee (2004) - IMDb: 7.4
    {
        "dialogue": "Wardee ki izzat karna seekho.",
        "english": "Learn to respect the police uniform.",
        "movie": "Khakee",
        "year": 2004,
        "actor": "Amitabh Bachchan",
        "character": "DCP Anant Shrivastav",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Kanoon andha hota hai par kanoon ke rakhwale andhe nahi hote.",
        "english": "The law may be blind, but the guardians of law are not.",
        "movie": "Khakee",
        "year": 2004,
        "actor": "Ajay Devgn",
        "character": "Yashwant Angre",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Drishyam (2015) & Drishyam 2 (2022) - IMDb: 8.2 / 8.2
    {
        "dialogue": "2 October ko hum Panaji gaye the Satsang mein, Swami Chinmayanand ke pravachan sunne.",
        "english": "On 2nd October we went to Panaji for a spiritual gathering to listen to Swami Chinmayanand's discourse.",
        "movie": "Drishyam",
        "year": 2015,
        "actor": "Ajay Devgn",
        "character": "Vijay Salgaonkar",
        "imdb_rating": 8.2,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },
    {
        "dialogue": "Kal 3 October ko humne Pav Bhaji khayi aur film dekhi.",
        "english": "Yesterday on 3rd October, we ate Pav Bhaji and watched a movie.",
        "movie": "Drishyam",
        "year": 2015,
        "actor": "Ajay Devgn",
        "character": "Vijay Salgaonkar",
        "imdb_rating": 8.2,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },
    {
        "dialogue": "Sach aankhon ke samne hota hai par hum dekh nahi paate.",
        "english": "The truth is right before our eyes, yet we fail to see it.",
        "movie": "Drishyam 2",
        "year": 2022,
        "actor": "Ajay Devgn",
        "character": "Vijay Salgaonkar",
        "imdb_rating": 8.2,
        "genre": "Crime / Drama / Mystery",
        "tag": "modern"
    },

    # Tanhaji: The Unsung Warrior (2020) - IMDb: 7.5
    {
        "dialogue": "Gadh aala pan sinh gela!",
        "english": "The fort is captured, but the lion is lost!",
        "movie": "Tanhaji: The Unsung Warrior",
        "year": 2020,
        "actor": "Sharad Kelkar",
        "character": "Chhatrapati Shivaji Maharaj",
        "imdb_rating": 7.5,
        "genre": "Action / Biography / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Bhagva dhwaj ki laaj rakhna har Maratha ka dharam hai.",
        "english": "Protecting the honor of the saffron flag is the sacred duty of every Maratha.",
        "movie": "Tanhaji: The Unsung Warrior",
        "year": 2020,
        "actor": "Ajay Devgn",
        "character": "Subhedar Tanaji Malusare",
        "imdb_rating": 7.5,
        "genre": "Action / Biography / Drama",
        "tag": "modern"
    },

    # Omkara (2006) - IMDb: 8.0
    {
        "dialogue": "Bewafai ki aag mein jalna aasan nahi hota.",
        "english": "Burning in the fires of betrayal is not an easy fate.",
        "movie": "Omkara",
        "year": 2006,
        "actor": "Ajay Devgn",
        "character": "Omkara Shukla",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Bewakoof aur mard mein sirf ek hi farq hota hai... mard ko darr lagta hai!",
        "english": "There is only one difference between a fool and a real man... a real man acknowledges fear!",
        "movie": "Omkara",
        "year": 2006,
        "actor": "Saif Ali Khan",
        "character": "Langda Tyagi",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Raees (2017) - IMDb: 6.8
    {
        "dialogue": "Baniye ka dimaag aur Miyanbhai ki daring!",
        "english": "The cunning intellect of a trader and the raw daring of a Muslim brother!",
        "movie": "Raees",
        "year": 2017,
        "actor": "Shah Rukh Khan",
        "character": "Raees",
        "imdb_rating": 6.8,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Ammijaan kehti thi, koi dhanda chhota nahi hota aur dhande se bada koi dharam nahi hota.",
        "english": "Mother used to say, no business is small, and no religion is greater than doing your work.",
        "movie": "Raees",
        "year": 2017,
        "actor": "Shah Rukh Khan",
        "character": "Raees",
        "imdb_rating": 6.8,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Chennai Express (2013) - IMDb: 6.1
    {
        "dialogue": "Don't underestimate the power of a common man!",
        "english": "Don't underestimate the power of a common man!",
        "movie": "Chennai Express",
        "year": 2013,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Mithaiwala",
        "imdb_rating": 6.1,
        "genre": "Action / Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Kaha tha na, Rahul... naam toh suna hoga!",
        "english": "Didn't I tell you, Rahul... you must have heard the name!",
        "movie": "Chennai Express",
        "year": 2013,
        "actor": "Shah Rukh Khan",
        "character": "Rahul Mithaiwala",
        "imdb_rating": 6.1,
        "genre": "Action / Comedy / Romance",
        "tag": "classic"
    },

    # Kick (2014) - IMDb: 5.6
    {
        "dialogue": "Mere baare mein itna mat sochna, main dil mein aata hoon samajh mein nahi!",
        "english": "Don't think so much about me, I arrive in the heart, not in human understanding!",
        "movie": "Kick",
        "year": 2014,
        "actor": "Salman Khan",
        "character": "Devi Lal Singh 'Devil'",
        "imdb_rating": 5.6,
        "genre": "Action / Comedy",
        "tag": "classic"
    },

    # Bodyguard (2011) - IMDb: 4.7
    {
        "dialogue": "Mujh par ek ehsaan karna, ki mujh par koi ehsaan na karna!",
        "english": "Do me one favor, never do me any favors!",
        "movie": "Bodyguard",
        "year": 2011,
        "actor": "Salman Khan",
        "character": "Lovely Singh",
        "imdb_rating": 4.7,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },

    # Ready (2011) - IMDb: 4.9
    {
        "dialogue": "Zindagi mein teen cheezein kabhi underestimate mat karna: I, ME and MYSELF!",
        "english": "In life, never underestimate three things: I, ME and MYSELF!",
        "movie": "Ready",
        "year": 2011,
        "actor": "Salman Khan",
        "character": "Prem Kapoor",
        "imdb_rating": 4.9,
        "genre": "Action / Comedy / Romance",
        "tag": "classic"
    },

    # Rowdy Rathore (2012) - IMDb: 5.8
    {
        "dialogue": "Don't angry me!",
        "english": "Don't make me angry!",
        "movie": "Rowdy Rathore",
        "year": 2012,
        "actor": "Akshay Kumar",
        "character": "Vikram Rathore / Shiva",
        "imdb_rating": 5.8,
        "genre": "Action / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Jo main bolta hoon woh main karta hoon, jo main nahi bolta woh main definitely karta hoon!",
        "english": "What I speak I do, what I don't speak I definitely do!",
        "movie": "Rowdy Rathore",
        "year": 2012,
        "actor": "Akshay Kumar",
        "character": "Vikram Rathore / Shiva",
        "imdb_rating": 5.8,
        "genre": "Action / Comedy",
        "tag": "classic"
    },

    # Baby (2015) - IMDb: 7.9
    {
        "dialogue": "Religion wala column jo hota hai na sir, usme hum Indian likhte hain.",
        "english": "That religion column in forms sir, we write Indian there.",
        "movie": "Baby",
        "year": 2015,
        "actor": "Akshay Kumar",
        "character": "Ajay Singh Rajput",
        "imdb_rating": 7.9,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Special 26 (2013) - IMDb: 8.0
    {
        "dialogue": "Asli power dil mein hoti hai, wardi mein nahi.",
        "english": "Real authority resides in the heart, not in the uniform.",
        "movie": "Special 26",
        "year": 2013,
        "actor": "Akshay Kumar",
        "character": "Ajay Singh",
        "imdb_rating": 8.0,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Kesari (2019) - IMDb: 7.4
    {
        "dialogue": "Kesari rang ka matlab jaante ho? Shaurya aur balidaan!",
        "english": "Do you know the meaning of saffron? Valour and supreme sacrifice!",
        "movie": "Kesari",
        "year": 2019,
        "actor": "Akshay Kumar",
        "character": "Havildar Ishar Singh",
        "imdb_rating": 7.4,
        "genre": "Action / Drama / History",
        "tag": "modern"
    },
    {
        "dialogue": "Aaj meri pagdi bhi kesari, jo bahega mera lahu bhi kesari, aur mera jawaab bhi kesari!",
        "english": "Today my turban is saffron, the blood that spills shall be saffron, and my reply is saffron!",
        "movie": "Kesari",
        "year": 2019,
        "actor": "Akshay Kumar",
        "character": "Havildar Ishar Singh",
        "imdb_rating": 7.4,
        "genre": "Action / Drama / History",
        "tag": "modern"
    },

    # Airlift (2016) - IMDb: 8.0
    {
        "dialogue": "Aadmi ki fitrat hi aisi hai... chot lagti hai toh sabse pehle maa yaad aati hai, aur bheed mein fas jaye toh apna watan!",
        "english": "Such is the human disposition... when wounded, one remembers mother, and when trapped abroad, one remembers the homeland!",
        "movie": "Airlift",
        "year": 2016,
        "actor": "Akshay Kumar",
        "character": "Ranjit Katyal",
        "imdb_rating": 8.0,
        "genre": "Drama / History",
        "tag": "classic"
    },

    # OMG - Oh My God! (2012) - IMDb: 8.1
    {
        "dialogue": "Dharam logon ko ladaata nahi hai, dharam ke thekedar ladaate hain.",
        "english": "Religion doesn't pit people against each other, the brokers of religion do.",
        "movie": "OMG - Oh My God!",
        "year": 2012,
        "actor": "Paresh Rawal",
        "character": "Kanji Lalji Mehta",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Main kisi ko darr se nahi, pyaar se apna banata hoon.",
        "english": "I don't win anyone through fear, I make them mine through love.",
        "movie": "OMG - Oh My God!",
        "year": 2012,
        "actor": "Akshay Kumar",
        "character": "Krishna Vasudev Yadav",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama / Fantasy",
        "tag": "classic"
    },

    # Jolly LLB (2013) & Jolly LLB 2 (2017) - IMDb: 7.5 / 7.2
    {
        "dialogue": "Kanoon andha hota hai, judge nahi!",
        "english": "The law is blind, not the judge!",
        "movie": "Jolly LLB",
        "year": 2013,
        "actor": "Saurabh Shukla",
        "character": "Justice Sunderlal Tripathi",
        "imdb_rating": 7.5,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Insaaf ki devi ki aankhon par patti isliye bandhi hoti hai taaki woh amir aur gareeb mein bhedbhav na kare.",
        "english": "The goddess of justice wears a blindfold so she does not discriminate between rich and poor.",
        "movie": "Jolly LLB 2",
        "year": 2017,
        "actor": "Akshay Kumar",
        "character": "Jagdishwar 'Jolly' Mishra",
        "imdb_rating": 7.2,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Badlapur (2015) - IMDb: 7.4
    {
        "dialogue": "Badle ki aag mein insaan khud ko jala deta hai.",
        "english": "In the fire of revenge, a person consumes themselves.",
        "movie": "Badlapur",
        "year": 2015,
        "actor": "Nawazuddin Siddiqui",
        "character": "Liak Tungrekar",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Raazi (2018) - IMDb: 7.7
    {
        "dialogue": "Watan ke aage kuch nahi... khud bhi nahi!",
        "english": "Nothing comes before the nation... not even yourself!",
        "movie": "Raazi",
        "year": 2018,
        "actor": "Alia Bhatt",
        "character": "Sehmat Khan",
        "imdb_rating": 7.7,
        "genre": "Action / Drama / Thriller",
        "tag": "modern"
    },

    # Highway (2014) - IMDb: 7.6
    {
        "dialogue": "Jahan se tum mujhe laye ho main wahan wapas nahi jaana chahti... par yeh rasta bahut achha hai.",
        "english": "I don't want to go back to where you brought me from... but this open journey is wonderful.",
        "movie": "Highway",
        "year": 2014,
        "actor": "Alia Bhatt",
        "character": "Veera Tripathi",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama / Romance",
        "tag": "classic"
    },

    # Gully Boy (2019) - IMDb: 7.9
    {
        "dialogue": "Apna time aayega!",
        "english": "Our time will come!",
        "movie": "Gully Boy",
        "year": 2019,
        "actor": "Ranveer Singh",
        "character": "Murad Ahmed 'Gully Boy'",
        "imdb_rating": 7.9,
        "genre": "Drama / Music",
        "tag": "modern"
    },
    {
        "dialogue": "Koi doosra batayega mereko main kaun hoon?",
        "english": "Will someone else tell me who I am supposed to be?",
        "movie": "Gully Boy",
        "year": 2019,
        "actor": "Ranveer Singh",
        "character": "Murad Ahmed 'Gully Boy'",
        "imdb_rating": 7.9,
        "genre": "Drama / Music",
        "tag": "modern"
    },
    {
        "dialogue": "Mere boyfriend se gulu gulu karegi toh dhoptungi na usko!",
        "english": "If she flirts with my boyfriend, of course I will bash her up!",
        "movie": "Gully Boy",
        "year": 2019,
        "actor": "Alia Bhatt",
        "character": "Safeena Firdausi",
        "imdb_rating": 7.9,
        "genre": "Drama / Music",
        "tag": "modern"
    },

    # Bajirao Mastani (2015) - IMDb: 7.2
    {
        "dialogue": "Bajirao ne Mastani se mohabbat ki hai, ayyashi nahi.",
        "english": "Bajirao loved Mastani with devotion, not frivolity.",
        "movie": "Bajirao Mastani",
        "year": 2015,
        "actor": "Ranveer Singh",
        "character": "Peshwa Bajirao I",
        "imdb_rating": 7.2,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Cheeteh ki chaal, baaz ki nazar aur Bajirao ki talwar par sandeh nahi karte!",
        "english": "Never doubt a cheetah's speed, an eagle's sight, or Bajirao's sword!",
        "movie": "Bajirao Mastani",
        "year": 2015,
        "actor": "Ranveer Singh",
        "character": "Peshwa Bajirao I",
        "imdb_rating": 7.2,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Aap humse hamari zindagi maang lete hum aapko khushi khushi de dete... par aapne toh humse hamara guroor chheen liya.",
        "english": "Had you asked for our life, we would have happily yielded it... but you stripped us of our sacred pride.",
        "movie": "Bajirao Mastani",
        "year": 2015,
        "actor": "Priyanka Chopra",
        "character": "Kashibai",
        "imdb_rating": 7.2,
        "genre": "Action / Drama / History",
        "tag": "classic"
    },

    # Padmaavat (2018) - IMDb: 7.1
    {
        "dialogue": "Rajputi kangan mein utni hi taqat hai jitni Rajputi talwar mein!",
        "english": "A Rajput woman's bangle holds just as much power as a Rajput sword!",
        "movie": "Padmaavat",
        "year": 2018,
        "actor": "Deepika Padukone",
        "character": "Rani Padmavati",
        "imdb_rating": 7.1,
        "genre": "Drama / History / Romance",
        "tag": "modern"
    },
    {
        "dialogue": "Chinta ko aag ki tarah lapet le woh Rajput, ret ki naav lekar samandar se shart lagaye woh Rajput!",
        "english": "He who wraps worry like fire is a Rajput, he who challenges the ocean on a sand boat is a Rajput!",
        "movie": "Padmaavat",
        "year": 2018,
        "actor": "Shahid Kapoor",
        "character": "Maharawal Ratan Singh",
        "imdb_rating": 7.1,
        "genre": "Drama / History / Romance",
        "tag": "modern"
    },
    {
        "dialogue": "Yeh nayaab cheez Khilji ki ho chuki hai!",
        "english": "This rare treasure now belongs to Khilji!",
        "movie": "Padmaavat",
        "year": 2018,
        "actor": "Ranveer Singh",
        "character": "Alauddin Khilji",
        "imdb_rating": 7.1,
        "genre": "Drama / History / Romance",
        "tag": "modern"
    },

    # Kabir Singh (2019) - IMDb: 7.0
    {
        "dialogue": "Kisi ne usse chhua bhi toh uski fielding main set karoonga!",
        "english": "If anyone even touches her, I will settle his score personally!",
        "movie": "Kabir Singh",
        "year": 2019,
        "actor": "Shahid Kapoor",
        "character": "Kabir Rajdheer Singh",
        "imdb_rating": 7.0,
        "genre": "Action / Drama / Romance",
        "tag": "modern"
    },
    {
        "dialogue": "I am not a rebel without a cause, sir!",
        "english": "I am not a rebel without a cause, sir!",
        "movie": "Kabir Singh",
        "year": 2019,
        "actor": "Shahid Kapoor",
        "character": "Kabir Rajdheer Singh",
        "imdb_rating": 7.0,
        "genre": "Action / Drama / Romance",
        "tag": "modern"
    },

    # Dil Dhadakne Do (2015) - IMDb: 7.0
    {
        "dialogue": "Log kya kahenge, is darr se jeena kab chhodoge?",
        "english": "When will you stop living in fear of what people will say?",
        "movie": "Dil Dhadakne Do",
        "year": 2015,
        "actor": "Farhan Akhtar",
        "character": "Sunny Gill",
        "imdb_rating": 7.0,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # M.S. Dhoni: The Untold Story (2016) - IMDb: 8.0
    {
        "dialogue": "Maahi maar raha hai!",
        "english": "Maahi is hitting big sixes!",
        "movie": "M.S. Dhoni: The Untold Story",
        "year": 2016,
        "actor": "Sushant Singh Rajput",
        "character": "Mahendra Singh Dhoni",
        "imdb_rating": 8.0,
        "genre": "Biography / Drama / Sport",
        "tag": "classic"
    },
    {
        "dialogue": "Desh ke liye khelna kisi bhi khiladi ka sabse bada sapna hota hai.",
        "english": "Playing for your country is the ultimate dream of every athlete.",
        "movie": "M.S. Dhoni: The Untold Story",
        "year": 2016,
        "actor": "Sushant Singh Rajput",
        "character": "Mahendra Singh Dhoni",
        "imdb_rating": 8.0,
        "genre": "Biography / Drama / Sport",
        "tag": "classic"
    },

    # Chhichhore (2019) - IMDb: 8.3
    {
        "dialogue": "Success ke baad ka plan sabke paas hota hai... lekin agar galti se fail ho gaye, toh failure se kaise deal karna hai, koi baat hi nahi karta.",
        "english": "Everyone has a plan after success... but if you fail by chance, how to deal with failure, nobody talks about that.",
        "movie": "Chhichhore",
        "year": 2019,
        "actor": "Sushant Singh Rajput",
        "character": "Aniruddh 'Anni' Pathak",
        "imdb_rating": 8.3,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Tumhara result decide nahi karta hai ki tum loser ho ki nahi... tumhari koshish decide karti hai!",
        "english": "Your result doesn't decide whether you are a loser or not... your earnest effort decides it!",
        "movie": "Chhichhore",
        "year": 2019,
        "actor": "Sushant Singh Rajput",
        "character": "Aniruddh 'Anni' Pathak",
        "imdb_rating": 8.3,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Kai Po Che! (2013) - IMDb: 7.8
    {
        "dialogue": "Yeh ladka special hai... cricket iske khoon mein daudta hai.",
        "english": "This boy is special... cricket flows through his veins.",
        "movie": "Kai Po Che!",
        "year": 2013,
        "actor": "Sushant Singh Rajput",
        "character": "Ishaan Bhatt",
        "imdb_rating": 7.8,
        "genre": "Drama / Sport",
        "tag": "classic"
    },

    # Vicky Donor (2012) - IMDb: 7.8
    {
        "dialogue": "Duniya mein do tarah ke log hote hain... ek jo sperm donate karte hain, aur ek jo usse paida hote hain!",
        "english": "There are two kinds of people in this world... those who donate sperm, and those born from it!",
        "movie": "Vicky Donor",
        "year": 2012,
        "actor": "Annu Kapoor",
        "character": "Dr. Baldev Chaddha",
        "imdb_rating": 7.8,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },

    # Dum Laga Ke Haisha (2015) - IMDb: 7.5
    {
        "dialogue": "Mohabbat vajan dekh kar nahi hoti.",
        "english": "Love is not measured on weighing scales.",
        "movie": "Dum Laga Ke Haisha",
        "year": 2015,
        "actor": "Ayushmann Khurrana & Bhumi Pednekar",
        "character": "Prem & Sandhya",
        "imdb_rating": 7.5,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Bareilly Ki Barfi (2017) - IMDb: 7.5
    {
        "dialogue": "Aap chronology samajhiye!",
        "english": "Please understand the chronology!",
        "movie": "Bareilly Ki Barfi",
        "year": 2017,
        "actor": "Rajkummar Rao",
        "character": "Pritam Vidrohi",
        "imdb_rating": 7.5,
        "genre": "Comedy / Romance",
        "tag": "modern"
    },
    {
        "dialogue": "Jab hum thaan lete hain na, toh phaad ke rakh dete hain!",
        "english": "When I set my mind on something, I blow past every obstacle!",
        "movie": "Bareilly Ki Barfi",
        "year": 2017,
        "actor": "Rajkummar Rao",
        "character": "Pritam Vidrohi",
        "imdb_rating": 7.5,
        "genre": "Comedy / Romance",
        "tag": "modern"
    },

    # Newton (2017) - IMDb: 7.6
    {
        "dialogue": "Jab tak kuch badlega nahi, tab tak kuch nahi badlega.",
        "english": "Until something changes from within, nothing will change on the surface.",
        "movie": "Newton",
        "year": 2017,
        "actor": "Rajkummar Rao",
        "character": "Newton Kumar",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Kanoon ka paalan karna sabka farz hai.",
        "english": "Following the law is everyone's sacred duty.",
        "movie": "Newton",
        "year": 2017,
        "actor": "Rajkummar Rao",
        "character": "Newton Kumar",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Badhaai Do (2022) - IMDb: 7.1
    {
        "dialogue": "Shaadi sirf do logon ki nahi, do parivaaron ki samajhdari hoti hai.",
        "english": "Marriage isn't just about two individuals, it's about mutual understanding between two families.",
        "movie": "Badhaai Do",
        "year": 2022,
        "actor": "Rajkummar Rao & Bhumi Pednekar",
        "character": "Shardul & Suman",
        "imdb_rating": 7.1,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Trapped (2016) - IMDb: 7.5
    {
        "dialogue": "Zinda rehne ke liye insaan kuch bhi kar sakta hai.",
        "english": "To stay alive, a human can do anything.",
        "movie": "Trapped",
        "year": 2016,
        "actor": "Rajkummar Rao",
        "character": "Shaurya",
        "imdb_rating": 7.5,
        "genre": "Drama / Thriller",
        "tag": "classic"
    },

    # Ludo (2020) - IMDb: 7.6
    {
        "dialogue": "Kismat dice ki tarah hoti hai, kab kaunsa number aa jaye koi nahi jaanta.",
        "english": "Destiny is like rolling dice, no one knows which number will turn up next.",
        "movie": "Ludo",
        "year": 2020,
        "actor": "Pankaj Tripathi",
        "character": "Sattu Bhaiya",
        "imdb_rating": 7.6,
        "genre": "Action / Comedy / Crime",
        "tag": "modern"
    },
    {
        "dialogue": "Zindagi mein chaar rang hote hain, aur sabka apna daav hota hai.",
        "english": "Life has four colors, and everyone plays their own strategic move.",
        "movie": "Ludo",
        "year": 2020,
        "actor": "Abhishek Bachchan",
        "character": "Bittu",
        "imdb_rating": 7.6,
        "genre": "Action / Comedy / Crime",
        "tag": "modern"
    },

    # Mirzapur (Top IMDb Cult Series / Movie Adaptation) - IMDb: 8.5
    {
        "dialogue": "Suru majboori mein kiye the, ab maza aa raha hai!",
        "english": "Started out of helplessness, now I'm thoroughly enjoying it!",
        "movie": "Mirzapur",
        "year": 2018,
        "actor": "Ali Fazal",
        "character": "Guddu Pandit",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Darr ki yahi dikkat hai, ki kabhi bhi khatam ho sakta hai.",
        "english": "The trouble with fear is that it can disappear at any moment.",
        "movie": "Mirzapur",
        "year": 2018,
        "actor": "Pankaj Tripathi",
        "character": "Akhandanand Tripathi 'Kaleen Bhaiya'",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Bawaal cheez hai be, saala system hil jaata hai!",
        "english": "It's an explosive thing, it rattles the entire system!",
        "movie": "Mirzapur",
        "year": 2018,
        "actor": "Divyenndu",
        "character": "Munna Bhaiya",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Sacred Games (Top IMDb Cult Crime Drama) - IMDb: 8.5
    {
        "dialogue": "Kabhi kabhi lagta hai ki apun hi bhagwan hai!",
        "english": "Sometimes I feel like I am God himself!",
        "movie": "Sacred Games",
        "year": 2018,
        "actor": "Nawazuddin Siddiqui",
        "character": "Ganesh Gaitonde",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Pachees din hai tumhare paas, bacha sakte ho toh bacha lo!",
        "english": "You have twenty-five days, save your city if you can!",
        "movie": "Sacred Games",
        "year": 2018,
        "actor": "Nawazuddin Siddiqui",
        "character": "Ganesh Gaitonde",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Dharam ke naam par sabka ch***ya kata jata hai.",
        "english": "In the name of religion, everyone gets manipulated.",
        "movie": "Sacred Games",
        "year": 2018,
        "actor": "Nawazuddin Siddiqui",
        "character": "Ganesh Gaitonde",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Ghilli (Top South/Hindi Classic) - IMDb: 8.1
    {
        "dialogue": "Kabbadi kabbadi... jeet hamari hogi!",
        "english": "Kabbadi kabbadi... victory will be ours!",
        "movie": "Ghilli",
        "year": 2004,
        "actor": "Thalapathy Vijay",
        "character": "Velu",
        "imdb_rating": 8.1,
        "genre": "Action / Drama / Sport",
        "tag": "classic"
    },

    # Vikram (2022) - IMDb: 8.3
    {
        "dialogue": "Once upon a time there lived a ghost... Aarambikkalaangala!",
        "english": "Once upon a time there lived a ghost... Shall we begin!",
        "movie": "Vikram",
        "year": 2022,
        "actor": "Kamal Haasan",
        "character": "Vikram / Karnan",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Thriller",
        "tag": "modern"
    },

    # Leo (2023) - IMDb: 7.2
    {
        "dialogue": "Bloody sweet!",
        "english": "Bloody sweet!",
        "movie": "Leo",
        "year": 2023,
        "actor": "Thalapathy Vijay",
        "character": "Leo Das / Parthiban",
        "imdb_rating": 7.2,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Jailer (2023) - IMDb: 7.1
    {
        "dialogue": "Hukum... Tiger ka hukum!",
        "english": "Command... It is the Tiger's command!",
        "movie": "Jailer",
        "year": 2023,
        "actor": "Rajinikanth",
        "character": "Tiger Muthuvel Pandian",
        "imdb_rating": 7.1,
        "genre": "Action / Comedy / Crime",
        "tag": "modern"
    },

    # Sivaji: The Boss (2007) - IMDb: 7.5
    {
        "dialogue": "Kanna, panni dhaan kootama varum. Singam single-ah dhaan varum!",
        "english": "Listen kid, only pigs hunt in packs. A lion always arrives alone!",
        "movie": "Sivaji: The Boss",
        "year": 2007,
        "actor": "Rajinikanth",
        "character": "Sivaji Arumugam",
        "imdb_rating": 7.5,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Robot / Enthiran (2010) - IMDb: 7.1
    {
        "dialogue": "Speed 1 terahertz, memory 1 zettabyte!",
        "english": "Speed 1 terahertz, memory 1 zettabyte!",
        "movie": "Enthiran",
        "year": 2010,
        "actor": "Rajinikanth",
        "character": "Chitti the Robot",
        "imdb_rating": 7.1,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },

    # Hum Dil De Chuke Sanam (1999) - IMDb: 7.4
    {
        "dialogue": "Pyaar toh sabhi karte hain, lekin jo tyaag kare wahi sachha aashiq hai.",
        "english": "Everyone falls in love, but the one who sacrifices is the true lover.",
        "movie": "Hum Dil De Chuke Sanam",
        "year": 1999,
        "actor": "Ajay Devgn",
        "character": "Vanraj",
        "imdb_rating": 7.4,
        "genre": "Drama / Musical / Romance",
        "tag": "classic"
    },

    # Dil Se.. (1998) - IMDb: 7.5
    {
        "dialogue": "Mujhe sabse zyada darr tumhari aankhon se lagta hai... kyunki inme sach dikhta hai.",
        "english": "I am most terrified of your eyes... because they reveal the naked truth.",
        "movie": "Dil Se..",
        "year": 1998,
        "actor": "Shah Rukh Khan",
        "character": "Amarkant Varma",
        "imdb_rating": 7.5,
        "genre": "Drama / Romance / Thriller",
        "tag": "classic"
    },

    # Ghulam (1998) - IMDb: 7.3
    {
        "dialogue": "Aati kya Khandala?",
        "english": "Will you come to Khandala with me?",
        "movie": "Ghulam",
        "year": 1998,
        "actor": "Aamir Khan",
        "character": "Siddharth Marathe",
        "imdb_rating": 7.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Sarfarosh (1999) - IMDb: 8.1
    {
        "dialogue": "Hindustan ke har kone mein dushman chhupa hai, humein aakhein khuli rakhni hongi.",
        "english": "Enemies lurk in every corner of India, we must keep our eyes wide open.",
        "movie": "Sarfarosh",
        "year": 1999,
        "actor": "Aamir Khan",
        "character": "ACP Ajay Singh Rathod",
        "imdb_rating": 8.1,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # Fanaa (2006) - IMDb: 7.1
    {
        "dialogue": "Tere dil mein meri saanson ko panaah mil jaye... tere ishq mein meri jaan fanaa ho jaye.",
        "english": "May my breaths find sanctuary in your heart... may my very soul perish in your love.",
        "movie": "Fanaa",
        "year": 2006,
        "actor": "Aamir Khan",
        "character": "Rehan Qadri",
        "imdb_rating": 7.1,
        "genre": "Action / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Sahi aur galat ke beech chunna aasan hota hai, par do sahi ya do galat ke beech chunna hi zindagi hai.",
        "english": "Choosing between right and wrong is easy, but choosing between two rights or two wrongs is what life is about.",
        "movie": "Fanaa",
        "year": 2006,
        "actor": "Aamir Khan",
        "character": "Rehan Qadri",
        "imdb_rating": 7.1,
        "genre": "Action / Drama / Romance",
        "tag": "classic"
    },

    # Ghajini (2008) - IMDb: 7.3
    {
        "dialogue": "Mujhe sirf 15 minute yaad rehta hai... uske baad main sab bhool jaata hoon.",
        "english": "I can only remember for 15 minutes... after that I forget everything.",
        "movie": "Ghajini",
        "year": 2008,
        "actor": "Aamir Khan",
        "character": "Sanjay Singhania",
        "imdb_rating": 7.3,
        "genre": "Action / Drama / Mystery",
        "tag": "classic"
    },
    {
        "dialogue": "Ghajini ko marna mera maksad hai.",
        "english": "Killing Ghajini is my sole purpose.",
        "movie": "Ghajini",
        "year": 2008,
        "actor": "Aamir Khan",
        "character": "Sanjay Singhania",
        "imdb_rating": 7.3,
        "genre": "Action / Drama / Mystery",
        "tag": "classic"
    },

    # Talaash: The Answer Lies Within (2012) - IMDb: 7.2
    {
        "dialogue": "Sach chhup sakta hai, par mita nahi ja sakta.",
        "english": "Truth can be concealed, but it can never be erased.",
        "movie": "Talaash",
        "year": 2012,
        "actor": "Aamir Khan",
        "character": "Inspector Surjan Singh Shekhawat",
        "imdb_rating": 7.2,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },

    # Secret Superstar (2017) - IMDb: 7.8
    {
        "dialogue": "Sapne dekhna toh basic hota hai... har kisi ko haq hota hai sapne dekhne ka.",
        "english": "Dreaming is fundamental... everyone has the birthright to dream.",
        "movie": "Secret Superstar",
        "year": 2017,
        "actor": "Zaira Wasim",
        "character": "Insia Malik",
        "imdb_rating": 7.8,
        "genre": "Drama / Music",
        "tag": "modern"
    },

    # Laapataa Ladies (2024) - IMDb: 8.5
    {
        "dialogue": "Ghoonghat ke peeche aazadi nahi milti babu.",
        "english": "Freedom is never found behind the veil, sir.",
        "movie": "Laapataa Ladies",
        "year": 2024,
        "actor": "Ravi Kishan",
        "character": "Inspector Shyam Manohar",
        "imdb_rating": 8.5,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Sapne dekhne ki koi keemat nahi lagti, par poora karne ke liye jaan lagani padti hai.",
        "english": "Dreaming costs nothing, but fulfilling dreams requires your entire heart and soul.",
        "movie": "Laapataa Ladies",
        "year": 2024,
        "actor": "Nitanshi Goel",
        "character": "Phool Kumari",
        "imdb_rating": 8.5,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Brahmāstra: Part One – Shiva (2022) - IMDb: 5.6
    {
        "dialogue": "Roshni mein ek aisi shakti hai jo har andhere ko mita sakti hai.",
        "english": "In light there is a power that can banish every darkness.",
        "movie": "Brahmāstra: Part One – Shiva",
        "year": 2022,
        "actor": "Ranbir Kapoor",
        "character": "Shiva",
        "imdb_rating": 5.6,
        "genre": "Action / Adventure / Fantasy",
        "tag": "modern"
    },

    # Sanju (2018) - IMDb: 7.6
    {
        "dialogue": "Kutte ko agar ghee hazam na ho, toh kutta ulti karta hai... aur agar aadmi ko sach hazam na ho, toh woh gussa karta hai.",
        "english": "If a dog cannot digest butter, it vomits... and if a man cannot digest the truth, he lashes out in fury.",
        "movie": "Sanju",
        "year": 2018,
        "actor": "Ranbir Kapoor",
        "character": "Sanjay Dutt",
        "imdb_rating": 7.6,
        "genre": "Biography / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Main bewada hoon, tharki hoon, drug addict hoon... sab hoon, par terrorist nahi hoon!",
        "english": "I am a drunkard, a pervert, a drug addict... I am all of that, but I am not a terrorist!",
        "movie": "Sanju",
        "year": 2018,
        "actor": "Ranbir Kapoor",
        "character": "Sanjay Dutt",
        "imdb_rating": 7.6,
        "genre": "Biography / Drama",
        "tag": "modern"
    },

    # Dunki (2023) - IMDb: 6.7
    {
        "dialogue": "Apne watan ki mitti jaisi khushboo kahin nahi milti.",
        "english": "The fragrance of one's own motherland cannot be found anywhere else on earth.",
        "movie": "Dunki",
        "year": 2023,
        "actor": "Shah Rukh Khan",
        "character": "Hardayal 'Hardy' Singh Dhillon",
        "imdb_rating": 6.7,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Fighter (2024) - IMDb: 6.9
    {
        "dialogue": "Duniya mein aatankwadiyon ke liye sirf ek hi jagah hai... kabristan!",
        "english": "There is only one place in this world for terrorists... the graveyard!",
        "movie": "Fighter",
        "year": 2024,
        "actor": "Hrithik Roshan",
        "character": "Squadron Leader Shamsher 'Patty' Pathania",
        "imdb_rating": 6.9,
        "genre": "Action / Thriller",
        "tag": "modern"
    },

    # Kalki 2898 AD (2024) - IMDb: 7.5
    {
        "dialogue": "Yug badalta hai, par dharamyudh kabhi nahi rukta.",
        "english": "Eras change, but the battle for righteousness never ceases.",
        "movie": "Kalki 2898 AD",
        "year": 2024,
        "actor": "Amitabh Bachchan",
        "character": "Ashwatthama",
        "imdb_rating": 7.5,
        "genre": "Action / Sci-Fi",
        "tag": "modern"
    },
    {
        "dialogue": "Mera naam Bhairava hai... Kashi ka sabse bada bounty hunter!",
        "english": "My name is Bhairava... the greatest bounty hunter in Kashi!",
        "movie": "Kalki 2898 AD",
        "year": 2024,
        "actor": "Prabhas",
        "character": "Bhairava",
        "imdb_rating": 7.5,
        "genre": "Action / Sci-Fi",
        "tag": "modern"
    },

    # Stree 2 (2024) - IMDb: 7.2
    {
        "dialogue": "Sarkate ka aatank khatam karne ke liye Stree ko aana hi hoga!",
        "english": "To end the terror of the headless demon, Stree must return!",
        "movie": "Stree 2",
        "year": 2024,
        "actor": "Rajkummar Rao & Pankaj Tripathi",
        "character": "Vicky & Rudra",
        "imdb_rating": 7.2,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },

    # Munjya (2024) - IMDb: 6.8
    {
        "dialogue": "Munjya ki aatma tabhi shaant hogi jab uski ichha poori hogi!",
        "english": "Munjya's spirit will only rest when his deep desire is fulfilled!",
        "movie": "Munjya",
        "year": 2024,
        "actor": "Abhay Verma",
        "character": "Bittu",
        "imdb_rating": 6.8,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },

    # Maharaja (2024) - IMDb: 8.5
    {
        "dialogue": "Lakshmi meri jaan hai... uske bina main kuch nahi!",
        "english": "Lakshmi is my life... without it I am nothing!",
        "movie": "Maharaja",
        "year": 2024,
        "actor": "Vijay Sethupathi",
        "character": "Maharaja",
        "imdb_rating": 8.5,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Kantara (2022) - IMDb: 8.2
    {
        "dialogue": "Yeh jungle hamara nahi, hum is jungle ke hain!",
        "english": "This forest does not belong to us, we belong to this forest!",
        "movie": "Kantara",
        "year": 2022,
        "actor": "Rishab Shetty",
        "character": "Shiva",
        "imdb_rating": 8.2,
        "genre": "Action / Adventure / Drama",
        "tag": "modern"
    },

    # Dr. Babasaheb Ambedkar (2000) - IMDb: 7.8
    {
        "dialogue": "Shikshit bano, sangathit raho, sangharsh karo!",
        "english": "Educate, Agitate, Organize!",
        "movie": "Dr. Babasaheb Ambedkar",
        "year": 2000,
        "actor": "Mammootty",
        "character": "Dr. B.R. Ambedkar",
        "imdb_rating": 7.8,
        "genre": "Biography / Drama / History",
        "tag": "classic"
    },

    # The Legend of Bhagat Singh (2002) - IMDb: 8.1
    {
        "dialogue": "Zindagi toh apne damm par hi jee jaati hai, doosron ke kandhon par toh sirf janaaze uthaye jaate hain.",
        "english": "Life is lived on one's own courage, on the shoulders of others only funeral processions are carried.",
        "movie": "The Legend of Bhagat Singh",
        "year": 2002,
        "actor": "Ajay Devgn",
        "character": "Bhagat Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Aap vyakti ko maar sakte hain, par uske vichaaron ko nahi.",
        "english": "You can kill an individual, but you cannot kill his ideas.",
        "movie": "The Legend of Bhagat Singh",
        "year": 2002,
        "actor": "Ajay Devgn",
        "character": "Bhagat Singh",
        "imdb_rating": 8.1,
        "genre": "Action / Biography / Drama",
        "tag": "classic"
    },

    # Nayak: The Real Hero (2001) - IMDb: 7.8
    {
        "dialogue": "Ek din ka CM... aazma ke dekh lo!",
        "english": "Chief Minister for one day... test me and see!",
        "movie": "Nayak: The Real Hero",
        "year": 2001,
        "actor": "Anil Kapoor",
        "character": "Shivaji Rao Gaekwad",
        "imdb_rating": 7.8,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Chhota aadmi gunde se darta hai, police se darta hai, kanoon se darta hai... bas shant rehta hai.",
        "english": "The common man fears thugs, fears the police, fears the law... and remains silently enduring.",
        "movie": "Nayak: The Real Hero",
        "year": 2001,
        "actor": "Anil Kapoor",
        "character": "Shivaji Rao Gaekwad",
        "imdb_rating": 7.8,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # Welcome (2007) - IMDb: 7.0
    {
        "dialogue": "Control Majnu, control!",
        "english": "Control Majnu, keep control!",
        "movie": "Welcome",
        "year": 2007,
        "actor": "Anil Kapoor",
        "character": "Majnu Bhai",
        "imdb_rating": 7.0,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Meri ek taang nakli hai, main hockey ka bahut bada khiladi tha!",
        "english": "One of my legs is artificial, I used to be a great hockey player!",
        "movie": "Welcome",
        "year": 2007,
        "actor": "Nana Patekar",
        "character": "Uday Shetty",
        "imdb_rating": 7.0,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Aaloo le lo, kanda le lo!",
        "english": "Buy potatoes, buy onions!",
        "movie": "Welcome",
        "year": 2007,
        "actor": "Nana Patekar",
        "character": "Uday Shetty",
        "imdb_rating": 7.0,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Krantiveer (1994) - IMDb: 7.4
    {
        "dialogue": "Yeh musalman ka khoon hai aur yeh hindu ka khoon hai... bata isme kaunsa hindu ka hai aur kaunsa musalman ka?",
        "english": "This is a Muslim's blood and this is a Hindu's blood... tell me which one belongs to the Hindu and which to the Muslim?",
        "movie": "Krantiveer",
        "year": 1994,
        "actor": "Nana Patekar",
        "character": "Pratap Narayan Tilak",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Aa gaye meri maut ka tamasha dekhne?",
        "english": "Have you all gathered to watch the spectacle of my execution?",
        "movie": "Krantiveer",
        "year": 1994,
        "actor": "Nana Patekar",
        "character": "Pratap Narayan Tilak",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Parinda (1989) - IMDb: 7.8
    {
        "dialogue": "Dhande mein koi kisi ka saga nahi hota.",
        "english": "In this underworld business, no one is truly your own kin.",
        "movie": "Parinda",
        "year": 1989,
        "actor": "Nana Patekar",
        "character": "Anna Seth",
        "imdb_rating": 7.8,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Ab Tak Chhappan (2004) - IMDb: 7.8
    {
        "dialogue": "Apan encounter specialist hai, conversation specialist nahi.",
        "english": "I am an encounter specialist, not a conversation specialist.",
        "movie": "Ab Tak Chhappan",
        "year": 2004,
        "actor": "Nana Patekar",
        "character": "Inspector Sadhu Agashe",
        "imdb_rating": 7.8,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Raajneeti (2010) - IMDb: 7.1
    {
        "dialogue": "Kanoon andha hota hai par kursi ke paas sabki aankhein hoti hain.",
        "english": "The law may be blind, but the seat of political power possesses everyone's eyes.",
        "movie": "Raajneeti",
        "year": 2010,
        "actor": "Nana Patekar",
        "character": "Brij Gopal",
        "imdb_rating": 7.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Karsewa ho ya rajneeti, khoon sabka laal hi nikalta hai.",
        "english": "Whether volunteer service or ruthless politics, everyone bleeds the same red blood.",
        "movie": "Raajneeti",
        "year": 2010,
        "actor": "Manoj Bajpayee",
        "character": "Veerendra Pratap",
        "imdb_rating": 7.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Gangs of Wasseypur - Part 2 (2012)
    {
        "dialogue": "Goli nahi marenge saale ko, keh ke lenge uski!",
        "english": "We won't just shoot him quietly, we'll openly announce our vengeance and dismantle him!",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Nawazuddin Siddiqui",
        "character": "Faizal Khan",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Permission leni padti hai haath lagane se pehle.",
        "english": "You need permission before placing your hand on someone.",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Huma Qureshi",
        "character": "Mohsina Hamid",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Perpendicular aur Tangent... Wasseypur ke do anmol ratan!",
        "english": "Perpendicular and Tangent... the two priceless gems of Wasseypur!",
        "movie": "Gangs of Wasseypur",
        "year": 2012,
        "actor": "Aditya Kumar",
        "character": "Perpendicular",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Badmaash Company (2010) - IMDb: 6.0
    {
        "dialogue": "Bade se bada business... paise se nahi, ek bade idea se banta hai.",
        "english": "The biggest businesses... aren't built on money, but on one big idea.",
        "movie": "Badmaash Company",
        "year": 2010,
        "actor": "Shahid Kapoor",
        "character": "Karan Kapoor",
        "imdb_rating": 6.0,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Kaminey (2009) - IMDb: 7.4
    {
        "dialogue": "Life mein do hi raste hote hain... seedha ya ulta. Main beech ka rasta chunta hoon.",
        "english": "In life there are only two paths... straight or reverse. I choose the path right down the middle.",
        "movie": "Kaminey",
        "year": 2009,
        "actor": "Shahid Kapoor",
        "character": "Charlie / Guddu Sharma",
        "imdb_rating": 7.4,
        "genre": "Action / Comedy / Crime",
        "tag": "classic"
    },

    # Udta Punjab (2016) - IMDb: 7.7
    {
        "dialogue": "Speed 140, heartbeat 200... Tommy Singh in the house!",
        "english": "Speed 140, heartbeat 200... Tommy Singh in the house!",
        "movie": "Udta Punjab",
        "year": 2016,
        "actor": "Shahid Kapoor",
        "character": "Tejinder 'Tommy' Singh",
        "imdb_rating": 7.7,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Delhi Belly (2011) - IMDb: 7.6
    {
        "dialogue": "Sir, yeh tatti hai!",
        "english": "Sir, this is shit!",
        "movie": "Delhi Belly",
        "year": 2011,
        "actor": "Vijay Raaz",
        "character": "Somayajulu",
        "imdb_rating": 7.6,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Bhaag D.K. Bose, D.K. Bose, D.K. Bose... bhaag!",
        "english": "Run D.K. Bose, D.K. Bose, D.K. Bose... run!",
        "movie": "Delhi Belly",
        "year": 2011,
        "actor": "Imran Khan",
        "character": "Tashi Dorjee Lhatoo",
        "imdb_rating": 7.6,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Run (2004) - IMDb: 5.3 (Cult Comedy Dialogue)
    {
        "dialogue": "Chhoti Ganga bolke naale mein kooda diya saala!",
        "english": "They claimed it was the holy river Ganga and made me jump into an open sewer gutter!",
        "movie": "Run",
        "year": 2004,
        "actor": "Vijay Raaz",
        "character": "Ganesh",
        "imdb_rating": 5.3,
        "genre": "Action / Comedy / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Kaua biryani khila diya re baba!",
        "english": "They fed me crow biryani in the name of chicken!",
        "movie": "Run",
        "year": 2004,
        "actor": "Vijay Raaz",
        "character": "Ganesh",
        "imdb_rating": 5.3,
        "genre": "Action / Comedy / Romance",
        "tag": "classic"
    },

    # Dhamaal (2007) - IMDb: 7.4
    {
        "dialogue": "W ke neeche 10 crore hain!",
        "english": "Ten crores are buried under the big 'W'!",
        "movie": "Dhamaal",
        "year": 2007,
        "actor": "Sanjay Dutt & Arshad Warsi",
        "character": "Inspector Kabir & Aditya",
        "imdb_rating": 7.4,
        "genre": "Adventure / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Muthuswamy Venugopal Iyer... Prabhakarna Sripalawardhana Atapattu Jayasuriya Laxmansriramkrishna Shivavenkata Rajasekara Sriniwasana Trichipalli Yekyaparambir Muthuswami Venugopal Iyer!",
        "english": "The famously hilarious endless South Indian name introduction!",
        "movie": "Dhamaal",
        "year": 2007,
        "actor": "Vinay Apte",
        "character": "Driver",
        "imdb_rating": 7.4,
        "genre": "Adventure / Comedy / Crime",
        "tag": "classic"
    },

    # Golmaal: Fun Unlimited (2006) - IMDb: 7.5
    {
        "dialogue": "Ooooo... aeee... aiii!",
        "english": "The signature hilarious speech sound of Lucky!",
        "movie": "Golmaal: Fun Unlimited",
        "year": 2006,
        "actor": "Tusshar Kapoor",
        "character": "Lucky",
        "imdb_rating": 7.5,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hum log andhe hain, behre nahi!",
        "english": "We are blind, not deaf!",
        "movie": "Golmaal: Fun Unlimited",
        "year": 2006,
        "actor": "Paresh Rawal",
        "character": "Somnath",
        "imdb_rating": 7.5,
        "genre": "Action / Comedy / Drama",
        "tag": "classic"
    },

    # Khosla Ka Ghosla! (2006) - IMDb: 8.3
    {
        "dialogue": "Khurana sahab, yeh zameen meri hai!",
        "english": "Khurana sir, this plot of land belongs to me!",
        "movie": "Khosla Ka Ghosla!",
        "year": 2006,
        "actor": "Anupam Kher",
        "character": "K.K. Khosla",
        "imdb_rating": 8.3,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Aapki chhati pe moong dalenge!",
        "english": "We will stand right over your chest and grind lentils!",
        "movie": "Khosla Ka Ghosla!",
        "year": 2006,
        "actor": "Boman Irani",
        "character": "Kishan Khurana",
        "imdb_rating": 8.3,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Oye Lucky! Lucky Oye! (2008) - IMDb: 7.7
    {
        "dialogue": "Lucky banega crorepati!",
        "english": "Lucky will become a multi-millionaire!",
        "movie": "Oye Lucky! Lucky Oye!",
        "year": 2008,
        "actor": "Abhay Deol",
        "character": "Lucky",
        "imdb_rating": 7.7,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Dev.D (2009) - IMDb: 7.9
    {
        "dialogue": "Emotional atyachar!",
        "english": "Emotional tyranny!",
        "movie": "Dev.D",
        "year": 2009,
        "actor": "Abhay Deol",
        "character": "Dev",
        "imdb_rating": 7.9,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Manorama Six Feet Under (2007) - IMDb: 7.6
    {
        "dialogue": "Registan mein har raaz ret ke neeche dafan hota hai.",
        "english": "In the desert, every dark secret remains buried beneath the sand.",
        "movie": "Manorama Six Feet Under",
        "year": 2007,
        "actor": "Abhay Deol",
        "character": "Satyaveer Singh Randhawa",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },

    # Shahid (2012) - IMDb: 8.2
    {
        "dialogue": "Kanoon sabke liye barabar hai, chahe woh kisi bhi dharam ka ho.",
        "english": "The law is equal for everyone, regardless of what faith they follow.",
        "movie": "Shahid",
        "year": 2012,
        "actor": "Rajkummar Rao",
        "character": "Shahid Azmi",
        "imdb_rating": 8.2,
        "genre": "Biography / Drama",
        "tag": "classic"
    },

    # Aligarh (2015) - IMDb: 7.8
    {
        "dialogue": "Meri privacy meri marzi hai, isme kisi aur ka dakhla manzoor nahi.",
        "english": "My privacy is my sovereign right, no external intrusion is acceptable.",
        "movie": "Aligarh",
        "year": 2015,
        "actor": "Manoj Bajpayee",
        "character": "Prof. Ramchandra Siras",
        "imdb_rating": 7.8,
        "genre": "Biography / Drama",
        "tag": "classic"
    },

    # Bhool Bhulaiyaa (2007) - IMDb: 7.4
    {
        "dialogue": "Ami je tomar, shudhu je tomar... aami je tomar!",
        "english": "I am yours, only yours... forever yours!",
        "movie": "Bhool Bhulaiyaa",
        "year": 2007,
        "actor": "Vidya Balan",
        "character": "Avni / Manjulika",
        "imdb_rating": 7.4,
        "genre": "Comedy / Horror / Mystery",
        "tag": "classic"
    },
    {
        "dialogue": "Beti pushpa kahan jaa rahi ho?",
        "english": "Daughter Pushpa, where are you wandering off to?",
        "movie": "Bhool Bhulaiyaa",
        "year": 2007,
        "actor": "Akshay Kumar",
        "character": "Dr. Aditya Shrivastav",
        "imdb_rating": 7.4,
        "genre": "Comedy / Horror / Mystery",
        "tag": "classic"
    },

    # The Dirty Picture (2011) - IMDb: 6.7
    {
        "dialogue": "Filmein sirf teen cheezon ki wajah se chalti hain: Entertainment, Entertainment, Entertainment! Aur main entertainment hoon!",
        "english": "Movies run solely because of three things: Entertainment, Entertainment, Entertainment! And I am entertainment!",
        "movie": "The Dirty Picture",
        "year": 2011,
        "actor": "Vidya Balan",
        "character": "Reshma / Silk",
        "imdb_rating": 6.7,
        "genre": "Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Jab shareer saath deta hai toh sab saath dete hain.",
        "english": "When your youth and body are on your side, the entire world stands with you.",
        "movie": "The Dirty Picture",
        "year": 2011,
        "actor": "Vidya Balan",
        "character": "Reshma / Silk",
        "imdb_rating": 6.7,
        "genre": "Biography / Drama",
        "tag": "classic"
    },

    # Kahaani (2012)
    {
        "dialogue": "Kolkata aakar koi khota nahi, sab mil jaate hain.",
        "english": "No one gets lost in Kolkata, everyone finds what they seek.",
        "movie": "Kahaani",
        "year": 2012,
        "actor": "Vidya Balan",
        "character": "Vidya Bagchi",
        "imdb_rating": 8.1,
        "genre": "Mystery / Thriller",
        "tag": "classic"
    },

    # Tumhari Sulu (2017) - IMDb: 7.0
    {
        "dialogue": "Hello... main Sulu bol rahi hoon, aapki apni Sulu!",
        "english": "Hello... this is Sulu speaking, your very own Sulu!",
        "movie": "Tumhari Sulu",
        "year": 2017,
        "actor": "Vidya Balan",
        "character": "Sulochana 'Sulu' Dubey",
        "imdb_rating": 7.0,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Jalsa (2022) - IMDb: 6.6
    {
        "dialogue": "Sach ko dabana aasan hai, par uske bojh ke saath jeena namumkin.",
        "english": "Suppressing the truth is easy, but living under its crushing weight is impossible.",
        "movie": "Jalsa",
        "year": 2022,
        "actor": "Vidya Balan",
        "character": "Maya Menon",
        "imdb_rating": 6.6,
        "genre": "Drama / Thriller",
        "tag": "modern"
    },

    # Mardaani (2014) - IMDb: 7.3
    {
        "dialogue": "Tu ladkiyon ko bechta hai na? Main tujhe aisi jagah bhejoongi jahan tera wajood mita diya jayega!",
        "english": "You traffic innocent girls, don't you? I will send you to a place where your very existence will be wiped out!",
        "movie": "Mardaani",
        "year": 2014,
        "actor": "Rani Mukerji",
        "character": "Senior Inspector Shivani Shivaji Roy",
        "imdb_rating": 7.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Hichki (2018) - IMDb: 7.5
    {
        "dialogue": "There are no bad students, only bad teachers.",
        "english": "There are no bad students, only bad teachers.",
        "movie": "Hichki",
        "year": 2018,
        "actor": "Rani Mukerji",
        "character": "Naina Mathur",
        "imdb_rating": 7.5,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Hum Tum (2004) - IMDb: 7.0
    {
        "dialogue": "Ladka aur ladki kabhi sirf dost nahi ho sakte.",
        "english": "A boy and a girl can never just be platonic friends.",
        "movie": "Hum Tum",
        "year": 2004,
        "actor": "Saif Ali Khan",
        "character": "Karan Kapoor",
        "imdb_rating": 7.0,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Bunty Aur Babli (2005) - IMDb: 6.2
    {
        "dialogue": "Hum duniya ko batayenge ki Bunty aur Babli kaun hain!",
        "english": "We will show the entire world who Bunty and Babli really are!",
        "movie": "Bunty Aur Babli",
        "year": 2005,
        "actor": "Abhishek Bachchan & Rani Mukerji",
        "character": "Rakesh & Vimmi",
        "imdb_rating": 6.2,
        "genre": "Adventure / Comedy / Crime",
        "tag": "classic"
    },

    # Yuva (2004) - IMDb: 7.4
    {
        "dialogue": "Student power ko kabhi underestimate mat karna.",
        "english": "Never underestimate the power of youth and students.",
        "movie": "Yuva",
        "year": 2004,
        "actor": "Ajay Devgn",
        "character": "Michael Mukherjee",
        "imdb_rating": 7.4,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Lallan Bihari naam hai mera... jo kehta hoon woh karta hoon!",
        "english": "Lallan Bihari is my name... what I say, I execute!",
        "movie": "Yuva",
        "year": 2004,
        "actor": "Abhishek Bachchan",
        "character": "Lallan Singh",
        "imdb_rating": 7.4,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # Shootout at Lokhandwala (2007) - IMDb: 7.1
    {
        "dialogue": "Maya Bhai ke ilaqe mein koi doosra bhai nahi chalega!",
        "english": "In Maya Bhai's territory, no other boss will ever rule!",
        "movie": "Shootout at Lokhandwala",
        "year": 2007,
        "actor": "Vivek Oberoi",
        "character": "Maya Dolas",
        "imdb_rating": 7.1,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Police ki goli par kisi ka naam nahi likha hota.",
        "english": "A police bullet doesn't carry anyone's name on it.",
        "movie": "Shootout at Lokhandwala",
        "year": 2007,
        "actor": "Sanjay Dutt",
        "character": "ACP Shamsher Khan",
        "imdb_rating": 7.1,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },

    # Vaastav: The Reality (1999) - IMDb: 8.0
    {
        "dialogue": "Asli hai, pachaas tola! Kitna? Pachaas tola!",
        "english": "It's genuine gold, fifty tolas! How much? Fifty tolas!",
        "movie": "Vaastav: The Reality",
        "year": 1999,
        "actor": "Sanjay Dutt",
        "character": "Raghunath 'Raghu' Namdev Shivalkar",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Maa, mujhe goli maar de... mujhe is nark se chhutkara dila de!",
        "english": "Mother, shoot me... free me from this living hell!",
        "movie": "Vaastav: The Reality",
        "year": 1999,
        "actor": "Sanjay Dutt",
        "character": "Raghunath 'Raghu' Namdev Shivalkar",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Kaante (2002) - IMDb: 6.6
    {
        "dialogue": "Chhe bhediye ek bank lootne gaye the... par unme se ek gaddaar tha.",
        "english": "Six wolves went to rob a bank... but one of them was a traitor.",
        "movie": "Kaante",
        "year": 2002,
        "actor": "Amitabh Bachchan",
        "character": "Yashvardhan 'Major' Rampal",
        "imdb_rating": 6.6,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Dus (2005) - IMDb: 5.6
    {
        "dialogue": "Dus bahane karke le gaye dil!",
        "english": "Making ten excuses, they took my heart away!",
        "movie": "Dus",
        "year": 2005,
        "actor": "Sanjay Dutt & Abhishek Bachchan",
        "character": "Siddhant & Shashank",
        "imdb_rating": 5.6,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Shootout at Wadala (2013) - IMDb: 6.0
    {
        "dialogue": "Manya sar jhukana nahi jaanta, bas sar kaatna jaanta hai!",
        "english": "Manya doesn't know how to bow his head, he only knows how to sever heads!",
        "movie": "Shootout at Wadala",
        "year": 2013,
        "actor": "John Abraham",
        "character": "Manya Surve",
        "imdb_rating": 6.0,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Kutta agar bhonke toh pathar nahi maarte, goli chalate hain!",
        "english": "When a dog barks, you don't throw stones, you pull the trigger!",
        "movie": "Shootout at Wadala",
        "year": 2013,
        "actor": "Anil Kapoor",
        "character": "ACP Isaque Bagwan",
        "imdb_rating": 6.0,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },

    # Force (2011) - IMDb: 6.4
    {
        "dialogue": "Main khiladi nahi, shikari hoon!",
        "english": "I am not a player, I am a hunter!",
        "movie": "Force",
        "year": 2011,
        "actor": "John Abraham",
        "character": "ACP Yashvardhan",
        "imdb_rating": 6.4,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Batla House (2019) - IMDb: 7.2
    {
        "dialogue": "Encounter sachha tha ya jhootha, yeh faisla court karega.",
        "english": "Whether the encounter was genuine or staged, the court will decide.",
        "movie": "Batla House",
        "year": 2019,
        "actor": "John Abraham",
        "character": "DCP Sanjeev Kumar Yadav",
        "imdb_rating": 7.2,
        "genre": "Action / Biography / Drama",
        "tag": "modern"
    },

    # Madras Cafe (2013) - IMDb: 7.7
    {
        "dialogue": "Jung mein sabse pehla shikaar sach hota hai.",
        "english": "In war, the very first casualty is the truth.",
        "movie": "Madras Cafe",
        "year": 2013,
        "actor": "John Abraham",
        "character": "Major Vikram Singh",
        "imdb_rating": 7.7,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # Parmanu: The Story of Pokhran (2018) - IMDb: 7.6
    {
        "dialogue": "Jab tak hum kisi se darenge, tab tak woh humein darate rahenge.",
        "english": "As long as we fear anyone, they will keep intimidating us.",
        "movie": "Parmanu: The Story of Pokhran",
        "year": 2018,
        "actor": "John Abraham",
        "character": "Captain Ashwat Raina",
        "imdb_rating": 7.6,
        "genre": "Action / Drama / History",
        "tag": "modern"
    },

    # Satyameva Jayate (2018) - IMDb: 5.6
    {
        "dialogue": "Ravan ko maarne ke liye Ram ko aana hi padta hai.",
        "english": "To vanquish Ravana, Lord Rama must always arrive.",
        "movie": "Satyameva Jayate",
        "year": 2018,
        "actor": "John Abraham",
        "character": "Virendra Rathod",
        "imdb_rating": 5.6,
        "genre": "Action / Crime / Thriller",
        "tag": "modern"
    },

    # Pink (2016) - IMDb: 8.1
    {
        "dialogue": "No means no! No is not just a word, it's a complete sentence.",
        "english": "No means no! No is not just a word, it is a complete sentence.",
        "movie": "Pink",
        "year": 2016,
        "actor": "Amitabh Bachchan",
        "character": "Deepak Sehgal",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Ladkiyon ke charitra ka certificate unke kapdon se nahi diya jata.",
        "english": "A woman's character certificate is not issued based on the clothes she wears.",
        "movie": "Pink",
        "year": 2016,
        "actor": "Amitabh Bachchan",
        "character": "Deepak Sehgal",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Badla (2019) - IMDb: 7.8
    {
        "dialogue": "Badla lene se behtar hai sach ko bahar lana.",
        "english": "Better than exacting revenge is bringing the truth out to light.",
        "movie": "Badla",
        "year": 2019,
        "actor": "Amitabh Bachchan",
        "character": "Badal Gupta",
        "imdb_rating": 7.8,
        "genre": "Crime / Drama / Mystery",
        "tag": "modern"
    },

    # Paa (2009) - IMDb: 7.1
    {
        "dialogue": "Auro ko dekho, Auro kitna khush rehta hai!",
        "english": "Look at Auro, how full of joy Auro always remains!",
        "movie": "Paa",
        "year": 2009,
        "actor": "Amitabh Bachchan",
        "character": "Auro",
        "imdb_rating": 7.1,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Kabhi Alvida Naa Kehna (2006) - IMDb: 6.0
    {
        "dialogue": "Kabhi alvida naa kehna... kyunki alvida kehne se phir milne ki umeed khatam ho jaati hai.",
        "english": "Never say goodbye... because saying goodbye extinguishes the hope of meeting once again.",
        "movie": "Kabhi Alvida Naa Kehna",
        "year": 2006,
        "actor": "Shah Rukh Khan & Rani Mukerji",
        "character": "Dev Saran & Maya Talwar",
        "imdb_rating": 6.0,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # My Name Is Khan (2010) - IMDb: 7.9
    {
        "dialogue": "My name is Khan, and I am not a terrorist.",
        "english": "My name is Khan, and I am not a terrorist.",
        "movie": "My Name Is Khan",
        "year": 2010,
        "actor": "Shah Rukh Khan",
        "character": "Rizwan Khan",
        "imdb_rating": 7.9,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Duniya mein sirf do tarah ke log hote hain: achhe log jo achha kaam karte hain, aur bure log jo bura kaam karte hain.",
        "english": "In this world there are only two kinds of people: good people who do good deeds, and bad people who do bad deeds.",
        "movie": "My Name Is Khan",
        "year": 2010,
        "actor": "Shah Rukh Khan",
        "character": "Rizwan Khan",
        "imdb_rating": 7.9,
        "genre": "Drama",
        "tag": "classic"
    },

    # Fan (2016) - IMDb: 6.9
    {
        "dialogue": "Gaurav hai toh Aryan hai, Gaurav nahi toh Aryan kuch bhi nahi!",
        "english": "If Gaurav exists, Aryan exists; without Gaurav, Aryan is nothing!",
        "movie": "Fan",
        "year": 2016,
        "actor": "Shah Rukh Khan",
        "character": "Gaurav Chandna",
        "imdb_rating": 6.9,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # Dear Zindagi (2016) - IMDb: 7.4
    {
        "dialogue": "Don't let the past extort your present to ruin a beautiful future.",
        "english": "Don't let the past extort your present to ruin a beautiful future.",
        "movie": "Dear Zindagi",
        "year": 2016,
        "actor": "Shah Rukh Khan",
        "character": "Dr. Jehangir 'Jug' Khan",
        "imdb_rating": 7.4,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Zindagi ek puzzle ki tarah hai, har tukda apni jagah pe lag hi jaata hai.",
        "english": "Life is like a puzzle, every piece eventually finds its rightful place.",
        "movie": "Dear Zindagi",
        "year": 2016,
        "actor": "Alia Bhatt",
        "character": "Kaira 'Koko'",
        "imdb_rating": 7.4,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Dil Dhadakne Do (2015)
    {
        "dialogue": "Pyaar mein shart nahi hoti, bas saath hota hai.",
        "english": "In love there are no conditions, only companionship.",
        "movie": "Dil Dhadakne Do",
        "year": 2015,
        "actor": "Anil Kapoor",
        "character": "Kamal Mehra",
        "imdb_rating": 7.0,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Kapoor & Sons (2016) - IMDb: 7.7
    {
        "dialogue": "Parivaar perfect nahi hota, par parivaar parivaar hota hai.",
        "english": "Families are never perfect, but family is still family.",
        "movie": "Kapoor & Sons",
        "year": 2016,
        "actor": "Rishi Kapoor",
        "character": "Amarjeet Kapoor (Dadu)",
        "imdb_rating": 7.7,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Karwaan (2018) - IMDb: 7.6
    {
        "dialogue": "Raste badalte hain, manzil nahi badalti.",
        "english": "Paths may diverge and change, but the true destination remains unchanged.",
        "movie": "Karwaan",
        "year": 2018,
        "actor": "Irrfan Khan",
        "character": "Shaukat",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Log aate hain, chale jaate hain... yaadein reh jaati hain.",
        "english": "People arrive, people depart... the memories linger on.",
        "movie": "Karwaan",
        "year": 2018,
        "actor": "Dulquer Salmaan",
        "character": "Avinash",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # October (2018) - IMDb: 7.5
    {
        "dialogue": "Woh mujhe kyun dhoondh rahi thi?",
        "english": "Why was she asking for me?",
        "movie": "October",
        "year": 2018,
        "actor": "Varun Dhawan",
        "character": "Danish 'Dan' Walia",
        "imdb_rating": 7.5,
        "genre": "Drama / Romance",
        "tag": "modern"
    },

    # Badlapur (2015)
    {
        "dialogue": "Dard ka ilaj sirf dard hota hai.",
        "english": "The only remedy for deep agony is more agony.",
        "movie": "Badlapur",
        "year": 2015,
        "actor": "Varun Dhawan",
        "character": "Raghav 'Raghu' Purohit",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Bhediya (2022) - IMDb: 6.8
    {
        "dialogue": "Jungle mein rehna hai toh jungle ke niyam maanne padenge!",
        "english": "If you wish to live in the wild, you must obey the laws of the forest!",
        "movie": "Bhediya",
        "year": 2022,
        "actor": "Varun Dhawan",
        "character": "Bhaskar",
        "imdb_rating": 6.8,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },

    # Satyaprem Ki Katha (2023) - IMDb: 6.8
    {
        "dialogue": "Sach bolne ki himmat har kisi mein nahi hoti.",
        "english": "Not everyone possesses the fortitude to speak the naked truth.",
        "movie": "Satyaprem Ki Katha",
        "year": 2023,
        "actor": "Kartik Aaryan",
        "character": "Satyaprem 'Sattu'",
        "imdb_rating": 6.8,
        "genre": "Comedy / Drama / Romance",
        "tag": "modern"
    },

    # Pyaar Ka Punchnama (2011) - IMDb: 7.6
    {
        "dialogue": "Problem yeh hai ki woh ladki hai aur problem yeh hai ki main usse pyaar karta hoon! (The Famous 5-Minute Monologue)",
        "english": "The problem is she is a girl, and the problem is I love her! (The Famous 5-Minute Monologue)",
        "movie": "Pyaar Ka Punchnama",
        "year": 2011,
        "actor": "Kartik Aaryan",
        "character": "Rajat 'Raju' Mridul",
        "imdb_rating": 7.6,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Sonu Ke Titu Ki Sweety (2018) - IMDb: 7.1
    {
        "dialogue": "Dosti aur ladki mein hamesha ladki jeetti hai, par Sonu ke case mein aisa nahi hoga!",
        "english": "Between friendship and a woman, women always win, but in Sonu's case that won't happen!",
        "movie": "Sonu Ke Titu Ki Sweety",
        "year": 2018,
        "actor": "Kartik Aaryan",
        "character": "Sonu Sharma",
        "imdb_rating": 7.1,
        "genre": "Comedy / Romance",
        "tag": "modern"
    },

    # Bhool Bhulaiyaa 2 (2022) - IMDb: 5.7
    {
        "dialogue": "Main aatmaon se baat karta hoon!",
        "english": "I converse with wandering spirits!",
        "movie": "Bhool Bhulaiyaa 2",
        "year": 2022,
        "actor": "Kartik Aaryan",
        "character": "Rooh Baba / Ruhaan Randhawa",
        "imdb_rating": 5.7,
        "genre": "Comedy / Horror",
        "tag": "modern"
    },

    # Kedarnath (2018) - IMDb: 6.8
    {
        "dialogue": "Mandir aur masjid ke upar ek aasmaan hota hai jahan sab ek hain.",
        "english": "Above every temple and mosque lies a single open sky where all are one.",
        "movie": "Kedarnath",
        "year": 2018,
        "actor": "Sushant Singh Rajput",
        "character": "Mansoor Khan",
        "imdb_rating": 6.8,
        "genre": "Drama / Romance",
        "tag": "modern"
    },

    # Raabta (2017) - IMDb: 4.8
    {
        "dialogue": "Kuch rishte sadiyon purane hote hain.",
        "english": "Some bonds span across centuries.",
        "movie": "Raabta",
        "year": 2017,
        "actor": "Sushant Singh Rajput",
        "character": "Shiv Kakkar / Jilaan",
        "imdb_rating": 4.8,
        "genre": "Action / Drama / Fantasy",
        "tag": "modern"
    },

    # Sonchiriya (2019) - IMDb: 7.9
    {
        "dialogue": "Vakeel aur judge police ke haath mein hote hain, par baaghi sirf apne dharam ke haath mein.",
        "english": "Lawyers and judges are in the pocket of the police, but a rebel answers only to his conscience.",
        "movie": "Sonchiriya",
        "year": 2019,
        "actor": "Sushant Singh Rajput",
        "character": "Lakhna",
        "imdb_rating": 7.9,
        "genre": "Action / Crime / Drama",
        "tag": "modern"
    },

    # Lootera (2013) - IMDb: 7.4
    {
        "dialogue": "Aakhri patta girne se pehle main wapas aaunga.",
        "english": "Before the last leaf falls, I will return.",
        "movie": "Lootera",
        "year": 2013,
        "actor": "Ranveer Singh",
        "character": "Varun Shrivastav / Atmanand Tripathi",
        "imdb_rating": 7.4,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # 83 (2021) - IMDb: 7.5
    {
        "dialogue": "We are here to win!",
        "english": "We are here to win!",
        "movie": "83",
        "year": 2021,
        "actor": "Ranveer Singh",
        "character": "Kapil Dev",
        "imdb_rating": 7.5,
        "genre": "Biography / Drama / History",
        "tag": "modern"
    },
    {
        "dialogue": "Taste the success, once you taste it, you want it again and again!",
        "english": "Taste success, once you taste it, you crave it again and again!",
        "movie": "83",
        "year": 2021,
        "actor": "Ranveer Singh",
        "character": "Kapil Dev",
        "imdb_rating": 7.5,
        "genre": "Biography / Drama / History",
        "tag": "modern"
    },

    # Simmba (2018) - IMDb: 5.7
    {
        "dialogue": "Aaya police... Sangram Bhalerao!",
        "english": "Here comes the police... Sangram Bhalerao!",
        "movie": "Simmba",
        "year": 2018,
        "actor": "Ranveer Singh",
        "character": "Sangram 'Simmba' Bhalerao",
        "imdb_rating": 5.7,
        "genre": "Action / Comedy / Crime",
        "tag": "modern"
    },

    # Sooryavanshi (2021) - IMDb: 6.0
    {
        "dialogue": "Hindustan par buri nazar rakhne walon ka ek hi anjaam hota hai: maut!",
        "english": "Those who cast an evil eye on India meet only one fate: death!",
        "movie": "Sooryavanshi",
        "year": 2021,
        "actor": "Akshay Kumar",
        "character": "DCP Veer Sooryavanshi",
        "imdb_rating": 6.0,
        "genre": "Action / Crime / Thriller",
        "tag": "modern"
    },

    # Vicky Vidya Ka Woh Wala Video (2024) - IMDb: 5.8
    {
        "dialogue": "Hum 90s ke aashiq hain, CD player aur cassette ke zamane ke!",
        "english": "We are lovers from the 90s, from the era of CD players and cassette tapes!",
        "movie": "Vicky Vidya Ka Woh Wala Video",
        "year": 2024,
        "actor": "Rajkummar Rao",
        "character": "Vicky",
        "imdb_rating": 5.8,
        "genre": "Comedy / Drama",
        "tag": "modern"
    },

    # Jigra (2024) - IMDb: 6.5
    {
        "dialogue": "Bhai ko aanch aayi na, toh poori duniya ko cheer doongi!",
        "english": "If anyone harms my brother, I will tear the whole world apart!",
        "movie": "Jigra",
        "year": 2024,
        "actor": "Alia Bhatt",
        "character": "Satya Anand",
        "imdb_rating": 6.5,
        "genre": "Action / Drama / Thriller",
        "tag": "modern"
    }
]

print(f"Total curated dialogues: {len(dialogues_data)}")

# Format with ids d_1 to d_N
final_list = []
for idx, d in enumerate(dialogues_data, 1):
    item = {
        "id": f"d_{idx}",
        "category": "dialogue",
        "type": "dialogue",
        "dialogue": d["dialogue"],
        "english_translation": d["english"],
        "answer": d["movie"].upper(),
        "movie": d["movie"],
        "year": str(d["year"]),
        "actor": d["actor"],
        "character": d["character"],
        "imdb_rating": d["imdb_rating"],
        "genre": d["genre"],
        "tag": d["tag"]
    }
    final_list.append(item)

# Save JSON file
out_json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'bollywood_200_dialogues.json')
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2, ensure_ascii=False)
print(f"Saved {len(final_list)} dialogues to {out_json_path}")

# Save Markdown reference file
out_md_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'bollywood_200_dialogues.md')
with open(out_md_path, 'w', encoding='utf-8') as f:
    f.write("# 🎬 Top 200 Famous Bollywood Dialogues (IMDb Master Collection)\n\n")
    f.write("A curated, production-ready dataset of the **200 most iconic, legendary, and culture-defining dialogues in Bollywood cinema history** from top IMDb films.\n\n")
    f.write("| # | Dialogue | Movie | Year | Star / Character | IMDb | Meaning |\n")
    f.write("|---|---|---|---|---|---|---|\n")
    for d in final_list:
        f.write(f"| {d['id']} | **\"{d['dialogue']}\"** | {d['movie']} | {d['year']} | {d['actor']} (*{d['character']}*) | ⭐ {d['imdb_rating']} | {d['english_translation']} |\n")

print(f"Saved markdown reference to {out_md_path}")
