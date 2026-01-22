import { AxiosError } from "axios";

import axiosInstance from "./axiosInstance";

async function apiInvoker<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: object
): Promise<T> {
  try {
    const response = await axiosInstance({
      url,
      method,
      data
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400) {
        throw error;
      }
      console.error(`API call to ${url} failed: `, error);
    } else {
      console.error(`API call to ${url} failed: `, error);
    }
    throw error;
  }
}

export default apiInvoker;
