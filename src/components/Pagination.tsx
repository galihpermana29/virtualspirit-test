import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxPages = Math.min(totalPages, 500); // TMDB API limit

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = maxPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(maxPages);
      } else if (currentPage >= maxPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = maxPages - 4; i <= maxPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(maxPages);
      }
    } else {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-[#2c3440] text-gray-300 hover:bg-[#3d4754] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`min-w-[32px] h-8 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#00e054] text-[#14181c] font-medium"
                    : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        className="p-2 rounded-lg bg-[#2c3440] text-gray-300 hover:bg-[#3d4754] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
