// ===========================
// Product Detail Page (/products/:id)
// Full product detail view with image gallery, zoom,
// product info, tabs, and related products.
// ===========================

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMinus,
  FiPlus,
  FiChevronRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiPackage,
  FiArrowLeft,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/products/ProductCard";
import products, { sampleReviews } from "../data/productData";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef(null);

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  // Get related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    setSelectedImage(0);
    setQuantity(1);
    setActiveTab("description");
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ─── Image Zoom Handler ────────────────────────
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  // ─── Handlers ──────────────────────────────────
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQty = () => {
    if (product && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  // Stock status display
  const getStockStatus = () => {
    if (!product) return null;
    if (product.stock === 0) {
      return (
        <span className="text-red-500 font-semibold text-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Out of Stock
        </span>
      );
    }
    if (product.stock <= 5) {
      return (
        <span className="text-orange-500 font-semibold text-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Only {product.stock} left in stock
        </span>
      );
    }
    return (
      <span className="text-green-600 font-semibold text-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        In Stock
      </span>
    );
  };

  // Tab data
  const tabs = [
    { id: "description", label: "Description" },
    { id: "materials", label: "Materials & Care" },
    { id: "dimensions", label: "Dimensions" },
    { id: "reviews", label: `Reviews (${product?.reviewCount || 0})` },
  ];

  // ─── Loading State ─────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image skeleton */}
            <div>
              <div className="aspect-square bg-beige rounded-2xl skeleton-shimmer animate-shimmer" />
              <div className="flex gap-3 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-beige rounded-xl skeleton-shimmer animate-shimmer"
                  />
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-24 bg-beige rounded-full" />
              <div className="h-8 w-3/4 bg-beige rounded" />
              <div className="h-4 w-40 bg-beige/60 rounded" />
              <div className="h-10 w-48 bg-beige rounded mt-4" />
              <div className="h-4 w-32 bg-beige/60 rounded" />
              <div className="h-12 w-full bg-beige rounded-full mt-6" />
              <div className="h-12 w-full bg-beige/60 rounded-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── 404 State ─────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <FiPackage size={60} className="text-primary/20 mb-6" />
          <h2 className="font-heading text-3xl font-bold text-darkwood mb-3">
            Product Not Found
          </h2>
          <p className="text-primary/50 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-primary-dark text-cream font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <FiArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Placeholder image colors for thumbnails
  const imageColors = [
    "from-beige to-beige-light",
    "from-primary/10 to-beige",
    "from-gold/10 to-beige-light",
    "from-primary/5 to-gold/5",
  ];

  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* ─── Breadcrumb ───────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-primary/50 mb-8 pt-4">
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <FiChevronRight size={12} />
          <Link
            to="/products"
            className="hover:text-primary transition-colors duration-200"
          >
            Products
          </Link>
          <FiChevronRight size={12} />
          <span className="text-darkwood font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* ─── Product Main Section ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ─── LEFT: Image Gallery ────────────────── */}
          <div>
            {/* Main Image with Zoom */}
            <div
              ref={imageRef}
              className="relative aspect-square bg-gradient-to-br rounded-2xl overflow-hidden cursor-zoom-in shadow-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${imageColors[selectedImage]} flex items-center justify-center transition-transform duration-200`}
                style={zoomStyle}
              >
                <div className="text-8xl opacity-30">🪵</div>
              </div>

              {/* Discount badge */}
              <span className="absolute top-4 left-4 bg-primary text-cream text-sm font-bold px-4 py-1.5 rounded-full z-10">
                {product.discount}% OFF
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-gold ring-offset-2 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${imageColors[index]} flex items-center justify-center`}
                  >
                    <div className="text-2xl opacity-40">🪵</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Product Info ────────────────── */}
          <div>
            {/* Material Tag */}
            <span className="inline-block text-xs font-medium text-primary/60 bg-primary/8 px-3 py-1.5 rounded-full mb-3">
              {product.material}
            </span>

            {/* Product Name */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-darkwood mb-3">
              {product.name}
            </h1>

            {/* Rating Summary */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-beige"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-primary/60">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-darkwood">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-lg text-primary/40 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                Save ₹
                {(product.originalPrice - product.price).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">{getStockStatus()}</div>

            {/* Divider */}
            <div className="border-t border-primary/10 my-6" />

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-darkwood mb-2 block">
                Quantity
              </label>
              <div className="inline-flex items-center bg-white rounded-full border border-primary/15 overflow-hidden">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className={`w-11 h-11 flex items-center justify-center transition-colors duration-200 ${
                    quantity <= 1
                      ? "text-primary/20 cursor-not-allowed"
                      : "text-primary/60 hover:text-darkwood hover:bg-beige/50"
                  }`}
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-darkwood text-sm">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={quantity >= product.stock}
                  className={`w-11 h-11 flex items-center justify-center transition-colors duration-200 ${
                    quantity >= product.stock
                      ? "text-primary/20 cursor-not-allowed"
                      : "text-primary/60 hover:text-darkwood hover:bg-beige/50"
                  }`}
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  product.stock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : addedToCart
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                    : "bg-gold hover:bg-gold-light text-darkwood shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
                }`}
              >
                <FiShoppingCart size={18} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`px-8 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 border-2 ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-primary/20 hover:border-primary text-primary/70 hover:text-primary"
                }`}
              >
                <FiHeart
                  size={18}
                  fill={wishlisted ? "currentColor" : "none"}
                />
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-primary/5">
              <div className="text-center">
                <FiTruck
                  size={20}
                  className="mx-auto text-gold mb-1.5"
                />
                <span className="text-xs text-primary/60 leading-tight block">
                  Free Shipping
                </span>
              </div>
              <div className="text-center border-x border-primary/10">
                <FiShield
                  size={20}
                  className="mx-auto text-gold mb-1.5"
                />
                <span className="text-xs text-primary/60 leading-tight block">
                  2 Year Warranty
                </span>
              </div>
              <div className="text-center">
                <FiRefreshCw
                  size={20}
                  className="mx-auto text-gold mb-1.5"
                />
                <span className="text-xs text-primary/60 leading-tight block">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Tabbed Content Section ───────────────── */}
        <div className="mt-16">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto border-b border-primary/10 mb-8 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "border-gold text-darkwood"
                    : "border-transparent text-primary/40 hover:text-primary/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm animate-fadeIn">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-darkwood mb-4">
                  About This Product
                </h3>
                <p className="text-primary/70 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Every piece from VanWood is handcrafted by master artisans in
                  Saharanpur, a city renowned for its 400-year-old tradition of
                  wood carving. The natural grain patterns of {product.material}{" "}
                  ensure that no two pieces are exactly alike, making each item a
                  unique work of art.
                </p>
              </div>
            )}

            {/* Materials & Care Tab */}
            {activeTab === "materials" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-darkwood mb-4">
                  Materials & Care
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-darkwood mb-2">
                      Material
                    </h4>
                    <p className="text-primary/70 text-sm mb-4">
                      {product.material} — sourced from sustainable plantations
                      and seasoned for 6 months before crafting.
                    </p>
                    <h4 className="text-sm font-semibold text-darkwood mb-2">
                      Finish
                    </h4>
                    <p className="text-primary/70 text-sm">
                      Hand-rubbed natural polish with a protective lacquer
                      coating for lasting durability and sheen.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-darkwood mb-2">
                      Care Instructions
                    </h4>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      {product.careInstructions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dimensions Tab */}
            {activeTab === "dimensions" && (
              <div>
                <h3 className="font-heading text-xl font-bold text-darkwood mb-4">
                  Dimensions & Weight
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full max-w-lg">
                    <tbody>
                      <tr className="border-b border-primary/5">
                        <td className="py-3 text-sm font-medium text-primary/50 w-36">
                          Length
                        </td>
                        <td className="py-3 text-sm text-darkwood font-medium">
                          {product.dimensions.length}
                        </td>
                      </tr>
                      <tr className="border-b border-primary/5">
                        <td className="py-3 text-sm font-medium text-primary/50">
                          Width
                        </td>
                        <td className="py-3 text-sm text-darkwood font-medium">
                          {product.dimensions.width}
                        </td>
                      </tr>
                      <tr className="border-b border-primary/5">
                        <td className="py-3 text-sm font-medium text-primary/50">
                          Height
                        </td>
                        <td className="py-3 text-sm text-darkwood font-medium">
                          {product.dimensions.height}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium text-primary/50">
                          Weight
                        </td>
                        <td className="py-3 text-sm text-darkwood font-medium">
                          {product.weight} kg
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-darkwood">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-gold fill-gold"
                              : "text-beige"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-darkwood">
                      {product.rating}
                    </span>
                    <span className="text-sm text-primary/40">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-primary/5 pb-6 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-cream font-bold text-sm">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-darkwood">
                              {review.userName}
                            </p>
                            <p className="text-xs text-primary/40">
                              {new Date(review.date).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        {/* Stars */}
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "text-gold fill-gold"
                                  : "text-beige"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-darkwood mb-1">
                        {review.title}
                      </h4>
                      <p className="text-sm text-primary/60 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Related Products ─────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-darkwood">
                You May Also Like
              </h2>
              <Link
                to="/products"
                className="text-sm font-medium text-primary/50 hover:text-gold transition-colors duration-300 flex items-center gap-1"
              >
                View All <FiChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
