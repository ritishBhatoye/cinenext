"use client";

import { useState } from "react";
import { useSearch, SearchFilter } from "@/hooks/useSearch";
import { Text } from "@/components/atoms";

/**
 * Example component demonstrating how to use the useSearch hook
 * This shows both auto-search and manual search functionality
 */
const SearchExample = () => {
  const [searchMode, setSearchMode] = useState<"auto" | "manual">("manual");

  // Auto-search example
  const autoSearch = useSearch({
    autoSearch: true,
    debounceMs: 300,
    minQueryLength: 2,
  });

  // Manual search example
  const manualSearch = useSearch({
    autoSearch: false,
    minQueryLength: 1,
  });

  const currentSearch = searchMode === "auto" ? autoSearch : manualSearch;

  const handleFilterChange = (filter: SearchFilter) => {
    currentSearch.setFilter(filter);
    if (currentSearch.query && searchMode === "manual") {
      currentSearch.search();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <Text as="h2" className="text-2xl font-bold mb-6">
        Search Hook Example
      </Text>

      {/* Search Mode Toggle */}
      <div className="mb-6">
        <Text as="h3" className="text-lg font-semibold mb-2">
          Search Mode:
        </Text>
        <div className="flex gap-4">
          <button
            onClick={() => setSearchMode("auto")}
            className={`px-4 py-2 rounded ${
              searchMode === "auto"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Auto Search
          </button>
          <button
            onClick={() => setSearchMode("manual")}
            className={`px-4 py-2 rounded ${
              searchMode === "manual"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Manual Search
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={currentSearch.query}
          onChange={(e) => currentSearch.setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && searchMode === "manual") {
              currentSearch.search();
            }
          }}
          placeholder={`Type to search ${
            searchMode === "auto" ? "(auto)" : "(press Enter or click Search)"
          }...`}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Search Button (for manual mode) */}
      {searchMode === "manual" && (
        <div className="mb-4">
          <button
            onClick={currentSearch.search}
            disabled={currentSearch.query.length === 0}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Search
          </button>
          <button
            onClick={currentSearch.clearSearch}
            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Filter Options */}
      <div className="mb-6">
        <Text as="h3" className="text-lg font-semibold mb-2">
          Filter by:
        </Text>
        <div className="flex gap-2 flex-wrap">
          {(["all", "movies", "tv", "people"] as SearchFilter[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentSearch.filter === filter
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Search Status */}
      <div className="mb-4">
        {currentSearch.isLoading && (
          <Text className="text-blue-400">Searching...</Text>
        )}
        {currentSearch.isError && (
          <Text className="text-red-400">Error occurred while searching</Text>
        )}
        {currentSearch.hasSearched && !currentSearch.isLoading && (
          <Text className="text-gray-300">
            Found {currentSearch.totalResults} results for &quot;
            {currentSearch.query}&quot;
          </Text>
        )}
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {currentSearch.results.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <Text as="h4" className="text-lg font-semibold text-white">
                  {"title" in item
                    ? item.title
                    : "name" in item
                    ? item.name
                    : "Unknown"}
                </Text>
                <Text className="text-gray-400 text-sm">
                  Type: {item.media_type || "Unknown"}
                </Text>
                {"overview" in item && item.overview && (
                  <Text className="text-gray-300 text-sm mt-2">
                    {item.overview.substring(0, 150)}
                    {item.overview.length > 150 ? "..." : ""}
                  </Text>
                )}
              </div>
              {"vote_average" in item && item.vote_average && (
                <div className="text-yellow-400 font-semibold">
                  ⭐ {item.vote_average.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {currentSearch.hasSearched &&
        !currentSearch.isLoading &&
        currentSearch.results.length === 0 && (
          <div className="text-center py-8">
            <Text className="text-gray-400">
              No results found for &quot;{currentSearch.query}&quot;
            </Text>
            <Text className="text-gray-500 text-sm mt-2">
              Try adjusting your search terms or changing the filter
            </Text>
          </div>
        )}
    </div>
  );
};

export default SearchExample;
