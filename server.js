const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ YummyTreat API is Running!");
});

// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ message: "❌ API Not Found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`❌ Server Error: ${err.message}`);
  res.status(500).json({ message: "❌ Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
