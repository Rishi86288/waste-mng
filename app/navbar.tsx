"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 'relative' क्लास ऐड की गई है ताकि ड्रॉपडाउन इसी नेवबार के नीचे खुले
    <nav className="position:sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Area */}
          <div className="flex-shrink:0 flex items-center gap-2">
            <span className="text-3xl">♻️</span>
            <span className="font-extrabold text-xl tracking-tight text-green-700">Duvision</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</Link>
            <Link href="/team" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Team</Link>
            <Link href="/scan" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Scan</Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contact</Link>
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

      {/* Mobile Menu Dropdown - अब ये Absolute पोजीशन के साथ ओवरले करेगा */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-2xl md:hidden z-50">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">About</Link>
            <Link href="/team" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Team</Link>
            <Link href="/scan" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Scan</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}