/**
 * Repository class for handling authentication-related API operations
 */
import {
  AuthToken,
  AuthTokenSchema,
  Session,
  SessionSchema,
  Account,
  AccountSchema,
} from "../models/movie";
import { apiURL, tmdbAPIKey } from "../models/variables";

export class AuthRepository {
  private static readonly API_KEY = tmdbAPIKey;
  private static readonly BASE_URL = apiURL;

  /**
   * Creates a new request token for authentication
   */
  static async createRequestToken(): Promise<AuthToken> {
    const response = await fetch(
      `${this.BASE_URL}/authentication/token/new?api_key=${this.API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to create request token");
    }

    const data = await response.json();
    return AuthTokenSchema.parse(data);
  }

  /**
   * Creates a new session using an approved request token
   */
  static async createSession(requestToken: string): Promise<Session> {
    const response = await fetch(
      `${this.BASE_URL}/authentication/session/new?api_key=${this.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    const data = await response.json();
    return SessionSchema.parse(data);
  }

  /**
   * Fetches account details for an authenticated user
   */
  static async getAccount(sessionId: string): Promise<Account> {
    const response = await fetch(
      `${this.BASE_URL}/account?api_key=${this.API_KEY}&session_id=${sessionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch account details");
    }

    const data = await response.json();
    return AccountSchema.parse(data);
  }
}
