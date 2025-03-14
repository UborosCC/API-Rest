import express from 'express';
import fs from 'fs';

const router = express.Router();

// Läser db.json
const readData = () => {
    try {
        const data = fs.readFileSync("db.json", "utf8");
        return JSON.parse(data) || { users: [], one_piece_characters: [] };
    } catch (error) {
        console.error("Error reading db.json:", error);
        return { users: [], one_piece_characters: [] };
    }
};

// Skriver till db.json
const writeData = (data) => {
    try {
        fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to db.json:", error.message);
        throw new Error("Failed to save data");
    }
};

// === One Piece Characters Routes ===
// Hämta alla karaktärer
router.get('/', (req, res) => {
    try {
        const data = readData();
        console.log("Data from db.json:", data.one_piece_characters);

        if (!data.one_piece_characters) {
            return res.status(500).json({ error: "Characters are missing from db.json!" });
        }

        res.json(data.one_piece_characters);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Hämta en specifik karaktär
router.get('/:id', (req, res) => {
    try {
        const data = readData();
        const character = data.one_piece_characters.find(c => c.id === parseInt(req.params.id));

        console.log("Character Found:", character);

        if (!character) {
            console.warn(`Character with ID ${req.params.id} not found.`);
            return res.status(404).json({ error: "Character not found." });
        }

        res.json(character);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Skapa en ny karaktär
router.post('/', (req, res) => {
    try {
        const data = readData();

        if (!req.body.name || !req.body.character_debut) {
            return res.status(400).json({ error: "Name and Character debut is required." });
        }

        if (!Array.isArray(data.one_piece_characters)) {
            data.one_piece_characters = [];
        }

        console.log("Data before update:", data);

        const newCharacter = {
            id: data.one_piece_characters.length > 0 ? data.one_piece_characters[data.one_piece_characters.length - 1].id + 1 : 1,
            name: req.body.name,
            epithet: req.body.epithet || null,
            character_debut: req.body.character_debut,
            age: req.body.age || "Unknown",
            birthday: req.body.birthday || "Unknown",
            origin: req.body.origin || "Unknown",
            current_bounty: req.body.current_bounty || null,
            previous_bounty: req.body.previous_bounty || null,
            devil_fruit: req.body.devil_fruit || null,
            haki: req.body.haki || null,
            weapons: req.body.weapons || null,
            crew: req.body.crew || null,  
            role: req.body.role || null,
            affiliations: req.body.affiliations || null,
            status: req.body.status || "Unknown"
        };

        data.one_piece_characters.push(newCharacter);
        writeData(data);

        console.log("New Character added", newCharacter);
        console.log("Data after update:", data.one_piece_characters);

        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Uppdatera en karaktär
router.put('/:id', (req, res) => {
    try {
        const data = readData();
        const characterIndex = data.one_piece_characters.findIndex(c => c.id === parseInt(req.params.id));

        if (characterIndex === -1) {
            console.warn(`PUT request for non-existing character ID ${req.params.id}`);
            return res.status(404).json({ error: "Character not found." });
        }

        if (!req.body.name) {
            return res.status(400).json({ error: "Name is required." });
        }

        console.log("Incoming PUT request for character ID:", req.params.id);
        console.log("Received body data:", req.body);
        console.log("Character before update:", data.one_piece_characters[characterIndex]);

        // Hämta nuvarande karaktär
        const existingCharacter = data.one_piece_characters[characterIndex];

        // Uppdatera endast de fält som skickas i `req.body`
        const updatedCharacter = {
            ...existingCharacter, // Behåller befintliga värden
            name: req.body.name || existingCharacter.name,
            epithet: req.body.epithet !== undefined ? req.body.epithet : existingCharacter.epithet,
            character_debut: req.body.character_debut !== undefined ? req.body.character_debut : existingCharacter.character_debut,
            age: req.body.age !== undefined ? req.body.age : existingCharacter.age,
            birthday: req.body.birthday !== undefined ? req.body.birthday : existingCharacter.birthday,
            origin: req.body.origin !== undefined ? req.body.origin : existingCharacter.origin,
            current_bounty: req.body.current_bounty !== undefined ? req.body.current_bounty : existingCharacter.current_bounty,
            previous_bounty: req.body.previous_bounty !== undefined ? req.body.previous_bounty : existingCharacter.previous_bounty,
            devil_fruit: req.body.devil_fruit !== undefined ? req.body.devil_fruit : existingCharacter.devil_fruit,
            haki: req.body.haki !== undefined ? req.body.haki : existingCharacter.haki,
            weapons: req.body.weapons !== undefined ? req.body.weapons : existingCharacter.weapons,
            crew: req.body.crew !== undefined ? req.body.crew : existingCharacter.crew,
            role: req.body.role !== undefined ? req.body.role : existingCharacter.role,
            affiliations: req.body.affiliations !== undefined ? req.body.affiliations : existingCharacter.affiliations,
            status: req.body.status !== undefined ? req.body.status : existingCharacter.status,
        };

        // Uppdatera karaktären i databasen
        data.one_piece_characters[characterIndex] = updatedCharacter;
        writeData(data);

        console.log("Character updated successfully", data.one_piece_characters[characterIndex]);

        res.json(data.one_piece_characters[characterIndex]);
    } catch (error) {
        console.error("Error during PUT request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ta bort en karaktär
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const characterIndex = data.one_piece_characters.findIndex(c => c.id === parseInt(req.params.id));

        if (characterIndex === -1) {
            console.log(`DELETE request for non-existing character ID ${req.params.id}`);
            return res.status(404).json({ error: "Character not found." });
        }

        console.log("Deleting Character ID:", req.params.id);

        const deletedCharacter = data.one_piece_characters.splice(characterIndex, 1)[0];
        writeData(data);

        console.log("Character deleted successfully:", deletedCharacter);
        console.log("Remaining Characters:", data.one_piece_characters);

        res.json({ message: `Character with ID ${req.params.id} has been deleted`, deletedCharacter });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
