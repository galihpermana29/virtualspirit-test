import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { MovieRepository } from "../repositories/MovieRepository";
import SearchPageContainer from "../app/search/view/SearchPageContainer";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { AuthProvider } from "../hooks/authContext";
import "@testing-library/jest-dom";

vi.mock("../repositories/MovieRepository");

const mockMovies = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Test Movie",
      overview: "",
      poster_path: "",
      release_date: "",
      vote_average: 8.5,
      vote_count: 100,
      genre_ids: [],
    },
  ],
  total_pages: 1,
  total_results: 1,
};

describe("Movie List Type Selection", () => {
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
          <AuthProvider>
            <SearchPageContainer />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  test("should fetch popular movies when Popular is clicked", async () => {
    renderComponent();

    const button = screen.getByText("Popular");
    fireEvent.click(button);

    await waitFor(() => {
      expect(MovieRepository.getMovies).toHaveBeenCalledWith("popular", 1);
    });
  });

  test("should fetch upcoming movies when Upcoming is clicked", async () => {
    renderComponent();

    const button = screen.getByText("Upcoming");
    fireEvent.click(button);

    await waitFor(() => {
      expect(MovieRepository.getMovies).toHaveBeenCalledWith("upcoming", 1);
    });
  });

  test("should fetch now playing movies when Now Playing is clicked", async () => {
    renderComponent();

    const button = screen.getByText("Now Playing");
    fireEvent.click(button);

    await waitFor(() => {
      expect(MovieRepository.getMovies).toHaveBeenCalledWith("now playing", 1);
    });
  });
});
