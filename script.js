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

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(task => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-btn" 
                    onclick="completeTask(this)">✓</button>
                    <button class="delete-btn" 
                    onclick="deleteTask(this)">✗</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}

// Update existing functions to save after changes
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="complete-btn" 
            onclick="completeTask(this)">✓</button>
            <button class="delete-btn" 
            onclick="deleteTask(this)">✗</button>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks(); // Save after adding
}

function completeTask(btn) {
    const li = btn.parentElement.parentElement;
    li.classList.toggle('completed');
    saveTasks(); // Save after completing
}

function deleteTask(btn) {
    const li = btn.parentElement.parentElement;
    li.remove();
    saveTasks(); // Save after deleting
}

// Load tasks when page opens
window.onload = loadTasks;