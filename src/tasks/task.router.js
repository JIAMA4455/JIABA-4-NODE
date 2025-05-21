import { Router } from 'express';
import { TaskController } from './task.controller.js';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export const taskRouter = router; 