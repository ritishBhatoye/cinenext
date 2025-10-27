"use client";

import SearchBar from "@/components/global/SearchBar";
import MediaItem from "@/components/landing/MediaRowSlider/MediaItem";
import { useTodayTrending } from "@/hooks/useTodayTrending";

const SearchPage = () => {
  const { combined } = useTodayTrending();

  return (
    <div className="min-h-screen bg-black text-white w-9/12 mx-auto">
      <div className="pt-20 ">
        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {combined?.data?.map((media, index: number) => (
            <div key={index} className="aspect-[2/3] relative">
              <MediaItem data={media} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
