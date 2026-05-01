// ===========================
// Cart Page (/cart)
// Full shopping cart view with item list, quantity controls,
// order summary, and empty state.
// ===========================

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

  // Shipping logic
  const FREE_SHIPPING_THRESHOLD = 5000;
  const SHIPPING_COST = 250;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shipping;

  // ─── Handlers ──────────────────────────────────
  const handleIncrement = (item) => {
    if (item.quantity < item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    } else {
      toast.error("Maximum stock reached");
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.name} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // ─── Empty Cart State ─────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          {/* Empty cart illustration */}
          <div className="w-32 h-32 rounded-full bg-beige flex items-center justify-center mb-8 animate-float">
            <FiShoppingBag size={48} className="text-primary/25" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-darkwood mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-primary/50 max-w-md mb-8 leading-relaxed">
            Looks like you haven't added any handcrafted pieces to your cart yet.
            Explore our collection and find something you'll love.
          </p>
          <Link
            to="/products"
            className="bg-gold hover:bg-gold-light text-darkwood font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center gap-2"
          >
            <FiShoppingBag size={18} />
            Shop Now
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Cart with Items ──────────────────────────
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
            Shopping Cart ({totalItems})
          </span>
        </nav>

        {/* ─── Page Title ────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-darkwood">
            Shopping Cart
          </h1>
          <button
            onClick={handleClearCart}
            className="text-sm text-primary/40 hover:text-red-500 transition-colors duration-300 flex items-center gap-1.5"
          >
            <FiTrash2 size={14} />
            Clear Cart
          </button>
        </div>

        {/* ─── Cart Layout ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── LEFT: Cart Items ──────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn"
              >
                <div className="flex gap-4 sm:gap-5">
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.id}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gradient-to-br from-beige to-beige-light rounded-xl overflow-hidden flex items-center justify-center"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl opacity-30">🪵</div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    {/* Top Row: Name + Remove */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-medium text-primary/50 bg-primary/8 px-2 py-0.5 rounded-full">
                          {item.material}
                        </span>
                        <Link to={`/products/${item.id}`}>
                          <h3 className="font-heading text-base sm:text-lg font-semibold text-darkwood mt-1 hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-primary/30 hover:text-red-500 transition-colors duration-300 p-1 flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    {/* Bottom Row: Quantity + Price */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center bg-beige-light rounded-full border border-primary/10 overflow-hidden">
                        <button
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity <= 1}
                          className={`w-9 h-9 flex items-center justify-center transition-colors duration-200 ${
                            item.quantity <= 1
                              ? "text-primary/20 cursor-not-allowed"
                              : "text-primary/60 hover:text-darkwood hover:bg-beige"
                          }`}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-10 text-center font-semibold text-darkwood text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item)}
                          disabled={item.quantity >= item.stock}
                          className={`w-9 h-9 flex items-center justify-center transition-colors duration-200 ${
                            item.quantity >= item.stock
                              ? "text-primary/20 cursor-not-allowed"
                              : "text-primary/60 hover:text-darkwood hover:bg-beige"
                          }`}
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-bold text-darkwood">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-primary/40">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary/50 hover:text-gold transition-colors duration-300 mt-4"
            >
              <FiArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* ─── RIGHT: Order Summary ─────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-heading text-xl font-bold text-darkwood mb-6">
                Order Summary
              </h2>

              {/* Summary Lines */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-darkwood">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-primary/60 flex items-center gap-1.5">
                    <FiTruck size={14} />
                    Shipping
                  </span>
                  {shipping === 0 ? (
                    <span className="font-medium text-green-600">Free</span>
                  ) : (
                    <span className="font-medium text-darkwood">
                      ₹{shipping.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Free shipping progress */}
                {shipping > 0 && (
                  <div className="bg-beige-light rounded-lg p-3 mt-2">
                    <p className="text-xs text-primary/60 mb-2">
                      Add ₹
                      {(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString(
                        "en-IN"
                      )}{" "}
                      more for{" "}
                      <span className="font-semibold text-green-600">
                        free shipping
                      </span>
                    </p>
                    <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-primary/10 my-4" />

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="font-heading text-lg font-bold text-darkwood">
                  Total
                </span>
                <span className="font-heading text-lg font-bold text-darkwood">
                  ₹{orderTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gold hover:bg-gold-light text-darkwood font-semibold py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 text-sm"
              >
                Proceed to Checkout
                <FiChevronRight size={16} />
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-primary/5">
                <div className="flex items-center gap-1.5 text-xs text-primary/40">
                  <FiShield size={14} className="text-gold" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary/40">
                  <FiTruck size={14} className="text-gold" />
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
