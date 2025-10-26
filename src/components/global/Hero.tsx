import { Button } from "@/components/ui/button";
import { Text } from "@/components/atoms";
import { Play, Info } from "lucide-react";
import Image from "next/image";

interface props {
  movie: FeaturedMovieProps;
}

const Hero = ({ movie }: props) => {
  const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";
  if (!movie) {
    return (
      <div>
        <div className="flex-1 items-center justify-center">
          <Text className="text-gray-500">No featured content</Text>
        </div>
      </div>
    );
  }

  const backdropUri = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : null;
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backdropUri ?? ""}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        {/* Top gradient (for navbar blend) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Left gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-96 bg-gradient-to-r from-black via-black/50 to-transparent" />

        {/* Right gradient */}
        <div className="absolute top-0 bottom-0 right-0 w-96 bg-gradient-to-l from-black/80 to-transparent" />

        {/* Overall dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-12 max-w-7xl">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <Text as="h1" className="text-5xl md:text-6xl lg:text-7xl font-bold">
            The Kapil Sharma Show
          </Text>

          {/* Description */}
          <Text className="text-lg md:text-xl max-w-xl leading-relaxed">
            Join Kapil Sharma and his hilarious gang as they bring laughter to
            your screens with celebrity guests, comedy sketches, and
            unforgettable entertainment.
          </Text>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="default"
              size="lg"
              className="bg-white text-black hover:bg-white/80 font-semibold text-lg px-8"
            >
              <Play className="mr-2 h-6 w-6 fill-current" />
              Play
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-gray-500/70 text-white border-0 hover:bg-gray-500/50 font-semibold text-lg px-8"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
