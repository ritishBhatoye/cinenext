import { Link, Text } from "@/components/atoms";

const Navbar = () => {
  const navTabs: NavItemDataType[] = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "tv-shows",
      title: "TV Shows",
    },
    {
      id: "movies",
      title: "Movies",
    },
    {
      id: "news-and-popular",
      title: "News & Popular",
    },
    {
      id: "my-list",
      title: "My List",
    },
    {
      id: "browse-by-language",
      title: "Browse by Language",
    },
  ];
  return (
    <div className="flex-row flex justify-between items-center">
      <div className="flex flex-row items-center justify-between gap-10">
        <Text as="h1">Cinenext</Text>
        <div className="flex flex-row items-center gap-5">
          {navTabs.map((navItem: NavItemDataType) => (
            <Link key={navItem.id}>{navItem.title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
