import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById, addToShoppingList } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToList, setAddingToList] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const res = await getRecipeById(id);
        setRecipe(res.data.recipe);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  const parseIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  const parseInstructions = () => {
    if (!recipe || !recipe.strInstructions) return [];
    return recipe.strInstructions
      .split(/\r?\n/)
      .filter(step => step.trim());
  };

  const handleAddToShoppingList = async () => {
    if (!user) {
      if (window.confirm('Please login to add items to your shopping list. Go to login?')) {
        navigate('/login');
      }
      return;
    }

    setAddingToList(true);
    try {
      const ingredients = parseIngredients().map(ing => ({
        name: ing.name,
        quantity: ing.measure
      }));
      await addToShoppingList(ingredients);
      alert('Ingredients added to shopping list!');
    } catch (error) {
      console.error('Error adding to shopping list:', error);
      alert('Failed to add to shopping list');
    } finally {
      setAddingToList(false);
    }
  };

  if (loading) return (
    <div style={styles.loading}>🍳 Loading recipe...</div>
  );

  if (!recipe) return (
    <div style={styles.error}>Recipe not found</div>
  );

  const ingredients = parseIngredients();
  const instructions = parseInstructions();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.imageContainer}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={styles.image} />
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>{recipe.strMeal}</h1>
        <div style={styles.tags}>
          <span style={styles.tag}>📂 {recipe.strCategory}</span>
          <span style={styles.tag}>🌍 {recipe.strArea}</span>
        </div>
      </div>

      {recipe.strYoutube && (
        <a 
          href={recipe.strYoutube} 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.youtubeBtn}
        >
          ▶ Watch on YouTube
        </a>
      )}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📝 Ingredients</h2>
        <ul style={styles.ingredientsList}>
          {ingredients.map((ing, index) => (
            <li key={index} style={styles.ingredientItem}>
              <span style={styles.checkbox}>☐</span>
              <span style={styles.ingredientName}>{ing.name}</span>
              <span style={styles.ingredientMeasure}>{ing.measure}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={handleAddToShoppingList}
          disabled={addingToList}
          style={styles.addBtn}
        >
          🛒 {addingToList ? 'Adding...' : 'Add to Shopping List'}
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>👩‍🍳 Instructions</h2>
        <ol style={styles.instructionsList}>
          {instructions.map((step, index) => (
            <li key={index} style={styles.instructionItem}>{step}</li>
          ))}
        </ol>
      </div>

      {recipe.strSource && (
        <a 
          href={recipe.strSource} 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.sourceLink}
        >
          📖 View Original Source
        </a>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  loading: { textAlign: 'center', padding: '100px', fontSize: '1.5rem' },
  error: { textAlign: 'center', padding: '100px', color: '#666' },
  backBtn: {
    padding: '10px 20px',
    backgroundColor: '#FFF',
    border: '2px solid #E0E0E0',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  imageContainer: { borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' },
  image: { width: '100%', height: '400px', objectFit: 'cover' },
  header: { textAlign: 'center', marginBottom: '20px' },
  title: { fontSize: '2rem', color: '#333', marginBottom: '10px' },
  tags: { display: 'flex', gap: '15px', justifyContent: 'center' },
  tag: {
    backgroundColor: '#FFF0E8',
    color: '#FF6B35',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold'
  },
  youtubeBtn: {
    display: 'block',
    width: 'fit-content',
    margin: '0 auto 30px',
    padding: '12px 24px',
    backgroundColor: '#FF0000',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  section: { marginBottom: '30px' },
  sectionTitle: { fontSize: '1.5rem', color: '#333', marginBottom: '15px', borderBottom: '2px solid #FF6B35', paddingBottom: '10px' },
  ingredientsList: { listStyle: 'none', padding: 0 },
  ingredientItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  checkbox: { marginRight: '15px', fontSize: '1.2rem' },
  ingredientName: { flex: 1, fontWeight: '500' },
  ingredientMeasure: { color: '#666' },
  instructionsList: { listStyle: 'none', padding: 0, counterReset: 'step' },
  instructionItem: {
    padding: '15px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    marginBottom: '10px',
    position: 'relative',
    paddingLeft: '50px'
  },
  addBtn: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px'
  },
  sourceLink: {
    display: 'block',
    width: 'fit-content',
    margin: '0 auto',
    padding: '12px 24px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none'
  }
};

export default RecipeDetail;