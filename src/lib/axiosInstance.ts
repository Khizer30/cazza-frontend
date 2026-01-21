import axios, { type AxiosInstance } from "axios";

// Always use proxy - works in both development and production
const getBaseURL = () => {
  return '/api';
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 60000, 
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and auto-logout on token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const isAuthEndpoint = error.config?.url?.includes("/auth/");
      if (!isAuthEndpoint) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
