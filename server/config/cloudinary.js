// ===========================
// Cloudinary Configuration
// Cloudinary is a cloud service for storing and managing images.
// We use it to upload product images, banners, etc.
//
// Exports:
//   cloudinary   — Cloudinary SDK instance (for deletions, transformations)
//   upload       — Multer middleware with Cloudinary storage
// ===========================

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// ─── Configure Cloudinary SDK ───────────────────
// Uses environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Multer-Cloudinary Storage Engine ───────────
// Files uploaded via Multer are sent directly to Cloudinary
// instead of being saved to the local filesystem.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vanwood", // All uploads go into the "vanwood" folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Only allow image formats
    transformation: [{ width: 800, height: 800, crop: "limit" }], // Auto-resize large images
  },
});

// ─── Create Multer Upload Middleware ────────────
// This middleware handles multipart/form-data (file uploads)
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
  },
});

// ─── Helper: Delete Image from Cloudinary ───────
// Used when deleting a product or replacing images.
// Accepts a Cloudinary public_id and removes the image.
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(`Failed to delete image ${publicId}:`, error.message);
    throw error;
  }
};

module.exports = { cloudinary, upload, deleteImage };
