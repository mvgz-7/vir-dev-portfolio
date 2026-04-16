'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const skillCards = [
  {
    title: 'Graphic Design',
    description: 'Creating UI prototypes, publication materials, posters, infographics, banners, powerpoint presentations, and digital assets that communicate effectively.',
    logos: ['/canva.png', '/figma.png'],
  },
  {
    title: 'Web Development',
    description: 'Building responsive, high-performance web applications with a focus on clean code and user experience.',
    logos: ['/react.png', '/typescript.png', '/tailwind.png', '/javascript.png', '/php.png', '/sql.png', '/figma.png'],
  },
  {
    title: 'Game Development',
    description: 'Designing and scripting immersive 2D experiences with optimized logic and physics. Creating cute pixelated sprites and animations that bring games to life.',
    logos: ['/unity.png', '/c-sharp.png', '/javascript.png'],
  },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center py-24 bg-transparent overflow-visible"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.21, 0.45, 0.32, 0.9), transform 0.8s cubic-bezier(0.21, 0.45, 0.32, 0.9);
        }
        .fade-in-up.active {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 100ms; }
        .delay-2 { transition-delay: 300ms; }
        .delay-3 { transition-delay: 500ms; }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl px-8">
        <h2 
          className={`text-6xl font-bold text-center mb-16 text-[#BC0087] fade-in-up ${isVisible ? 'active' : ''}`}
          style={{ fontFamily: 'Playfair Display, sans-serif', letterSpacing: '-0.05em' }}
        >
          What I Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCards.map((skill, index) => (
            <div 
              key={index}
              className={`group bg-white/40 backdrop-blur-md border-2 border-[#BC0087]/50 p-8 rounded-xl flex flex-col items-center text-center transition-all duration-500 shadow-xl hover:bg-[#FF00B8] hover:border-[#FF0000] fade-in-up ${isVisible ? 'active' : ''} delay-${index + 1}`}
            >
              <h3 
                className="text-2xl font-bold mb-4 text-[#FF00B8] group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Arial', serif", letterSpacing: '-0.06em' }}
              >
                {skill.title}
              </h3>
              
              <p 
                className="text-gray-600 mb-8 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {skill.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-auto">
                {skill.logos.map((logo, i) => (
                  <div key={i} className="relative w-10 h-10 transition-transform duration-300 hover:scale-110">
                    <Image src={logo} alt="Tech Logo" fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}