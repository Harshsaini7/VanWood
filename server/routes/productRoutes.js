// ===========================
// Product Routes
// Defines all API endpoints for product operations.
//
// Route Map:
//   GET    /api/products           → Get all products (filtered, paginated)
//   GET    /api/products/featured  → Get featured products
//   GET    /api/products/:id       → Get single product by ID
//   POST   /api/products           → Create product (admin only, with image upload)
//   PUT    /api/products/:id       → Update product (admin only, with image upload)
//   DELETE /api/products/:id       → Delete product (admin only)
//   POST   /api/products/:id/reviews → Add review (auth required)
// ===========================

const express = require("express");
const router = express.Router();

// ─── Controllers ────────────────────────────────
const {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
} = require("../controllers/productController");

// ─── Middleware ──────────────────────────────────
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { handleUpload } = require("../middleware/uploadMiddleware");

// ===========================
// Public Routes (no auth required)
// ===========================

// GET /api/products — Get all products with filtering & pagination
// Query params: keyword, category, material, minPrice, maxPrice, rating, sort, page, limit
router.get("/", getProducts);

// GET /api/products/featured — Get featured products for homepage
// NOTE: This route MUST be defined BEFORE /:id to avoid "featured" being treated as an ID
router.get("/featured", getFeaturedProducts);

// GET /api/products/:id — Get a single product by its MongoDB ID
router.get("/:id", getProductById);

// ===========================
// Admin Routes (auth + admin required)
// ===========================

// POST /api/products — Create a new product with image upload
// Middleware chain: protect → admin → handleUpload (multer) → createProduct
router.post("/", protect, admin, handleUpload, createProduct);

// PUT /api/products/:id — Update a product with optional image upload
// Middleware chain: protect → admin → handleUpload (multer) → updateProduct
router.put("/:id", protect, admin, handleUpload, updateProduct);

// DELETE /api/products/:id — Delete a product and its Cloudinary images
// Middleware chain: protect → admin → deleteProduct
router.delete("/:id", protect, admin, deleteProduct);

// ===========================
// Authenticated User Routes
// ===========================

// POST /api/products/:id/reviews — Add a review to a product
// Middleware chain: protect → addProductReview
// Rules: One review per user per product, rating 1–5
router.post("/:id/reviews", protect, addProductReview);

module.exports = router;
