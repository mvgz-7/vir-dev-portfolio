'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';

// Helper component for subtle "Scroll-Down Only" repeating animation (Bypassed on mobile)
function FadeInRow({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check if the screen size is mobile (less than md breakpoint: 768px)
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      setIsVisible(true);
      return; // Skip setting up the IntersectionObserver for mobile
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;

        if (entry.isIntersecting) {
          if (isScrollingDown) {
            setIsVisible(false); 
            setTimeout(() => setIsVisible(true), 10);
          } else {
            setIsVisible(true);
          }
        } else if (isScrollingDown) {
          setIsVisible(false);
        }

        lastScrollY.current = currentScrollY;
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -5% 0px" 
      }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'md:opacity-0 md:translate-y-6' 
      }`}
    >
      {children}
    </div>
  );
}

const featuredExperience = {
  title: 'Front End Developer',
  organization: 'One Outsource Direct Corporation (OODC)',
  period: 'June 2025 - July 2025',
  image: '/experience-intern.jpg',
  description: [
    'Developed an Applicant Tracking System (ATS).',
    'Implemented responsive user interfaces to streamline the recruitment process.',
    'Organized and displayed applicant resumes for efficient review by HR staff.',
  ],
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
};

const timelineExperiences = [
  {
    title: 'Media Director',
    organization: 'Microsoft Student Community - BULSU',
    period: '2025 - 2026',
    image: '/experience-director.jpg',
    description: [
      "Supervises the development and maintenance of the organization's official website.",
      'Guides Digital Managers in content strategy and social media management.',
      'Directs Documentation Officers in organizing and archiving photos and written records of events.',
    ],
  },
  {
    title: 'Creatives Committee Officer',
    organization: 'Microsoft Student Community - BULSU',
    period: '2024 - 2025',
    image: '/experience-creatives.png',
    description: [
      'Developed and designed engaging publication materials, including posters and social media graphics.',
      'Promoted events and initiatives through creative visual storytelling.',
    ],
  },
  {
    title: 'Graphic Designer',
    organization: 'Mathematics Society - BULSU',
    period: '2024 - 2025',
    image: '/experience-graphics.jpg',
    description: [
      'Designed a user-friendly website for the organization using Figma.',
      'Collaborated on visual identity projects to enhance organizational branding.',
    ],
  },
  {
    title: 'Promotional Associate',
    organization: 'Mathematics Society - BULSU',
    period: '2023 - 2024',
    image: '/experience-promotional.png',
    description: [
      'Designed custom lanyard and T-shirt merchandise for the organization.',
      'Contributed to high sales and popularity through effective promotional design.',
    ],
  },
];

export default function ExperiencesSection() {
  return (
    <section
      id="experiences"
      className="relative w-full py-20 sm:py-32 bg-white overflow-hidden"
    >
      {/* Background Gradients */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, rgba(255, 0, 0, 0.1) 0%, transparent 100%)' }} 
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <h2
            className="text-4xl sm:text-4xl md:text-6xl font-bold text-center md:text-center text-[#BC0087]"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}
          >
            Experiences
          </h2>
          <p
            className="hidden sm:block text-center text-gray-600 mt-2 sm:mt-3 max-w-none mx-auto text-xs sm:text-sm whitespace-normal"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Roles that shaped my growth in frontend development, leadership, and creative direction.
          </p>
        </div>

        {/* Featured Experience Row */}
        <div className="mb-4 sm:mb-12 md:mb-14">
          <FadeInRow>
            <div className="md:mx-0 mx-4 rounded-lg border border-[#BC0087] bg-white/90 backdrop-blur-sm shadow-[0_10px_35px_rgba(188,0,135,0.05)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs md:text-xs text-[#FF00B8] font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {featuredExperience.period}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em', lineHeight: '1.1' }}>
                      {featuredExperience.title}
                    </h3>
                    <h4 className="text-xs sm:text-sm md:text-base text-gray-600 italic mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {featuredExperience.organization}
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm md:text-sm leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {featuredExperience.description.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#BC0087] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-[10px] sm:text-xs font-bold text-[#BC0087] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Technologies
                    </h6>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {featuredExperience.technologies.map((tech, index) => (
                        <span key={index} className="px-2 sm:px-3 py-1 rounded-full bg-[#BC0087] text-white text-[9px] sm:text-[10px] md:text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-full min-h-[200px] sm:min-h-[220px]">
                  <Image src={featuredExperience.image} alt={featuredExperience.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          </FadeInRow>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#BC0087]/20 -translate-x-1/2" />

          <div className="flex flex-col gap-4 sm:gap-8 md:gap-12" style={{ "--gap-mobile": "1rem" } as React.CSSProperties}>
            {timelineExperiences.map((exp, index) => {
              const imageLeft = index % 2 === 0;

              const imageBlock = (
                <div className="relative w-full h-full min-h-[150px] sm:min-h-[180px] rounded-lg overflow-hidden border border-[#BC0087] shadow-sm">
                  <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                </div>
              );

              const cardBlock = (
                <div className="h-full rounded-lg border border-[#BC0087] bg-white/95 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col">
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-[#FF00B8] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{exp.period}</p>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-1" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.04em' }}>{exp.title}</h3>
                  <h4 className="text-[10px] sm:text-xs md:text-sm text-gray-600 italic mb-2 sm:mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>{exp.organization}</h4>
                  <ul className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 sm:mt-1.5 h-0.5 sm:h-1 w-0.5 sm:w-1 rounded-full bg-[#BC0087] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );

              // Mobile featured-style layout
              const mobileLayout = (
                <div className="mx-4 rounded-lg border border-[#BC0087] bg-white/90 backdrop-blur-sm shadow-[0_10px_35px_rgba(188,0,135,0.05)] overflow-hidden">
                  <div className="grid grid-cols-1 gap-0">
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-[#FF00B8] font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {exp.period}
                        </p>
                        <h3 className="text-lg font-bold text-black mb-1" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em', lineHeight: '1.1' }}>
                          {exp.title}
                        </h3>
                        <h4 className="text-[10px] text-gray-600 italic mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {exp.organization}
                        </h4>
                        <ul className="space-y-1 text-gray-700 text-[10px] leading-relaxed mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {exp.description.map((item, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="mt-1 h-1 w-1 rounded-full bg-[#BC0087] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="relative w-full h-[200px]">
                      <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              );

              return (
                <FadeInRow key={index}>
                  <div className="hidden md:flex md:grid md:grid-cols-[1fr_50px_1fr] gap-4 md:gap-5 items-stretch">
                    <div className="w-full">{imageLeft ? imageBlock : cardBlock}</div>
                    <div className="relative flex items-stretch justify-center min-h-full">
                      <div className="flex items-center justify-center w-full">
                        <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-[#BC0087] border-[2px] border-white shadow-sm" />
                      </div>
                    </div>
                    <div className="w-full">{imageLeft ? cardBlock : imageBlock}</div>
                  </div>
                  <div className="md:hidden">
                    {mobileLayout}
                  </div>
                </FadeInRow>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}