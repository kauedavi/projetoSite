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

document.addEventListener("DOMContentLoaded", function () {
  const carouselEl = document.getElementById("projetosCarousel");
  if (carouselEl) {
    // Pause no hidden, resume no visible (como no original)
    document.addEventListener("visibilitychange", function () {
      const carousel = bootstrap.Carousel.getInstance(carouselEl);
      if (document.hidden && carousel) {
        carousel.pause();
      } else if (!document.hidden && carousel) {
        carousel.cycle(); // Resumir o ciclo
      }
    });
    // NÃO inclua o resize handler — Bootstrap gerencia sozinho e evita o erro "illegal invocation"
    // Se precisar forçar algo em resize, use um debounce simples sem dispose()
  }
});

//animação das sections
  document.addEventListener("DOMContentLoaded", () => {
        const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        }, { threshold: 0.2 });

        reveals.forEach(el => observer.observe(el));
      });
