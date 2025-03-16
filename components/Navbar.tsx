"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navbar component for site navigation
 */
const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Job Board
        </Link>

        <div className="flex gap-6">
          <Link
            href="/jobs"
            className={`${
              pathname === "/jobs"
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Browse Jobs
          </Link>

          <Link
            href="/post-job"
            className={`${
              pathname === "/post-job"
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
