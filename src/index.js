import './index.css';

const taskInput = document.querySelector('input');
const taskContainer = document.querySelector('.task-container');

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
  addToLocalStorage(task, false, checkBox.length);
};

const editTask = (task, taskContainer) => {
  const editedTask = document.createElement('div');
  editedTask.type = 'text';
  editedTask.classList.add('editedTask');
  editedTask.value = task.textContent;
  taskContainer.replaceChild(editedTask, task);
  editedTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
      const taskContainers = document.querySelectorAll('.tasks');
      localTasks = JSON.parse(localStorage.getItem('taskList'));
      for (let i = 0 ; i < taskContainers.length ; i++){
        if (taskContainers[i].classList.contains('completed-tasks-container')){
          localTasks[i].description = editedTask.value;
          localStorage.setItem('taskList', JSON.stringify(localTasks));
        }
      }
      editedTask.parentElement.classList.remove('completed-tasks-container');
      taskContainer.replaceChild( task, editedTask);
      task.textContent = editedTask.value;
    }
  })
}

const editEllip = document.querySelectorAll('.fa-ellipsis-vertical');
  editEllip.forEach((i) => {
    i.addEventListener('click', () => {
      editTask();
    })
  })

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value !== null) {
    e.preventDefault();
    addTasks(taskInput.value);
    taskInput.value = '';
  }
});