import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import IngredientInput from '../components/IngredientInput';
import FilterPanel from '../components/FilterPanel';
import { searchRecipes, getByCategory } from '../services/api';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({
    diet: 'Any',
    time: 'Any',
    difficulty: 'Any'
  });

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const queryParam = searchParams.get('q');
        const categoryParam = searchParams.get('category');
        
        let res;
        if (categoryParam) {
          res = await getByCategory(categoryParam);
        } else if (queryParam) {
          res = await searchRecipes(queryParam);
          setQuery(queryParam);
        } else {
          res = await searchRecipes('');
        }
        
        setRecipes(res.data.recipes || []);
      } catch (error) {
        console.error('Error searching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔍 Search Recipes</h1>
      
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type recipe name..."
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchBtn}>Search</button>
      </form>

      <div style={styles.ingredientSection}>
        <h3 style={styles.subtitle}>🥕 Search by Ingredients</h3>
        <IngredientInput 
          ingredients={ingredients} 
          onIngredientsChange={setIngredients} 
        />
      </div>

      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

      <div style={styles.results}>
        <h3 style={styles.subtitle}>
          📋 Results ({recipes.length} recipes found)
        </h3>
        
        {loading ? (
          <div style={styles.loading}>🍳 Searching...</div>
        ) : recipes.length === 0 ? (
          <div style={styles.empty}>No recipes found. Try different keywords!</div>
        ) : (
          <div style={styles.grid}>
            {recipes.map(recipe => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
  title: { fontSize: '2rem', color: '#333', marginBottom: '20px', textAlign: 'center' },
  searchForm: { display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto 30px' },
  searchInput: {
    flex: 1,
    padding: '15px 20px',
    borderRadius: '30px',
    border: '2px solid #E0E0E0',
    fontSize: '1rem',
    outline: 'none'
  },
  searchBtn: {
    padding: '15px 30px',
    backgroundColor: '#FF6B35',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  ingredientSection: { marginBottom: '20px' },
  subtitle: { fontSize: '1.2rem', color: '#333', marginBottom: '15px' },
  results: { marginTop: '30px' },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.2rem', color: '#666' },
  empty: { textAlign: 'center', padding: '60px', color: '#666' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  }
};

export default Search;