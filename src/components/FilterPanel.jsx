import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const diets = ['Any', 'Vegan', 'Vegetarian', 'Keto', 'Gluten Free'];
  const times = ['Any', '< 15 min', '< 30 min', '< 1 hour'];
  const difficulties = ['Any', 'Easy', 'Medium', 'Hard'];

  return (
    <div style={styles.container}>
      <div style={styles.filterGroup}>
        <label style={styles.label}>Diet:</label>
        <div style={styles.options}>
          {diets.map(diet => (
            <button
              key={diet}
              onClick={() => onFilterChange('diet', diet)}
              style={{
                ...styles.option,
                backgroundColor: filters.diet === diet ? '#FF6B35' : '#FFF',
                color: filters.diet === diet ? '#FFF' : '#333'
              }}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Time:</label>
        <div style={styles.options}>
          {times.map(time => (
            <button
              key={time}
              onClick={() => onFilterChange('time', time)}
              style={{
                ...styles.option,
                backgroundColor: filters.time === time ? '#FF6B35' : '#FFF',
                color: filters.time === time ? '#FFF' : '#333'
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Difficulty:</label>
        <div style={styles.options}>
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => onFilterChange('difficulty', diff)}
              style={{
                ...styles.option,
                backgroundColor: filters.difficulty === diff ? '#FF6B35' : '#FFF',
                color: filters.difficulty === diff ? '#FFF' : '#333'
              }}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
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
  filterGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333'
  },
  options: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  option: {
    padding: '8px 16px',
    border: '2px solid #E0E0E0',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
  }
};

export default FilterPanel;