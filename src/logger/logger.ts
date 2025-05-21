import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const { combine, timestamp, printf, colorize } = winston.format;

// Формат логов
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Создаем логгер для обычных логов
const logger = winston.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }),
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    })
  ]
});

// Создаем логгер для ошибок
const errorLogger = winston.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    })
  ]
});

// Middleware для логирования запросов
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.url} ${res.statusCode} ${duration}ms`;
    const logData = {
      method: req.method,
      url: req.url,
      query: req.query,
      body: req.body,
      statusCode: res.statusCode,
      duration
    };

    if (res.statusCode >= 400) {
      errorLogger.error(message, logData);
    } else {
      logger.info(message, logData);
    }
  });

  next();
};

// Middleware для обработки ошибок
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  errorLogger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body
  });

  res.status(500).json({
    message: 'Internal Server Error'
  });
};

// Обработчик необработанных исключений
export const setupUncaughtExceptionHandler = (): void => {
  process.on('uncaughtException', (error: Error) => {
    errorLogger.error('Uncaught Exception:', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  });
};

// Обработчик необработанных отклонений промисов
export const setupUnhandledRejectionHandler = (): void => {
  process.on('unhandledRejection', (reason: Error) => {
    errorLogger.error('Unhandled Rejection:', {
      error: reason.message,
      stack: reason.stack
    });
  });
};

export { logger, errorLogger }; 