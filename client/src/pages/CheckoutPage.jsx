// ===========================
// Checkout Page (/checkout)
// Three-step checkout wizard:
//   Step 1: Delivery Address
//   Step 2: Order Review
//   Step 3: Payment (Razorpay placeholder)
// ===========================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import {
  FiMapPin,
  FiPackage,
  FiCreditCard,
  FiCheck,
  FiChevronRight,
  FiChevronLeft,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiLock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Indian states for the dropdown
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry",
];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Current step (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1);

  // Shipping logic
  const FREE_SHIPPING_THRESHOLD = 5000;
  const SHIPPING_COST = 250;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shipping;

  // ─── Address Form State ───────────────────────
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  // ─── Address Form Handlers ────────────────────
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAddress = () => {
    const newErrors = {};

    if (!address.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(address.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!address.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!address.state) {
      newErrors.state = "State is required";
    }

    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(address.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Step Navigation ──────────────────────────
  const goToStep = (step) => {
    if (step === 2 && currentStep === 1) {
      if (!validateAddress()) return;
    }
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // Placeholder — will integrate Razorpay in Sprint 7
    toast.success("Order placed successfully! (Demo mode)");
    dispatch(clearCart());
    navigate("/");
  };

  // ─── Steps Config ─────────────────────────────
  const steps = [
    { id: 1, label: "Delivery", icon: FiMapPin },
    { id: 2, label: "Review", icon: FiPackage },
    { id: 3, label: "Payment", icon: FiCreditCard },
  ];

  // ─── Redirect if cart is empty ────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-beige-light">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="w-32 h-32 rounded-full bg-beige flex items-center justify-center mb-8 animate-float">
            <FiPackage size={48} className="text-primary/25" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-darkwood mb-3">
            Nothing to Checkout
          </h2>
          <p className="text-primary/50 max-w-md mb-8 leading-relaxed">
            Your cart is empty. Add some items before checking out.
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

  // ─── Input Field Component ────────────────────
  const InputField = ({ label, name, type = "text", placeholder, required = true }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-darkwood mb-1.5"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={address[name]}
        onChange={handleAddressChange}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-darkwood placeholder-primary/30 text-sm transition-all duration-300 outline-none ${
          errors[name]
            ? "border-red-300 focus:border-red-400"
            : "border-primary/10 focus:border-gold"
        }`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
            to="/cart"
            className="hover:text-primary transition-colors duration-200"
          >
            Cart
          </Link>
          <FiChevronRight size={12} />
          <span className="text-darkwood font-medium">Checkout</span>
        </nav>

        {/* ─── Progress Indicator ─────────────────────── */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  currentStep >= step.id ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => {
                  if (step.id < currentStep) goToStep(step.id);
                }}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-gold text-darkwood shadow-lg shadow-gold/30"
                      : "bg-white border-2 border-primary/15 text-primary/30"
                  }`}
                >
                  {currentStep > step.id ? (
                    <FiCheck size={18} strokeWidth={3} />
                  ) : (
                    <step.icon size={18} />
                  )}
                </div>
                <span
                  className={`hidden sm:block text-sm font-medium transition-colors duration-300 ${
                    currentStep >= step.id
                      ? "text-darkwood"
                      : "text-primary/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 rounded-full transition-all duration-500 ${
                    currentStep > step.id ? "bg-green-500" : "bg-primary/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ─── Step Content ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main Content (Left) ─────────────────── */}
          <div className="lg:col-span-2">
            {/* ═══════════════════════════════════════════
                STEP 1: Delivery Address
            ═══════════════════════════════════════════ */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <FiMapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-darkwood">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-primary/40">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                  />
                  <div className="sm:col-span-2">
                    <InputField
                      label="Address Line 1"
                      name="addressLine1"
                      placeholder="House No., Street, Locality"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      label="Address Line 2"
                      name="addressLine2"
                      placeholder="Landmark (optional)"
                      required={false}
                    />
                  </div>
                  <InputField
                    label="City"
                    name="city"
                    placeholder="Saharanpur"
                  />
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-darkwood mb-1.5"
                    >
                      State <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-darkwood text-sm transition-all duration-300 outline-none appearance-none cursor-pointer ${
                        errors.state
                          ? "border-red-300 focus:border-red-400"
                          : "border-primary/10 focus:border-gold"
                      } ${!address.state ? "text-primary/30" : ""}`}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <InputField
                    label="Pincode"
                    name="pincode"
                    placeholder="247001"
                  />
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => goToStep(2)}
                    className="bg-gold hover:bg-gold-light text-darkwood font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center gap-2 text-sm"
                  >
                    Continue to Review
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════
                STEP 2: Order Review
            ═══════════════════════════════════════════ */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Delivery Address Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                        <FiMapPin size={18} className="text-green-600" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-darkwood">
                        Delivery Address
                      </h3>
                    </div>
                    <button
                      onClick={() => goToStep(1)}
                      className="text-xs font-medium text-gold hover:text-gold-dark transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="ml-[52px] text-sm text-primary/70 leading-relaxed">
                    <p className="font-semibold text-darkwood">
                      {address.fullName}
                    </p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {address.city}, {address.state} — {address.pincode}
                    </p>
                    <p className="mt-1">Phone: {address.phone}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <FiPackage size={18} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-darkwood">
                      Order Items ({totalItems})
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-3 border-b border-primary/5 last:border-0"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-beige to-beige-light rounded-lg overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-2xl opacity-30">🪵</div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-darkwood line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-primary/40 mt-0.5">
                            {item.material} · Qty: {item.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <p className="text-sm font-bold text-darkwood flex-shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => goToStep(1)}
                    className="text-sm font-medium text-primary/50 hover:text-darkwood transition-colors flex items-center gap-1.5"
                  >
                    <FiChevronLeft size={16} />
                    Back to Address
                  </button>
                  <button
                    onClick={() => goToStep(3)}
                    className="bg-gold hover:bg-gold-light text-darkwood font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 flex items-center gap-2 text-sm"
                  >
                    Proceed to Payment
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════
                STEP 3: Payment (Placeholder)
            ═══════════════════════════════════════════ */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <FiCreditCard size={18} className="text-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-darkwood">
                      Payment
                    </h2>
                    <p className="text-xs text-primary/40">
                      Secure payment via Razorpay
                    </p>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="border-2 border-gold/30 rounded-2xl p-6 mb-6 bg-gradient-to-br from-gold/5 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#072654] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-darkwood text-sm">
                        Razorpay Secure Checkout
                      </h4>
                      <p className="text-xs text-primary/40">
                        UPI · Cards · Net Banking · Wallets
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets"].map(
                      (method) => (
                        <span
                          key={method}
                          className="text-xs bg-white px-3 py-1.5 rounded-full border border-primary/10 text-primary/60"
                        >
                          {method}
                        </span>
                      )
                    )}
                  </div>

                  <div className="bg-beige-light rounded-xl p-4 text-center">
                    <FiLock
                      size={24}
                      className="mx-auto text-primary/20 mb-2"
                    />
                    <p className="text-sm text-primary/50 mb-1">
                      Razorpay integration coming in{" "}
                      <span className="font-semibold text-gold">Sprint 7</span>
                    </p>
                    <p className="text-xs text-primary/30">
                      For now, click below to simulate an order placement
                    </p>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gold hover:bg-gold-light text-darkwood font-bold py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 flex items-center justify-center gap-2 text-base"
                >
                  <FiLock size={16} />
                  Pay ₹{orderTotal.toLocaleString("en-IN")}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-4 mt-5">
                  <div className="flex items-center gap-1.5 text-xs text-primary/40">
                    <FiShield size={14} className="text-green-500" />
                    256-bit SSL Encrypted
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary/40">
                    <FiLock size={14} className="text-green-500" />
                    PCI DSS Compliant
                  </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => goToStep(2)}
                    className="text-sm font-medium text-primary/50 hover:text-darkwood transition-colors flex items-center gap-1.5 mx-auto"
                  >
                    <FiChevronLeft size={16} />
                    Back to Order Review
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── Order Summary Sidebar (Right) ────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-heading text-lg font-bold text-darkwood mb-5">
                Order Summary
              </h3>

              {/* Item count */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">
                    Items ({totalItems})
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
              </div>

              <div className="border-t border-primary/10 my-4" />

              <div className="flex justify-between mb-4">
                <span className="font-heading text-lg font-bold text-darkwood">
                  Total
                </span>
                <span className="font-heading text-lg font-bold text-darkwood">
                  ₹{orderTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Cart Preview */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 text-xs"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-beige rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-base opacity-30">🪵</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-primary/70 line-clamp-1 font-medium">
                        {item.name}
                      </p>
                      <p className="text-primary/40">×{item.quantity}</p>
                    </div>
                    <span className="font-semibold text-darkwood flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Back to Cart Link */}
              <Link
                to="/cart"
                className="block text-center text-xs font-medium text-primary/40 hover:text-gold mt-4 pt-4 border-t border-primary/5 transition-colors"
              >
                <FiArrowLeft size={12} className="inline mr-1" />
                Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
