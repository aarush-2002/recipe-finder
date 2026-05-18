const express = require("express");
const router = express.Router();
const { searchRecipes, getRecipeById, getByCategory, getCategories, getRandomRecipe } = require("../controllers/recipeController");

router.get("/search", searchRecipes);
router.get("/categories", getCategories);
router.get("/random", getRandomRecipe);
router.get("/category/:category", getByCategory);
router.get("/:id", getRecipeById);

module.exports = router;
