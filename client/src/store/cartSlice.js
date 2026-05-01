// ===========================
// Cart Slice — Redux Toolkit
// Manages the shopping cart state with localStorage persistence.
//
// State shape:
//   { items: [], totalItems: 0, totalPrice: 0 }
//
// Each cart item:
//   { id, name, price, originalPrice, material, image, quantity, stock }
// ===========================

import { createSlice } from "@reduxjs/toolkit";

// ─── Load cart from localStorage ─────────────────
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("vanwood_cart");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage:", err);
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

// ─── Save cart to localStorage ───────────────────
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem("vanwood_cart", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};

// ─── Recalculate totals ─────────────────────────
const recalculate = (state) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};

// ─── Initial State ──────────────────────────────
const initialState = loadCartFromStorage();

// ─── Slice ──────────────────────────────────────
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to cart (or increment quantity if it already exists)
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Increment quantity, but don't exceed stock
        const maxQty = existingItem.stock || 99;
        existingItem.quantity = Math.min(
          existingItem.quantity + (newItem.quantity || 1),
          maxQty
        );
      } else {
        // Add new item with quantity (default 1)
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          originalPrice: newItem.originalPrice,
          material: newItem.material,
          image: newItem.image || null,
          quantity: newItem.quantity || 1,
          stock: newItem.stock || 99,
        });
      }

      recalculate(state);
      saveCartToStorage(state);
    },

    // Remove an item from cart by ID
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);

      recalculate(state);
      saveCartToStorage(state);
    },

    // Update quantity for a specific item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity goes to 0 or below
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          // Cap at stock limit
          item.quantity = Math.min(quantity, item.stock || 99);
        }
      }

      recalculate(state);
      saveCartToStorage(state);
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
