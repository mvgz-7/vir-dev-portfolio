'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; 

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (section: string) => activeSection === section;

  const handleMobileNav = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 z-[100] flex justify-center" style={{ top: '40px' }}>
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
        
        {/* Main Header Row */}
        <div 
          className="absolute inset-0 flex items-center justify-between px-6 md:px-12 font-[Arial] text-lg"
          style={{ letterSpacing: '-0.06em' }}
        >
          <div 
            className="font-extrabold text-2xl cursor-pointer z-[101]" 
            style={{ color: '#FF00B8' }}
            onClick={() => handleMobileNav('home')}
          >
            vir.
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-14 items-center text-black">
            {['home', 'about', 'experiences', 'projects', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`transition-all hover:opacity-60 capitalize ${
                  isActive(section) ? 'text-[#FF00B8] font-bold' : ''
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden z-[101] text-black p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[110px] mx-auto w-11/12 md:hidden z-[99] animate-in fade-in zoom-in duration-300">
          <div className="relative overflow-hidden rounded-xl border border-black/50 shadow-xl">
             {/* Reusing background image for consistency */}
            <div className="absolute inset-0">
               <Image src="/header-container.png" alt="" fill className="object-cover" />
               <div className="absolute inset-0 bg-white/40 backdrop-blur-xl" />
            </div>
            
            {/* Mobile-focused layout: compact padding (py-4), smaller gap (gap-3.5), and text size (text-sm) */}
            <nav className="relative flex flex-col items-center py-4 gap-3.5 font-[Arial] text-sm">
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