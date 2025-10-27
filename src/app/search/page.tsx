"use client";

import SearchBar from "@/components/global/SearchBar";
import MediaItem from "@/components/landing/MediaRowSlider/MediaItem";
import { useTodayTrending } from "@/hooks/useTodayTrending";
import { Text } from "@/components/atoms/index";
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
        <div className="flex flex-col items-start gap-3 pb-4">
          <div className="flex-row flex items-center gap-2">
            <div className="w-2 h-10 rounded-full bg-linear-to-b from-red-800 via-red-500 to-red-400"></div>

            <Text as="h3" className=" text-2xl   text-white font-bold">
              Trending Today
            </Text>
          </div>
          <Text as="p" className="text-gray-400">
            {combined?.data?.length} results found
          </Text>
        </div>
        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {combined?.data?.map((media, index: number) => (
            <div key={index} className="aspect-2/3 relative">
              <MediaItem data={media} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
