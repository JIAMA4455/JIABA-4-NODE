import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { taskRouter } from './tasks/task.router.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 