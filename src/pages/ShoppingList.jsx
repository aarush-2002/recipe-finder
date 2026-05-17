import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShoppingList, togglePurchased, clearShoppingList } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ShoppingList = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadList = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await getShoppingList();
        setItems(res.data.shoppingList?.items || []);
      } catch (error) {
        console.error('Error loading shopping list:', error);
      } finally {
        setLoading(false);
      }
    };
    loadList();
  }, [user]);

  const handleToggle = async (itemId) => {
    try {
      const res = await togglePurchased(itemId);
      setItems(res.data.shoppingList?.items || []);
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('Clear all items from shopping list?')) return;
    
    try {
      await clearShoppingList();
      setItems([]);
    } catch (error) {
      console.error('Error clearing list:', error);
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.authPrompt}>
          <h2 style={styles.title}>🛒 Shopping List</h2>
          <p style={styles.message}>Please login to view your shopping list</p>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Shopping List</h1>
        {items.length > 0 && (
          <button onClick={handleClear} style={styles.clearBtn}>
            🗑 Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div style={styles.loading}>🍳 Loading...</div>
      ) : items.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>Your shopping list is empty!</p>
          <p style={styles.emptySubtext}>Add ingredients from recipe pages</p>
          <Link to="/search" style={styles.searchBtn}>🔍 Browse Recipes</Link>
        </div>
      ) : (
        <div style={styles.list}>
          {items.map(item => (
            <div 
              key={item._id} 
              style={{
                ...styles.item,
                backgroundColor: item.isPurchased ? '#E8F5E9' : '#FFF'
              }}
              onClick={() => handleToggle(item._id)}
            >
              <span style={{
                ...styles.checkbox,
                color: item.isPurchased ? '#4CAF50' : '#CCC'
              }}>
                {item.isPurchased ? '☑' : '☐'}
              </span>
              <span style={{
                ...styles.itemName,
                textDecoration: item.isPurchased ? 'line-through' : 'none',
                color: item.isPurchased ? '#888' : '#333'
              }}>
                {item.name}
              </span>
              <span style={styles.itemQuantity}>{item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: { fontSize: '2rem', color: '#333' },
  clearBtn: {
    padding: '10px 20px',
    backgroundColor: '#FFF',
    border: '2px solid #FF5252',
    color: '#FF5252',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  loading: { textAlign: 'center', padding: '60px', fontSize: '1.2rem' },
  authPrompt: { textAlign: 'center', padding: '60px' },
  message: { color: '#666', marginBottom: '20px' },
  loginBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#FF6B35',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  empty: { textAlign: 'center', padding: '60px' },
  emptyText: { fontSize: '1.5rem', color: '#333', marginBottom: '10px' },
  emptySubtext: { color: '#666', marginBottom: '20px' },
  searchBtn: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#FF6B35',
    color: 'white',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  list: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #EEE',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  checkbox: { fontSize: '1.5rem', marginRight: '15px' },
  itemName: { flex: 1, fontSize: '1.1rem' },
  itemQuantity: { color: '#666', fontSize: '0.9rem' }
};

export default ShoppingList;