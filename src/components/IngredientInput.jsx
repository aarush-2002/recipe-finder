import React, { useState } from 'react';

const IngredientInput = ({ ingredients, onIngredientsChange }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !ingredients.includes(input.trim())) {
      onIngredientsChange([...ingredients, input.trim()]);
      setInput('');
    }
  };

  const handleRemove = (ingredient) => {
    onIngredientsChange(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="+ Add ingredient..."
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addBtn}>Add</button>
      </div>
      
      {ingredients.length > 0 && (
        <div style={styles.tags}>
          {ingredients.map((ingredient, index) => (
            <span key={index} style={styles.tag}>
              {ingredient}
              <button 
                onClick={() => handleRemove(ingredient)}
                style={styles.removeBtn}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '10px',
    border: '2px solid #E0E0E0',
    fontSize: '1rem',
    outline: 'none'
  },
  addBtn: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFF0E8',
    color: '#FF6B35',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#FF6B35',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0',
    lineHeight: 1
  }
};

export default IngredientInput;