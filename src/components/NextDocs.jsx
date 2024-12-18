import { SiNextdotjs } from "react-icons/si";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const NextDocs = () => {
  const scriptText = `<Script
        defer
        data-domain="[your-website-id]"
        src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"    
        strategy="afterInteractive"  
    />`;

  const nextJsx = `
import Head from 'next/head';  
import Script from 'next/script';  
import '../styles/globals.css';  

function MyApp({ Component, pageProps }) {  
  return (  
    <>  
      <Head>  
        <title>My Website</title>  
      </Head>  
      <Script  
        src="https://yourwebsite.com/tracking.js"  
        data-website-id="your-unique-id"  
        strategy="afterInteractive"  
      />  
      <Component {...pageProps} />  
    </>  
  );  
}  

export default MyApp;`;

  return (
    <div className="md:p-8 p-5">
      <div className="mb-6 p-1 rounded-full bg-gray-700 flex items-center text-white text-sm gap-2 w-fit pr-3">
        <span className="rounded-full bg-blue-500 text-white py-1 px-2">
          <SiNextdotjs className="w-4 h-4" />
        </span>
        Requires Next.js
      </div>

      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        Next.js - Insight Metrics
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Follow these simple steps to integrate our analytics script into your
        Next.js project and start tracking visits and page views. It's easy and
        quick to use.
      </p>

      <div className="mt-12 pb-4">
        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 1: Create a Next.js Project{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            If you do not already have a Vite + React project, you can create
            one with the following commands:
          </p>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-1">
              Open your terminal and run:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter
                  language="bash"
                  wrapLines={true}
                  style={dracula}
                >
                  {`npx create-next-app@latest my-next-app`}
                </SyntaxHighlighter>
              </div>
            </li>
            <li className="mb-1">
              Navigate into the project directory:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`cd my-next-app`}
                </SyntaxHighlighter>
              </div>
            </li>
            <li className="mb-1">
              Start the development server:
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`npm run dev`}
                </SyntaxHighlighter>
              </div>
              This will start your project on{" "}
              <span className="p-[2px] mx-[2px] bg-gray-700 text-gray-200 text-xs">
                {"http://localhost:3000"}
              </span>
              .
            </li>
          </ul>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 2: Copy the Generated Script Tag{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            After adding your website to the Dashboard, copy the script tag
            provided. It will look like this:
          </p>
          <div className="rounded-md mt-2 w-full">
            <SyntaxHighlighter language="jsx" wrapLines={true} style={dracula}>
              {scriptText}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 3: Add the Script Using the{" "}
            <span className="p-[2px] bg-gray-700">Script</span> Component{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-2">
              Import the{" "}
              <span className="bg-gray-800 p-[2px] mx-[2px] select-none text-gray-200 text-xs">
                Script
              </span>{" "}
              component from{" "}
              <span className="bg-gray-800 p-[2px] mx-[2px] select-none text-gray-200 text-xs">
                next/script
              </span>
              .
            </li>

            <li className="mb-1">
              Add the Script component inside the{" "}
              <span className="bg-gray-800 p-[2px] mx-[2px] select-none text-gray-200 text-xs">
                page.js
              </span>{" "}
              or
              <span className="bg-gray-800 p-[2px] mx-[2px] select-none text-gray-200 text-xs">
                page.tsx
              </span>{" "}
              file.
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter
                  language="jsx"
                  wrapLines={true}
                  style={dracula}
                >
                  {nextJsx}
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
              Build your Next.js project for production:{" "}
              <div className="rounded-md mt-2 w-full">
                <SyntaxHighlighter language="bash" style={dracula}>
                  {`npm run build`}
                </SyntaxHighlighter>
              </div>
            </li>

            <li className="mb-1">
              Deploy the project to a hosting platform such as Vercel or Netlify
              or another service.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NextDocs;
