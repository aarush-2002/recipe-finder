import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🍽 RecipeFinder
      </Link>
      
      <div style={styles.links}>
        <Link to="/search" style={styles.link}>
          🔍 Search
        </Link>
        
        {user ? (
          <>
            <Link to="/favorites" style={styles.link}>
              ❤️ Favorites
            </Link>
            <Link to="/shopping-list" style={styles.link}>
              🛒 List
            </Link>
            <Link to="/profile" style={styles.link}>
              👤 {user.name}
            </Link>
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnLink}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#FF6B35',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem'
  },
  btn: {
    backgroundColor: 'white',
    color: '#FF6B35',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  btnLink: {
    backgroundColor: 'white',
    color: '#FF6B35',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;