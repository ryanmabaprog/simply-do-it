import TaskModel, { type TaskStatus } from './models.js';

function isTaskStatus(status: unknown): status is TaskStatus {
    return status === 'pending' || status === 'done' || status === 'in_progress';
}

class TaskController {
    async listTasks(req: any, res: any): Promise<any> {
        try {
            const tasks = await TaskModel.listTask();
            return res.status(200).json({
                message: "Tarefas encontradas com sucesso",
                tasks,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao buscar as tarefas",
            });
        }
    }

    async createTask(req: any, res: any): Promise<any> {
        const { title, status } = req.body ?? {};
        if (typeof title !== 'string' || title.trim().length === 0 || !isTaskStatus(status)) {
            return res.status(400).json({
                error: "title e um status válido são obrigatórios",
            });
        }

        try {
            const taskModel = new TaskModel({ title: title.trim(), status });
            await taskModel.createTask();
            return res.status(201).json({ title: title.trim(), status });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao criar a tarefa" });
        }
    }

    async getTaskById(req: any, res: any): Promise<any> {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID da tarefa não fornecido" });
        }
        try {
            const task = await TaskModel.getTaskById(id);
            return res.status(200).json(task);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
    }

    async updateTaskStatus(req: any, res: any): Promise<any> {
        const { id } = req.params;
        const { status } = req.body ?? {};
        if (!id) {
            return res.status(400).json({ error: "ID da tarefa não fornecido" });
        }
        if (!isTaskStatus(status)) {
            return res.status(400).json({ error: "Status inválido" });
        }
        try {
            await TaskModel.updateTaskStatus(id, status);
            return res.status(200).json({ message: "Status da tarefa atualizado com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao atualizar o status da tarefa" });
        }
    }
}

export default TaskController;
