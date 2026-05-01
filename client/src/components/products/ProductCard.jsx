// ===========================
// ProductCard Component
// Reusable product card for grid and list views.
// Shows: image, name, material, price, rating, cart & wishlist buttons.
// Wired to Redux for cart and wishlist actions.
// ===========================

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";
import { FiShoppingCart, FiHeart, FiStar, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const dispatch = useDispatch();

  // Check if this product is in the wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Check if this product is in the cart
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  // Handle Add to Cart with Redux dispatch
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        material: product.material,
        image: null,
        quantity: 1,
        stock: product.stock,
      })
    );
    toast.success(`${product.name} added to cart`);
  };

  // Handle Wishlist toggle with Redux dispatch
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  // ─── LIST VIEW LAYOUT ─────────────────────────
  if (viewMode === "list") {
    return (
      <Link
        to={`/products/${product.id}`}
        className="group flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative w-48 sm:w-56 flex-shrink-0 bg-gradient-to-br from-beige to-beige-light overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl opacity-30">🪵</div>
          </div>
          {/* Discount Badge */}
          <span className="absolute top-3 left-3 bg-primary text-cream text-xs font-bold px-3 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-primary/60 bg-primary/8 px-2.5 py-1 rounded-full">
              {product.material}
            </span>
            <h3 className="font-heading text-lg font-semibold text-darkwood mt-2 mb-1 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-primary/50 line-clamp-2 mb-3">
              {product.description}
            </p>
            {/* Rating */}
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
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-darkwood">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-primary/40 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlist}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-beige hover:border-gold text-primary/40 hover:text-red-500"
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart
                  size={16}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={handleAddToCart}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300 ${
                  isInCart
                    ? "bg-green-500 text-white"
                    : "bg-gold hover:bg-gold-light text-darkwood"
                }`}
              >
                <FiShoppingCart size={14} />
                {isInCart ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ─── GRID VIEW LAYOUT (DEFAULT) ───────────────
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative aspect-square bg-gradient-to-br from-beige to-beige-light overflow-hidden block"
      >
        {/* Placeholder image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            🪵
          </div>
        </div>

        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-primary text-cream text-xs font-bold px-3 py-1 rounded-full z-10">
          {product.discount}% OFF
        </span>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 text-darkwood hover:bg-white hover:text-red-500"
          }`}
          aria-label="Add to wishlist"
        >
          <FiHeart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Stock Badge */}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 bg-orange-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
            Only {product.stock} left
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-darkwood/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                isInCart
                  ? "bg-green-500 text-white"
                  : "bg-gold hover:bg-gold-light text-darkwood"
              }`}
            >
              <FiShoppingCart size={14} />
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>
            <Link
              to={`/products/${product.id}`}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-300"
              aria-label="Quick view"
            >
              <FiEye size={16} />
            </Link>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Material Tag */}
        <span className="text-xs font-medium text-primary/60 bg-primary/8 px-2.5 py-1 rounded-full">
          {product.material}
        </span>

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-darkwood mt-2 mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>

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
  );
};

export default ProductCard;
