import { MovieCard } from "../../../components/MovieCard";
import { MovieModal } from "../../../components/MovieModal";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../hooks/useAuth";
import { useMovies } from "../../../hooks/useMovies";
import { useWatchlist } from "../../../hooks/useWatchlist";

const WishlistPageContainer = () => {
  const { sessionId, account, isAuthenticated } = useAuth();

  const { watchlistData, isLoading, error, toggleWatchlist, isInWatchlist } =
    useWatchlist(account?.id ?? null, sessionId);

  const { setSelectedMovie, selectedMovie } = useMovies();

  if (isLoading) {
    return (
      <div className="text-center text-gray-400">Loading watchlist...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        An error occurred while fetching your watchlist
      </div>
    );
  }

  if (!watchlistData?.results.length) {
    return (
      <div className="text-center text-gray-400">
        Your watchlist is empty. Start adding movies!
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-[#14181c]">
        <Navbar />
        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="movie-grid">
            {watchlistData.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
                isInWatchlist={true}
                isAuthenticated={true}
                onToggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        </main>

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
      </div>
    </div>
  );
};

export default WishlistPageContainer;
