interface NavItemDataType {
  id: string;
  title: string;
}

interface Genre {
  id: number;
  name: string;
}
interface FeaturedMovieProps {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  media_type: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

type MediaDetailType = {
  title: string;
  thumbnail: string;
  releaseYear: number;
  ageRestriction: string;
  duration: string;
  description: string;
  type: string;
};
//API integration

interface TVShowProps {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  rating: number;
  genre_ids: number[];
  media_type: string;
}
type FilterType = {
  id: number;
  title: string;
};

// Search result types
interface SearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string; // For movies
  name?: string; // For TV shows and people
  poster_path?: string;
  backdrop_path?: string;
  profile_path?: string; // For people
  overview?: string;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  vote_average?: number;
  vote_count?: number;
  popularity: number;
  genre_ids?: number[];
  known_for_department?: string; // For people
  known_for?: (FeaturedMovieProps | TVShowProps)[]; // For people
}

interface PersonResult {
  id: number;
  name: string;
  profile_path?: string;
  popularity: number;
  known_for_department: string;
  known_for: (FeaturedMovieProps | TVShowProps)[];
  media_type: "person";
}
