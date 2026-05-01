// ===========================
// Auth Slice — Redux Toolkit
// Manages authentication state with localStorage persistence.
//
// State shape:
//   { user: null, token: null, isAuthenticated: false }
//
// The token is stored in localStorage under "vanwood_token"
// which matches the existing Axios interceptor in api/axios.js.
// ===========================

import { createSlice } from "@reduxjs/toolkit";

// ─── Load auth state from localStorage ───────────
const loadAuthFromStorage = () => {
  try {
    const token = localStorage.getItem("vanwood_token");
    const userStr = localStorage.getItem("vanwood_user");

    if (token && userStr) {
      return {
        user: JSON.parse(userStr),
        token,
        isAuthenticated: true,
      };
    }
  } catch (err) {
    console.error("Failed to load auth from localStorage:", err);
  }
  return { user: null, token: null, isAuthenticated: false };
};

// ─── Initial State ──────────────────────────────
const initialState = loadAuthFromStorage();

// ─── Slice ──────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user credentials after login/register
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Persist to localStorage
      localStorage.setItem("vanwood_token", token);
      localStorage.setItem("vanwood_user", JSON.stringify(user));
    },

    // Clear auth state on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("vanwood_token");
      localStorage.removeItem("vanwood_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
