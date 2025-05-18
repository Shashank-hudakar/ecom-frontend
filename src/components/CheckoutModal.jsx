import React, { useState } from "react";

const CheckoutModal = ({ open, onClose, onSuccess }) => {
  const [details, setDetails] = useState({ name: "", address: "", card: "" });

  if (!open) return null;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff", borderRadius: 12, padding: "2rem", minWidth: 320, boxShadow: "0 4px 24px #0002"
      }}>
        <h2>Checkout</h2>
        <input name="name" placeholder="Full Name" value={details.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 8 }} />
        <input name="address" placeholder="Shipping Address" value={details.address} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 8 }} />
        <input name="card" placeholder="Card Number" value={details.card} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 8 }} />
        <button className="buy-btn" type="submit" style={{ width: "100%" }}>Place Order</button>
        <button type="button" onClick={onClose} style={{ marginTop: 10, width: "100%" }}>Cancel</button>
      </form>
    </div>
  );
};

export default CheckoutModal; 