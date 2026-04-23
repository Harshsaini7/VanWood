// ===========================
// Authentication Routes
// Defines API endpoints for user registration, login, and profile.
//
// Route Map:
//   POST /api/auth/register  → Create a new user account (public)
//   POST /api/auth/login     → Login and get a JWT token (public)
//   GET  /api/auth/me        → Get logged-in user's profile (protected)
// ===========================

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/register — Create a new user account
// No authentication required — anyone can register
router.post("/register", registerUser);

// POST /api/auth/login — Login and receive a JWT token
// No authentication required — users login with email + password
router.post("/login", loginUser);

// GET /api/auth/me — Get the currently logged-in user's profile
// Protected — requires a valid JWT token in the Authorization header
router.get("/me", protect, getMe);

module.exports = router;
