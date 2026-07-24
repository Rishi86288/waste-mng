import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duvision | Smart Waste Segregation",
  description: "AI-based waste scanner and segregation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink:0 flex items-center gap-2">
                <span className="text-3xl">♻️</span>
                <span className="font-extrabold text-xl tracking-tight text-green-700">Duvision</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</Link>
                <Link href="/team" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Team</Link>
                <Link href="/scan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Scan</Link>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex:grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                ♻️ Duvision
              </h3>
              <p className="text-sm text-gray-400">
                Empowering the campus and community with AI-driven waste management. Put your trash in the right place, effortlessly.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-green-400 transition">About Us</Link></li>
                <li><Link href="/team" className="hover:text-green-400 transition">Our Team</Link></li>
                <li><Link href="/scan" className="hover:text-green-400 transition">Scanner App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <p className="text-sm text-gray-400 mb-2">CIPET IPT, Ahmedabad</p>
              <p className="text-sm text-gray-400 mb-2">Email: support@cipethub.in</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Duvision Team. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}