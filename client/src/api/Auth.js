import API from "./axios";

class Auth {
  constructor() { }

  async login(payload) {
    return await API.post('/auth/login', payload);
  }
  async register(payload) {
    return await API.post('/auth/register', payload);
  }
  async getInfo() {
    return await API.get('/user/get-info');
  }

  async getCurrentUser() {
    try {
      const res = await API.get('/user/get-info');
      const data = { ...res.data };
      return data;
    } catch (error) {
      const data = { message: error.response.data };
      return data;
    }
  }
  async changePassword(payload) {
    return await API.post('/auth/change-password', payload);
  }
  async resetPassword(payload) {
    return await API.post('/auth/reset-password', payload);
  }
  async verifyUser(payload) {
    return await API.post('/auth/verify-user', payload);
  }
  async logout() {
    return await API.post('/auth/logout');
  }
}

export default new Auth();
