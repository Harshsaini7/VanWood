// ===========================
// ProductSkeleton Component
// Shimmer loading placeholder for product cards.
// Shown while product data is "loading" (simulated delay).
// ===========================

const ProductSkeleton = ({ viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
        {/* Image placeholder */}
        <div className="w-48 sm:w-56 flex-shrink-0 skeleton-shimmer animate-shimmer" />
        {/* Content */}
        <div className="flex-1 p-5 space-y-3">
          <div className="h-4 w-20 bg-beige rounded-full" />
          <div className="h-5 w-3/4 bg-beige rounded" />
          <div className="h-3 w-full bg-beige/60 rounded" />
          <div className="h-3 w-2/3 bg-beige/60 rounded" />
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-beige rounded-full" />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-6 w-24 bg-beige rounded" />
            <div className="h-10 w-28 bg-beige rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Image placeholder */}
      <div className="aspect-square skeleton-shimmer animate-shimmer" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-20 bg-beige rounded-full" />
        <div className="h-5 w-3/4 bg-beige rounded" />
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-beige rounded-full" />
          ))}
          <div className="h-3 w-8 bg-beige/60 rounded ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-beige rounded" />
          <div className="h-4 w-16 bg-beige/50 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
