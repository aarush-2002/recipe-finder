const axios = require("axios");

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

const searchRecipes = async (req, res) => {
  try {
    const { query, category } = req.query;
    let url = "";
    if (query) {
      url = `${MEALDB_BASE}/search.php?s=${encodeURIComponent(query)}`;
    } else if (category) {
      url = `${MEALDB_BASE}/filter.php?c=${encodeURIComponent(category)}`;
    } else {
      url = `${MEALDB_BASE}/search.php?s=`;
    }
    const response = await axios.get(url);
    const meals = response.data.meals || [];
    res.json({ success: true, count: meals.length, recipes: meals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${MEALDB_BASE}/lookup.php?i=${id}`;
    const response = await axios.get(url);
    const recipe = response.data.meals?.[0];
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const url = `${MEALDB_BASE}/filter.php?c=${encodeURIComponent(category)}`;
    const response = await axios.get(url);
    res.json({ success: true, recipes: response.data.meals || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const url = `${MEALDB_BASE}/categories.php`;
    const response = await axios.get(url);
    res.json({ success: true, categories: response.data.categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRandomRecipe = async (req, res) => {
  try {
    const url = `${MEALDB_BASE}/random.php`;
    const response = await axios.get(url);
    res.json({ success: true, recipe: response.data.meals[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchRecipes, getRecipeById, getByCategory, getCategories, getRandomRecipe };
