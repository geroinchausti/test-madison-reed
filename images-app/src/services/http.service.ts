import API from "../plugins/axios";

class HttpService {
  async get(url: string, params: object) {
    try {
      const response = await API.get(url, { params });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

const httpService = new HttpService();
export default httpService;
