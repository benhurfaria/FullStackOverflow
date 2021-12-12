import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());

export default app;