const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  isPurchased: { type: Boolean, default: false }
});

const shoppingListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [shoppingItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
