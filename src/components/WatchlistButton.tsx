import { Bookmark } from "lucide-react";
import type { Movie } from "../types/movie";

interface WatchlistButtonProps {
  movie: Movie;
  isInWatchlist: boolean;
  isAuthenticated: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export function WatchlistButton({
  movie,
  isInWatchlist,
  isAuthenticated,
  onToggleWatchlist,
}: WatchlistButtonProps) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleWatchlist(movie);
      }}
      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
        isInWatchlist
          ? "bg-[#00e054] text-[#14181c]"
          : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
      }`}
    >
      <Bookmark className="h-4 w-4" />
    </button>
  );
}
