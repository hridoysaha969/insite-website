"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/config/Supabase_Client";

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
    <header className="flex flex-col items-center">
      <nav className="w-[98%] md:w-[700px] xl:w-[1024px] mx-auto py-4 px-2 md:px-4 flex justify-between items-center">
        <Link
          href="/"
          className="md:text-2xl text-xl text-gray-900 font-semibold select-none"
        >
          InSite{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Metrics
          </span>
        </Link>

        <div className="items-center gap-4 hidden sm:flex">
          <Link href="/docs" className="text-gray-900 font-normal">
            Docs
          </Link>

          {user ? (
            <Button asChild className="rounded-md">
              <Link
                href="/dashboard"
                className="text-gray-900 font-normal capitalize"
              >
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild className="rounded-full">
              <Link
                href="/auth"
                className="text-gray-900 font-normal capitalize"
              >
                Sign in
              </Link>
            </Button>
          )}
        </div>
      </nav>

      <section className="text-center py-28 md:py-40 px-2 md:px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-8 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
          Empowering You with Visitor Insights{" "}
          <br className="hidden md:block" /> Uncover insights to grow your
          audience.
        </h1>
        <p className="text-gray-600 mb-4 md:mb-8 text-sm md:text-[18px] tracking-tight">
          Track clicks, page views, and visitor behaviors in real-time{" "}
          <br className="hidden md:block" /> to boost engagement and optimize
          your strategy.
        </p>
        <div className="flex items-center justify-center gap-4 my-8">
          <Button asChild className="rounded-md capitalize">
            <Link href={user ? "/dashboard" : "/auth"}>Get started</Link>
          </Button>
          {/* <Button asChild variant="secondary" className="rounded-md capitalize">
            <Link href="/docs">Docs</Link>
          </Button> */}
        </div>
      </section>
    </header>
  );
};

export default Header;
