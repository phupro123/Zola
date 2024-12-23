import API from "./axios";
class Otp {
  async getOtp(payload) {
    return await API.post("/otp/request-otp", payload);
  }
  async verifyOtp(payload) {
    return await API.post("/otp/verify-register", payload);

  }
  async getForgotOtp(payload) {
    return await API.post("/otp/forget-otp", payload);
  }
  async verifyForgotOtp(payload) {
    return await API.post("/otp/verify", payload);
  }
}

export default new Otp();
