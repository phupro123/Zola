import API from "./axios";
export function withAxios(query) {
  API.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url === '/auth/reset-token'
      ) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          // query.refetch();
          return API(originalRequest);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      return Promise.reject(error);
    },
  );
}
