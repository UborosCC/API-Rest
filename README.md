# API-Rest

Base URL: http://localhost:3000

# Hämta alla users

GET /users
Hämtar en lista över alla användare

Request: ingen body krävs

Reponse: 

[
  { "id": 1, "name": "Gabriel" },
  { "id": 2, "name": "Linus" }
]

# Hämta en specifik användare

GET /users/:id
Hämtar en användare baserat på ID.

Request: Path parameter: id (nummer)

Response: 

{ "id": 1, "name": "Gabriel" }

Möjliga fel: 

404, om användare inte finns.

# Skapa en ny användare

POST /users
Lägger till en ny användare i systemet

Request: Headers: Content-Type: application/json
         Body (JSON): { "name": "Erik" }

Response: 

{ "id": 3, "name": "Erik" }

Möjliga fel: 

400, om name saknas i body

# Uppdatera en användare

PUT /users/:id
Uppdatera en användare namn baserat på ID

Request: Path parameter: id (Nummer)
         Headers: Content-Type: application/json
         Body (JSON): { "name": "Erik" }

Response: { "id": 1, "name": "Erik" }

Möjliga fel:

404, Om användaren inte finns.

# Ta bort en användare 

DELETE /users/:id
Tar bort en användare baserat på ID

Request: Path parameter: id (Nummer)

Response: 

{ "message": "Användare med ID (nummer) har tagits bort." }

Möjliga fel:

404, Om användaren inte finns
