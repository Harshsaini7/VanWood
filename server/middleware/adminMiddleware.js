// ===========================
// Admin Authorization Middleware
// Restricts access to admin-only routes.
// Must be used AFTER the protect (auth) middleware.
// ===========================

/**
 * admin — Middleware to restrict access to admin users only
 *
 * How it works:
 * 1. This middleware runs AFTER the protect middleware
 * 2. The protect middleware has already verified the JWT and attached req.user
 * 3. This middleware checks if req.user.role === "admin"
 * 4. If admin, the request proceeds to the route handler
 * 5. If not admin, returns a 403 Forbidden response
 *
 * Usage in routes (always chain after protect):
 *   router.post("/products", protect, admin, createProduct);
 *
 * Why 403 instead of 401?
 *   - 401 = "You are not authenticated" (no valid token)
 *   - 403 = "You are authenticated, but don't have permission" (not an admin)
 */
const admin = (req, res, next) => {
  // Check if the authenticated user has the "admin" role
  if (req.user && req.user.role === "admin") {
    next(); // User is admin — proceed to the next middleware/route handler
  } else {
    // User is authenticated but does not have admin privileges
    res.status(403);
    throw new Error("Not authorized — admin access only");
  }
};

module.exports = { admin };
