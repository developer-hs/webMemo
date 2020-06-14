const categoryBox = document.querySelector(".category");
const next = document.querySelector(".js-next__category");
const previous = document.querySelector(".js-previous__category");

let slideBox = [];

function initSlideBox() {
  for (let i = 0; i < category.children.length; i++) {
    slideBox.push(category.children[i]);
  }
}

function nextSlideHandler() {
  category.classList.add("next");
  setTimeout(() => {
    category.classList.remove("next");
    slideFirstFactor = slideBox[0];
    slideBox.splice(0, 1);
    slideBox.push(slideFirstFactor);
    category.firstChild.remove();
    category.appendChild(slideFirstFactor);
  }, 300);
}

function previousSlideHandler() {
  category.classList.add("previous");
  setTimeout(() => {
    category.classList.remove("previous");
    slideLastFactor = slideBox[slideBox.length - 1];
    slideBox.splice(slideBox.length - 1, 1);
    slideBox.splice(0, 0, slideLastFactor);
    category.lastChild.remove();
    category.prepend(slideLastFactor);
  }, 300);
}
function init() {
  initSlideBox();
  next.addEventListener("click", nextSlideHandler);
  previous.addEventListener("click", previousSlideHandler);
}

init();
