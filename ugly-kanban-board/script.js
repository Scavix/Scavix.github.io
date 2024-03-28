const app = document.getElementById("app");
var idcount = 0;

function createColumn(title) {
  const column = document.createElement("div");
  column.classList.add("column");
  column.setAttribute("draggable", "true");

  const columnHeader = document.createElement("div");
  columnHeader.classList.add("column-header");
  columnHeader.innerText = title;

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    column.remove();
  });

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  columnHeader.appendChild(removeButton);
  column.appendChild(columnHeader);
  column.appendChild(tasksContainer);

  column.addEventListener("dragstart", handleDragStart);
  column.addEventListener("dragover", handleDragOver);
  column.addEventListener("drop", handleDrop);

  return column;
}

function createTask(content) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.setAttribute("id", idcount++);

  const taskContent = document.createElement("span");
  taskContent.innerText = content;

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-btn");
  removeButton.addEventListener("click", () => {
    task.remove();
  });

  task.appendChild(taskContent);
  task.appendChild(removeButton);

  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragover", handleDragOver);
  task.addEventListener("drop", handleDrop);

  return task;
}

function addColumn(title) {
  const column = createColumn(title);
  app.querySelector(".board").appendChild(column);
}

function addTask(columnIndex, content) {
  const tasksContainer = app
    .querySelectorAll(".column")
    [columnIndex].querySelector(".tasks-container");
  const task = createTask(content);
  tasksContainer.appendChild(task);
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggableElement = document.getElementById(data);
  const dropzone = event.target.closest(".column");
  const tasksContainer = dropzone.querySelector(".tasks-container");

  if (draggableElement.classList.contains("task")) {
    tasksContainer.appendChild(draggableElement);
  } else if (draggableElement.classList.contains("column")) {
    const columns = Array.from(app.querySelectorAll(".column"));
    const indexToInsert = columns.indexOf(dropzone);
    const columnsContainer = dropzone.parentElement;
    columnsContainer.insertBefore(
      draggableElement,
      columnsContainer.children[indexToInsert]
    );
  }
}

const addColumnBtn = document.getElementById("add-column-btn");
addColumnBtn.addEventListener("click", () => {
  const columnNameInput = document.getElementById("column-name-input");
  const columnName = columnNameInput.value.trim();
  if (columnName !== "") {
    addColumn(columnName);
    columnNameInput.value = "";
  }
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => {
  const taskContentInput = document.getElementById("task-content-input");
  const taskContent = taskContentInput.value.trim();
  if (taskContent !== "") {
    addTask(0, taskContent);
    taskContentInput.value = "";
  }
});

addColumn("To Do");
addColumn("In Progress");
addColumn("Done");

addTask(0, "Task 1");
addTask(0, "Task 2");
addTask(1, "Task 3");
addTask(2, "Task 4");

function saveToCookies() {
  const boardState = [];
  const columns = document.querySelectorAll(".column");

  columns.forEach((column) => {
    const columnState = {
      title: column.querySelector(".column-header").firstChild.nodeValue,
      tasks: [],
    };
    const tasks = column.querySelectorAll(".task");
    tasks.forEach((task) => {
      columnState.tasks.push(task.firstChild.textContent.trim());
    });

    boardState.push(columnState);
  });

  const jsonBoardState = JSON.stringify(boardState);
  document.cookie = `kanban_board=${jsonBoardState}; expires=${new Date(
    Date.now() + 604800000
  ).toUTCString()}; path=/`;
}

function loadFromCookies() {
  cleanBoard();
  const cookies = document.cookie.split("; ");
  const kanbanCookie = cookies.find((cookie) =>
    cookie.startsWith("kanban_board=")
  );

  if (kanbanCookie) {
    const jsonBoardState = kanbanCookie.split("=")[1];
    const boardState = JSON.parse(jsonBoardState);

    boardState.forEach((columnState) => {
      const column = createColumn(columnState.title);
      addColumn(columnState.title);
      columnState.tasks.forEach((taskContent) => {
        addTask(boardState.indexOf(columnState), taskContent);
      });
    });
  }
}

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", saveToCookies);

const loadBtn = document.getElementById("load-btn");
loadBtn.addEventListener("click", loadFromCookies);

function cleanBoard() {
  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => column.remove());
}
