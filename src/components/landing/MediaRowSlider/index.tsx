import { Text } from "@/components/atoms";
import MediaRowItem from "./MediaRowItem";

interface MediaRowSliderProps {
  title: string;
  data?: FeaturedMovieProps[] | TVShowProps[];
  isLoading?: boolean;
}

const MediaRowSlider = ({ title, data, isLoading }: MediaRowSliderProps) => {
  if (isLoading) {
    return (
      <div className="mb-6">
        <Text className="text-white text-lg font-bold px-4 mb-3">{title}</Text>
        <div className="flex-row px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-md mr-2"
              style={{ width: 110, height: 160 }}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <Text as="h1" size="3xl" weight="semibold">
        {title}
      </Text>
      <div className="flex flex-row items-start gap-2 overflow-x-auto overflow-y-hidden w-full scrollbar-hide">
        {data?.map((media, index) => (
          <MediaRowItem key={index} data={media} />
        ))}
      </div>
    </div>
  );
};

export default MediaRowSlider;
