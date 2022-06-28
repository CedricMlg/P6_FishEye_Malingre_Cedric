import { Image } from "./mediaImage";
import { Video } from "./mediaVideo";

class FactoryMedia {
  constructor(data) {
    if (data.hasOwnProperty("image") === true) {
      return new Image(data);
    } else if (data.hasOwnProperty("video") === true) {
      return new Video(data);
    } else {
      throw "Aucun media n'a été trouvé";
    }
  }
}

export { FactoryMedia };
