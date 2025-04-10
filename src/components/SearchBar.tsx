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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    onTypeChange("popular");
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 pl-10 bg-[#2c3440] text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00e054] focus:border-transparent placeholder-gray-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        {query && query !== "" && (
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
