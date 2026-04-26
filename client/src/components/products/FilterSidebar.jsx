// ===========================
// FilterSidebar Component
// Desktop left sidebar with product filters:
// Category, Material, Price Range, Rating.
// ===========================

import { useState } from "react";
import { FiChevronDown, FiX, FiStar } from "react-icons/fi";

const FilterSidebar = ({ filters, onFilterChange, onClearAll }) => {
  // Track which sections are expanded
  const [expanded, setExpanded] = useState({
    category: true,
    material: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ["Furniture", "Decor", "Handicrafts"];
  const materials = ["Sheesham Wood", "Teak", "Mango Wood", "Rosewood"];

  // Count active filters
  const activeCount =
    filters.categories.length +
    filters.materials.length +
    (filters.priceRange[1] < 50000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-bold text-darkwood">
          Filters
        </h3>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-primary/50 hover:text-red-500 transition-colors duration-300 flex items-center gap-1"
          >
            <FiX size={12} />
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* ─── Category Filter ─────────────────────── */}
      <div className="border-b border-primary/10 pb-5 mb-5">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-sm font-semibold text-darkwood">Category</span>
          <FiChevronDown
            size={16}
            className={`text-primary/40 transition-transform duration-300 ${
              expanded.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded.category && (
          <div className="space-y-2.5 animate-fadeIn">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => {
                    const updated = filters.categories.includes(cat)
                      ? filters.categories.filter((c) => c !== cat)
                      : [...filters.categories, cat];
                    onFilterChange({ ...filters, categories: updated });
                  }}
                  className="w-4 h-4 rounded border-primary/30 text-gold focus:ring-gold/30 accent-gold cursor-pointer"
                />
                <span className="text-sm text-primary/70 group-hover:text-darkwood transition-colors duration-200">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ─── Material Filter ─────────────────────── */}
      <div className="border-b border-primary/10 pb-5 mb-5">
        <button
          onClick={() => toggleSection("material")}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-sm font-semibold text-darkwood">Material</span>
          <FiChevronDown
            size={16}
            className={`text-primary/40 transition-transform duration-300 ${
              expanded.material ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded.material && (
          <div className="space-y-2.5 animate-fadeIn">
            {materials.map((mat) => (
              <label
                key={mat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.materials.includes(mat)}
                  onChange={() => {
                    const updated = filters.materials.includes(mat)
                      ? filters.materials.filter((m) => m !== mat)
                      : [...filters.materials, mat];
                    onFilterChange({ ...filters, materials: updated });
                  }}
                  className="w-4 h-4 rounded border-primary/30 text-gold focus:ring-gold/30 accent-gold cursor-pointer"
                />
                <span className="text-sm text-primary/70 group-hover:text-darkwood transition-colors duration-200">
                  {mat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ─── Price Range Filter ──────────────────── */}
      <div className="border-b border-primary/10 pb-5 mb-5">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-sm font-semibold text-darkwood">
            Price Range
          </span>
          <FiChevronDown
            size={16}
            className={`text-primary/40 transition-transform duration-300 ${
              expanded.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded.price && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-primary/50 mb-3">
              <span>₹{filters.priceRange[0].toLocaleString("en-IN")}</span>
              <span>₹{filters.priceRange[1].toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={filters.priceRange[1]}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  priceRange: [0, parseInt(e.target.value)],
                });
              }}
              className="custom-range-slider"
              style={{
                "--fill": `${(filters.priceRange[1] / 50000) * 100}%`,
              }}
            />
            <div className="mt-2 text-center">
              <span className="text-sm font-medium text-darkwood">
                Up to ₹{filters.priceRange[1].toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Rating Filter ───────────────────────── */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-sm font-semibold text-darkwood">Rating</span>
          <FiChevronDown
            size={16}
            className={`text-primary/40 transition-transform duration-300 ${
              expanded.rating ? "rotate-180" : ""
            }`}
          />
        </button>
        {expanded.rating && (
          <div className="animate-fadeIn">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => {
                  onFilterChange({
                    ...filters,
                    minRating: filters.minRating === 4 ? 0 : 4,
                  });
                }}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  filters.minRating === 4
                    ? "bg-gold"
                    : "bg-primary/20"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                    filters.minRating === 4
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={12}
                      className="text-gold fill-gold"
                    />
                  ))}
                  <FiStar size={12} className="text-beige" />
                </div>
                <span className="text-sm text-primary/70 group-hover:text-darkwood transition-colors duration-200">
                  & above
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
