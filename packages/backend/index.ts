import express from 'express';
import TaskController from './controllers.js';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
const taskController = new TaskController();

const PORT: number = 3000

app.get('/task/:id', async (req, res) => {
    taskController.getTaskById(req, res);
});

app.get("/task", async (_req, res) => {
    taskController.listTasks(_req, res);
})
    

app.post("/task", async (req, res) => {
    taskController.createTask(req, res);
});

app.post('/task/:id/status', async (req, res) => {
    taskController.updateTaskStatus(req, res);
});

// Deve ser registrado depois das rotas: só é alcançado quando nenhuma delas responde.
app.use((req, res) => {
    return res.status(404).json({
        error: "Rota não encontrada",
        method: req.method,
        path: req.originalUrl,
    });
});

app.listen(PORT, () => { console.log("Rodando na porta " + PORT) })
