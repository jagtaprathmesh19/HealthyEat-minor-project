// utils/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Update with your Django backend URL
  withCredentials: true, // Allow cookies to be sent with requests if needed
});

// Add a request interceptor to automatically include the JWT token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getJWTToken(); // Get the JWT token from your auth module
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
