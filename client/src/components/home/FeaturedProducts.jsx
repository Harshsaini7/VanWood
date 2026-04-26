// ===========================
// Featured Products Section Component
// Displays a grid of 4 featured product cards with placeholder data.
// Each card has: image placeholder, name, price, discount badge,
// Add to Cart button, and wishlist heart icon.
// ===========================

import { useState } from "react";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";

// Placeholder product data — will be replaced with API data later
const featuredProducts = [
  {
    id: 1,
    name: "Royal Sheesham Dining Table",
    material: "Sheesham Wood",
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    rating: 4.8,
    reviewCount: 124,
    image: null, // Will use placeholder
  },
  {
    id: 2,
    name: "Carved Wooden Wall Mirror",
    material: "Mango Wood",
    price: 4999,
    originalPrice: 7499,
    discount: 33,
    rating: 4.6,
    reviewCount: 89,
    image: null,
  },
  {
    id: 3,
    name: "Antique Jewelry Box",
    material: "Rosewood",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.9,
    reviewCount: 203,
    image: null,
  },
  {
    id: 4,
    name: "Handcrafted Bookshelf",
    material: "Teak Wood",
    price: 18999,
    originalPrice: 25999,
    discount: 27,
    rating: 4.7,
    reviewCount: 67,
    image: null,
  },
];

const FeaturedProducts = () => {
  // Track which products have been wishlisted (local state for now)
  const [wishlisted, setWishlisted] = useState({});

  // Toggle wishlist state for a product
  const toggleWishlist = (productId) => {
    setWishlisted((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section className="bg-beige-light py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-4">
            ✨ Bestsellers
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-darkwood mb-4">
            Featured Collection
          </h2>
          <p className="text-primary/50 max-w-xl mx-auto">
            Our most loved pieces, handpicked for their craftsmanship, elegance,
            and timeless appeal.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Product Image Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-beige to-beige-light overflow-hidden">
                {/* Placeholder image — warm wood gradient with icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">🪵</div>
                </div>

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-primary text-cream text-xs font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    wishlisted[product.id]
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-darkwood hover:bg-white hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    size={16}
                    fill={wishlisted[product.id] ? "currentColor" : "none"}
                  />
                </button>

                {/* Hover overlay with quick Add to Cart */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-darkwood/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <button className="w-full bg-gold hover:bg-gold-light text-darkwood font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 text-sm transition-colors duration-300">
                    <FiShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Material Tag */}
                <span className="text-xs font-medium text-primary/60 bg-primary/8 px-2.5 py-1 rounded-full">
                  {product.material}
                </span>

                {/* Product Name */}
                <h3 className="font-heading text-lg font-semibold text-darkwood mt-2 mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {product.name}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={12}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-gold fill-gold"
                            : "text-beige"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-primary/50">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-darkwood">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-primary/40 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-primary hover:bg-primary hover:text-cream text-primary font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            View All Products
            <FiShoppingCart size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
