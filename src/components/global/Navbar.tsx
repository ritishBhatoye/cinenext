import { Link } from "@/components/atoms";
import { Bell, Search, User } from "lucide-react";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
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
      id: "new-and-popular",
      title: "New & Popular",
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex-row flex justify-between items-center px-12 py-5 bg-gradient-to-b from-black to-transparent transition-all duration-300 w-11/12 mx-auto">
      <div className="flex flex-row items-center justify-between gap-10">
        <Logo />
        <div className="flex flex-row items-center gap-5">
          {navTabs.map((navItem: NavItemDataType) => (
            <Link
              key={navItem.id}
              href={`/${navItem.id}`}
              className={`${
                pathname.includes(navItem?.id)
                  ? "text-red-500 border-b border-b-red-500 pb-2"
                  : "text-white"
              }`}
            >
              {navItem.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Search
          onClick={() => router.push("/search")}
          className="cursor-pointer hover:text-gray-300 transition-colors"
        />
        <Bell className="cursor-pointer hover:text-gray-300 transition-colors" />
        <User className="cursor-pointer hover:text-gray-300 transition-colors" />
      </div>
    </nav>
  );
};

export default Navbar;
