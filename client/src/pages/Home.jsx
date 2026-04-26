// ===========================
// Home Page Component
// The main landing page for VanWood.
// Composes all homepage sections: Hero, Categories, Featured Products,
// Saharanpur Story, Testimonials — all wrapped with Navbar and Footer.
// ===========================

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import SaharanpurStory from "../components/home/SaharanpurStory";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Sticky navigation bar */}
      <Navbar />

      {/* Hero — full-screen with dark wood gradient and CTA buttons */}
      <HeroSection />

      {/* Browse by category — Furniture, Home Decor, Handicrafts */}
      <CategoriesSection />

      {/* Featured product cards — 4 bestsellers */}
      <FeaturedProducts />

      {/* Saharanpur heritage storytelling section */}
      <SaharanpurStory />

      {/* Customer testimonials and reviews */}
      <Testimonials />

      {/* Site footer with links, social icons, copyright */}
      <Footer />
    </div>
  );
};

export default Home;
