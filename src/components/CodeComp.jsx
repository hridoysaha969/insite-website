import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeComp = () => {
  const codeString = `
 const url = "https://insite-metrics.vercel.app/api/events";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer {{apiKey}}",
  };
  const eventData = {
    name: "",//* required
    domain: "", //* required
    description: "",//optional
  };

  const sendRequest = async () => {
    axios
      .post(url, eventData, { headers })
      .then()
      .catch((error) => {
        console.error("Error:", error);
      });
  };`;

  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default CodeComp;
