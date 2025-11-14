import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and refresh tokens if necessary
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if successful
  async (error) => {
    if (error.response && error.response.status === 403) {
      // Don't redirect for auth endpoints - let components handle the error
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      if (!isAuthEndpoint) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
