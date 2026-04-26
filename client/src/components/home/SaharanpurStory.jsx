// ===========================
// "Made in Saharanpur" Storytelling Section
// Two-column layout: image placeholder (left) + text content (right).
// Tells the story of Saharanpur's artisan heritage and craftsmanship.
// ===========================

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const SaharanpurStory = () => {
  return (
    <section className="bg-darkwood py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ===== Left — Image Placeholder ===== */}
          <div className="relative">
            {/* Main image placeholder */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary to-primary-dark">
              {/* Decorative content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-7xl mb-4 opacity-40">🪵</div>
                <p className="text-cream/30 text-sm font-medium uppercase tracking-widest">
                  Artisan at Work
                </p>
                <p className="text-cream/20 text-xs mt-2">
                  Saharanpur, Uttar Pradesh
                </p>
              </div>

              {/* Subtle grain overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.15)_0%,_transparent_60%)]" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-gold text-darkwood rounded-xl p-5 shadow-xl">
              <div className="text-3xl font-heading font-bold">200+</div>
              <div className="text-sm font-medium opacity-80">
                Years of Heritage
              </div>
            </div>
          </div>

          {/* ===== Right — Text Content ===== */}
          <div>
            {/* Section Badge */}
            <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-sm font-medium rounded-full mb-6">
              🏛️ Our Heritage
            </span>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-6">
              Made in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                Saharanpur
              </span>
            </h2>

            {/* Story Paragraph */}
            <p className="text-beige/60 leading-relaxed mb-5">
              Saharanpur, a city in Uttar Pradesh, has been the heart of Indian
              woodcraft for over 200 years. Our artisans carry forward a legacy
              of intricate carving and masterful joinery, transforming raw timber
              into works of art.
            </p>
            <p className="text-beige/60 leading-relaxed mb-8">
              Every VanWood product is a tribute to this rich heritage. From
              selecting the finest Sheesham and Teak wood to the final hand polish,
              each piece goes through the hands of skilled craftsmen who pour
              their heart and soul into every creation.
            </p>

            {/* Highlight Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🌳", text: "Sustainably Sourced Wood" },
                { icon: "🤲", text: "100% Handcrafted" },
                { icon: "🏆", text: "Quality Guaranteed" },
                { icon: "🚚", text: "Pan-India Delivery" },
              ].map((point) => (
                <div
                  key={point.text}
                  className="flex items-center gap-3 text-beige/70 text-sm"
                >
                  <span className="text-lg">{point.icon}</span>
                  {point.text}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-darkwood font-semibold px-7 py-3 rounded-full transition-all duration-300"
            >
              Meet the Artisans
              <FiArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaharanpurStory;
