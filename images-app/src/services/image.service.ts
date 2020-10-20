import httpService from "./http.service";

class ImageService {
  url = "images";
  async getImages(query: { page: number }) {
    try {
      const response = await httpService.get(this.url, query);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async getImageById(id: string) {
    try {
      const response = await httpService.get(`${this.url}/${id}`, {});
      return response;
    } catch (e) {
      console.error(e);
    }
  }
}

const imageService = new ImageService();
export default imageService;
