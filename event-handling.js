// ============ FORM SUBMISSION EVENT ============
taskForm.addEventListener("submit", function(e) {
  e.preventDefault() // Prevent page reload
  
  const taskText = taskInput.value.trim()
  
  // Validate input
  if (taskText === "") {
    alert("Please enter a task!")
    return
  }
  
  // Add task to the list
  addTask(taskText)
  
  // Clear input field
  taskInput.value = ""
  taskInput.focus()
  
  console.log("Task added:", taskText)
})

// ============ INPUT CHANGE EVENT ============
taskInput.addEventListener("input", function() {
  console.log("Current input value:", this.value)
})

// ============ DELETE BUTTON EVENT DELEGATION ============
taskList.addEventListener("click", function(e) {
  // Check if clicked element is a delete button
  if (e.target.classList.contains("delete-btn")) {
    const taskItem = e.target.parentElement

    deleteTask(taskItem.dataset.id)

    const taskText = taskItem.querySelector(".task-text").textContent
    console.log("Task deleted:", taskText)
    return
  }

  if (e.target.classList.contains("task-text")) {
    const taskItem = e.target.parentElement
    toggleTaskCompletion(taskItem.dataset.id)
  }
})

// ============ KEYBOARD SHORTCUT (Enter to add task) ============
taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    taskForm.dispatchEvent(new Event("submit"))
  }
})