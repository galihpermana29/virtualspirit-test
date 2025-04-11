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

describe("Search Functionality", () => {
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
