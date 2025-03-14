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
    try{
        fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to db.json:", error.message);
        throw new Error("Failed to save data");
    }
};

// === User Routes ===
// Hämta alla users
router.get('/', (req, res) => {
    try {
        const data = readData();
        console.log("Data from db.json:", data.users);

        if (!data.users) {
            return res.status(500).json({ error: "Users is missing from db.json!" });
        }

        res.json(data.users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Hämta en specifik user
router.get('/:id', (req, res) => {
    try {
        const data = readData();
        const user = data.users.find(u => u.id === parseInt(req.params.id));

        console.log("User Found:", user)

        if (!user) {
            console.warn(`User with ID ${req.params.id} not found.`);
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    
});

// Skapa en ny User
router.post('/', (req, res) => {
    try {
        const data = readData();

        if (!req.body.name) {
            return res.status(400).json({ error: "Name is required." });
        }

        if (!Array.isArray(data.users)) {
            data.users = [];
        }

        console.log("Data before update:", data);
        const newUser = {
            id: data.users.length + 1 > 0 ? data.users[data.users.length - 1].id + 1 : 1,
            name: req.body.name
        };

        data.users.push(newUser);
        writeData(data);

        console.log("New User added", newUser);
        console.log("Data after update:", data.users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }    
});

// Uppdatera en User
router.put('/:id', (req, res) => {
    try {
        const data = readData();
        const userIndex = data.users.findIndex(u => u.id === parseInt(req.params.id));

        if (userIndex === -1) {
            console.warn(`PUT request for non-existing user ID ${req.params.id}`);
            return res.status(404).json({ error: "User not found." });
        }

        if (!req.body.name) {
            return res.status(400).json({ error: "Name is required." });
        }

        console.log("Incoming PUT request for user ID:", req.params.id);
        console.log("Received body data:", req.body);
        console.log("User before update:", data.users[userIndex]);

        data.users[userIndex].name = req.body.name;
        writeData(data);

        console.log("User update successfully", data.users[userIndex]);

        res.json(data.users[userIndex]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Ta bort en User
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const userIndex = data.users.findIndex(u => u.id === parseInt(req.params.id));

        if (userIndex === -1) {
            console.log(`DELETE request for non-existing user ID ${req.params.id}`);
            return res.status(404).json({ error: "User not found." });
        }

        console.log("Deleting User ID:", req.params.id);

        const deletedUser = data.users.splice(userIndex, 1)[0];
        writeData(data);

        console.log("User deleted successfully:", deletedUser);
        console.log("Remaining Users:", data.users);

        res.json({ message: `User with ID ${req.params.id} has been deleted`, deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;