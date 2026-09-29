import json
import os

hollywood_dialogues = [
    # The Godfather (1972) - IMDb: 9.2
    {
        "dialogue": "I'm gonna make him an offer he can't refuse.",
        "movie": "The Godfather",
        "year": "1972",
        "actor": "Marlon Brando",
        "character": "Don Vito Corleone",
        "imdb_rating": 9.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Leave the gun. Take the cannoli.",
        "movie": "The Godfather",
        "year": "1972",
        "actor": "Richard S. Castellano",
        "character": "Peter Clemenza",
        "imdb_rating": 9.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Look how they massacred my boy.",
        "movie": "The Godfather",
        "year": "1972",
        "actor": "Marlon Brando",
        "character": "Don Vito Corleone",
        "imdb_rating": 9.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "It's not personal, Sonny. It's strictly business.",
        "movie": "The Godfather",
        "year": "1972",
        "actor": "Al Pacino",
        "character": "Michael Corleone",
        "imdb_rating": 9.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "A man who doesn't spend time with his family can never be a real man.",
        "movie": "The Godfather",
        "year": "1972",
        "actor": "Marlon Brando",
        "character": "Don Vito Corleone",
        "imdb_rating": 9.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # The Godfather Part II & III (1974 / 1990) - IMDb: 9.0 / 7.6
    {
        "dialogue": "Keep your friends close, but your enemies closer.",
        "movie": "The Godfather Part II",
        "year": "1974",
        "actor": "Al Pacino",
        "character": "Michael Corleone",
        "imdb_rating": 9.0,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "I know it was you, Fredo. You broke my heart. You broke my heart!",
        "movie": "The Godfather Part II",
        "year": "1974",
        "actor": "Al Pacino",
        "character": "Michael Corleone",
        "imdb_rating": 9.0,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Just when I thought I was out, they pull me back in!",
        "movie": "The Godfather Part III",
        "year": "1990",
        "actor": "Al Pacino",
        "character": "Michael Corleone",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Star Wars Franchise (1977-1983) - IMDb: 8.6 / 8.7 / 8.3
    {
        "dialogue": "May the Force be with you.",
        "movie": "Star Wars: Episode IV - A New Hope",
        "year": "1977",
        "actor": "Harrison Ford",
        "character": "Han Solo",
        "imdb_rating": 8.6,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Help me, Obi-Wan Kenobi. You're my only hope.",
        "movie": "Star Wars: Episode IV - A New Hope",
        "year": "1977",
        "actor": "Carrie Fisher",
        "character": "Princess Leia",
        "imdb_rating": 8.6,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "These aren't the droids you're looking for.",
        "movie": "Star Wars: Episode IV - A New Hope",
        "year": "1977",
        "actor": "Alec Guinness",
        "character": "Obi-Wan Kenobi",
        "imdb_rating": 8.6,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "No, I am your father.",
        "movie": "Star Wars: Episode V - The Empire Strikes Back",
        "year": "1980",
        "actor": "James Earl Jones (voice)",
        "character": "Darth Vader",
        "imdb_rating": 8.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Do. Or do not. There is no try.",
        "movie": "Star Wars: Episode V - The Empire Strikes Back",
        "year": "1980",
        "actor": "Frank Oz (voice)",
        "character": "Yoda",
        "imdb_rating": 8.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "I love you. - I know.",
        "movie": "Star Wars: Episode V - The Empire Strikes Back",
        "year": "1980",
        "actor": "Harrison Ford & Carrie Fisher",
        "character": "Han Solo & Princess Leia",
        "imdb_rating": 8.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "It's a trap!",
        "movie": "Star Wars: Episode VI - Return of the Jedi",
        "year": "1983",
        "actor": "Erik Bauersfeld (voice)",
        "character": "Admiral Ackbar",
        "imdb_rating": 8.3,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # The Dark Knight Trilogy (2005-2012) - IMDb: 8.2 / 9.0 / 8.4
    {
        "dialogue": "Why so serious?",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Heath Ledger",
        "character": "The Joker",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "You either die a hero, or you live long enough to see yourself become the villain.",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Aaron Eckhart",
        "character": "Harvey Dent",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Some men just want to watch the world burn.",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Michael Caine",
        "character": "Alfred Pennyworth",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "It's not about money, it's about sending a message. Everything burns!",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Heath Ledger",
        "character": "The Joker",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Let's put a smile on that face!",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Heath Ledger",
        "character": "The Joker",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "I believe whatever doesn't kill you simply makes you... stranger.",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Heath Ledger",
        "character": "The Joker",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "He's the hero Gotham deserves, but not the one it needs right now.",
        "movie": "The Dark Knight",
        "year": "2008",
        "actor": "Gary Oldman",
        "character": "Jim Gordon",
        "imdb_rating": 9.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Why do we fall, Bruce? So that we can learn to pick ourselves up.",
        "movie": "Batman Begins",
        "year": "2005",
        "actor": "Michael Caine",
        "character": "Alfred Pennyworth",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "It's not who I am underneath, but what I do that defines me.",
        "movie": "Batman Begins",
        "year": "2005",
        "actor": "Christian Bale",
        "character": "Bruce Wayne / Batman",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Ah, you think darkness is your ally. You merely adopted the dark; I was born in it, molded by it.",
        "movie": "The Dark Knight Rises",
        "year": "2012",
        "actor": "Tom Hardy",
        "character": "Bane",
        "imdb_rating": 8.4,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "When Gotham is ashes, then you have my permission to die.",
        "movie": "The Dark Knight Rises",
        "year": "2012",
        "actor": "Tom Hardy",
        "character": "Bane",
        "imdb_rating": 8.4,
        "genre": "Action / Drama / Thriller",
        "tag": "classic"
    },

    # The Terminator Series (1984 / 1991) - IMDb: 8.1 / 8.6
    {
        "dialogue": "I'll be back.",
        "movie": "The Terminator",
        "year": "1984",
        "actor": "Arnold Schwarzenegger",
        "character": "The Terminator",
        "imdb_rating": 8.1,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Hasta la vista, baby.",
        "movie": "Terminator 2: Judgment Day",
        "year": "1991",
        "actor": "Arnold Schwarzenegger",
        "character": "The Terminator (T-800)",
        "imdb_rating": 8.6,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Come with me if you want to live.",
        "movie": "Terminator 2: Judgment Day",
        "year": "1991",
        "actor": "Arnold Schwarzenegger",
        "character": "The Terminator (T-800)",
        "imdb_rating": 8.6,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "There is no fate but what we make for ourselves.",
        "movie": "Terminator 2: Judgment Day",
        "year": "1991",
        "actor": "Linda Hamilton",
        "character": "Sarah Connor",
        "imdb_rating": 8.6,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },

    # Pulp Fiction (1994) - IMDb: 8.9
    {
        "dialogue": "Say 'what' again! I dare you, I double dare you, motherf***er, say 'what' one more Goddamn time!",
        "movie": "Pulp Fiction",
        "year": "1994",
        "actor": "Samuel L. Jackson",
        "character": "Jules Winnfield",
        "imdb_rating": 8.9,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.",
        "movie": "Pulp Fiction",
        "year": "1994",
        "actor": "Samuel L. Jackson",
        "character": "Jules Winnfield",
        "imdb_rating": 8.9,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "You know what they call a Quarter Pounder with Cheese in Paris? They call it a Royale with Cheese.",
        "movie": "Pulp Fiction",
        "year": "1994",
        "actor": "John Travolta",
        "character": "Vincent Vega",
        "imdb_rating": 8.9,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Zed's dead, baby. Zed's dead.",
        "movie": "Pulp Fiction",
        "year": "1994",
        "actor": "Bruce Willis",
        "character": "Butch Coolidge",
        "imdb_rating": 8.9,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Does he look like a bitch?!",
        "movie": "Pulp Fiction",
        "year": "1994",
        "actor": "Samuel L. Jackson",
        "character": "Jules Winnfield",
        "imdb_rating": 8.9,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Forrest Gump (1994) - IMDb: 8.8
    {
        "dialogue": "My mama always said, 'Life was like a box of chocolates. You never know what you're gonna get.'",
        "movie": "Forrest Gump",
        "year": "1994",
        "actor": "Tom Hanks",
        "character": "Forrest Gump",
        "imdb_rating": 8.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Run, Forrest, run!",
        "movie": "Forrest Gump",
        "year": "1994",
        "actor": "Robin Wright",
        "character": "Jenny Curran",
        "imdb_rating": 8.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Stupid is as stupid does.",
        "movie": "Forrest Gump",
        "year": "1994",
        "actor": "Tom Hanks",
        "character": "Forrest Gump",
        "imdb_rating": 8.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "I'm not a smart man... but I know what love is.",
        "movie": "Forrest Gump",
        "year": "1994",
        "actor": "Tom Hanks",
        "character": "Forrest Gump",
        "imdb_rating": 8.8,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # The Matrix (1999) - IMDb: 8.7
    {
        "dialogue": "You take the blue pill, the story ends. You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes.",
        "movie": "The Matrix",
        "year": "1999",
        "actor": "Laurence Fishburne",
        "character": "Morpheus",
        "imdb_rating": 8.7,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "There is no spoon.",
        "movie": "The Matrix",
        "year": "1999",
        "actor": "Rowan Witt",
        "character": "Spoon Boy",
        "imdb_rating": 8.7,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "I know kung fu.",
        "movie": "The Matrix",
        "year": "1999",
        "actor": "Keanu Reeves",
        "character": "Neo",
        "imdb_rating": 8.7,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Welcome to the real world.",
        "movie": "The Matrix",
        "year": "1999",
        "actor": "Laurence Fishburne",
        "character": "Morpheus",
        "imdb_rating": 8.7,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Dodge this.",
        "movie": "The Matrix",
        "year": "1999",
        "actor": "Carrie-Anne Moss",
        "character": "Trinity",
        "imdb_rating": 8.7,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },

    # Fight Club (1999) - IMDb: 8.8
    {
        "dialogue": "The first rule of ***** **** is: you do not talk about ***** ****.",
        "movie": "Fight Club",
        "year": "1999",
        "actor": "Brad Pitt",
        "character": "Tyler Durden",
        "imdb_rating": 8.8,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "The second rule of ***** **** is: you DO NOT talk about ***** ****!",
        "movie": "Fight Club",
        "year": "1999",
        "actor": "Brad Pitt",
        "character": "Tyler Durden",
        "imdb_rating": 8.8,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "It's only after we've lost everything that we're free to do anything.",
        "movie": "Fight Club",
        "year": "1999",
        "actor": "Brad Pitt",
        "character": "Tyler Durden",
        "imdb_rating": 8.8,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "The things you own end up owning you.",
        "movie": "Fight Club",
        "year": "1999",
        "actor": "Brad Pitt",
        "character": "Tyler Durden",
        "imdb_rating": 8.8,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "His name is Robert Paulson.",
        "movie": "Fight Club",
        "year": "1999",
        "actor": "Meat Loaf & Edward Norton",
        "character": "Project Mayhem Members",
        "imdb_rating": 8.8,
        "genre": "Drama",
        "tag": "classic"
    },

    # The Lord of the Rings Trilogy (2001-2003) - IMDb: 8.9 / 8.8 / 9.0
    {
        "dialogue": "You shall not pass!",
        "movie": "The Lord of the Rings: The Fellowship of the Ring",
        "year": "2001",
        "actor": "Ian McKellen",
        "character": "Gandalf",
        "imdb_rating": 8.9,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "One does not simply walk into Mordor.",
        "movie": "The Lord of the Rings: The Fellowship of the Ring",
        "year": "2001",
        "actor": "Sean Bean",
        "character": "Boromir",
        "imdb_rating": 8.9,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Fly, you fools!",
        "movie": "The Lord of the Rings: The Fellowship of the Ring",
        "year": "2001",
        "actor": "Ian McKellen",
        "character": "Gandalf",
        "imdb_rating": 8.9,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "My precious!",
        "movie": "The Lord of the Rings: The Two Towers",
        "year": "2002",
        "actor": "Andy Serkis",
        "character": "Gollum",
        "imdb_rating": 8.8,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "There is some good in this world, Mr. Frodo, and it's worth fighting for.",
        "movie": "The Lord of the Rings: The Two Towers",
        "year": "2002",
        "actor": "Sean Astin",
        "character": "Samwise Gamgee",
        "imdb_rating": 8.8,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "For Frodo.",
        "movie": "The Lord of the Rings: The Return of the King",
        "year": "2003",
        "actor": "Viggo Mortensen",
        "character": "Aragorn",
        "imdb_rating": 9.0,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },

    # The Shawshank Redemption (1994) - IMDb: 9.3
    {
        "dialogue": "Get busy living, or get busy dying.",
        "movie": "The Shawshank Redemption",
        "year": "1994",
        "actor": "Tim Robbins",
        "character": "Andy Dufresne",
        "imdb_rating": 9.3,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
        "movie": "The Shawshank Redemption",
        "year": "1994",
        "actor": "Tim Robbins",
        "character": "Andy Dufresne",
        "imdb_rating": 9.3,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Andy Dufresne - who crawled through a river of shit and came out clean on the other side.",
        "movie": "The Shawshank Redemption",
        "year": "1994",
        "actor": "Morgan Freeman",
        "character": "Ellis Boyd 'Red' Redding",
        "imdb_rating": 9.3,
        "genre": "Drama",
        "tag": "classic"
    },

    # Gladiator (2000) - IMDb: 8.5
    {
        "dialogue": "My name is Maximus Decimus Meridius, commander of the Armies of the North... and I will have my vengeance, in this life or the next.",
        "movie": "Gladiator",
        "year": "2000",
        "actor": "Russell Crowe",
        "character": "Maximus",
        "imdb_rating": 8.5,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Are you not entertained?! Are you not entertained?! Is this not why you are here?!",
        "movie": "Gladiator",
        "year": "2000",
        "actor": "Russell Crowe",
        "character": "Maximus",
        "imdb_rating": 8.5,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "What we do in life echoes in eternity.",
        "movie": "Gladiator",
        "year": "2000",
        "actor": "Russell Crowe",
        "character": "Maximus",
        "imdb_rating": 8.5,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "At my signal, unleash hell.",
        "movie": "Gladiator",
        "year": "2000",
        "actor": "Russell Crowe",
        "character": "Maximus",
        "imdb_rating": 8.5,
        "genre": "Action / Adventure / Drama",
        "tag": "classic"
    },

    # Titanic (1997) - IMDb: 7.9
    {
        "dialogue": "I'm the king of the world!",
        "movie": "Titanic",
        "year": "1997",
        "actor": "Leonardo DiCaprio",
        "character": "Jack Dawson",
        "imdb_rating": 7.9,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Draw me like one of your French girls.",
        "movie": "Titanic",
        "year": "1997",
        "actor": "Kate Winslet",
        "character": "Rose DeWitt Bukater",
        "imdb_rating": 7.9,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "I'll never let go, Jack. I'll never let go.",
        "movie": "Titanic",
        "year": "1997",
        "actor": "Kate Winslet",
        "character": "Rose DeWitt Bukater",
        "imdb_rating": 7.9,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "A woman's heart is a deep ocean of secrets.",
        "movie": "Titanic",
        "year": "1997",
        "actor": "Gloria Stuart",
        "character": "Old Rose",
        "imdb_rating": 7.9,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # Scarface (1983) - IMDb: 8.3
    {
        "dialogue": "Say hello to my little friend!",
        "movie": "Scarface",
        "year": "1983",
        "actor": "Al Pacino",
        "character": "Tony Montana",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "The eyes, chico. They never lie.",
        "movie": "Scarface",
        "year": "1983",
        "actor": "Al Pacino",
        "character": "Tony Montana",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Every day above ground is a good day.",
        "movie": "Scarface",
        "year": "1983",
        "actor": "Al Pacino",
        "character": "Tony Montana",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Casablanca (1942) - IMDb: 8.5
    {
        "dialogue": "Here's looking at you, kid.",
        "movie": "Casablanca",
        "year": "1942",
        "actor": "Humphrey Bogart",
        "character": "Rick Blaine",
        "imdb_rating": 8.5,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "Of all the gin joints in all the towns in all the world, she walks into mine.",
        "movie": "Casablanca",
        "year": "1942",
        "actor": "Humphrey Bogart",
        "character": "Rick Blaine",
        "imdb_rating": 8.5,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "Louis, I think this is the beginning of a beautiful friendship.",
        "movie": "Casablanca",
        "year": "1942",
        "actor": "Humphrey Bogart",
        "character": "Rick Blaine",
        "imdb_rating": 8.5,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "We'll always have Paris.",
        "movie": "Casablanca",
        "year": "1942",
        "actor": "Humphrey Bogart",
        "character": "Rick Blaine",
        "imdb_rating": 8.5,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "Round up the usual suspects.",
        "movie": "Casablanca",
        "year": "1942",
        "actor": "Claude Rains",
        "character": "Captain Louis Renault",
        "imdb_rating": 8.5,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },

    # The Silence of the Lambs (1991) - IMDb: 8.6
    {
        "dialogue": "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.",
        "movie": "The Silence of the Lambs",
        "year": "1991",
        "actor": "Anthony Hopkins",
        "character": "Dr. Hannibal Lecter",
        "imdb_rating": 8.6,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Well, Clarice... have the lambs stopped screaming?",
        "movie": "The Silence of the Lambs",
        "year": "1991",
        "actor": "Anthony Hopkins",
        "character": "Dr. Hannibal Lecter",
        "imdb_rating": 8.6,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "I'm having an old friend for dinner.",
        "movie": "The Silence of the Lambs",
        "year": "1991",
        "actor": "Anthony Hopkins",
        "character": "Dr. Hannibal Lecter",
        "imdb_rating": 8.6,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # The Shining (1980) - IMDb: 8.4
    {
        "dialogue": "Here's Johnny!",
        "movie": "The Shining",
        "year": "1980",
        "actor": "Jack Nicholson",
        "character": "Jack Torrance",
        "imdb_rating": 8.4,
        "genre": "Drama / Horror",
        "tag": "classic"
    },
    {
        "dialogue": "All work and no play makes Jack a dull boy.",
        "movie": "The Shining",
        "year": "1980",
        "actor": "Jack Nicholson",
        "character": "Jack Torrance",
        "imdb_rating": 8.4,
        "genre": "Drama / Horror",
        "tag": "classic"
    },
    {
        "dialogue": "Redrum! Redrum! Redrum!",
        "movie": "The Shining",
        "year": "1980",
        "actor": "Danny Lloyd",
        "character": "Danny Torrance",
        "imdb_rating": 8.4,
        "genre": "Drama / Horror",
        "tag": "classic"
    },

    # Taxi Driver (1976) - IMDb: 8.2
    {
        "dialogue": "You talkin' to me? You talkin' to me? Then who the hell else are you talkin' to? You talkin' to me? Well, I'm the only one here.",
        "movie": "Taxi Driver",
        "year": "1976",
        "actor": "Robert De Niro",
        "character": "Travis Bickle",
        "imdb_rating": 8.2,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Goodfellas (1990) - IMDb: 8.7
    {
        "dialogue": "As far back as I can remember, I always wanted to be a gangster.",
        "movie": "Goodfellas",
        "year": "1990",
        "actor": "Ray Liotta",
        "character": "Henry Hill",
        "imdb_rating": 8.7,
        "genre": "Biography / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Funny how? What's funny about it? Funny like a clown? Do I amuse you?",
        "movie": "Goodfellas",
        "year": "1990",
        "actor": "Joe Pesci",
        "character": "Tommy DeVito",
        "imdb_rating": 8.7,
        "genre": "Biography / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Now go home and get your f***in' shine box!",
        "movie": "Goodfellas",
        "year": "1990",
        "actor": "Joe Pesci",
        "character": "Tommy DeVito",
        "imdb_rating": 8.7,
        "genre": "Biography / Crime / Drama",
        "tag": "classic"
    },

    # Jaws (1975) - IMDb: 8.1
    {
        "dialogue": "You're gonna need a bigger boat.",
        "movie": "Jaws",
        "year": "1975",
        "actor": "Roy Scheider",
        "character": "Martin Brody",
        "imdb_rating": 8.1,
        "genre": "Adventure / Mystery / Thriller",
        "tag": "classic"
    },

    # A Few Good Men (1992) - IMDb: 7.7
    {
        "dialogue": "You can't handle the truth!",
        "movie": "A Few Good Men",
        "year": "1992",
        "actor": "Jack Nicholson",
        "character": "Col. Nathan R. Jessep",
        "imdb_rating": 7.7,
        "genre": "Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "I want the truth! - You can't handle the truth!",
        "movie": "A Few Good Men",
        "year": "1992",
        "actor": "Tom Cruise & Jack Nicholson",
        "character": "Lt. Daniel Kaffee & Col. Nathan R. Jessep",
        "imdb_rating": 7.7,
        "genre": "Drama / Thriller",
        "tag": "classic"
    },

    # Jerry Maguire (1996) - IMDb: 7.3
    {
        "dialogue": "Show me the money!",
        "movie": "Jerry Maguire",
        "year": "1996",
        "actor": "Tom Cruise & Cuba Gooding Jr.",
        "character": "Jerry Maguire & Rod Tidwell",
        "imdb_rating": 7.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "You had me at 'hello'.",
        "movie": "Jerry Maguire",
        "year": "1996",
        "actor": "Renée Zellweger",
        "character": "Dorothy Boyd",
        "imdb_rating": 7.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "You complete me.",
        "movie": "Jerry Maguire",
        "year": "1996",
        "actor": "Tom Cruise",
        "character": "Jerry Maguire",
        "imdb_rating": 7.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # The Sixth Sense (1999) - IMDb: 8.2
    {
        "dialogue": "I see dead people.",
        "movie": "The Sixth Sense",
        "year": "1999",
        "actor": "Haley Joel Osment",
        "character": "Cole Sear",
        "imdb_rating": 8.2,
        "genre": "Drama / Mystery / Thriller",
        "tag": "classic"
    },

    # Apollo 13 (1995) - IMDb: 7.7
    {
        "dialogue": "Houston, we have a problem.",
        "movie": "Apollo 13",
        "year": "1995",
        "actor": "Tom Hanks",
        "character": "Jim Lovell",
        "imdb_rating": 7.7,
        "genre": "Adventure / Drama / History",
        "tag": "classic"
    },
    {
        "dialogue": "Failure is not an option.",
        "movie": "Apollo 13",
        "year": "1995",
        "actor": "Ed Harris",
        "character": "Gene Kranz",
        "imdb_rating": 7.7,
        "genre": "Adventure / Drama / History",
        "tag": "classic"
    },

    # Apocalypse Now (1979) - IMDb: 8.4
    {
        "dialogue": "I love the smell of napalm in the morning.",
        "movie": "Apocalypse Now",
        "year": "1979",
        "actor": "Robert Duvall",
        "character": "Lt. Col. Bill Kilgore",
        "imdb_rating": 8.4,
        "genre": "Drama / Mystery / War",
        "tag": "classic"
    },
    {
        "dialogue": "The horror... the horror...",
        "movie": "Apocalypse Now",
        "year": "1979",
        "actor": "Marlon Brando",
        "character": "Colonel Walter E. Kurtz",
        "imdb_rating": 8.4,
        "genre": "Drama / Mystery / War",
        "tag": "classic"
    },

    # 2001: A Space Odyssey (1968) - IMDb: 8.3
    {
        "dialogue": "I'm sorry, Dave. I'm afraid I can't do that.",
        "movie": "2001: A Space Odyssey",
        "year": "1968",
        "actor": "Douglas Rain (voice)",
        "character": "HAL 9000",
        "imdb_rating": 8.3,
        "genre": "Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Open the pod bay doors, please, HAL.",
        "movie": "2001: A Space Odyssey",
        "year": "1968",
        "actor": "Keir Dullea",
        "character": "Dr. Dave Bowman",
        "imdb_rating": 8.3,
        "genre": "Adventure / Sci-Fi",
        "tag": "classic"
    },

    # The Wizard of Oz (1939) - IMDb: 8.1
    {
        "dialogue": "There's no place like home.",
        "movie": "The Wizard of Oz",
        "year": "1939",
        "actor": "Judy Garland",
        "character": "Dorothy Gale",
        "imdb_rating": 8.1,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Toto, I've a feeling we're not in Kansas anymore.",
        "movie": "The Wizard of Oz",
        "year": "1939",
        "actor": "Judy Garland",
        "character": "Dorothy Gale",
        "imdb_rating": 8.1,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "I'll get you, my pretty, and your little dog too!",
        "movie": "The Wizard of Oz",
        "year": "1939",
        "actor": "Margaret Hamilton",
        "character": "Wicked Witch of the West",
        "imdb_rating": 8.1,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Pay no attention to that man behind the curtain!",
        "movie": "The Wizard of Oz",
        "year": "1939",
        "actor": "Frank Morgan",
        "character": "The Wizard of Oz",
        "imdb_rating": 8.1,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },

    # Gone with the Wind (1939) - IMDb: 8.2
    {
        "dialogue": "Frankly, my dear, I don't give a damn.",
        "movie": "Gone with the Wind",
        "year": "1939",
        "actor": "Clark Gable",
        "character": "Rhett Butler",
        "imdb_rating": 8.2,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },
    {
        "dialogue": "After all, tomorrow is another day!",
        "movie": "Gone with the Wind",
        "year": "1939",
        "actor": "Vivien Leigh",
        "character": "Scarlett O'Hara",
        "imdb_rating": 8.2,
        "genre": "Drama / Romance / War",
        "tag": "classic"
    },

    # James Bond Franchise (1962-Present) - IMDb: 7.2-8.0
    {
        "dialogue": "Bond. James Bond.",
        "movie": "Dr. No",
        "year": "1962",
        "actor": "Sean Connery",
        "character": "James Bond",
        "imdb_rating": 7.2,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "A martini. Shaken, not stirred.",
        "movie": "Goldfinger",
        "year": "1964",
        "actor": "Sean Connery",
        "character": "James Bond",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "No, Mr. Bond, I expect you to die!",
        "movie": "Goldfinger",
        "year": "1964",
        "actor": "Gert Fröbe",
        "character": "Auric Goldfinger",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },

    # Back to the Future Trilogy (1985-1990) - IMDb: 8.5 / 7.8 / 7.4
    {
        "dialogue": "Roads? Where we're going, we don't need roads.",
        "movie": "Back to the Future",
        "year": "1985",
        "actor": "Christopher Lloyd",
        "character": "Dr. Emmett Brown",
        "imdb_rating": 8.5,
        "genre": "Adventure / Comedy / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "If my calculations are correct, when this baby hits 88 miles per hour... you're gonna see some serious shit.",
        "movie": "Back to the Future",
        "year": "1985",
        "actor": "Christopher Lloyd",
        "character": "Dr. Emmett Brown",
        "imdb_rating": 8.5,
        "genre": "Adventure / Comedy / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "1.21 gigawatts?! Great Scott!",
        "movie": "Back to the Future",
        "year": "1985",
        "actor": "Christopher Lloyd",
        "character": "Dr. Emmett Brown",
        "imdb_rating": 8.5,
        "genre": "Adventure / Comedy / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Nobody calls me chicken!",
        "movie": "Back to the Future Part II",
        "year": "1989",
        "actor": "Michael J. Fox",
        "character": "Marty McFly",
        "imdb_rating": 7.8,
        "genre": "Adventure / Comedy / Sci-Fi",
        "tag": "classic"
    },

    # Jurassic Park (1993) - IMDb: 8.2
    {
        "dialogue": "Welcome to Jurassic Park.",
        "movie": "Jurassic Park",
        "year": "1993",
        "actor": "Richard Attenborough",
        "character": "John Hammond",
        "imdb_rating": 8.2,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Life, uh, finds a way.",
        "movie": "Jurassic Park",
        "year": "1993",
        "actor": "Jeff Goldblum",
        "character": "Dr. Ian Malcolm",
        "imdb_rating": 8.2,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Clever girl.",
        "movie": "Jurassic Park",
        "year": "1993",
        "actor": "Bob Peck",
        "character": "Robert Muldoon",
        "imdb_rating": 8.2,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Hold on to your butts.",
        "movie": "Jurassic Park",
        "year": "1993",
        "actor": "Samuel L. Jackson",
        "character": "Ray Arnold",
        "imdb_rating": 8.2,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Marvel Cinematic Universe (2008-2019)
    {
        "dialogue": "I am Iron Man.",
        "movie": "Iron Man",
        "year": "2008",
        "actor": "Robert Downey Jr.",
        "character": "Tony Stark / Iron Man",
        "imdb_rating": 7.9,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Avengers, assemble!",
        "movie": "Avengers: Endgame",
        "year": "2019",
        "actor": "Chris Evans",
        "character": "Steve Rogers / Captain America",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "I love you 3000.",
        "movie": "Avengers: Endgame",
        "year": "2019",
        "actor": "Robert Downey Jr. & Lexi Rabe",
        "character": "Tony Stark & Morgan Stark",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "I am inevitable. - And I... am... Iron Man.",
        "movie": "Avengers: Endgame",
        "year": "2019",
        "actor": "Josh Brolin & Robert Downey Jr.",
        "character": "Thanos & Tony Stark",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Drama",
        "tag": "modern"
    },
    {
        "dialogue": "Wakanda forever!",
        "movie": "Black Panther",
        "year": "2018",
        "actor": "Chadwick Boseman",
        "character": "T'Challa / Black Panther",
        "imdb_rating": 7.3,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "modern"
    },
    {
        "dialogue": "I can do this all day.",
        "movie": "Captain America: The First Avenger",
        "year": "2011",
        "actor": "Chris Evans",
        "character": "Steve Rogers / Captain America",
        "imdb_rating": 6.9,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Dread it, run from it, destiny arrives all the same.",
        "movie": "Avengers: Infinity War",
        "year": "2018",
        "actor": "Josh Brolin",
        "character": "Thanos",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "modern"
    },
    {
        "dialogue": "We have a Hulk.",
        "movie": "The Avengers",
        "year": "2012",
        "actor": "Robert Downey Jr.",
        "character": "Tony Stark / Iron Man",
        "imdb_rating": 8.0,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Puny god.",
        "movie": "The Avengers",
        "year": "2012",
        "actor": "Mark Ruffalo",
        "character": "The Hulk",
        "imdb_rating": 8.0,
        "genre": "Action / Sci-Fi",
        "tag": "classic"
    },

    # Spider-Man (2002) - IMDb: 7.4
    {
        "dialogue": "With great power comes great responsibility.",
        "movie": "Spider-Man",
        "year": "2002",
        "actor": "Cliff Robertson",
        "character": "Uncle Ben",
        "imdb_rating": 7.4,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Inception (2010) - IMDb: 8.8
    {
        "dialogue": "You mustn't be afraid to dream a little bigger, darling.",
        "movie": "Inception",
        "year": "2010",
        "actor": "Tom Hardy",
        "character": "Eames",
        "imdb_rating": 8.8,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "An idea is like a virus. Resilient. Highly contagious.",
        "movie": "Inception",
        "year": "2010",
        "actor": "Leonardo DiCaprio",
        "character": "Dom Cobb",
        "imdb_rating": 8.8,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Interstellar (2014) - IMDb: 8.7
    {
        "dialogue": "Do not go gentle into that good night. Rage, rage against the dying of the light.",
        "movie": "Interstellar",
        "year": "2014",
        "actor": "Michael Caine",
        "character": "Professor Brand",
        "imdb_rating": 8.7,
        "genre": "Adventure / Drama / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Mankind was born on Earth. It was never meant to die here.",
        "movie": "Interstellar",
        "year": "2014",
        "actor": "Matthew McConaughey",
        "character": "Cooper",
        "imdb_rating": 8.7,
        "genre": "Adventure / Drama / Sci-Fi",
        "tag": "classic"
    },

    # The Wolf of Wall Street (2013) - IMDb: 8.2
    {
        "dialogue": "Sell me this pen.",
        "movie": "The Wolf of Wall Street",
        "year": "2013",
        "actor": "Leonardo DiCaprio",
        "character": "Jordan Belfort",
        "imdb_rating": 8.2,
        "genre": "Biography / Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "I'm not f***in' leaving! The show goes on!",
        "movie": "The Wolf of Wall Street",
        "year": "2013",
        "actor": "Leonardo DiCaprio",
        "character": "Jordan Belfort",
        "imdb_rating": 8.2,
        "genre": "Biography / Comedy / Crime",
        "tag": "classic"
    },

    # Inglourious Basterds (2009) - IMDb: 8.4
    {
        "dialogue": "That's a bingo!",
        "movie": "Inglourious Basterds",
        "year": "2009",
        "actor": "Christoph Waltz",
        "character": "Col. Hans Landa",
        "imdb_rating": 8.4,
        "genre": "Adventure / Drama / War",
        "tag": "classic"
    },
    {
        "dialogue": "I think this just might be my masterpiece.",
        "movie": "Inglourious Basterds",
        "year": "2009",
        "actor": "Brad Pitt",
        "character": "Lt. Aldo Raine",
        "imdb_rating": 8.4,
        "genre": "Adventure / Drama / War",
        "tag": "classic"
    },
    {
        "dialogue": "Bonjourno.",
        "movie": "Inglourious Basterds",
        "year": "2009",
        "actor": "Brad Pitt",
        "character": "Lt. Aldo Raine",
        "imdb_rating": 8.4,
        "genre": "Adventure / Drama / War",
        "tag": "classic"
    },

    # Django Unchained (2012) - IMDb: 8.5
    {
        "dialogue": "Gentlemen, you had my curiosity. But now you have my attention.",
        "movie": "Django Unchained",
        "year": "2012",
        "actor": "Leonardo DiCaprio",
        "character": "Calvin J. Candie",
        "imdb_rating": 8.5,
        "genre": "Drama / Western",
        "tag": "classic"
    },
    {
        "dialogue": "The 'D' is silent, hillbilly.",
        "movie": "Django Unchained",
        "year": "2012",
        "actor": "Jamie Foxx",
        "character": "Django",
        "imdb_rating": 8.5,
        "genre": "Drama / Western",
        "tag": "classic"
    },
    {
        "dialogue": "I like the way you die, boy.",
        "movie": "Django Unchained",
        "year": "2012",
        "actor": "Jamie Foxx",
        "character": "Django",
        "imdb_rating": 8.5,
        "genre": "Drama / Western",
        "tag": "classic"
    },

    # Se7en (1995) - IMDb: 8.6
    {
        "dialogue": "What's in the box?! What's in the f***ing box?!",
        "movie": "Se7en",
        "year": "1995",
        "actor": "Brad Pitt",
        "character": "Detective David Mills",
        "imdb_rating": 8.6,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },

    # The Usual Suspects (1995) - IMDb: 8.5
    {
        "dialogue": "The greatest trick the Devil ever pulled was convincing the world he didn't exist.",
        "movie": "The Usual Suspects",
        "year": "1995",
        "actor": "Kevin Spacey",
        "character": "Roger 'Verbal' Kint",
        "imdb_rating": 8.5,
        "genre": "Crime / Drama / Mystery",
        "tag": "classic"
    },

    # The Big Lebowski (1998) - IMDb: 8.1
    {
        "dialogue": "The Dude abides.",
        "movie": "The Big Lebowski",
        "year": "1998",
        "actor": "Jeff Bridges",
        "character": "The Dude",
        "imdb_rating": 8.1,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Yeah, well, that's just, like, your opinion, man.",
        "movie": "The Big Lebowski",
        "year": "1998",
        "actor": "Jeff Bridges",
        "character": "The Dude",
        "imdb_rating": 8.1,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "That rug really tied the room together.",
        "movie": "The Big Lebowski",
        "year": "1998",
        "actor": "Jeff Bridges",
        "character": "The Dude",
        "imdb_rating": 8.1,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },

    # Die Hard (1988) - IMDb: 8.2
    {
        "dialogue": "Yippee-ki-yay, motherf***er!",
        "movie": "Die Hard",
        "year": "1988",
        "actor": "Bruce Willis",
        "character": "John McClane",
        "imdb_rating": 8.2,
        "genre": "Action / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Welcome to the party, pal!",
        "movie": "Die Hard",
        "year": "1988",
        "actor": "Bruce Willis",
        "character": "John McClane",
        "imdb_rating": 8.2,
        "genre": "Action / Thriller",
        "tag": "classic"
    },

    # Predator (1987) - IMDb: 7.8
    {
        "dialogue": "Get to the chopper!",
        "movie": "Predator",
        "year": "1987",
        "actor": "Arnold Schwarzenegger",
        "character": "Dutch",
        "imdb_rating": 7.8,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "If it bleeds, we can kill it.",
        "movie": "Predator",
        "year": "1987",
        "actor": "Arnold Schwarzenegger",
        "character": "Dutch",
        "imdb_rating": 7.8,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "You're one ugly motherf***er!",
        "movie": "Predator",
        "year": "1987",
        "actor": "Arnold Schwarzenegger",
        "character": "Dutch",
        "imdb_rating": 7.8,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Aliens & Alien (1986 / 1979) - IMDb: 8.4 / 8.5
    {
        "dialogue": "Get away from her, you bitch!",
        "movie": "Aliens",
        "year": "1986",
        "actor": "Sigourney Weaver",
        "character": "Ellen Ripley",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Game over, man! Game over!",
        "movie": "Aliens",
        "year": "1986",
        "actor": "Bill Paxton",
        "character": "Pvt. Hudson",
        "imdb_rating": 8.4,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Blade Runner (1982) - IMDb: 8.1
    {
        "dialogue": "All those moments will be lost in time, like tears in rain. Time to die.",
        "movie": "Blade Runner",
        "year": "1982",
        "actor": "Rutger Hauer",
        "character": "Roy Batty",
        "imdb_rating": 8.1,
        "genre": "Action / Drama / Sci-Fi",
        "tag": "classic"
    },

    # Braveheart (1995) - IMDb: 8.3
    {
        "dialogue": "They may take our lives, but they'll never take our freedom!",
        "movie": "Braveheart",
        "year": "1995",
        "actor": "Mel Gibson",
        "character": "William Wallace",
        "imdb_rating": 8.3,
        "genre": "Biography / Drama / History",
        "tag": "classic"
    },

    # 300 (2006) - IMDb: 7.6
    {
        "dialogue": "This is Sparta!",
        "movie": "300",
        "year": "2006",
        "actor": "Gerard Butler",
        "character": "King Leonidas",
        "imdb_rating": 7.6,
        "genre": "Action / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Tonight we dine in hell!",
        "movie": "300",
        "year": "2006",
        "actor": "Gerard Butler",
        "character": "King Leonidas",
        "imdb_rating": 7.6,
        "genre": "Action / Drama",
        "tag": "classic"
    },

    # Toy Story Franchise (1995-2019)
    {
        "dialogue": "To infinity and beyond!",
        "movie": "Toy Story",
        "year": "1995",
        "actor": "Tim Allen",
        "character": "Buzz Lightyear",
        "imdb_rating": 8.3,
        "genre": "Animation / Adventure / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "You are a toy!",
        "movie": "Toy Story",
        "year": "1995",
        "actor": "Tom Hanks",
        "character": "Woody",
        "imdb_rating": 8.3,
        "genre": "Animation / Adventure / Comedy",
        "tag": "classic"
    },

    # Finding Nemo (2003) - IMDb: 8.2
    {
        "dialogue": "Just keep swimming.",
        "movie": "Finding Nemo",
        "year": "2003",
        "actor": "Ellen DeGeneres",
        "character": "Dory",
        "imdb_rating": 8.2,
        "genre": "Animation / Adventure / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Fish are friends, not food.",
        "movie": "Finding Nemo",
        "year": "2003",
        "actor": "Barry Humphries",
        "character": "Bruce",
        "imdb_rating": 8.2,
        "genre": "Animation / Adventure / Comedy",
        "tag": "classic"
    },

    # The Lion King (1994) - IMDb: 8.5
    {
        "dialogue": "Hakuna Matata! It means no worries for the rest of your days.",
        "movie": "The Lion King",
        "year": "1994",
        "actor": "Nathan Lane & Ernie Sabella",
        "character": "Timon & Pumbaa",
        "imdb_rating": 8.5,
        "genre": "Animation / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Remember who you are.",
        "movie": "The Lion King",
        "year": "1994",
        "actor": "James Earl Jones",
        "character": "Mufasa",
        "imdb_rating": 8.5,
        "genre": "Animation / Adventure / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Long live the king.",
        "movie": "The Lion King",
        "year": "1994",
        "actor": "Jeremy Irons",
        "character": "Scar",
        "imdb_rating": 8.5,
        "genre": "Animation / Adventure / Drama",
        "tag": "classic"
    },

    # Harry Potter Franchise (2001-2011)
    {
        "dialogue": "You're a wizard, Harry.",
        "movie": "Harry Potter and the Sorcerer's Stone",
        "year": "2001",
        "actor": "Robbie Coltrane",
        "character": "Rubeus Hagrid",
        "imdb_rating": 7.6,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "After all this time? - Always.",
        "movie": "Harry Potter and the Deathly Hallows: Part 2",
        "year": "2011",
        "actor": "Alan Rickman",
        "character": "Severus Snape",
        "imdb_rating": 8.1,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "I solemnly swear that I am up to no good.",
        "movie": "Harry Potter and the Prisoner of Azkaban",
        "year": "2004",
        "actor": "Daniel Radcliffe",
        "character": "Harry Potter",
        "imdb_rating": 7.9,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
        "movie": "Harry Potter and the Prisoner of Azkaban",
        "year": "2004",
        "actor": "Michael Gambon",
        "character": "Albus Dumbledore",
        "imdb_rating": 7.9,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },

    # The Princess Bride (1987) - IMDb: 8.0
    {
        "dialogue": "Hello. My name is Inigo Montoya. You killed my father. Prepare to die.",
        "movie": "The Princess Bride",
        "year": "1987",
        "actor": "Mandy Patinkin",
        "character": "Inigo Montoya",
        "imdb_rating": 8.0,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "As you wish.",
        "movie": "The Princess Bride",
        "year": "1987",
        "actor": "Cary Elwes",
        "character": "Westley",
        "imdb_rating": 8.0,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Inconceivable!",
        "movie": "The Princess Bride",
        "year": "1987",
        "actor": "Wallace Shawn",
        "character": "Vizzini",
        "imdb_rating": 8.0,
        "genre": "Adventure / Family / Fantasy",
        "tag": "classic"
    },

    # Top Gun & Top Gun: Maverick (1986 / 2022) - IMDb: 6.9 / 8.2
    {
        "dialogue": "I feel the need... the need for speed!",
        "movie": "Top Gun",
        "year": "1986",
        "actor": "Tom Cruise & Anthony Edwards",
        "character": "Maverick & Goose",
        "imdb_rating": 6.9,
        "genre": "Action / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "It's not the plane, it's the pilot.",
        "movie": "Top Gun: Maverick",
        "year": "2022",
        "actor": "Tom Cruise",
        "character": "Capt. Pete 'Maverick' Mitchell",
        "imdb_rating": 8.2,
        "genre": "Action / Drama",
        "tag": "modern"
    },

    # Pirates of the Caribbean (2003) - IMDb: 8.1
    {
        "dialogue": "This is the day you will always remember as the day you almost caught Captain Jack Sparrow!",
        "movie": "Pirates of the Caribbean: The Curse of the Black Pearl",
        "year": "2003",
        "actor": "Johnny Depp",
        "character": "Captain Jack Sparrow",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Why is the rum always gone?",
        "movie": "Pirates of the Caribbean: The Curse of the Black Pearl",
        "year": "2003",
        "actor": "Johnny Depp",
        "character": "Captain Jack Sparrow",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Fantasy",
        "tag": "classic"
    },

    # Dead Poets Society (1989) - IMDb: 8.1
    {
        "dialogue": "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
        "movie": "Dead Poets Society",
        "year": "1989",
        "actor": "Robin Williams",
        "character": "John Keating",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "O Captain! My Captain!",
        "movie": "Dead Poets Society",
        "year": "1989",
        "actor": "Ethan Hawke",
        "character": "Todd Anderson",
        "imdb_rating": 8.1,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Good Will Hunting (1997) - IMDb: 8.3
    {
        "dialogue": "It's not your fault. It's not your fault.",
        "movie": "Good Will Hunting",
        "year": "1997",
        "actor": "Robin Williams",
        "character": "Sean Maguire",
        "imdb_rating": 8.3,
        "genre": "Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "How do you like them apples?!",
        "movie": "Good Will Hunting",
        "year": "1997",
        "actor": "Matt Damon",
        "character": "Will Hunting",
        "imdb_rating": 8.3,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # E.T. the Extra-Terrestrial (1982) - IMDb: 7.9
    {
        "dialogue": "E.T. phone home.",
        "movie": "E.T. the Extra-Terrestrial",
        "year": "1982",
        "actor": "Pat Welsh (voice)",
        "character": "E.T.",
        "imdb_rating": 7.9,
        "genre": "Adventure / Family / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "I'll be right here.",
        "movie": "E.T. the Extra-Terrestrial",
        "year": "1982",
        "actor": "Pat Welsh (voice)",
        "character": "E.T.",
        "imdb_rating": 7.9,
        "genre": "Adventure / Family / Sci-Fi",
        "tag": "classic"
    },

    # Ferris Bueller's Day Off (1986) - IMDb: 7.8
    {
        "dialogue": "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.",
        "movie": "Ferris Bueller's Day Off",
        "year": "1986",
        "actor": "Matthew Broderick",
        "character": "Ferris Bueller",
        "imdb_rating": 7.8,
        "genre": "Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Bueller? Bueller? Bueller?",
        "movie": "Ferris Bueller's Day Off",
        "year": "1986",
        "actor": "Ben Stein",
        "character": "Economics Teacher",
        "imdb_rating": 7.8,
        "genre": "Comedy",
        "tag": "classic"
    },

    # Dirty Harry & Sudden Impact (1971 / 1983) - IMDb: 7.7 / 6.6
    {
        "dialogue": "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
        "movie": "Dirty Harry",
        "year": "1971",
        "actor": "Clint Eastwood",
        "character": "Harry Callahan",
        "imdb_rating": 7.7,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Go ahead, make my day.",
        "movie": "Sudden Impact",
        "year": "1983",
        "actor": "Clint Eastwood",
        "character": "Harry Callahan",
        "imdb_rating": 6.6,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # When Harry Met Sally... (1989) - IMDb: 7.7
    {
        "dialogue": "I'll have what she's having.",
        "movie": "When Harry Met Sally...",
        "year": "1989",
        "actor": "Estelle Reiner",
        "character": "Older Woman Customer",
        "imdb_rating": 7.7,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Ghostbusters (1984) - IMDb: 7.8
    {
        "dialogue": "Who ya gonna call? Ghostbusters!",
        "movie": "Ghostbusters",
        "year": "1984",
        "actor": "Bill Murray, Dan Aykroyd, Harold Ramis",
        "character": "The Ghostbusters",
        "imdb_rating": 7.8,
        "genre": "Action / Comedy / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Don't cross the streams!",
        "movie": "Ghostbusters",
        "year": "1984",
        "actor": "Harold Ramis",
        "character": "Dr. Egon Spengler",
        "imdb_rating": 7.8,
        "genre": "Action / Comedy / Fantasy",
        "tag": "classic"
    },

    # The Truman Show (1998) - IMDb: 8.2
    {
        "dialogue": "In case I don't see ya, good afternoon, good evening, and good night!",
        "movie": "The Truman Show",
        "year": "1998",
        "actor": "Jim Carrey",
        "character": "Truman Burbank",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama / Sci-Fi",
        "tag": "classic"
    },

    # Cast Away (2000) - IMDb: 7.8
    {
        "dialogue": "Wilson! I'm sorry, Wilson! Wilson, I'm sorry!",
        "movie": "Cast Away",
        "year": "2000",
        "actor": "Tom Hanks",
        "character": "Chuck Noland",
        "imdb_rating": 7.8,
        "genre": "Adventure / Drama / Romance",
        "tag": "classic"
    },

    # Stand by Me (1986) - IMDb: 8.1
    {
        "dialogue": "I never had any friends later on like the ones I had when I was twelve. Jesus, does anyone?",
        "movie": "Stand by Me",
        "year": "1986",
        "actor": "Richard Dreyfuss",
        "character": "The Writer (Gordie Lachance)",
        "imdb_rating": 8.1,
        "genre": "Adventure / Drama",
        "tag": "classic"
    },

    # The Breakfast Club (1985) - IMDb: 7.8
    {
        "dialogue": "We're all pretty bizarre. Some of us are just better at hiding it, that's all.",
        "movie": "The Breakfast Club",
        "year": "1985",
        "actor": "Ally Sheedy",
        "character": "Allison Reynolds",
        "imdb_rating": 7.8,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Dirty Dancing (1987) - IMDb: 7.0
    {
        "dialogue": "Nobody puts Baby in a corner.",
        "movie": "Dirty Dancing",
        "year": "1987",
        "actor": "Patrick Swayze",
        "character": "Johnny Castle",
        "imdb_rating": 7.0,
        "genre": "Drama / Music / Romance",
        "tag": "classic"
    },

    # The Karate Kid (1984) - IMDb: 7.7
    {
        "dialogue": "Wax on, wax off.",
        "movie": "The Karate Kid",
        "year": "1984",
        "actor": "Pat Morita",
        "character": "Mr. Miyagi",
        "imdb_rating": 7.7,
        "genre": "Action / Drama / Family",
        "tag": "classic"
    },

    # Taken (2008) - IMDb: 7.7
    {
        "dialogue": "I will look for you, I will find you, and I will kill you.",
        "movie": "Taken",
        "year": "2008",
        "actor": "Liam Neeson",
        "character": "Bryan Mills",
        "imdb_rating": 7.7,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # The Social Network (2010) - IMDb: 7.8
    {
        "dialogue": "A million dollars isn't cool. You know what's cool? A billion dollars.",
        "movie": "The Social Network",
        "year": "2010",
        "actor": "Justin Timberlake",
        "character": "Sean Parker",
        "imdb_rating": 7.8,
        "genre": "Biography / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Drop the 'The'. Just 'Facebook'. It's cleaner.",
        "movie": "The Social Network",
        "year": "2010",
        "actor": "Justin Timberlake",
        "character": "Sean Parker",
        "imdb_rating": 7.8,
        "genre": "Biography / Drama",
        "tag": "classic"
    },

    # Whiplash (2014) - IMDb: 8.5
    {
        "dialogue": "There are no two words in the English language more harmful than 'good job'.",
        "movie": "Whiplash",
        "year": "2014",
        "actor": "J.K. Simmons",
        "character": "Terence Fletcher",
        "imdb_rating": 8.5,
        "genre": "Drama / Music",
        "tag": "classic"
    },
    {
        "dialogue": "Not quite my tempo.",
        "movie": "Whiplash",
        "year": "2014",
        "actor": "J.K. Simmons",
        "character": "Terence Fletcher",
        "imdb_rating": 8.5,
        "genre": "Drama / Music",
        "tag": "classic"
    },

    # There Will Be Blood (2007) - IMDb: 8.2
    {
        "dialogue": "I drink your milkshake! I drink it up!",
        "movie": "There Will Be Blood",
        "year": "2007",
        "actor": "Daniel Day-Lewis",
        "character": "Daniel Plainview",
        "imdb_rating": 8.2,
        "genre": "Drama",
        "tag": "classic"
    },

    # No Country for Old Men (2007) - IMDb: 8.2
    {
        "dialogue": "What's the most you ever lost on a coin toss?",
        "movie": "No Country for Old Men",
        "year": "2007",
        "actor": "Javier Bardem",
        "character": "Anton Chigurh",
        "imdb_rating": 8.2,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Captain Phillips (2013) - IMDb: 7.8
    {
        "dialogue": "Look at me. Look at me. I'm the captain now.",
        "movie": "Captain Phillips",
        "year": "2013",
        "actor": "Barkhad Abdi",
        "character": "Muse",
        "imdb_rating": 7.8,
        "genre": "Action / Biography / Crime",
        "tag": "classic"
    },

    # Mad Max: Fury Road (2015) - IMDb: 8.1
    {
        "dialogue": "Witness me!",
        "movie": "Mad Max: Fury Road",
        "year": "2015",
        "actor": "Nicholas Hoult",
        "character": "Nux",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Oh, what a day... what a lovely day!",
        "movie": "Mad Max: Fury Road",
        "year": "2015",
        "actor": "Nicholas Hoult",
        "character": "Nux",
        "imdb_rating": 8.1,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # John Wick (2014) - IMDb: 7.4
    {
        "dialogue": "People keep asking if I'm back, and I haven't really had an answer. But now, yeah, I'm thinkin' I'm back!",
        "movie": "John Wick",
        "year": "2014",
        "actor": "Keanu Reeves",
        "character": "John Wick",
        "imdb_rating": 7.4,
        "genre": "Action / Crime / Thriller",
        "tag": "classic"
    },

    # Oppenheimer (2023) - IMDb: 8.8
    {
        "dialogue": "Now I am become Death, the destroyer of worlds.",
        "movie": "Oppenheimer",
        "year": "2023",
        "actor": "Cillian Murphy",
        "character": "J. Robert Oppenheimer",
        "imdb_rating": 8.8,
        "genre": "Biography / Drama / History",
        "tag": "modern"
    },

    # Barbie (2023) - IMDb: 6.8
    {
        "dialogue": "I am Kenough.",
        "movie": "Barbie",
        "year": "2023",
        "actor": "Ryan Gosling",
        "character": "Ken",
        "imdb_rating": 6.8,
        "genre": "Adventure / Comedy / Fantasy",
        "tag": "modern"
    },

    # Everything Everywhere All at Once (2022) - IMDb: 7.8
    {
        "dialogue": "In another life, I would have really liked just doing laundry and taxes with you.",
        "movie": "Everything Everywhere All at Once",
        "year": "2022",
        "actor": "Ke Huy Quan",
        "character": "Waymond Wang",
        "imdb_rating": 7.8,
        "genre": "Action / Adventure / Comedy",
        "tag": "modern"
    },

    # Brokeback Mountain (2005) - IMDb: 7.7
    {
        "dialogue": "I wish I knew how to quit you.",
        "movie": "Brokeback Mountain",
        "year": "2005",
        "actor": "Jake Gyllenhaal",
        "character": "Jack Twist",
        "imdb_rating": 7.7,
        "genre": "Drama / Romance",
        "tag": "classic"
    },

    # The Devil Wears Prada (2006) - IMDb: 6.9
    {
        "dialogue": "That's all.",
        "movie": "The Devil Wears Prada",
        "year": "2006",
        "actor": "Meryl Streep",
        "character": "Miranda Priestly",
        "imdb_rating": 6.9,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Florals? For spring? Groundbreaking.",
        "movie": "The Devil Wears Prada",
        "year": "2006",
        "actor": "Meryl Streep",
        "character": "Miranda Priestly",
        "imdb_rating": 6.9,
        "genre": "Comedy / Drama",
        "tag": "classic"
    },

    # Mean Girls (2004) - IMDb: 7.1
    {
        "dialogue": "On Wednesdays we wear pink.",
        "movie": "Mean Girls",
        "year": "2004",
        "actor": "Amanda Seyfried",
        "character": "Karen Smith",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "You can't sit with us!",
        "movie": "Mean Girls",
        "year": "2004",
        "actor": "Lacey Chabert",
        "character": "Gretchen Wieners",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "She doesn't even go here!",
        "movie": "Mean Girls",
        "year": "2004",
        "actor": "Daniel Franzese",
        "character": "Damian",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },

    # Anchorman: The Legend of Ron Burgundy (2004) - IMDb: 7.1
    {
        "dialogue": "Boy, that escalated quickly.",
        "movie": "Anchorman: The Legend of Ron Burgundy",
        "year": "2004",
        "actor": "Will Ferrell",
        "character": "Ron Burgundy",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "I'm in a glass case of emotion!",
        "movie": "Anchorman: The Legend of Ron Burgundy",
        "year": "2004",
        "actor": "Will Ferrell",
        "character": "Ron Burgundy",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Stay classy, San Diego.",
        "movie": "Anchorman: The Legend of Ron Burgundy",
        "year": "2004",
        "actor": "Will Ferrell",
        "character": "Ron Burgundy",
        "imdb_rating": 7.1,
        "genre": "Comedy",
        "tag": "classic"
    },

    # Superbad (2007) - IMDb: 7.6
    {
        "dialogue": "I am McLovin!",
        "movie": "Superbad",
        "year": "2007",
        "actor": "Christopher Mintz-Plasse",
        "character": "Fogell / McLovin",
        "imdb_rating": 7.6,
        "genre": "Comedy",
        "tag": "classic"
    },

    # The Hangover (2009) - IMDb: 7.7
    {
        "dialogue": "What happens in Vegas stays in Vegas. Except for herpes.",
        "movie": "The Hangover",
        "year": "2009",
        "actor": "Ed Helms",
        "character": "Stu Price",
        "imdb_rating": 7.7,
        "genre": "Comedy",
        "tag": "classic"
    },

    # Tropic Thunder (2008) - IMDb: 7.1
    {
        "dialogue": "I'm a dude playing a dude disguised as another dude!",
        "movie": "Tropic Thunder",
        "year": "2008",
        "actor": "Robert Downey Jr.",
        "character": "Kirk Lazarus",
        "imdb_rating": 7.1,
        "genre": "Action / Comedy / War",
        "tag": "classic"
    },

    # Austin Powers: International Man of Mystery (1997) - IMDb: 7.0
    {
        "dialogue": "One million dollars!",
        "movie": "Austin Powers: International Man of Mystery",
        "year": "1997",
        "actor": "Mike Myers",
        "character": "Dr. Evil",
        "imdb_rating": 7.0,
        "genre": "Adventure / Comedy",
        "tag": "classic"
    },
    {
        "dialogue": "Yeah, baby, yeah!",
        "movie": "Austin Powers: International Man of Mystery",
        "year": "1997",
        "actor": "Mike Myers",
        "character": "Austin Powers",
        "imdb_rating": 7.0,
        "genre": "Adventure / Comedy",
        "tag": "classic"
    },

    # The Sixth Sense (1999)
    {
        "dialogue": "They don't know they're dead.",
        "movie": "The Sixth Sense",
        "year": "1999",
        "actor": "Haley Joel Osment",
        "character": "Cole Sear",
        "imdb_rating": 8.2,
        "genre": "Drama / Mystery / Thriller",
        "tag": "classic"
    },

    # Braveheart (1995)
    {
        "dialogue": "Every man dies, not every man really lives.",
        "movie": "Braveheart",
        "year": "1995",
        "actor": "Mel Gibson",
        "character": "William Wallace",
        "imdb_rating": 8.3,
        "genre": "Biography / Drama / History",
        "tag": "classic"
    },

    # Midnight Cowboy (1969) - IMDb: 7.8
    {
        "dialogue": "I'm walking here! I'm walking here!",
        "movie": "Midnight Cowboy",
        "year": "1969",
        "actor": "Dustin Hoffman",
        "character": "Ratso Rizzo",
        "imdb_rating": 7.8,
        "genre": "Drama",
        "tag": "classic"
    },

    # The Graduate (1967) - IMDb: 8.0
    {
        "dialogue": "Plastics.",
        "movie": "The Graduate",
        "year": "1967",
        "actor": "Walter Brooke",
        "character": "Mr. McGuire",
        "imdb_rating": 8.0,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },
    {
        "dialogue": "Mrs. Robinson, you're trying to seduce me. Aren't you?",
        "movie": "The Graduate",
        "year": "1967",
        "actor": "Dustin Hoffman",
        "character": "Benjamin Braddock",
        "imdb_rating": 8.0,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Psycho (1960) - IMDb: 8.5
    {
        "dialogue": "A boy's best friend is his mother.",
        "movie": "Psycho",
        "year": "1960",
        "actor": "Anthony Perkins",
        "character": "Norman Bates",
        "imdb_rating": 8.5,
        "genre": "Horror / Mystery / Thriller",
        "tag": "classic"
    },

    # Sunset Boulevard (1950) - IMDb: 8.4
    {
        "dialogue": "All right, Mr. DeMille, I'm ready for my close-up.",
        "movie": "Sunset Boulevard",
        "year": "1950",
        "actor": "Gloria Swanson",
        "character": "Norma Desmond",
        "imdb_rating": 8.4,
        "genre": "Drama / Film-Noir",
        "tag": "classic"
    },
    {
        "dialogue": "I am big! It's the pictures that got small.",
        "movie": "Sunset Boulevard",
        "year": "1950",
        "actor": "Gloria Swanson",
        "character": "Norma Desmond",
        "imdb_rating": 8.4,
        "genre": "Drama / Film-Noir",
        "tag": "classic"
    },

    # All About Eve (1950) - IMDb: 8.2
    {
        "dialogue": "Fasten your seatbelts, it's going to be a bumpy night!",
        "movie": "All About Eve",
        "year": "1950",
        "actor": "Bette Davis",
        "character": "Margo Channing",
        "imdb_rating": 8.2,
        "genre": "Drama",
        "tag": "classic"
    },

    # Citizen Kane (1941) - IMDb: 8.3
    {
        "dialogue": "Rosebud.",
        "movie": "Citizen Kane",
        "year": "1941",
        "actor": "Orson Welles",
        "character": "Charles Foster Kane",
        "imdb_rating": 8.3,
        "genre": "Drama / Mystery",
        "tag": "classic"
    },

    # Frankenstein (1931) - IMDb: 7.8
    {
        "dialogue": "It's alive! It's alive!",
        "movie": "Frankenstein",
        "year": "1931",
        "actor": "Colin Clive",
        "character": "Henry Frankenstein",
        "imdb_rating": 7.8,
        "genre": "Drama / Horror / Sci-Fi",
        "tag": "classic"
    },

    # Dracula (1931) - IMDb: 7.4
    {
        "dialogue": "Listen to them. Children of the night. What music they make.",
        "movie": "Dracula",
        "year": "1931",
        "actor": "Bela Lugosi",
        "character": "Count Dracula",
        "imdb_rating": 7.4,
        "genre": "Fantasy / Horror",
        "tag": "classic"
    },

    # King Kong (1933) - IMDb: 7.9
    {
        "dialogue": "It was Beauty killed the Beast.",
        "movie": "King Kong",
        "year": "1933",
        "actor": "Robert Armstrong",
        "character": "Carl Denham",
        "imdb_rating": 7.9,
        "genre": "Adventure / Horror / Sci-Fi",
        "tag": "classic"
    },

    # Cool Hand Luke (1967) - IMDb: 8.1
    {
        "dialogue": "What we've got here is failure to communicate.",
        "movie": "Cool Hand Luke",
        "year": "1967",
        "actor": "Strother Martin",
        "character": "Captain",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Network (1976) - IMDb: 8.1
    {
        "dialogue": "I'm as mad as hell, and I'm not going to take this anymore!",
        "movie": "Network",
        "year": "1976",
        "actor": "Peter Finch",
        "character": "Howard Beale",
        "imdb_rating": 8.1,
        "genre": "Drama",
        "tag": "classic"
    },

    # Wall Street (1987) - IMDb: 7.3
    {
        "dialogue": "Greed, for lack of a better word, is good.",
        "movie": "Wall Street",
        "year": "1987",
        "actor": "Michael Douglas",
        "character": "Gordon Gekko",
        "imdb_rating": 7.3,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # On the Waterfront (1954) - IMDb: 8.1
    {
        "dialogue": "You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.",
        "movie": "On the Waterfront",
        "year": "1954",
        "actor": "Marlon Brando",
        "character": "Terry Malloy",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # A Streetcar Named Desire (1951) - IMDb: 7.9
    {
        "dialogue": "Stella! Hey, Stella!",
        "movie": "A Streetcar Named Desire",
        "year": "1951",
        "actor": "Marlon Brando",
        "character": "Stanley Kowalski",
        "imdb_rating": 7.9,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "I have always depended on the kindness of strangers.",
        "movie": "A Streetcar Named Desire",
        "year": "1951",
        "actor": "Vivien Leigh",
        "character": "Blanche DuBois",
        "imdb_rating": 7.9,
        "genre": "Drama",
        "tag": "classic"
    },

    # To Have and Have Not (1944) - IMDb: 7.8
    {
        "dialogue": "You know how to whistle, don't you, Steve? You just put your lips together and blow.",
        "movie": "To Have and Have Not",
        "year": "1944",
        "actor": "Lauren Bacall",
        "character": "Marie 'Slim' Browning",
        "imdb_rating": 7.8,
        "genre": "Adventure / Comedy / Film-Noir",
        "tag": "classic"
    },

    # Some Like It Hot (1959) - IMDb: 8.2
    {
        "dialogue": "Well, nobody's perfect.",
        "movie": "Some Like It Hot",
        "year": "1959",
        "actor": "Joe E. Brown",
        "character": "Osgood Fielding III",
        "imdb_rating": 8.2,
        "genre": "Comedy / Music / Romance",
        "tag": "classic"
    },

    # The Treasure of the Sierra Madre (1948) - IMDb: 8.2
    {
        "dialogue": "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinkin' badges!",
        "movie": "The Treasure of the Sierra Madre",
        "year": "1948",
        "actor": "Alfonso Bedoya",
        "character": "Gold Hat",
        "imdb_rating": 8.2,
        "genre": "Adventure / Drama / Western",
        "tag": "classic"
    },

    # White Heat (1949) - IMDb: 8.1
    {
        "dialogue": "Made it, Ma! Top of the world!",
        "movie": "White Heat",
        "year": "1949",
        "actor": "James Cagney",
        "character": "Arthur 'Cody' Jarrett",
        "imdb_rating": 8.1,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # Chinatown (1974) - IMDb: 8.2
    {
        "dialogue": "Forget it, Jake, it's Chinatown.",
        "movie": "Chinatown",
        "year": "1974",
        "actor": "Joe Mantell",
        "character": "Lawrence Walsh",
        "imdb_rating": 8.2,
        "genre": "Drama / Mystery / Thriller",
        "tag": "classic"
    },

    # The Maltese Falcon (1941) - IMDb: 7.9
    {
        "dialogue": "The stuff that dreams are made of.",
        "movie": "The Maltese Falcon",
        "year": "1941",
        "actor": "Humphrey Bogart",
        "character": "Sam Spade",
        "imdb_rating": 7.9,
        "genre": "Crime / Film-Noir / Mystery",
        "tag": "classic"
    },

    # Jerry Maguire (1996)
    {
        "dialogue": "Help me help you.",
        "movie": "Jerry Maguire",
        "year": "1996",
        "actor": "Tom Cruise",
        "character": "Jerry Maguire",
        "imdb_rating": 7.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # A League of Their Own (1992) - IMDb: 7.3
    {
        "dialogue": "There's no crying in baseball!",
        "movie": "A League of Their Own",
        "year": "1992",
        "actor": "Tom Hanks",
        "character": "Jimmy Dugan",
        "imdb_rating": 7.3,
        "genre": "Comedy / Drama / Sport",
        "tag": "classic"
    },

    # Field of Dreams (1989) - IMDb: 7.5
    {
        "dialogue": "If you build it, he will come.",
        "movie": "Field of Dreams",
        "year": "1989",
        "actor": "The Voice",
        "character": "The Voice",
        "imdb_rating": 7.5,
        "genre": "Drama / Family / Fantasy",
        "tag": "classic"
    },

    # Rocky (1976) - IMDb: 8.1
    {
        "dialogue": "Yo, Adrian!",
        "movie": "Rocky",
        "year": "1976",
        "actor": "Sylvester Stallone",
        "character": "Rocky Balboa",
        "imdb_rating": 8.1,
        "genre": "Drama / Sport",
        "tag": "classic"
    },
    {
        "dialogue": "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
        "movie": "Rocky Balboa",
        "year": "2006",
        "actor": "Sylvester Stallone",
        "character": "Rocky Balboa",
        "imdb_rating": 7.1,
        "genre": "Action / Drama / Sport",
        "tag": "classic"
    },

    # Rambo: First Blood (1982) - IMDb: 7.7
    {
        "dialogue": "They drew first blood, not me.",
        "movie": "First Blood",
        "year": "1982",
        "actor": "Sylvester Stallone",
        "character": "John Rambo",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },

    # Speed (1994) - IMDb: 7.3
    {
        "dialogue": "Pop quiz, hotshot. There's a bomb on a bus. What do you do? What do you do?",
        "movie": "Speed",
        "year": "1994",
        "actor": "Dennis Hopper",
        "character": "Howard Payne",
        "imdb_rating": 7.3,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },

    # Clueless (1995) - IMDb: 6.9
    {
        "dialogue": "As if!",
        "movie": "Clueless",
        "year": "1995",
        "actor": "Alicia Silverstone",
        "character": "Cher Horowitz",
        "imdb_rating": 6.9,
        "genre": "Comedy / Romance",
        "tag": "classic"
    },

    # Elf (2003) - IMDb: 7.1
    {
        "dialogue": "The best way to spread Christmas cheer is singing loud for all to hear.",
        "movie": "Elf",
        "year": "2003",
        "actor": "Will Ferrell",
        "character": "Buddy",
        "imdb_rating": 7.1,
        "genre": "Comedy / Family / Fantasy",
        "tag": "classic"
    },
    {
        "dialogue": "Santa! Oh, my God! Santa's coming! I know him! I know him!",
        "movie": "Elf",
        "year": "2003",
        "actor": "Will Ferrell",
        "character": "Buddy",
        "imdb_rating": 7.1,
        "genre": "Comedy / Family / Fantasy",
        "tag": "classic"
    },

    # Star Trek Series
    {
        "dialogue": "Live long and prosper.",
        "movie": "Star Trek II: The Wrath of Khan",
        "year": "1982",
        "actor": "Leonard Nimoy",
        "character": "Spock",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Khaaaan!",
        "movie": "Star Trek II: The Wrath of Khan",
        "year": "1982",
        "actor": "William Shatner",
        "character": "James T. Kirk",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "The needs of the many outweigh the needs of the few, or the one.",
        "movie": "Star Trek II: The Wrath of Khan",
        "year": "1982",
        "actor": "Leonard Nimoy",
        "character": "Spock",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Goldfinger (1964)
    {
        "dialogue": "Shocking. Positively shocking.",
        "movie": "Goldfinger",
        "year": "1964",
        "actor": "Sean Connery",
        "character": "James Bond",
        "imdb_rating": 7.7,
        "genre": "Action / Adventure / Thriller",
        "tag": "classic"
    },

    # Poltergeist (1982) - IMDb: 7.3
    {
        "dialogue": "They're here!",
        "movie": "Poltergeist",
        "year": "1982",
        "actor": "Heather O'Rourke",
        "character": "Carol Anne Freeling",
        "imdb_rating": 7.3,
        "genre": "Horror / Thriller",
        "tag": "classic"
    },

    # She Done Him Wrong (1933) - IMDb: 6.3
    {
        "dialogue": "Why don't you come up sometime and see me?",
        "movie": "She Done Him Wrong",
        "year": "1933",
        "actor": "Mae West",
        "character": "Lady Lou",
        "imdb_rating": 6.3,
        "genre": "Comedy / Drama / Romance",
        "tag": "classic"
    },

    # Snow White and the Seven Dwarfs (1937) - IMDb: 7.6
    {
        "dialogue": "Magic Mirror on the wall, who is the fairest one of all?",
        "movie": "Snow White and the Seven Dwarfs",
        "year": "1937",
        "actor": "Lucille La Verne",
        "character": "The Evil Queen",
        "imdb_rating": 7.6,
        "genre": "Animation / Adventure / Family",
        "tag": "classic"
    },

    # Pinocchio (1940) - IMDb: 7.5
    {
        "dialogue": "When you wish upon a star, makes no difference who you are.",
        "movie": "Pinocchio",
        "year": "1940",
        "actor": "Cliff Edwards",
        "character": "Jiminy Cricket",
        "imdb_rating": 7.5,
        "genre": "Animation / Comedy / Family",
        "tag": "classic"
    },

    # Peter Pan (1953) - IMDb: 7.3
    {
        "dialogue": "All you need is faith, trust, and a little bit of pixie dust.",
        "movie": "Peter Pan",
        "year": "1953",
        "actor": "Bobby Driscoll",
        "character": "Peter Pan",
        "imdb_rating": 7.3,
        "genre": "Animation / Adventure / Family",
        "tag": "classic"
    },

    # Mary Poppins (1964) - IMDb: 7.8
    {
        "dialogue": "Supercalifragilisticexpialidocious!",
        "movie": "Mary Poppins",
        "year": "1964",
        "actor": "Julie Andrews",
        "character": "Mary Poppins",
        "imdb_rating": 7.8,
        "genre": "Comedy / Family / Fantasy",
        "tag": "classic"
    },

    # Planet of the Apes (1968) - IMDb: 8.0
    {
        "dialogue": "Get your stinking paws off me, you damn dirty ape!",
        "movie": "Planet of the Apes",
        "year": "1968",
        "actor": "Charlton Heston",
        "character": "George Taylor",
        "imdb_rating": 8.0,
        "genre": "Adventure / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "You maniacs! You blew it up! Ah, damn you! God damn you all to hell!",
        "movie": "Planet of the Apes",
        "year": "1968",
        "actor": "Charlton Heston",
        "character": "George Taylor",
        "imdb_rating": 8.0,
        "genre": "Adventure / Sci-Fi",
        "tag": "classic"
    },

    # Soylent Green (1973) - IMDb: 7.0
    {
        "dialogue": "Soylent Green is people!",
        "movie": "Soylent Green",
        "year": "1973",
        "actor": "Charlton Heston",
        "character": "Detective Frank Thorn",
        "imdb_rating": 7.0,
        "genre": "Mystery / Sci-Fi / Thriller",
        "tag": "classic"
    },

    # Babe (1995) - IMDb: 6.9
    {
        "dialogue": "That'll do, pig. That'll do.",
        "movie": "Babe",
        "year": "1995",
        "actor": "James Cromwell",
        "character": "Farmer Arthur Hoggett",
        "imdb_rating": 6.9,
        "genre": "Comedy / Drama / Family",
        "tag": "classic"
    },

    # The Sting (1973) - IMDb: 8.3
    {
        "dialogue": "You gave him the works? - Yeah, the whole shooting match.",
        "movie": "The Sting",
        "year": "1973",
        "actor": "Robert Redford & Paul Newman",
        "character": "Johnny Hooker & Henry Gondorff",
        "imdb_rating": 8.3,
        "genre": "Comedy / Crime / Drama",
        "tag": "classic"
    },

    # Butch Cassidy and the Sundance Kid (1969) - IMDb: 8.0
    {
        "dialogue": "I can't swim! - Are you crazy? The fall'll probably kill ya!",
        "movie": "Butch Cassidy and the Sundance Kid",
        "year": "1969",
        "actor": "Robert Redford & Paul Newman",
        "character": "The Sundance Kid & Butch Cassidy",
        "imdb_rating": 8.0,
        "genre": "Biography / Crime / Drama",
        "tag": "classic"
    },

    # Deliverance (1972) - IMDb: 7.7
    {
        "dialogue": "Squeal like a pig!",
        "movie": "Deliverance",
        "year": "1972",
        "actor": "Bill McKinney",
        "character": "Mountain Man",
        "imdb_rating": 7.7,
        "genre": "Adventure / Drama / Thriller",
        "tag": "classic"
    },

    # Network (1976)
    {
        "dialogue": "Television is not the truth. Television is a God-damned amusement park!",
        "movie": "Network",
        "year": "1976",
        "actor": "Peter Finch",
        "character": "Howard Beale",
        "imdb_rating": 8.1,
        "genre": "Drama",
        "tag": "classic"
    },

    # Scarface (1983)
    {
        "dialogue": "I always tell the truth. Even when I lie.",
        "movie": "Scarface",
        "year": "1983",
        "actor": "Al Pacino",
        "character": "Tony Montana",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama",
        "tag": "classic"
    },

    # Scent of a Woman (1992) - IMDb: 8.0
    {
        "dialogue": "Hoo-ah!",
        "movie": "Scent of a Woman",
        "year": "1992",
        "actor": "Al Pacino",
        "character": "Lieutenant Colonel Frank Slade",
        "imdb_rating": 8.0,
        "genre": "Drama",
        "tag": "classic"
    },
    {
        "dialogue": "I'm in the dark here! You understand? I'm in the dark!",
        "movie": "Scent of a Woman",
        "year": "1992",
        "actor": "Al Pacino",
        "character": "Lieutenant Colonel Frank Slade",
        "imdb_rating": 8.0,
        "genre": "Drama",
        "tag": "classic"
    },

    # Heat (1995) - IMDb: 8.3
    {
        "dialogue": "Don't let yourself get attached to anything you are not willing to walk out on in 30 seconds flat if you feel the heat around the corner.",
        "movie": "Heat",
        "year": "1995",
        "actor": "Robert De Niro",
        "character": "Neil McCauley",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Cause she's got a GREAT ASS! And you got your head all the way up it!",
        "movie": "Heat",
        "year": "1995",
        "actor": "Al Pacino",
        "character": "Lt. Vincent Hanna",
        "imdb_rating": 8.3,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # The Departed (2006) - IMDb: 8.5
    {
        "dialogue": "I'm the guy who does his job. You must be the other guy.",
        "movie": "The Departed",
        "year": "2006",
        "actor": "Mark Wahlberg",
        "character": "Staff Sergeant Sean Dignam",
        "imdb_rating": 8.5,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "When you're facing a loaded gun, what's the difference?",
        "movie": "The Departed",
        "year": "2006",
        "actor": "Jack Nicholson",
        "character": "Frank Costello",
        "imdb_rating": 8.5,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Reservoir Dogs (1992) - IMDb: 8.3
    {
        "dialogue": "Are you gonna bark all day, little doggie, or are you gonna bite?",
        "movie": "Reservoir Dogs",
        "year": "1992",
        "actor": "Michael Madsen",
        "character": "Mr. Blonde (Vic Vega)",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "Why am I Mr. Pink? - Because you're a faggot, alright?!",
        "movie": "Reservoir Dogs",
        "year": "1992",
        "actor": "Steve Buscemi & Lawrence Tierney",
        "character": "Mr. Pink & Joe Cabot",
        "imdb_rating": 8.3,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # Kill Bill: Vol. 1 & 2 (2003 / 2004) - IMDb: 8.2 / 8.0
    {
        "dialogue": "Wiggle your big toe.",
        "movie": "Kill Bill: Vol. 1",
        "year": "2003",
        "actor": "Uma Thurman",
        "character": "The Bride (Beatrix Kiddo)",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "Silly rabbit. Trix are for kids.",
        "movie": "Kill Bill: Vol. 1",
        "year": "2003",
        "actor": "Uma Thurman",
        "character": "The Bride (Beatrix Kiddo)",
        "imdb_rating": 8.2,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },
    {
        "dialogue": "That woman deserves her revenge and we deserve to die.",
        "movie": "Kill Bill: Vol. 2",
        "year": "2004",
        "actor": "Michael Madsen",
        "character": "Budd",
        "imdb_rating": 8.0,
        "genre": "Action / Crime / Drama",
        "tag": "classic"
    },

    # The Big Lebowski (1998)
    {
        "dialogue": "This is what happens when you f*** a stranger in the Alps!",
        "movie": "The Big Lebowski",
        "year": "1998",
        "actor": "John Goodman",
        "character": "Walter Sobchak",
        "imdb_rating": 8.1,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },
    {
        "dialogue": "Shut the f*** up, Donny!",
        "movie": "The Big Lebowski",
        "year": "1998",
        "actor": "John Goodman",
        "character": "Walter Sobchak",
        "imdb_rating": 8.1,
        "genre": "Comedy / Crime",
        "tag": "classic"
    },

    # Fargo (1996) - IMDb: 8.1
    {
        "dialogue": "Oh, you betcha!",
        "movie": "Fargo",
        "year": "1996",
        "actor": "Frances McDormand",
        "character": "Marge Gunderson",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "And I guess that was your accomplice in the wood chipper.",
        "movie": "Fargo",
        "year": "1996",
        "actor": "Frances McDormand",
        "character": "Marge Gunderson",
        "imdb_rating": 8.1,
        "genre": "Crime / Drama / Thriller",
        "tag": "classic"
    },

    # American Psycho (2000) - IMDb: 7.6
    {
        "dialogue": "Look at that subtle off-white coloring. The tasteful thickness of it. Oh, my God. It even has a watermark.",
        "movie": "American Psycho",
        "year": "2000",
        "actor": "Christian Bale",
        "character": "Patrick Bateman",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama / Horror",
        "tag": "classic"
    },
    {
        "dialogue": "I have to return some videotapes.",
        "movie": "American Psycho",
        "year": "2000",
        "actor": "Christian Bale",
        "character": "Patrick Bateman",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama / Horror",
        "tag": "classic"
    },
    {
        "dialogue": "There is an idea of a Patrick Bateman, some kind of abstraction, but there is no real me.",
        "movie": "American Psycho",
        "year": "2000",
        "actor": "Christian Bale",
        "character": "Patrick Bateman",
        "imdb_rating": 7.6,
        "genre": "Crime / Drama / Horror",
        "tag": "classic"
    },

    # Memento (2000) - IMDb: 8.4
    {
        "dialogue": "I have this condition.",
        "movie": "Memento",
        "year": "2000",
        "actor": "Guy Pearce",
        "character": "Leonard Shelby",
        "imdb_rating": 8.4,
        "genre": "Mystery / Thriller",
        "tag": "classic"
    },
    {
        "dialogue": "We all lie to ourselves to be happy.",
        "movie": "Memento",
        "year": "2000",
        "actor": "Guy Pearce",
        "character": "Leonard Shelby",
        "imdb_rating": 8.4,
        "genre": "Mystery / Thriller",
        "tag": "classic"
    },

    # The Prestige (2006) - IMDb: 8.5
    {
        "dialogue": "Are you watching closely?",
        "movie": "The Prestige",
        "year": "2006",
        "actor": "Christian Bale",
        "character": "Alfred Borden",
        "imdb_rating": 8.5,
        "genre": "Drama / Mystery / Sci-Fi",
        "tag": "classic"
    },
    {
        "dialogue": "Every great magic trick consists of three parts or acts: The Pledge, The Turn, and The Prestige.",
        "movie": "The Prestige",
        "year": "2006",
        "actor": "Michael Caine",
        "character": "Cutter",
        "imdb_rating": 8.5,
        "genre": "Drama / Mystery / Sci-Fi",
        "tag": "classic"
    },

    # Shutter Island (2010) - IMDb: 8.2
    {
        "dialogue": "Which would be worse: to live as a monster, or to die as a good man?",
        "movie": "Shutter Island",
        "year": "2010",
        "actor": "Leonardo DiCaprio",
        "character": "Teddy Daniels",
        "imdb_rating": 8.2,
        "genre": "Mystery / Thriller",
        "tag": "classic"
    },

    # The Truman Show (1998)
    {
        "dialogue": "We accept the reality of the world with which we're presented. It's as simple as that.",
        "movie": "The Truman Show",
        "year": "1998",
        "actor": "Ed Harris",
        "character": "Christof",
        "imdb_rating": 8.2,
        "genre": "Comedy / Drama / Sci-Fi",
        "tag": "classic"
    }
]

print(f"Total raw curated Hollywood dialogues: {len(hollywood_dialogues)}")

# Deduplicate by dialogue text
seen = set()
unique_dialogues = []
for d in hollywood_dialogues:
    norm = d["dialogue"].strip().lower()
    if norm not in seen:
        seen.add(norm)
        unique_dialogues.append(d)

print(f"Unique dialogues available: {len(unique_dialogues)}")

# Take exact top 200
final_200 = unique_dialogues[:200]

final_list = []
for idx, d in enumerate(final_200, 1):
    item = {
        "id": f"hd_{idx}",
        "category": "dialogue",
        "type": "dialogue",
        "dialogue": d["dialogue"],
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
out_json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'hollywood_200_dialogues.json')
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2, ensure_ascii=False)
print(f"[OK] Saved {len(final_list)} dialogues to {out_json_path}")

# Save Markdown reference file
out_md_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'hollywood_200_dialogues.md')
with open(out_md_path, 'w', encoding='utf-8') as f:
    f.write("# 🎬 Top 200 Most Famous & Instantly Recognizable Hollywood Movie Dialogues\n\n")
    f.write("A curated, production-ready dataset of the **200 most iconic, universally recognized quotes in cinema history** from top IMDb films.\n\n")
    f.write("| # | Iconic Dialogue | Movie | Year | Star / Character | IMDb | Genre |\n")
    f.write("|---|---|---|---|---|---|---|\n")
    for d in final_list:
        f.write(f"| {d['id']} | **\"{d['dialogue']}\"** | {d['movie']} | {d['year']} | {d['actor']} (*{d['character']}*) | ⭐ {d['imdb_rating']} | {d['genre']} |\n")

print(f"[OK] Saved markdown reference to {out_md_path}")
