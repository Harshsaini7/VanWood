// ===========================
// App.jsx — Root Component
// Sets up React Router and wraps the app in Redux Provider.
// All pages and routes are defined here.
// ===========================

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      {/* Toast notifications — shows success/error messages */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a2e",
            color: "#eee",
            borderRadius: "12px",
          },
        }}
      />

      {/* ===== Routes ===== */}
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* TODO: Add more routes as you build pages */}
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
