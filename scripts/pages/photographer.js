import "./../../sass/main.scss";

const paramsURL = (new URL(document.location)).searchParams;
let idPhotographer = paramsURL.get('id');
console.log (idPhotographer);

const openContact = document.querySelectorAll(".photograph-header__button");
const closeContact = document.querySelectorAll(".modal__close-button");

openContact.forEach((launchBtn) =>
  launchBtn.addEventListener("click", displayModal)
);

closeContact.forEach((closeBtn) =>
  closeBtn.addEventListener("click", closeModal)
);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

//Mettre le code JavaScript lié à la page photographer.html
