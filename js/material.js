function renderMaterials() {
    const container = document.getElementById('materialsList');
    if (!container) return;
    if (materials.length === 0) {
        container.innerHTML = '<p>Нет добавленных материалов.</p>';
        return;
    }
    container.innerHTML = materials.map(m => `
        <div class="material-card">
            <strong> ${escapeHtml(m.name)}</strong> <span class="badge">${escapeHtml(m.course)}</span>
            <button class="btn-secondary btn delete-mat-btn" data-id="${m.id}" style="margin-left: 12px;">Удалить</button>
        </div>
    `).join('');

    document.querySelectorAll('.delete-mat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            materials = materials.filter(m => m.id !== id);
            saveMaterials();
            renderMaterials();
        });
    });
}

function handleAddMaterial() {
    const name = document.getElementById('newMaterialName').value.trim();
    const course = document.getElementById('newMaterialCourse').value.trim() || 'Общий курс';
    if (!name) {
        alert('Введите название материала');
        return;
    }
    const newMat = { id: Date.now().toString(), name: name, course: course };
    materials.push(newMat);
    saveMaterials();
    renderMaterials();
    document.getElementById('newMaterialName').value = '';
    document.getElementById('newMaterialCourse').value = '';
}