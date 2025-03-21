import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Talent Visa",
  description: "Find and post H1B sponsored jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div>
          <Navbar />
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </div>
      </body>
    </html>
  );
}
