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

const SearchPageContainer = () => {
  const { sessionId, account, isAuthenticated, handleAuthCallback } = useAuth();

  const {
    data: movies,
    isLoading,
    error,
    setSelectedMovie,
    listType,
    selectedMovie,

    handleSearch,
    handleTypeChange,
  } = useMovies();

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
            {/* {isAuthenticated && (
              <button
                onClick={() =>
                  setCurrentView(
                    currentView === "movies" ? "watchlist" : "movies"
                  )
                }
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === "watchlist"
                    ? "bg-[#00e054] text-[#14181c]"
                    : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
                }`}
              >
                <span>Watchlist</span>
              </button>
            )} */}
          </div>

          <div className="mx-auto">
            <MovieFilter
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
      </main>
    </div>
  );
};

export default SearchPageContainer;
