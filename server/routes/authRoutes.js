// ===========================
// Authentication Routes
// ===========================

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/register — Create a new user account
router.post("/register", registerUser);

// POST /api/auth/login — Login and get a JWT token
router.post("/login", loginUser);

// GET /api/auth/profile — Get logged-in user's profile (protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;
