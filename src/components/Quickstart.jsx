import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Quickstart = () => {
  const scriptText = `<script defer data-domain="[your-website-id]"
    src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>`;

  return (
    <div className="md:p-8 p-5">
      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        Insight Metrics - Quickstart <span className="text-blue-500">#</span>
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Get started with Insight Metrics by adding a single line of code into
        your any type of project.
      </p>

      <div className="mt-12 pr-0 sm:pr-12">
        <div className="mb-6">
          <h2 className="text-xl text-gray-200 mb-3">
            Step 1: Sign Up and Log In
          </h2>
          <p className="text-gray-400 mb-2">
            To begin, create an account on our platform:
          </p>
          <ol className="pl-6 mt-4 text-gray-300 list-decimal text-sm">
            <li className="mb-1">
              Navigate to <Link href="/auth">Signup page</Link>.
            </li>
            <li className="mb-1">Click on Sign Up with google.</li>
            <li className="mb-1">
              Once registered, navigate to{" "}
              <Link href="/dashboard">dashboard</Link>.
            </li>
          </ol>
        </div>
        <div className="mb-6">
          <h2 className="text-xl text-gray-200 mb-3">
            Step 2: Add Your Website Domain
          </h2>
          <p className="text-gray-400 mb-2">After navigating to dashboard:</p>
          <ol className="pl-6 mt-4 text-gray-300 text-sm list-decimal">
            <li className="mb-1">Click on Add Website.</li>
            <li className="mb-1">
              Enter your website's domain {"(e.g., "}
              <span className="bg-slate-700 p-1 text-xs text-white">
                {"https://yourdomain.com"}
              </span>
              {")"}.
            </li>
            <li className="mb-1">Copy the generated script tag.</li>
          </ol>
        </div>
        <div className="mb-6">
          <h2 className="text-xl text-gray-200 mb-3">
            Step 3: Integrate the Script Tag into Your Website
          </h2>
          <p className="text-gray-400 mb-2">
            To enable tracking, integrate the script tag into your website:
          </p>
          <ol className="pl-6 mt-4 text-gray-300 text-sm list-decimal">
            <li className="mb-1">Open your website's HTML file or template.</li>
            <li className="mb-1">
              Paste the script tag just before the closing{" "}
              <span className="text-red-400">{"<head>"}</span> tag, like so:
              <div className="rounded-md mt-2 w-fit">
                <SyntaxHighlighter language="javascript" style={dracula}>
                  {scriptText}
                </SyntaxHighlighter>
              </div>
            </li>
            <li>Save your changes and deploy your website.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Quickstart;
