// src/services/api.js
import axios from "axios";

// Base URL for backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // You can add withCredentials: true if using cookies for auth
});

// Interceptor for adding auth token (if needed)
api.interceptors.request.use(
  (config) => {
    // If using JWT or token-based auth, include it here
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic GET
export const get = (url, params = {}) =>
  api.get(url, { params }).then((res) => res.data);

// Generic POST
export const post = (url, data = {}) =>
  api.post(url, data).then((res) => res.data);

// Generic PUT
export const put = (url, data = {}) =>
  api.put(url, data).then((res) => res.data);

// Generic DELETE
export const del = (url) =>
  api.delete(url).then((res) => res.data);

// Export the Axios instance for custom use
export default api;