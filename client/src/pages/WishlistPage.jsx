// ===========================
// Wishlist Page (/wishlist)
// Grid of wishlisted products with Move to Cart and Remove actions.
// ===========================

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiStar,
  FiChevronRight,
  FiArrowLeft,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  // ─── Handlers ──────────────────────────────────
  const handleMoveToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        material: item.material,
        image: item.image || null,
        quantity: 1,
        stock: item.stock,
      })
    );
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} moved to cart`);
  };

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} removed from wishlist`);
  };

  // ─── Empty Wishlist State ─────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          {/* Empty wishlist illustration */}
          <div className="w-32 h-32 rounded-full bg-beige flex items-center justify-center mb-8 animate-float">
            <FiHeart size={48} className="text-primary/25" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-darkwood mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-primary/50 max-w-md mb-8 leading-relaxed">
            Save your favorite handcrafted pieces here. Browse our collection
            and tap the heart icon on items you love.
          </p>
          <Link
            to="/products"
            className="bg-gold hover:bg-gold-light text-darkwood font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center gap-2"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Wishlist with Items ──────────────────────
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
          <span className="text-darkwood font-medium">
            Wishlist ({items.length})
          </span>
        </nav>

        {/* ─── Page Title ────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-darkwood">
            My Wishlist
          </h1>
          <span className="text-sm text-primary/40">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* ─── Wishlist Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fadeIn"
            >
              {/* Product Image */}
              <Link
                to={`/products/${item.id}`}
                className="relative aspect-square bg-gradient-to-br from-beige to-beige-light overflow-hidden block"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                      🪵
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                {item.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-primary text-cream text-xs font-bold px-3 py-1 rounded-full z-10">
                    {item.discount}% OFF
                  </span>
                )}

                {/* Wishlist Heart (filled) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center transition-all duration-300 z-10 hover:bg-red-600"
                  aria-label="Remove from wishlist"
                >
                  <FiHeart size={16} fill="currentColor" />
                </button>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {/* Material Tag */}
                <span className="text-xs font-medium text-primary/60 bg-primary/8 px-2.5 py-1 rounded-full">
                  {item.material}
                </span>

                {/* Product Name */}
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-heading text-lg font-semibold text-darkwood mt-2 mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </h3>
                </Link>

                {/* Star Rating */}
                {item.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(item.rating)
                              ? "text-gold fill-gold"
                              : "text-beige"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-primary/50">
                      ({item.reviewCount})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-darkwood">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-primary/40 line-through">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-gold hover:bg-gold-light text-darkwood font-semibold text-sm py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/20"
                  >
                    <FiShoppingCart size={14} />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className="w-10 h-10 rounded-full border-2 border-primary/15 hover:border-red-300 text-primary/40 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all duration-300"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary/50 hover:text-gold transition-colors duration-300"
          >
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
