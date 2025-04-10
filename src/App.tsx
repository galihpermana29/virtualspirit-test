/**
 * Main application component
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Routes, Route } from "react-router-dom";

import SearchPageContainer from "./app/search/view/SearchPageContainer";
import WishlistPageContainer from "./app/wishlist/view/WishlistPageContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<SearchPageContainer />} />
        <Route path="/wishlist" element={<WishlistPageContainer />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
