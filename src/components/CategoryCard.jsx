import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/search?category=${category.strCategory}`)}
      style={styles.card}
    >
      <img 
        src={category.strCategoryThumb} 
        alt={category.strCategory}
        style={styles.image}
      />
      <p style={styles.name}>{category.strCategory}</p>
      <p style={styles.desc}>{category.strCategoryDescription?.substring(0, 60)}...</p>
    </div>
  );
};

const styles = {
  card: {
    textAlign: 'center',
    cursor: 'pointer',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s'
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '10px'
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '5px 0'
  },
  desc: {
    fontSize: '0.75rem',
    color: '#666',
    margin: 0
  }
};

export default CategoryCard;