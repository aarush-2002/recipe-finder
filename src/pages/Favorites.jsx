import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, removeFavorite, getRecipeById } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await getFavorites();
        setFavorites(res.data.favorites || []);
        
        const recipePromises = (res.data.favorites || []).map(id => getRecipeById(id).catch(() => null));
        const recipeResults = await Promise.all(recipePromises);
        setRecipes(recipeResults.filter(r => r?.data?.recipe).map(r => r.data.recipe));
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [user]);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await removeFavorite(recipeId);
      setFavorites(prev => prev.filter(id => id !== recipeId));
      setRecipes(prev => prev.filter(r => r.idMeal !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.authPrompt}>
          <h2 style={styles.title}>❤️ Your Favorites</h2>
          <p style={styles.message}>Please login to view your favorites</p>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❤️ Your Favorites</h1>
      
      {loading ? (
        <div style={styles.loading}>🍳 Loading favorites...</div>
      ) : recipes.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>No favorites yet!</p>
          <p style={styles.emptySubtext}>Start adding recipes to your favorites</p>
          <Link to="/search" style={styles.searchBtn}>🔍 Search Recipes</Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onFavorite={handleRemoveFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  title: { fontSize: '2rem', color: '#333', marginBottom: '30px', textAlign: 'center' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.2rem' },
  authPrompt: { textAlign: 'center', padding: '60px' },
  message: { color: '#666', marginBottom: '20px' },
  loginBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#FF6B35',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  empty: { textAlign: 'center', padding: '60px' },
  emptyText: { fontSize: '1.5rem', color: '#333', marginBottom: '10px' },
  emptySubtext: { color: '#666', marginBottom: '20px' },
  searchBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#FF6B35',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  }
};

export default Favorites;