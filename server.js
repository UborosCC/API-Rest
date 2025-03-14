import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';  
import onepieceRoutes from './routes/onepiece.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Använd våra routes
app.use('/users', usersRoutes);
app.use('/onepiece', onepieceRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
