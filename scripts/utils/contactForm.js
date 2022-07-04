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

submitBtn.addEventListener("click", (envoi) => {
  let prenom = document.getElementById("First-name").value;
  let nom = document.getElementById("Last-name").value;
  let email = document.getElementById("Email").value;
  let message = document.getElementById("Your-message").value;
  console.log(prenom, nom, email, message);
});

/**
 * When the modal is opened, the focus is set to the close button.
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
 * the elements in the body except the modal, removes the active class from the modal, and then focuses
 * on the previous active element.
 */
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
