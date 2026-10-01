import { TaskService } from './taskService.js';

export class TaskController {
    constructor(private taskService: TaskService) {}

    async createTask(req: any, res: any) {
        try {
            const { title, description, dueDate } = req.body;
            const userId = req.user.id;

            const task = await this.taskService.createTask({
                userId,
                title,
                description,
                dueDate,
            });

            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create task' });
        }
    }

    async getTasks(req: any, res: any) {
        try {
            const userId = req.user.id;

            const tasks = await this.taskService.getTasksByUserId(userId);

            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    }

    async updateTask(req: any, res: any) {
        try {
            const { taskId } = req.params;
            const { title, description, dueDate, completed } = req.body;
            const userId = req.user.id;

            const updatedTask = await this.taskService.updateTask(taskId, userId, {
                title,
                description,
                dueDate,
                completed,
            });

            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update task' });
        }
    }
}