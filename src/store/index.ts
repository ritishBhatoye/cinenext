"use client";

import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../services/moviesApi";
import { supabaseApi } from "../services/supabaseApi";
import { searchApi } from "../hooks/useSearch";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(supabaseApi.middleware)
      .concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
