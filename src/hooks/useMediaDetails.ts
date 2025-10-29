"use client";

import {
  useGetMovieDetailsQuery,
  useGetTVShowDetailsQuery,
} from "@/services/moviesApi";

export const useMediaDetails = (id: number, type: "movie" | "tv") => {
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
  } = useGetMovieDetailsQuery(id, { skip: type !== "movie" });

  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = useGetTVShowDetailsQuery(id, { skip: type !== "tv" });

  const data = type === "movie" ? movieData : tvData;
  const isLoading = type === "movie" ? movieLoading : tvLoading;
  const error = type === "movie" ? movieError : tvError;

  // Extract common properties
  const title = data
    ? type === "movie"
      ? (data as MovieDetails).title
      : (data as TVShowDetails).name
    : "";
  const releaseDate = data
    ? type === "movie"
      ? (data as MovieDetails).release_date
      : (data as TVShowDetails).first_air_date
    : "";
  const runtime = data
    ? type === "movie"
      ? (data as MovieDetails).runtime
      : (data as TVShowDetails).episode_run_time?.[0] || 45
    : 0;

  return {
    data,
    isLoading,
    error,
    title,
    releaseDate,
    runtime,
  };
};
