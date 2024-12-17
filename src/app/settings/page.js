"use client";

import CodeComp from "@/components/CodeComp";
import DashboardNav from "@/components/DashboardNav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { CheckCheck, Copy, Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [showApi, setShowApi] = useState(false);

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
        <div className="w-full bg-gray-950 min-h-screen flex justify-center items-center">
          <h1 className="text-gray-200 text-sm">Redirecting...</h1>
        </div>
      </div>
    );
  }

  // const copyApiKey = () => {
  //   navigator.clipboard.writeText(apiKey);
  // };

  const copyApiKey = async () => {
    try {
      // Copy the text to the clipboard
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);

      // Reset the copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const maskApi = (email) => {
    // Use regular expression to match username part
    let maskedEmail = email.replace(/(?<=.{0})./g, "*"); // Replace characters after the first 5 characters with asterisks
    return maskedEmail;
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <DashboardNav />
      <div className="w-full">
        {!loading && !apiKey && (
          <MaxWidthWrapper>
            <div className="w-full h-full py-6">
              <ol className="items-start md:flex mb-6 mt-8">
                <li className="relative mb-6 md:mb-0">
                  <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-4 h-4 rounded-full bg-gray-500 text-xs text-gray-200 ml-1 md:ml-0 ring-8 ring-gray-700 shrink-0">
                      1
                    </div>
                    <div className="hidden md:flex w-full bg-gray-400 h-0.5 dark:bg-gray-700"></div>
                  </div>
                  <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Step 1
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      At first generate your API key and add this to your
                      project file or environment file.{" "}
                      {`(Ex. INSIGHT_METRICS_API_KEY=[your-api-key])`}
                    </p>
                  </div>
                </li>
                <li className="relative mb-6 md:mb-0">
                  <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-4 h-4 rounded-full bg-gray-500 text-xs text-gray-200 ml-1 md:ml-0 ring-8 ring-gray-700 shrink-0">
                      2
                    </div>
                    <div className="hidden md:flex w-full bg-gray-400 h-0.5 dark:bg-gray-700"></div>
                  </div>
                  <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Step 2
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Copy the custom event setup code and add this to your
                      action file or where you want to trigger the events.
                    </p>
                  </div>
                </li>
                <li className="relative mb-6 md:mb-0">
                  <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-4 h-4 rounded-full bg-gray-500 text-xs text-gray-200 ml-1 md:ml-0 ring-8 ring-gray-700 shrink-0">
                      3
                    </div>
                    <div className="hidden md:flex w-full bg-gray-400 h-0.5 dark:bg-gray-700"></div>
                  </div>
                  <div className="mt-3 sm:pe-8">
                    <h3 className="text-lg font-semibold text-gray-300">
                      Step 3
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Create a Send request function to trigger the events. Use{" "}
                      {`"fetch()" or axios`} for POST request.
                    </p>
                  </div>
                </li>
              </ol>

              <h1 className="text-sm font-semibold mb-3 text-gray-200">
                Generate API to continue
              </h1>
              <div className="">
                <Button
                  onClick={generateApiKey}
                  className="text-center cursor-pointer bg-transparent border border-gray-400 rounded-md px-6 py-2"
                >
                  Get API Key
                </Button>
              </div>
            </div>
          </MaxWidthWrapper>
        )}

        {apiKey && (
          <MaxWidthWrapper>
            <div className="mt-4 py-6 w-full">
              <h1 className="text-sm sm:text-xl border-b border-gray-500 font-semibold text-gray-300 py-4">
                Settings
              </h1>
              <div className="text-gray-300 py-4">
                <h2 className="mb-3">Your Api Key : </h2>
                <div className="flex items-center gap-3">
                  <div className="py-2 flex-1 px-4 max-w-xs flex items-center gap-1 sm:gap-0 justify-start rounded-md border-gray-600 bg-gray-700">
                    <input
                      type="text"
                      disabled
                      className="outline-none bg-gray-700 w-full"
                      value={showApi ? apiKey : maskApi(apiKey)}
                      readOnly
                    />
                    <span onClick={() => setShowApi(!showApi)}>
                      {showApi ? (
                        <EyeOff className="w-4 h-4 cursor-pointer" />
                      ) : (
                        <Eye className="w-4 h-4 cursor-pointer" />
                      )}
                    </span>
                  </div>
                  <Button
                    onClick={copyApiKey}
                    className="py-1 select-none px-4 rounded-md bg-blue-500 hover:bg-blue-400"
                  >
                    {copied ? (
                      <CheckCheck className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}{" "}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="text-gray-300 text-[13px]">
                  1. To start setting up custome events, follow the steps given
                  bellow.
                </h1>

                <div className="max-w-3xl">
                  <CodeComp />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        )}
      </div>
    </div>
  );
};

export default Page;
