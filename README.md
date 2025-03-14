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

<<<<<<< HEAD
404, om användare inte finns.
=======
404 Not Found, om användare inte finns.
>>>>>>> c953987dc26f61218c6c5829e294f105d86998d2

# Skapa en ny användare

POST /users
Lägger till en ny användare i systemet

Request: Headers: Content-Type: application/json
         Body (JSON): { "name": "Erik" }

Response: 

{ "id": 3, "name": "Erik" }

Möjliga fel: 

<<<<<<< HEAD
400, om name saknas i body
=======
400 Bad Request, om name saknas i body
>>>>>>> c953987dc26f61218c6c5829e294f105d86998d2

# Uppdatera en användare

PUT /users/:id
Uppdatera en användare namn baserat på ID

Request: Path parameter: id (Nummer)
         Headers: Content-Type: application/json
         Body (JSON): { "name": "Erik" }

Response: { "id": 1, "name": "Erik" }

Möjliga fel:

<<<<<<< HEAD
404, Om användaren inte finns.
=======
404 Not Found, Om användaren inte finns.
>>>>>>> c953987dc26f61218c6c5829e294f105d86998d2

# Ta bort en användare 

DELETE /users/:id
Tar bort en användare baserat på ID

Request: Path parameter: id (Nummer)

Response: 

{ "message": "Användare med ID (nummer) har tagits bort." }

Möjliga fel:

<<<<<<< HEAD
404, Om användaren inte finns
=======
404 Not Found, Om användaren inte finns
>>>>>>> c953987dc26f61218c6c5829e294f105d86998d2
