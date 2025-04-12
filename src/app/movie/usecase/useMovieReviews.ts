/**
 * Custom hook for fetching and managing movie reviews
 */
import { useQuery } from '@tanstack/react-query';
import { MovieRepository } from '../repositories/MovieRepository';

export function useMovieReviews(movieId: number | null) {
  return useQuery({
    queryKey: ['reviews', movieId],
    queryFn: () => {
      if (!movieId) return null;
      return MovieRepository.getMovieReviews(movieId);
    },
    enabled: !!movieId,
  });
}