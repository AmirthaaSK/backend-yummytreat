const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant"); // Import Restaurant Model

//  GET: Fetch all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all from DB
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

//  POST: Add a new restaurant
router.post("/", async (req, res) => {
  try {
    const { name, location, contact, email } = req.body;

    // Validation: Ensure all fields are provided
    if (!name || !location || !contact || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create a new restaurant entry
    const newRestaurant = new Restaurant({
      name,
      location,
      contact,
      email
    });

    // Save to MongoDB
    await newRestaurant.save();

    res.status(201).json({ message: " Restaurant added successfully!", newRestaurant });
  } catch (error) {
    res.status(500).json({ message: " Server Error", error });
  }
});

module.exports = router;
