'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; 

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null); // Ref to track the entire header component area
  const isActive = (section: string) => activeSection === section;

  const handleMobileNav = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  // Click Outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the menu is open, check if the clicked element is NOT contained within our headerRef element
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Attach listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    /* We place the ref on this wrapper container so that clicking inside either 
       the pill or the expanded menu dropdown stays inside the ref boundary */
    <header ref={headerRef} className="fixed left-0 right-0 z-[100] flex flex-col items-center" style={{ top: '40px' }}>
      
      {/* Main Pill Row */}
      <div className="relative w-11/12 max-w-3xl h-[60px] rounded-full overflow-hidden border border-black/50 shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
        {/* Image Background */}
        <Image
          src="/header-container.png"
          alt="Header container"
          fill
          className="object-cover"
        />
        
        {/* Glass layer */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-full" />
        
        {/* Main Header Contents */}
        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12">
          {/* Portfolio Label (Left) */}
          <div 
            className="font-extrabold text-2xl cursor-pointer z-[101]" 
            style={{ color: '#FF00B8' }}
            onClick={() => handleMobileNav('home')}
          >
            vir.
          </div>

          {/* Desktop Navigation Link Tabs (Right) */}
          <nav className="hidden md:flex gap-10 font-[Arial] text-[13px] font-normal tracking-wide">
            {['home', 'about', 'experiences', 'projects', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`capitalize transition-colors relative pb-1 ${
                  isActive(section) ? 'text-[#FF00B8] font-bold' : 'text-black hover:text-gray-600'
                }`}
              >
                {section}
                {isActive(section) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF00B8]" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden text-black focus:outline-none z-[110]"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        /* Notice how the top coordinate changes to static/relative spacing margin 
           so it renders directly underneath the header ref context node cleanly */
        <div className="w-11/12 mx-auto md:hidden z-[99] mt-3 animate-in fade-in zoom-in duration-300">
          <div className="relative overflow-hidden rounded-md border border-black/50 shadow-xl">
             {/* Reusing background image for consistency */}
            <div className="absolute inset-0">
               <Image src="/header-container.png" alt="" fill className="object-cover" />
               <div className="absolute inset-0 bg-white/40 backdrop-blur-xl" />
            </div>
            
            {/* Mobile links navigation container */}
            <nav className="relative flex flex-col items-center py-4 gap-3.5 font-[Arial] text-md">
              {['home', 'about', 'experiences', 'projects', 'skills'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleMobileNav(section)}
                  className={`capitalize transition-colors ${
                    isActive(section) ? 'text-[#FF00B8] font-bold' : 'text-black'
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}