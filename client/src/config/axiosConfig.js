import axios from "axios";

const baseAPIUrl = "http://localhost:5000/api";

export const apiFetch = axios.create({
  baseURL: baseAPIUrl,
  withCredentials: true,
});

export const userFetch = axios.create({
  baseURL: baseAPIUrl + "/users",
  withCredentials: true,
});
export const productFetch = axios.create({
  baseURL: baseAPIUrl + "/products",
  withCredentials: true,
});
