"use client";

import { useState } from "react";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { Film, Tv, Star, Calendar } from "lucide-react";

// Example usage of the Dropdown component
export function DropdownExample() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const genreOptions: DropdownOption[] = [
    { value: "action", label: "Action", icon: <Star className="w-4 h-4" /> },
    { value: "comedy", label: "Comedy", icon: <Star className="w-4 h-4" /> },
    { value: "drama", label: "Drama", icon: <Star className="w-4 h-4" /> },
    { value: "horror", label: "Horror", icon: <Star className="w-4 h-4" /> },
    {
      value: "sci-fi",
      label: "Science Fiction",
      icon: <Star className="w-4 h-4" />,
    },
    { value: "romance", label: "Romance", icon: <Star className="w-4 h-4" /> },
    {
      value: "thriller",
      label: "Thriller",
      icon: <Star className="w-4 h-4" />,
    },
  ];

  const yearOptions: DropdownOption[] = [
    { value: "2024", label: "2024", icon: <Calendar className="w-4 h-4" /> },
    { value: "2023", label: "2023", icon: <Calendar className="w-4 h-4" /> },
    { value: "2022", label: "2022", icon: <Calendar className="w-4 h-4" /> },
    { value: "2021", label: "2021", icon: <Calendar className="w-4 h-4" /> },
    { value: "2020", label: "2020", icon: <Calendar className="w-4 h-4" /> },
  ];

  const typeOptions: DropdownOption[] = [
    { value: "movie", label: "Movies", icon: <Film className="w-4 h-4" /> },
    { value: "tv", label: "TV Shows", icon: <Tv className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 p-6 max-w-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Dropdown Examples
      </h2>

      {/* Basic Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Genre</label>
        <Dropdown
          options={genreOptions}
          value={selectedGenre}
          onChange={setSelectedGenre}
          placeholder="Select a genre..."
          clearable
        />
      </div>

      {/* Searchable Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Year (Searchable)
        </label>
        <Dropdown
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
          placeholder="Search or select year..."
          searchable
          clearable
        />
      </div>

      {/* Different Variants */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Content Type</label>
        <Dropdown
          options={typeOptions}
          value={selectedType}
          onChange={setSelectedType}
          placeholder="Select content type..."
          variant="outline"
          triggerSize="lg"
        />
      </div>

      {/* Ghost Variant */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Ghost Style</label>
        <Dropdown
          options={genreOptions}
          placeholder="Ghost dropdown..."
          variant="ghost"
          triggerSize="sm"
        />
      </div>

      {/* Custom Render */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Custom Render</label>
        <Dropdown
          options={genreOptions}
          placeholder="Custom styled..."
          renderOption={(option, isSelected) => (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {option.icon}
                <span className={isSelected ? "font-semibold" : ""}>
                  {option.label}
                </span>
              </div>
              {isSelected && <span className="text-xs text-primary">✓</span>}
            </div>
          )}
        />
      </div>

      {/* Display Selected Values */}
      <div className="mt-6 p-4 bg-netflix-dark-gray rounded-lg">
        <h3 className="text-sm font-medium text-white mb-2">
          Selected Values:
        </h3>
        <div className="space-y-1 text-sm text-netflix-text-secondary">
          <div>Genre: {selectedGenre || "None"}</div>
          <div>Year: {selectedYear || "None"}</div>
          <div>Type: {selectedType || "None"}</div>
        </div>
      </div>
    </div>
  );
}
