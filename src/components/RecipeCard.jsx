import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, onFavorite, isFavorite }) => {
  return (
    <div style={styles.card}>
      <Link to={`/recipe/${recipe.idMeal}`} style={styles.link}>
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          style={styles.image}
        />
        <div style={styles.content}>
          <h3 style={styles.title}>{recipe.strMeal}</h3>
          <div style={styles.tags}>
            <span style={styles.tag}>{recipe.strCategory}</span>
            <span style={styles.tag}>{recipe.strArea}</span>
          </div>
        </div>
      </Link>
      {onFavorite && (
        <button 
          onClick={() => onFavorite(recipe.idMeal)}
          style={{
            ...styles.favoriteBtn,
            backgroundColor: isFavorite ? '#FF6B35' : '#FFF0E8'
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '15px'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1rem',
    color: '#333'
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#FFF0E8',
    color: '#FF6B35',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  favoriteBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  }
};

export default RecipeCard;