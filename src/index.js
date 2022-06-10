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

const editTask = (task, taskContainer) => {
  const editedTask = document.createElement('input');
  editedTask.type = 'text';
  editedTask.className = 'editedTask';
  editedTask.value = task.textContent;
  taskContainer.replaceChild(editedTask, task);
  editedTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const taskContainers = document.querySelectorAll('.tasks');
      const localTasks = JSON.parse(localStorage.getItem('taskList'));
      for (let i = 0; i < taskContainers.length; i += 1) {
        if (taskContainers[i].classList.contains('completed-tasks-container')) {
          localTasks[i].description = editedTask.value;
          localStorage.setItem('taskList', JSON.stringify(localTasks));
        }
      }
      editedTask.parentElement.classList.remove('completed-tasks-container');
      taskContainer.replaceChild(task, editedTask);
      task.textContent = editedTask.value;
    }
  });
};

const removeTask = (task) => {
  taskContainer.removeChild(task);
  let counter = 0;
  const localTasks = JSON.parse(localStorage.getItem('taskList'));
  const localArray = Array.from(localTasks).filter((i) => i.completed === false);
  // eslint-disable-next-line array-callback-return, no-multi-assign
  localArray.map((i) => { i.index = counter += 1; });
  localStorage.setItem('taskList', JSON.stringify(localArray));
};

const updateLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem('taskList'));
  const tasks = document.querySelectorAll('span');
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('completed-tasks')) {
      localTasks[i].completed = true;
    } else {
      localTasks[i].completed = false;
    }
  }
  localStorage.setItem('taskList', JSON.stringify(localTasks));
};

const fetchLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem('taskList'));
  // eslint-disable-next-line array-callback-return
  localTasks.map((i) => {
    taskArray.push(i);
    const taskEl = document.createElement('div');
    taskEl.className = 'tasks';
    taskEl.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${i.description}</span>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  <i class="fa-solid fa-trash"></i>
  `;
    taskContainer.appendChild(taskEl);

    const editEllip = document.querySelectorAll('.fa-ellipsis-vertical');
    editEllip.forEach((i) => {
      i.addEventListener('click', () => {
        i.parentElement.classList.add('completed-tasks-container');
        editTask(i.previousElementSibling, taskEl);
      });
    });
  });
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('completed-tasks-container');
      i.nextElementSibling.classList.toggle('completed-tasks');
      i.parentElement.lastElementChild.classList.toggle('trashicon-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('dotsicon-inactive');
      updateLocal();
    });
  });
  const rmvTrash = document.querySelectorAll('.fa-trash');
  rmvTrash.forEach((i) => {
    i.addEventListener('click', () => {
      removeTask(i.parentElement);
    });
  });
  localStorage.setItem('taskList', JSON.stringify(taskArray));
};

window.addEventListener('load', fetchLocal);

const addTasks = (taskValue) => {
  const taskEl = document.createElement('div');
  taskEl.className = 'tasks';
  taskEl.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${taskValue}</span>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  <i class="fa-solid fa-trash"></i>
  `;
  taskContainer.appendChild(taskEl);

  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('completed-tasks-container');
      i.nextElementSibling.classList.toggle('completed-tasks');
      i.parentElement.lastElementChild.classList.toggle('trashicon-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('dotsicon-inactive');
      updateLocal();
    });
  });

  const task = new Task(taskValue, false, checkBox.length);
  taskArray.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskArray));

  const editEllip = document.querySelectorAll('.fa-ellipsis-vertical');
  editEllip.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.add('completed-tasks-container');
      editTask(i.previousElementSibling, taskEl);
    });
  });

  const rmvTrash = document.querySelectorAll('.fa-trash');
  rmvTrash.forEach((i) => {
    i.addEventListener('click', () => {
      removeTask(i.parentElement);
    });
  });
};

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value !== null) {
    addTasks(taskInput.value);
    taskInput.value = '';
  }
});