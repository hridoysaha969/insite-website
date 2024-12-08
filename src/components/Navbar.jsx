import { supabase } from "@/config/Supabase_Client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
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
            <Link href="/auth" className="text-gray-900 font-normal capitalize">
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
