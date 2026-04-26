// ===========================
// Categories Section Component
// Displays 3 browse-by-category cards: Furniture, Home Decor, Handicrafts.
// Each card has an icon, hover scale effect, and gradient overlay.
// ===========================

import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

// Category data — each with an emoji icon, title, description, and gradient
const categories = [
  {
    id: 1,
    icon: "🪑",
    title: "Furniture",
    description:
      "Handcrafted tables, chairs, beds & shelves made from premium Sheesham and Mango wood.",
    gradient: "from-[#4A2612] to-[#2A1508]",
    link: "/products?category=furniture",
  },
  {
    id: 2,
    icon: "🏺",
    title: "Home Decor",
    description:
      "Elegant wall hangings, photo frames, mirrors & decorative pieces to beautify your space.",
    gradient: "from-[#3D2B1F] to-[#1F1610]",
    link: "/products?category=decor",
  },
  {
    id: 3,
    icon: "🎨",
    title: "Handicrafts",
    description:
      "Traditional carved artifacts, jewelry boxes & collectibles showcasing Saharanpur artistry.",
    gradient: "from-[#2E1E14] to-[#1A0D05]",
    link: "/products?category=handicrafts",
  },
];

const CategoriesSection = () => {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Collections
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-darkwood mb-4">
            Browse Categories
          </h2>
          <p className="text-primary/60 max-w-xl mx-auto">
            Explore our curated collections of authentic Saharanpur woodwork,
            crafted with love and precision.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card Background */}
              <div
                className={`bg-gradient-to-br ${category.gradient} p-8 sm:p-10 min-h-[260px] flex flex-col justify-between`}
              >
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-heading text-2xl font-bold text-cream mb-2">
                    {category.title}
                  </h3>
                  <p className="text-beige/50 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  {/* Arrow link */}
                  <div className="flex items-center gap-2 text-gold text-sm font-semibold">
                    Explore
                    <FiArrowRight
                      size={16}
                      className="transform group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
