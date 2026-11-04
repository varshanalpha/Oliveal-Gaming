import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export const BookingPagination: React.FC<BookingPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  if (totalCount === 0) return null;

  // Generate pagination items with ellipses matching the reference
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In reference image: 1, 2, 3, 4, 5, ..., 16
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 select-none">
      
      {/* Left: Summary Text */}
      <div className="text-xs sm:text-sm text-zinc-400 font-sans">
        Showing <span className="text-white font-semibold">{startIndex}</span> –{' '}
        <span className="text-white font-semibold">{endIndex}</span> of{' '}
        <span className="text-white font-semibold">{totalCount}</span> bookings
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg bg-zinc-900 border border-purple-500/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-zinc-500 text-xs font-mono"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold font-display transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.45)]'
                  : 'bg-zinc-900 border border-purple-500/15 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg bg-zinc-900 border border-purple-500/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
