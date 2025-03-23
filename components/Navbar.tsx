"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { logout, checkAuth } from "@/app/(auth)/actions";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { isAuthenticated } = await checkAuth();
      setIsAuthenticated(isAuthenticated);
    };
    checkAuthStatus();
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/jobs");
    } else {
      router.push("/");
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a2b4b]/40 bg-[#050e1d]/95 backdrop-blur supports-[backdrop-filter]:bg-[#050e1d]/80">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href={isAuthenticated ? "/jobs" : "/"}
          onClick={handleLogoClick}
          className="mr-6 flex items-center space-x-2"
        >
          <span className="font-bold text-white">Status Hired</span>
          <span className="rounded-full bg-[#1a2b4b] px-2 py-0.5 text-xs font-medium text-white">
            Beta
          </span>
        </Link>

        <nav className="flex justify-end items-end space-x-6 text-sm font-medium">
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="bg-[#1a2b4b] text-white hover:text-white hover:bg-[#253c61] border-[#1a2b4b] w-22"
                >
                  <Link href="/post-job">Post a Job</Link>
                </Button>
                <Button
                  variant="outline"
                  type="submit"
                  onClick={handleLogout}
                  className="bg-[#1a2b4b] text-white hover:text-white hover:bg-[#253c61] border-[#1a2b4b] w-22"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                asChild
                className="rounded-lg bg-white text-[#050e1d] border-transparent"
              >
                <Link href="/login">Find Jobs</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
