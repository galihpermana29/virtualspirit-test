/**
 * Modal component for displaying detailed movie information
 */
import React from "react";
import { useMovieReviews } from "../hooks/useMovieReviews";
import { X, Star, Calendar, Clock, Bookmark, Heart } from "lucide-react";
import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isInWatchlist: boolean;
  isInFavorites?: boolean;
  isAuthenticated: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => Promise<void>;
}

export function MovieModal({
  movie,
  onClose,
  isInWatchlist,
  isAuthenticated,
  onToggleWatchlist,
  isInFavorites,
  onToggleFavorite,
}: MovieModalProps) {
  const { data: reviewsData, isLoading: isLoadingReviews } = useMovieReviews(
    movie.id
  );

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1c232a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-[#1c232a] z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white line-clamp-1">
            {movie.title}
          </h2>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => onToggleFavorite(movie)}
                className={`p-2 rounded-lg transition-colors ${
                  isInFavorites
                    ? "bg-[#00e054] text-[#14181c]"
                    : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
                }`}
                aria-label="Toggle watchlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => onToggleWatchlist(movie)}
                className={`p-2 rounded-lg transition-colors ${
                  isInWatchlist
                    ? "bg-[#00e054] text-[#14181c]"
                    : "bg-[#2c3440] text-gray-300 hover:bg-[#3d4754]"
                }`}
                aria-label="Toggle watchlist"
              >
                <Bookmark className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#2c3440] rounded-full text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="modal-scroll overflow-y-auto">
          {/* Poster and info */}
          <div className="relative">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-[#2c3440] flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-[#00e054] mr-1" />
                  <span className="font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{movie.vote_count} votes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="p-6">
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Reviews */}
          <div className="p-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Reviews</h3>
            {isLoadingReviews ? (
              <div className="text-center text-gray-400">
                Loading reviews...
              </div>
            ) : reviewsData?.results.length === 0 ? (
              <div className="text-center text-gray-400">No reviews yet</div>
            ) : (
              <div className="space-y-4">
                {reviewsData?.results.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-[#2c3440] p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0">
                        {review.author_details.avatar_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                            alt={review.author}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-[#3d4754] rounded-full flex items-center justify-center">
                            <span className="text-gray-300 text-sm">
                              {review.author[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-100">
                          {review.author}
                        </h4>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <span>
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                          {review.author_details.rating && (
                            <>
                              <span>•</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-[#00e054] mr-1" />
                                <span>{review.author_details.rating}/10</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 line-clamp-3">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
