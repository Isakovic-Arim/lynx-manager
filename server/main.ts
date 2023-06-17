import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { userRouter } from './router/user-router';
import { notifsRouter } from './router/notifs-router';
import { authRouter } from './router/auth-router';
import { organisationRouter } from './router/organisation-router';
import { taskRouter } from './router/task-router';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/notifs', notifsRouter);
app.use('/api/organisations', organisationRouter);
app.use('/api/tasks', taskRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});