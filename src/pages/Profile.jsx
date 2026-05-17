import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.authPrompt}>
          <h2 style={styles.title}>👤 Profile</h2>
          <p style={styles.message}>Please login to view your profile</p>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statValue}>
              {user.favorites?.length || 0}
            </span>
            <span style={styles.statLabel}>Favorites</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>
              {user.dietaryPreference || 'None'}
            </span>
            <span style={styles.statLabel}>Diet</span>
          </div>
        </div>

        <div style={styles.actions}>
          <Link to="/favorites" style={styles.actionBtn}>
            ❤️ View Favorites
          </Link>
          <Link to="/shopping-list" style={styles.actionBtn}>
            🛒 Shopping List
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.quickLinks}>
        <h3 style={styles.sectionTitle}>Quick Links</h3>
        <div style={styles.linksGrid}>
          <Link to="/" style={styles.linkCard}>
            🏠 Home
          </Link>
          <Link to="/search" style={styles.linkCard}>
            🔍 Search Recipes
          </Link>
          <Link to="/favorites" style={styles.linkCard}>
            ❤️ My Favorites
          </Link>
          <Link to="/shopping-list" style={styles.linkCard}>
            🛒 Shopping List
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#FF6B35',
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  name: { fontSize: '1.8rem', color: '#333', marginBottom: '5px' },
  email: { color: '#666', marginBottom: '20px' },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px',
    padding: '20px 0',
    borderTop: '1px solid #EEE',
    borderBottom: '1px solid #EEE'
  },
  stat: { textAlign: 'center' },
  statValue: { display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B35' },
  statLabel: { color: '#666', fontSize: '0.9rem' },
  actions: { display: 'flex', flexDirection: 'column', gap: '10px' },
  actionBtn: {
    display: 'block',
    padding: '12px',
    backgroundColor: '#FFF0E8',
    color: '#FF6B35',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logoutBtn: {
    padding: '12px',
    backgroundColor: '#FFF',
    border: '2px solid #FF5252',
    color: '#FF5252',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  quickLinks: { marginTop: '20px' },
  sectionTitle: { fontSize: '1.3rem', color: '#333', marginBottom: '15px' },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '15px'
  },
  linkCard: {
    display: 'block',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    fontWeight: '500'
  },
  authPrompt: { textAlign: 'center', padding: '60px' },
  title: { fontSize: '2rem', color: '#333', marginBottom: '10px' },
  message: { color: '#666', marginBottom: '20px' },
  loginBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#FF6B35',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Profile;