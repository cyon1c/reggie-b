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
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.234.585 1.797 1.148.563.563.898 1.13 1.148 1.797.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.148 1.797c-.563.563-1.13.898-1.797 1.148-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.797-1.148 4.902 4.902 0 01-1.148-1.797c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.234 1.148-1.797.563-.563 1.13-.898 1.797-1.148.636-.247 1.363-.416 2.427-.465C9.516 2.013 9.871 2 12.315 2z" clipRule="evenodd" />
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