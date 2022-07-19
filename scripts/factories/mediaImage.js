class Image {
  constructor(data) {
    this.data = data;
  }

  /**
   * It takes the data from the object and creates an image element with the data from the object.
   * @returns The mediaImage variable is being returned.
   */
  create(isTabable = false) {
    const mediaImage = `<img ${
      isTabable ? "" : 'tabindex="0"'
    } src="../assets/images/${this.data.image}" alt="${this.data.title}" class="photographer-work__preview">`;
    return mediaImage;
  }
}

export { Image };
