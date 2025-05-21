import { Request, Response, NextFunction } from 'express';
import { CreateTaskDTO, UpdateTaskDTO } from './types';

export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
  const taskData: CreateTaskDTO | UpdateTaskDTO = req.body;

  if (!taskData.title || typeof taskData.title !== 'string' || taskData.title.trim().length === 0) {
    res.status(400).json({ message: 'Title is required and must be a non-empty string' });
    return;
  }

  if (!taskData.description || typeof taskData.description !== 'string' || taskData.description.trim().length === 0) {
    res.status(400).json({ message: 'Description is required and must be a non-empty string' });
    return;
  }

  if (taskData.status && !['pending', 'in-progress', 'completed'].includes(taskData.status)) {
    res.status(400).json({ message: 'Status must be one of: pending, in-progress, completed' });
    return;
  }

  if (taskData.priority && !['low', 'medium', 'high'].includes(taskData.priority)) {
    res.status(400).json({ message: 'Priority must be one of: low, medium, high' });
    return;
  }

  next();
}; 