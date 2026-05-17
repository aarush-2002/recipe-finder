import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>🍽 RecipeFinder</h3>
          <p style={styles.text}>Your personal recipe companion</p>
        </div>
        
        <div style={styles.section}>
          <h4 style={styles.subtitle}>Quick Links</h4>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/search" style={styles.link}>Search</Link>
          <Link to="/favorites" style={styles.link}>Favorites</Link>
          <Link to="/shopping-list" style={styles.link}>Shopping List</Link>
        </div>
        
        <div style={styles.section}>
          <h4 style={styles.subtitle}>API</h4>
          <p style={styles.text}>Powered by TheMealDB</p>
          <a href="https://www.themealdb.com/api.php" target="_blank" rel="noopener noreferrer" style={styles.link}>
            Free Recipe API
          </a>
        </div>
      </div>
      
      <div style={styles.bottom}>
        <p style={styles.copyright}>© 2024 RecipeFinder. Built with ❤️</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    marginTop: '60px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  title: {
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '5px'
  },
  subtitle: {
    fontSize: '1.1rem',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '5px'
  },
  text: {
    color: '#CCC',
    margin: '5px 0'
  },
  link: {
    color: '#FFF',
    textDecoration: 'none',
    margin: '5px 0'
  },
  bottom: {
    borderTop: '1px solid #444',
    padding: '20px',
    textAlign: 'center'
  },
  copyright: {
    color: '#CCC',
    margin: 0
  }
};

export default Footer;