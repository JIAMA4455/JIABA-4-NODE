import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import { AppDataSource } from './config/data-source';
import { taskRouter } from './tasks/task.router';
import { logger } from './logger/logger';

config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Initialize TypeORM and start server
AppDataSource.initialize()
  .then(() => {
    logger.info('Database connection established');
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error('Error during Data Source initialization:', error);
    process.exit(1);
  });

// Тестовые ошибки для проверки обработчиков
// throw Error('Oops!'); // Раскомментируйте для проверки uncaughtException
// Promise.reject(Error('Oops!')); // Раскомментируйте для проверки unhandledRejection 