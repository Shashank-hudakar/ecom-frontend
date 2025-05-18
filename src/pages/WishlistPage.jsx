import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    navigate('/cart');
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{
        background: "linear-gradient(135deg, #f72585 0%, #b5179e 100%)",
        borderRadius: "16px",
        padding: "2rem",
        marginBottom: "2rem",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(247, 37, 133, 0.15)"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: "bold"
        }}>My Wishlist</h1>
        <p style={{
          fontSize: "1.1rem",
          opacity: 0.9,
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          {wishlist.length === 0 
            ? "Your wishlist is empty. Start adding items you love!"
            : `You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} in your wishlist`}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 1rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>❤️</div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: "#666", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Save items you love to your wishlist and come back to them later.
          </p>
          <button 
            className="buy-btn"
            onClick={() => navigate('/products')}
            style={{ 
              padding: "1rem 2rem",
              fontSize: "1.1rem"
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {wishlist.map((item) => (
            <div key={item._id} style={{ 
              background: '#fff', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '1.2rem',
              position: 'relative',
              transition: 'transform 0.2s',
              display: 'flex',
              flexDirection: 'column',
              ':hover': {
                transform: 'translateY(-4px)'
              }
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '0.3rem',
                    color: '#333',
                    lineHeight: '1.3'
                  }}>{item.title}</h3>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.4'
                  }}>{item.description}</p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ 
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#2b9348'
                    }}>${item.price.toFixed(2)}</span>
                    {item.rating && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '0.2rem',
                        color: '#fbbf24',
                        fontSize: '0.9rem'
                      }}>
                        {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                        <span style={{ 
                          color: '#666',
                          marginLeft: '0.2rem'
                        }}>({item.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => removeFromWishlist(item._id)}
                  style={{ 
                    position: 'absolute',
                    top: '0.8rem',
                    right: '0.8rem',
                    background: '#dc2626',
                    border: 'none',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    zIndex: 1,
                    opacity: 0.9,
                    transition: 'opacity 0.2s, transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  🗑️ Remove
                </button>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '0.8rem',
                marginTop: 'auto'
              }}>
                <button 
                  className="buy-btn"
                  onClick={() => handleBuyNow(item)}
                  style={{ 
                    flex: 1,
                    padding: '0.7rem',
                    fontSize: '0.95rem',
                    background: '#2b9348',
                    borderRadius: '6px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#248a3d'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2b9348'}
                >
                  Buy Now
                </button>
                <button 
                  className="buy-btn"
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item._id);
                  }}
                  style={{ 
                    flex: 1,
                    padding: '0.7rem',
                    fontSize: '0.95rem',
                    background: '#4361ee',
                    borderRadius: '6px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#3a56d4'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#4361ee'}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 