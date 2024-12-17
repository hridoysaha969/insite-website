import { FaReact } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReactDoc = () => {
  const scriptText = `<script defer data-domain="[your-website-id]"
  src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>`;

  const reactHtml = `<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8" />  
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
    <title>Vite + React</title>  
    <!-- Analytics Script -->  
    <script defer data-domain="[your-website-id]" src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>
  </head>  
  <body>  
    <div id="root"></div>  
  </body>  
</html>`;

  return (
    <div className="md:p-8 p-5">
      <div className="mb-6 p-1 rounded-full bg-gray-700 flex items-center text-white text-sm gap-2 w-fit pr-3">
        <span className="rounded-full bg-blue-500 text-white py-1 px-2">
          <FaReact className="w-4 h-4" />
        </span>
        Requires React
      </div>

      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        React.js - Insight Metrics
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Learn how to integrate Web Analytics with Insight Metrics for your
        Personal or Business website and start tracking website, webpage visits
        and user actions using our free web analytics service.
      </p>

      <div className="mt-12 pb-4">
        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 1: Create a Vite + React Project{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            If you don’t already have a Vite + React project, you can create one
            with the following commands:
          </p>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-1">
              Open your terminal and run:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`npm create vite@latest my-vite-app --template react `}
                </SyntaxHighlighter>
              </div>
            </li>
            <li className="mb-1">
              Navigate into the project directory:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`cd my-vite-app`}
                </SyntaxHighlighter>
              </div>
            </li>
            <li className="mb-1">
              Install dependencies:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`npm install`}
                </SyntaxHighlighter>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 2: Copy the Generated Script Tag{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            Once you've added your website to the Dashboard, copy the script tag
            provided. The script tag will look like this:
          </p>
          <div className="rounded-md mt-2 w-full">
            <SyntaxHighlighter language="html" style={dracula}>
              {scriptText}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 3: Add the Script Tag to the{" "}
            <span className="p-[2px] bg-gray-700">{"<head>"}</span> Section{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            o enable analytics tracking, add the script tag to the index.html
            file in your Vite + React project.
          </p>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-2">
              Open the{" "}
              <span className="bg-gray-800 p-[2px] text-gray-200 text-xs">
                index.html
              </span>{" "}
              file located in the{" "}
              <span className="bg-gray-800 p-[2px] text-gray-200 text-xs">
                public
              </span>{" "}
              folder of your project.
            </li>

            <li className="mb-1">
              Paste the copied script tag inside the{" "}
              <span className="p-[2px] bg-gray-700 text-gray-200">
                {"<head>"}
              </span>{" "}
              section, like this:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="html" style={dracula}>
                  {reactHtml}
                </SyntaxHighlighter>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 4: Run and Deploy Your Project{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-2">
              Start your development server to verify the integration:{" "}
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`npm run dev`}
                </SyntaxHighlighter>
              </div>
              Open the provided local URL in your browser to see your app
              running.
            </li>

            <li className="mb-1">
              Deploy your Vite app to a hosting platform like Netlify, Vercel,
              or another service.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReactDoc;
