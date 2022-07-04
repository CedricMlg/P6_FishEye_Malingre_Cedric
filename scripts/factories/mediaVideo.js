class Video {
  constructor(data) {
    this.data = data;
  }

  /**
   * It takes the data from the JSON file and creates a video element with the source being the video
   * file from the JSON file.
   * @returns The mediaVideo variable is being returned.
   */
  create() {
    const mediaVideo = `<video src="../assets/images/${this.data.video}" alt="${this.data.title}" class="photographer-work__preview"></video>`;
    return mediaVideo;
  }
}

export { Video };
