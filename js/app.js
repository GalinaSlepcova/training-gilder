function initTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            contents.forEach(c => c.classList.remove('active'));
            const activeTab = document.getElementById(tabId);
            if (activeTab) activeTab.classList.add('active');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            
            if (tabId === 'plan') renderTaskListOnPlanPage();
            if (tabId === 'schedule') renderSchedulePage();
            if (tabId === 'materials') renderMaterials();
            if (tabId === 'dashboard') renderDashboard();
        });
    });
}


function initResetButton() {
    const resetBtn = document.getElementById('resetDemoBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            tasks = JSON.parse(JSON.stringify(defaultTasks));
            materials = JSON.parse(JSON.stringify(defaultMaterials));
            scheduleEvents = JSON.parse(JSON.stringify(defaultSchedule));
            saveTasks();
            saveMaterials();
            saveSchedule();
            renderDashboard();
            renderTaskListOnPlanPage();
            renderSchedulePage();
            renderMaterials();
            alert('Данные сброшены к демо-версии');
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initTabs();
    initResetButton();
    initSettingsListeners();
    
   
    renderDashboard();
    renderTaskListOnPlanPage();
    renderSchedulePage();
    renderMaterials();
    applySettingsToUI();
    
   
    const taskForm = document.getElementById('taskForm');
    if (taskForm) taskForm.addEventListener('submit', handleAddTask);
    

    const addMaterialBtn = document.getElementById('addMaterialBtn');
    if (addMaterialBtn) addMaterialBtn.addEventListener('click', handleAddMaterial);
    
   
    const taskFilter = document.getElementById('taskFilterSubject');
    if (taskFilter) taskFilter.addEventListener('input', () => renderTaskListOnPlanPage());
    
    const clearFilter = document.getElementById('clearTaskFilter');
    if (clearFilter) clearFilter.addEventListener('click', () => {
        if (document.getElementById('taskFilterSubject')) {
            document.getElementById('taskFilterSubject').value = '';
            renderTaskListOnPlanPage();
        }
    });
    
    const scheduleFilter = document.getElementById('scheduleFilter');
    if (scheduleFilter) scheduleFilter.addEventListener('input', () => renderSchedulePage());
});