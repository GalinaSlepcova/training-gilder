function updateGlobalProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed === true).length;
    const percent = total === 0 ? 0 : (completed / total) * 100;
    const fillEl = document.getElementById('globalProgressFill');
    const statEl = document.getElementById('progressStat');
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (statEl) statEl.innerText = `${Math.round(percent)}% выполненных задач (${completed}/${total})`;
    

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', Math.round(percent));
    }
}

function renderDashboard() {
    const weekTasksUl = document.getElementById('weekTasksList');
    if (weekTasksUl) {
        const upcomingTasks = tasks.filter(t => !t.completed).slice(0, 5);
        if (upcomingTasks.length === 0) weekTasksUl.innerHTML = '<li> Задач пока нет, добавьте!</li>';
        else {
            weekTasksUl.innerHTML = upcomingTasks.map(t => `<li class="task-item"><span><strong>${escapeHtml(t.name)}</strong> (${escapeHtml(t.subject)})</span><span class="badge">${escapeHtml(t.priority)}</span></li>`).join('');
        }
    }

    const upcomingEventsDiv = document.getElementById('upcomingEvents');
    if (upcomingEventsDiv) {
        let eventsHtml = scheduleEvents.slice(0, 3).map(ev => `<li class="event-item"> ${escapeHtml(ev.day)} ${escapeHtml(ev.time)} — ${escapeHtml(ev.title)} (${escapeHtml(ev.subject)})</li>`).join('');
        if (scheduleEvents.length === 0) eventsHtml = '<li>Нет занятий</li>';
        upcomingEventsDiv.innerHTML = eventsHtml;
    }
    updateGlobalProgress();
}