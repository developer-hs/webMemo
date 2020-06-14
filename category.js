const menu1 = document.querySelector(".js-ctMenu1"),
  menu2 = document.querySelector(".js-ctMenu2"),
  menu3 = document.querySelector(".js-ctMenu3"),
  menu4 = document.querySelector(".js-ctMenu4"),
  menu5 = document.querySelector(".js-ctMenu5");
let previousProperty = `ct-${menu1.innerText}`;

localStorageCtItems = [menu1, menu2, menu3, menu4, menu5];
console.log(localStorageCtItems);
function getCtItems() {
  for (let i = 0; i < localStorageCtItems.length; i++) {
    if (localStorage.getItem(localStorageCtItems[i].innerHTML) === "true") {
      return localStorageCtItems[i];
    }
  }
}
function localStorageInit() {
  localStorageCtItems.forEach((item) => {
    localStorage.setItem(item.innerText, "false");
  });
}

function switchMenu(event) {
  localStorageInit();
  localStorage.setItem(event.target.innerHTML, "true");
}

function changeMenu() {
  toDoList.classList.remove(previousProperty);
  previousProperty = `ct-${getCtItems().innerText}`;
  toDoList.classList.add(`ct-${getCtItems().innerText}`);
}

function forEachCategory(func) {
  localStorageCtItems.forEach((item) => {
    item.addEventListener("mousedown", func);
  });
}

function init() {
  localStorageInit();
  localStorage.setItem(menu1.innerHTML, "true");
  forEachCategory(switchMenu);
  forEachCategory(changeMenu);
}

init();
