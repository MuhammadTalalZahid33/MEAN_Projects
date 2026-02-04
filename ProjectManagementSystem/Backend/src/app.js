import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import projectRouter from './routes/project.routes.js';
import taskRouter from './routes/task.routes.js';
import teamRouter from './routes/team.routes.js';
import authenticate from './middleware/auth.middleware.js';

//Public route
app.use('/api/v1/auth', authRouter);

//Protected routes

app.use('/api/v1/users', authenticate, userRouter);
app.use('/api/v1/projects', authenticate, projectRouter);
app.use('/api/v1/tasks', authenticate, taskRouter);
app.use('/api/v1/teams', authenticate, teamRouter);

app.use(express.static('public'));
export { app };