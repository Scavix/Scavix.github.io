let tasks = [];

function addTask() {
    let taskInput = document.getElementById('taskInput');
    tasks.push(taskInput.value);
    taskInput.value = '';
    displayTasks();
}

function clearTasks() {
    tasks = [];
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    for(let i = 0; i < tasks.length; i++) {
        let li = document.createElement('li');
        li.textContent = tasks[i];
        taskList.appendChild(li);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks();
}

function saveCookie() {
    document.cookie = `tasks=${JSON.stringify(tasks)}`;
}

function loadCookie() {
    tasks = JSON.parse(document.cookie.split('=')[1]) || [];
    displayTasks();
}