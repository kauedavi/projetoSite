function togglePesquisa() {
  const campo = document.getElementById("campoPesquisa");
  campo.classList.toggle("ativo");
  if (campo.classList.contains("ativo")) {
    campo.focus();
  }
}

function filtrarTextos() {
  const termo = document
    .getElementById("campoPesquisa")
    .value.toLowerCase()
    .trim();

  const main = document.querySelector("main");
  const slideContainer = main.querySelector(".slide-container");
  const cardsContainer = main.querySelector(".cards");
  const errorSection = document.getElementById("error");

  const cards = cardsContainer.querySelectorAll(".cardLink");

  if (termo === "") {
    slideContainer.style.display = "block";
    cardsContainer.style.display = "flex";
    errorSection.style.display = "none";

    // Reinício seguro do carrossel
    isTransitioning = false;
    gallery.style.transition = "none";
    currentItem = 1;
    updateSlidePosition();
    setTimeout(() => {
      gallery.style.transition = `transform ${transitionTime}s ease-in-out`;
      resetAutoSlide();
    }, 100);

    cards.forEach((card) => (card.style.display = "block"));
    return;
  }

  slideContainer.style.display = "none";

  let encontrou = false;
  cards.forEach((card) => {
    const titulo = card.querySelector(".card-title");
    const texto = titulo ? titulo.innerText.toLowerCase() : "";

    if (texto.includes(termo)) {
      card.style.display = "block";
      encontrou = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!encontrou) {
    errorSection.style.display = "block";
    cardsContainer.style.display = "none";
  } else {
    errorSection.style.display = "none";
    cardsContainer.style.display = "flex";
  }
}

// Carrossel
const gallery = document.querySelector(".gallery");
const prevBtn = document.querySelector(".arrow-left");
const nextBtn = document.querySelector(".arrow-right");

let items = Array.from(document.querySelectorAll(".item"));
let currentItem = 1;
let isTransitioning = false;
const intervalTime = 4000;
const transitionTime = 0.6;

// Clones
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

gallery.appendChild(firstClone);
gallery.insertBefore(lastClone, items[0]);

items = Array.from(document.querySelectorAll(".item"));
updateSlidePosition();

function updateSlidePosition() {
  gallery.style.transform = `translateX(-${currentItem * 100}%)`;
  items.forEach((item, index) => {
    item.classList.toggle("current-item", index === currentItem);
  });
}

function updateCarousel() {
  if (isTransitioning) return;
  isTransitioning = true;

  gallery.style.transition = `transform ${transitionTime}s ease-in-out`;
  updateSlidePosition();
  markMovement();
}

gallery.addEventListener("transitionend", () => {
  const item = items[currentItem];
  gallery.style.transition = "none";

  if (item.id === "first-clone") currentItem = 1;
  else if (item.id === "last-clone") currentItem = items.length - 2;

  updateSlidePosition();
  isTransitioning = false;
});

nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentItem++;
  updateCarousel();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  currentItem--;
  updateCarousel();
  resetAutoSlide();
});

let autoSlide;
let isUserInteracting = false;

function startAutoSlide() {
  autoSlide = setInterval(() => {
    if (!isUserInteracting) {
      currentItem++;
      updateCarousel();
    }
  }, intervalTime);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();

window.addEventListener("resize", () => {
  gallery.style.transition = "none";
  updateSlidePosition();
});

let lastMovement = Date.now();

function markMovement() {
  lastMovement = Date.now();
}

setInterval(() => {
  const now = Date.now();
  const tempoParado = now - lastMovement;

  if (tempoParado > intervalTime * 2 && !isTransitioning) {
    console.warn("⚠️ Slide parado, forçando avanço...");

    // Avança com segurança, evitando clones
    currentItem++;
    if (currentItem >= items.length - 1) {
      currentItem = 1; // volta ao primeiro item real
      gallery.style.transition = "none";
      updateSlidePosition();
    }

    updateCarousel();
    resetAutoSlide();
  }
}, 5000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    console.log("✅ Usuário voltou");
    resetAutoSlide();
    updateCarousel();
  }
});

// Swipe / Scroll Mobile
let startX = 0;
let startY = 0;
let currentTranslate = 0;
let prevTranslate = 0;
const threshold = 50;

const isTouchDevice = "ontouchstart" in window;

const startEvent = isTouchDevice ? "touchstart" : "mousedown";
const moveEvent = isTouchDevice ? "touchmove" : "mousemove";
const endEvent = isTouchDevice ? "touchend" : "mouseup";

gallery.addEventListener(startEvent, touchStart, { passive: false });
gallery.addEventListener(moveEvent, touchMove, { passive: false });
gallery.addEventListener(endEvent, touchEnd);

function getClientX(event) {
  return event.type.includes("mouse")
    ? event.clientX
    : event.touches[0].clientX;
}

function getClientY(event) {
  return event.type.includes("mouse")
    ? event.clientY
    : event.touches[0].clientY;
}

function touchStart(event) {
  if (isTransitioning) return;

  startX = getClientX(event);
  startY = getClientY(event);
  prevTranslate = currentItem * -100;
  currentTranslate = prevTranslate;
  isUserInteracting = true;
  clearInterval(autoSlide);
  gallery.style.transition = "none";
  markMovement();
}

function touchMove(event) {
  if (!isUserInteracting) return;

  const deltaX = getClientX(event) - startX;
  const deltaY = getClientY(event) - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    event.preventDefault();
  }

  currentTranslate = prevTranslate + (deltaX / gallery.offsetWidth) * 100;
  gallery.style.transform = `translateX(${currentTranslate}%)`;
}

function touchEnd() {
  isUserInteracting = false;
  gallery.style.transition = `transform ${transitionTime}s ease-in-out`;

  const movedBy = currentTranslate - currentItem * -100;
  if (movedBy < -threshold && currentItem < items.length - 1) {
    currentItem++;
  } else if (movedBy > threshold && currentItem > 1) {
    currentItem--;
  }

  updateCarousel();
  setTimeout(resetAutoSlide, 1000);
}
