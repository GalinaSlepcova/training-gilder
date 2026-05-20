function renderSchedulePage() {
    const container = document.getElementById('scheduleListContainer');
    if (!container) return;
    const filterText = document.getElementById('scheduleFilter')?.value.toLowerCase() || '';
    let filtered = scheduleEvents.filter(ev => filterText === '' || ev.subject.toLowerCase().includes(filterText) || ev.title.toLowerCase().includes(filterText));
    if (filtered.length === 0) {
        container.innerHTML = '<p>Нет событий по фильтру</p>';
        return;
    }
    container.innerHTML = `<ul style="list-style:none;">${filtered.map(ev => `<li style="padding: 10px; border-bottom: 1px solid var(--border);"><strong>${escapeHtml(ev.day)}</strong> ${escapeHtml(ev.time)} – ${escapeHtml(ev.title)} (${escapeHtml(ev.subject)})</li>`).join('')}</ul>`;
}