import { Task } from "./taskDomain.js";
import { database } from "./lib/pg.js";

export class TaskModel {
    async create(task: Task): Promise<void> {
        await database.query(`INSERT INTO tasks (id, user_id, title, description, completed, due_date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
            task.id,
            task.userId,
            task.title,
            task.description,
            task.completed,
            task.dueDate,
            task.createdAt,
            task.updatedAt
        ]);
    }

    async update(task: Task): Promise<void> {
        await database.query(`UPDATE tasks SET title = $1, description = $2, completed = $3, due_date = $4, updated_at = $5 WHERE id = $6`, [
            task.title,
            task.description,
            task.completed,
            task.dueDate,
            task.updatedAt,
            task.id
        ]);
    }

    async delete(taskId: string): Promise<void> {
        await database.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
    }

    async findById(taskId: string): Promise<Task | null> {
        const result = await database.query(`SELECT * FROM tasks WHERE id = $1`, [taskId]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.toTask(result.rows[0]);
    }

    async findByUserId(userId: string): Promise<Task[]> {
        const result = await database.query(
            `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId],
        );

        return result.rows.map((row) => this.toTask(row));
    }

    private toTask(row: any): Task {
        return Task.reconstitute({
            id: row.id,
            userId: row.user_id,
            title: row.title,
            description: row.description,
            completed: row.completed,
            dueDate: row.due_date,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        });
    }
}