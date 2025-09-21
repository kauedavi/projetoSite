// Toggle do campo de pesquisa
function togglePesquisa() {
  const campo = document.getElementById("campoPesquisa");
  if (campo.style.display === "none" || campo.style.display === "") {
    campo.style.display = "block";
    campo.focus();
  } else {
    campo.style.display = "none";
  }
}

function filtrarTextos() {
  const termo = document.getElementById("campoPesquisa").value.toLowerCase().trim();

  const main = document.querySelector("main");
  const slideContainer = main.querySelector(".slide-container");
  const cardsContainer = main.querySelector(".cards");
  const errorSection = document.getElementById("error");

  if (termo === "") {
    // Se o campo estiver vazio, mostra o slide e os cards, esconde erro
    slideContainer.style.display = "block";
    cardsContainer.style.display = "flex"; // ou block, conforme seu CSS
    errorSection.style.display = "none";

    // Mostra todos os cards
    const cards = cardsContainer.querySelectorAll(".cardLink");
    cards.forEach(card => {
      card.style.display = "block";
    });
    return;
  }

  // Se tem termo, esconde o slide para dar prioridade aos cards
  slideContainer.style.display = "none";

  // Filtra os cards
  const cards = cardsContainer.querySelectorAll(".cardLink");
  let encontrou = false;

  cards.forEach(card => {
    const titulo = card.querySelector(".card-title");
    const texto = titulo ? titulo.innerText.toLowerCase() : "";

    if (texto.includes(termo)) {
      card.style.display = "block";
      encontrou = true;
    } else {
      card.style.display = "none";
    }
  });

  // Mostra ou esconde a mensagem de erro
  if (!encontrou) {
    errorSection.style.display = "block";
    cardsContainer.style.display = "none";
  } else {
    errorSection.style.display = "none";
    cardsContainer.style.display = "flex"; // ou block, conforme seu CSS
  }
}
