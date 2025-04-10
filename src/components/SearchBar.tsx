/**
 * Search bar component for movie search
 */
import React, { useState } from "react";
import { Search } from "lucide-react";
import { MovieListType } from "../types/movie";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: MovieListType) => void;
}

export function SearchBar({ onSearch, onTypeChange }: SearchBarProps) {
  const [query, setQuery] = useState("");
  //get search query from url
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      //add to query url ?search=query
      window.history.pushState({}, document.title, `?search=${query}`);
    }
  };

  const handleClear = () => {
    onTypeChange("popular");
    setQuery("");

    //clear query search
    window.history.pushState({}, document.title, `/`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="relative w-[100%] lg:w-[80%] mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 pl-10 bg-[#2c3440] text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00e054] focus:border-transparent placeholder-gray-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        {searchQuery && searchQuery !== "" && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1.5 px-4 py-1 bg-[#00e054] text-[#14181c] rounded-md hover:bg-[#00b344] transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
