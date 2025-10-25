import { supabase } from "@/lib/supabase";

// =============================================
// USER MANAGEMENT
// =============================================

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create or update user in Supabase when they sign up with Clerk
 */
export const syncUserWithSupabase = async (
  clerkId: string,
  email: string,
  username?: string,
  avatarUrl?: string
) => {
  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        clerk_id: clerkId,
        email,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "clerk_id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get user by Clerk ID
 */
export const getUserByClerkId = async (clerkId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (error) throw error;
  return data as User;
};

// =============================================
// FAVORITES
// =============================================

export interface Favorite {
  id: string;
  user_id: string;
  movie_id: number;
  movie_type: "movie" | "tv";
  movie_title?: string;
  movie_poster?: string;
  created_at: string;
}

/**
 * Get all favorites for a user
 */
export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Favorite[];
};

/**
 * Check if a movie is favorited
 */
export const isFavorite = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
};

/**
 * Add to favorites
 */
export const addToFavorites = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv",
  movieTitle?: string,
  moviePoster?: string
) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      movie_id: movieId,
      movie_type: movieType,
      movie_title: movieTitle,
      movie_poster: moviePoster,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Remove from favorites
 */
export const removeFromFavorites = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType);

  if (error) throw error;
};

// =============================================
// WATCHLIST
// =============================================

export interface WatchlistItem {
  id: string;
  user_id: string;
  movie_id: number;
  movie_type: "movie" | "tv";
  movie_title?: string;
  movie_poster?: string;
  created_at: string;
}

/**
 * Get watchlist for a user
 */
export const getWatchlist = async (userId: string) => {
  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as WatchlistItem[];
};

/**
 * Check if a movie is in watchlist
 */
export const isInWatchlist = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { data, error } = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
};

/**
 * Add to watchlist
 */
export const addToWatchlist = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv",
  movieTitle?: string,
  moviePoster?: string
) => {
  const { data, error } = await supabase
    .from("watchlist")
    .insert({
      user_id: userId,
      movie_id: movieId,
      movie_type: movieType,
      movie_title: movieTitle,
      movie_poster: moviePoster,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Remove from watchlist
 */
export const removeFromWatchlist = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType);

  if (error) throw error;
};

// =============================================
// RATINGS
// =============================================

export interface Rating {
  id: string;
  user_id: string;
  movie_id: number;
  movie_type: "movie" | "tv";
  rating: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get user's rating for a movie
 */
export const getRating = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { data, error } = await supabase
    .from("ratings")
    .select("*")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as Rating | null;
};

/**
 * Add or update rating
 */
export const setRating = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv",
  rating: number
) => {
  const { data, error } = await supabase
    .from("ratings")
    .upsert(
      {
        user_id: userId,
        movie_id: movieId,
        movie_type: movieType,
        rating,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,movie_id,movie_type" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete rating
 */
export const deleteRating = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { error } = await supabase
    .from("ratings")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .eq("movie_type", movieType);

  if (error) throw error;
};

// =============================================
// COMMENTS
// =============================================

export interface Comment {
  id: string;
  user_id: string;
  movie_id: number;
  movie_type: "movie" | "tv";
  comment: string;
  created_at: string;
  updated_at: string;
  users?: {
    username?: string;
    avatar_url?: string;
  };
}

/**
 * Get comments for a movie
 */
export const getComments = async (
  movieId: number,
  movieType: "movie" | "tv"
) => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      users (
        username,
        avatar_url
      )
    `
    )
    .eq("movie_id", movieId)
    .eq("movie_type", movieType)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Comment[];
};

/**
 * Add a comment
 */
export const addComment = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv",
  comment: string
) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: userId,
      movie_id: movieId,
      movie_type: movieType,
      comment,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update a comment
 */
export const updateComment = async (commentId: string, comment: string) => {
  const { data, error } = await supabase
    .from("comments")
    .update({
      comment,
      updated_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
};

// =============================================
// WATCH HISTORY
// =============================================

export interface WatchHistory {
  id: string;
  user_id: string;
  movie_id: number;
  movie_type: "movie" | "tv";
  movie_title?: string;
  movie_poster?: string;
  watched_at: string;
  progress: number;
}

/**
 * Get watch history for a user
 */
export const getWatchHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("watch_history")
    .select("*")
    .eq("user_id", userId)
    .order("watched_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data as WatchHistory[];
};

/**
 * Add or update watch history
 */
export const updateWatchHistory = async (
  userId: string,
  movieId: number,
  movieType: "movie" | "tv",
  progress: number,
  movieTitle?: string,
  moviePoster?: string
) => {
  const { data, error } = await supabase
    .from("watch_history")
    .upsert(
      {
        user_id: userId,
        movie_id: movieId,
        movie_type: movieType,
        progress,
        movie_title: movieTitle,
        movie_poster: moviePoster,
        watched_at: new Date().toISOString(),
      },
      { onConflict: "user_id,movie_id,movie_type" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};
