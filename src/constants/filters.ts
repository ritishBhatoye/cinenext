export type MediaFilterId =
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

export const MEDIA_FILTERS = [
  { id: "most-popular" as MediaFilterId, title: "Most Popular" },
  { id: "most-rating" as MediaFilterId, title: "Most Rating" },
  { id: "most-recent" as MediaFilterId, title: "Most Recent" },
  { id: "action-and-adventure" as MediaFilterId, title: "Action & Adventure" },
  { id: "animation" as MediaFilterId, title: "Animation" },
  { id: "comedy" as MediaFilterId, title: "Comedy" },
  { id: "crime" as MediaFilterId, title: "Crime" },
  { id: "documentary" as MediaFilterId, title: "Documentary" },
  { id: "drama" as MediaFilterId, title: "Drama" },
  { id: "family" as MediaFilterId, title: "Family" },
  { id: "kids" as MediaFilterId, title: "Kids" },
  { id: "mystery" as MediaFilterId, title: "Mystery" },
  { id: "news" as MediaFilterId, title: "News" },
  { id: "reality" as MediaFilterId, title: "Reality" },
  { id: "sci-fi-and-fantasy" as MediaFilterId, title: "Sci-Fi & Fantasy" },
  { id: "soap" as MediaFilterId, title: "Soap" },
  { id: "talk" as MediaFilterId, title: "Talk" },
  { id: "war-and-politics" as MediaFilterId, title: "War and Politics" },
];
