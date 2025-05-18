import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme, colors } = useTheme();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const isLoggedIn = !!localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header" style={{ 
      background: colors.headerBg,
      color: colors.headerText,
      boxShadow: colors.cardShadow
    }}>
      <div className="logo" style={{ color: colors.primary }}>Look @Me</div>
      <nav>
        <Link to="/" style={{ color: colors.headerText }}>Home</Link>
        <Link to="/products" style={{ color: colors.headerText }}>Shop</Link>
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="btn"
            style={{ 
              background: colors.error,
              color: colors.buttonText,
              border: 'none',
              padding: '0.4rem 1.1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: colors.headerText }}>Login</Link>
            <Link to="/register" className="btn" style={{ 
              background: colors.primary,
              color: colors.buttonText
            }}>Sign Up</Link>
          </>
        )}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.5rem',
            color: colors.headerText
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <Link to="/wishlist" className="cart-icon" style={{ position: "relative", color: colors.headerText }}>
          ❤️
          {wishlistCount > 0 && (
            <span style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: colors.accent,
              color: colors.buttonText,
              borderRadius: "50%",
              padding: "0.1rem 0.5rem",
              fontSize: "0.9rem"
            }}>
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link to="/cart" className="cart-icon" style={{ position: "relative", color: colors.headerText }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: colors.accent,
              color: colors.buttonText,
              borderRadius: "50%",
              padding: "0.1rem 0.5rem",
              fontSize: "0.9rem"
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header; 