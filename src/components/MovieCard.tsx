import { Star } from "lucide-react";
import type { Movie } from "../types/movie";
import { WatchlistButton } from "./WatchlistButton";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isInWatchlist?: boolean;
  isAuthenticated?: boolean;
  onToggleWatchlist?: (movie: Movie) => void;
}

export function MovieCard({
  movie,
  onClick,
  isInWatchlist = false,
  isAuthenticated = false,
  onToggleWatchlist = () => {},
}: MovieCardProps) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative cursor-pointer"
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover rounded-md transition-transform group-hover:brightness-75"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <WatchlistButton
        movie={movie}
        isInWatchlist={isInWatchlist}
        isAuthenticated={isAuthenticated}
        onToggleWatchlist={onToggleWatchlist}
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-md">
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center text-xs text-gray-300">
          <Star className="h-3 w-3 text-[#00e054] mr-1" />
          <span>{movie.vote_average.toFixed(1)}</span>
          <span className="mx-1">•</span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
