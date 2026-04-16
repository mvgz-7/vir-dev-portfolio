'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experiences', 'contact'];
    
    const observerOptions = {
      root: null,
      // threshold 0.5 means the section is active when 50% of it is visible
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const isActive = (section: string) => activeSection === section;

  return (
    <header className="fixed top-10 left-0 right-0 z-50 flex justify-center pt-4">
      <div className="relative w-11/12 max-w-3xl h-[60px] rounded-full overflow-hidden border border-black/50 shadow-[0_2px_2px_rgba(0,0,0,0.25)]">

        {/* Image (now fills container exactly) */}
        <Image
          src="/header-container.png"
          alt="Header container"
          fill
          className="object-cover"
        />

        {/* Glass layer (same exact size as image) */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-full" />

        {/* Content */}
        <div 
          className="absolute inset-0 flex items-center justify-between px-12 font-[Arial] text-lg"
          style={{ letterSpacing: '-0.06em' }}
        >
          <div className="flex gap-12 items-center text-black">
            {['home', 'about', 'skills', 'projects', 'experiences'].map((section) => (
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
          
          <button
            onClick={() => onNavigate('contact')}
            className={`hover:opacity-80 transition-opacity ${isActive('contact') ? 'font-extrabold underline' : 'font-bold'}`}
            style={{ color: '#FF00B8' }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </header>
  );
}