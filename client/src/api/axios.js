import axios from 'axios';

// const baseURL = 'https://zola-api.herokuapp.com/api/v1';
const baseURL = 'http://localhost:5000/api/v1';

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    let token = localStorage.getItem('token');
    if (token && token != 'undefined') {
      token = JSON.parse(token);
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default API;
