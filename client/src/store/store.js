// ===========================
// Redux Store Configuration
// This is the central state management for the app.
// Add new slices here as you build features.
// ===========================

import { configureStore } from "@reduxjs/toolkit";

// Create the Redux store
// Add feature slices to the reducer object as you build them
const store = configureStore({
  reducer: {
    // Placeholder reducer — prevents "no valid reducer" warning
    // Replace with feature slices as you build them:
    // auth: authReducer,
    // products: productReducer,
    // cart: cartReducer,
    // orders: orderReducer,
    _placeholder: (state = {}) => state,
  },
});

export default store;
