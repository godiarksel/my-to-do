import './index.css';

// const taskSection = document.querySelector('section');
const taskInput = document.querySelector('input');
const taskContainer = document.querySelector('.task-container');
// const clearBtn = document.querySelector('button');

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const taskArray = [];

const completeTask = (checkbox) => {
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('completed-tasks-container');
      i.nextElementSibling.classList.toggle('completed-tasks');
      i.parentElement.lastElementChild.classList.toggle('trashicon-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('dotsicon-inactive');
    });
  });
};

const addToLocalStorage = (description, completed, index) => {
  const task = new Task(description, completed, index);
  taskArray.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskArray));
};

const addTasks = (task) => {
  const tasksEl = document.createElement('div');
  tasksEl.classList.add('tasks');
  tasksEl.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${task}</span>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  <i class="fa-solid fa-trash"></i>
  `;
  taskContainer.appendChild(tasksEl);
  const checkBox = document.querySelectorAll('.checkbox');
  completeTask(checkBox);
  addToLocalStorage(task, false, checkBox.length - 1);
};

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value !== null) {
    e.preventDefault();
    addTasks(taskInput.value);
    taskInput.value = '';
  }
});