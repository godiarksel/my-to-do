import Task from './task';
import { taskArray } from './taskArray';
import deleteTask from './deleteTask';
import editTask from './editTask';
import TaskDefault from './displayTask';

function addTaskDescript() {
  const textInput = document.getElementById('input');
  const taskDescription = textInput.value;
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';
  if (taskDescription !== '') {
    const task = new Task(taskDescription, false, taskArray.length + 1);
    taskArray.push(task);
    TaskDefault();
    deleteTask();
    editTask();
    textInput.value = '';
    localStorage.setItem('task-list', JSON.stringify(taskArray));
  }
}

function validateKeydown(e) {
  if (e.key === 'Enter') {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';
    addTaskDescript();
  }
}

export default function addTasks() {
  const textInput = document.getElementById('input');
  textInput.addEventListener('keydown', (e) => validateKeydown(e));
}
