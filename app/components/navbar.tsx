"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State for mobile policies dropdown
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false); // Logout होने पर भी मोबाइल मेनू बंद हो जाए
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Area */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-3xl">♻️</span>
            <span className="font-extrabold text-xl tracking-tight text-green-700">Duvision</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</Link>
            <Link href="/team" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Team</Link>
            <Link href="/scan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Scan</Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contact</Link>
            
            {/* Desktop Policies Dropdown */}
            <div className="relative group py-6">
              <button className="flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium transition-colors">
                Policies 
                <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 mt-0 w-52 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                <div className="py-2">
                  <Link href="/policies/privacy-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Privacy Policy</Link>
                  <Link href="/policies/credit-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Credit Policy</Link>
                  <Link href="/policies/hyperlinking-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Hyperlinking Policy</Link>
                  <Link href="/policies/terms-and-conditions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Terms & Conditions</Link>
                  <Link href="/policies/copyright-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Copyright Policy</Link>
                  <Link href="/policies/other-policies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">Other Policies</Link>
                </div>
              </div>
            </div>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="px-4 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-lg transition">
                  Sign In
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  /* Close Icon (X) */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  /* Hamburger Icon (3 Lines) */
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-2xl md:hidden z-50 max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">About</Link>
            <Link href="/team" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Team</Link>
            <Link href="/scan" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Scan</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Contact</Link>
            
            {/* Mobile Policies Dropdown */}
            <div>
              <button 
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)} 
                className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 flex justify-between items-center"
              >
                Policies
                <svg className={`w-5 h-5 transform transition-transform duration-200 ${isPoliciesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {isPoliciesOpen && (
                <div className="pl-4 py-2 space-y-1 bg-gray-50 rounded-lg mt-1 border border-gray-100">
                  <Link href="/policies/privacy-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Privacy Policy</Link>
                  <Link href="/policies/credit-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Credit Policy</Link>
                  <Link href="/policies/hyperlinking-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Hyperlinking Policy</Link>
                  <Link href="/policies/terms-and-conditions" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Terms & Conditions</Link>
                  <Link href="/policies/copyright-policy" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Copyright Policy</Link>
                  <Link href="/policies/other-policies" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-100">Other Policies</Link>
                </div>
              )}
            </div>
            
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-3">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center px-4 py-3 text-green-700 font-semibold border border-green-200 hover:bg-green-50 rounded-lg transition">
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="text-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}