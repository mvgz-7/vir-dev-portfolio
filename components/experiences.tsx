'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const featuredExperience = {
  title: 'Front End Developer',
  organization: 'One Outsource Direct Corporation (OODC)',
  period: 'June 2025 - July 2025',
  image: '/experience-intern.jpg',
  description: [
    'Developed an Applicant Tracking System (ATS) using React, TypeScript, and Tailwind CSS.',
    'Implemented responsive user interfaces to streamline the recruitment process.',
    'Organized and displayed applicant resumes for efficient review by HR staff.',
  ],
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'UI Development'],
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative w-full py-24 bg-transparent overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8">
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2
            className="text-5xl md:text-7xl font-normal text-center text-[#BC0087]"
            style={{
              fontFamily: 'Playfair Display, sans-serif',
              letterSpacing: '-0.05em',
            }}
          >
            Experiences
          </h2>

          <p
            className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Roles that shaped my growth in frontend development, leadership, and creative direction.
          </p>
        </div>

        {/* Featured Experience */}
        <div
          className={`mb-20 transition-all duration-700 ease-out delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="rounded-[2rem] border border-[#BC0087]/25 bg-white/80 backdrop-blur-sm shadow-[0_20px_60px_rgba(188,0,135,0.08)] overflow-hidden">
            <div className="grid md:grid-cols-2 items-stretch">
              {/* Left: Text */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FF00B8]/10 text-[#BC0087] text-xs md:text-sm font-semibold"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Featured Experience
                  </span>

                  <p
                    className="text-sm md:text-base text-[#FF00B8] font-bold mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {featuredExperience.period}
                  </p>

                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3"
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      letterSpacing: '-0.05em',
                      lineHeight: '1',
                    }}
                  >
                    {featuredExperience.title}
                  </h3>

                  <h4
                    className="text-lg md:text-xl text-gray-600 italic mb-6"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {featuredExperience.organization}
                  </h4>

                  <ul
                    className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed mb-8"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {featuredExperience.description.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#BC0087] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h6
                    className="text-sm font-bold text-[#BC0087] mb-3 uppercase tracking-wide"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Technologies
                  </h6>

                  <div className="flex flex-wrap gap-2">
                    {featuredExperience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-[#BC0087] text-white text-xs md:text-sm"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src={featuredExperience.image}
                  alt={featuredExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline with Images */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#BC0087]/20 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {timelineExperiences.map((exp, index) => {
              const imageLeft = index % 2 === 0;

              const imageBlock = (
                <div className="w-full h-full">
                  <div className="relative w-full h-full min-h-[260px] rounded-[1.75rem] overflow-hidden border border-[#BC0087]/20 shadow-[0_10px_30px_rgba(188,0,135,0.08)] group">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              );

              const cardBlock = (
                <div className="w-full h-full">
                  <div className="h-full rounded-3xl border border-[#BC0087]/20 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(188,0,135,0.10)] hover:border-[#BC0087]/40 flex flex-col">
                    <p
                      className="text-sm font-bold text-[#FF00B8] mb-2"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {exp.period}
                    </p>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-black mb-1"
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {exp.title}
                    </h3>

                    <h4
                      className="text-base md:text-lg text-gray-600 italic mb-4"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {exp.organization}
                    </h4>

                    <ul
                      className="space-y-2 text-sm md:text-base text-gray-600 leading-relaxed"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#BC0087] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${200 + index * 120}ms` }}
                >
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-8 items-stretch">
                    {/* Left side */}
                    <div className="w-full">{imageLeft ? imageBlock : cardBlock}</div>

                    {/* Center timeline */}
                    <div className="relative flex items-stretch justify-center min-h-full">
                      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-transparent" />
                      <div className="flex items-center justify-center w-full">
                        <div className="relative z-10 h-4 w-4 rounded-full bg-[#BC0087] border-4 border-white shadow" />
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="w-full">{imageLeft ? cardBlock : imageBlock}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}