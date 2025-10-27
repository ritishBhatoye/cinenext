"use client";

import { useState, useEffect } from "react";
import { type DropdownOption } from "@/components/elements/Dropdown";
import { Search, Film, Tv, Calendar } from "lucide-react";
import { SearchFilter } from "@/hooks/useSearch";
import SearchTitle from "./SearchTitle";
import SearchInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

interface SearchBarProps {
  query?: string;
  onQueryChange?: (query: string) => void;
  filter?: SearchFilter;
  onFilterChange?: (filter: SearchFilter) => void;
  onSearch?: () => void;
  isLoading?: boolean;
  showTitle?: boolean;
  selectedGenre?: string;
  onGenreChange?: (genre: string) => void;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
}

const SearchBar = ({
  query = "",
  onQueryChange,
  filter = "all",
  onFilterChange,
  onSearch,
  isLoading = false,
  showTitle = true,
  selectedGenre = "",
  onGenreChange,
  selectedYear = "",
  onYearChange,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(query);
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
      <SearchTitle show={showTitle} />

      <div className="w-full border border-netflix-light-gray rounded-xl p-6 bg-netflix-dark-gray/50 backdrop-blur-sm">
        <div className="space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={handleQueryChange}
            onEnter={handleSearch}
            isLoading={isLoading}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterDropdown
              label="Genre"
              options={genreOptions}
              value={selectedGenre}
              onChange={onGenreChange || (() => {})}
              placeholder="All genres"
              searchable
              disabled={isLoading}
            />

            <FilterDropdown
              label="Year"
              options={yearOptions}
              value={selectedYear}
              onChange={onYearChange || (() => {})}
              placeholder="Any year"
              disabled={isLoading}
            />

            <FilterDropdown
              label="Type"
              options={typeOptions}
              value={selectedType}
              onChange={handleTypeChange}
              placeholder="All content"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
