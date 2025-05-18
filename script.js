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

/* JavaScript to handle click outside the navbar menu */
document.addEventListener("click", function (event) {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbarCollapse && navbarToggler) {
    if (
      !navbarCollapse.contains(event.target) &&
      !navbarToggler.contains(event.target)
    ) {
      navbarCollapse.classList.remove("show");
      navbarToggler.classList.add("collapsed"); // Ensure the toggler button returns to collapsed state
    }
  }
});

const inputDesktop = document.getElementById("search-input");
const displayBoxMobile = document.getElementById("search-display");

// Ensure the mobile search display box is hidden on page load
if (window.innerWidth < 768) {
  displayBoxMobile.style.display = "none";
}

// Make the mobile search display editable
displayBoxMobile.setAttribute("contenteditable", "true");

// Synchronize the mobile search display with the form input
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

// Synchronize the form input with the mobile search display
displayBoxMobile.addEventListener("input", function () {
  inputDesktop.value = this.textContent;
  if (window.innerWidth < 768 && this.textContent.trim() === "") {
    displayBoxMobile.style.opacity = "0";
    setTimeout(() => {
      displayBoxMobile.style.display = "none";
    }, 300);
    // Hide the submit button with smooth transition
    submitButton.style.opacity = "0";
    setTimeout(() => {
      submitButton.style.display = "none";
    }, 300);
  } else if (window.innerWidth < 768 && this.textContent.trim() !== "") {
    // Show the submit button if there is text
    submitButton.style.display = "inline-block";
    submitButton.style.opacity = "1";
  }
});

// Hide the search display when the offcanvas menu is shown
const offcanvasMenu = document.getElementById("offcanvasMenu");
offcanvasMenu.addEventListener("show.bs.offcanvas", () => {
  displayBoxMobile.style.display = "none";
});

// Garante que a search display comece oculta ao carregar a página
const searchDisplay = document.getElementById("search-display");
searchDisplay.style.display = "none";
searchDisplay.style.opacity = "0";
searchDisplay.style.transition = "opacity 0.3s ease";

// Hide the search display box when the 'Enviar' button is clicked
form.addEventListener("submit", function () {
  searchDisplay.style.opacity = "0"; // Smoothly hide the search display box
  setTimeout(() => {
    searchDisplay.style.display = "none";
  }, 300); // Wait for the transition to complete before hiding
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
});
