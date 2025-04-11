import { FavoriteResponse, FavoriteResponseSchema } from "../types/movie";

export class FavoriteRepository {
  private static readonly API_KEY = "4af3e2d03c3c2718eca6d1f809a1a79d";
  private static readonly BASE_URL = "https://api.themoviedb.org/3";

  static async addToFavorites(
    accountId: number,
    movieId: number,
    sessionId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/favorite?api_key=${this.API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add movie to favorites");
    }
  }

  static async removeFromFavorites(
    accountId: number,
    movieId: number,
    sessionId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/favorite?api_key=${this.API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove movie from favorites");
    }
  }

  static async getFavorites(
    accountId: number,
    sessionId: string,
    page = 1
  ): Promise<FavoriteResponse> {
    const response = await fetch(
      `${this.BASE_URL}/account/${accountId}/favorite/movies?api_key=${this.API_KEY}&session_id=${sessionId}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    const data = await response.json();
    return FavoriteResponseSchema.parse(data);
  }
}
