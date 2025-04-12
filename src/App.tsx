/**
 * Main application component
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route } from "react-router-dom";

import SearchPageContainer from "./app/movie/view/SearchPageContainer";
import WishlistPageContainer from "./app/watchlist/view/WishlistPageContainer";
import { AuthProvider } from "./usecases/authContext";
import FavoritesPageContainer from "./app/favorites/view/FavoritesPageContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SearchPageContainer />} />
          <Route path="/wishlist" element={<WishlistPageContainer />} />
          <Route path="/favorite" element={<FavoritesPageContainer />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
