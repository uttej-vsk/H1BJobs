"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { logout } from "@/app/(auth)/actions";

/**
 * Navbar component for site navigation
 */
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Talent Visa
        </Link>

        <div className="flex items-center gap-4">
          {pathname === "/" && (
            <Button
              variant="outline"
              asChild
              className="bg-blue-500 text-white hover:text-white w-22"
            >
              <Link href="/post-job">Post a Job</Link>
            </Button>
          )}

          {pathname !== "/login" && (
            <Button
              variant="outline"
              type="submit"
              onClick={logout}
              className="bg-blue-500 text-white hover:text-white w-22"
            >
              Logout
            </Button>
          )}

          {pathname === "/login" && (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
