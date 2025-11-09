import { useMemo } from "react";
import { TV_GENRES } from "../constants/genres";
import {
  useGetTVShowsByGenreQuery,
  useGetTopRatedTVShowsQuery,
  useGetTrendingTVShowsQuery,
} from "../services/moviesApi";

export type TVShowFilterId =
  | "most-popular"
  | "most-rating"
  | "most-recent"
  | "action-and-adventure"
  | "animation"
  | "comedy"
  | "crime"
  | "documentary"
  | "drama"
  | "family"
  | "kids"
  | "mystery"
  | "news"
  | "reality"
  | "sci-fi-and-fantasy"
  | "soap"
  | "talk"
  | "war-and-politics";

export const useTVShowFilters = (activeFilter: TVShowFilterId) => {
  // Fetch data based on filter type
  const trendingShows = useGetTrendingTVShowsQuery(undefined, {
    skip: activeFilter !== "most-recent",
  });

  const topRatedShows = useGetTopRatedTVShowsQuery(undefined, {
    skip: activeFilter !== "most-rating" && activeFilter !== "most-popular",
  });

  // Genre-based queries
  const actionAdventureShows = useGetTVShowsByGenreQuery(
    TV_GENRES.ACTION_ADVENTURE,
    {
      skip: activeFilter !== "action-and-adventure",
    }
  );

  const animationShows = useGetTVShowsByGenreQuery(TV_GENRES.ANIMATION, {
    skip: activeFilter !== "animation",
  });

  const comedyShows = useGetTVShowsByGenreQuery(TV_GENRES.COMEDY, {
    skip: activeFilter !== "comedy",
  });

  const crimeShows = useGetTVShowsByGenreQuery(TV_GENRES.CRIME, {
    skip: activeFilter !== "crime",
  });

  const documentaryShows = useGetTVShowsByGenreQuery(TV_GENRES.DOCUMENTARY, {
    skip: activeFilter !== "documentary",
  });

  const dramaShows = useGetTVShowsByGenreQuery(TV_GENRES.DRAMA, {
    skip: activeFilter !== "drama",
  });

  const familyShows = useGetTVShowsByGenreQuery(TV_GENRES.FAMILY, {
    skip: activeFilter !== "family",
  });

  const kidsShows = useGetTVShowsByGenreQuery(TV_GENRES.KIDS, {
    skip: activeFilter !== "kids",
  });

  const mysteryShows = useGetTVShowsByGenreQuery(TV_GENRES.MYSTERY, {
    skip: activeFilter !== "mystery",
  });

  const newsShows = useGetTVShowsByGenreQuery(TV_GENRES.NEWS, {
    skip: activeFilter !== "news",
  });

  const realityShows = useGetTVShowsByGenreQuery(TV_GENRES.REALITY, {
    skip: activeFilter !== "reality",
  });

  const sciFiFantasyShows = useGetTVShowsByGenreQuery(
    TV_GENRES.SCI_FI_FANTASY,
    {
      skip: activeFilter !== "sci-fi-and-fantasy",
    }
  );

  const soapShows = useGetTVShowsByGenreQuery(TV_GENRES.SOAP, {
    skip: activeFilter !== "soap",
  });

  const talkShows = useGetTVShowsByGenreQuery(TV_GENRES.TALK, {
    skip: activeFilter !== "talk",
  });

  const warPoliticsShows = useGetTVShowsByGenreQuery(TV_GENRES.WAR_POLITICS, {
    skip: activeFilter !== "war-and-politics",
  });

  // Map filter to data
  const filterDataMap = useMemo(
    () => ({
      "most-popular": topRatedShows.data,
      "most-rating": topRatedShows.data,
      "most-recent": trendingShows.data,
      "action-and-adventure": actionAdventureShows.data,
      animation: animationShows.data,
      comedy: comedyShows.data,
      crime: crimeShows.data,
      documentary: documentaryShows.data,
      drama: dramaShows.data,
      family: familyShows.data,
      kids: kidsShows.data,
      mystery: mysteryShows.data,
      news: newsShows.data,
      reality: realityShows.data,
      "sci-fi-and-fantasy": sciFiFantasyShows.data,
      soap: soapShows.data,
      talk: talkShows.data,
      "war-and-politics": warPoliticsShows.data,
    }),
    [
      topRatedShows.data,
      trendingShows.data,
      actionAdventureShows.data,
      animationShows.data,
      comedyShows.data,
      crimeShows.data,
      documentaryShows.data,
      dramaShows.data,
      familyShows.data,
      kidsShows.data,
      mysteryShows.data,
      newsShows.data,
      realityShows.data,
      sciFiFantasyShows.data,
      soapShows.data,
      talkShows.data,
      warPoliticsShows.data,
    ]
  );

  const isLoading =
    trendingShows.isLoading ||
    topRatedShows.isLoading ||
    actionAdventureShows.isLoading ||
    animationShows.isLoading ||
    comedyShows.isLoading ||
    crimeShows.isLoading ||
    documentaryShows.isLoading ||
    dramaShows.isLoading ||
    familyShows.isLoading ||
    kidsShows.isLoading ||
    mysteryShows.isLoading ||
    newsShows.isLoading ||
    realityShows.isLoading ||
    sciFiFantasyShows.isLoading ||
    soapShows.isLoading ||
    talkShows.isLoading ||
    warPoliticsShows.isLoading;

  return {
    data: filterDataMap[activeFilter] || [],
    isLoading,
  };
};
