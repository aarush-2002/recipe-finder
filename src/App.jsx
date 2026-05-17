import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;