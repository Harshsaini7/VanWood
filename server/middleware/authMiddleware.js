// ===========================
// Authentication Middleware
// This middleware protects routes by verifying JWT tokens.
// Only authenticated users can access protected routes.
// ===========================

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/**
 * protect — Middleware to protect routes
 *
 * How it works:
 * 1. Checks if the request has an Authorization header with a Bearer token
 * 2. Verifies the token using the JWT_SECRET
 * 3. Attaches the decoded user info to req.user
 * 4. If no token or invalid token, sends a 401 Unauthorized response
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in the Authorization header
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode the payload (contains user ID, etc.)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded user info to the request object
      // This makes user data available in route handlers via req.user
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401);
      throw new Error("Not authorized — invalid token");
    }
  }

  // If no token was found at all
  if (!token) {
    res.status(401);
    throw new Error("Not authorized — no token provided");
  }
});

/**
 * admin — Middleware to restrict access to admin users only
 *
 * Must be used AFTER the protect middleware.
 * Checks if the authenticated user has the "admin" role.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, proceed
  } else {
    res.status(403);
    throw new Error("Not authorized — admin access only");
  }
};

module.exports = { protect, admin };
