import axios, { type AxiosInstance } from "axios";

// Determine base URL based on environment
const getBaseURL = () => {
  // Check if we're on production domain
  const isProduction = window.location.hostname === 'www.cazza.ai' || window.location.hostname === 'cazza.ai';

  if (isProduction) {
    // Production: use direct backend URL
    return 'https://api.cazza.ai/api';
  } else {
    // Development: use proxy
    return '/api';
  }
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
