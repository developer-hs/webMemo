const todoForm = document.querySelector(".js-toDoForm"),
  toDoInput = todoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let newId = 0;
let toDos = [];
function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(toDo) {
  newId += 1;
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  const span = document.createElement("span");
  delBtn.className = "fas fa-comment-slash";
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = toDo.text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = toDo.id;
  if (toDo.property === getCtItems().innerText) {
    toDoList.appendChild(li);
  }
  const toDoObj = {
    id: newId,
    text: toDo.text,
    property: toDo.property,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function changePost(event) {
  const selectCategory = document.querySelector(".select");
  const presentToDos = toDos.filter((item) => {
    if (item.property === getCtItems().innerText) {
      return item;
    }
  });
  const lastInnerText = toDos[-1];
  const presentProperty = getCtItems().innerText;
  const localStorageToDos = localStorage.getItem(TODOS_LS);
  const parseToDos = JSON.parse(localStorageToDos);
  for (let i = 0; i < parseToDos.length; i++) {
    const localStorageProperty = parseToDos[i].property;
    if (localStorageProperty !== presentProperty) {
      const toDoListChild = toDoList.childNodes;
      const ArraytoDolistChild = Object.entries(toDoListChild);
      const cleartoDoChild = ArraytoDolistChild.forEach((item) => {
        if (item[1].innerText === parseToDos[i].text) {
          toDoList.removeChild(item[1]);
        }
      });
    }
  }
  console.log(selectCategory.innerText, event.target.innerText);
  if (
    toDoList.firstChild === null ||
    selectCategory.innerText !== event.target.innerText
  ) {
    console.log(selectCategory.innerText, getCtItems().innerText);
    toDos.forEach((item) => {
      if (
        item.property === getCtItems().innerText &&
        lastInnerText !== presentToDos[presentToDos.length - 1].text
      ) {
        const li = document.createElement("li");
        const delBtn = document.createElement("i");
        const span = document.createElement("span");
        delBtn.className = "fas fa-comment-slash";
        delBtn.addEventListener("click", deleteTodo);
        span.innerText = item.text;
        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = item.id;
        toDoList.appendChild(li);
      }
    });
  }
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = {
    text: toDoInput.value,
    property: getCtItems().innerText,
  };
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
  localStorageCtItems.forEach((item) => {
    item.addEventListener("mousedown", changePost);
  });
}

init();
