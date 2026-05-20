function applySettingsToUI() {
    const body = document.body;
    if (settings.theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    const notifSelect = document.getElementById('notifToggle');
    if (notifSelect) notifSelect.value = settings.notifications;
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = settings.theme;
}

function initSettingsListeners() {
    const notifToggle = document.getElementById('notifToggle');
    const themeSelect = document.getElementById('themeSelect');
    
    if (notifToggle) {
        notifToggle.addEventListener('change', (e) => {
            settings.notifications = e.target.value;
            saveSettings();
        });
    }
    
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            settings.theme = e.target.value;
            saveSettings();
            applySettingsToUI();
        });
    }
}