"use client";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { ArrowLeft, ArrowRight, CheckCheck, ClipboardList } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Add = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const [copied, setCopied] = useState(false);
  const { currentUser } = useUser();
  const router = useRouter();

  const scriptText = `<script defer data-domain="${website}"
                src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>`;

  useEffect(() => {
    if (!currentUser) return;
  }, [currentUser]);

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
      website.trim().includes("www") ||
      website.trim().includes("http://") ||
      website.trim().includes("https://") ||
      website.trim().includes("://") ||
      website.trim().includes(":") ||
      website.trim().includes("/")
    ) {
      setError(`Avoide "https" or "www". ie:(google.com)`);
    } else {
      setError("");
    }
  }, [website]);

  const copyCode = async () => {
    try {
      // Copy the text to the clipboard
      await navigator.clipboard.writeText(scriptText);
      setCopied(true);

      // Reset the copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="w-full bg-gray-950 flex justify-center min-h-screen items-center flex-col">
      <div className="w-full sm:max-w-2xl md:max-w-3xl relative max-w-sm p-4 rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="md:text-2xl text-xl text-white font-semibold select-none"
          >
            InSite{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Metrics
            </span>
          </Link>
        </div>

        <div className="mt-12">
          {step == 1 ? (
            <div className="">
              <div className="">
                <Link href="/dashboard" className="absolute top-3 left-2">
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
                </Link>
                <p className="text-gray-300 mb-4 text-sm">Enter your domain</p>
                <input
                  type="text"
                  value={website}
                  onChange={(e) =>
                    setWebsite(e.target.value.trim().toLowerCase())
                  }
                  placeholder="ie: your-website.com"
                  className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white outline-none"
                />

                {error ? (
                  <p className="text-xs pt-2 font-normal text-red-400">
                    {error}
                  </p>
                ) : (
                  <p className="text-xs pt-2 font-normal text-gray-400">
                    Enter domain or sub-domain without {`"www" or "https://"`}
                  </p>
                )}
              </div>

              <button
                className="py-2 mt-8 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 text-sm px-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                onClick={checkDomain}
                disabled={loading || error || !website}
              >
                {loading ? "Loading..." : "Add Website"}
              </button>
            </div>
          ) : (
            <div className="w-full">
              <span className="">
                <p className="text-sm text-gray-300 pt-2 font-light">
                  Place the script inside the{" "}
                  <span className="text-red-400">{"<head>"}</span> tag of your
                  website for seamless integration.
                </p>

                <div className="mt-4">
                  <div className="bg-gray-600 cursor-pointer -mb-1 py-1 flex justify-end items-center rounded-t-md px-2">
                    <p
                      onClick={copyCode}
                      className="flex items-center select-none gap-1"
                    >
                      {copied ? (
                        <CheckCheck className="w-4 h-4 text-gray-200" />
                      ) : (
                        <ClipboardList className="w-4 h-4 text-gray-200" />
                      )}
                      <span className="text-xs text-gray-200">
                        {copied ? "Copied" : "Copy"}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-md pb-4">
                    <SyntaxHighlighter language="html" style={coldarkDark}>
                      {scriptText}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </span>

              <button
                onClick={() => router.push(`/w/${website.trim()}`)}
                className="py-2 px-4 flex items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-md"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
