import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import { Movie } from "../../movie/models/types";

/**
 * Function useFavorites returns a set of favorite movies for a user
 * @param accountId
 * @param sessionId
 * @returns
 */
export function useFavorites(
  accountId: number | null,
  sessionId: string | null
) {
  /**
   * Fetch favorites from the API
   * If the user is not authenticated, return null
   * If the user is authenticated, fetch favorites from the API
   */
  const {
    data: favoritesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", accountId],
    queryFn: () => {
      if (!accountId || !sessionId) return null;
      return FavoriteRepository.getFavorites(accountId, sessionId);
    },
    enabled: !!accountId && !!sessionId,
  });

  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const queryClient = useQueryClient();

  /**
   * This function toggles a movie's favorite status
   * If the movie is already in the favorites, it removes it
   * If the movie is not in the favorites, it adds it
   * Updates the favorites set and invalidates the query
   * @param movie
   * @returns
   */
  const toggleFavorite = async (movie: Movie) => {
    if (!accountId || !sessionId) return;

    try {
      const isInFavorites = favorites.has(movie.id);
      if (isInFavorites) {
        await FavoriteRepository.removeFromFavorites(
          accountId,
          movie.id,
          sessionId
        );
        favorites.delete(movie.id);
      } else {
        await FavoriteRepository.addToFavorites(accountId, movie.id, sessionId);
        favorites.add(movie.id);
      }
      setFavorites(new Set(favorites));
      queryClient.invalidateQueries({ queryKey: ["favorites", accountId] });
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  useEffect(() => {
    if (favoritesData) {
      setFavorites(new Set(favoritesData.results.map((movie) => movie.id)));
    }
  }, [favoritesData]);

  return {
    favorites,
    favoritesData,
    toggleFavorite,
    isInFavorites: (movieId: number) => favorites.has(movieId),
    isLoading,
    error,
  };
}
