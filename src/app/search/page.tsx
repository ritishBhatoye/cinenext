"use client";

import SearchBar from "@/components/global/SearchBar";
import MediaItem from "@/components/landing/MediaRowSlider/MediaItem";
import { useTodayTrending } from "@/hooks/useTodayTrending";

const SearchPage = () => {
  const { combined, isLoading, isError } = useTodayTrending();

  return (
    <div className="pt-20 gap-10 w-9/12 flex-col items-center flex mx-auto">
      <div className="w-8/12">
        <SearchBar />
      </div>
      <div className="w-full flex flex-wrap gap-4 justify-start">
        {combined?.data?.map((media, index: number) => (
          <MediaItem key={index} data={media} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
