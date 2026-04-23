// ===========================
// VanWood — Main Server Entry Point
// This file sets up the Express app, connects middleware,
// mounts API routes, connects to MongoDB, and starts the server.
// ===========================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables from .env file (must be called early)
dotenv.config();

// Initialize Express application
const app = express();

// ===========================
// Middleware Setup
// ===========================

// Enable CORS — allows the frontend (React) to communicate with the backend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite's default port
    credentials: true, // Allow cookies and auth headers
  })
);

// Parse incoming JSON request bodies (e.g., from POST/PUT requests)
app.use(express.json());

// Parse URL-encoded form data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// ===========================
// API Routes
// ===========================

// Health check route — use this to verify the server is running
// Visit: http://localhost:5000/api/health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VanWood API is running",
  });
});

// Authentication routes — register, login, get current user
app.use("/api/auth", require("./routes/authRoutes"));

// Product routes — CRUD operations for furniture products
app.use("/api/products", require("./routes/productRoutes"));

// ===========================
// Error Handling Middleware
// These must be AFTER all route definitions
// ===========================

// Handle 404 — catches requests that don't match any route
app.use(notFound);

// Global error handler — catches all thrown errors and returns consistent JSON
app.use(errorHandler);

// ===========================
// Start the Server
// ===========================

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ VanWood server is running on http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth routes:  http://localhost:${PORT}/api/auth`);
    console.log(`📦 Product routes: http://localhost:${PORT}/api/products`);
  });
});
