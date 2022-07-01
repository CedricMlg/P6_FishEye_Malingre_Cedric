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
