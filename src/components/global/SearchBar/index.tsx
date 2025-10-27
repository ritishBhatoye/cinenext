"use client";

import { useState } from "react";
import { Input } from "@/components/elements/Input";
import { Dropdown, type DropdownOption } from "@/components/elements/Dropdown";
import { Search, Film, Tv, Calendar } from "lucide-react";
import { Text } from "@/components/atoms";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
    { value: "movie", label: "Movies", icon: <Film className="w-4 h-4" /> },
    { value: "tv", label: "TV Shows", icon: <Tv className="w-4 h-4" /> },
  ];

  const handleSearch = () => {
    // Handle search logic here
    console.log("Search:", {
      searchQuery,
      selectedGenre,
      selectedYear,
      selectedType,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-6/12 mx-auto">
      <Text as="h1" className="text-white font-bold text-5xl">
        Discover Your Next Favorite
      </Text>
      <Text
        as="h5"
        variant="netflix"
        className="text-gray-400 font-medium text-lg"
      >
        Search through thousands of movies, TV shows, and anime series
      </Text>
      <div className="w-full border border-netflix-light-gray rounded-xl p-6 bg-netflix-dark-gray/50 backdrop-blur-sm">
        <div className="space-y-4 ">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-netflix-text-muted" />
            <Input
              type="text"
              placeholder="Search movies and TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
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
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-netflix-text-secondary">
                Type
              </label>
              <Dropdown
                options={typeOptions}
                value={selectedType}
                onChange={setSelectedType}
                placeholder="Movies & TV"
                clearable
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
