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
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * Fetches movies based on search query or list type
   */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", searchQuery, listType, currentPage],
    queryFn: () => {
      if (searchQuery) {
        return MovieRepository.searchMovies(searchQuery, currentPage);
      }
      return MovieRepository.getMovies(listType, currentPage);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    handlePageChange,
    handleSearch,
    handleTypeChange,
    currentPage,
  };
}
