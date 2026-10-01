import crypto from "crypto";
import pg from "./config/pg.js"


class Task {
    private id: string;
    title: string;
    status: string;

    constructor({ title, status }: { title: string; status: string }) {
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
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

}

export default Task
