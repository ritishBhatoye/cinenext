"use client";

import Hero from "@/components/global/Hero";
import MediaRowSlider from "@/components/landing/MediaRowSlider";
import { useNewAndPopular } from "@/hooks/useNewAndPopular";

export default function NewAndPopularPage() {
  const { trending, upcoming, nowPlaying, popular } = useNewAndPopular();

  const featuredContent = trending.movies?.[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {featuredContent && <Hero movie={featuredContent} />}

      <div className="mx-auto space-y-12 p-8">
        {/* Trending Movies */}
        <MediaRowSlider
          title="Trending Movies"
          data={trending.movies ?? []}
          isLoading={trending.isLoading}
        />

        {/* Trending TV Shows */}
        <MediaRowSlider
          title="Trending TV Shows"
          data={trending.tvShows ?? []}
          isLoading={trending.isLoading}
        />

        {/* Now Playing in Theaters */}
        <MediaRowSlider
          title="Now Playing in Theaters"
          data={nowPlaying.movies ?? []}
          isLoading={nowPlaying.isLoading}
        />

        {/* Coming Soon */}
        <MediaRowSlider
          title="Coming Soon"
          data={upcoming.movies ?? []}
          isLoading={upcoming.isLoading}
        />

        {/* Popular Movies */}
        <MediaRowSlider
          title="Popular Movies"
          data={popular.movies ?? []}
          isLoading={popular.isLoading}
        />

        {/* Popular TV Shows */}
        <MediaRowSlider
          title="Popular TV Shows"
          data={popular.tvShows ?? []}
          isLoading={popular.isLoading}
        />
      </div>
    </div>
  );
}
