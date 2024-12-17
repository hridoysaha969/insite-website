"use client";
import Changelog from "@/components/Changelog";
import Footer from "@/components/Footer";
import Introduction from "@/components/Introduction";
import License from "@/components/License";
import Navbar from "@/components/Navbar";
import Quickstart from "@/components/Quickstart";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const Docs = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("introduction");

  return (
    <main>
      <Navbar docs={true} setShowMenu={setShowMenu} />

      <section className="w-full min-h-screen bg-gray-950 flex justify-start items-start">
        <aside
          className={cn(
            "md:w-[20%] w-[60%] min-h-screen overflow-y-auto border-r border-gray-600 absolute md:relative -left-full md:left-0 z-30 bg-gray-950 transition-all ease-in-out delay-200",
            {
              "left-0": showMenu,
            }
          )}
        >
          <div className="py-6 px-4">
            <h3 className="text-gray-200 text-sm uppercase mb-3">
              getting started
            </h3>

            <ul className="mb-6">
              <li className="mb-2">
                <button
                  onClick={() => {
                    setActiveMenu("introduction");
                    setShowMenu(false);
                  }}
                  className={cn(
                    "text-gray-400 capitalize text-xs hover:text-gray-100",
                    {
                      "text-blue-400": activeMenu === "introduction",
                      "hover:text-blue-400": activeMenu === "introduction",
                    }
                  )}
                >
                  introduction
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => {
                    setActiveMenu("quickstart");
                    setShowMenu(false);
                  }}
                  className={cn(
                    "text-gray-400 capitalize text-xs hover:text-gray-100",
                    {
                      "text-blue-400": activeMenu === "quickstart",
                      "hover:text-blue-400": activeMenu === "quickstart",
                    }
                  )}
                >
                  quickstart
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => {
                    setActiveMenu("license");
                    setShowMenu(false);
                  }}
                  className={cn(
                    "text-gray-400 capitalize text-xs hover:text-gray-100",
                    {
                      "text-blue-400": activeMenu === "license",
                      "hover:text-blue-400": activeMenu === "license",
                    }
                  )}
                >
                  License
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => {
                    setActiveMenu("changelog");
                    setShowMenu(false);
                  }}
                  className={cn(
                    "text-gray-400 capitalize text-xs hover:text-gray-100",
                    {
                      "text-blue-400": activeMenu === "changelog",
                      "hover:text-blue-400": activeMenu === "changelog",
                    }
                  )}
                >
                  changelog
                </button>
              </li>
            </ul>

            <h3 className="text-gray-200 text-sm uppercase mb-3">
              Integration guides
            </h3>

            <ul className="mb-6">
              <li className="mb-2">
                <Link
                  href="http://"
                  className="text-gray-400 capitalize text-xs hover:text-gray-100"
                >
                  introduction
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="http://"
                  className="text-gray-400 capitalize text-xs hover:text-gray-100"
                >
                  quickstart
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <article className="md:w-[80%] w-full min-h-screen overflow-y-auto">
          {activeMenu === "introduction" && (
            <Introduction setActiveMenu={setActiveMenu} />
          )}
          {activeMenu === "quickstart" && <Quickstart />}
          {activeMenu === "license" && <License />}
          {activeMenu === "changelog" && <Changelog />}
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default Docs;
