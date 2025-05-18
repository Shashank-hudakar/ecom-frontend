import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeContext";
import LoadingPage from '../components/LoadingPage';

const categories = [
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👗" },
  { name: "Jewelry", icon: "💍" },
  { name: "Accessories", icon: "👜" },
];

const testimonials = [
  {
    name: "Alice Smith",
    text: "ShopMate made my shopping experience so easy and fun! Fast delivery and great products.",
  },
  {
    name: "John Doe",
    text: "Excellent customer service and amazing deals. Highly recommended!",
  },
  {
    name: "Priya Patel",
    text: "I love the variety and quality. Will definitely shop again!",
  },
];

const benefits = [
  { icon: "🚚", text: "Free & Fast Shipping" },
  { icon: "🔄", text: "Easy Returns & Exchanges" },
  { icon: "💳", text: "Secure Payments" },
  { icon: "📞", text: "24/7 Customer Support" },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme, toggleTheme, colors } = useTheme();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (isMounted) setProducts(data.slice(0, 4)); // Show only 4 featured products
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
    // Ensure loading page is shown for at least 15s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // If products are loaded and 0.5s passed, hide loading
    if (products.length > 0 && loading) {
      setLoading(false);
    }
  }, [products]);

  // Custom Hero with Shop Now button and theme toggle
  const HeroSection = () => (
    <section className="hero" style={{ position: 'relative' }}>
      <div className="hero-content">
        <button 
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#fff',
            zIndex: 2,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <h1>Discover the Best Deals</h1>
        <p>Shop the latest trends at unbeatable prices.</p>
        <button className="shop-btn" onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    </section>
  );

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="home-page">
          <HeroSection />
          <section style={{ margin: "2rem 0" }}>
            <h2 className="section-title">Featured Products</h2>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
            {/* Extra prominent Shop Now button below featured products */}
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <button className="shop-btn" style={{ fontSize: '1.2rem', padding: '0.8rem 2.5rem' }} onClick={() => navigate("/products")}>Shop Now</button>
            </div>
          </section>

          {/* Categories Section */}
          <section style={{ margin: "3rem 0" }}>
            <h2 className="section-title">Shop by Category</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <div key={cat.name} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem 2.5rem', textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontWeight: 600 }}>{cat.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Shop With Us Section */}
          <section style={{ margin: "3rem 0" }}>
            <h2 className="section-title">Why Shop With Us?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {benefits.map((b, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem 2.5rem', textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontWeight: 600 }}>{b.text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section style={{ margin: "3rem 0" }}>
            <h2 className="section-title">What Our Customers Say</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {testimonials.map((t, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem 2.5rem', minWidth: 220, maxWidth: 320 }}>
                  <div style={{ fontStyle: 'italic', marginBottom: 10 }}>&ldquo;{t.text}&rdquo;</div>
                  <div style={{ fontWeight: 600, color: '#3a0ca3' }}>{t.name}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default HomePage; 