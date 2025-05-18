function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-btn");

  toggleButton.addEventListener("click", () => {
    const offcanvasMenu = new bootstrap.Offcanvas(
      document.getElementById("offcanvasMenu"),
    );
    offcanvasMenu.toggle();
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio do formulário
  const input = form.querySelector('input[type="text"]');
  const query = input.value;
  const number = "55084999302176"; // Número do WhatsApp
  window.open(`https://wa.me/${number}?text=${query}`, "_blank");
  input.value = ""; // Limpa o campo de pesquisa
});
// Exibir o botão de enviar apenas quando houver texto no campo de entrada com transição suave
const inputField = document.querySelector('form input[type="text"]');
const submitButton = document.querySelector('form button[type="submit"]');
submitButton.style.transition = "opacity 0.3s ease"; // Adiciona transição suave

inputField.addEventListener("input", () => {
  if (inputField.value.trim() !== "") {
    submitButton.style.display = "inline-block";
    submitButton.style.opacity = "1"; // Torna o botão visível
  } else {
    submitButton.style.opacity = "0"; // Torna o botão invisível
    setTimeout(() => {
      if (inputField.value.trim() === "") {
        submitButton.style.display = "none";
      }
    }, 300); // Aguarda a transição antes de ocultar
  }
});

// Atualizar o estado do botão após limpar o campo de entrada
form.addEventListener("submit", function () {
  submitButton.style.opacity = "0"; // Torna o botão invisível
  setTimeout(() => {
    submitButton.style.display = "none";
  }, 300); // Aguarda a transição antes de ocultar
});

/* Script para cuidar do click fora de navbar menu */
document.addEventListener("click", function (event) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbarCollapse && navbarToggler) {
    if (
      !navbarCollapse.contains(event.target) &&
      !navbarToggler.contains(event.target)
    ) {
      navbarCollapse.classList.remove("show");
      navbarToggler.classList.add("collapsed"); // Botão de navbar deve voltar ao estado colapsado
    }
  }
});

const inputDesktop = document.getElementById("search-input");
const displayBoxMobile = document.getElementById("search-display");

// Garante que o campo de pesquisa do mobile comece oculto
if (window.innerWidth < 768) {
  displayBoxMobile.style.display = "none";
}

// Adiciona o evento de clique fora do campo de pesquisa
displayBoxMobile.setAttribute("contenteditable", "true");

// Sincroniza o campo de pesquisa com o campo de entrada do desktop
inputDesktop.addEventListener("input", function () {
  if (window.innerWidth < 768) {
    const offcanvasMenu = document.getElementById("offcanvasMenu");
    if (this.value.trim() !== "" && !offcanvasMenu.classList.contains("show")) {
      displayBoxMobile.textContent = this.value;
      displayBoxMobile.style.display = "block";
      displayBoxMobile.style.opacity = "1";
    } else {
      displayBoxMobile.style.opacity = "0";
      setTimeout(() => {
        displayBoxMobile.style.display = "none";
      }, 300);
    }
  }
});

// Sincroniza o campo de entrada do desktop com o campo de pesquisa do mobile
displayBoxMobile.addEventListener("input", function () {
  inputDesktop.value = this.textContent;
  if (window.innerWidth < 768 && this.textContent.trim() === "") {
    displayBoxMobile.style.opacity = "0";
    setTimeout(() => {
      displayBoxMobile.style.display = "none";
    }, 300);
    // Esconde o botão de enviar
    submitButton.style.opacity = "0";
    setTimeout(() => {
      submitButton.style.display = "none";
    }, 300);
  } else if (window.innerWidth < 768 && this.textContent.trim() !== "") {
    // Mostra o botão de enviar
    submitButton.style.display = "inline-block";
    submitButton.style.opacity = "1";
  }
});

// Esconde o campo de pesquisa com offcanvas
const offcanvasMenu = document.getElementById("offcanvasMenu");
offcanvasMenu.addEventListener("show.bs.offcanvas", () => {
  displayBoxMobile.style.display = "none";
});

// Garante que a search display comece oculta ao carregar a página
const searchDisplay = document.getElementById("search-display");
searchDisplay.style.display = "none";
searchDisplay.style.opacity = "0";
searchDisplay.style.transition = "opacity 0.3s ease";

// Esconde o campo de pesquisa mobile ao enviar
form.addEventListener("submit", function () {
  searchDisplay.style.opacity = "0";
  setTimeout(() => {
    searchDisplay.style.display = "none";
  }, 300);
});

// Proteção e expansão de imagem do hero

document.addEventListener("DOMContentLoaded", function () {
  // Hero image modal expand
  const heroImgs = document.querySelectorAll(".hero-img");
  const modal = document.getElementById("heroImageModal");
  const modalImg = document.getElementById("modalHeroImg");

  heroImgs.forEach((img) => {
    img.addEventListener("click", function (e) {
      // Usa a imagem original de alta qualidade no modal
      const fullSrc = this.getAttribute("data-full") || this.src;
      modalImg.src = fullSrc;
      modalImg.alt = this.alt;
    });
    // Protege contra arrastar
    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  });

  // Protege imagem expandida
  if (modalImg) {
    modalImg.addEventListener("dragstart", (e) => e.preventDefault());
    modalImg.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  // Limpa imagem ao fechar modal e remove foco do modal para evitar conflito de aria-hidden
  if (modal) {
    modal.addEventListener("hidden.bs.modal", function () {
      modalImg.src = "";
      modalImg.alt = "";
      // Remove o foco do modal para evitar conflito de aria-hidden
      if (document.activeElement && modal.contains(document.activeElement)) {
        document.activeElement.blur();
        document.body.focus();
      }
    });
  }

  // Popover customizado do catálogo
  document.querySelectorAll(".btn-popover").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Remove popover anterior
      document.querySelectorAll(".catalog-popover").forEach((p) => p.remove());
      // Encontra o card e a imagem
      const card = btn.closest(".card");
      const img = card.querySelector("img.card-img-top");
      // Cria popover
      const pop = document.createElement("div");
      pop.className = "catalog-popover";
      pop.innerText = btn.getAttribute("data-bs-content");
      // Posiciona sobre a imagem
      img.parentElement.style.position = "relative";
      img.parentElement.appendChild(pop);
      // Fecha ao clicar fora ou pressionar Esc
      setTimeout(() => {
        function removePop(e) {
          if (!pop.contains(e.target)) pop.remove();
          document.removeEventListener("mousedown", removePop);
          document.removeEventListener("keydown", escPop);
        }
        function escPop(e) {
          if (e.key === "Escape") pop.remove();
        }
        document.addEventListener("mousedown", removePop);
        document.addEventListener("keydown", escPop);
      }, 10);
    });
  });

  // Botão WhatsApp do catálogo
  const whatsappButtons = document.querySelectorAll(".btn-whatsapp");
  whatsappButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const product = btn.getAttribute("data-product");
      const number = "55084999302176";
      const msg = encodeURIComponent(
        `Olá! Gostaria de pedir o produto: ${product}`,
      );
      window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
    });
  });
});

// Garantir que ao clicar em "Detalhes" o scroll vá até o topo do card
function scrollToCardTop(btn) {
  const card = btn.closest(".card");
  if (card) {
    const rect = card.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Considera o header fixo (80px) e um pequeno espaçamento
    const headerOffset = 90;
    const top = rect.top + scrollTop - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// Adiciona o scroll ao clicar no botão Detalhes do catálogo
function setupCatalogDetailsScroll() {
  document.querySelectorAll("#catalog .catalog-btn-detalhes").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      scrollToCardTop(this);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupCatalogDetailsScroll();
});
