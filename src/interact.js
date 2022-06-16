import { taskArray } from './taskArray';

export default function interact() {
  const check = document.querySelectorAll('.check');
  check.forEach((input) => {
    input.addEventListener('change', (e) => {
      const paraNode = input.nextElementSibling;
      const parentPara = paraNode.parentElement;
      const checkedDescription = input.nextSibling.textContent;
      const completedArray = taskArray.filter((desc) => desc.description === checkedDescription);
      if (e.target.checked) {
        paraNode.classList.add('line-through');
        parentPara.classList.add('checked');
        taskArray[completedArray[0].index - 1].completed = true;
      } else {
        paraNode.classList.remove('line-through');
        parentPara.classList.remove('checked');
        taskArray[completedArray[0].index - 1].completed = false;
      }
      localStorage.setItem('task-list', JSON.stringify(taskArray));
    });
    const clearBtn = document.querySelector('.clear-btn');
    const taskList = document.querySelector('.task-list');
    clearBtn.addEventListener('click', () => {
      const checked = document.querySelectorAll('.checked');
      if (input.checked) {
        taskArray = taskArray.filter((task) => task.completed !== true);
      }
      checked.forEach((task) => {
        taskList.removeChild(task);
      });
      for (let i = 0; i < taskArray.length; i += 1) {
        taskArray[i].index = i + 1;
      }
      return localStorage.setItem('task-list', JSON.stringify(taskArray));
    });
  });
}
