import { MovieCard } from "../../../components/MovieCard";
import { MovieModal } from "../../../components/MovieModal";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../usecases/authContext";
import { useMovies } from "../../movie/usecase/useMovies";
import { useWatchlist } from "../usecase/useWatchlist";

const WishlistPageContainer = () => {
  const { sessionId, account, isAuthenticated } = useAuth();

  const { watchlistData, isLoading, error, toggleWatchlist, isInWatchlist } =
    useWatchlist(account?.id ?? null, sessionId);

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
            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
              {watchlistData?.results?.length! > 0 ? (
                <div className="movie-grid">
                  {watchlistData?.results?.map((movie) => (
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
              ) : (
                <div className="text-center text-gray-400 w-full">
                  Your favorites list is empty. Start adding movies!
                </div>
              )}
            </main>

            {/* Movie modal */}
            {selectedMovie && (
              <MovieModal
                onToggleFavorite={toggleWatchlist}
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
                isInWatchlist={isInWatchlist(selectedMovie.id)}
                isAuthenticated={isAuthenticated}
                onToggleWatchlist={toggleWatchlist}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPageContainer;
