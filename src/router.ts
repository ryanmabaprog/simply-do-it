import express from 'express';
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';

const router = express.Router();
const taskController = new TaskController(new TaskService());

router.post('/tasks', (req, res) => {
    taskController.createTask(req, res);
});

router.get('/tasks', (req, res) => {
    taskController.getTasks(req, res);
});

router.patch('/tasks/:taskId', (req, res) => {
    taskController.updateTask(req, res);
});

export default router;  