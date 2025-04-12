/**
 * Repository class for handling movie-related API operations
 */
import {
  MovieSearchResponse,
  MovieSearchResponseSchema,
  MovieListType,
  ReviewsResponse,
  ReviewsResponseSchema,
} from "../models/types";

export class MovieRepository {
  private static readonly API_KEY = "4af3e2d03c3c2718eca6d1f809a1a79d";
  private static readonly BASE_URL = "https://api.themoviedb.org/3";

  /**
   * Searches for movies based on a query string
   */
  static async searchMovies(
    query: string,
    page = 1
  ): Promise<MovieSearchResponse> {
    const response = await fetch(
      `${this.BASE_URL}/search/movie?api_key=${
        this.API_KEY
      }&query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return MovieSearchResponseSchema.parse(data);
  }

  /**
   * Fetches movies based on list type (popular, upcoming, etc.)
   */
  static async getMovies(
    type: MovieListType,
    page = 1
  ): Promise<MovieSearchResponse> {
    const endpoint =
      type === "popular"
        ? "/movie/popular"
        : type === "upcoming"
        ? "/movie/upcoming"
        : "/movie/now_playing";

    const response = await fetch(
      `${this.BASE_URL}${endpoint}?api_key=${this.API_KEY}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return MovieSearchResponseSchema.parse(data);
  }

  /**
   * Fetches reviews for a specific movie
   */
  static async getMovieReviews(movieId: number): Promise<ReviewsResponse> {
    const response = await fetch(
      `${this.BASE_URL}/movie/${movieId}/reviews?api_key=${this.API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await response.json();
    return ReviewsResponseSchema.parse(data);
  }
}
