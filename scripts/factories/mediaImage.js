class Image {
  constructor(data) {
    this.data = data;
    this.create();
  }

  create() {
    const mediaImage = `<img src="../assets/images/${this.data.image}" alt="${this.data.title}" class="photographer-work__preview">`;
    return mediaImage;
  }
}

export { Image };
