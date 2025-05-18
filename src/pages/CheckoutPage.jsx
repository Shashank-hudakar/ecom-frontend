import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "card",
    upiId: ""
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to process the order
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 800, margin: "2rem auto", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button className="buy-btn" onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 className="section-title" style={{ margin: 0 }}>Checkout</h2>
        <button 
          className="buy-btn" 
          onClick={() => navigate("/products")}
          style={{ background: '#3a0ca3', color: '#fff' }}
        >
          Continue Shopping
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Order Summary */}
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
              <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ${item.price}</div>
              </div>
              <div style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "2px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: "1.2rem" }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Shipping & Payment Details</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Payment Method</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  Credit/Debit Card
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleChange}
                  />
                  UPI Payment
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Card Details - Only show if card payment is selected */}
            {formData.paymentMethod === "card" && (
              <>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required={formData.paymentMethod === "card"}
                    style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required={formData.paymentMethod === "card"}
                      style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required={formData.paymentMethod === "card"}
                      style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* UPI Details - Only show if UPI payment is selected */}
            {formData.paymentMethod === "upi" && (
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="example@upi"
                  value={formData.upiId}
                  onChange={handleChange}
                  required={formData.paymentMethod === "upi"}
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
                />
                <div style={{ 
                  marginTop: "0.5rem", 
                  padding: "1rem", 
                  background: "#f8f9fa", 
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  color: "#666"
                }}>
                  <p style={{ marginBottom: "0.5rem" }}>💡 Popular UPI Apps:</p>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <span>Google Pay</span>
                    <span>PhonePe</span>
                    <span>Paytm</span>
                    <span>Amazon Pay</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="buy-btn"
              style={{ marginTop: "1rem", background: "#2b9348", color: "#fff" }}
            >
              {formData.paymentMethod === "cod" 
                ? "Place Order (Cash on Delivery)" 
                : formData.paymentMethod === "upi"
                ? "Pay with UPI"
                : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 