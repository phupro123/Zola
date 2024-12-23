import API from "./axios";
class Media {
  async getFile(username) {
    return await API.get(`/file/${username}`);
  }
}
export default new Media();
