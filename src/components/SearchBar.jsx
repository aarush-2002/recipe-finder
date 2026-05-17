import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ initialQuery = '', placeholder = 'Search recipes...' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        🔍
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  input: {
    flex: 1,
    padding: '15px 20px',
    borderRadius: '30px',
    border: '2px solid #E0E0E0',
    fontSize: '1rem',
    outline: 'none'
  },
  button: {
    padding: '15px 20px',
    backgroundColor: '#FF6B35',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2rem'
  }
};

export default SearchBar;