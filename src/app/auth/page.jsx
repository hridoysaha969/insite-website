"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
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
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="flex items-center justify-center flex-col gap-12 bg-white shadow-xl rounded-lg pt-16 px-8 pb-8">
            <span className="text-3xl text-indigo-600">
              <FaGoogle />
            </span>

            <Button
              variant="outline"
              onClick={handleSignIn}
              className="hover:text-indigo-500"
            >
              Sign in with Google
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
