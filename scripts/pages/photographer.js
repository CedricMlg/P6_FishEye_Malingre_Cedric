import photographerFactory from "../factories/photographer.js";
import { FactoryMedia } from "../factories/media.js";
import { Form } from "../utils/contactForm.js";
import "./../../sass/main.scss";

const submitBtn = document.getElementById("submit-form");
const modal = document.getElementById("contact_modal");
const modalOpen = document.querySelectorAll(".modal-open");
const modalClose = document.querySelectorAll(".modal-close");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.querySelectorAll(".lightbox-close");
let previousActiveElement;
const KEYCODE = {
  ESC: 27,
};

const paramsURL = new URL(document.location).searchParams;
const idPhotographer = paramsURL.get("id");

modalOpen.forEach((trigger) => trigger.addEventListener("click", openModal));

modalClose.forEach((trigger) => trigger.addEventListener("click", closeModal));

lightboxClose.forEach((trigger) =>
  trigger.addEventListener("click", closeLightbox)
);

submitBtn.addEventListener("click", (envoi) => {
  let prenom = document.getElementById("First-name").value;
  let nom = document.getElementById("Last-name").value;
  let email = document.getElementById("Email").value;
  let message = document.getElementById("Your-message").value;
  let form = new Form(prenom, nom, email, message);
  form.checkPrenom();
  form.checkNom();
  form.checkEmail();
  form.checkMessage();
  form.checkValid();
});

/**
 * When the modal is opened, the user is unable to scroll the page, and the modal is focused.
 */
function openModal() {
  document.addEventListener("keydown", checkCloseModal);
  previousActiveElement = document.activeElement;

  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) {
      child.inert = true;
    }
  });
  modal.classList.add("active");
  document.body.style.overflowY = "hidden";

  modal.querySelector(".modal__close-button").focus();
}

/**
 * If the key pressed is the escape key, then close the modal
 * @param e - The event object
 */
function checkCloseModal(e) {
  if (e.keyCode === KEYCODE.ESC) {
    closeModal();
  }
}

/**
 * It removes the event listener that listens for the escape key, removes the inert attribute from all
 * the elements in the body except the modal, removes the active class from the modal, and sets the
 * overflowY property of the body to an empty string.
 */
function closeModal() {
  document.removeEventListener("keydown", checkCloseModal);

  Array.from(document.body.children).forEach((child) => {
    if (child !== modal) {
      child.inert = false;
    }
  });
  modal.classList.remove("active");
  document.body.style.overflowY = "";

  previousActiveElement.focus();
}

/**
 * When the lightbox is opened, the user can't scroll the page, and the lightbox is the only thing that
 * can be interacted with.
 */
function openLightbox() {
  document.addEventListener("keydown", checkCloseLightbox);
  previousActiveElement = document.activeElement;

  Array.from(document.body.children).forEach((child) => {
    if (child !== lightbox) {
      child.inert = true;
    }
  });
  lightbox.classList.add("active");
  document.body.style.overflowY = "hidden";

  lightbox.querySelector(".lightbox__close-button").focus();
}

/**
 * If the key pressed is the escape key, then close the lightbox
 * @param e - The event object
 */
function checkCloseLightbox(e) {
  if (e.keyCode === KEYCODE.ESC) {
    closeLightbox();
  }
}

/**
 * It removes the event listener that listens for the escape key, removes the inert attribute from all
 * elements except the lightbox, removes the active class from the lightbox, and sets the overflowY
 * property of the body to an empty string.
 */
function closeLightbox() {
  document.removeEventListener("keydown", checkCloseLightbox);

  Array.from(document.body.children).forEach((child) => {
    if (child !== lightbox) {
      child.inert = false;
    }
  });
  lightbox.classList.remove("active");
  document.body.style.overflowY = "";

  previousActiveElement.focus();
}

/**
 * It fetches the data from the JSON file and returns it as an object.
 * @returns An object with a property called photographers.
 */
async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  return { photographers: data };
}

/**
 * It takes an array of objects, finds the object with the id that matches the idPhotographer variable,
 * and then creates a new object from the photographerFactory function, which is then used to create a
 * DOM element and append it to the page.
 * @param photographers - an array of objects
 */
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

/**
 * When the user clicks on a link, the function openLightbox is called.
 * @param medias - an array of objects
 */
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
    mediaContent.href = "javascript:;";
    mediaContent.classList.add("photographer-work__link");
    mediaContent.classList.add("lightbox-open");
    mediaContent.innerHTML = new FactoryMedia(media).createMedia();
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

  const lightboxOpen = document.querySelectorAll(".photographer-work__link");
  lightboxOpen.forEach((trigger) =>
    trigger.addEventListener("click", openLightbox)
  );
}

/**
 * The init function is an async function that calls the getPhotographers function, which returns a
 * promise that resolves to an object with two properties, photographers and media. The init function
 * then calls the displayData function, passing in the photographers property of the object returned by
 * the getPhotographers function, and then calls the displayMedia function, passing in the media
 * property of the object returned by the getPhotographers function.
 */
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
  displayMedia(photographers.media);
}

init();
