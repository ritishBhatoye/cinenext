"use client";

import { useState } from "react";
import Hero from "@/components/global/Hero";
import MediaItem from "@/components/landing/MediaRowSlider/MediaItem";
import { useGetTrendingTVShowsQuery } from "@/services/moviesApi";
import { useMediaFilters } from "@/hooks/useMediaFilters";
import { MEDIA_FILTERS, MediaFilterId } from "@/constants/filters";

export default function TvShowsPage() {
  const { data: featuredShows } = useGetTrendingTVShowsQuery();
  const [activeFilter, setActiveFilter] =
    useState<MediaFilterId>("most-popular");

  const { data: displayData, isLoading } = useMediaFilters(activeFilter, "tv");

  const featuredShow = featuredShows?.[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {featuredShow && <Hero movie={featuredShow} />}

      <div className="mx-auto space-y-8 p-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
          {MEDIA_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter.title}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {displayData?.map((media, index: number) => (
              <div key={media.id || index} className="aspect-2/3 relative">
                <MediaItem data={media} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
