const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addFavorite, removeFavorite, getFavorites, getShoppingList, addToShoppingList, togglePurchased, clearShoppingList } = require("../controllers/userController");

router.use(protect);

router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:recipeId", removeFavorite);

router.get("/shopping-list", getShoppingList);
router.post("/shopping-list", addToShoppingList);
router.put("/shopping-list/:itemId", togglePurchased);
router.delete("/shopping-list", clearShoppingList);

module.exports = router;
