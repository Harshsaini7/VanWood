// ===========================
// Home Page Component
// The landing page for VanWood — displays a "Coming Soon" hero section
// with a premium, modern design.
// ===========================

import { FiMapPin, FiHeart, FiShield } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">🪵 Handcrafted in Saharanpur</span>
          <h1 className="hero-title">
            Van<span className="highlight">Wood</span>
          </h1>
          <p className="hero-subtitle">
            Premium handcrafted wooden furniture & home decor from the artisan
            capital of India — Saharanpur, Uttar Pradesh.
          </p>
          <div className="hero-tag">✨ Coming Soon</div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="features">
        <div className="feature-card">
          <FiHeart className="feature-icon" />
          <h3>Handcrafted with Love</h3>
          <p>Every piece is carved by skilled artisans with generations of expertise.</p>
        </div>
        <div className="feature-card">
          <FiMapPin className="feature-icon" />
          <h3>Made in Saharanpur</h3>
          <p>Authentic woodwork from India's woodcraft capital, shipped nationwide.</p>
        </div>
        <div className="feature-card">
          <FiShield className="feature-icon" />
          <h3>Quality Guaranteed</h3>
          <p>Premium Sheesham & Mango wood with a quality assurance promise.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
