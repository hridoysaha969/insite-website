"use client";

import CodeComp from "@/components/CodeComp";
import DashboardNav from "@/components/DashboardNav";
import Navbar from "@/components/Navbar";
import { Sparkles } from "@/components/Sparkles";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const { currentUser } = useUser();
  useEffect(() => {
    if (!currentUser) return;
  }, [currentUser]);

  const getUserAPIs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", currentUser?.id);

    if (data.length > 0) {
      setApiKey(data[0].api);
    }
    setLoading(false);
  };
  const generateApiKey = async () => {
    setLoading(true);
    if (!currentUser) return;

    const randomString =
      Math.random().toString(36).substring(2, 300) +
      Math.random().toString(36).substring(2, 300);

    const { data, error } = await supabase
      .from("users")
      .insert([{ user_id: currentUser.id, api: randomString }]);

    if (error) console.log(error);
    setApiKey(randomString);
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser || !supabase) return;

    getUserAPIs();
  }, [currentUser, supabase]);

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <h1>Redirecting</h1>
      </div>
    );
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="bg-dotted min-h-screen">
      <DashboardNav />
      <div className="w-full min-h-screen flex justify-center items-center">
        {!loading && !apiKey && (
          <div className="w-full h-full">
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={generateApiKey}
                className="text-center cursor-pointer gradient-btn"
              >
                Get API
              </Button>
            </div>

            <div className="relative -mt-4 -mb-20 h-80 w-auto overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
              <Sparkles
                density={1200}
                className="absolute inset-x-0 bottom-0 h-full w-full "
              />
            </div>
          </div>
        )}

        {apiKey && (
          <div className="mt-12 space-y-12 py-6 w-full md:w-3/4 lg:w-1/2">
            <div className="space-y-12 px-4">
              <p>Your Api Key : </p>
              <input
                type="text"
                disabled
                className="outline-none py-1 px-4 rounded-md border-gray-400"
                value={apiKey}
                readOnly
              />
              <Button variant="ghost" onClick={copyApiKey}>
                Copy
              </Button>
            </div>

            <div className="space-y-4 border-t border-zinc-400 p-6">
              <h1>How to use custom events using API?</h1>

              <div>
                <CodeComp />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
