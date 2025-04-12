import { MovieCard } from "../../../components/MovieCard";
import { MovieModal } from "../../../components/MovieModal";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../usecases/authContext";
import { useMovies } from "../../movie/usecase/useMovies";
import { useFavorites } from "../usecase/useFavorites";
import { useWatchlist } from "../../watchlist/usecase/useWatchlist";

const FavoritesPageContainer = () => {
  /**
   * Get the user's session ID and account details from the context
   */
  const { sessionId, account, isAuthenticated } = useAuth();

  /**
   * Get the user's favorites data and functions from the context
   */
  const { favoritesData, isLoading, error, toggleFavorite, isInFavorites } =
    useFavorites(account?.id ?? null, sessionId);

  /**
   * Get the user's watchlist data and functions from the context
   */
  const { toggleWatchlist, isInWatchlist } = useWatchlist(
    account?.id ?? null,
    sessionId
  );

  /**
   * Use the selected movie state from the movie context
   */
  const { setSelectedMovie, selectedMovie } = useMovies();

  return (
    <div>
      <div className="min-h-screen bg-[#14181c]">
        <Navbar />
        {isLoading && (
          <div className="text-center text-gray-400">Loading...</div>
        )}
        {!error && !isLoading && (
          <>
            <main className="max-w-7xl mx-auto px-4 py-6">
              {favoritesData?.results?.length! > 0 ? (
                <div className="movie-grid">
                  {favoritesData?.results.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={setSelectedMovie}
                      isInFavorites={true}
                      isInWatchlist={isInWatchlist(movie.id)}
                      isAuthenticated={true}
                      onToggleWatchlist={toggleWatchlist}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  Your favorites list is empty. Start adding movies!
                </div>
              )}
            </main>

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
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPageContainer;
