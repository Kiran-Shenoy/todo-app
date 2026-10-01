// Get elements from HTML
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Add task when button clicked
addBtn.addEventListener('click', function() {
    addTask();
});

// Add task when Enter key pressed
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a task
function addTask() {
    
    // Get the text from input
    const taskText = taskInput.value.trim();
    
    // If input is empty — do nothing
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    
    // Add task text and buttons
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="complete-btn" onclick="completeTask(this)">✓</button>
            <button class="delete-btn" onclick="deleteTask(this)">✗</button>
        </div>
    `;

    // Add to list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';
}

// Function to mark task complete
function completeTask(btn) {
    const li = btn.parentElement.parentElement;
    li.classList.toggle('completed');
}

// Function to delete task
function deleteTask(btn) {
    const li = btn.parentElement.parentElement;
    li.remove();
}