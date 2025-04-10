/**
 * Custom hook for managing user's watchlist operations
 */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WatchlistRepository } from "../repositories/WatchlistRepository";
import type { Movie } from "../types/movie";

export function useWatchlist(
  accountId: number | null,
  sessionId: string | null
) {
  const {
    data: watchlistData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["watchlist", accountId],
    queryFn: () => {
      if (!accountId || !sessionId) return null;
      return WatchlistRepository.getWatchlist(accountId, sessionId);
    },
    enabled: !!accountId && !!sessionId,
  });

  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());
  const queryClient = useQueryClient();

  /**
   * Toggles a movie's watchlist status
   */
  const toggleWatchlist = async (movie: Movie) => {
    if (!accountId || !sessionId) return;

    try {
      const isInWatchlist = watchlist.has(movie.id);
      if (isInWatchlist) {
        await WatchlistRepository.removeFromWatchlist(
          accountId,
          movie.id,
          sessionId
        );
        watchlist.delete(movie.id);
      } else {
        await WatchlistRepository.addToWatchlist(
          accountId,
          movie.id,
          sessionId
        );
        watchlist.add(movie.id);
      }
      setWatchlist(new Set(watchlist));
      queryClient.invalidateQueries({ queryKey: ["watchlist", accountId] });
    } catch (error) {
      console.error("Failed to update watchlist:", error);
    }
  };

  useEffect(() => {
    if (watchlistData) {
      setWatchlist(new Set(watchlistData.results.map((movie) => movie.id)));
    }
  }, [watchlistData]);

  return {
    watchlist,
    watchlistData,
    toggleWatchlist,
    isInWatchlist: (movieId: number) => watchlist.has(movieId),
    isLoading,
    error,
  };
}
