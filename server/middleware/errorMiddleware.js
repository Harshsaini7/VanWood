// ===========================
// Error Handling Middleware
// These middleware functions catch and format errors
// so the API always returns consistent error responses.
// ===========================

/**
 * notFound — Handles 404 errors for undefined routes
 *
 * If a request reaches this middleware, it means no route matched.
 * We create a 404 error and pass it to the error handler below.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the errorHandler
};

/**
 * errorHandler — Global error handler
 *
 * Catches all errors thrown in route handlers and middleware.
 * Returns a consistent JSON error response.
 *
 * In development mode, the full stack trace is included.
 * In production, the stack trace is hidden for security.
 */
const errorHandler = (err, req, res, next) => {
  // Sometimes errors come with a 200 status code (default),
  // so we change it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only show stack trace in development for debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
