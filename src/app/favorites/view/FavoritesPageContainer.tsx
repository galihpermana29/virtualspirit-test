import { MovieCard } from "../../../components/MovieCard";
import { MovieModal } from "../../../components/MovieModal";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../hooks/authContext";
import { useMovies } from "../../../hooks/useMovies";
import { useFavorites } from "../../../hooks/useFavorites";
import { useWatchlist } from "../../../hooks/useWatchlist";

const FavoritesPageContainer = () => {
  const { sessionId, account, isAuthenticated } = useAuth();

  const { favoritesData, isLoading, error, toggleFavorite, isInFavorites } =
    useFavorites(account?.id ?? null, sessionId);

  const { toggleWatchlist, isInWatchlist } = useWatchlist(
    account?.id ?? null,
    sessionId
  );

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
