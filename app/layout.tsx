import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.statushired.com"),
  title: {
    default: "Status Hired - Find H1B Sponsored Jobs",
    template: "%s | Status Hired",
  },
  description:
    "Find and post H1B sponsored jobs. Connect with companies that sponsor international talent. Browse thousands of H1B visa sponsorship opportunities.",
  keywords: [
    "H1B jobs",
    "visa sponsorship",
    "international jobs",
    "tech jobs",
    "H1B visa",
    "work in USA",
    "sponsored jobs",
    "H1B job board",
    "H1B job search",
    "h1B Jobs USA",
    "h1B Jobs in USA",
    "h1B Jobs in United States",
    "h1B Jobs in United States of America",
    "h1B Jobs in United States of America",
    "h1B Jobs in United States of America",
    "h1B Jobs in United States of America",
  ],
  authors: [{ name: "Status Hired" }],
  creator: "Status Hired",
  publisher: "Status Hired",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.statushired.com",
    siteName: "Status Hired",
    title: "Status Hired - Find H1B Sponsored Jobs",
    description:
      "Find and post H1B sponsored jobs. Connect with companies that sponsor international talent.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Status Hired - H1B Job Board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Status Hired - Find H1B Sponsored Jobs",
    description:
      "Find and post H1B sponsored jobs. Connect with companies that sponsor international talent.",
    images: ["/og-image.png"],
    creator: "@1Uttej",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
  },
  alternates: {
    canonical: "https://www.statushired.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#050e1d" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="50c34282-633a-4452-a4f6-5e93ec20d38f"
        ></script>
      </head>
      <body className="antialiased bg-[#050e1d] text-white">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </div>
      </body>
    </html>
  );
}
