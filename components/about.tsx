'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      /* FIXED: Changed min-h-screen to min-h-0 on mobile so the section doesn't force a full screen height 
         if the image height happens to be smaller than the phone's hardware viewport. */
      className={`relative w-full min-h-0 lg:min-h-screen bg-white flex flex-col items-center transition-opacity lg:duration-1000 ease-in-out ${
        isVisible ? 'lg:opacity-100' : 'lg:opacity-0'
      }`}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');
      `}</style>

      <div className="relative w-full flex flex-col">
        {/* MOBILE VIEW: Displays 'about-me-mobile.png' */}
        {/* FIXED: Removed layout="responsive", added sizes, and matched the layout container block */}
        <div className="block lg:hidden w-full h-auto leading-[0] select-none">
          <Image
            src="/about-me-mobile-view.png"
            alt="About Me"
            width={1080}
            height={1920}
            sizes="100vw"
            className="w-full h-auto block vertical-align-middle"
            priority
          />
        </div>

        {/* DESKTOP VIEW: Keeps original 'about-me.png' */}
        {/* FIXED: Standardized to modern layout practices for consistency */}
        <div className="hidden lg:block w-full h-auto leading-[0] select-none">
          <Image
            src="/about-me-new.png"
            alt="About Me"
            width={1920}
            height={1080}
            sizes="100vw"
            className="w-full h-auto block vertical-align-middle"
            priority
          />
        </div>
      </div>
    </section>
  );
}