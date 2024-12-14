"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/config/Supabase_Client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight, ChevronRight, ChevronsRight } from "lucide-react";
import SparkklesGlobe from "./SparklesGlobe";

const Header = () => {
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
    <header className="flex flex-col bg-dotted w-full">
      <nav className="py-3 bg-neutral-950 border-b border-gray-700">
        <MaxWidthWrapper>
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="md:text-2xl text-xl text-white font-semibold select-none"
            >
              InSite{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Metrics
              </span>
            </Link>

            <div className="items-center gap-4 hidden sm:flex">
              {/* <Link href="/docs" className="text-white font-normal">
                Docs
              </Link> */}

              {user ? (
                <Button asChild className="rounded-full gradient-btn">
                  <Link
                    href="/dashboard"
                    className="text-gray-900 font-normal capitalize"
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

      <MaxWidthWrapper>
        <section className="text-center py-20 !pb-2">
          <div className="bg-gray-600 mb-4 text-[10px] sm:text-xs rounded-full w-fit mx-auto pl-1 pr-3 py-2 text-white">
            <span className="rounded-full py-1 px-2 bg-blue-500 mr-2">
              ✨ New
            </span>
            We have added custom events feature!
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-6xl mb-4 md:mb-8 font-semibold bg-gradient-to-b from-white to-blue-400 bg-clip-text text-transparent">
            Empowering You with Visitor Insights{" "}
            <br className="hidden md:block" /> Uncover insights to grow your
            audience.
          </h1>
          <p className="text-gray-500 mb-4 md:mb-8 text-sm md:text-[18px] tracking-tight">
            Track clicks, page views, and visitor behaviors in real-time{" "}
            <br className="hidden md:block" /> to boost engagement and optimize
            your strategy.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-8 mb-4">
            <Button
              asChild
              className="rounded-md capitalize bg-gradient-to-r from-blue-600 to-blue-400"
            >
              <Link href="/docs" className="flex items-center gap-2">
                Browse Docs <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-full bg-white text-gray-900 capitalize hover:bg-white"
            >
              <Link
                href={user ? "/dashboard" : "/auth"}
                className="flex items-center gap-2"
              >
                Get started <ChevronsRight className="w-4 h-4" />{" "}
              </Link>
            </Button>
          </div>

          <SparkklesGlobe />
        </section>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
