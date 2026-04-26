// ===========================
// Pagination Component
// Page navigation for product listing.
// Shows prev/next + numbered pages with ellipsis.
// ===========================

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Build array of page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          currentPage === 1
            ? "text-primary/30 cursor-not-allowed"
            : "text-primary hover:bg-primary hover:text-cream border border-primary/20 hover:border-primary"
        }`}
      >
        <FiChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-primary/40 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                currentPage === page
                  ? "bg-primary text-cream shadow-lg shadow-primary/20"
                  : "text-primary/60 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          currentPage === totalPages
            ? "text-primary/30 cursor-not-allowed"
            : "text-primary hover:bg-primary hover:text-cream border border-primary/20 hover:border-primary"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
