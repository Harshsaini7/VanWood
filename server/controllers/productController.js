// ===========================
// Product Controller
// Handles CRUD operations for products.
// ===========================

const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

/**
 * @desc    Get all products (with optional search & category filter)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  // Build query object from URL query parameters
  const query = {};

  // Search by name (case-insensitive partial match)
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Only show active products to customers
  query.isActive = true;

  const products = await Product.find(query).sort({ createdAt: -1 }); // Newest first

  res.json({
    success: true,
    count: products.length,
    products,
  });
});

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({ success: true, product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Validate the update against the schema
  });

  if (product) {
    res.json({ success: true, product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ success: true, message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
