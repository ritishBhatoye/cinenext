import Image from "next/image";
import Link from "next/link";

interface props {
  data?: FeaturedMovieProps | TVShowProps;
}
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const MediaRowItem = ({ data }: props) => {
  return (
    <Link href={`/play/${data?.id}`}>
      <Image
        src={`${TMDB_IMAGE_BASE}${data?.poster_path}`}
        alt={`No Video for ${data?.popularity}`}
        width={300}
        height={400}
        className="rounded-lg"
      />
    </Link>
  );
};

export default MediaRowItem;
