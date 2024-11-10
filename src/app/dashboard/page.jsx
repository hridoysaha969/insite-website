"use client";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  // const [websites, setWebsites] = useState([])
  return (
    <div className="min-h-screen h-full w-full relative items-center justify-center flex flex-col">
      {/* HEADER */}
      <DashboardNav />

      <div className="w-full items-start justify-start flex flex-col min-h-screen">
        <div className="w-full items-center justify-end flex p-6 border-b border-slate-600 z-40">
          <Button asChild className="capitalize">
            <Link href="/add" prefetch>
              + add website
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 p-6 z-40">
          {/* {websites.map((item, ind) => (
            <Link href={`/w/${item.website_name}`} key={ind}>
              <div className="border border-white rounded-md py-12 px-6 text-gray-600 hover:shadow-md">
                <h2>{item.website_name}</h2>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
