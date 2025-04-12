/**
 * Repository class for handling watchlist-related API operations
 */
import { apiURL, tmdbAPIKey } from "../../../models/variables";
import { WatchlistResponse, WatchlistResponseSchema } from "../models/types";

export class WatchlistRepository {
  private static readonly API_KEY = tmdbAPIKey;
  private static readonly BASE_URL = apiURL;

  /**
   * Adds a movie to user's watchlist
   */
  static async addToWatchlist(
    accountId: number,
    movieId: number,
    sessionId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/watchlist?api_key=${this.API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add movie to watchlist");
    }
  }

  /**
   * Removes a movie from user's watchlist
   */
  static async removeFromWatchlist(
    accountId: number,
    movieId: number,
    sessionId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/watchlist?api_key=${this.API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove movie from watchlist");
    }
  }

  /**
   * Fetches user's watchlist
   */
  static async getWatchlist(
    accountId: number,
    sessionId: string,
    page = 1
  ): Promise<WatchlistResponse> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/watchlist/movies?api_key=${this.API_KEY}&session_id=${sessionId}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch watchlist");
    }

    const data = await response.json();
    return WatchlistResponseSchema.parse(data);
  }
}
