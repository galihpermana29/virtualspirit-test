import { FavoriteRepository } from "../app/favorites/repositories/FavoriteRepository";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../app/favorites/repositories/FavoriteRepository");

describe("Favorites Functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(FavoriteRepository.addToFavorites).mockResolvedValue();
    vi.mocked(FavoriteRepository.removeFromFavorites).mockResolvedValue();
  });

  test("should add movie to favorites", async () => {
    const accountId = 123;
    const sessionId = "test-session";
    const movieId = 1;

    await FavoriteRepository.addToFavorites(accountId, movieId, sessionId);

    expect(FavoriteRepository.addToFavorites).toHaveBeenCalledWith(
      accountId,
      movieId,
      sessionId
    );
  });

  test("should remove movie from favorites", async () => {
    const accountId = 123;
    const sessionId = "test-session";
    const movieId = 1;

    await FavoriteRepository.removeFromFavorites(accountId, movieId, sessionId);

    expect(FavoriteRepository.removeFromFavorites).toHaveBeenCalledWith(
      accountId,
      movieId,
      sessionId
    );
  });
});
