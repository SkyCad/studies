export default class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    // convert the object to a string
    toString() {
        return `Task ${this.id} : ${this.title}`;
    }

    // display the object as an HTML list item
    toHTML() {
        return `
            <li id="task-${this.id}">
                ${this.toString()}
                <button class="delete-btn styled-delete-btn" data-id="${this.id}">Delete</button>
                <button class="edit-btn styled-modify-btn" data-id="${this.id}">Edit</button>
                <button class="complete-btn styled-complete-btn" data-id="${this.id}">Complete</button>
            </li>
        `;
    }

    // static methods to handle load, save and render tasks

    static loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks.map(task => new Task(task.id, task.title));
    }

    static saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static renderTasks(tasks, taskList) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = task.toHTML();
            taskList.appendChild(li);
        });

        // Attach event listeners to delete buttons
        const deleteButtons = taskList.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                Task.removeTask(tasks, taskId, taskList);
            });
        });

        // Attach event listeners to edit buttons
        const editButtons = taskList.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                const newTitle = prompt('Enter new task title:');
                if (newTitle) {
                    Task.modifyTask(tasks, taskId, newTitle, taskList);
                }
            });
        });

        // Attach event listeners to complete buttons
        const completeButtons = taskList.querySelectorAll('.complete-btn');
        completeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                Task.completeTask(taskId);
            });
        });
    }

    // static methods to add, remove and modify tasks

    static addTask(tasks, taskInput, taskList) {
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
            const newTask = new Task(taskId, taskTitle);
            tasks.push(newTask);
            Task.saveTasks(tasks);
            Task.renderTasks(tasks, taskList);
            taskInput.value = '';
        } else {
            alert('Task title cannot be empty!');
        }
    }

    static removeTask(tasks, taskId, taskList) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            Task.saveTasks(tasks);
            Task.renderTasks(tasks, taskList);
        }
    }

    static modifyTask(tasks, taskId, newTitle, taskList) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = newTitle;
            Task.saveTasks(tasks);
            Task.renderTasks(tasks, taskList);
        }
    }

    // static method to put a completed task in green

    static completeTask(taskId) {
        const taskElement = document.getElementById(`task-${taskId}`);
        if (taskElement) {
            taskElement.style.color = 'green';
        }
    }

    // static method to initialize the task handling with the DOM

    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            const taskForm = document.getElementById('taskForm');
            const taskInput = document.getElementById('taskInput');
            const taskList = document.getElementById('taskList');

            const tasks = Task.loadTasks();

            Task.renderTasks(tasks, taskList);

            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                Task.addTask(tasks, taskInput, taskList);
            });
        });
    }
}