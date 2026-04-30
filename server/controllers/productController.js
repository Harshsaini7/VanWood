// ===========================
// Product Controller
// Handles all product operations: CRUD, filtering, pagination,
// search, featured products, and user reviews.
//
// All responses follow the format:
//   { success: true/false, data: {}, count: N, totalPages: N }
// ===========================

const Product = require("../models/Product");
const User = require("../models/User");
const { deleteImage } = require("../config/cloudinary");

// ===========================
// @desc    Get all products with filtering, search, sorting, and pagination
// @route   GET /api/products
// @access  Public
//
// Query Parameters:
//   keyword    — Search by name/description (case-insensitive)
//   category   — Filter by category (Furniture, Home Decor, Handicrafts)
//   material   — Filter by material (e.g., Sheesham Wood, Teak)
//   minPrice   — Minimum price filter
//   maxPrice   — Maximum price filter
//   rating     — Minimum average rating filter
//   sort       — Sort order: newest, price-low, price-high, top-rated
//   page       — Page number (default: 1)
//   limit      — Items per page (default: 12)
// ===========================
const getProducts = async (req, res) => {
  try {
    // Build the filter query object
    const query = {};

    // Only show active products to customers
    query.isActive = true;

    // ─── Keyword Search ───────────────────────────
    // Search across product name and description
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ];
    }

    // ─── Category Filter ──────────────────────────
    if (req.query.category) {
      query.category = req.query.category;
    }

    // ─── Material Filter ──────────────────────────
    if (req.query.material) {
      query.material = req.query.material;
    }

    // ─── Price Range Filter ───────────────────────
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    // ─── Rating Filter ────────────────────────────
    if (req.query.rating) {
      query.ratings = { $gte: Number(req.query.rating) };
    }

    // ─── Sorting ──────────────────────────────────
    let sortOption = { createdAt: -1 }; // Default: newest first
    switch (req.query.sort) {
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      case "top-rated":
        sortOption = { ratings: -1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // ─── Pagination ───────────────────────────────
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 12));
    const skip = (page - 1) * limit;

    // ─── Execute Query ────────────────────────────
    // Count total matching documents (for totalPages calculation)
    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch the paginated products
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select("-reviews"); // Exclude reviews array for listing (performance)

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ===========================
// @desc    Get featured products (for homepage)
// @route   GET /api/products/featured
// @access  Public
// ===========================
const getFeaturedProducts = async (req, res) => {
  try {
    const limit = Math.min(20, parseInt(req.query.limit) || 8);

    const products = await Product.find({
      isFeatured: true,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("-reviews"); // Exclude reviews for performance

    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
    });
  }
};

// ===========================
// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
// ===========================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.kind === "ObjectId" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    console.error("Error fetching product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// ===========================
// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
//
// Expects multipart/form-data with:
//   - Product fields in body (name, price, category, etc.)
//   - Image files in "images" field (up to 5)
// ===========================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      material,
      stock,
      isFeatured,
      dimensions,
      weight,
    } = req.body;

    // ─── Input Validation ─────────────────────────
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (!price || isNaN(price) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid product price is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }

    const validCategories = ["Furniture", "Home Decor", "Handicrafts"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      });
    }

    // ─── Process Uploaded Images ──────────────────
    // req.files is populated by the upload middleware (Multer + Cloudinary)
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        images.push({
          url: file.path, // Cloudinary URL
          public_id: file.filename, // Cloudinary public ID
        });
      }
    }

    // ─── Parse Dimensions (sent as JSON string from form-data) ───
    let parsedDimensions = {};
    if (dimensions) {
      try {
        parsedDimensions = typeof dimensions === "string"
          ? JSON.parse(dimensions)
          : dimensions;
      } catch (e) {
        // If parsing fails, ignore dimensions
        parsedDimensions = {};
      }
    }

    // ─── Create Product ───────────────────────────
    const product = await Product.create({
      name: name.trim(),
      description: description || "",
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : 0,
      category,
      material: material || "Sheesham Wood",
      stock: stock ? Number(stock) : 1,
      images,
      isFeatured: isFeatured === "true" || isFeatured === true,
      dimensions: parsedDimensions,
      weight: weight ? Number(weight) : 0,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    console.error("Error creating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// ===========================
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
//
// Supports partial updates. If new images are uploaded,
// old images are deleted from Cloudinary and replaced.
// ===========================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ─── Build Update Object ──────────────────────
    const updateData = {};

    // Only update fields that are provided
    const allowedFields = [
      "name", "description", "price", "discountPrice",
      "category", "material", "stock", "isFeatured",
      "isActive", "weight",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        // Handle boolean fields sent as strings from form-data
        if (field === "isFeatured" || field === "isActive") {
          updateData[field] = req.body[field] === "true" || req.body[field] === true;
        } else if (["price", "discountPrice", "stock", "weight"].includes(field)) {
          updateData[field] = Number(req.body[field]);
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    // ─── Validate Category if provided ────────────
    if (updateData.category) {
      const validCategories = ["Furniture", "Home Decor", "Handicrafts"];
      if (!validCategories.includes(updateData.category)) {
        return res.status(400).json({
          success: false,
          message: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
        });
      }
    }

    // ─── Parse Dimensions ─────────────────────────
    if (req.body.dimensions) {
      try {
        updateData.dimensions = typeof req.body.dimensions === "string"
          ? JSON.parse(req.body.dimensions)
          : req.body.dimensions;
      } catch (e) {
        // Ignore invalid dimensions JSON
      }
    }

    // ─── Handle Image Updates ─────────────────────
    // If new images are uploaded, delete old ones from Cloudinary
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const oldImage of product.images) {
        try {
          await deleteImage(oldImage.public_id);
        } catch (err) {
          console.error(`Failed to delete old image: ${oldImage.public_id}`);
        }
      }

      // Add new images
      updateData.images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // ─── Update Product ───────────────────────────
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate against schema
      }
    );

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === "ObjectId" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// ===========================
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
//
// Also deletes all associated images from Cloudinary.
// ===========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ─── Delete Images from Cloudinary ────────────
    for (const image of product.images) {
      try {
        await deleteImage(image.public_id);
      } catch (err) {
        console.error(`Failed to delete image: ${image.public_id}`);
        // Continue deleting the product even if image deletion fails
      }
    }

    // ─── Delete Product from Database ─────────────
    await product.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === "ObjectId" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// ===========================
// @desc    Add a review to a product
// @route   POST /api/products/:id/reviews
// @access  Private (authenticated users only)
//
// Rules:
//   - User must be authenticated
//   - One review per user per product
//   - Rating must be 1–5
//   - After adding, recalculates average rating
// ===========================
const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // ─── Input Validation ─────────────────────────
    if (!rating || isNaN(rating)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a rating (1–5)",
      });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a review comment",
      });
    }

    // ─── Find the Product ─────────────────────────
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ─── Check for Duplicate Review ───────────────
    // Each user can only leave one review per product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // ─── Fetch User Name from Database ────────────
    // The JWT only contains id and role, so we need to look up the name
    const user = await User.findById(req.user.id).select("name");
    const userName = user ? user.name : "Anonymous";

    // ─── Add the Review ───────────────────────────
    const review = {
      user: req.user.id,
      name: userName,
      rating: numRating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    product.reviews.push(review);

    // ─── Recalculate Average Rating ───────────────
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      data: review,
      message: "Review added successfully",
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === "ObjectId" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }
    console.error("Error adding review:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
};
