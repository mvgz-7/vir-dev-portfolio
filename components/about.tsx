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
          src="/about-me-design.png"
          alt="About Me"
          width={1920}
          height={1080}
          layout="responsive"
          className="w-full h-auto"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center p-8 mt-10">
          <div 
            className="text-[#BC0087] text-justify"
            style={{
              fontFamily: "'Anonymous Pro', monospace",
              width: '570px',
              lineHeight: '25px',
              letterSpacing: '-0.06em',
              fontSize: '20px'
            }}
          >
            <p className="mb-6">Hi, I’m <span className="font-bold">Virla</span>!</p>
            
            <p>
              I am a <span className="underline">Web Developer and Designer</span> who enjoys 
              building responsive and user-friendly websites. Currently a BS Mathematics 
              major in Computer Science student at Bulacan State University, I have 
              experience developing applications using modern technologies such as <span className="underline">React</span>, <span className="underline">TypeScript</span>, 
              and <span className="underline">Tailwind CSS</span>, as well as designing 
              interfaces using <span className="underline">Figma</span> and <span className="underline">Canva</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}