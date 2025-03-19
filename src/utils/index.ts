import { v4 as uuidv4 } from "uuid";

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};

export const generateSKU = (prefix = "SKU") => {
  return `${prefix}-${uuidv4().split("-")[0].toUpperCase()}`;
};

export const keyLocalStorage = {
  access_token: "access_token",
  products_to_checkout: "products_to_checkout",
};
