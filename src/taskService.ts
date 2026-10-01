import { randomUUID } from 'node:crypto';
import { Task, type TaskProps } from './taskDomain.js';
import { TaskModel } from './taskModels.js';

type DateInput = Date | string | null | undefined;

export type CreateTaskInput = {
    userId: string;
    title: string;
    description?: string | null;
    dueDate?: DateInput;
};

export type UpdateTaskInput = {
    title?: string;
    description?: string | null;
    dueDate?: DateInput;
    completed?: boolean;
};

export class TaskService {
    constructor(private taskModel = new TaskModel()) {}

    async createTask(input: CreateTaskInput): Promise<TaskProps> {
        const task = Task.create({
            id: randomUUID(),
            userId: input.userId,
            title: input.title,
            description: input.description ?? null,
            dueDate: this.parseDate(input.dueDate),
        });

        await this.taskModel.create(task);
        return task.toJSON();
    }

    async getTasksByUserId(userId: string): Promise<TaskProps[]> {
        const tasks = await this.taskModel.findByUserId(userId);
        return tasks.map((task) => task.toJSON());
    }

    async updateTask(
        taskId: string,
        userId: string,
        input: UpdateTaskInput,
    ): Promise<TaskProps> {
        const task = await this.taskModel.findById(taskId);

        if (!task || task.userId !== userId) {
            throw new Error('Task not found');
        }

        if (input.title !== undefined) {
            task.rename(input.title);
        }
        if (input.description !== undefined) {
            task.changeDescription(input.description);
        }
        if (input.dueDate !== undefined) {
            task.changeDueDate(this.parseDate(input.dueDate));
        }
        if (input.completed === true) {
            task.complete();
        } else if (input.completed === false) {
            task.reopen();
        }

        await this.taskModel.update(task);
        return task.toJSON();
    }

    private parseDate(value: DateInput): Date | null {
        if (value === null || value === undefined || value instanceof Date) {
            return value ?? null;
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            throw new Error('Invalid due date');
        }

        return date;
    }
}
