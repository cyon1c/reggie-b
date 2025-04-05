"use client"

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          {/* Social Links */}
          <div>
            <h3 className="font-display text-2xl text-white mb-8 tracking-wide uppercase">Common Channels</h3>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/brentonpeplinski_art/" target="_blank" rel="noopener noreferrer" className="text-gray hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://x.com/BloodletterHQ" target="_blank" rel="noopener noreferrer" className="text-gray hover:text-primary transition-colors">
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100078873968786" target="_blank" rel="noopener noreferrer" className="text-gray hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-display text-2xl text-white mb-8 tracking-wide uppercase">Citizen's Log</h3>
            <div className="w-full max-w-md">
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your contact frequency" 
                  className="w-full px-6 py-4 bg-gray/20 text-white border border-gray/30 rounded-none focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full md:w-auto neon-button text-lg"
                >
                  Stay Informed
                </button>
              </form>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-2xl text-white mb-8 tracking-wide uppercase">Secure Channels</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="block text-xl text-gray hover:text-primary transition-colors font-display tracking-wide">
                  Discord
                </a>
              </li>
              <li>
                <a href="mailto:brenton.peplinski@yahoo.com" className="block text-xl text-gray hover:text-primary transition-colors font-display tracking-wide">
                  brenton.peplinski@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray/20 pt-10">
          <p className="text-center text-gray text-lg font-title">
            © 2025 Bloodletter
          </p>
        </div>
      </div>
    </footer>
  );
} 