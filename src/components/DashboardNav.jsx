import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const DashboardNav = () => {
  return (
    <header className="shadow-md w-full">
      <nav className="w-[98%] md:w-[700px] xl:w-[1024px] mx-auto py-4 px-2 md:px-4 flex justify-between items-center sticky z-50">
        <Link
          href="/"
          className="text-2xl text-gray-900 font-semibold select-none"
        >
          InSite{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Metrics
          </span>
        </Link>

        <div className="flex space-x-6">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              Snippet
            </p>
            <Button asChild>
              <Link
                href="/dashboard"
                prefetch
                className="flex items-center gap-2 hover:gap-3 transition-all ease-linear"
              >
                Dashboard
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
