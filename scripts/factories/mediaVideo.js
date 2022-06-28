class Video {
  constructor(data) {
    this.data = data;
    this.create();
  }

  create() {
    const mediaVideo = `<video src="../assets/images/${this.data.video}" class="photographer-work__preview"></video>`;
    return mediaVideo;
  }
}

export { Video };
