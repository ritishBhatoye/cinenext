import {
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTVShowsQuery,
} from "../services/moviesApi";

/**
 * Custom hook for fetching new and popular content
 * Returns trending, upcoming, and top-rated content for both movies and TV shows
 */
export const useNewAndPopular = () => {
  // Trending content
  const trendingMovies = useGetTrendingMoviesQuery();
  const trendingTVShows = useGetTrendingTVShowsQuery();

  // Upcoming/New content
  const upcomingMovies = useGetUpcomingMoviesQuery();
  const nowPlayingMovies = useGetNowPlayingMoviesQuery();

  // Popular content
  const topRatedMovies = useGetTopRatedMoviesQuery();
  const topRatedTVShows = useGetTopRatedTVShowsQuery();

  const isLoading =
    trendingMovies.isLoading ||
    trendingTVShows.isLoading ||
    upcomingMovies.isLoading ||
    nowPlayingMovies.isLoading ||
    topRatedMovies.isLoading ||
    topRatedTVShows.isLoading;

  const isError =
    trendingMovies.isError ||
    trendingTVShows.isError ||
    upcomingMovies.isError ||
    nowPlayingMovies.isError ||
    topRatedMovies.isError ||
    topRatedTVShows.isError;

  return {
    // Trending content
    trending: {
      movies: trendingMovies.data,
      tvShows: trendingTVShows.data,
      isLoading: trendingMovies.isLoading || trendingTVShows.isLoading,
      isError: trendingMovies.isError || trendingTVShows.isError,
    },

    // New/Upcoming content
    upcoming: {
      movies: upcomingMovies.data,
      isLoading: upcomingMovies.isLoading,
      isError: upcomingMovies.isError,
    },

    // Now Playing
    nowPlaying: {
      movies: nowPlayingMovies.data,
      isLoading: nowPlayingMovies.isLoading,
      isError: nowPlayingMovies.isError,
    },

    // Popular content
    popular: {
      movies: topRatedMovies.data,
      tvShows: topRatedTVShows.data,
      isLoading: topRatedMovies.isLoading || topRatedTVShows.isLoading,
      isError: topRatedMovies.isError || topRatedTVShows.isError,
    },

    // Overall loading/error states
    isLoading,
    isError,
  };
};
