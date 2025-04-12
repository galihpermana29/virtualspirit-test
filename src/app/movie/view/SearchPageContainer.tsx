/**
 * Container component for movie search functionality
 * Handles business logic and state management
 */
import { useMovies } from "../usecase/useMovies";
import { useWatchlist } from "../../watchlist/usecase/useWatchlist";
import { useFavorites } from "../../favorites/usecase/useFavorites";
import { useAuth } from "../../../usecases/authContext";
import { SearchBar } from "../../../components/SearchBar";
import { MovieGrid } from "../../../components/MovieGrid";
import { MovieModal } from "../../../components/MovieModal";
import { MovieFilter } from "../../../components/MovieFilter";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Pagination } from "../../../components/Pagination";

const SearchPageContainer = () => {
  /**
   * Fetch movies based on the current search query and page
   * Set the selected movie to the first movie in the results
   */
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

  const { toggleFavorite, isInFavorites } = useFavorites(
    account?.id ?? null,
    sessionId
  );

  /**
   * Handle the authentication callback from the TMDB redirect
   * Redirect the user to the home page if the request token is invalid
   * Update the session ID and account details in the context
   */
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 mb-8">
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

        <div className="min-h-[60vh]">
          <MovieGrid
            movies={movies?.results ?? []}
            isLoading={isLoading}
            error={error}
            onMovieClick={setSelectedMovie}
            isAuthenticated={isAuthenticated}
            onToggleWatchlist={toggleWatchlist}
            onToggleFavorite={toggleFavorite}
            isInWatchlist={isInWatchlist}
            isInFavorites={isInFavorites}
          />
        </div>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            isInWatchlist={isInWatchlist(selectedMovie.id)}
            isInFavorites={isInFavorites(selectedMovie.id)}
            isAuthenticated={isAuthenticated}
            onToggleWatchlist={toggleWatchlist}
            onToggleFavorite={toggleFavorite}
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
