'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

//for (let i = 0; i < btnsOpenModalWindow.length; i++)
  //btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow));

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


// сообщение cookie - создание - добавление - удаление 
const message = document.createElement("div") // создаем div
message.classList.add("cookie-message") // добавляем класс со стилями 
// message.textContent = "Мы используем cookie на этой странице для улучшения функциональности" // используется для вставки текста 
message.innerHTML = 'Мы используем cookie на этой странице для улучшения функциональности <button class="btn btn--close-cookie">Ok</button>' // используется для вставки html
const header = document.querySelector(".header"); // выбрали элемент в который будем вставлять наш новый div
header.append(message); // добавляем div последним элементом в header
document.querySelector(".btn--close-cookie").addEventListener("click", () => message.remove()) // по клику на кнопку удаляем весь элемент message

// стили для сообщение cookie
message.style.backgroundColor = "#076785"; // добавили новый стиль, он будет записан как инлайновый (в html)
message.style.width = "100%";

// например, мы хоти увеличить имеющуюся высоту на 50px
// сначала нам нужно получить доступ к занчению, которое уже имеется и к нему прибавлять 50px
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 50 + "px";
console.log(message.style.height)

// изменение константы из css 
//document.documentElement.style.setProperty("--color-first", "#9f3699")

// изменение атрибута тега 
const logo = document.querySelector(".nav__logo");
console.log(logo.alt) // Лого Просто Банк
console.log(logo.className) // nav__logo

logo.alt = "Лого прекрасного банка"; // изменение атрибута 
console.log(logo.alt);

logo.setAttribute("copyright", "Master of code"); // установка нового атрибута
console.log(logo.copyright); // т.к. это нестандартный атрибут для img таким способом его не получить - в консоли будет undefined
console.log(logo.getAttribute("copyright")); // Master of code - вот так мы можем получить нестандартный атрибут 

console.log(logo.src); // абсолютный путь 
console.log(logo.getAttribute("src")); // относительный путь - как в html

// data attributes 
console.log(logo.dataset.versionNumber) // получение дата атрибут (в html через -, а тут  кемал кейс)

logo.classList.add(); // добавить класс 
logo.classList.remove(); // удалить класс 
//logo.classList.toggle(); // добавить-удалить класс
//logo.classList.contains(); // проверка на содержание в списке классов 


// Имплементация Плавного Прокручивания - не использовать!!! 
const btnScrollTo = document.querySelector(".btn--scroll-to") // кнопка узнать больше 
const section1 = document.querySelector("#section--1"); // секция к которой будем перемещаться по кнопке 

btnScrollTo.addEventListener("click", (e) => {
  // const section1Coords = section1.getBoundingClientRect(); // получаем координаты section1
  // console.log(section1Coords); // {x: 0, y: 919, width: 1177, height: 1710, top: 919, …}
  // console.log(e.target.getBoundingClientRect());
  // console.log("Текущее прокручивание: x, y", 
  //   window.pageXOffset,
  //   window.pageYOffset  
  // )
  // console.log("Ширина и высота viewport", 
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight)

  // window.scrollTo({ // прокрутка к нужной секции 
  //   left: section1Coords.left + window.pageXOffset, 
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: "smooth" // плавная прокрутка
  // })
    section1.scrollIntoView({behavior: "smooth"})
})

// плавная прокрутка навигации без деллегирования
/* document.querySelectorAll(".nav__link").forEach((htmlElement) => {
  htmlElement.addEventListener("click", function(e){
    e.preventDefault();
    const href = this.getAttribute("href");
    document.querySelector(href).scrollIntoView({behavior: "smooth"});
  })
}) */

// плавная прокрутка навигации c деллегированием
// 1 - добавляем слушатель события для общего родител 
document.querySelector(".nav__links").addEventListener("click", function(e){
  e.preventDefault();
// 2 - определяем e.target - на какой именно элемент был произведен клик 
  if(e.target.classList.contains("nav__link")) {
    const href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({behavior: "smooth"});
  }
})

