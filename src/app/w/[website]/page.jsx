"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Loader2,
  LoaderPinwheel,
  RotateCw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CustomTooltip } from "@/components/CustomTooltip";

const Page = () => {
  const { currentUser } = useUser();
  const { website } = useParams();
  const [loading, setLoading] = useState(false);

  const [pageViews, setPageViews] = useState([]);
  const [totalVisits, setTotalVisits] = useState([]);
  const [customEvents, setCustomEvents] = useState([]);
  const [groupedPageViews, setGroupedPageViews] = useState([]);

  const [groupedPageSources, setGroupedPageSources] = useState([]);
  const [groupedCustomEvents, setGroupedCustomEvents] = useState([]);
  const [activeCustomEventTab, setActiveCustomEventTab] = useState("");
  const [filterValue, setFilterValue] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role !== "authenticated") redirect("/auth");

    const checkWebsiteCurrentUser = async () => {
      const { data, error } = await supabase
        .from("websites")
        .select()
        .eq("website_name", website)
        .eq("user_id", currentUser.id);
      data.length == 0
        ? redirect("/dashboard")
        : setTimeout(() => {
            fetchViews();
          }, 500);
    };

    checkWebsiteCurrentUser();
  }, [currentUser]);

  const fetchViews = async () => {
    setLoading(true);

    try {
      const [viewsResponse, visitsResponse, customEventsResponse] =
        await Promise.all([
          supabase.from("page_views").select().eq("domain", website),
          supabase.from("visits").select().eq("website_id", website),
          supabase.from("events").select().eq("website_id", website),
        ]);

      const views = viewsResponse.data;
      const visits = visitsResponse.data;
      const customEventsData = customEventsResponse.data;

      setPageViews(views);
      setGroupedPageViews(groupPageViews(views));
      setTotalVisits(visits);
      setGroupedPageSources(groupPageSources(visits));
      setCustomEvents(customEventsData);
      // grouping the customEvent by name
      setGroupedCustomEvents(
        customEventsData.reduce((acc, event) => {
          acc[event.event_name] = (acc[event.event_name] || 0) + 1;
          return acc;
        }, {})
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // handle the format of the numbers/counts
  const abbreviateNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };

  const groupPageViews = (pageViews) => {
    const groupedPageViews = {};
    pageViews.forEach(({ page }) => {
      // Extract the path from the page URL by removing the protocol and hostname
      const path = page.replace(/^(?:\/\/|[^/]+)*\//, "");

      // Increment the visit count for the page path
      groupedPageViews[path] = (groupedPageViews[path] || 0) + 1;
    });

    return Object.keys(groupedPageViews).map((page) => ({
      page: page,
      visits: groupedPageViews[page],
    }));
  };

  function groupPageSources(visits) {
    const groupedPageSources = {};

    visits.forEach(({ source }) => {
      groupedPageSources[source] = (groupedPageSources[source] || 0) + 1;
    });

    return Object.keys(groupedPageSources).map((source) => ({
      source: source,
      visits: groupedPageSources[source],
    }));
  }

  const formatTimeStampz = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short", // "December"
      day: "numeric", // "6"
    });
  };

  if (loading) {
    return (
      <div className="text-gray-600 min-h-screen w-full items-start flex flex-col">
        <Navbar />
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-950">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-300 bg-gray-950 min-h-screen w-full">
      <Navbar />

      {pageViews?.length == 0 && !loading ? (
        <div className="w-full items-center justify-center flex flex-col space-y-6 z-40 relative min-h-screen px-4">
          <div className="bg-gray-700 relative shadow-md px-6 py-8 rounded-lg flex flex-col items-center">
            <div className="mb-4 flex flex-col items-center gap-3">
              <Link href="/dashboard" className="absolute top-2 left-2">
                <ArrowLeft className="text-gray-300 w-5 h-5" />
              </Link>
              <LoaderPinwheel className="w-6 h-6 animate-pulse text-blue-500" />
              <p>No one has visited yet. Wait for the first visit.</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-sm px-6"
            >
              <RotateCw className="w-4 h-4" /> Reload
            </Button>
          </div>
        </div>
      ) : (
        <MaxWidthWrapper>
          <div className="pt-12">
            <div className="py-4">
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>
            <Tabs defaultValue="general" className="pb-12">
              <TabsList className="w-full flex justify-start gap-1 items-center bg-gray-700 py-2 px-3 rounded-md mb-4">
                <TabsTrigger
                  value="general"
                  className="bg-gray-800 text-gray-200"
                >
                  Performance
                </TabsTrigger>
                <TabsTrigger
                  value="custom_event"
                  className="bg-gray-800 text-gray-200"
                >
                  Custom Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="w-full">
                <div className="w-full flex justify-start items-start gap-2 mt-6 px-4">
                  <div className="p-3 relative border-gray-500 bg-gray-800 rounded-md pr-10 text-gray-300 shadow-md">
                    <p className="text-blue-400 flex items-center gap-1 mb-4 text-xs font-medium w-full border-gray-400">
                      <Sparkles className="w-4 h-4" /> Total Visits
                    </p>
                    <p className="text-2xl lg:text-4xl font-bold mb-2">
                      {abbreviateNumber(totalVisits.length)}
                    </p>
                    <CustomTooltip message="This shows only website views. It only counts the visits of a single visitor or user" />
                  </div>

                  <div className="p-3 relative border-gray-500 bg-gray-800 rounded-md pr-10 text-gray-300 shadow-md">
                    <p className="text-blue-400 flex items-center gap-1 mb-4 text-xs font-medium w-full border-gray-400">
                      <Sparkles className="w-4 h-4" /> Page View
                    </p>
                    <p className="text-2xl lg:text-4xl font-bold mb-2">
                      {abbreviateNumber(pageViews.length)}
                    </p>
                    <CustomTooltip message="This shows both website and pages views at a time. It also counts page views of single page website" />
                  </div>
                </div>

                <h2 className="mt-6 py-4">Resources</h2>

                <div className="items-start px-4 justify-center gap-4 grid grid-cols-1 md:grid-cols-2 w-full mt-3">
                  <div className="">
                    <h1 className="w-full mb-3 text-blue-400 border-b border-gray-600 pb-3">
                      Top Pages
                    </h1>
                    {groupedPageViews.map((view, ind) => (
                      <div
                        key={ind}
                        className="w-full justify-between items-center px-4 py-2 bg-gray-800 rounded-md mb-2 flex"
                      >
                        <p>/{view.page}</p>
                        <p>{abbreviateNumber(view.visits)}</p>
                      </div>
                    ))}
                  </div>

                  {/* top sources */}
                  <div className="">
                    <h1 className="w-full mb-3 text-blue-400 border-b border-gray-600 pb-3">
                      Top Visit Sources
                    </h1>
                    {groupedPageSources.map((pageSource) => (
                      <div
                        key={pageSource}
                        className="w-full justify-between items-center px-4 py-2 bg-gray-800 rounded-md mb-2 flex"
                      >
                        <p>/{pageSource.source}</p>
                        <p>{abbreviateNumber(pageSource.visits)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="custom_event" className="w-full">
                {groupedCustomEvents && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(groupedCustomEvents).map(
                      ([eventName, count]) => (
                        <div key={`${eventName}-${count}`} className="">
                          <div
                            className={`bg-gray-800 py-1 px-2 flex items-center gap-2 justify-between rounded-md text-white text-center`}
                          >
                            <p className={`text-white/70 text-sm`}>eventName</p>
                            <p className="text-lg">count</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                <div className="items-center justify-center mt-12 w-full relative">
                  {customEvents.map((event, ind) => (
                    <div
                      className="w-full items-start justify-start px-6 py-12 flex flex-col relative"
                      key={ind}
                    >
                      <p className="text-gray-500 font-light pb-3">
                        {event.event_name}
                      </p>
                      <p>{event.message}</p>
                      <p className="italic absolute right-2 bottom-2 text-xs text-gray-500">
                        {formatTimeStampz(event.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </MaxWidthWrapper>
      )}
    </div>
  );
};

export default Page;
