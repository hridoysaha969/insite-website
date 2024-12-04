import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRightIcon, FileCode, LogOut, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { supabase } from "@/config/Supabase_Client";
import { redirect, usePathname } from "next/navigation";

const DashboardNav = () => {
  const { currentUser } = useUser();
  const pathName = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/auth");
  };

  return (
    <header className="shadow-md w-full">
      <nav className="w-[98%] md:w-[700px] xl:w-[1024px] mx-auto py-4 px-2 md:px-4 flex justify-between items-center sticky z-50">
        <Link
          href="/"
          className="md:text-2xl text-xl text-gray-900 font-semibold select-none"
        >
          InSite{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Metrics
          </span>
        </Link>

        {currentUser && (
          <div className="flex space-x-6">
            {pathName !== "/dashboard" && (
              <div className="items-center space-x-4 hidden md:flex">
                <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  Snippet
                </p>
                <Button asChild>
                  <Link
                    href="/dashboard"
                    prefetch
                    className="flex items-center gap-2"
                  >
                    Dashboard
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-600 outline-none p-0 m-0 border-none">
                <div className="flex space-x-2 items-center justify-center border border-gray-500 rounded-full py-1 md:py-2 px-3 md:px-4">
                  <p className="text-sm text-gray-600 font-semibold">
                    {currentUser?.user_metadata.full_name.split(" ")[0]}
                  </p>
                  <Image
                    src={currentUser?.user_metadata.avatar_url}
                    alt="User Image"
                    width={30}
                    height={30}
                    className="rounded-full w-[25px] h-[25px] md:h-[30px] md:w-[30px]"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white outline-none text-gray-600 p-3 w-[250px] rounded-md mr-3 md:mr-0 shadow-md">
                <DropdownMenuLabel className="text-sm text-blue-500 tracking-tight font-normal">
                  Settings
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-700" />
                <Link href={"/settings"}>
                  <DropdownMenuLabel className="px-4 py-2 hover:bg-gray-600 hover:text-white rounded-md transition-all duration-300 flex justify-start items-center">
                    <span>
                      <Settings2 className="w-4 h-4 mr-2" />{" "}
                    </span>{" "}
                    API
                  </DropdownMenuLabel>
                </Link>

                <DropdownMenuSeparator className="bg-gray-700" />
                <Link href={"/settings"}>
                  <DropdownMenuLabel className="px-4 py-2 hover:bg-gray-600 hover:text-white rounded-md transition-all duration-300 cursor-pointer flex justify-start items-center">
                    <span>
                      <FileCode className="w-4 h-4 mr-2" />
                    </span>
                    Guide
                  </DropdownMenuLabel>
                </Link>

                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuLabel
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-600 hover:text-white rounded-md transition-all duration-300 cursor-pointer flex justify-start items-center"
                >
                  <span>
                    <LogOut className="w-4 h-4 mr-2" />
                  </span>
                  Log out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </nav>
    </header>
  );
};

export default DashboardNav;
