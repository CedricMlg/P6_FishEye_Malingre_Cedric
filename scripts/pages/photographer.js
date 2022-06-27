import photographerFactory from "../factories/photographer.js";
import { FactoryMedia } from "../factories/media.js";
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
const idPhotographer = paramsURL.get("id");

async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  return { photographers: data };
}

async function displayData(photographers) {
  const photographerHeader = document.querySelector(".photographer-header");
  const photographerInfo = document.querySelector(".photographer-bottomInfo");

  const photographerSelect = photographers.find(
    (element) => element.id === parseInt(idPhotographer)
  );

  const photographerModel = photographerFactory(photographerSelect);
  const focusUserProfilDOM = photographerModel.focusUserProfilDOM();
  const getUserPrice = photographerModel.getUserPrice();

  photographerHeader.appendChild(focusUserProfilDOM.profil);
  photographerHeader.appendChild(focusUserProfilDOM.portrait);
  photographerInfo.appendChild(getUserPrice);
}

async function displayMedia(medias) {
  const mediasSelect = medias.filter(
    (element) => element.photographerId === parseInt(idPhotographer)
  );

  new FactoryMedia(mediasSelect);
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
  displayMedia(photographers.media);
}

init();

//Mettre le code JavaScript lié à la page photographer.html
