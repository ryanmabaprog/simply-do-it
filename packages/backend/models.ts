import crypto from "crypto";
import pg from "./config/pg.js"

export type TaskStatus = 'pending' | 'done' | 'in_progress';

class Task {

    private id: string;
    title: string;
    status: TaskStatus;

    constructor({ title, status }: { title: string; status: TaskStatus }) {
        this.id = this.generateId();
        this.title = title;
        this.status = status;
    }

    generateId(): string {
        return crypto.randomUUID();
    }

    async createTask(): Promise<void> {
        try {
            await pg.query(
                `INSERT INTO tasks(id, title, status) VALUES ($1, $2, $3)`,
                [this.id, this.title, this.status]
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async listTask(): Promise<any> {
        try {
            const result = await pg.query('SELECT * FROM tasks');
            return result.rows;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async getTaskById(id: string): Promise<any> {
        if (!id) {
            throw new Error("ID da tarefa não fornecido");
        }
        try {
            const result = await pg.query('SELECT * FROM tasks WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                throw new Error("Tarefa não encontrada");
            }
            return result.rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
        if (!id) {
            throw new Error("ID da tarefa não fornecido");
        }
        try {
            await pg.query('UPDATE tasks SET status = $1 WHERE id = $2', [status, id]);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}


export default Task
