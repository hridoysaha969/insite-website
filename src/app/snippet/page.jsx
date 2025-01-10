"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const page = () => {
  const [selectSnippet, setSelectSnippet] = useState("js");
  const scriptText = `<script defer data-domain="[your-website-domain]" 
  src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>`;
  const nextScript = `
          <Script  
            src="https://yourwebsite.com/tracking.js"  
            data-domain="[your-website-domain]  
            strategy="afterInteractive"  
          />  
    `;

  return (
    <section className="bg-gray-950 h-screen">
      <Navbar />
      <MaxWidthWrapper>
        <h1 className="text-white text-lg md:text-2xl capitalize mb-2 mt-12 font-semibold text-center">
          I am using
        </h1>
        <div className="my-4 rounded-lg bg-gray-800 py-3 px-6 w-max mx-auto flex items-center justify-center gap-4">
          <button
            className={cn(
              "py-2 px-4 text-sm font-semibold bg-gray-100 text-gray-950 rounded-md",
              {
                "bg-gray-900 text-white": selectSnippet === "js",
              }
            )}
            onClick={() => setSelectSnippet("js")}
          >
            Vanila JS
          </button>
          <button
            className={cn(
              "py-2 px-4 text-sm font-semibold bg-gray-100 text-gray-950 rounded-md",
              {
                "bg-gray-900 text-white": selectSnippet === "next",
              }
            )}
            onClick={() => setSelectSnippet("next")}
          >
            Next.JS
          </button>
        </div>

        {selectSnippet === "js" && (
          <div className="rounded-md pb-4 w-full md:max-w-3xl mx-auto py-4">
            <SyntaxHighlighter
              language="html"
              wrapLines={true}
              style={coldarkDark}
            >
              {scriptText}
            </SyntaxHighlighter>
          </div>
        )}
        {selectSnippet === "next" && (
          <div className="rounded-md pb-4 w-full md:max-w-3xl mx-auto py-4">
            <SyntaxHighlighter
              language="html"
              wrapLines={true}
              style={coldarkDark}
            >
              {nextScript}
            </SyntaxHighlighter>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
