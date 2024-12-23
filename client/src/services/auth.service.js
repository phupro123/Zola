import API from "./axios";

class AuthService {
  async verifyUser(value) {
    try {
      const { data } = await API.post('/auth/verify-user', value);
      return { isExist: true, data };
    } catch (error) {
      return { isExist: false, error: error.message };
    }
  }
  async login(value) {
    const { data } = await API.post('/auth/login', value);
    return data;
  }

  async googleLogin(token) {
    const { data } = await API.post('/auth/google', {
      token,
    });
    return data;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  forgotPassword(email) {
    return API.post('/auth/forgot-password', {
      email,
    });
  }

  checkToken() {
    return API.post('auth/reset-token');
  }

  resetPassword(token, email, password, password2) {
    return API.post('auth/reset-password', {
      token,
      email,
      password,
      password2,
    });
  }

  register(username, email, password) {
    return API.post('auth/signup', {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return API.get('/users/profile');
  }
}

export default new AuthService();
