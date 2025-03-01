const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  bestseller: { type: Boolean, default: false },
  category: { type: String, required: true }, // Example: "Veg", "Non-Veg"
  image: { type: String, required: true },
});

module.exports = mongoose.model("Menu", menuSchema);

