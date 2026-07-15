import React from 'react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d16] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Logo and Credits */}
        <div className="flex items-center space-x-3">
          <a
            href="#hero"
            onClick={handleScrollToTop}
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-glow-emerald"
          >
            KP
          </a>
          <p className="text-xs text-gray-500 font-sans">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>

        {/* Dynamic design credit */}
        <p className="text-xs text-gray-600 font-mono">
          Designed & Built with <span className="text-emerald-500">React</span>, <span className="text-cyan-500">Vite</span> & <span className="text-teal-500">Tailwind CSS</span>
        </p>

        {/* Quick Back to top */}
        <a
          href="#hero"
          onClick={handleScrollToTop}
          className="text-xs font-mono font-medium text-gray-500 hover:text-emerald-400 transition-all duration-200"
        >
          Back to top &uarr;
        </a>

      </div>
    </footer>
  );
}
