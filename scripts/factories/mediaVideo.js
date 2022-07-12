class Video {
  constructor(data) {
    this.data = data;
  }

  /**
   * It creates a video element with the source of the video being the data.video property of the
   * object.
   * @param [isControl=false] - boolean - if true, the video will have controls.
   * @returns The mediaVideo variable is being returned.
   */
  create(isControl = false) {
    const mediaVideo = `<video ${
      isControl ? "controls" : ""
    } src="../assets/images/${this.data.video}" alt="${
      this.data.title
    }" class="photographer-work__preview"></video>`;
    return mediaVideo;
  }
}

export { Video };
