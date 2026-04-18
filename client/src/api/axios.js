// ===========================
// Axios Instance Configuration
// Creates a pre-configured Axios instance with the API base URL.
// Use this instead of importing axios directly in components.
// ===========================

import axios from "axios";

// Create an Axios instance with the base URL from environment variables
// In Vite, env variables must start with VITE_ to be accessible
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ===========================
// Request Interceptor
// Automatically attaches the JWT token to every request
// so you don't have to manually add it each time.
// ===========================
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage (set during login)
    const token = localStorage.getItem("vanwood_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
