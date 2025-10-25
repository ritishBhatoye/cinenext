import { MOVIE_GENRES } from "../constants/genres";
import {
  useGetMoviesByGenreQuery,
  useGetNetflixOriginalShowsQuery,
  useGetNetflixOriginalsQuery,
  useGetNowPlayingMoviesQuery,
  useGetTop10MoviesQuery,
  useGetTop10TVShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTrendingMoviesQuery,
} from "../services/moviesApi";

/**
 * Custom hook for fetching all home screen content
 * Returns all the data needed for the Netflix home tab
 */
export const useHomeContent = () => {
  // Featured/Hero content
  const trendingMovies = useGetTrendingMoviesQuery();

  // Top 10 Today
  const top10Movies = useGetTop10MoviesQuery();
  const top10TVShows = useGetTop10TVShowsQuery();

  // Only on Netflix
  const netflixOriginals = useGetNetflixOriginalsQuery();
  const netflixShows = useGetNetflixOriginalShowsQuery();

  // Popular/Top Rated
  const topRatedMovies = useGetTopRatedMoviesQuery();

  // Now Playing
  const nowPlaying = useGetNowPlayingMoviesQuery();

  // Genre-based rows
  const actionMovies = useGetMoviesByGenreQuery(MOVIE_GENRES.ACTION);
  const comedyMovies = useGetMoviesByGenreQuery(MOVIE_GENRES.COMEDY);
  const horrorMovies = useGetMoviesByGenreQuery(MOVIE_GENRES.HORROR);
  const romanceMovies = useGetMoviesByGenreQuery(MOVIE_GENRES.ROMANCE);
  const documentaries = useGetMoviesByGenreQuery(MOVIE_GENRES.DOCUMENTARY);

  const isLoading =
    trendingMovies.isLoading ||
    top10Movies.isLoading ||
    netflixOriginals.isLoading ||
    topRatedMovies.isLoading;

  const isError =
    trendingMovies.isError ||
    top10Movies.isError ||
    netflixOriginals.isError ||
    topRatedMovies.isError;

  return {
    // Featured content for hero banner
    featured: {
      data: trendingMovies.data,
      isLoading: trendingMovies.isLoading,
      isError: trendingMovies.isError,
    },

    // Top 10 Today
    top10: {
      movies: top10Movies.data,
      tvShows: top10TVShows.data,
      isLoading: top10Movies.isLoading || top10TVShows.isLoading,
      isError: top10Movies.isError || top10TVShows.isError,
    },

    // Only on Netflix
    onlyOnNetflix: {
      movies: netflixOriginals.data,
      shows: netflixShows.data,
      isLoading: netflixOriginals.isLoading || netflixShows.isLoading,
      isError: netflixOriginals.isError || netflixShows.isError,
    },

    // Popular
    popular: {
      data: topRatedMovies.data,
      isLoading: topRatedMovies.isLoading,
      isError: topRatedMovies.isError,
    },

    // Now Playing
    nowPlaying: {
      data: nowPlaying.data,
      isLoading: nowPlaying.isLoading,
      isError: nowPlaying.isError,
    },

    // By Genre
    genres: {
      action: actionMovies.data,
      comedy: comedyMovies.data,
      horror: horrorMovies.data,
      romance: romanceMovies.data,
      documentaries: documentaries.data,
    },

    // Overall loading/error states
    isLoading,
    isError,
  };
};
