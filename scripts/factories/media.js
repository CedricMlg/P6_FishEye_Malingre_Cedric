// export default function mediaFactory () {
//     function focusUserMediaDOM() {

//     }
//     return { focusUserMediaDOM }
// }

class FactoryMedia {
  constructor(data) {
    // .hasOwnProperty
    const imageSelect = data.filter((element) => element.video === data.video);
    const videoSelect = data.filter((element) => element.image === data.image);
    let imageBuild = new Image(imageSelect);
    let videoBuild = new Video(videoSelect);
  }
}

class Image {
  constructor(data) {
    console.log(data);
  }

  create() {}
}

class Video {
  constructor(data) {
    console.log(data);
  }

  create() {}
}

export { FactoryMedia };
