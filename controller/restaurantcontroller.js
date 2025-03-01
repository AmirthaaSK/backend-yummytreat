const Menu = require("../models/Menu");

// Add Menu Item
const addMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, price, bestseller, category, image } = req.body;

    if (!restaurantId || !name || !price || !category || !image) {
      return res.status(400).json({ message: " All fields are required!" });
    }

    const newMenuItem = new Menu({
      restaurantId,
      name,
      price,
      bestseller,
      category,
      image,
    });

    await newMenuItem.save();
    res.status(201).json({ message: " Menu Item Added Successfully!", menu: newMenuItem });
  } catch (error) {
    res.status(500).json({ message: " Server Error", error: error.message });
  }
};

// Get Menu Items for a Restaurant
const getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    if (!restaurantId) {
      return res.status(400).json({ message: " Restaurant ID is required!" });
    }

    const menuItems = await Menu.find({ restaurantId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: " Server Error", error: error.message });
  }
};

module.exports = { addMenuItem, getMenuItems };
