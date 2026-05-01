// ===========================
// Wishlist Slice — Redux Toolkit
// Manages the wishlist state with localStorage persistence.
//
// State shape:
//   { items: [] }
//
// Each wishlist item stores the full product snapshot.
// ===========================

import { createSlice } from "@reduxjs/toolkit";

// ─── Load wishlist from localStorage ─────────────
const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem("vanwood_wishlist");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to load wishlist from localStorage:", err);
  }
  return { items: [] };
};

// ─── Save wishlist to localStorage ───────────────
const saveWishlistToStorage = (state) => {
  try {
    localStorage.setItem("vanwood_wishlist", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save wishlist to localStorage:", err);
  }
};

// ─── Initial State ──────────────────────────────
const initialState = loadWishlistFromStorage();

// ─── Slice ──────────────────────────────────────
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add a product to the wishlist (no-op if already exists)
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          material: product.material,
          category: product.category,
          rating: product.rating,
          reviewCount: product.reviewCount,
          stock: product.stock,
          image: product.image || null,
        });
      }

      saveWishlistToStorage(state);
    },

    // Remove a product from the wishlist by ID
    removeFromWishlist: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
      saveWishlistToStorage(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
