function toggleText(button) {
  const section = button.closest(".texto-expandivel");
  const paragraph = section.querySelector(".conteudo ");

  if (paragraph.style.display === "none") {
    paragraph.style.display = "block";
    button.textContent = "Mostrar menos";
  } else {
    paragraph.style.display = "none";
    button.textContent = "Mostrar mais";
  }
}

// Oculta todos os parágrafos inicialmente (opcional)
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".texto-expandivel .conteudo ")
    .forEach((conteudo) => {
      conteudo.style.display = "none";
    });
});

//sistema de pesquisa:
function togglePesquisa() {
  const campo = document.getElementById("campoPesquisa");
  if (campo.style.display === "none" || campo.style.display === "") {
    campo.style.display = "block";
    campo.focus(); // dá foco ao campo automaticamente
  } else {
    campo.style.display = "none";
  }
}

//sistema de filtro
function filtrarTextos() {
  const termo = document.getElementById("campoPesquisa").value.toLowerCase();
  const secoes = document.querySelectorAll("main section:not(#error)");
  let encontrou = false;

  secoes.forEach((secao) => {
    const titulo = secao.querySelector("h2");
    const textoTitulo = titulo ? titulo.innerText.toLowerCase() : "";

    if (textoTitulo.includes(termo)) {
      secao.style.display = "block";
      encontrou = true;
    } else {
      secao.style.display = "none";
    }
  });

  // Mostra ou esconde a section de erro
  const erro = document.getElementById("error");
  if (encontrou) {
    erro.style.display = "none";
  } else {
    erro.style.display = "block";
  }
}