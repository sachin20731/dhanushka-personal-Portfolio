import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../component/Sidebar";
import MotionProvider from "../component/motion/MotionProvider";
import ScrollProgress from "../component/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhanushka | Software Engineer",
  description: "Portfolio of Dhanushka, a Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink font-sans text-mist">
        <MotionProvider>
          <ScrollProgress />
          <Sidebar />
          <div className="relative flex w-full flex-1 flex-col overflow-x-clip pl-0 md:pl-20">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
