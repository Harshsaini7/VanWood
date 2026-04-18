// ===========================
// Cloudinary Configuration
// Cloudinary is a cloud service for storing and managing images.
// We use it to upload product images, banners, etc.
// ===========================

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage that uploads directly to Cloudinary
// Multer handles file uploads in Express; this storage engine
// sends files straight to Cloudinary instead of saving locally.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vanwood", // All uploads go into the "vanwood" folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Only allow image formats
    transformation: [{ width: 800, height: 800, crop: "limit" }], // Auto-resize large images
  },
});

// Create the Multer upload middleware using Cloudinary storage
const upload = multer({ storage });

module.exports = { cloudinary, upload };
