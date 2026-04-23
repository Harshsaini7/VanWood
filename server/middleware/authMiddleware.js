// ===========================
// Authentication Middleware
// This middleware protects routes by verifying JWT tokens.
// Only authenticated users can access protected routes.
// ===========================

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/**
 * protect — Middleware to protect routes (JWT verification)
 *
 * How it works:
 * 1. Checks if the request has an Authorization header with a Bearer token
 * 2. Extracts the token from the header ("Bearer <token>")
 * 3. Verifies the token using the JWT_SECRET from environment variables
 * 4. Decodes the payload (contains user ID and role)
 * 5. Attaches the decoded user info to req.user for downstream handlers
 * 6. If no token or invalid token, sends a 401 Unauthorized response
 *
 * Usage in routes:
 *   router.get("/profile", protect, getProfile);
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in the Authorization header
  // Expected format: "Bearer eyJhbGciOiJIUzI1NiIs..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>" by splitting on the space
      token = req.headers.authorization.split(" ")[1];

      // Verify the token signature and decode the payload
      // The payload contains { id, role, iat, exp } set during token creation
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded user info to the request object
      // This makes user data available in route handlers via req.user
      // Example: req.user.id, req.user.role
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Token verification failed — could be expired, malformed, or tampered with
      console.error("Token verification failed:", error.message);
      res.status(401);
      throw new Error("Not authorized — invalid or expired token");
    }
  }

  // If no token was found in the Authorization header at all
  if (!token) {
    res.status(401);
    throw new Error("Not authorized — no token provided");
  }
});

module.exports = { protect };
