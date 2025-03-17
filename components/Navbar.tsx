"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

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

        <Button
          variant="outline"
          asChild
          className="bg-blue-500 text-white hover:text-white"
        >
          <Link
            href={pathname === "/post-job" ? "/" : "/post-job"}
            className={`${
              pathname === "/post-job"
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {pathname === "/post-job" ? "Go to Home" : "Post a Job"}
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
