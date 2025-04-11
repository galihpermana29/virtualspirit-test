import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Movie } from "../types/movie";
import { FavoriteRepository } from "../repositories/FavoriteRepository";

export function useFavorites(
  accountId: number | null,
  sessionId: string | null
) {
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
