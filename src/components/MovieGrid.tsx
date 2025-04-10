/**
 * Presentation component for displaying a grid of movies
 */
import { MovieCard } from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
  onMovieClick: (movie: Movie) => void;
  isAuthenticated: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export function MovieGrid({
  movies,
  isLoading,
  error,
  onMovieClick,
  isAuthenticated,
  onToggleWatchlist,
  isInWatchlist,
}: MovieGridProps) {
  if (isLoading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        An error occurred while fetching movies
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          isInWatchlist={isInWatchlist(movie.id)}
          isAuthenticated={isAuthenticated}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </div>
  );
}
