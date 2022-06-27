
class FactoryMedia {
  constructor(data) {
    const photographerInfo = document.querySelector(
      ".photographer-bottomInfo"
    );
    // .hasOwnProperty
    const imageSelect = data.filter((element) => element.video === data.video);
    const videoSelect = data.filter((element) => element.image === data.image);
    console.log(imageSelect)

    if (!imageSelect.length == 0) {
      new Image(imageSelect);
    } else {
      throw "Aucune Image n'a été trouvé";
    }
    if (!videoSelect.length == 0) {
      new Video(videoSelect);
    } else {
      throw "Aucune Vidéo n'a été trouvé";
    }

    let sum = 0;
    for (const media of data) {
      sum += media.likes;
    }

    const likessum = document.createElement("div");
    likessum.classList.add("photographer-bottomInfo__likes");
    likessum.innerHTML = `<p>${sum}</p> <svg class="photographer-bottomInfo__likes-heart heart" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
               c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
               c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
               s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
               C512,93.417,453.532,30,376,30z"></path>
  </svg>`;

  photographerInfo.appendChild(likessum);
  }
}

class Image {
  constructor(data) {
    this.data = data;
    this.create();
  }

  create() {
    const photographerWork = document.querySelector(
      ".photographer-work__media"
    );
    for (const media of this.data) {
      const mediaContent = document.createElement("a");
      mediaContent.href = "";
      mediaContent.classList.add("photographer-work__link");
      mediaContent.innerHTML = `<figure class="photographer-work__figure"><img src="../assets/images/${media.image}" alt="${media.title}" class="photographer-work__preview"><figcaption class="photographer-work__caption"><div class="photographer-work__caption-text">${media.title}</div><div class="photographer-work__caption-likes"><p class="photographer-work__caption-count">${media.likes}</p><svg class="photographer-work__caption-heart heart" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
                 c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
                 c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
                 s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
                 C512,93.417,453.532,30,376,30z"></path>
    </svg></div></figcaption></figure>`;
      photographerWork.appendChild(mediaContent);
    }
  }
}

class Video {
  constructor(data) {
    this.data = data;
    this.create();
  }

  create() {
    const photographerWork = document.querySelector(
      ".photographer-work__media"
    );
    for (const media of this.data) {
      const mediaContent = document.createElement("a");
      mediaContent.href = "";
      mediaContent.classList.add("photographer-work__link");
      mediaContent.innerHTML = `<figure class="photographer-work__figure"><video src="../assets/images/${media.video}" class="photographer-work__preview"></video><figcaption class="photographer-work__caption"><div class="photographer-work__caption-text">${media.title}</div><div class="photographer-work__caption-likes"><p class="photographer-work__caption-count">${media.likes}</p><svg class="photographer-work__caption-heart heart" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
                 c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
                 c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
                 s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
                 C512,93.417,453.532,30,376,30z"></path>
    </svg></div></figcaption></figure>`;
      photographerWork.appendChild(mediaContent);
    }
  }
}

export { FactoryMedia };
