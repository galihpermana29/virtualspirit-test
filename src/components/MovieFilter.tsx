/**
 * Filter component for movie list types
 */
import type { MovieListType } from "../types/movie";

interface MovieFilterProps {
  currentType: MovieListType;
  onTypeChange: (type: MovieListType) => void;
  isAuthenticated: boolean;
}

export function MovieFilter({
  currentType,
  onTypeChange,
  isAuthenticated,
}: MovieFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTypeChange("popular")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentType === "popular"
              ? "bg-[#00e054] text-[#14181c] font-medium"
              : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => onTypeChange("upcoming")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentType === "upcoming"
              ? "bg-[#00e054] text-[#14181c] font-medium"
              : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => onTypeChange("now playing")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentType === "now playing"
              ? "bg-[#00e054] text-[#14181c] font-medium"
              : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
          }`}
        >
          Now Playing
        </button>
        {isAuthenticated && (
          <a
            href="/wishlist"
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]`}
          >
            Watchlist
          </a>
        )}
      </div>
    </div>
  );
}
