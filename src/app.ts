import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import serverError from './middlewares/serverError';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

app.use(serverError);

export default app; 