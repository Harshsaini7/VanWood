// ===========================
// Product Model (Mongoose Schema)
// Defines the structure for product documents in MongoDB.
// Each product represents a handcrafted wooden item from Saharanpur.
// ===========================

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Product name (e.g., "Hand-Carved Sheesham Wood Bookshelf")
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },

    // Detailed description of the product
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },

    // Price in INR (Indian Rupees)
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price cannot be negative"],
    },

    // Product category for filtering and browsing
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: [
        "Living Room",
        "Bedroom",
        "Dining",
        "Office",
        "Home Decor",
        "Kitchen",
        "Storage",
        "Other",
      ],
    },

    // Type of wood used (important for handcrafted furniture)
    woodType: {
      type: String,
      default: "Sheesham", // Sheesham is the most common wood from Saharanpur
    },

    // Array of image URLs (stored on Cloudinary)
    images: [
      {
        url: { type: String, required: true }, // Image URL
        public_id: { type: String, required: true }, // Cloudinary public ID (for deletion)
      },
    ],

    // Number of items in stock
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },

    // Average rating (updated when reviews are added)
    rating: {
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

    // Whether the product is currently available for sale
    isActive: {
      type: Boolean,
      default: true,
    },

    // Dimensions of the product (useful for furniture)
    dimensions: {
      length: { type: String, default: "" },
      width: { type: String, default: "" },
      height: { type: String, default: "" },
    },

    // Weight in kg
    weight: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
