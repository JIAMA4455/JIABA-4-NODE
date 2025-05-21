import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDTO, UpdateTaskDTO } from './types';

export class TaskController {
  private service: TaskService;

  constructor() {
    this.service = new TaskService();
  }

  public getAllTasks = (_req: Request, res: Response): void => {
    const tasks = this.service.getAllTasks();
    res.json(tasks);
  };

  public getTaskById = (req: Request, res: Response): void => {
    const task = this.service.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  public createTask = (req: Request, res: Response): void => {
    const taskData: CreateTaskDTO = req.body;
    const task = this.service.createTask(taskData);
    res.status(201).json(task);
  };

  public updateTask = (req: Request, res: Response): void => {
    const taskData: UpdateTaskDTO = req.body;
    const task = this.service.updateTask(req.params.id, taskData);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  };

  public deleteTask = (req: Request, res: Response): void => {
    const success = this.service.deleteTask(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(204).send();
  };
} 