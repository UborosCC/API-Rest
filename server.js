import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let users = [
    { id: 1, name: "Gabriel" },
    { id: 2, name: "Linus" }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "Couldn't find User" });
    }

    res.json(user);
});

app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "User's Name is missing" });
    }

    const newUser = {
        id: users.length + 1,
        name 
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    console.log("Incoming PUT request for user ID:", userId);
    console.log("Received body data:", req.body);

    // Hitta indexet för användaren i arrayen
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        console.log("User not found");
        return res.status(404).json({ message: "Användaren hittades inte" });
    }

    console.log("User before update:", users[userIndex]);

    // Uppdatera objektet i arrayen direkt
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    console.log("User after update:", users[userIndex]);

    res.json(users[userIndex]);
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);

    res.json({ message: `User with ID ${userId} have been removed`});
});

app.listen(port, () => {
    console.log(`Server is live on https://localhost:${port}`);
});