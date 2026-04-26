// ===========================
// App.jsx — Root Component
// Sets up React Router and wraps the app in Redux Provider.
// All pages and routes are defined here.
// ===========================

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";

// ScrollToTop — resets scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Toast notifications — VanWood warm theme */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#3D1F0D",
            color: "#FFFBF2",
            borderRadius: "12px",
            border: "1px solid rgba(201, 168, 76, 0.2)",
          },
          success: {
            iconTheme: {
              primary: "#C9A84C",
              secondary: "#3D1F0D",
            },
          },
        }}
      />

      {/* ===== Routes ===== */}
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Product Listing Page */}
        <Route path="/products" element={<ProductListing />} />

        {/* Product Detail Page */}
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* TODO: Add more routes as you build pages */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
