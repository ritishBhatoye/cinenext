"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/elements/Input";
import { Dropdown, type DropdownOption } from "@/components/elements/Dropdown";
import { Search, Film, Tv, Calendar } from "lucide-react";
import { Text } from "@/components/atoms";
import { SearchFilter } from "@/hooks/useSearch";

interface SearchBarProps {
  query?: string;
  onQueryChange?: (query: string) => void;
  filter?: SearchFilter;
  onFilterChange?: (filter: SearchFilter) => void;
  onSearch?: () => void;
  isLoading?: boolean;
  showTitle?: boolean;
}

const SearchBar = ({
  query = "",
  onQueryChange,
  filter = "all",
  onFilterChange,
  onSearch,
  isLoading = false,
  showTitle = true,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState(
    filter === "all" ? "" : filter
  );

  // Sync internal state with props
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    setSelectedType(filter === "all" ? "" : filter);
  }, [filter]);

  const genreOptions: DropdownOption[] = [
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "romance", label: "Romance" },
    { value: "thriller", label: "Thriller" },
    { value: "animation", label: "Animation" },
    { value: "documentary", label: "Documentary" },
  ];

  const yearOptions: DropdownOption[] = [
    { value: "2024", label: "2024", icon: <Calendar className="w-4 h-4" /> },
    { value: "2023", label: "2023", icon: <Calendar className="w-4 h-4" /> },
    { value: "2022", label: "2022", icon: <Calendar className="w-4 h-4" /> },
    { value: "2021", label: "2021", icon: <Calendar className="w-4 h-4" /> },
    { value: "2020", label: "2020", icon: <Calendar className="w-4 h-4" /> },
    { value: "2019", label: "2019", icon: <Calendar className="w-4 h-4" /> },
    { value: "2018", label: "2018", icon: <Calendar className="w-4 h-4" /> },
  ];

  const typeOptions: DropdownOption[] = [
    { value: "", label: "All", icon: <Search className="w-4 h-4" /> },
    { value: "movies", label: "Movies", icon: <Film className="w-4 h-4" /> },
    { value: "tv", label: "TV Shows", icon: <Tv className="w-4 h-4" /> },
  ];

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
    onQueryChange?.(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    const filterValue: SearchFilter =
      value === "" ? "all" : (value as SearchFilter);
    onFilterChange?.(filterValue);
  };

  const handleSearch = () => {
    onSearch?.();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mx-auto">
      {showTitle && (
        <>
          <Text as="h1" className="text-white font-bold text-5xl">
            Discover Your Next Favorite
          </Text>
          <Text as="h5" className="text-gray-400 font-medium text-lg">
            Search through thousands of movies, TV shows, and anime series
          </Text>
        </>
      )}
      <div className="w-full border border-netflix-light-gray rounded-xl p-6 bg-netflix-dark-gray/50 backdrop-blur-sm">
        <div className="space-y-4 ">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-netflix-text-muted" />
            <Input
              type="text"
              placeholder="Search movies and TV shows..."
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="pl-10 h-12 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-netflix-text-secondary">
                Genre
              </label>
              <Dropdown
                options={genreOptions}
                value={selectedGenre}
                onChange={setSelectedGenre}
                placeholder="All genres"
                searchable
                clearable
                variant="outline"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-netflix-text-secondary">
                Year
              </label>
              <Dropdown
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
                placeholder="Any year"
                clearable
                variant="outline"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-netflix-text-secondary">
                Type
              </label>
              <Dropdown
                options={typeOptions}
                value={selectedType}
                onChange={handleTypeChange}
                placeholder="All content"
                clearable
                variant="outline"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
