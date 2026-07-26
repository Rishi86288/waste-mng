import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import logo from './components/logos/logo.jpeg';
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
          <AuthProvider>
        {/* Mobile Responsive Navbar Component  . */}
        <Navbar />

        {/* Main Content */}
        <main className="flex:grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                 <img className="w-12 h-12 rounded-full object-cover" src={typeof logo === 'string' ? logo : logo.src}  alt="EC" /> Duvision
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
        </AuthProvider>
      </body>
    </html>
  );
}