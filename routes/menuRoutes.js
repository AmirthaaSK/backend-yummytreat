const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Menu = require("../models/Menu");

// GET: Fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    if (menus.length === 0) {
      return res.status(404).json({ message: "❌ No menu items found" });
    }
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// POST: Add a new menu item
router.post("/", async (req, res) => {
  try {
    let { name, price, restaurantId, description, image, category } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "❌ Invalid restaurant ID" });
    }

    if (!name || !price || !restaurantId || !image || !category) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const newMenuItem = new Menu({ name, price, restaurantId, description, image, category });
    await newMenuItem.save();
    
    res.status(201).json({ message: "✅ Menu item added!", menuItem: newMenuItem });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding menu item", error: error.message });
  }
});

module.exports = router;

