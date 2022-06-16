import { taskArray } from './taskArray';

export default function editTask() {
  const para = document.querySelectorAll('.para');
  para.forEach((item) => {
    let priorTask = item.textContent;
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextTask = item.textContent;
        const focusedArray = taskArray.filter((task) => task.description === priorTask);
        taskArray[focusedArray[0].index - 1].description = nextTask;
        priorTask = nextTask;
        localStorage.setItem('task-list', JSON.stringify(taskArray));
        item.parentElement.classList.remove('highlight');
        item.nextElementSibling.classList.remove('inactive');
        item.nextElementSibling.nextElementSibling.classList.add('inactive');
      }
    });
  });
}
