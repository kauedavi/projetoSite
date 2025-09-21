const gallery = document.querySelector(".gallery");
let items = document.querySelectorAll(".item");
const prevBtn = document.querySelector(".arrow-left");
const nextBtn = document.querySelector(".arrow-right");

let currentItem = 1;
let isTransitioning = false;
const intervalTime = 4000;
const transitionTime = 0.6;

// ====== CLONES ======
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

gallery.appendChild(firstClone);
gallery.insertBefore(lastClone, items[0]);

// Atualiza lista de slides
items = document.querySelectorAll(".item");

// Define posição inicial
gallery.style.transform = `translateX(-${currentItem * 100}%)`;
items.forEach((item, index) => {
  item.classList.toggle("current-item", index === currentItem);
});

// ====== FUNÇÃO DE ATUALIZAÇÃO ======
function updateCarousel() {
  if (isTransitioning) return;
  isTransitioning = true;

  gallery.style.transition = `transform ${transitionTime}s ease-in-out`;
  gallery.style.transform = `translateX(-${currentItem * 100}%)`;

  items.forEach((item, index) => {
    item.classList.toggle("current-item", index === currentItem);
  });
}

// ====== RESET SUAVE AO CHEGAR NO CLONE ======
gallery.addEventListener("transitionend", () => {
  if (items[currentItem].id === "first-clone") {
    requestAnimationFrame(() => {
      gallery.style.transition = "none";
      currentItem = 1;
      gallery.style.transform = `translateX(-${currentItem * 100}%)`;
      requestAnimationFrame(() => {
        gallery.style.transition = `transform ${transitionTime}s ease-in-out`;
        items.forEach((item, index) => {
          item.classList.toggle("current-item", index === currentItem);
        });
        isTransitioning = false;
      });
    });
  } else if (items[currentItem].id === "last-clone") {
    requestAnimationFrame(() => {
      gallery.style.transition = "none";
      currentItem = items.length - 2;
      gallery.style.transform = `translateX(-${currentItem * 100}%)`;
      requestAnimationFrame(() => {
        gallery.style.transition = `transform ${transitionTime}s ease-in-out`;
        items.forEach((item, index) => {
          item.classList.toggle("current-item", index === currentItem);
        });
        isTransitioning = false;
      });
    });
  } else {
    isTransitioning = false;
  }
});

// ====== CONTROLES ======
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

// ====== AUTO SLIDE ======
let autoSlide = setInterval(() => {
  currentItem++;
  updateCarousel();
}, intervalTime);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    currentItem++;
    updateCarousel();
  }, intervalTime);
}

// ====== RESPONSIVO ======
window.addEventListener("resize", () => {
  gallery.style.transition = "none";
  gallery.style.transform = `translateX(-${currentItem * 100}%)`;
});
