import { Router } from 'express';
import { TaskController } from './task.controller';
import { validateTask } from './task.validator';

const router = Router();
const controller = new TaskController();

router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.post('/', validateTask, controller.createTask);
router.put('/:id', validateTask, controller.updateTask);
router.delete('/:id', controller.deleteTask);

export default router; 