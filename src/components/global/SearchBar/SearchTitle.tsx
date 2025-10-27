"use client";

import { Text } from "@/components/atoms";

interface SearchTitleProps {
  show: boolean;
}

const SearchTitle = ({ show }: SearchTitleProps) => {
  if (!show) {return null;}

  return (
    <>
      <Text as="h1" className="text-white font-bold text-5xl">
        Discover Your Next Favorite
      </Text>
      <Text as="h5" className="text-gray-400 font-medium text-lg">
        Search through thousands of movies, TV shows, and anime series
      </Text>
    </>
  );
};

export default SearchTitle;
