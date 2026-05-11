'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const isActive = (section: string) => activeSection === section;

  return (
    <header className="fixed top-10 left-0 right-0 z-50 flex justify-center pt-4">
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

        {/* Content */}
        <div 
          className="absolute inset-0 flex items-center justify-between px-12 font-[Arial] text-lg"
          style={{ letterSpacing: '-0.06em' }}
        >
          {/* Logo on the Left */}
          <div 
            className="font-extrabold text-2xl cursor-pointer" 
            style={{ color: '#FF00B8' }}
            onClick={() => onNavigate('home')}
          >
            vir.
          </div>

          {/* Navigation Links - Increased gap from 10 to 14 */}
          <div className="flex gap-14 items-center text-black">
            {['home', 'about', 'experiences', 'projects', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`transition-all hover:opacity-60 capitalize ${
                  isActive(section) ? 'font-bold' : 'font-normal'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}