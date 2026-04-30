// ===========================
// Upload Middleware
// Handles product image uploads using Multer + Cloudinary.
// Accepts up to 5 images per request.
//
// Usage in routes:
//   router.post("/", protect, admin, uploadImages, createProduct);
//
// After this middleware runs, uploaded image data is available at:
//   req.files — array of uploaded file objects from Multer
//   Each file has: path (Cloudinary URL) and filename (Cloudinary public_id)
// ===========================

const { upload } = require("../config/cloudinary");

// ─── Upload up to 5 product images ─────────────
// "images" is the form field name expected from the client.
// Multer will process up to 5 files from the "images" field.
const uploadImages = upload.array("images", 5);

// ─── Middleware wrapper with error handling ─────
// Wraps the Multer upload in a middleware that catches
// file upload errors and returns friendly error messages.
const handleUpload = (req, res, next) => {
  uploadImages(req, res, (err) => {
    if (err) {
      // Multer-specific errors
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          success: false,
          message: "Maximum 5 images allowed per product",
        });
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Each image must be under 5 MB",
        });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Unexpected field name — use 'images' for file uploads",
        });
      }
      // Generic upload error
      return res.status(400).json({
        success: false,
        message: `Image upload failed: ${err.message}`,
      });
    }
    // Upload successful — continue to the next middleware/handler
    next();
  });
};

module.exports = { handleUpload };
