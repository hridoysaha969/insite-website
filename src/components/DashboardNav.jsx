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
import MaxWidthWrapper from "./MaxWidthWrapper";

const DashboardNav = () => {
  const { currentUser } = useUser();
  const pathName = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/auth");
  };

  return (
    <header className="shadow-md w-full">
      <nav className="py-3 w-full bg-gray-950 border-b border-gray-700 z-50">
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

            {currentUser && (
              <div className="flex space-x-6">
                {pathName !== "/dashboard" && (
                  <div className="items-center space-x-4 flex">
                    {/* <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      Snippet
                    </p> */}
                    <Button
                      asChild
                      className="gradient-btn hidden md:flex rounded-full"
                    >
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
                    {/* <div className="flex space-x-2 items-center justify-center border border-gray-500 rounded-full py-1 md:py-2 px-3 md:px-4">
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
                    </div> */}
                    <div className="relative">
                      <Image
                        src={currentUser?.user_metadata.avatar_url}
                        alt="User Image"
                        width={30}
                        height={30}
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-gray-700 border-none outline-none text-gray-600 p-3 w-[250px] rounded-md mr-3 md:mr-0 shadow-md">
                    <DropdownMenuLabel className="text-sm text-blue-500 tracking-tight font-normal">
                      Settings
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    <Link href={"/settings"}>
                      <DropdownMenuLabel className="px-4 py-2 mb-2 bg-gray-800 hover:bg-blue-400 text-white rounded-md transition-all duration-300 flex justify-start items-center">
                        <span>
                          <Settings2 className="w-4 h-4 mr-2" />{" "}
                        </span>{" "}
                        API
                      </DropdownMenuLabel>
                    </Link>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    <Link href={"/settings"}>
                      <DropdownMenuLabel className="px-4 py-2 mb-2 bg-gray-800 hover:bg-blue-400 text-white rounded-md transition-all duration-300 cursor-pointer flex justify-start items-center">
                        <span>
                          <FileCode className="w-4 h-4 mr-2" />
                        </span>
                        Guide
                      </DropdownMenuLabel>
                    </Link>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel
                      onClick={handleLogout}
                      className="px-4 py-2 mb-2 bg-gray-800 hover:bg-blue-400 text-white rounded-md transition-all duration-300 cursor-pointer flex justify-start items-center"
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
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default DashboardNav;
