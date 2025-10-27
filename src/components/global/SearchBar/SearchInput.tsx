"use client";

import { Input } from "@/components/elements/Input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onEnter,
  isLoading = false,
  placeholder = "Search movies and TV shows...",
}: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-netflix-text-muted" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 text-base"
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
