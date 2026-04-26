import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import processRoutes from './routes/processRoutes';
import translateRoutes from './routes/translateRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/process', processRoutes);
app.use('/translate', translateRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
