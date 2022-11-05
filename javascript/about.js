/** @format */

let slideIndex = 1;
// showSlides(slideIndex);
  setInterval(showSlides, 7000);


// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("images");
  let dots = document.getElementsByClassName("fa-circle");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("showcolor", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " showcolor";
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
}
