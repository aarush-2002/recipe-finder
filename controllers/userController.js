const User = require("../models/User");
const ShoppingList = require("../models/ShoppingList");

const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findById(req.user.id);
    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    user.favorites.push(recipeId);
    await user.save();
    res.json({ success: true, message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((id) => id !== recipeId);
    await user.save();
    res.json({ success: true, message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShoppingList = async (req, res) => {
  try {
    let list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) {
      list = await ShoppingList.create({ user: req.user.id, items: [] });
    }
    res.json({ success: true, shoppingList: list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToShoppingList = async (req, res) => {
  try {
    const { items } = req.body;
    let list = await ShoppingList.findOne({ user: req.user.id });
    if (!list) {
      list = await ShoppingList.create({ user: req.user.id, items: [] });
    }
    items.forEach((item) => {
      list.items.push({ name: item.name, quantity: item.quantity });
    });
    list.updatedAt = Date.now();
    await list.save();
    res.json({ success: true, message: "Added to shopping list", shoppingList: list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const togglePurchased = async (req, res) => {
  try {
    const { itemId } = req.params;
    const list = await ShoppingList.findOne({ user: req.user.id });
    const item = list.items.id(itemId);
    item.isPurchased = !item.isPurchased;
    await list.save();
    res.json({ success: true, shoppingList: list });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearShoppingList = async (req, res) => {
  try {
    await ShoppingList.findOneAndUpdate({ user: req.user.id }, { items: [] });
    res.json({ success: true, message: "Shopping list cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites, getShoppingList, addToShoppingList, togglePurchased, clearShoppingList };
