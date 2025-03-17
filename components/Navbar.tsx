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

        {pathname === "/" && (
          <Button
            variant="outline"
            asChild
            className="bg-blue-500 text-white hover:text-white"
          >
            <Link
              href="/post-job"
              className="text-gray-600 hover:text-blue-500"
            >
              Post a Job
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
