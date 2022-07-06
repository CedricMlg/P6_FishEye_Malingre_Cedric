class Lightbox {
  constructor(container) {
    this.container = container;
    this.figure = container.querySelector("figure");
  }

  displayContent() {
    const media = this.figure.querySelector(".photographer-work__preview");
    const caption = this.figure.querySelector(
      "figcaption .photographer-work__caption-text"
    );
    console.log(media, caption);
  }
}

export { Lightbox };
