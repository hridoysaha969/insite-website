"use client";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Add = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const { currentUser } = useUser();
  const router = useRouter();

  const addWebsite = async () => {
    if (website.trim() == "" || loading) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("websites")
      .insert([{ website_name: website.trim(), user_id: currentUser.id }])
      .select();
    setLoading(false);
    setStep(2);
  };

  const checkDomain = async () => {
    let fetchWebsite = [];
    const { data: websites, error } = await supabase
      .from("websites")
      .select("*");

    fetchWebsite = websites;

    if (
      fetchWebsite.filter((item) => item.website_name == website).length > 0
    ) {
      setError("Domain already exists");
    } else {
      setError("");
      addWebsite();
    }
  };

  useEffect(() => {
    if (
      website.trim().includes("http") ||
      website.trim().includes("http://") ||
      website.trim().includes("https://") ||
      website.trim().includes("://") ||
      website.trim().includes(":") ||
      website.trim().includes("/")
    ) {
      setError("please enter the domain only. ie:(google.com)");
    } else {
      setError("");
    }
  }, [website]);

  return (
    <div className="w-full flex justify-center min-h-screen items-center flex-col">
      <div>
        <Link
          href="/"
          className="md:text-2xl text-xl text-gray-900 font-semibold select-none"
        >
          InSite{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Metrics
          </span>
        </Link>
      </div>

      <div className="flex flex-col w-full z-0 items-center justify-center p-12 text-gray-600">
        {step == 1 ? (
          <div className="w-full items-center justify-center flex flex-col">
            <span className=" w-full lg:w-[50%] group">
              <p className="text-gray-500 pb-4 group-hover:text-gray-800 transition-all duration-200">
                Domain
              </p>
              <input
                type="text"
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value.trim().toLowerCase())
                }
                className="border-b outline-none border-gray-500 w-full py-2 px-4 rounded-md placeholder:text-gray-400 hover:border-gray-700"
              />

              {error ? (
                <p className="text-xs pt-2 font-normal text-red-400">{error}</p>
              ) : (
                <p className="text-xs pt-2 font-normal text-gray-600">
                  Enter domain or sub-domain without {`"www"`}
                </p>
              )}
            </span>
            {error == "" && (
              <button
                className="py-2 text-sm px-4 rounded-md bg-gray-700 text-white mt-5"
                onClick={checkDomain}
              >
                {loading ? "Loading..." : "Add Website"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%]">
              <textarea
                disabled
                className="outline-none w-full rounded-md bg-transparent p-4 text-gray-500 border border-gray-600"
                value={`<script defer data-domain="${website}"
                src="http://localhost:3000/tracking-script.js"></script>`}
              />
              <p className="text-sm text-gray-500 pt-2 font-light">
                Add the script in your {"<head>"} tag of your website.
              </p>
            </span>

            <button
              onClick={() => router.push(`/w/${website.trim()}`)}
              className="py-2 px-4 flex items-center bg-gray-600 text-white rounded-md"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
