import photographerFactory from "../factories/photographer.js";
import "./../../sass/main.scss";

async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  return { photographers: data };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
}

init();
