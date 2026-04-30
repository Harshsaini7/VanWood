// ===========================
// Product Model (Mongoose Schema)
// Defines the structure for product documents in MongoDB.
// Each product represents a handcrafted wooden item from Saharanpur.
//
// Fields: name, description, price, discountPrice, category, material,
//         stock, images[], ratings, numReviews, reviews[], isFeatured,
//         dimensions, weight, isActive
// ===========================

const mongoose = require("mongoose");

// ─── Review Sub-Schema ──────────────────────────
// Embedded subdocument for user reviews on products.
// Each review stores the user reference, name, rating, comment, and timestamp.
const reviewSchema = new mongoose.Schema(
  {
    // Reference to the User who wrote this review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reviewer's display name (denormalized for performance)
    name: {
      type: String,
      required: true,
    },

    // Star rating (1–5)
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // Review text comment
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      trim: true,
    },

    // When the review was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

// ─── Product Schema ─────────────────────────────
const productSchema = new mongoose.Schema(
  {
    // Product name (e.g., "Hand-Carved Sheesham Wood Bookshelf")
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },

    // Detailed description of the product
    description: {
      type: String,
      default: "",
    },

    // Selling price in INR (Indian Rupees)
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price cannot be negative"],
    },

    // Original/MRP price before discount (optional)
    // If set, the frontend shows this as the crossed-out price
    discountPrice: {
      type: Number,
      default: 0,
      min: [0, "Discount price cannot be negative"],
    },

    // Product category — matches the frontend filter options
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: {
        values: ["Furniture", "Home Decor", "Handicrafts"],
        message: "Category must be one of: Furniture, Home Decor, Handicrafts",
      },
    },

    // Type of wood or material used
    material: {
      type: String,
      default: "Sheesham Wood",
      trim: true,
    },

    // Number of items in stock
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },

    // Array of image objects (stored on Cloudinary)
    // Each image has a URL for display and a public_id for deletion
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    // Average rating (auto-calculated from reviews)
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Total number of reviews
    numReviews: {
      type: Number,
      default: 0,
    },

    // Embedded array of user reviews
    reviews: [reviewSchema],

    // Whether the product is featured on the homepage
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Whether the product is currently available for sale
    isActive: {
      type: Boolean,
      default: true,
    },

    // Physical dimensions (useful for furniture products)
    dimensions: {
      length: { type: String, default: "" },
      width: { type: String, default: "" },
      height: { type: String, default: "" },
    },

    // Weight in kilograms
    weight: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// ─── Index for search performance ───────────────
// Text index on name and description for keyword search
productSchema.index({ name: "text", description: "text" });

// Compound index for common filter queries
productSchema.index({ category: 1, material: 1, price: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
