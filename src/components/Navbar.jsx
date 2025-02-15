"use client";
import { supabase } from "@/config/Supabase_Client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Menu } from "lucide-react";

const Navbar = ({ docs, setShowMenu }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    catchUser();
  }, []);

  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (user.role === "authenticated") {
        setUser(user);
      }
    }
  };

  return (
    <nav className="py-3 w-full bg-gray-950 border-b border-gray-700">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {docs && (
              <span
                className="md:hidden"
                onClick={() => setShowMenu((prevState) => !prevState)}
              >
                <Menu className="w-5 h-5 text-gray-200" />
              </span>
            )}
            <Link
              href="/"
              className="md:text-2xl text-xl text-white font-semibold select-none"
            >
              InSite{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Metrics
              </span>
            </Link>
          </div>

          <div className="items-center gap-4 flex">
            {user ? (
              <Button asChild className="rounded-full gradient-btn">
                <Link
                  href="/dashboard"
                  className="text-gray-900 text-[12px] sm:text-xs font-normal capitalize"
                >
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild className="rounded-full gradient-btn">
                <Link
                  href="/auth"
                  className="text-gray-900 font-normal capitalize"
                >
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
