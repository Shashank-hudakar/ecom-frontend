import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const categoryStyles = {
  Electronics: { color: '#3a86ff', icon: '📱' },
  Fashion: { color: '#ffbe0b', icon: '👗' },
  Jewelry: { color: '#ff006e', icon: '💍' },
  Accessories: { color: '#8338ec', icon: '👜' },
  Default: { color: '#adb5bd', icon: '🛒' },
};

const ProductCard = ({ id, title, description = '', price, image, category }) => {
  const navigate = useNavigate();
  const cat = categoryStyles[category] || categoryStyles['Default'];
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item._id === id);

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ _id: id, title, price, image, category, description });
    }
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        border: `2.5px solid ${cat.color}`,
        position: 'relative',
        boxShadow: `0 2px 12px 0 ${cat.color}22`,
      }}
    >
      {/* Category Icon */}
      <span
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          fontSize: 24,
          background: '#fff',
          borderRadius: '50%',
          padding: '0.2rem 0.5rem',
          border: `1.5px solid ${cat.color}`,
          zIndex: 2,
        }}
        title={category || 'Category'}
      >
        {cat.icon}
      </span>
      <button 
        className="wishlist" 
        title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleWishlistClick}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          color: isInWishlist ? '#ff006e' : '#666',
          padding: '0.5rem',
          zIndex: 2,
          transition: 'transform 0.2s, color 0.2s',
          ':hover': {
            transform: 'scale(1.1)',
            color: '#ff006e'
          }
        }}
      >
        {isInWishlist ? '❤️' : '♡'}
      </button>
      <img
        src={image}
        alt={title || 'Product image'}
        className="product-img"
      />
      <h3>{title}</h3>
      <div className="desc">{description.length > 60 ? description.substring(0, 60) + '...' : description}</div>
      <div className="price">${price}</div>
      <button
        className="buy-btn"
        onClick={e => {
          e.stopPropagation();
          addToCart({ id, title, price, image, category });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
