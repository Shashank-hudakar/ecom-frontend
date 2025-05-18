import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer-col">
      <h4>ShopMate</h4>
      <p>We provide the best products at unbeatable prices with excellent customer service.</p>
    </div>
    <div className="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><Link to="/products">Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Customer Service</h4>
      <ul>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/returns">Returns & Exchanges</Link></li>
        <li><Link to="/shipping">Shipping Policy</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Contact Us</h4>
      <ul>
        <li>Email: support@shopmate.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Address: 123 E-Commerce St, Shopping Mall, SM 12345</li>
      </ul>
    </div>
    <div className="footer-bottom">
      © 2025 ShopMate. All rights reserved.
    </div>
  </footer>
);

export default Footer; 