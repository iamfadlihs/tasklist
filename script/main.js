let activeHistory = 'activeHistory';
let inactiveHistory = 'inactiveHistory';


// Mengedit Local Storage =========================
function addInactiveHistory(card){
  let index = getActiveIndex(card);
  data = JSON.parse(localStorage.getItem(activeHistory))[index];

  let history = [];
  if(localStorage.getItem(inactiveHistory) != null){
    history = JSON.parse(localStorage.getItem(inactiveHistory));
  }


  history.push(data);
  localStorage.setItem(inactiveHistory,JSON.stringify(history));
}

function getActiveIndex(card){
  let index;
  let cardCollection = document.querySelectorAll('.progressCard');
  for(let i = 0;i<cardCollection.length;i++){
    if(cardCollection[i] == card){
      index = i;
      break;
    }
  }
  return index;
}

function getInactiveIndex(card){
  let index;
  let cardCollection = document.querySelectorAll('.doneCard');
  for(let i = 0;i<cardCollection.length;i++){
    if(cardCollection[i] == card){
      index = i;
      break;
    }
  }
  return index;
}

function addActiveHistory(card){
  let index = getInactiveIndex(card);
  data = JSON.parse(localStorage.getItem(inactiveHistory))[index];

  let history = [];
  if(localStorage.getItem(activeHistory) != null){
    history = JSON.parse(localStorage.getItem(activeHistory));
  }
  history.push(data);
  localStorage.setItem(activeHistory,JSON.stringify(history));
}

function removeActiveHistory(card){
  let index;
  let cardCollection = document.querySelectorAll('.progressCard');
  for(let i = 0;i<cardCollection.length;i++){
    if(cardCollection[i] == card){
      index = i;
      break;
    }
  }

  let history = JSON.parse(localStorage.getItem(activeHistory));
  let historyFirstTemp = history.splice(0,index);
  let historyLastTemp = history.splice(1, history.length - 1);
  for(let i of historyLastTemp){
    historyFirstTemp.push(i);
  }
  history = historyFirstTemp;
  localStorage.setItem(activeHistory,JSON.stringify(history));
}

function removeInactiveHistory(card){
  let index;
  let cardCollection = document.querySelectorAll('.doneCard');
  for(let i = 0;i<cardCollection.length;i++){
    if(cardCollection[i] == card){
      index = i;
      break;
    }
  }

  let history = JSON.parse(localStorage.getItem(inactiveHistory)); 
  let historyFirstTemp = history.splice(0,index);
  let historyLastTemp = history.splice(1, history.length - 1);

  for(let i of historyLastTemp){
    historyFirstTemp.push(i);
  }
  history = historyFirstTemp;
  localStorage.setItem(inactiveHistory,JSON.stringify(history));
}

// ====================================

// Local Storage yang kosong atau null
// =============================


// Ketika Website Berhasil Dimuat
document.addEventListener('DOMContentLoaded',()=>{
  updateDone();
  updateProgress();
})
// =================================

// Progress ==========================

function updateProgress(){
  let history = JSON.parse(localStorage.getItem(activeHistory));
  const containerKosong = document.querySelector('#progress .container');
  if(history == null|| history.length == 0){
    containerKosong.innerHTML = '<p>Data Tidak Ditemukan</p>';
    return;
  }
  containerKosong.innerHTML =  '';
  for(let i of history){
    addProgressCard(i);
  }
}

function addProgressCard(data){
  const paragrafContent = document.createElement('h3');
  paragrafContent.innerText = data.task;

  const dateContent = document.createElement('p');
  dateContent.innerText = data.date;

  const taskContent = document.createElement('div');
  taskContent.classList.add('task');
  taskContent.append(paragrafContent,dateContent);

  const button = document.createElement('div');
  button.classList.add('doneButton','button');
  button.innerHTML = '<i class="fas fa-check"></i>';

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttons');
  buttonContainer.append(button);

  const clear = document.createElement('div');
  clear.classList.add('clear')

  const card = document.createElement('div');
  card.classList.add('progressCard');
  card.append(taskContent,buttonContainer,clear);

  const progressContainer = document.querySelector('#progress .container');
  progressContainer.append(card);

  button.addEventListener('click',function(){
    addInactiveHistory(card);
    removeActiveHistory(card);
    updateProgress();
    updateDone();
  })
}
// ===================================


// Isi Form
class Data {
  constructor(task,date){
    this.task = task;
    this.date = date;
  }
}
const taskData = {
  task : "",
  date : ""
};

let taskInput = document.querySelector('.taskInput');
let dateInput = document.querySelector('.dateInput');

taskInput.addEventListener('change',function(){
  taskData.task = taskInput.value;
});

dateInput.addEventListener('change',function(){
  taskData.date = dateInput.value;
});
const clearTaskData = ()=>{
  taskData.task = "";
  taskData.date = "";
}
const updateTaskData = ()=>{
  taskInput.value = taskData.task;
  dateInput.value = taskData.date;
}
// ===================================

// Submit Form

const form = document.querySelector('form');
form.addEventListener('submit',()=>{
  event.preventDefault();
  let history = [];
  if(localStorage.getItem(activeHistory) != null){
    history = JSON.parse(localStorage.getItem(activeHistory));
  }
  let tempData = new Data(taskData.task,taskData.date);
  history.push(tempData);
  localStorage.setItem(activeHistory,JSON.stringify(history));
  // clearTaskData();
  // updateTaskData();
  updateProgress();
})
// ==================================


// Tugas Diselesaikan ====================
function updateDone(){

  let history = JSON.parse(localStorage.getItem(inactiveHistory));
  const containerKosong = document.querySelector('#done .container');
  if(history == null || history.length == 0){
    containerKosong.innerHTML = '<p>Data Tidak Ditemukan</p>';
    return;
  }
  containerKosong.innerHTML = '';
  for(let i of history){
    addDoneCard(i);
  }
}

function addDoneCard(data){
  const paragrafContent = document.createElement('h3');
  paragrafContent.innerText = data.task;

  const dateContent = document.createElement('p');
  dateContent.innerText = data.date;

  const taskContent = document.createElement('div');
  taskContent.classList.add('task');
  taskContent.append(paragrafContent,dateContent);

  const undoButton = document.createElement('div');
  undoButton.innerHTML = '<i class="fas fa-undo-alt"></i>';
  undoButton.classList.add('button','undoButton');

  const trashButton = document.createElement('div');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('button','trashButton');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttons');
  buttonContainer.append(undoButton,trashButton);

  const clear = document.createElement('div');
  clear.classList.add('clear');

  const card = document.createElement('div');
  card.classList.add('doneCard');
  card.append(taskContent,buttonContainer,clear);

  const container = document.querySelector('#done .container');
  container.append(card);


  

  undoButton.addEventListener('click',function(){
    addActiveHistory(card);
    removeInactiveHistory(card);
    updateDone();
    updateProgress();
  })
  trashButton.addEventListener('click',function(){
    removeInactiveHistory(card);
    updateDone();
  })

}


// ====================================











