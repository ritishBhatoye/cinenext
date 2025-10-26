"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't render navbar on auth pages
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  // Don't render navbar while loading, if user is not logged in, or on auth pages
  if (loading || !user || isAuthPage) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
