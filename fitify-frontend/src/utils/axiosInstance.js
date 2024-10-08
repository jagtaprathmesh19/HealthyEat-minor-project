// utils/axiosInstance.js
import axios from "axios";
import { getCSRFToken, fetchCSRFToken } from "./csrf";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Update with your Django backend URL
  withCredentials: true, // Allow cookies to be sent with requests
});

// Add a request interceptor to automatically include the CSRF token
axiosInstance.interceptors.request.use(
  async (config) => {
    let csrfToken = getCSRFToken();
    if (!csrfToken) {
      try {
        await fetchCSRFToken(); // Fetch a new CSRF token if it's missing
        csrfToken = getCSRFToken();
      } catch (error) {
        return Promise.reject(error); // Handle fetch CSRF token error
      }
    }

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
