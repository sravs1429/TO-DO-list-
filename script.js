document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const clearBtn = document.getElementById('clear-btn');

    addBtn.addEventListener('click', addTodo);
    todoList.addEventListener('click', handleTodoClick);
    clearBtn.addEventListener('click', clearAllTasks);

    loadTodosFromLocalStorage();

    function addTodo() {
        const taskText = todoInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText !== '') {
            const li = document.createElement('li');
            li.className = getPriorityClass(priority);
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <span class="task-priority">${priority}</span>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';
            saveTodosToLocalStorage();
        } else {
            alert('Please enter a task!');
        }
    }

    function handleTodoClick(e) {
        if (e.target.classList.contains('edit-btn')) {
            editTodoTask(e.target.parentElement);
        } else if (e.target.classList.contains('remove-btn')) {
            removeTodoTask(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            saveTodosToLocalStorage();
        }
    }

    function editTodoTask(li) {
        const taskText = li.querySelector('.task-text');
        const newTaskText = prompt('Edit your task', taskText.textContent);
        if (newTaskText) {
            taskText.textContent = newTaskText;
            saveTodosToLocalStorage();
        }
    }

    function removeTodoTask(li) {
        todoList.removeChild(li);
        saveTodosToLocalStorage();
    }

    function clearAllTasks() {
        todoList.innerHTML = '';
        saveTodosToLocalStorage();
    }

    function getPriorityClass(priority) {
        switch (priority) {
            case 'High': return 'high-priority';
            case 'Medium': return 'medium-priority';
            case 'Low': return 'low-priority';
            default: return '';
        }
    }

    function saveTodosToLocalStorage() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('.task-text').textContent;
            const priority = li.querySelector('.task-priority').textContent;
            const completed = li.classList.contains('completed');
            todos.push({ taskText, priority, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodosFromLocalStorage() {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = getPriorityClass(todo.priority);
                if (todo.completed) {
                    li.classList.add('completed');
                }
                li.innerHTML = `
                    <span class="task-text">${todo.taskText}</span>
                    <span class="task-priority">${todo.priority}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="remove-btn">Remove</button>
                `;
                todoList.appendChild(li);
            });
        }
    }
});
