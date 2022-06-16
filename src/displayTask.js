import { taskArray } from './taskArray';
import interact from './interact';

const displayTask = (text) => {
  const taskList = document.querySelector('.task-list');
  const taskUI = document.createElement('div');
  taskUI.classList.add('task-ui');

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.classList.add('check');

  const taskPara = document.createElement('p');
  taskPara.setAttribute('contenteditable', 'true');
  taskPara.setAttribute('class', 'para');
  taskPara.textContent = text.description;

  const edit = document.createElement('i');
  edit.setAttribute('class', 'fa-solid fa-ellipsis-vertical');
  edit.classList.add('icon', 'edit');

  const trash = document.createElement('i');
  trash.setAttribute('class', 'fa-solid fa-trash');
  trash.classList.add('inactive', 'icon', 'trash');

  taskUI.append(input, taskPara, edit, trash);
  taskList.appendChild(taskUI);
  return taskList;
};

const TaskDefault = () => {
  taskArray.forEach((task) => {
    displayTask(task);
    interact();
  });
};
export default TaskDefault;