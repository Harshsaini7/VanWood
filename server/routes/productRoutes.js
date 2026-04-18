// ===========================
// Product Routes
// ===========================

const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// GET /api/products — Get all products (public)
router.get("/", getProducts);

// GET /api/products/:id — Get single product (public)
router.get("/:id", getProductById);

// POST /api/products — Create product (admin only)
router.post("/", protect, admin, createProduct);

// PUT /api/products/:id — Update product (admin only)
router.put("/:id", protect, admin, updateProduct);

// DELETE /api/products/:id — Delete product (admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
