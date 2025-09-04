import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Particles from "@/components/Particles";
import { lazy, Suspense } from "react";
const LazyNavbar = lazy(() => import("@/components/Navbar"));
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Tracker",
  description: "Check your ATS Score and know your rank among the college",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col 
  bg-gradient-to-b from-gray-950 via-black to-gray-800`}
      >
        <div className="absolute inset-0 -z-100">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <SessionProvider>
          <Toaster richColors />
          <Suspense fallback={null}>
            <LazyNavbar />
          </Suspense>
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </SessionProvider>
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <Particles
            particleColors={[
              "#10B981", // emerald-500
              "#34D399", // emerald-400
              "#059669", // emerald-600
              "#A7F3D0", // emerald-200 (soft glow)
            ]}
            particleCount={6000}
            particleSpread={30}
            speed={0.05}
            particleBaseSize={250}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={true}
          />
        </div>
      </body>
    </html>
  );
}
