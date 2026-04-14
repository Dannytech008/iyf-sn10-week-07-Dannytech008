// ============ DOM SELECTION ============
const title = document.getElementById("title")
const taskForm = document.querySelector("#taskForm")
const taskInput = document.querySelector("#taskInput")
const taskList = document.querySelector("#taskList")
const submitBtn = document.querySelector("button[type='submit']")
const activeCount = document.querySelector("#activeCount")
const completedCount = document.querySelector("#completedCount")
const totalCount = document.querySelector("#totalCount")
const STORAGE_KEY = "todoTasks"

// ============ DOM CONTENT MANIPULATION ============
title.textContent = "My To-Do List"

// ============ DOM STYLE CHANGES ============
title.style.color = "white"
title.style.marginBottom = "30px"

// ============ STORAGE HELPERS ============
function getTasksFromStorage() {
  try {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(tasks) ? tasks : []
  } catch {
    return []
  }
}

function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// ============ CREATE AND ADD NEW TASK FUNCTION ============
function createTaskElement(task) {
  // Create list item
  const li = document.createElement("li")
  li.className = "task-item"
  li.dataset.id = task.id
  
  // Create task text span
  const taskSpan = document.createElement("span")
  taskSpan.className = "task-text"
  taskSpan.textContent = task.text

  if (task.completed) {
    taskSpan.classList.add("completed")
  }
  
  // Create delete button
  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Delete"
  deleteBtn.className = "delete-btn"
  deleteBtn.type = "button"
  
  // Add elements to list item
  li.appendChild(taskSpan)
  li.appendChild(deleteBtn)
  
  return li
}

// ============ ADD TASK TO LIST ============
function addTask(taskText) {
  const tasks = getTasksFromStorage()
  const newTask = {
    id: Date.now().toString(),
    text: taskText,
    completed: false,
  }

  tasks.push(newTask)
  saveTasksToStorage(tasks)
  renderTasks()
}

function deleteTask(taskId) {
  const tasks = getTasksFromStorage().filter((task) => task.id !== taskId)
  saveTasksToStorage(tasks)
  renderTasks()
}

function toggleTaskCompletion(taskId) {
  const tasks = getTasksFromStorage().map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed }
    }
    return task
  })

  saveTasksToStorage(tasks)
  renderTasks()
}

function updateTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length
  const total = tasks.length
  const active = total - completed

  activeCount.textContent = active
  completedCount.textContent = completed
  totalCount.textContent = total
}

function renderTasks() {
  const tasks = getTasksFromStorage()
  taskList.innerHTML = ""

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task)
    taskList.appendChild(taskElement)
  })

  updateTaskStats(tasks)
}

renderTasks()