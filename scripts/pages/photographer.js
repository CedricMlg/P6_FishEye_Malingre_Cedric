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
const ESCKEY = {
  ESC: 27,
};
const ENTRKEY = {
  ENTR: 13,
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
  if (e.keyCode === ESCKEY.ESC) {
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
 * It adds an event listener to the document that listens for the escape key to be pressed, and if it
 * is, it closes the lightbox.
 *
 * It also sets the previousActiveElement variable to the element that was active before the lightbox
 * was opened.
 *
 * It then sets the inert property of all elements on the page to true, except for the lightbox.
 *
 * It then adds the active class to the lightbox, and sets the overflowY property of the body to
 * hidden.
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
}

/**
 * If the key pressed is the escape key, then close the lightbox
 * @param e - The event object
 */
function checkCloseLightbox(e) {
  if (e.keyCode === ESCKEY.ESC) {
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
 * It takes an array of objects, sorts them, and then displays them on the page.
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
 * It takes an array of objects, sorts them, and then displays them on the page.
 * @param medias - an array of objects that contain the data for each media
 */
async function displayMedia(medias) {
  const photographerWork = document.querySelector(".photographer-work__media");
  const select = document.getElementById("sort");
  const likessum = document.querySelector(".photographer-bottomInfo__likes");
  const lightboxPreview = document.querySelector(".lightbox__block-preview");
  const lightboxBtn = document.querySelector(".lightbox__block-slide");
  const lightboxNext = document.querySelector(".next");
  const lightboxPrev = document.querySelector(".prev");

  const mediasSelect = medias.filter(
    (element) => element.photographerId === parseInt(idPhotographer)
  );
  mediaInteraction(mediasSelect);

  function mediaInteraction(mediaArray) {
    let sum = 0;
    for (const media of mediaArray) {
      sum += media.likes;
      const mediaContent = document.createElement("div");
      mediaContent.classList.add("photographer-work__link");
      mediaContent.classList.add("lightbox-open");
      mediaContent.dataset.liked = "false";
      mediaContent.innerHTML = new FactoryMedia(media).createMedia();
      const mediaPreview = mediaContent.querySelector(
        ".photographer-work__preview"
      );
      const mediaHeart = mediaContent.querySelector(
        ".photographer-work__caption-heart"
      );
      select.addEventListener("input", handleSelect);
      mediaPreview.addEventListener("click", mediaLightbox);
      mediaPreview.addEventListener("keydown", function (e) {
        if (e.keyCode === ENTRKEY.ENTR) {
          mediaLightbox();
        }
      });
      mediaHeart.addEventListener("click", likeMedia);
      mediaHeart.addEventListener("keydown", function (e) {
        if (e.keyCode === ENTRKEY.ENTR) {
          likeMedia();
        }
      });
      /**
       * If the mediaContent data-liked attribute is false, then add 1 to the mediaLikesCount and
       * display the total likes.
       * @param e - the event object
       */
      function likeMedia(e) {
        const mediaLikesCount = mediaContent.querySelector(
          ".photographer-work__caption-count"
        );
        if (mediaContent.getAttribute("data-liked") == "false") {
          console.log(mediaArray);
          sum++;
          mediaLikesCount.textContent =
            parseInt(mediaLikesCount.textContent) + 1;
          mediaHeart.ariaLabel = "liked";
          displayTotalLikes();
          mediaContent.dataset.liked = "true";
        }
      }
      /**
       * It creates a new instance of the FactoryMedia class, and then calls the createMediaLightbox method
       * on that instance, and then assigns the return value of that method to the innerHTML of the
       * lightboxPreview element.
       */
      function mediaLightbox() {
        openLightbox();
        let lightbox = new FactoryMedia(media);
        lightboxPreview.innerHTML = lightbox.createMediaLightbox();
        lightboxBtn.dataset.mediaPosition = mediaArray.indexOf(media);
      }
      photographerWork.appendChild(mediaContent);
    }

    /**
     * It takes the sum of the likes and displays it in the HTML.
     * @returns a string of HTML.
     */
    function getTotalLikes() {
      return `<p>${sum}</p> <svg class="photographer-bottomInfo__likes-heart heart" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
                 c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
                 c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
                 s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
                 C512,93.417,453.532,30,376,30z"></path>
    </svg>`;
    }
    function displayTotalLikes() {
      likessum.innerHTML = getTotalLikes();
    }
    displayTotalLikes();
  }
  lightboxPrev.addEventListener("click", function (e) {
    e.preventDefault();
    if (lightboxBtn.dataset.mediaPosition == 0) {
      lightboxBtn.dataset.mediaPosition = mediasSelect.length - 1;
    } else {
      lightboxBtn.dataset.mediaPosition--;
    }
    let lightbox = new FactoryMedia(
      mediasSelect[lightboxBtn.dataset.mediaPosition]
    );
    lightboxPreview.innerHTML = lightbox.createMediaLightbox();
  });
  lightboxNext.addEventListener("click", function (e) {
    e.preventDefault();
    if (lightboxBtn.dataset.mediaPosition == mediasSelect.length - 1) {
      lightboxBtn.dataset.mediaPosition = 0;
    } else {
      lightboxBtn.dataset.mediaPosition++;
    }
    let lightbox = new FactoryMedia(
      mediasSelect[lightboxBtn.dataset.mediaPosition]
    );
    lightboxPreview.innerHTML = lightbox.createMediaLightbox();
  });
  /**
   * If the value of the selected option is 0, sort the array by likes, if it's 1, sort by date, and if
   * it's 2, sort by title.
   * @param selected - the event object
   */
  function handleSelect(selected) {
    const value1 = select.querySelector(":nth-child(1)");
    const value2 = select.querySelector(":nth-child(2)");
    const value3 = select.querySelector(":nth-child(3)");
    let target = selected.target;
    if (target.value == 0) {
      const sortLikes = mediasSelect.sort((a, b) => {
        // 1. < 0 a comes first
        // 2. 0 nothing will be changed
        // 3. > 0 b comes first

        return b.likes - a.likes;
      });
      photographerWork.innerHTML = "";
      mediaInteraction(sortLikes);
    } else if (target.value == 1) {
      const sortDate = mediasSelect.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      );
      photographerWork.innerHTML = "";
      mediaInteraction(sortDate);
    } else {
      const sortTitle = mediasSelect.sort((a, b) => {
        if (a.title < b.title) return -1;
        return 1;
      });
      photographerWork.innerHTML = "";
      mediaInteraction(sortTitle);
    }
  }
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
