import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Text } from "@/components/atoms";
import { Star } from "lucide-react";

interface props {
  data?: FeaturedMovieProps | TVShowProps;
}

// Type for media items that might be movies or TV shows

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MediaItem = ({ data }: props) => {
  const [showMediaContent, setShowMediaContent] = useState(false);

  // Helper function to determine media type based on available properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMediaType = (item: any) => {
    if (!item) {
      return "Unknown";
    }

    // Check for explicit media_type first
    if (item.media_type) {
      return item.media_type === "movie" ? "Movie" : "TV Show";
    }

    // If it has 'title' and 'release_date', it's likely a movie
    if (item.title && item.release_date) {
      return "Movie";
    }

    // If it has 'name' and 'first_air_date', it's likely a TV show
    if (item.name && item.first_air_date) {
      return "TV Show";
    }

    // Fallback based on properties
    if (item.title) {
      return "Movie";
    }
    if (item.name) {
      return "TV Show";
    }

    return "Unknown";
  };

  // Helper function to get the correct title
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMediaTitle = (item: any) => {
    if (!item) {
      return "";
    }
    return item.title || item.name || "";
  };

  return (
    <Link
      onMouseOver={() => setShowMediaContent(true)}
      onMouseLeave={() => setShowMediaContent(false)}
      href={`/play/${data?.id}`}
      className="shrink-0 relative"
    >
      <Image
        src={`${TMDB_IMAGE_BASE}${data?.poster_path}`}
        alt={`${getMediaTitle(data)} poster`}
        width={210}
        height={140}
        className="rounded-lg"
      />
      {showMediaContent && (
        <div className="absolute bg-linear-to-t from-black via-black/60 to-transparent bottom-0 w-full px-3 py-5 ">
          <div className=" flex-col items-start gap-10 justify-around">
            <Text className="text-white text-lg truncate font-semibold   rounded">
              {getMediaTitle(data)}
            </Text>
            <div className="flex justify-between flex-row">
              <Text className="text-gray-300 font-normal" as="p">
                {getMediaType(data)}
              </Text>
              <div className="flex-row  flex gap-2 items-center">
                <Star size={20} color="#fb2c36" />
                <Text className="text-gray-300" as="p">
                  {data?.vote_average}/10
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default MediaItem;
