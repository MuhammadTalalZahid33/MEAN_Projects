import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/users', userRouter);

app.use(express.static('public'));
export { app };