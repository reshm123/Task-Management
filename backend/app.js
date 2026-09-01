import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Allow React frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Centralized Error Handler
app.use(errorHandler);

export default app;