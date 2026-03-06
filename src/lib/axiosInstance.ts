import axios, { type AxiosInstance } from "axios";

import { useUserStore } from "@/store/userStore";
import { getToken } from "@/utils/localStorage";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = (error.response?.data?.message ?? error.response?.data?.error ?? "").toString().toLowerCase();
    const isUserNotFound = status === 404 && message.includes("user not found");
    const isAuthEndpoint = error.config?.url?.includes("/auth/");
    const notOnLogin = window.location.pathname !== "/login";

    if (notOnLogin && !isAuthEndpoint && (status === 401 || isUserNotFound)) {
      useUserStore.getState().setUser(null);
      const { removeToken } = await import("@/utils/localStorage");
      removeToken();
      try {
        sessionStorage.setItem("account_removed", "1");
      } catch (_) {}
      window.location.href = "/login?message=account_removed";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
