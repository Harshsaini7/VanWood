// ===========================
// MobileFilterDrawer Component
// Slide-in drawer for mobile filter UI.
// Same filter options as FilterSidebar, in a fullscreen overlay.
// ===========================

import { FiX } from "react-icons/fi";
import FilterSidebar from "./FilterSidebar";

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  resultCount,
}) => {
  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-cream z-50 lg:hidden transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-primary/10">
          <h2 className="font-heading text-xl font-bold text-darkwood">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary/60 hover:text-darkwood transition-all duration-300"
            aria-label="Close filters"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
          />
        </div>

        {/* Sticky Footer — Show Results */}
        <div className="p-4 border-t border-primary/10 bg-cream">
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-dark text-cream font-semibold py-3 rounded-full transition-all duration-300 text-sm"
          >
            Show {resultCount} Results
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
