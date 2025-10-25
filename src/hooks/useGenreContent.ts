import { useGetMoviesByGenreQuery, useGetTVShowsByGenreQuery } from "../services/moviesApi";

/**
 * Custom hook for fetching content by specific genre
 * @param genreId - TMDB genre ID
 * @param includeTV - Whether to include TV shows (default: false)
 */
export const useGenreContent = (genreId: number, includeTV: boolean = false) => {
  const movies = useGetMoviesByGenreQuery(genreId);
  const tvShows = useGetTVShowsByGenreQuery(genreId, {
    skip: !includeTV,
  });

  return {
    movies: {
      data: movies.data,
      isLoading: movies.isLoading,
      isError: movies.isError,
    },
    tvShows: includeTV ? {
      data: tvShows.data,
      isLoading: tvShows.isLoading,
      isError: tvShows.isError,
    } : null,
    isLoading: movies.isLoading || (includeTV && tvShows.isLoading),
    isError: movies.isError || (includeTV && tvShows.isError),
  };
};
