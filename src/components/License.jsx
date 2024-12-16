import Link from "next/link";

const License = () => {
  return (
    <div className="md:p-8 p-5">
      <h1 className="text-gray-200 text-xl md:text-2xl mb-2 font-semibold">
        Insight Metrics - License
      </h1>
      <p className="text-gray-400 pr-1 sm:pr-12">
        Learn more about the licensing terms and conditions for Insight Metrics.
      </p>

      <div className="mt-8 md:mt-12">
        <h2 className="mb-3 text-gray-200 text-xl font-semibold">
          Copyright <span className="text-blue-500">#</span>
        </h2>
        <p className="text-gray-400 text-sm pr-0 sm:pr-12">
          The Insight Metrics name and logos are trademarks of Hridoy Saha Tech.
          Learn more about the{" "}
          <Link
            href="https://github.com/hridoysaha969/insite-website/blob/main/README.md"
            className="text-blue-400"
          >
            Insight Metrics Guideline
          </Link>
          .
        </p>
      </div>

      <div className="mt-12 pr-0 sm:pr-12">
        <h2 className="text-gray-300 font-semibold text-xl mb-3">
          License Agreement
        </h2>
        <p className="text-sm text-gray-400">
          This License Agreement governs the use of the 'Insight Metrics'
          platform, its features, and associated services. By accessing or using
          the Services, you agree to the terms of this Agreement.
        </p>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            1. Grant of License
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Insight Metrics grants you a non-exclusive, non-transferable,
            limited license to use the Services for personal or business
            purposes in compliance with this Agreement.
          </p>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            2. Restrictions
          </h3>
          <p className="text-sm text-gray-400 mt-2">You agree not to:</p>
          <ul className="list-disc text-gray-400 mt-2 pl-4">
            <li>Reverse engineer, decompile, or disassemble the Services.</li>
            <li>Use the Services for any unlawful or unauthorized purpose.</li>
            <li>
              Share, resell, or redistribute the script tag or any other
              proprietary code provided by Insight Metrics without explicit
              permission.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            3. Ownership
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            All rights, title, and interest in the Services, including any
            intellectual property, remain the exclusive property of{" "}
            <Link
              href="https://hridoysaha.vercel.app/"
              className="text-blue-400"
            >
              Hridoy Saha
            </Link>
            . This Agreement does not transfer ownership of any software,
            design, or content provided by the Services.
          </p>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            4. Disclaimer of Warranty
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            The Services are provided "as-is" without warranty of any kind,
            express or implied. Insight Metrics does not guarantee uninterrupted
            or error-free operation of the Services.
          </p>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            5. Limitation of Liability
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Insight Metrics is not liable for any indirect, incidental, or
            consequential damages arising from the use of the Services,
            including loss of data or business interruptions.
          </p>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            6. Termination
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            This license is effective until terminated. Insight Metrics reserves
            the right to revoke access to the Services at its discretion, with
            or without notice, for violation of this Agreement.
          </p>
        </div>

        <div>
          <h3 className="text-gray-300 font-semibold text-xl mt-6">
            7. Governing Law
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            This Agreement is governed by the laws of Bangladesh, without regard
            to its conflict of laws principles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default License;
