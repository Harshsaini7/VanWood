// ===========================
// User Model (Mongoose Schema)
// Defines the structure for user documents in MongoDB.
// Used for authentication, profiles, and order tracking.
// ===========================

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true, // Removes extra whitespace
    },

    // Email address (used for login)
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true, // No two users can have the same email
      lowercase: true, // Store emails in lowercase for consistency
      trim: true,
    },

    // Hashed password (never stored as plain text)
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // User role — "user" for customers, "admin" for store owners
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Phone number (optional, useful for order delivery)
    phone: {
      type: String,
      default: "",
    },

    // Shipping address (optional, can be added later)
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ===========================
// Pre-save Hook — Hash Password
// Before saving a user, hash the password if it was modified.
// This runs automatically before every save() call.
// ===========================
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been changed (or is new)
  if (!this.isModified("password")) return next();

  // Generate a salt (random string) and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ===========================
// Instance Method — Compare Password
// Used during login to check if the entered password matches the stored hash.
// ===========================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
