// ===========================
// Navbar Component
// Sticky navigation bar with logo, links, cart, and auth buttons.
// Includes mobile hamburger menu with slide-in drawer.
// ===========================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiHeart,
} from "react-icons/fi";

const Navbar = () => {
  // Track mobile menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position for sticky navbar background
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-darkwood/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-heading font-bold text-cream">
              Van
              <span className="text-gold transition-colors duration-300 group-hover:text-gold-light">
                Wood
              </span>
            </span>
          </Link>

          {/* ===== Desktop Navigation Links ===== */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-beige/80 hover:text-gold font-medium text-sm tracking-wide transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ===== Desktop Right Actions ===== */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="text-beige/70 hover:text-gold transition-colors duration-300 p-2"
            >
              <FiHeart size={20} />
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative text-beige/70 hover:text-gold transition-colors duration-300 p-2"
            >
              <FiShoppingCart size={20} />
              {/* Item count badge — hardcoded for now */}
              <span className="absolute -top-1 -right-1 bg-gold text-darkwood text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Login Button */}
            <Link
              to="/login"
              className="text-beige/80 hover:text-cream font-medium text-sm transition-colors duration-300 flex items-center gap-1"
            >
              <FiUser size={16} />
              Login
            </Link>

            {/* Sign Up Button */}
            <Link
              to="/register"
              className="bg-gold hover:bg-gold-light text-darkwood font-semibold text-sm px-5 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Sign Up
            </Link>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-cream p-2 hover:text-gold transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ===== Mobile Slide-in Drawer ===== */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-darkwood z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-primary/30">
          <span className="text-xl font-heading font-bold text-cream">
            Van<span className="text-gold">Wood</span>
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-beige/70 hover:text-cream transition-colors"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col p-5 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-beige/80 hover:text-gold hover:bg-primary/20 font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Drawer Actions */}
        <div className="p-5 border-t border-primary/30 flex flex-col gap-3">
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 text-beige/80 hover:text-gold py-2 px-4 transition-colors"
          >
            <FiShoppingCart size={18} />
            Cart (0)
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 text-beige/80 hover:text-gold py-2 px-4 transition-colors"
          >
            <FiHeart size={18} />
            Wishlist
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-center text-beige border border-beige/30 hover:border-gold hover:text-gold font-medium py-2.5 rounded-full transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="text-center bg-gold hover:bg-gold-light text-darkwood font-semibold py-2.5 rounded-full transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
