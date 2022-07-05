class Form {
  constructor(prenom, nom, email, message) {
    this.prenom = prenom;
    this.formPrenom = document.getElementById("formFirst");
    this.alertPrenom = document.getElementById("formFAlert");
    this.nom = nom;
    this.formNom = document.getElementById("formLast");
    this.alertNom = document.getElementById("formLAlert");
    this.email = email;
    this.formMail = document.getElementById("formEmail");
    this.alertEmail = document.getElementById("formEAlert");
    this.message = message;
    this.formMessage = document.getElementById("formMsg");
    this.alertMessage = document.getElementById("formMAlert");
    this.modalForm = document.querySelector("modal-form");
    this.modalFormData = document.querySelectorAll("div.modal-form__data");
  }

  checkPrenom() {
    let condition = this.prenom.length > 2;
    let alert = this.alertPrenom;
    let input = this.formPrenom;
    let textError = "Veuillez renseigner un prenom de plus de deux caractères.";

    this.controlInput(condition, alert, input, textError);
  }

  checkNom() {
    let condition = this.nom.length > 2;
    let alert = this.alertNom;
    let input = this.formNom;
    let textError = "Veuillez renseigner un nom de plus de deux caractères.";

    this.controlInput(condition, alert, input, textError);
  }

  checkEmail() {
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let condition = this.email != "" && mailReg.test(this.email);
    let alert = this.alertEmail;
    let input = this.formMail;
    let textError = "Veuillez renseigner une adresse email valide.";

    this.controlInput(condition, alert, input, textError);
  }

  checkMessage() {
    let condition = this.message != "" && this.message.length > 30;
    let alert = this.alertMessage;
    let input = this.formMessage;
    let textError = "Veuillez écrire un message d'au moins 30 caractères.";

    this.controlInput(condition, alert, input, textError);
  }

  /**
   * If the condition is false, then set the alert's innerHTML to the txtError, and set the input's
   * data-error-visible attribute to true. Otherwise, set the input's data-error-visible attribute to
   * false, and set the alert's innerHTML to an empty string.
   * @param condition - the condition that will be checked
   * @param alert - the element that will display the error message
   * @param input - the input element
   * @param txtError - The text that will be displayed in the alert box.
   */
  controlInput(condition, alert, input, txtError) {
    if (condition == false) {
      alert.innerHTML = txtError;
      input.setAttribute("data-error-visible", "true");
    } else {
      input.setAttribute("data-error-visible", "false");
      alert.innerHTML = "";
    }
  }

  /**
   * If the form is valid, then log the form data to the console.
   * @returns the value of the function.
   */
  checkValid() {
    const isValid = (input) =>
      input.getAttribute("data-error-visible") === "false";

    let inputArray = Array.from(this.modalFormData);

    let formValid = inputArray.every(isValid);

    if (!formValid) {
      return false;
    } else {
      console.log(this.prenom, this.nom, this.email, this.message);
    }
  }
}

export { Form };
