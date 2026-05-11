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
      // Removed 'translate-y' classes to prevent the "appearing upwards" motion
      className={`relative w-full min-h-screen bg-white flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');
      `}</style>

      <div className="relative w-full">
        <Image
          src="/about-me.png"
          alt="About Me"
          width={1920}
          height={1080}
          layout="responsive"
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}