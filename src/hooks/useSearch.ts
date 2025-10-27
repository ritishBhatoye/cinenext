"use client";

import { useState, useCallback, useMemo } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Search API slice
export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Multi-search (movies, TV shows, and people)
    searchMulti: builder.query<
      SearchResult[],
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) =>
        `/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}`,
      transformResponse: (response: TMDBResponse<SearchResult>) =>
        response.results,
    }),

    // Search movies only
    searchMovies: builder.query<
      FeaturedMovieProps[],
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) =>
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}`,
      transformResponse: (response: TMDBResponse<FeaturedMovieProps>) =>
        response.results,
    }),

    // Search TV shows only
    searchTVShows: builder.query<
      TVShowProps[],
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) =>
        `/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}`,
      transformResponse: (response: TMDBResponse<TVShowProps>) =>
        response.results,
    }),

    // Search people
    searchPeople: builder.query<
      PersonResult[],
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) =>
        `/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}`,
      transformResponse: (response: TMDBResponse<PersonResult>) =>
        response.results,
    }),
  }),
});

export const {
  useSearchMultiQuery,
  useSearchMoviesQuery,
  useSearchTVShowsQuery,
  useSearchPeopleQuery,
  useLazySearchMultiQuery,
  useLazySearchMoviesQuery,
  useLazySearchTVShowsQuery,
  useLazySearchPeopleQuery,
} = searchApi;

// Search filter types
export type SearchFilter = "all" | "movies" | "tv" | "people";

// Search hook interface
interface UseSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
  autoSearch?: boolean;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  filter: SearchFilter;
  setFilter: (filter: SearchFilter) => void;
  results:
    | SearchResult[]
    | FeaturedMovieProps[]
    | TVShowProps[]
    | PersonResult[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hasSearched: boolean;
  search: () => void;
  clearSearch: () => void;
  totalResults: number;
}

/**
 * Custom hook for searching movies, TV shows, and people
 * Provides debounced search functionality with filtering options
 */
export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const { debounceMs = 500, minQueryLength = 2, autoSearch = false } = options;

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("all");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Lazy query hooks for manual triggering
  const [searchMulti, multiResult] = useLazySearchMultiQuery();
  const [searchMovies, moviesResult] = useLazySearchMoviesQuery();
  const [searchTVShows, tvResult] = useLazySearchTVShowsQuery();
  const [searchPeople, peopleResult] = useLazySearchPeopleQuery();

  // Perform search based on current filter
  const performSearch = useCallback(
    (searchQuery?: string) => {
      const queryToUse = searchQuery || debouncedQuery;

      if (queryToUse.length < minQueryLength) {
        return;
      }

      setHasSearched(true);

      const searchParams = { query: queryToUse, page: 1 };

      switch (filter) {
        case "movies":
          searchMovies(searchParams);
          break;
        case "tv":
          searchTVShows(searchParams);
          break;
        case "people":
          searchPeople(searchParams);
          break;
        default:
          searchMulti(searchParams);
          break;
      }
    },
    [
      debouncedQuery,
      filter,
      minQueryLength,
      searchMulti,
      searchMovies,
      searchTVShows,
      searchPeople,
    ]
  );

  // Debounce the search query
  const debounceQuery = useCallback(
    (searchQuery: string) => {
      const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery);
        if (autoSearch && searchQuery.length >= minQueryLength) {
          performSearch(searchQuery);
        }
      }, debounceMs);

      return () => clearTimeout(timer);
    },
    [debounceMs, minQueryLength, autoSearch, performSearch]
  );

  // Update query and trigger debounce
  const updateQuery = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      if (newQuery.length === 0) {
        setDebouncedQuery("");
        setHasSearched(false);
      } else {
        debounceQuery(newQuery);
      }
    },
    [debounceQuery]
  );

  // Manual search trigger
  const search = useCallback(() => {
    if (query.length >= minQueryLength) {
      performSearch(query);
    }
  }, [query, minQueryLength, performSearch]);

  // Clear search results
  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setHasSearched(false);
  }, []);

  // Get current results based on filter
  const currentResult = useMemo(() => {
    switch (filter) {
      case "movies":
        return moviesResult;
      case "tv":
        return tvResult;
      case "people":
        return peopleResult;
      default:
        return multiResult;
    }
  }, [filter, multiResult, moviesResult, tvResult, peopleResult]);

  // Calculate total results
  const totalResults = useMemo(() => {
    return currentResult.data?.length || 0;
  }, [currentResult.data]);

  return {
    query,
    setQuery: updateQuery,
    filter,
    setFilter,
    results: currentResult.data || [],
    isLoading: currentResult.isLoading,
    isError: currentResult.isError,
    error: currentResult.error,
    hasSearched,
    search,
    clearSearch,
    totalResults,
  };
};

// Helper hook for simple search without filters
export const useSimpleSearch = (initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [trigger, result] = useLazySearchMultiQuery();

  const search = useCallback(
    (searchQuery?: string) => {
      const queryToUse = searchQuery || query;
      if (queryToUse.trim()) {
        trigger({ query: queryToUse });
      }
    },
    [query, trigger]
  );

  return {
    query,
    setQuery,
    search,
    results: result.data || [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  };
};
