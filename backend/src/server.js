import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

console.log('=== Server.js starting ===');

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 