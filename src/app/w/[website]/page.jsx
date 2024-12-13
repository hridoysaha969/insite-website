"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, LoaderPinwheel, RotateCw } from "lucide-react";
import Link from "next/link";

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

  const formatTimeStampz = (date) => {
    const timestamp = new Date(date);

    // Step 2: Format the Date object into a human-readable format
    const formattedTimestamp = timestamp.toLocaleString();
    return formattedTimestamp;
  };

  if (loading) {
    return (
      <div className="text-gray-600 min-h-screen w-full items-start flex flex-col">
        <Navbar />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="text-gray-300 bg-gray-950 min-h-screen w-full items-start flex flex-col">
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
        <div className="flex items-center justify-center w-full">
          <Tabs
            defaultValue="general"
            className="flex flex-col items-center justify-center"
          >
            <TabsList className="w-full bg-transparent mb-4 items-center justify-center flex">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="custom_event">Custom Events</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="w-full">
              <div className="w-full grid-cols-1 md:grid-cols-2 px-4 gap-6">
                <div className="border-gray-500 text-gray-600 text-center shadow-md">
                  <p className="text-gray-500 font-medium py-8 w-full text-center border-gray-400">
                    Total Visits
                  </p>
                  <p className="py-12 text-3xl lg:text-4xl font-bold">
                    {abbreviateNumber(totalVisits.length)}
                  </p>
                </div>
                <div className="border-gray-500 text-gray-600 text-center shadow-md">
                  <p className="text-gray-500 font-medium py-8 w-full text-center border-gray-400">
                    Page View
                  </p>
                  <p className="py-12 text-3xl lg:text-4xl font-bold">
                    {abbreviateNumber(pageViews.length)}
                  </p>
                </div>
              </div>

              <div className="items-center justify-center grid grid-cols-1 md:grid-cols-2 w-full mt-6">
                <div className="flex flex-col z-40 w-full h-full">
                  <h1 className="py-6 w-full text-center text-gray-600">
                    Top Pages
                  </h1>
                  {groupedPageViews.map((view, ind) => (
                    <div
                      key={ind}
                      className="w-full justify-between items-center px-6 py-4 border-b border-gray-400 flex"
                    >
                      <p>/{view.page}</p>
                      <p>/{abbreviateNumber(view.visits)}</p>
                    </div>
                  ))}
                </div>

                {/* top sources */}
                <div
                  className="flex flex-col bg-black z-40 h-full w-full
             lg:border-l border-t lg:border-t-0 border-white/5"
                >
                  <h1 className="label relative">
                    Top Visit Sources
                    <p className="absolute bottom-2 right-2 text-[10px] italic font-light">
                      add ?utm={"{source}"} to track
                    </p>
                  </h1>
                  {groupedPageSources.map((pageSource) => (
                    <div
                      key={pageSource}
                      className="text-white w-full items-center justify-between 
                  px-6 py-4 border-b border-white/5 flex"
                    >
                      <p className="text-white/70 font-light">
                        /{pageSource.source}
                      </p>
                      <p className="text-white/70 font-light">
                        <p className="">
                          {abbreviateNumber(pageSource.visits)}
                        </p>
                      </p>
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
                      <div key={`${eventName}-${count}`} className="basis-1/2">
                        <div
                          className={`bg-black smooth group hover:border-white/10
                             text-white text-center border`}
                        >
                          <p
                            className={`text-white/70 font-medium py-8 w-full
                                 group-hover:border-white/10
                                smooth text-center border-b`}
                          >
                            {eventName}
                          </p>
                          <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                            {count}
                          </p>
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
      )}
    </div>
  );
};

export default Page;
