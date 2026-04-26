// ===========================
// Footer Component
// Site footer with logo, links, social icons, and copyright.
// Responsive grid layout — 4 columns on desktop, stacked on mobile.
// ===========================

import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-darkwood text-beige/80">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ===== Column 1 — Brand ===== */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-heading font-bold text-cream">
                Van<span className="text-gold">Wood</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-beige/60 mb-6">
              Premium handcrafted wooden furniture & home decor from the artisan
              capital of India — Saharanpur, Uttar Pradesh.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FiInstagram size={18} />, href: "#" },
                { icon: <FiFacebook size={18} />, href: "#" },
                { icon: <FiTwitter size={18} />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-beige/60 hover:text-gold hover:border-gold transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ===== Column 2 — Quick Links ===== */}
          <div>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-beige/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Column 3 — Customer Service ===== */}
          <div>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                "Shipping & Delivery",
                "Returns & Refunds",
                "FAQs",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-beige/60 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Column 4 — Contact ===== */}
          <div>
            <h4 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin size={16} className="text-gold mt-1 shrink-0" />
                <span className="text-sm text-beige/60">
                  Saharanpur, Uttar Pradesh, India — 247001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={16} className="text-gold shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-beige/60 hover:text-gold transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={16} className="text-gold shrink-0" />
                <a
                  href="mailto:hello@vanwood.in"
                  className="text-sm text-beige/60 hover:text-gold transition-colors"
                >
                  hello@vanwood.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-beige/40">
            © {new Date().getFullYear()} VanWood. All rights reserved.
          </p>
          <p className="text-xs text-beige/40">
            Handcrafted with ❤️ in Saharanpur, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
