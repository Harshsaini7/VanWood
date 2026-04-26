// ===========================
// Hero Section Component
// Full-screen hero with dark wood gradient background,
// headline, subtext, and two CTA buttons.
// ===========================

import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ===== Background — dark wood gradient ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkwood via-[#2A1508] to-[#1A0D05]" />

      {/* Decorative radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="animate-fadeUp">
          <span className="inline-block px-5 py-2 bg-gold/10 border border-gold/25 rounded-full text-gold text-sm font-medium tracking-wide mb-8">
            🪵 Handcrafted in Saharanpur
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6 animate-fadeUp-delay-1 opacity-0">
          Handcrafted in Saharanpur,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Delivered to Your Home
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-beige/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fadeUp-delay-2 opacity-0">
          Discover exquisite wooden furniture and home decor, handcrafted by
          skilled artisans with generations of expertise from India&apos;s
          woodcraft capital.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp-delay-3 opacity-0">
          {/* Primary CTA — Shop Now */}
          <Link
            to="/products"
            className="group bg-gold hover:bg-gold-light text-darkwood font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 text-sm sm:text-base"
          >
            <FiShoppingBag size={18} />
            Shop Now
            <FiArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>

          {/* Secondary CTA — Explore Collection */}
          <Link
            to="/products"
            className="group border-2 border-beige/30 hover:border-gold text-cream hover:text-gold font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 text-sm sm:text-base"
          >
            Explore Collection
            <FiArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fadeUp-delay-3 opacity-0">
          {[
            { number: "500+", label: "Products" },
            { number: "200+", label: "Artisans" },
            { number: "10K+", label: "Happy Customers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold font-heading">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-beige/50 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-beige/30 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
