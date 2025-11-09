import { useMemo } from "react";
import { MOVIE_GENRES, TV_GENRES } from "../constants/genres";
import { MediaFilterId } from "../constants/filters";
import {
  useGetMoviesByGenreQuery,
  useGetTVShowsByGenreQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTVShowsQuery,
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
} from "../services/moviesApi";

type MediaType = "movie" | "tv";

export const useMediaFilters = (
  activeFilter: MediaFilterId,
  mediaType: MediaType
) => {
  const isMovie = mediaType === "movie";

  // Trending/Recent content
  const trendingMovies = useGetTrendingMoviesQuery(undefined, {
    skip: !isMovie || activeFilter !== "most-recent",
  });

  const trendingShows = useGetTrendingTVShowsQuery(undefined, {
    skip: isMovie || activeFilter !== "most-recent",
  });

  // Top Rated content
  const topRatedMovies = useGetTopRatedMoviesQuery(undefined, {
    skip:
      !isMovie ||
      (activeFilter !== "most-rating" && activeFilter !== "most-popular"),
  });

  const topRatedShows = useGetTopRatedTVShowsQuery(undefined, {
    skip:
      isMovie ||
      (activeFilter !== "most-rating" && activeFilter !== "most-popular"),
  });

  // Genre-based queries for Movies
  const movieActionAdventure = useGetMoviesByGenreQuery(MOVIE_GENRES.ACTION, {
    skip: !isMovie || activeFilter !== "action-and-adventure",
  });

  const movieAnimation = useGetMoviesByGenreQuery(MOVIE_GENRES.ANIMATION, {
    skip: !isMovie || activeFilter !== "animation",
  });

  const movieComedy = useGetMoviesByGenreQuery(MOVIE_GENRES.COMEDY, {
    skip: !isMovie || activeFilter !== "comedy",
  });

  const movieCrime = useGetMoviesByGenreQuery(MOVIE_GENRES.CRIME, {
    skip: !isMovie || activeFilter !== "crime",
  });

  const movieDocumentary = useGetMoviesByGenreQuery(MOVIE_GENRES.DOCUMENTARY, {
    skip: !isMovie || activeFilter !== "documentary",
  });

  const movieDrama = useGetMoviesByGenreQuery(MOVIE_GENRES.DRAMA, {
    skip: !isMovie || activeFilter !== "drama",
  });

  const movieFamily = useGetMoviesByGenreQuery(MOVIE_GENRES.FAMILY, {
    skip: !isMovie || activeFilter !== "family",
  });

  const movieMystery = useGetMoviesByGenreQuery(MOVIE_GENRES.MYSTERY, {
    skip: !isMovie || activeFilter !== "mystery",
  });

  const movieSciFi = useGetMoviesByGenreQuery(MOVIE_GENRES.SCIENCE_FICTION, {
    skip: !isMovie || activeFilter !== "sci-fi-and-fantasy",
  });

  const movieWar = useGetMoviesByGenreQuery(MOVIE_GENRES.WAR, {
    skip: !isMovie || activeFilter !== "war-and-politics",
  });

  // Genre-based queries for TV Shows
  const tvActionAdventure = useGetTVShowsByGenreQuery(
    TV_GENRES.ACTION_ADVENTURE,
    {
      skip: isMovie || activeFilter !== "action-and-adventure",
    }
  );

  const tvAnimation = useGetTVShowsByGenreQuery(TV_GENRES.ANIMATION, {
    skip: isMovie || activeFilter !== "animation",
  });

  const tvComedy = useGetTVShowsByGenreQuery(TV_GENRES.COMEDY, {
    skip: isMovie || activeFilter !== "comedy",
  });

  const tvCrime = useGetTVShowsByGenreQuery(TV_GENRES.CRIME, {
    skip: isMovie || activeFilter !== "crime",
  });

  const tvDocumentary = useGetTVShowsByGenreQuery(TV_GENRES.DOCUMENTARY, {
    skip: isMovie || activeFilter !== "documentary",
  });

  const tvDrama = useGetTVShowsByGenreQuery(TV_GENRES.DRAMA, {
    skip: isMovie || activeFilter !== "drama",
  });

  const tvFamily = useGetTVShowsByGenreQuery(TV_GENRES.FAMILY, {
    skip: isMovie || activeFilter !== "family",
  });

  const tvKids = useGetTVShowsByGenreQuery(TV_GENRES.KIDS, {
    skip: isMovie || activeFilter !== "kids",
  });

  const tvMystery = useGetTVShowsByGenreQuery(TV_GENRES.MYSTERY, {
    skip: isMovie || activeFilter !== "mystery",
  });

  const tvNews = useGetTVShowsByGenreQuery(TV_GENRES.NEWS, {
    skip: isMovie || activeFilter !== "news",
  });

  const tvReality = useGetTVShowsByGenreQuery(TV_GENRES.REALITY, {
    skip: isMovie || activeFilter !== "reality",
  });

  const tvSciFiFantasy = useGetTVShowsByGenreQuery(TV_GENRES.SCI_FI_FANTASY, {
    skip: isMovie || activeFilter !== "sci-fi-and-fantasy",
  });

  const tvSoap = useGetTVShowsByGenreQuery(TV_GENRES.SOAP, {
    skip: isMovie || activeFilter !== "soap",
  });

  const tvTalk = useGetTVShowsByGenreQuery(TV_GENRES.TALK, {
    skip: isMovie || activeFilter !== "talk",
  });

  const tvWarPolitics = useGetTVShowsByGenreQuery(TV_GENRES.WAR_POLITICS, {
    skip: isMovie || activeFilter !== "war-and-politics",
  });

  // Map filter to data based on media type
  const filterDataMap = useMemo(() => {
    if (isMovie) {
      return {
        "most-popular": topRatedMovies.data,
        "most-rating": topRatedMovies.data,
        "most-recent": trendingMovies.data,
        "action-and-adventure": movieActionAdventure.data,
        animation: movieAnimation.data,
        comedy: movieComedy.data,
        crime: movieCrime.data,
        documentary: movieDocumentary.data,
        drama: movieDrama.data,
        family: movieFamily.data,
        kids: [], // Movies don't have a kids genre
        mystery: movieMystery.data,
        news: [], // Movies don't have news
        reality: [], // Movies don't have reality
        "sci-fi-and-fantasy": movieSciFi.data,
        soap: [], // Movies don't have soap
        talk: [], // Movies don't have talk
        "war-and-politics": movieWar.data,
      };
    } else {
      return {
        "most-popular": topRatedShows.data,
        "most-rating": topRatedShows.data,
        "most-recent": trendingShows.data,
        "action-and-adventure": tvActionAdventure.data,
        animation: tvAnimation.data,
        comedy: tvComedy.data,
        crime: tvCrime.data,
        documentary: tvDocumentary.data,
        drama: tvDrama.data,
        family: tvFamily.data,
        kids: tvKids.data,
        mystery: tvMystery.data,
        news: tvNews.data,
        reality: tvReality.data,
        "sci-fi-and-fantasy": tvSciFiFantasy.data,
        soap: tvSoap.data,
        talk: tvTalk.data,
        "war-and-politics": tvWarPolitics.data,
      };
    }
  }, [
    isMovie,
    topRatedMovies.data,
    topRatedShows.data,
    trendingMovies.data,
    trendingShows.data,
    movieActionAdventure.data,
    movieAnimation.data,
    movieComedy.data,
    movieCrime.data,
    movieDocumentary.data,
    movieDrama.data,
    movieFamily.data,
    movieMystery.data,
    movieSciFi.data,
    movieWar.data,
    tvActionAdventure.data,
    tvAnimation.data,
    tvComedy.data,
    tvCrime.data,
    tvDocumentary.data,
    tvDrama.data,
    tvFamily.data,
    tvKids.data,
    tvMystery.data,
    tvNews.data,
    tvReality.data,
    tvSciFiFantasy.data,
    tvSoap.data,
    tvTalk.data,
    tvWarPolitics.data,
  ]);

  const isLoading =
    trendingMovies.isLoading ||
    trendingShows.isLoading ||
    topRatedMovies.isLoading ||
    topRatedShows.isLoading ||
    movieActionAdventure.isLoading ||
    movieAnimation.isLoading ||
    movieComedy.isLoading ||
    movieCrime.isLoading ||
    movieDocumentary.isLoading ||
    movieDrama.isLoading ||
    movieFamily.isLoading ||
    movieMystery.isLoading ||
    movieSciFi.isLoading ||
    movieWar.isLoading ||
    tvActionAdventure.isLoading ||
    tvAnimation.isLoading ||
    tvComedy.isLoading ||
    tvCrime.isLoading ||
    tvDocumentary.isLoading ||
    tvDrama.isLoading ||
    tvFamily.isLoading ||
    tvKids.isLoading ||
    tvMystery.isLoading ||
    tvNews.isLoading ||
    tvReality.isLoading ||
    tvSciFiFantasy.isLoading ||
    tvSoap.isLoading ||
    tvTalk.isLoading ||
    tvWarPolitics.isLoading;

  return {
    data: filterDataMap[activeFilter] || [],
    isLoading,
  };
};
