'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const skillCards = [
  {
    title: 'Web Development',
    description: 'Building responsive web applications with a focus on clean code and user experience.',
    logos: ['/react.png', '/typescript.png', '/tailwind.png', '/javascript.png', '/php.png', '/sql.png', '/figma.png'],
  },
  {
    title: 'Graphic Design',
    description: 'Creating publication materials, infographics, posters, banners, and powerpoint presentations.',
    logos: ['/canva.png', '/figma.png'],
  },
  {
    title: 'Game Development',
    description: 'Designing and scripting immersive 2D experiences with optimized logic and physics.',
    logos: ['/unity.png', '/c-sharp.png', '/javascript.png'],
  },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if the screen size is mobile (less than md breakpoint: 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setIsVisible(true);
      return; // Skip setting up the IntersectionObserver for mobile
    }

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
      className="relative w-full flex flex-col items-center justify-center py-20 bg-transparent overflow-visible"
    >
      <style jsx global>{`
        /* Only apply hidden/translate initial states on desktop screens */
        @media (min-width: 768px) {
          .fade-in-up {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.8s cubic-bezier(0.21, 0.45, 0.32, 0.9), transform 0.8s cubic-bezier(0.21, 0.45, 0.32, 0.9);
          }
          .fade-in-up.active {
            opacity: 1;
            transform: translateY(0);
          }
          .delay-1 { transition-delay: 100ms; }
          .delay-2 { transition-delay: 300ms; }
          .delay-3 { transition-delay: 500ms; }
          .delay-4 { transition-delay: 700ms; }
        }
      `}</style>

      {/* Maintained max-width at 1000px while scaling internal elements */}
      <div className="relative z-10 w-full max-w-[1000px] px-4 sm:px-8">
        <h2 
          className={`text-4xl sm:text-6xl md:text-8xl font-bold text-center mb-6 sm:mb-10 text-[#BC0087] fade-in-up ${isVisible ? 'active' : ''}`}
          style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}
        >
          What I Offer
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-stretch">
          
          {/* Left Column: Skill Containers - Increased padding and font sizes */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-5 lg:max-w-[45%]">
            {skillCards.map((skill, index) => (
              <div 
                key={index}
                className={`flex-1 group bg-white backdrop-blur-md border border-[#BC0087]/50 p-4 sm:p-6 rounded-xl flex flex-col justify-between text-left transition-all duration-300 shadow-md hover:shadow-[#BC0087]/40 hover:-translate-y-1 fade-in-up ${isVisible ? 'active' : ''} delay-${index + 1}`}
              >
                <div>
                  <h3 
                    className="text-lg sm:text-2xl font-bold mb-2 text-[#FF00B8]"
                    style={{ fontFamily: "Arial, sans-serif", letterSpacing: '-0.06em' }}
                  >
                    {skill.title}
                  </h3>
                  
                  <p 
                    className="text-gray-600 text-xs sm:text-base leading-relaxed mb-3 sm:mb-4"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {skill.description}
                  </p>
                </div>

                <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2.5 mt-auto">
                  {skill.logos.map((logo, i) => (
                    <div key={i} className="relative w-6 sm:w-8 h-6 sm:h-8 transition-transform duration-300 hover:scale-110">
                      <Image src={logo} alt="Tech Logo" fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Image Container - Matches image dimensions strictly */}
          <div className={`flex-1 hidden lg:flex items-center justify-end fade-in-up ${isVisible ? 'active' : ''} delay-4`}>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#BC0087]/30 shadow-xl">
              <Image 
                src="/my-picture.png" 
                alt="My Portrait" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}