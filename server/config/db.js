// ===========================
// MongoDB Connection Configuration
// This file connects the app to MongoDB using Mongoose.
// It reads the connection string from the .env file.
// ===========================

const mongoose = require("mongoose");

/**
 * connectDB — Connects to MongoDB
 *
 * How it works:
 * 1. Reads MONGO_URI from environment variables
 * 2. Attempts to connect using Mongoose
 * 3. Logs success message on connection
 * 4. Exits the process if connection fails (prevents the app from running without a DB)
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);

    // Exit the process with failure code (1)
    // This ensures the server doesn't run without a database
    process.exit(1);
  }
};

module.exports = connectDB;
