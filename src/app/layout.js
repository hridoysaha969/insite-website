import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  // style: ['normal', 'italic'],
  subsets: ["latin"],
  display: "swap",
});

export const viewport =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

export const metadata = {
  title: "InSite Metrics",
  description:
    "Empower your website with real-time metrics from InsightTrack. Capture clicks, page views, and user journeys to fuel smarter decisions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-slate-50`}>{children}</body>
    </html>
  );
}
