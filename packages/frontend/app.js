const API_URL = window.SIMPLY_DO_API_URL || 'http://localhost:3000';
const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const statusInput = document.querySelector('#status');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const feedback = document.querySelector('#feedback');
const emptyState = document.querySelector('#empty-state');
const refreshButton = document.querySelector('#refresh');
const statusLabels = { pending: 'Pendente', in_progress: 'Em andamento', done: 'Concluída' };

function showFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle('error', isError);
}
function taskTemplate(task) {
  const item = document.createElement('li');
  item.className = `task task--${task.status}`;
  const title = document.createElement('p');
  title.textContent = task.title;
  const select = document.createElement('select');
  select.setAttribute('aria-label', `Alterar status de ${task.title}`);
  Object.entries(statusLabels).forEach(([value, label]) => select.add(new Option(label, value, false, value === task.status)));
  select.addEventListener('change', () => updateStatus(task.id, select));
  item.append(title, select);
  return item;
}
function renderTasks(tasks) {
  taskList.replaceChildren(...tasks.map(taskTemplate));
  emptyState.hidden = tasks.length !== 0;
  taskCount.textContent = tasks.length === 1 ? '1 tarefa' : `${tasks.length} tarefas`;
}
async function loadTasks() {
  showFeedback('Carregando tarefas…');
  try {
    const response = await fetch(`${API_URL}/task`);
    if (!response.ok) throw new Error('Não foi possível carregar as tarefas.');
    const data = await response.json();
    renderTasks(data.tasks ?? []);
    showFeedback('');
  } catch (error) {
    renderTasks([]);
    showFeedback(`${error.message} Verifique se a API está em ${API_URL}.`, true);
  }
}
async function updateStatus(id, select) {
  select.disabled = true;
  try {
    const response = await fetch(`${API_URL}/task/${id}/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: select.value }) });
    if (!response.ok) throw new Error('Não foi possível atualizar o status.');
    showFeedback('Status atualizado.');
    await loadTasks();
  } catch (error) { showFeedback(error.message, true); }
  finally { select.disabled = false; }
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  const button = form.querySelector('button');
  button.disabled = true;
  try {
    const response = await fetch(`${API_URL}/task`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, status: statusInput.value }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Não foi possível criar a tarefa.');
    form.reset();
    showFeedback('Tarefa adicionada.');
    await loadTasks();
  } catch (error) { showFeedback(error.message, true); }
  finally { button.disabled = false; }
});
refreshButton.addEventListener('click', loadTasks);
loadTasks();
