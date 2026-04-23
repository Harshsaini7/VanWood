// ===========================
// Authentication Controller
// Handles user registration, login, and profile retrieval.
// All responses follow the consistent format:
//   { success: true/false, data: {}, message: "" }
// ===========================

const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ===========================
// Helper — Validate Email Format
// Uses a regex to check if the email looks valid.
// Returns true if valid, false otherwise.
// ===========================
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 *
 * Flow:
 * 1. Extract name, email, password from request body
 * 2. Validate all inputs (non-empty, valid email, password length)
 * 3. Check if email is already registered
 * 4. Create user (password is auto-hashed by pre-save hook)
 * 5. Generate JWT token and return user data + token
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // --- Input Validation ---

  // Check for empty fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields — name, email, and password are required");
  }

  // Validate email format
  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  // Validate minimum password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if a user already exists with this email
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // Create new user (password is hashed automatically by the pre-save hook in User model)
  const user = await User.create({ name, email, password });

  if (user) {
    // Generate JWT token containing user ID and role
    const token = generateToken({ id: user._id, role: user.role });

    // Return consistent success response with user data and token
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
      message: "Registration successful — welcome to VanWood!",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data — registration failed");
  }
});

/**
 * @desc    Login user & return token
 * @route   POST /api/auth/login
 * @access  Public
 *
 * Flow:
 * 1. Extract email and password from request body
 * 2. Validate inputs (non-empty, valid email)
 * 3. Find user by email in the database
 * 4. Compare entered password with stored hash
 * 5. If match, generate JWT and return user data + token
 * 6. If no match, return 401 Unauthorized
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // --- Input Validation ---

  // Check for empty fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  // Validate email format
  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  // Find user by email (case-insensitive since we store lowercase)
  const user = await User.findOne({ email: email.toLowerCase() });

  // Check if user exists AND password matches the stored hash
  if (user && (await user.matchPassword(password))) {
    // Generate JWT token containing user ID and role
    const token = generateToken({ id: user._id, role: user.role });

    // Return consistent success response
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
      message: "Login successful",
    });
  } else {
    // Generic error message — don't reveal whether email or password was wrong
    // This prevents attackers from enumerating valid email addresses
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Get currently logged-in user's profile
 * @route   GET /api/auth/me
 * @access  Private (requires valid JWT token)
 *
 * Flow:
 * 1. req.user is set by the protect middleware (contains decoded JWT payload)
 * 2. Fetch full user document from DB using the ID from the token
 * 3. Exclude password from the response using .select("-password")
 * 4. Return user profile data
 */
const getMe = asyncHandler(async (req, res) => {
  // req.user is attached by the protect middleware after verifying the JWT
  const user = await User.findById(req.user.id).select("-password"); // Exclude password field

  if (user) {
    // Return consistent success response with full user profile
    res.json({
      success: true,
      data: user,
      message: "User profile retrieved successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getMe };
