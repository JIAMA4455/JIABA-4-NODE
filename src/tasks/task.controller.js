import { TaskService } from './task.service.js';

const taskService = new TaskService();

export class TaskController {
  getAllTasks(req, res) {
    try {
      const tasks = taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getTaskById(req, res) {
    try {
      const task = taskService.getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  createTask(req, res) {
    try {
      const task = taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  updateTask(req, res) {
    try {
      const task = taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  deleteTask(req, res) {
    try {
      taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
} 