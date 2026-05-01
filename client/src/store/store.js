// ===========================
// Redux Store Configuration
// This is the central state management for the app.
// All feature slices are registered here.
// ===========================

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import authReducer from "./authSlice";

// Create the Redux store with all feature slices
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export default store;
