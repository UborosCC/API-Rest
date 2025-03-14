# Min Rest-API Dokumentation

## Översikt

Detta API hanterar One Piece karaktärer och användare. API:et stöder CRUD-operationer (Create, Read, Update, Delete) och använder en JSON-baserad databas.  

- **Base URL:** `http://localhost:3000`
- **Format:** Alla svar är i JSON
- **Endpoints:**  
  - [Users](#users)
  - [One Piece Characters](#onepiece)

## 1. Installation
```
git clone https://github.com/UborosCC/API-Rest
cd API-Rest
npm install
node server.js
```

## 2. Utveckling

Starta servern
```
node server.js
```

Projektstruktur
```
/project-folder
│-- /routes           # Routhantering
│   ├── users.js      # Hanterar användarna
│   ├── onepiece.js   # Hanterar One Piece-karaktärer
│-- db.json           # JSON-databas
│-- package.json      # NPM dependencies
│-- server.js         # Huvudserverfil
│-- README.md         # Dokumentation
```

## 3. Databasstruktur
JSON-filen (db.json) innehåller följande data:
```
{
  "users": [
    {
      "id": 1,
      "name": "Alex",
      "favorite_character": "Monkey D. Luffy",
      "role": "Admin"
    },
    {
      "id": 2,
      "name": "Gabriel",
      "favorite_character": "Son Goku",
      "role": "Guest"
    },
    {
      "id": 3,
      "name": "Marcus",
      "favorite_character": "Marshall D. Teach",
      "role": "Guest"
    }
  ],
  "one_piece_characters": [
    {
      "id": 1,
      "name": "Monkey D. Luffy",
      "epithet": "Straw Hat Luffy",
      "character_debut": "Chapter 1, Episode 1",
      "age": [
        "7(debut)",
        "17(pre-timeskip)",
        "19(post-timeskip)"
      ],
      "birthday": "May 5th",
      "origin": "East Blue, Foosha Village",
      "current_bounty": "3.000.000.000",
      "previous_bounty": [
        "First Bounty: 30.000.000",
        "Second Bounty: 100.000.000",
        "Third Bounty: 300.000.000",
        "Fourth Bounty: 400.000.000",
        "Fifth Bounty: 500.000.000",
        "Sixth Bounty: 1.500.000.000"
      ],
      "devil_fruit": {
        "name": "Gomu Gomu no Mi",
        "real_name": "Hito Hito no Mi, Model: Nika",
        "type": "Paramecia",
        "real_type": "Mythical Zoan",
        "abilities": "Grants the user's body the propoties of rubber, making them a Rubber Human",
        "real_abilities": "Allows the user to transform into the legendary Sun God Nika, gaining his rubbery attributes"
      },
      "haki": [
        "Observation Haki",
        "Armament Haki",
        "Conqueror's Haki"
      ],
      "crew": "Straw Hat Pirates",
      "role": "Captain",
      "affiliations": [
        "Straw Hat Pirates",
        "Worst Generation",
        "Straw Hat Grand Fleet",
        "Four Emperors"
      ],
      "status": "Alive"
    },
    {
      "id": 2,
      "name": "Roronoa Zoro",
      "epithet": "Pirate Hunter Zoro",
      "character_debut": "Chapter 3, Episode 1",
      "age": [
        "19(debut)",
        "21(after timeskip)"
      ],
      "birthday": "November 11th",
      "origin": "East Blue",
      "current_bounty": "1.111.000.000",
      "previous_bounty": [
        "First Bounty: 60.000.000",
        "Second Bounty: 120.000.000",
        "Third Bounty: 320.000.000"
      ],
      "devil_fruit": null,
      "haki": [
        "Observation Haki",
        "Armament Haki",
        "Conqueror's Haki"
      ],
      "swrods": [
        "Wado Ichimonji",
        "Sandai Kitetsu",
        "Enma"
      ],
      "former_swords": [
        "Two unamed katanas",
        "Yubashiri",
        "Shusui"
      ],
      "crew": "Straw Hat Pirates",
      "role": [
        "First Mate",
        "Senior Officer",
        "Master Swordsman"
      ],
      "affiliations": [
        "Straw Hat Pirates",
        "Worst Generation",
        "Straw Hat Grand Fleet"
      ],
      "status": "Alive"
    }
  ]
}
```

## 4. Users

### 4.1 GET /users
Hämtar alla användare i databasen.

**Request**
GET /users 

**Response**
```
[
    {
        "id": 1,
        "name": "Alex",
        "favorite_character": "Monkey D. Luffy",
        "role": "Admin"
    },
    {
        "id": 2,
        "name": "Gabriel",
        "favorite_character": "Son Goku",
        "role": "Guest"
    },
    {
        "id": 3,
        "name": "Marcus",
        "favorite_character": "Marshall D. Teach",
        "role": "Guest"
    }
]
```

**Felhantering**
- 500 Internal Server Error - Om något oväntat går fel

### 4.2 GET /users/:id
Hämtar en specifik användare

**Request**
GET /users/1

**Response**
```
{
    "id": 1,
    "name": "Alex",
    "favorite_character": "Monkey D. Luffy",
    "role": "Admin"
}
``` 

**Felhantering**
- 404 Not Found - Om användaren inte finns

### 4.3 POST /users
Skapar en ny användare

**Request**
POST /users

JSON Body:
```
{
    "name": "Erik",
    "favorite_character": "John Cena"
}
```

**Response**
```
{
    "id": 4,
    "name": "Erik",
    "favorite_character": "John Cena",
    "Role": "Guest"
}
```

**Felhantering**
- 400 Bad Request - Om name eller favorite_character saknas

### 4.4 PUT /users/:id
Uppdaterar en användares information

**Request**
PUT /users/4

JSON Body: 
```
{
    "name": "Coolio"
    "favorite_character": "Hulk"
}
```

**Response**
```
{
    "id": 4,
    "name": "Coolio",
    "favoreite_character": "Hulk",
    "Role": "Guest"
}
```

**Felhantering**
- 404 Not Found - Om användaren inte finns

### 4.5 DELETE /users/:id
Raderar en användare

**Request**
DELETE /users/4

**Response**
```
{
	"message": "User with ID 4 has been deleted",
	"deletedUser": {
		"id": 4,
		"name": "Coolio"
        "favorite_character": "Hulk",
        "Role": "Guest"
	}
}
```

**Felhantering**
- 404 Not Found - Om användaren inte finns

## 5. One Piece Characters

### 5.1 GET /onepiece
Hämtar alla One Piece karaktärer i databasen

**Request**
GET /onepiece

**Response**
```
[
	{
		"id": 1,
		"name": "Monkey D. Luffy",
		"epithet": "Straw Hat Luffy",
		"character_debut": "Chapter 1, Episode 1",
		"age": [
			"7(debut)",
			"17(pre-timeskip)",
			"19(post-timeskip)"
		],
		"birthday": "May 5th",
		"origin": "East Blue, Foosha Village",
		"current_bounty": "3.000.000.000",
		"previous_bounty": [
			"First Bounty: 30.000.000",
			"Second Bounty: 100.000.000",
			"Third Bounty: 300.000.000",
			"Fourth Bounty: 400.000.000",
			"Fifth Bounty: 500.000.000",
			"Sixth Bounty: 1.500.000.000"
		],
		"devil_fruit": {
			"name": "Gomu Gomu no Mi",
			"real_name": "Hito Hito no Mi, Model: Nika",
			"type": "Paramecia",
			"real_type": "Mythical Zoan",
			"abilities": "Grants the user's body the propoties of rubber, making them a Rubber Human",
			"real_abilities": "Allows the user to transform into the legendary Sun God Nika, gaining his rubbery attributes"
		},
		"haki": [
			"Observation Haki",
			"Armament Haki",
			"Conqueror's Haki"
		],
		"crew": "Straw Hat Pirates",
		"role": "Captain",
		"affiliations": [
			"Straw Hat Pirates",
			"Worst Generation",
			"Straw Hat Grand Fleet",
			"Four Emperors"
		],
		"status": "Alive"
	},
	{
		"id": 2,
		"name": "Roronoa Zoro",
		"epithet": "Pirate Hunter Zoro",
		"character_debut": "Chapter 3, Episode 1",
		"age": [
			"19(debut)",
			"21(after timeskip)"
		],
		"birthday": "November 11th",
		"origin": "East Blue",
		"current_bounty": "1.111.000.000",
		"previous_bounty": [
			"First Bounty: 60.000.000",
			"Second Bounty: 120.000.000",
			"Third Bounty: 320.000.000"
		],
		"devil_fruit": null,
		"haki": [
			"Observation Haki",
			"Armament Haki",
			"Conqueror's Haki"
		],
		"swrods": [
			"Wado Ichimonji",
			"Sandai Kitetsu",
			"Enma"
		],
		"former_swords": [
			"Two unamed katanas",
			"Yubashiri",
			"Shusui"
		],
		"crew": "Straw Hat Pirates",
		"role": [
			"First Mate",
			"Senior Officer",
			"Master Swordsman"
		],
		"affiliations": [
			"Straw Hat Pirates",
			"Worst Generation",
			"Straw Hat Grand Fleet"
		],
		"status": "Alive"
	}
]
```

**Felhantering**
- 500 Internal Server Error – Om något oväntat går fel
 
### 5.2 GET /onepiece/:id
Hämtar en specifik karaktär

**Request**
GET /onepiece/1

**Response**
```
{
	"id": 1,
	"name": "Monkey D. Luffy",
	"epithet": "Straw Hat Luffy",
	"character_debut": "Chapter 1, Episode 1",
	"age": [
		"7(debut)",
		"17(pre-timeskip)",
		"19(post-timeskip)"
	],
	"birthday": "May 5th",
	"origin": "East Blue, Foosha Village",
	"current_bounty": "3.000.000.000",
	"previous_bounty": [
		"First Bounty: 30.000.000",
		"Second Bounty: 100.000.000",
		"Third Bounty: 300.000.000",
		"Fourth Bounty: 400.000.000",
		"Fifth Bounty: 500.000.000",
		"Sixth Bounty: 1.500.000.000"
	],
	"devil_fruit": {
		"name": "Gomu Gomu no Mi",
		"real_name": "Hito Hito no Mi, Model: Nika",
		"type": "Paramecia",
		"real_type": "Mythical Zoan",
		"abilities": "Grants the user's body the propoties of rubber, making them a Rubber Human",
		"real_abilities": "Allows the user to transform into the legendary Sun God Nika, gaining his rubbery attributes"
	},
	"haki": [
		"Observation Haki",
		"Armament Haki",
		"Conqueror's Haki"
	],
	"crew": "Straw Hat Pirates",
	"role": "Captain",
	"affiliations": [
		"Straw Hat Pirates",
		"Worst Generation",
		"Straw Hat Grand Fleet",
		"Four Emperors"
	],
	"status": "Alive"
}
```

**Felhantering**
- 404 Not Found – Om karaktären inte finns

### 5.3 POST /onepiece
Skapar en ny karaktär

**Request**
POST /onepiece

JSON Body:
```
{
    "name": "Nami",
    "epithet": "Cat Burglar",
    "character_debut": "Chapter 8",
    "age": "20",
    "current_bounty": "366.000.000"
}
```

**Response**
```
{
	"id": 3,
	"name": "Nami",
	"epithet": "Cat Burglar",
	"character_debut": "Chapter 8",
	"age": "20",
	"birthday": "Unknown",
	"origin": "Unknown",
	"current_bounty": "366.000.000",
	"previous_bounty": null,
	"devil_fruit": null,
	"haki": null,
	"weapons": null,
	"crew": null,
	"role": null,
	"affiliations": null,
	"status": "Unknown"
}
```

**Felhantering**
- 400 Bad Request - Om name och character_debut saknas

### 5.4 PUT /onepiece/:id
Uppdaterar en karaktär

**Request**
PUT /onepiece/3

JSON body: 
```
{
    "name": "Usopp",
    "epithet": "King of Snipers",
    "character_debut": "Chapter 23",
    "age": "19",
    "current_bounty": "500.000.000"
}
```

**Response**
```
{
	"id": 3,
	"name": "Usopp",
	"epithet": "King of Snipers",
	"character_debut": "Chapter 23",
	"age": "19",
	"birthday": "Unknown",
	"origin": "Unknown",
	"current_bounty": "500.000.000",
	"previous_bounty": null,
	"devil_fruit": null,
	"haki": null,
	"weapons": null,
	"crew": null,
	"role": null,
	"affiliations": null,
	"status": "Unknown"
}
```

**Felhantering**
- 404 Not Found - Om karaktären inte finns

### 5.5 DELETE /onepiece/:id
Raderar en karaktär

**Request**
DELETE /onepiece/3

**Response**
```
{
	"message": "Character with ID 3 has been deleted",
	"deletedCharacter": {
		"id": 3,
		"name": "Usopp",
		"epithet": "King of Snipers",
		"character_debut": "Chapter 23",
		"age": "19",
		"birthday": "Unknown",
		"origin": "Unknown",
		"current_bounty": "500.000.000",
		"previous_bounty": null,
		"devil_fruit": null,
		"haki": null,
		"weapons": null,
		"crew": null,
		"role": null,
		"affiliations": null,
		"status": "Unknown"
	}
}
```

**Felhantering**
- 404 Not Found - Om karaktären inte finns