import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post('/auth/register', data);

export const loginUser = (data) => API.post('/auth/login', data);

export const getCurrentUser = () => API.get('/auth/me');

export const searchRecipes = (query) => API.get(`/recipes/search?query=${encodeURIComponent(query)}`);

export const getRecipeById = (id) => API.get(`/recipes/${id}`);

export const getCategories = () => API.get('/recipes/categories');

export const getByCategory = (category) => API.get(`/recipes/category/${encodeURIComponent(category)}`);

export const getRandomRecipe = () => API.get('/recipes/random');

export const getFavorites = () => API.get('/user/favorites');

export const addFavorite = (recipeId) => API.post('/user/favorites', { recipeId });

export const removeFavorite = (recipeId) => API.delete(`/user/favorites/${recipeId}`);

export const getShoppingList = () => API.get('/user/shopping-list');

export const addToShoppingList = (items) => API.post('/user/shopping-list', { items });

export const togglePurchased = (itemId) => API.put(`/user/shopping-list/${itemId}`);

export const clearShoppingList = () => API.delete('/user/shopping-list');

export default API;