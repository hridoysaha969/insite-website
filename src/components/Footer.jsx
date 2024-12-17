import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-500 flex items-center justify-center md:justify-start py-3 px-4 sm:px-12 text-gray-300">
      <p className="text-xs">
        &copy; All rights reserved by{" "}
        <Link
          href="https://www.facebook.com/hridoysaha.official"
          className="text-blue-400"
        >
          Hridoy Saha
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
