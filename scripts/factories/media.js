import { Image } from "./mediaImage";
import { Video } from "./mediaVideo";

class FactoryMedia {

/**
 * If the data object has an image property, create a new Image object with the data object as a
 * parameter. If the data object has a video property, create a new Video object with the data object
 * as a parameter. If neither of these conditions are met, throw an error.
 * @param data - the object that contains the data of the media
 */
  constructor(data) {
    this.media = null;
    if (Object.prototype.hasOwnProperty.call(data, "image") === true) {
      this.media = new Image(data);
    } else if (Object.prototype.hasOwnProperty.call(data, "video") === true) {
      this.media = new Video(data);
    } else {
      throw "Aucun media n'a été trouvé";
    }
  }

  /**
   * It creates a figure element with a class of photographer-work__figure, then it creates the media
   * element (image or video) and then it creates a figcaption element with a class of
   * photographer-work__caption. Inside the figcaption element it creates a div with a class of
   * photographer-work__caption-text and then it creates a div with a class of
   * photographer-work__caption-likes. Inside the div with a class of photographer-work__caption-likes it
   * creates a p element with a class of photographer-work__caption-count and then it creates an svg
   * element with a class of photographer-work__caption-heart heart.
   *
   * The function returns the entire figure element.
   * @returns A string of HTML.
   */
  createMedia() {
    return `<figure class="photographer-work__figure">${this.media.create()}<figcaption class="photographer-work__caption"><div class="photographer-work__caption-text">${
      this.media.data.title
    }</div><div class="photographer-work__caption-likes"><p class="photographer-work__caption-count">${
      this.media.data.likes
    }</p><svg tabindex="0" class="photographer-work__caption-heart heart" aria-label="likes" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
               c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
               c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
               s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
               C512,93.417,453.532,30,376,30z"></path>
  </svg></div></figcaption></figure>`;
  }

  /**
   * Create a new div element, add the media object to it, and then add a caption to it.
   * @returns The return value is a string.
   */
  createMediaLightbox() {
    return `<div class="lightbox__block-imgBox">${this.media.create(true)}</div>
    <figcaption><p class="lightbox__block-caption">${
      this.media.data.title
    }</p></figcaption>`;
  }
}

export { FactoryMedia };
