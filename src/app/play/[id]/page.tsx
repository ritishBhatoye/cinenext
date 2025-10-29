"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  useGetMovieDetailsQuery,
  useGetTVShowDetailsQuery,
} from "@/services/moviesApi";
import { Play, Star, Clock, Calendar, Plus, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const PlayPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const type = searchParams.get("type") || "movie";
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const { data: movieData, isLoading: movieLoading } = useGetMovieDetailsQuery(
    Number(id),
    { skip: type !== "movie" }
  );

  const { data: tvData, isLoading: tvLoading } = useGetTVShowDetailsQuery(
    Number(id),
    { skip: type !== "tv" }
  );

  const data = type === "movie" ? movieData : tvData;
  const isLoading = type === "movie" ? movieLoading : tvLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl">Content not found</div>
      </div>
    );
  }

  const title =
    type === "movie"
      ? (data as MovieDetails).title
      : (data as TVShowDetails).name;
  const releaseDate =
    type === "movie"
      ? (data as MovieDetails).release_date
      : (data as TVShowDetails).first_air_date;
  const runtime =
    type === "movie"
      ? (data as MovieDetails).runtime
      : (data as TVShowDetails).episode_run_time?.[0] || 45;

  // VidKing API embed URL
  const embedUrl = `https://www.vidking.net/embed/${type}/${id}`;

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={title}
        />
      </div>

      {/* Content Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title and Actions */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {data.tagline && (
              <p className="text-gray-400 italic text-lg">{data.tagline}</p>
            )}
          </div>
          <button
            onClick={() => setIsInWatchlist(!isInWatchlist)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition"
          >
            {isInWatchlist ? (
              <>
                <Check size={20} />
                In Watchlist
              </>
            ) : (
              <>
                <Plus size={20} />
                Add to Watchlist
              </>
            )}
          </button>
        </div>

        {/* Meta Information */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" size={20} fill="currentColor" />
            <span className="font-semibold">
              {data.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">
              ({data.vote_count.toLocaleString()} votes)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            <span>{new Date(releaseDate).getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-400" />
            <span>{runtime} min</span>
          </div>
          <div className="px-3 py-1 border border-gray-600 rounded text-xs">
            {data.status}
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {data.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-4 py-2 bg-netflix-red/20 text-netflix-red rounded-full text-sm font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {data.overview}
          </p>
        </div>

        {/* Cast */}
        {data.credits?.cast && data.credits.cast.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.credits.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="aspect-2/3 bg-gray-800 rounded-lg mb-2 overflow-hidden relative">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-sm">{actor.name}</p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Content */}
        {data.similar?.results && data.similar.results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.similar.results.slice(0, 6).map((item) => {
                const itemTitle =
                  type === "movie"
                    ? (item as FeaturedMovieProps).title
                    : (item as TVShowProps).name;
                return (
                  <a
                    key={item.id}
                    href={`/play/${item.id}?type=${type}`}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-2/3 bg-gray-800 rounded-lg overflow-hidden mb-2 relative">
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                          alt={itemTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play size={40} fill="white" />
                      </div>
                    </div>
                    <p className="font-medium text-sm line-clamp-2">
                      {itemTitle}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayPage;
