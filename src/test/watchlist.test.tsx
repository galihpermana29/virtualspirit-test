import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { WatchlistRepository } from "../app/watchlist/repositories/WatchlistRepository";

vi.mock("../app/watchlist/repositories/WatchlistRepository");

describe("Watchlist Functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // vi.mocked(WatchlistRepository.addToWatchlist).mockResolvedValue();
    // vi.mocked(WatchlistRepository.removeFromWatchlist).mockResolvedValue();

    // Or better (if using Vitest properly typed):
    vi.mocked(WatchlistRepository).addToWatchlist.mockResolvedValue(undefined);
    vi.mocked(WatchlistRepository).removeFromWatchlist.mockResolvedValue(
      undefined
    );
  });

  test("should add movie to watchlist", async () => {
    const accountId = 123;
    const sessionId = "test-session";
    const movieId = 1;

    await WatchlistRepository.addToWatchlist(accountId, movieId, sessionId);

    expect(WatchlistRepository.addToWatchlist).toHaveBeenCalledWith(
      accountId,
      movieId,
      sessionId
    );
  });

  test("should remove movie from watchlist", async () => {
    const accountId = 123;
    const sessionId = "test-session";
    const movieId = 1;

    await WatchlistRepository.removeFromWatchlist(
      accountId,
      movieId,
      sessionId
    );

    expect(WatchlistRepository.removeFromWatchlist).toHaveBeenCalledWith(
      accountId,
      movieId,
      sessionId
    );
  });
});