// вкладки 
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function(e){
  const clicketButton = e.target.closest(".operations__tab");
  // активная вкладка
  if(!clicketButton) return

  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  clicketButton.classList.add("operations__tab--active");
  // активный контент
  tabContents.forEach(tabContent => tabContent.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clicketButton.dataset.tab}`).classList.add("operations__content--active");
})

//потускнение на ссылках в навигации
const nav = document.querySelector(".nav");

const navLinksHoverAnimations = function(e){
  //console.log(this)
  if(e.target.classList.contains("nav__link")) {
    const linkOver = e.target;
    const siblingsLinks = linkOver.closest(".nav__links").querySelectorAll(".nav__link");
    const logo = linkOver.closest(".nav").querySelector("img");
    const logoText = linkOver.closest(".nav").querySelector(".nav__text");

    siblingsLinks.forEach(el => {
      if(el !== linkOver) el.style.opacity = this;
    })
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
}

// Работа с аргументами функции через bind() и this
nav.addEventListener("mouseover", navLinksHoverAnimations.bind(0.4))
nav.addEventListener("mouseout", navLinksHoverAnimations.bind(1))

/* nav.addEventListener("mouseover", function(e){
  navLinksHoverAnimations(e, 0.4) // в функции navLinksHoverAnimations вместо this надо указать opacity
})
nav.addEventListener("mouseout", function(e){
  navLinksHoverAnimations(e, 1)
}) */ 

// Прикрепленная к верху панель навигации 
// const section1Coords = section1.getBoundingClientRect()
// window.addEventListener("scroll", function(e) {
//   if(this.window.scrollY > section1Coords.top){
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky")
//   }
// })

// Прикрепленная к верху панель навигации - intersection observer API 

// const observerCallback = function(entries, observer) {
//   entries.forEach(entry => console.log(entry))
// }
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
  const entry = entries[0]
  if(!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0, 
  rootMargin: `-${navHeight}px`
}); 
headerObserver.observe(header)

// Показ Секций При Прокручивании
const allSections = document.querySelectorAll(".section")
const appearanceSection = function(entries, observer) {
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2
})

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden")
})

// Lazy Loading для картинок 
const lazyImg = document.querySelectorAll("img[data-src]");
console.log(lazyImg);

const loadImg = function(entries, observer) {
  const entry = entries[0];
  if(!entry.isIntersecting) return
  // меняем на качественное изображение
  entry.target.src = entry.target.dataset.src;
  // удаляем блюр только посл загрузки четкой картинки 
  entry.target.addEventListener("load", () => entry.target.classList.remove("lazy-img"));
  observer.unobserve(entry.target)
}

const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.7,
  // rootMargin: "300px"
});
lazyImg.forEach(img => lazyImgObserver.observe(img));

// слайдер 
const slides = document.querySelectorAll(".slide");
//const slider = document.querySelector(".slider");
//slider.style.transform = `scale(0.4) translateX(1300px)`;
//slider.style.overflow = "visible";
const moveToSlide = function(slide) {
  slides.forEach((s, index) => s.style.transform = `translateX(${(index - slide) * 100}%)`)
}
moveToSlide(0);

const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");


let currentSlide = 0; // текущий слайд 
const slidesNumber = slides.length; // кол-во слайдов 
const dotContainer = document.querySelector(".dots")

// создание нужного кол-ва точек навигации
const createDots = function() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`)
  })
}

createDots()

// активация активной точки
const activateCurrentDot = function(slide) {
  document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
}
activateCurrentDot(0)
// показывает следующий слайд 
const nextSlide = function(){
  if(currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
}

// показывает предыдцщий слайд 
const previousSlide = function() {
  if(currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
}

// навигация по слайдеру через клики по стрелочкам 
sliderBtnRight.addEventListener("click", nextSlide)
sliderBtnLeft.addEventListener("click", previousSlide)

// навигация по слайдеру через стрелки клавиатуры
document.addEventListener("keydown", function(e){
  //console.log(e)
  if(e.key === "ArrowRight") nextSlide();
  if(e.key === "ArrowLeft") previousSlide();
})

// навигация через точки 
dotContainer.addEventListener("click", function(e){
  if(e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
}) 





/* всякие приколы  

const h1 = document.querySelector("h1");

// в функции сразу удаляем обработчик события, так он сработает только один раз
const alertMouseEnterH1 = (e) => {
  alert("addEventListener");
  h1.removeEventListener("mouseenter", alertMouseEnterH1)
}

h1.addEventListener("mouseenter", alertMouseEnterH1)


// распространение событий Event Propagation

// функция возвращает рандомное число в интервали между мин и мах (включительно)
function getRandomInt(max, min){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// получаем рандомный цвет в rgb формате
const getRandomColor = () => `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`

document.querySelector(".nav__link").addEventListener("click", function(e) {
  this.style.backgroundColor = getRandomColor();
  console.log("link", e.target, e.currentTarget);
  // остановка всплытия 
  e.stopPropagation(); // клик сработает только на выбранном элементе и остановится - лучше не использовать 
});

document.querySelector(".nav__links").addEventListener("click", function(e) {
  this.style.backgroundColor = getRandomColor();
  console.log("links", e.target, e.currentTarget);
}, true);

document.querySelector(".nav").addEventListener("click", function(e) {
  this.style.backgroundColor = getRandomColor();
  console.log("nav", e.target, e.currentTarget);
});

// e.target - на какой именно элемент был произведен клик 
// e.currentTarget - элемент, к которому привязан обработчик события === this 


// перемещение по dom 
const h1 = document.querySelector("h1");

// перемещение вниз (к потомку)
console.log(h1.childNodes); // NodeList из всех вложенных элементов, включая комментарии и текст (мало где применимо)
console.log(h1.children); // HTMLCollection вложенных элементов (тегов)
console.log(h1.firstElementChild); // первый дочерний элемент
console.log(h1.lastElementChild); // последний дочерний элемент

// перемещение вверх (к родителю)

console.log(h1.parentNode); // родитель для h1
console.log(h1.parentElement); // родитель-элемент для h1
// Свойство parentElement возвращает родитель-элемент, а parentNode возвращает «любого родителя». Обычно эти свойства одинаковы: они оба получают родителя.

const h2 = document.querySelector("h2");
console.log(h2.closest(".section")) // ближайший родительский элемент, который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
// ближайший section к h2

// перемещение по соседям (перемещение на одном уровне вложенности)

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children) // все соседи h1 включительно
// сначала находим родителя h1, потом находим всех детей этого родителя - так получаем всех одноуровневых соседей h1

*/