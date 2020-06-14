const category = document.querySelector(".js-category > ul");

arrayChildren = Object.entries(category.children);
function mouseOverhandler(event) {
  event.target.style.color = "blue";
  arrayChildren.forEach((item) => {
    if (event.target.parentNode !== item[1]) {
      item[1].style.opacity = 0.2;
    }
  });
}

function mouseOuthandler(event) {
  event.target.style.color = "";
  event.target.style.transition = "all 1s ease";
  arrayChildren.forEach((item) => {
    item[1].style.opacity = 0.8;
  });
}

function mouseDownhandler() {
  present_property = getCtItems().innerText;
  arrayChildren.forEach((item) => {
    if (item[1].innerText === present_property) {
      item[1].style.backgroundColor = "#70a1ff";
      item[1].classList.add("select");
    } else {
      item[1].style.backgroundColor = "#cad3c8";
      item[1].classList.remove("select");
    }
  });
}
function init() {
  mouseDownhandler();
  category.childNodes.forEach((itme) => {
    itme.addEventListener("mouseover", mouseOverhandler);
  });
  category.childNodes.forEach((item) => {
    item.addEventListener("mouseout", mouseOuthandler);
  });
  category.childNodes.forEach((item) => {
    item.addEventListener("mousedown", mouseDownhandler);
  });
}

init();
