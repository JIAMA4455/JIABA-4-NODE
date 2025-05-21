import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRouter from './tasks/task.router';
import { requestLogger, errorHandler, setupUncaughtExceptionHandler, setupUnhandledRejectionHandler } from './logger/logger';

// Настройка обработчиков необработанных ошибок
setupUncaughtExceptionHandler();
setupUnhandledRejectionHandler();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);

// Routes
app.use('/api/tasks', taskRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Тестовые ошибки для проверки обработчиков
// throw Error('Oops!'); // Раскомментируйте для проверки uncaughtException
// Promise.reject(Error('Oops!')); // Раскомментируйте для проверки unhandledRejection 