import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice.js";

const baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
export const userFetch = axios.create({
  baseURL: baseURL + "/users",
});
export const productFetch = axios.create({
  baseURL: baseURL + "/products",
});
