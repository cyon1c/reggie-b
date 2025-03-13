"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Neo Fortuna', path: '/story' },
    { name: 'Curator\'s Watchlist', path: '/comics' },
    { name: 'Field Supplies', path: '/shop' },
    { name: 'Join the Resistance', path: '/join' },
    { name: 'Faction Intel', path: '/about' },
  ];

  return (
    <nav className="bg-dark bg-opacity-90 backdrop-filter backdrop-blur fixed top-0 w-full z-50 border-b border-primary border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="font-display text-3xl text-primary hover:text-white transition-colors tracking-wide"
            >
              BLOODLETTER
            </Link>
          </div>
          
          {/* Center-aligned desktop menu */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="px-3 py-2 text-base font-display tracking-wider text-white hover:text-primary relative group uppercase"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Download button (desktop) */}
          <div className="hidden md:flex md:items-center">
            <Link 
              href="/download" 
              className="neon-button text-base py-2"
            >
              Access Dispatches
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark bg-opacity-95 backdrop-filter backdrop-blur">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block px-3 py-4 text-xl font-display tracking-wide text-white hover:text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Download button in mobile menu */}
            <Link
              href="/download"
              className="block px-3 py-4 text-xl font-display tracking-wide text-primary uppercase border-t border-gray-700 mt-4 pt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Access Dispatches
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 