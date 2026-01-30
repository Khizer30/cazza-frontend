import axios, { type AxiosInstance } from "axios";

import { useUserStore } from "@/store/userStore";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.cazza.ai/api",
  timeout: 60000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes("/auth/");
      if (!isAuthEndpoint) {
        useUserStore.getState().setUser(null);
        const { removeToken } = await import("@/utils/localStorage");
        removeToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
