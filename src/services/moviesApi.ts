import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Trending Movies (Latest/Featured)
    getTrendingMovies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/trending/movie/day?api_key=${API_KEY}`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // Trending TV Shows
    getTrendingTVShows: builder.query<TVShowProps[], void>({
      query: () => `/trending/tv/day?api_key=${API_KEY}`,
      transformResponse: (response: TMDBResponse<TVShowProps>) => response.results,
    }),

    // Top 10 Today (Popular Movies)
    getTop10Movies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/movie/popular?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) =>
        response.results.slice(0, 10),
    }),

    // Top 10 TV Shows Today
    getTop10TVShows: builder.query<TVShowProps[], void>({
      query: () => `/tv/popular?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<TVShowProps>) =>
        response.results.slice(0, 10),
    }),

    // Netflix Originals (Using Netflix as production company - ID: 213)
    getNetflixOriginals: builder.query<FeaturedMovieProps[], void>({
      query: () => `/discover/movie?api_key=${API_KEY}&with_companies=213&sort_by=popularity.desc`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // Netflix Original TV Shows
    getNetflixOriginalShows: builder.query<TVShowProps[], void>({
      query: () => `/discover/tv?api_key=${API_KEY}&with_networks=213&sort_by=popularity.desc`,
      transformResponse: (response: TMDBResponse<TVShowProps>) => response.results,
    }),

    // Top Rated Movies
    getTopRatedMovies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/movie/top_rated?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // Top Rated TV Shows
    getTopRatedTVShows: builder.query<TVShowProps[], void>({
      query: () => `/tv/top_rated?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<TVShowProps>) => response.results,
    }),

    // Upcoming Movies
    getUpcomingMovies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/movie/upcoming?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // Now Playing Movies
    getNowPlayingMovies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/movie/now_playing?api_key=${API_KEY}&page=1`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // Movies by Genre
    getMoviesByGenre: builder.query<FeaturedMovieProps[], number>({
      query: (genreId) => `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) => response.results,
    }),

    // TV Shows by Genre
    getTVShowsByGenre: builder.query<TVShowProps[], number>({
      query: (genreId) => `/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
      transformResponse: (response: TMDBResponse<TVShowProps>) => response.results,
    }),

    // Get Movie Genres
    getMovieGenres: builder.query<Genre[], void>({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),

    // Get TV Genres
    getTVGenres: builder.query<Genre[], void>({
      query: () => `/genre/tv/list?api_key=${API_KEY}`,
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
  useGetTop10MoviesQuery,
  useGetTop10TVShowsQuery,
  useGetNetflixOriginalsQuery,
  useGetNetflixOriginalShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTVShowsQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMoviesByGenreQuery,
  useGetTVShowsByGenreQuery,
  useGetMovieGenresQuery,
  useGetTVGenresQuery,
} = moviesApi;
