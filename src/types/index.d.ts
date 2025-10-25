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
  genre_ids: number[];
}
