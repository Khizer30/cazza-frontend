import { localStorageVariables } from "@/constants/appConstants";

export const setToken = (token: string) => {
  localStorage.setItem(localStorageVariables.access_token, token);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const setUser = (user: string) => {
  localStorage.setItem("user", user);
};

export const getToken = () => {
  var data = localStorage.getItem(localStorageVariables.access_token);
  if (data) {
    return data;
  } else return null;
};

export const getRefreshToken = () => {
  const data = localStorage.getItem("refreshToken");
  return data || null;
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const removeToken = () => {
  localStorage.removeItem(localStorageVariables.access_token);
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
