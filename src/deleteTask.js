import { taskArray } from './taskArray';

export default function deleteTask() {
  const taskUI = document.querySelectorAll('.task-ui');
  const trash = document.querySelectorAll('.trash');
  const edit = document.querySelectorAll('.edit');
  const taskList = document.querySelector('.task-list');

  for (let i = 0; i < taskUI.length; i += 1) {
    taskUI[i].addEventListener('click', () => {
      taskUI[i].classList.toggle('highlight');
      trash[i].classList.toggle('inactive');
      edit[i].classList.toggle('inactive');
    });
  }

  trash.forEach((item) => {
    item.addEventListener('click', (e) => {
      const taskDelete = e.target.parentElement;
      const taskDeleteContent = taskDelete.firstChild.nextSibling.textContent;
      taskList.removeChild(taskDelete);

      taskArray = taskArray.filter((task) => task.description !== taskDeleteContent);
      for (let i = 0; i < taskArray.length; i += 1) {
        taskArray[i].index = i + 1;
      }
      localStorage.setItem('task-list', JSON.stringify(taskArray));
    });
  });
}