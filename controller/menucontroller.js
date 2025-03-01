const Menu = require("../models/menu");

const addMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuItem, price, bestseller, vegNonVeg, image } = req.body;

    if (!restaurantId || !menuItem || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const menu = await Menu.create({ restaurantId, menuItem, price, bestseller, vegNonVeg, image });

    res.status(201).json({ message: "Menu Item Added", menu });
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await Menu.find({ restaurantId });

    res.json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addMenuItem, getMenuItems }; // ✅ Ensure correct export
