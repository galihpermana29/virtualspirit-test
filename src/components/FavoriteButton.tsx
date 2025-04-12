import { Heart } from "lucide-react";
import { Movie } from "../app/movie/models/types";

interface FavoriteButtonProps {
  movie: Movie;
  isInFavorites: boolean;
  isAuthenticated: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function FavoriteButton({
  movie,
  isInFavorites,
  isAuthenticated,
  onToggleFavorite,
}: FavoriteButtonProps) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(movie);
      }}
      className={`p-2 rounded-full transition-colors ${
        isInFavorites
          ? "bg-[#00e054] text-[#14181c]"
          : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
      }`}
    >
      <Heart className="h-4 w-4" />
    </button>
  );
}
