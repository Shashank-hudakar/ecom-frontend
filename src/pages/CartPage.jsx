import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const isUserLoggedIn = () => !!localStorage.getItem('user');

  const handleBuyNow = () => {
    if (cart.length === 0) return;
    if (!isUserLoggedIn()) {
      alert("Please log in to continue your purchase.");
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{
        background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
        borderRadius: "16px",
        padding: "2rem",
        marginBottom: "2rem",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(58, 12, 163, 0.15)"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: "bold"
        }}>Shopping Cart</h1>
        <p style={{
          fontSize: "1.1rem",
          opacity: 0.9,
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          {cart.length === 0 
            ? "Your cart is empty. Start shopping to add items!"
            : `You have ${cart.length} item${cart.length === 1 ? '' : 's'} in your cart`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 1rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "#666", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Looks like you haven't added any items to your cart yet.
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
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #eee", paddingBottom: 10 }}>
                <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain", marginRight: 20 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  <div>Price: ${item.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button className="buy-btn" style={{ padding: '0.2rem 0.7rem' }} onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>Quantity: {item.quantity}</span>
                    <button className="buy-btn" style={{ padding: '0.2rem 0.7rem' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="buy-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h3>
          <div style={{ textAlign: "right", display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="buy-btn" onClick={clearCart}>Clear Cart</button>
            <button className="buy-btn" style={{ background: '#2b9348', color: '#fff' }} onClick={handleBuyNow}>Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage; 