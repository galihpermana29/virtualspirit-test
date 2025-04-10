/**
 * Container component for movie search functionality
 * Handles business logic and state management
 */
import { useMovies } from "../../../hooks/useMovies";
import { useWatchlist } from "../../../hooks/useWatchlist";

import { useAuth } from "../../../hooks/useAuth";
import { SearchBar } from "../../../components/SearchBar";
import { MovieGrid } from "../../../components/MovieGrid";
import { MovieModal } from "../../../components/MovieModal";
import { MovieFilter } from "../../../components/MovieFilter";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Pagination } from "../../../components/Pagination";

const SearchPageContainer = () => {
  const {
    data: movies,
    isLoading,
    error,
    setSelectedMovie,
    listType,
    selectedMovie,
    handlePageChange,
    handleSearch,
    handleTypeChange,
    currentPage,
  } = useMovies();

  const { sessionId, account, isAuthenticated, handleAuthCallback } = useAuth();

  const { toggleWatchlist, isInWatchlist } = useWatchlist(
    account?.id ?? null,
    sessionId
  );

  // Check for auth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    const approved = urlParams.get("approved");

    if (requestToken && approved === "true") {
      handleAuthCallback(requestToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#14181c]">
      <Navbar />
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 mb-8">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-grow">
              <SearchBar
                onSearch={handleSearch}
                onTypeChange={handleTypeChange}
              />
            </div>
          </div>

          <div className="mx-auto">
            <MovieFilter
              isAuthenticated={isAuthenticated}
              currentType={listType}
              onTypeChange={handleTypeChange}
            />
          </div>
        </div>

        {/* Movie grid or watchlist */}
        <div className="min-h-[60vh]">
          <MovieGrid
            movies={movies?.results ?? []}
            isLoading={isLoading}
            error={error}
            onMovieClick={setSelectedMovie}
            isAuthenticated={isAuthenticated}
            onToggleWatchlist={toggleWatchlist}
            isInWatchlist={isInWatchlist}
          />
        </div>

        {/* Movie modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            isInWatchlist={isInWatchlist(selectedMovie.id)}
            isAuthenticated={isAuthenticated}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={movies?.total_pages ?? 1}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default SearchPageContainer;
