const STORAGE_KEYS = {
    TASKS: 'smart_planner_tasks',
    MATERIALS: 'smart_planner_materials',
    SCHEDULE: 'smart_planner_schedule',
    SETTINGS: 'smart_planner_settings'
};


const defaultTasks = [
    { id: 't1', name: 'Сдать лабораторную работу', subject: 'Физика', priority: 'Высокий ', deadline: '2026-05-25T23:59', subtasks: ['расчеты', 'вывод'], completed: false },
    { id: 't2', name: 'Прочитать главу по UX', subject: 'Дизайн', priority: 'Средний ', deadline: '2026-05-22T18:00', subtasks: [], completed: false },
    { id: 't3', name: 'Написать эссе', subject: 'История', priority: 'Низкий ', deadline: '2026-05-28T12:00', subtasks: ['план', 'черновик'], completed: true }
];

const defaultMaterials = [
    { id: 'm1', name: 'Лекция: Векторы', course: 'Математика' },
    { id: 'm2', name: 'Видео: Основы Python', course: 'Программирование' }
];

const defaultSchedule = [
    { id: 'ev1', title: 'Лекция по веб-технологиям', subject: 'Программирование', day: 'ПН', time: '10:00-12:00' },
    { id: 'ev2', title: 'Семинар по матанализу', subject: 'Математика', day: 'СР', time: '14:00-15:30' },
    { id: 'ev3', title: 'Практикум UI/UX', subject: 'Дизайн', day: 'ПТ', time: '12:00-13:30' }
];

let tasks = [];
let materials = [];
let scheduleEvents = [];
let settings = { notifications: 'enabled', theme: 'light' };


function loadData() {
    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    tasks = storedTasks ? JSON.parse(storedTasks) : JSON.parse(JSON.stringify(defaultTasks));

    const storedMaterials = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    materials = storedMaterials ? JSON.parse(storedMaterials) : JSON.parse(JSON.stringify(defaultMaterials));

    const storedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    scheduleEvents = storedSchedule ? JSON.parse(storedSchedule) : JSON.parse(JSON.stringify(defaultSchedule));

    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) settings = JSON.parse(storedSettings);
}


function saveTasks() { localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks)); }
function saveMaterials() { localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials)); }
function saveSchedule() { localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(scheduleEvents)); }
function saveSettings() { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }


function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}