import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const JavaScript = () => {
  const scriptText = `< defer data-domain="[your-website-id]"
  src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></`;

  const htmlCode = `<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>My Website</title>  
    <!-- Analytics Script -->  
    <script defer data-domain="[your-website-id]" src="https://insite-metrics.vercel.app/tracking-script.js?utm={source}"></script>  
</head>  
<body>  
    <h1>Welcome to My Website</h1>  
</body>  
</html>`;

  return (
    <div className="md:p-8 p-5">
      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        JavaScript - Insight Metrics
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Learn how to implement Insight Metrics analytics method in your website
        using JavaScript.
      </p>

      <div className="mt-12 pb-4">
        <div className="md:mb-12 mb-8">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Create a project
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            Create a simple HTML, JS project. Link the <span>.js</span> file
            with HTML document. Insight Metrics analytics method can be
            implemented with any kind of HTML document.
          </p>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 1: Create an HTML Project{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            If you don’t already have a website, create a simple HTML project:
          </p>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-1">
              Open your preferred code editor {"(e.g., VS Code, Sublime Text)"}.
            </li>
            <li className="mb-1">Create a new folder for your project.</li>
            <li className="mb-1">
              Inside the folder, create a file named{" "}
              <span className="bg-gray-800 p-[2px] text-gray-200 text-xs">
                index.html
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
            After adding your website in the dashboard, a script tag will be
            generated for you. Copy it from the Add Website page. The script tag
            will look something like this:
          </p>
          <div className="rounded-md mt-2 w-full">
            <SyntaxHighlighter language="html" style={dracula}>
              {scriptText}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 3: Paste the Script Tag into the{" "}
            <span className="p-[2px] bg-gray-700">{"<head>"}</span> Tag{" "}
            <span className="text-blue-500">#</span>
          </h2>
          <p className="text-sm text-gray-400 mb-2 pr-0 sm:pr-12">
            To enable analytics tracking, paste the copied script tag inside the{" "}
            <span className="text-red-400">{"<head>"}</span> section of your
            HTML file, like this:
          </p>
          <div className="rounded-md mt-2 w-full">
            <SyntaxHighlighter language="html" style={dracula}>
              {htmlCode}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="md:mb-12 mb-8 pr-0 sm:pr-12">
          <h2 className="text-gray-200 text-xl font-semibold mb-3">
            Step 4: Save and Deploy <span className="text-blue-500">#</span>
          </h2>
          <ul className="list-disc text-gray-400 pl-4 text-sm">
            <li className="mb-1">
              Save your changes to the
              <span className="bg-gray-800 p-[2px] text-gray-200 text-xs">
                index.html
              </span>
              file.
            </li>
            <li className="mb-1">
              Deploy your project to a hosting platform like Netlify, Vercel, or
              any other web server.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JavaScript;
