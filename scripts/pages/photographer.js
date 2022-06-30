import photographerFactory from "../factories/photographer.js";
import { FactoryMedia } from "../factories/media.js";
import "./../../sass/main.scss";

const modal = document.getElementById("contact_modal");
const modalOpen = document.querySelectorAll(".modal-open");
const modalClose = document.querySelectorAll(".modal-close");
const submitBtn = document.getElementById("submit-form");
let previousActiveElement;

const KEYCODE = {
  ESC: 27,
};

modalOpen.forEach((trigger) => trigger.addEventListener("click", openModal));

modalClose.forEach((trigger) => trigger.addEventListener("click", closeModal));

function openModal() {
  document.addEventListener("keydown", checkCloseModal);
  previousActiveElement = document.activeElement;

  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) {
      child.inert = true;
    }
  });
  modal.classList.add("active");

  modal.querySelector(".modal__close-button").focus();
}

function checkCloseModal(e) {
  if (e.keyCode === KEYCODE.ESC) {
    closeModal();
  }
}

function closeModal() {
  document.removeEventListener("keydown", checkCloseModal);

  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) {
      child.inert = false;
    }
  });
  modal.classList.remove("active");

  previousActiveElement.focus();
}

submitBtn.addEventListener("click", (envoi) => {
  let prenom = document.getElementById("First-name").value;
  let nom = document.getElementById("Last-name").value;
  let email = document.getElementById("Email").value;
  let message = document.getElementById("Your-message").value;
  console.log(prenom, nom, email, message);
});

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
  photographerModel.getUserName();
}

async function displayMedia(medias) {
  const photographerWork = document.querySelector(".photographer-work__media");
  const photographerInfo = document.querySelector(".photographer-bottomInfo");

  const mediasSelect = medias.filter(
    (element) => element.photographerId === parseInt(idPhotographer)
  );

  let sum = 0;
  for (const media of mediasSelect) {
    sum += media.likes;
    const mediaContent = document.createElement("a");
    mediaContent.href = "";
    mediaContent.classList.add("photographer-work__link");
    mediaContent.innerHTML = `<figure class="photographer-work__figure">${new FactoryMedia(
      media
    ).create()}<figcaption class="photographer-work__caption"><div class="photographer-work__caption-text">${
      media.title
    }</div><div class="photographer-work__caption-likes"><p class="photographer-work__caption-count">${
      media.likes
    }</p><svg class="photographer-work__caption-heart heart" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
               c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
               c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
               s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
               C512,93.417,453.532,30,376,30z"></path>
  </svg></div></figcaption></figure>`;
    photographerWork.appendChild(mediaContent);
  }
  const likessum = document.createElement("div");
  likessum.classList.add("photographer-bottomInfo__likes");
  likessum.innerHTML = `<p>${sum}</p> <svg class="photographer-bottomInfo__likes-heart heart" aria-label="likes" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
               c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
               c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
               s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
               C512,93.417,453.532,30,376,30z"></path>
  </svg>`;
  photographerInfo.appendChild(likessum);
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
  displayMedia(photographers.media);
}

init();
