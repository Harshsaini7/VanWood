// ===========================
// JWT Token Generator Utility
// Creates a signed JWT token for user authentication.
// ===========================

const jwt = require("jsonwebtoken");

/**
 * generateToken — Creates a JWT token
 *
 * @param {Object} payload - Data to encode in the token (e.g., { id, role })
 * @returns {string} - Signed JWT token string
 *
 * The token:
 * - Contains the user's ID and role
 * - Is signed with JWT_SECRET from .env
 * - Expires in 30 days (configurable)
 *
 * Usage example:
 *   const token = generateToken({ id: user._id, role: user.role });
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token is valid for 30 days
  });
};

module.exports = generateToken;
