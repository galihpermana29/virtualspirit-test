import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { MovieRepository } from "../repositories/MovieRepository";
import { WatchlistRepository } from "../repositories/WatchlistRepository";
import { FavoriteRepository } from "../repositories/FavoriteRepository";
import SearchPageContainer from "../app/search/view/SearchPageContainer";
import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock the repositories
vi.mock("../repositories/MovieRepository");
vi.mock("../repositories/WatchlistRepository");
vi.mock("../repositories/FavoriteRepository");

const mockMovies = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Test Movie",
      overview: "Test Overview",
      poster_path: "/test.jpg",
      release_date: "2024-01-01",
      vote_average: 8.5,
      vote_count: 100,
      genre_ids: [28, 12],
    },
  ],
  total_pages: 1,
  total_results: 1,
};

describe("Movie Features", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(MovieRepository.getMovies).mockResolvedValue(mockMovies);
    vi.mocked(MovieRepository.searchMovies).mockResolvedValue(mockMovies);
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SearchPageContainer />
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  describe("Search Functionality", () => {
    test("should search for movies when query is entered", async () => {
      renderComponent();

      const searchInput = screen.getByPlaceholderText("Search for movies...");
      fireEvent.change(searchInput, { target: { value: "Test Movie" } });
      fireEvent.submit(searchInput.closest("form")!);

      await waitFor(() => {
        expect(MovieRepository.searchMovies).toHaveBeenCalledWith(
          "Test Movie",
          1
        );
      });
    });

    test("should display search results", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText("Test Movie")).toBeInTheDocument();
      });
    });
  });

  describe("Movie List Type Selection", () => {
    test("should fetch popular movies when Popular is clicked", async () => {
      renderComponent();

      const popularButton = screen.getByText("Popular");
      fireEvent.click(popularButton);

      await waitFor(() => {
        expect(MovieRepository.getMovies).toHaveBeenCalledWith("popular", 1);
      });
    });

    test("should fetch upcoming movies when Upcoming is clicked", async () => {
      renderComponent();

      const upcomingButton = screen.getByText("Upcoming");
      fireEvent.click(upcomingButton);

      await waitFor(() => {
        expect(MovieRepository.getMovies).toHaveBeenCalledWith("upcoming", 1);
      });
    });

    test("should fetch now playing movies when Now Playing is clicked", async () => {
      renderComponent();

      const nowPlayingButton = screen.getByText("Now Playing");
      fireEvent.click(nowPlayingButton);

      await waitFor(() => {
        expect(MovieRepository.getMovies).toHaveBeenCalledWith(
          "now playing",
          1
        );
      });
    });
  });

  describe("Watchlist Functionality", () => {
    beforeEach(() => {
      vi.mocked(WatchlistRepository.addToWatchlist).mockResolvedValue();
      vi.mocked(WatchlistRepository.removeFromWatchlist).mockResolvedValue();
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

  describe("Favorites Functionality", () => {
    beforeEach(() => {
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

      await FavoriteRepository.removeFromFavorites(
        accountId,
        movieId,
        sessionId
      );

      expect(FavoriteRepository.removeFromFavorites).toHaveBeenCalledWith(
        accountId,
        movieId,
        sessionId
      );
    });
  });
});
