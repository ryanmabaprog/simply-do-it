import express from 'express';
import Task from './models.js';

const app = express();
app.use(express.json());

const PORT: number = 3000

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/task", async (_req, res) => {
    try {
        const tasks = await Task.listTask();

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
});

app.post("/task", async (req, res) => {
    const { title, status } = req.body ?? {};

    if (typeof title !== "string" || !title.trim() ||
        typeof status !== "string" || !status.trim()) {
        return res.status(400).json({
            error: "title e status são obrigatórios",
        });
    }

    try {
        const taskModel = new Task({ title, status });
        await taskModel.createTask();

        return res.status(201).json({ title, status });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
});

app.listen(PORT, () => { console.log("Rodando na porta " + PORT) })