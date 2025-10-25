"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const { user, loading } = useAuth();

  // Don't render navbar while loading or if user is not logged in
  if (loading || !user) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
