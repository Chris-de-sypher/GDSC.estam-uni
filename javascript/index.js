/** @format */

const xray = document.querySelector("#navbar");
const color = document.querySelectorAll(".link");

// window.addEventListener("scroll", (e) => {
//   e.preventDefault();
//   xray.classList.toggle("active", window.scrollY > 0);
// });

// const events = document.querySelector(".evts");
// const events1 = document.querySelector(".evts1");

// function click() {
//   events.addEventListener("click", (e) => {
//     e.preventDefault();
//     events.classList.add("place");
//     events1.classList.remove("place");
//   });
//   events1.addEventListener("click", (e) => {
//     e.preventDefault();
//     events1.classList.add("place");
//     events.classList.remove("place");
//   });
// }
// click();

const c = document.querySelector(".fa-bars");
const d = document.querySelector("nav");
const s = document.querySelector(".links");
const g = document.querySelector(".fa-xmark");

c.addEventListener("click", function () {
  d.style.height = 100 + "%";
  d.style.transitionDelay = 0.2 + "s";
  d.style.background = "rgb(237, 224, 210)";
    s.style.display = "flex";
  s.style.transitionDelay = 0.5 + "s";
  g.style.display = "block";
  c.style.display = "none";
});
g.addEventListener("click", function (e) {
  e.preventDefault();
  d.style.height = "";
  d.style.background = "";
  s.style.display = "none";
  g.style.display = "none";
  c.style.display = "block";
})
//     (function () {
//     try {
//         const date = new Date().getHours();
//         if (date > 18 && date < 23) {
//         console.log('good')
//         document.body.style.background = '#111';
//         d.style.background = '#111';
//         document.body.style.color = '#ecf0f3';
//         }
//         console.log(date);  
//         }
//     catch (e) {
//         alert('failed to work with time' + e)
//     }
// }());
