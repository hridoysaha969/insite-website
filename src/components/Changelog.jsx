const Changelog = () => {
  return (
    <div className="md:p-8 p-5">
      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        Insight Metrics - Changelog
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Read more about the releases made for Insight Metrics from the official
        changelog.
      </p>

      <div className="mt-8 md:mt-12">
        <h2 className="mb-3 text-gray-200 text-xl font-semibold">
          Changelog <span className="text-blue-500">#</span>
        </h2>
        <p className="text-gray-400 text-sm pr-0 sm:pr-12">
          We strive to keep a good accountability of all of the version changes
          that we make for the Insight Metrics service center.
        </p>
      </div>

      <div className="mt-12">
        <div className="mb-6">
          <h3 className="text-xl text-gray-200 mb-3 font-semibold">v1.0.2</h3>
          <p className="text-gray-400 mb-3">Released on December 17th, 2024.</p>
          <ul className="list-disc pl-4 text-gray-400">
            <li>added custom event feature.</li>
            <li>implemented scalable API generate method.</li>
            <li>optimized the event tracking system.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-gray-200 mb-3 font-semibold">v1.0.1</h3>
          <p className="text-gray-400 mb-3">Released on December 15th, 2024.</p>
          <ul className="list-disc pl-4 text-gray-400">
            <li>updated documentation for better user experience.</li>
            <li>fixed page view and source log.</li>
            <li>optimized user interface.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-gray-200 mb-3 font-semibold">v1.0.0</h3>
          <p className="text-gray-400 mb-3">Released on December 9th, 2024.</p>
          <ul className="list-disc pl-4 text-gray-400">
            <li>initial release services.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
