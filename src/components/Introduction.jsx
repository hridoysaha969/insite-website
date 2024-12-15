import Link from "next/link";

const Introduction = () => {
  return (
    <div className="md:p-8 p-5">
      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        Getting Started with Insight Metrics
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Get started with the most popular scalable and non-profitable website
        analytics platform. Follow few steps and you are ready to go!
      </p>

      <div className="mt-8">
        <h2 className="mb-3 text-gray-200 md:text-xl font-semibold text-sm">
          Introduction <span className="text-blue-500">#</span>
        </h2>
        <p className="text-gray-400 text-sm pr-0 sm:pr-12">
          Welcome to Insight Metrics, your one-stop solution for tracking
          website visits and page views. With our powerful analytics tools, you
          can monitor user engagement effortlessly. This guide will walk you
          through the steps to set up your website for tracking using the script
          tag provided by our platform.
        </p>
      </div>

      <div className="mt-6">
        <p className="text-gray-400 mb-4 pr-0 sm:pr-12">
          Here’s a quick overview of the Flowbite ecosystem including the open
          source Tailwind components library, the Figma design files, and the
          pro version.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pr-0 sm:pr-12">
          <button className="bg-gray-700 rounded-md px-5 py-4 shadow-md text-start">
            <h3 className="text-xl font-semibold mb-2 text-white capitalize">
              quickstart
            </h3>
            <p className="text-gray-400 text-sm">
              Learn how to get started with Insight Metrics by signing in and
              configuring some easy steps to monitor your website.
            </p>
          </button>
          <button className="bg-gray-700 rounded-md px-5 py-4 shadow-md text-start">
            <h3 className="text-xl font-semibold mb-2 text-white capitalize">
              JS/React.js
            </h3>
            <p className="text-gray-400 text-sm">
              Learn how to integrate the analytics method with Insight Metrics
              using Vanila JavaScript or React.js. It's easy and scalable.
            </p>
          </button>
          <button className="bg-gray-700 rounded-md px-5 py-4 shadow-md text-start">
            <h3 className="text-xl font-semibold mb-2 text-white capitalize">
              Next.js
            </h3>
            <p className="text-gray-400 text-sm">
              Start Integration with Insight Metrics using Next.js. Monitor your
              page visits and manage your custom events with ease.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
