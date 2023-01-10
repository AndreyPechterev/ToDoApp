const tasksList = document.querySelector('#tasksList'),
      emptyList = document.querySelector('#emptyList'),
      form = document.querySelector('#form'),
      taskInput = document.querySelector('#taskInput');

let tasks = [];



if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => drawTask(task))  
}


checkList();

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', changeTask)





// functions
function addTask(event) {
  event.preventDefault();
  
  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    done: false
  }
  
  drawTask(newTask);

  tasks.push(newTask);
  saveToLS();


  taskInput.value = '';
  taskInput.focus();

  
  checkList();
  
}

function deleteTask(event) {
  if (event.target.dataset.action !== 'delete') return;

  event.target.closest('li').remove();
  const id = Number(event.target.closest('li').id)
  tasks = tasks.filter(task => task.id !== id)
  saveToLS();

  checkList();
}

function changeTask(event) {
  if (event.target.dataset.action !== 'done') return;
  const a = event.target.closest('li')
  a.querySelector('.task-title').classList.toggle('task-title--done')
  const id = a.id;
  const task = tasks.find(task => task.id == a.id)
  task.done = !task.done
  saveToLS();
}

function checkList() {
  if (tasks.length === 0) {
    const emptyHTML = `
    <li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Список дел пуст</div>
    </li>
    `;
    tasksList.insertAdjacentHTML('afterbegin', emptyHTML);
  } else {
    const emptyElem = tasksList.querySelector('#emptyList');
    emptyElem ? emptyElem.remove() : null;
  }
}

function saveToLS() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function drawTask(task) {
  const cssClass = task.done? "task-title task-title--done" : "task-title";
  
  const taskHTML = `
  <li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
    </div>
  </li>
  `
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
}



