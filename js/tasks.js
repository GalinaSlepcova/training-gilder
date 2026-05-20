function renderTaskListOnPlanPage() {
    const container = document.getElementById('allTasksList');
    if (!container) return;
    const filterValue = document.getElementById('taskFilterSubject')?.value.toLowerCase() || '';
    let filtered = tasks.filter(t => filterValue === '' || t.subject.toLowerCase().includes(filterValue));
    if (filtered.length === 0) {
        container.innerHTML = '<p>Задач не найдено. Добавьте новую.</p>';
        return;
    }
    container.innerHTML = filtered.map(task => `
        <div class="material-card" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong>${escapeHtml(task.name)}</strong>
                <span class="badge">${escapeHtml(task.priority)}</span>
            </div>
            <div style="font-size:0.85rem"> ${escapeHtml(task.subject)} |  Дедлайн: ${task.deadline ? task.deadline.replace('T', ' ') : 'не указан'}</div>
            <div> Подзадачи: ${task.subtasks.length ? task.subtasks.map(s => escapeHtml(s)).join(', ') : '—'}</div>
            <div style="margin-top: 8px;">
                <button class="btn-secondary btn complete-task-btn" data-id="${task.id}" style="font-size:0.8rem">${task.completed ? ' Выполнена (отменить)' : ' Отметить выполненной'}</button>
                <button class="btn-secondary btn delete-task-btn" data-id="${task.id}" style="background:#fee2e2;"> Удалить</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.complete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const taskObj = tasks.find(t => t.id === id);
            if (taskObj) {
                taskObj.completed = !taskObj.completed;
                saveTasks();
                renderTaskListOnPlanPage();
                renderDashboard();
                if (settings.notifications === 'enabled') console.log(' Статус задачи изменён', taskObj.name);
            }
        });
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTaskListOnPlanPage();
            renderDashboard();
        });
    });
}

function handleAddTask(e) {
    e.preventDefault();
    const nameInput = document.getElementById('taskName');
    const name = nameInput.value.trim();
    if (!name) {
        alert('Название задачи обязательно!');
        nameInput.style.borderColor = 'var(--danger)';
        return;
    }
    nameInput.style.borderColor = '';
    const subject = document.getElementById('taskSubject').value.trim() || 'Общий';
    const priority = document.getElementById('taskPriority').value;
    let deadline = document.getElementById('taskDeadline').value;
    const subtasksRaw = document.getElementById('taskSubtasks').value;
    const subtasks = subtasksRaw ? subtasksRaw.split(',').map(s => s.trim()) : [];
    const newTask = {
        id: Date.now().toString(),
        name: name,
        subject: subject,
        priority: priority,
        deadline: deadline,
        subtasks: subtasks,
        completed: false
    };
    tasks.unshift(newTask);
    saveTasks();
    document.getElementById('taskForm').reset();
    if (settings.notifications === 'enabled') console.log(' Уведомление: Добавлена задача', newTask.name);
    alert(`Задача "${name}" добавлена!`);
    renderTaskListOnPlanPage();
    renderDashboard();
}