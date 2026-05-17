import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import CategoryCard from '../components/CategoryCard';
import { searchRecipes, getCategories, getByCategory } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recipesRes, categoriesRes] = await Promise.all([
          searchRecipes('chicken'),
          getCategories()
        ]);
        setRecipes(recipesRes.data.recipes || []);
        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) return (
    <div style={styles.loading}>
      🍳 Loading delicious recipes...
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Find Your Perfect Recipe! 🍽
        </h1>
        <p style={styles.heroSubtitle}>
          Discover thousands of recipes for every occasion
        </p>
        
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="🔍 Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📌 Browse Categories</h2>
        <div style={styles.categoriesGrid}>
          {categories.slice(0, 8).map(cat => (
            <CategoryCard key={cat.idCategory} category={cat} />
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔥 Popular Recipes</h2>
        <div style={styles.recipesGrid}>
          {recipes.slice(0, 8).map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  loading: { textAlign: 'center', padding: '100px', fontSize: '1.5rem' },
  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
    color: 'white',
    borderRadius: '0 0 30px 30px',
    marginBottom: '40px'
  },
  heroTitle: { fontSize: '2.5rem', marginBottom: '10px' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 },
  searchForm: { display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '10px' },
  searchInput: {
    flex: 1,
    padding: '15px 20px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    outline: 'none'
  },
  searchBtn: {
    padding: '15px 30px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  section: { marginBottom: '50px' },
  sectionTitle: { fontSize: '1.5rem', color: '#333', marginBottom: '20px' },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px'
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  }
};

export default Home;