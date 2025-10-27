"use client";

import { useState } from "react";
import SearchBar from "@/components/global/SearchBar";
import MediaItem from "@/components/landing/MediaRowSlider/MediaItem";
import { useTodayTrending } from "@/hooks/useTodayTrending";
import { useSearch } from "@/hooks/useSearch";
import { Text } from "@/components/atoms/index";

const SearchPage = () => {
  const { combined } = useTodayTrending();
  const {
    query,
    setQuery,
    filter,
    setFilter,
    results,
    hasSearched,
    isLoading,
    totalResults,
    search,
  } = useSearch({
    autoSearch: true,
  });

  // Additional filter states managed in the page
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Show search results if user has searched, otherwise show trending
  const displayData = hasSearched ? results : combined?.data;
  const displayTitle = hasSearched ? "Search Results" : "Trending Today";
  const displayCount = hasSearched ? totalResults : combined?.data?.length;

  return (
    <div className="min-h-screen bg-black text-white w-9/12 mx-auto">
      <div className="pt-20 ">
        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              filter={filter}
              onFilterChange={setFilter}
              onSearch={search}
              isLoading={isLoading}
              showTitle={!hasSearched}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 pb-4">
          <div className="flex-row flex items-center gap-2">
            <div className="w-2 h-10 rounded-full bg-linear-to-b from-red-800 via-red-500 to-red-400"></div>
            <Text as="h3" className=" text-2xl   text-white font-bold">
              {displayTitle}
              {hasSearched && query && ` for "${query}"`}
            </Text>
          </div>
          <Text as="p" className="text-gray-400">
            {isLoading ? "Searching..." : `${displayCount || 0} results found`}
          </Text>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {displayData?.map((media, index: number) => (
            <div key={media.id || index} className="aspect-2/3 relative">
              <MediaItem data={media as FeaturedMovieProps | TVShowProps} />
            </div>
          ))}
        </div>

        {/* No results message */}
        {hasSearched && !isLoading && displayData?.length === 0 && (
          <div className="text-center py-20">
            <Text as="p" className="text-gray-400 text-lg">
              No results found for &quot;{query}&quot;
            </Text>
            <Text as="p" className="text-gray-500 text-sm mt-2">
              Try adjusting your search terms or browse trending content above
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
