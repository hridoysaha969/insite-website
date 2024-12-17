"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import { CircleHelp } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const catchUser = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (user.role === "authenticated") redirect("/dashboard");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!supabase) return;

    catchUser();
  }, [supabase]);

  return (
    <>
      {!loading && (
        <div className="flex items-center bg-gray-900 justify-center w-full min-h-screen">
          <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6">
            <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
              Get Started Now
            </h5>
            <p className="text-sm font-normal text-gray-300">
              Unlock data-driven insights to grow your online presence.
            </p>

            <ul className="my-4 space-y-3">
              <li>
                <Button
                  onClick={handleSignIn}
                  className="flex justify-start items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white w-full"
                >
                  <span className="text-white">
                    <FaGoogle />
                  </span>
                  <span className=" ms-3 whitespace-nowrap">
                    Continue with Google
                  </span>
                </Button>
              </li>
            </ul>
            <div>
              <p className="inline-flex cursor-pointer items-center gap-2 text-xs font-normal hover:underline text-gray-300">
                <CircleHelp className="w-4 h-4" />
                Why do I need to register to continue?
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
