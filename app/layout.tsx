import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Waste Segregator | Smart Environment",
  description: "AI-based waste scanner and segregation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Top Navigation Bar - E-Cell Style */}
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo Area */}
              <div className="flex-shrink:0 flex items-center gap-2">
                <span className="text-3xl">♻️</span>
                <span className="font-extrabold text-xl tracking-tight text-green-700">
                  EcoAI
                </span>
              </div>

              {/* Center Menu */}
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</Link>
                <Link href="/team" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Team</Link>
                <Link href="/scan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Scan</Link>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contact</Link>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-green-700 font-semibold hover:text-green-800 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}