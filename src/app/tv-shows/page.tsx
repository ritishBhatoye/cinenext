"use client";

import Hero from "@/components/global/Hero";
import MediaRowSlider from "@/components/landing/MediaRowSlider";
import { useHomeContent } from "@/hooks/useHomeContent";

export default function TvShowsPage() {
  const { featured, top10, onlyOnNetflix, popular, genres, isLoading } =
    useHomeContent();

  const featuredMovie = featured?.data?.[0];
  //   console.log("Featured data:", featured);
  //   console.log("Top 10 data:", top10);
  const tvShowFilters = [
    { id: "most-popular", title: "Most Popular" },
    { id: "most-rating", title: "Most Rating" },
    { id: "most-recent", title: "Most Recent" },
    { id: "action-and-adventure", title: "Action & Adventure" },
    { id: "animation", title: "Animation" },
    { id: "comedy", title: "Comedy" },
    { id: "crime", title: "Crime" },
    { id: "documentary", title: "Documentary" },
    { id: "drama", title: "Drama" },
    { id: "family", title: "Family" },
    { id: "kids", title: "Kids" },
    { id: "mystery", title: "Mystery" },
    { id: "news", title: "News" },
    { id: "reality", title: "Reality" },
    { id: "sci-fi-and-fantasy", title: "Sci-Fi & Fantasy" },
    { id: "soap", title: "Soap" },
    { id: "talk", title: "Talk" },
    { id: "war-and-politics", title: "War and Politics" },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {featuredMovie && <Hero movie={featuredMovie} />}

      <div className="mx-auto space-y-12 p-8">
        <MediaRowSlider
          title="Top 10 Today"
          data={top10.movies ?? []}
          isLoading={isLoading}
        />
        <MediaRowSlider
          title="Only on Netflix"
          data={onlyOnNetflix.movies ?? []}
        />
        <MediaRowSlider
          title="Popular"
          data={popular.data ?? []}
          isLoading={isLoading}
        />
        <MediaRowSlider
          title="Action"
          data={genres.action ?? []}
          isLoading={isLoading}
        />
        <MediaRowSlider
          title="Comedy"
          data={genres.comedy ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
