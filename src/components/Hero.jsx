import React from "react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Discover the Best Deals</h1>
      <p>Shop the latest trends at unbeatable prices.</p>
      <Link to="/products" className="shop-btn">Shop Now</Link>
    </div>
  </section>
);

export default Hero; 