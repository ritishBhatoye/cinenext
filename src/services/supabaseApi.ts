import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addComment,
  addToFavorites,
  addToWatchlist,
  Comment,
  deleteComment,
  deleteRating,
  Favorite,
  getComments,
  getFavorites,
  getRating,
  getWatchHistory,
  getWatchlist,
  isFavorite,
  isInWatchlist,
  Rating,
  removeFromFavorites,
  removeFromWatchlist,
  setRating,
  syncUserWithSupabase,
  updateComment,
  updateWatchHistory,
  User,
  WatchHistory,
  WatchlistItem,
} from "./supabaseService";

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    "Favorites",
    "Watchlist",
    "Ratings",
    "Comments",
    "WatchHistory",
    "User",
  ],
  endpoints: (builder) => ({
    // =============================================
    // USER
    // =============================================
    syncUser: builder.mutation<
      User,
      { clerkId: string; email: string; username?: string; avatarUrl?: string }
    >({
      queryFn: async ({ clerkId, email, username, avatarUrl }) => {
        try {
          const data = await syncUserWithSupabase(
            clerkId,
            email,
            username,
            avatarUrl
          );
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["User"],
    }),

    // =============================================
    // FAVORITES
    // =============================================
    getFavorites: builder.query<Favorite[], string>({
      queryFn: async (userId) => {
        try {
          const data = await getFavorites(userId);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: ["Favorites"],
    }),

    checkIsFavorite: builder.query<
      boolean,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          const data = await isFavorite(userId, movieId, movieType);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, { movieId, movieType }) => [
        { type: "Favorites", id: `${movieType}-${movieId}` },
      ],
    }),

    addToFavorites: builder.mutation<
      Favorite,
      {
        userId: string;
        movieId: number;
        movieType: "movie" | "tv";
        movieTitle?: string;
        moviePoster?: string;
      }
    >({
      queryFn: async ({
        userId,
        movieId,
        movieType,
        movieTitle,
        moviePoster,
      }) => {
        try {
          const data = await addToFavorites(
            userId,
            movieId,
            movieType,
            movieTitle,
            moviePoster
          );
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        "Favorites",
        { type: "Favorites", id: `${movieType}-${movieId}` },
      ],
    }),

    removeFromFavorites: builder.mutation<
      void,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          await removeFromFavorites(userId, movieId, movieType);
          return { data: undefined };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        "Favorites",
        { type: "Favorites", id: `${movieType}-${movieId}` },
      ],
    }),

    // =============================================
    // WATCHLIST
    // =============================================
    getWatchlist: builder.query<WatchlistItem[], string>({
      queryFn: async (userId) => {
        try {
          const data = await getWatchlist(userId);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: ["Watchlist"],
    }),

    checkIsInWatchlist: builder.query<
      boolean,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          const data = await isInWatchlist(userId, movieId, movieType);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, { movieId, movieType }) => [
        { type: "Watchlist", id: `${movieType}-${movieId}` },
      ],
    }),

    addToWatchlist: builder.mutation<
      WatchlistItem,
      {
        userId: string;
        movieId: number;
        movieType: "movie" | "tv";
        movieTitle?: string;
        moviePoster?: string;
      }
    >({
      queryFn: async ({
        userId,
        movieId,
        movieType,
        movieTitle,
        moviePoster,
      }) => {
        try {
          const data = await addToWatchlist(
            userId,
            movieId,
            movieType,
            movieTitle,
            moviePoster
          );
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        "Watchlist",
        { type: "Watchlist", id: `${movieType}-${movieId}` },
      ],
    }),

    removeFromWatchlist: builder.mutation<
      void,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          await removeFromWatchlist(userId, movieId, movieType);
          return { data: undefined };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        "Watchlist",
        { type: "Watchlist", id: `${movieType}-${movieId}` },
      ],
    }),

    // =============================================
    // RATINGS
    // =============================================
    getRating: builder.query<
      Rating | null,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          const data = await getRating(userId, movieId, movieType);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, { movieId, movieType }) => [
        { type: "Ratings", id: `${movieType}-${movieId}` },
      ],
    }),

    setRating: builder.mutation<
      Rating,
      {
        userId: string;
        movieId: number;
        movieType: "movie" | "tv";
        rating: number;
      }
    >({
      queryFn: async ({ userId, movieId, movieType, rating }) => {
        try {
          const data = await setRating(userId, movieId, movieType, rating);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        { type: "Ratings", id: `${movieType}-${movieId}` },
      ],
    }),

    deleteRating: builder.mutation<
      void,
      { userId: string; movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ userId, movieId, movieType }) => {
        try {
          await deleteRating(userId, movieId, movieType);
          return { data: undefined };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        { type: "Ratings", id: `${movieType}-${movieId}` },
      ],
    }),

    // =============================================
    // COMMENTS
    // =============================================
    getComments: builder.query<
      Comment[],
      { movieId: number; movieType: "movie" | "tv" }
    >({
      queryFn: async ({ movieId, movieType }) => {
        try {
          const data = await getComments(movieId, movieType);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, { movieId, movieType }) => [
        { type: "Comments", id: `${movieType}-${movieId}` },
      ],
    }),

    addComment: builder.mutation<
      Comment,
      {
        userId: string;
        movieId: number;
        movieType: "movie" | "tv";
        comment: string;
      }
    >({
      queryFn: async ({ userId, movieId, movieType, comment }) => {
        try {
          const data = await addComment(userId, movieId, movieType, comment);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: (result, error, { movieId, movieType }) => [
        { type: "Comments", id: `${movieType}-${movieId}` },
      ],
    }),

    updateComment: builder.mutation<
      Comment,
      { commentId: string; comment: string }
    >({
      queryFn: async ({ commentId, comment }) => {
        try {
          const data = await updateComment(commentId, comment);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["Comments"],
    }),

    deleteComment: builder.mutation<void, string>({
      queryFn: async (commentId) => {
        try {
          await deleteComment(commentId);
          return { data: undefined };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["Comments"],
    }),

    // =============================================
    // WATCH HISTORY
    // =============================================
    getWatchHistory: builder.query<WatchHistory[], string>({
      queryFn: async (userId) => {
        try {
          const data = await getWatchHistory(userId);
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: ["WatchHistory"],
    }),

    updateWatchHistory: builder.mutation<
      WatchHistory,
      {
        userId: string;
        movieId: number;
        movieType: "movie" | "tv";
        progress: number;
        movieTitle?: string;
        moviePoster?: string;
      }
    >({
      queryFn: async ({
        userId,
        movieId,
        movieType,
        progress,
        movieTitle,
        moviePoster,
      }) => {
        try {
          const data = await updateWatchHistory(
            userId,
            movieId,
            movieType,
            progress,
            movieTitle,
            moviePoster
          );
          return { data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: ["WatchHistory"],
    }),
  }),
});

export const {
  // User
  useSyncUserMutation,

  // Favorites
  useGetFavoritesQuery,
  useCheckIsFavoriteQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,

  // Watchlist
  useGetWatchlistQuery,
  useCheckIsInWatchlistQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,

  // Ratings
  useGetRatingQuery,
  useSetRatingMutation,
  useDeleteRatingMutation,

  // Comments
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,

  // Watch History
  useGetWatchHistoryQuery,
  useUpdateWatchHistoryMutation,
} = supabaseApi;
