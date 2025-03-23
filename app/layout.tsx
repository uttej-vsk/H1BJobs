import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Status Hired",
  description: "Find and post H1B sponsored jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
