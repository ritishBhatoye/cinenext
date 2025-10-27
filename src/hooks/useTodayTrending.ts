import {
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
} from "../services/moviesApi";

/**
 * Custom hook for fetching today's trending content
 * Returns trending movies and TV shows for the current day
 */
export const useTodayTrending = () => {
  // Today's trending movies
  const trendingMovies = useGetTrendingMoviesQuery();

  // Today's trending TV shows
  const trendingTVShows = useGetTrendingTVShowsQuery();

  const isLoading = trendingMovies.isLoading || trendingTVShows.isLoading;
  const isError = trendingMovies.isError || trendingTVShows.isError;

  return {
    // Trending movies
    movies: {
      data: trendingMovies.data,
      isLoading: trendingMovies.isLoading,
      isError: trendingMovies.isError,
    },

    // Trending TV shows
    tvShows: {
      data: trendingTVShows.data,
      isLoading: trendingTVShows.isLoading,
      isError: trendingTVShows.isError,
    },

    // Combined trending content (movies first, then TV shows)
    combined: {
      data: [...(trendingMovies.data || []), ...(trendingTVShows.data || [])],
      isLoading,
      isError,
    },

    // Overall loading/error states
    isLoading,
    isError,
  };
};
