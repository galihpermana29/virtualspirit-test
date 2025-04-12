import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";

import { Movie } from "../app/movie/models/types";
import { WatchlistRepository } from "../app/watchlist/repositories/WatchlistRepository";

interface WatchlistPageProps {
  accountId: number;
  sessionId: string | null;
  onMovieClick: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
}

export function WatchlistPage({
  accountId,
  sessionId,
  onMovieClick,
  onToggleWatchlist,
}: WatchlistPageProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["watchlist", accountId],
    queryFn: () =>
      WatchlistRepository.getWatchlist(accountId, sessionId as string),
    enabled: sessionId !== null,
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">Loading watchlist...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        An error occurred while fetching your watchlist
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <div className="text-center text-gray-400">
        Your watchlist is empty. Start adding movies!
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {data.results.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          isInWatchlist={true}
          isAuthenticated={true}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </div>
  );
}
