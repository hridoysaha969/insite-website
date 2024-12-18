"use client";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { currentUser, isLoading } = useUser();
  const [website, setWebsite] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser == null) redirect("/auth");
  }, [currentUser]);

  const fetchWebsite = async () => {
    const { data, error } = await supabase
      .from("websites")
      .select()
      .eq("user_id", currentUser?.id)
      .order("created_at", { ascending: false });

    if (data) setWebsite(data);
    if (error) console.log(error);
  };

  useEffect(() => {
    if (!currentUser || !supabase) return;

    fetchWebsite();
  }, [currentUser, supabase]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short", // "December"
      day: "numeric", // "6"
    });
  };
  // @hridoy_saha

  return (
    <>
      {currentUser ? (
        <div className="min-h-screen bg-gray-950 h-full w-full relative">
          {/* HEADER */}
          <DashboardNav />

          <MaxWidthWrapper>
            <div className="w-full ">
              <div className="w-full items-center justify-end flex p-6 border-b border-slate-600 z-40">
                <Button asChild className="capitalize bg-gray-700 rounded-md">
                  <Link href="/add" prefetch>
                    + add website
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 py-6 px-2 z-40">
                {website.map((item, ind) => (
                  <Link href={`/w/${item.website_name}`} key={ind}>
                    <div className="bg-gray-800 rounded-md py-2 px-2 text-gray-300 hover:shadow-md">
                      <div className="flex mb-6 justify-between items-center">
                        <span className=" text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">
                          {formatDate(item.created_at)}
                        </span>
                        <p className="hover:underline flex items-center text-[12px] gap-1">
                          View full report <ArrowRight className="w-4 h-4" />
                        </p>
                      </div>
                      <h2 className="p-1 text-sm pb-2">{item.website_name}</h2>
                    </div>
                  </Link>
                ))}
                {website.length < 1 && (
                  <div className="text-gray-200 text-sm">
                    No website added yet.
                  </div>
                )}
              </div>
            </div>
          </MaxWidthWrapper>
          <Footer />
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
