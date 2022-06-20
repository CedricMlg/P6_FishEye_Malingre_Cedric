import photographerFactory from "../factories/photographer.js";
// import mediaFactory from "../factories/media.js";
// import "./index.js";
import "./../../sass/main.scss";

const openContact = document.querySelectorAll(".photographer-header__button");
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

const paramsURL = new URL(document.location).searchParams;
let idPhotographer = paramsURL.get("id");

async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  return { photographers: data };
}

async function displayData(photographers) {
  const photographerHeader = document.querySelector(".photographer-header");

  const photographerSelect = photographers.find(
    (element) => element.id === parseInt (idPhotographer)
  );

  const photographerModel = photographerFactory(photographerSelect);

  const focusUserProfilDOM = photographerModel.focusUserProfilDOM();
  photographerHeader.appendChild(focusUserProfilDOM.profil);
  photographerHeader.appendChild(focusUserProfilDOM.portrait);
}

async function displayMedia(photographers) {
  const photographerWork = document.querySelector(".photographer-work__media");

  const photographerSelect = photographers.filter(
    (element) => element.photographerId === parseInt (idPhotographer)
  );

  // photographers.forEach((photographer) => {
  //   const photographerMedia = mediaFactory(photographer);
  //   const focusUserMediaDOM = photographerMedia.focusUserMediaDOM();
  // });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
  displayMedia(photographers.media);
}

init();

//Mettre le code JavaScript lié à la page photographer.html
