// ===========================
// Order Model (Mongoose Schema)
// Defines the structure for order documents in MongoDB.
// Tracks what a customer purchased, payment status, and delivery info.
// ===========================

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to the User model
      required: true,
    },

    // Array of items in the order
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Links to the Product model
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        image: { type: String }, // Product image URL for order summary
      },
    ],

    // Shipping address for this order
    shippingAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
      phone: { type: String, required: true },
    },

    // Razorpay payment details
    paymentInfo: {
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      razorpay_signature: { type: String },
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },
    },

    // Price breakdown
    itemsPrice: {
      type: Number,
      required: true, // Sum of all items (quantity * price)
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true, // itemsPrice + shippingPrice + taxPrice
    },

    // Order status tracking
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },

    // Delivery date (set when order is marked as delivered)
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt = order placed date
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
