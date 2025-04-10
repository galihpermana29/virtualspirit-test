/**
 * Custom hook for handling movie-related operations and state
 * Uses React Query for data fetching and caching
 */
import { useQuery } from "@tanstack/react-query";
import { MovieRepository } from "../repositories/MovieRepository";
import type { Movie, MovieListType } from "../types/movie";
import { useState } from "react";

export function useMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [listType, setListType] = useState<MovieListType>("popular");

  /**
   * Fetches movies based on search query or list type
   */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", searchQuery, listType],
    queryFn: () => {
      if (searchQuery) {
        return MovieRepository.searchMovies(searchQuery);
      }
      return MovieRepository.getMovies(listType);
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setListType("search");
  };

  const handleTypeChange = (type: MovieListType) => {
    setListType(type);
    setSearchQuery("");
  };

  return {
    data,
    isLoading,
    isError,
    error,
    searchQuery,
    selectedMovie,
    listType,
    setSearchQuery,
    setSelectedMovie,
    setListType,

    handleSearch,
    handleTypeChange,
  };
}
