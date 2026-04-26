// ===========================
// Product Listing Page (/products)
// Full-featured product listing with filters, search,
// sort, pagination, grid/list view toggle.
// ===========================

import { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiSliders,
  FiChevronDown,
  FiPackage,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/products/ProductCard";
import ProductSkeleton from "../components/products/ProductSkeleton";
import Pagination from "../components/products/Pagination";
import FilterSidebar from "../components/products/FilterSidebar";
import MobileFilterDrawer from "../components/products/MobileFilterDrawer";
import products from "../data/productData";

const ITEMS_PER_PAGE = 12;

const ProductListing = () => {
  // ─── State ─────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    priceRange: [0, 50000],
    minRating: 0,
  });

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = () => setShowSortDropdown(false);
    if (showSortDropdown) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showSortDropdown]);

  // ─── Filtering & Sorting Logic ─────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Material filter
    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "top-rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  // ─── Pagination Logic ──────────────────────────
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Clear all filters
  const handleClearAll = () => {
    setFilters({
      categories: [],
      materials: [],
      priceRange: [0, 50000],
      minRating: 0,
    });
    setSearchQuery("");
  };

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort";

  return (
    <div className="min-h-screen bg-beige-light">
      <Navbar />

      {/* ─── Page Header ──────────────────────────── */}
      <div className="bg-darkwood pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-cream mb-3">
            Our Collection
          </h1>
          <p className="text-beige/60 max-w-xl text-sm sm:text-base">
            Discover handcrafted wooden masterpieces from the artisans of
            Saharanpur — each piece tells a story of heritage and skill.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
            />
            <input
              type="text"
              placeholder="Search products, materials, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-beige/20 text-cream placeholder-beige/40 focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all duration-300 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* ─── Desktop Sidebar ────────────────────── */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* ─── Products Area ──────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Top Bar — Result count, sort, view toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Left — Result count + mobile filter button */}
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 text-primary/70 hover:border-primary hover:text-primary text-sm font-medium transition-all duration-300"
                >
                  <FiSliders size={16} />
                  Filters
                </button>

                <span className="text-sm text-primary/50">
                  {isLoading ? (
                    <span className="inline-block w-32 h-4 bg-beige rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="font-semibold text-darkwood">
                        {filteredProducts.length}
                      </span>{" "}
                      products found
                    </>
                  )}
                </span>
              </div>

              {/* Right — Sort + View Toggle */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSortDropdown((prev) => !prev);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 text-primary/70 hover:border-primary hover:text-primary text-sm font-medium transition-all duration-300"
                  >
                    {currentSortLabel}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        showSortDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/10 py-2 z-30 animate-slideDown">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                            sortBy === opt.value
                              ? "text-gold font-semibold bg-gold/5"
                              : "text-primary/70 hover:text-darkwood hover:bg-beige/50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center bg-white rounded-full border border-primary/10 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-primary text-cream"
                        : "text-primary/40 hover:text-primary"
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-primary text-cream"
                        : "text-primary/40 hover:text-primary"
                    }`}
                    aria-label="List view"
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(filters.categories.length > 0 ||
              filters.materials.length > 0 ||
              filters.priceRange[1] < 50000 ||
              filters.minRating > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {cat}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter(
                            (c) => c !== cat
                          ),
                        })
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.materials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold-dark text-xs font-medium rounded-full"
                  >
                    {mat}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          materials: filters.materials.filter(
                            (m) => m !== mat
                          ),
                        })
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.priceRange[1] < 50000 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    Up to ₹{filters.priceRange[1].toLocaleString("en-IN")}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          priceRange: [0, 50000],
                        })
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
                    4★ & above
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          minRating: 0,
                        })
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* ─── Product Grid / Loading / Empty ─────── */}
            {isLoading ? (
              // Skeleton Loading
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                  <ProductSkeleton key={i} viewMode={viewMode} />
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-beige rounded-full flex items-center justify-center mb-6">
                  <FiPackage size={40} className="text-primary/30" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-darkwood mb-2">
                  No products found
                </h3>
                <p className="text-primary/50 max-w-md mb-6 text-sm">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search or clearing some filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="bg-primary hover:bg-primary-dark text-cream font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // Product Grid
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClearAll={handleClearAll}
        resultCount={filteredProducts.length}
      />

      <Footer />
    </div>
  );
};

export default ProductListing;
