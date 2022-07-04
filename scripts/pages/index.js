import photographerFactory from "../factories/photographer.js";
import "./../../sass/main.scss";

/**
 * It fetches the data from the photographers.json file and returns the data in the form of an object
 * @returns An object with a photographers property that is an array of objects.
 */
async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  return { photographers: data };
}

/**
 * We're looping through the array of photographers, creating a photographer model for each one, and
 * then appending the DOM element for each photographer to the DOM
 * @param photographers - an array of photographer objects
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * We're calling the getPhotographers function, which returns a promise. When the promise resolves,
 * we're destructuring the photographers property from the response object and passing it to the
 * displayData function
 */
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers.photographers);
}

init();
