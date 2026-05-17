import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍽 Welcome Back!</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.btn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: { textAlign: 'center', color: '#333', marginBottom: '5px', fontSize: '1.8rem' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '30px' },
  error: {
    backgroundColor: '#FFE5E5',
    color: '#D32F2F',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    border: '2px solid #E0E0E0',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  },
  btn: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#FF6B35',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  footer: { textAlign: 'center', marginTop: '20px', color: '#666' },
  link: { color: '#FF6B35', fontWeight: 'bold', textDecoration: 'none' }
};

export default Login;