'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/header.tsx';
import HomeSection from '@/components/home.tsx';
import TechDivider from '@/components/TechDivider.tsx';
import AboutSection from '@/components/about';
import SkillsSection from '@/components/skills';
import ProjectsSection from '@/components/projects';
import ExperiencesSection from '@/components/experiences.tsx';
import Footer from '@/components/footer';

export default function Page() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Section Refs
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2; // middle of viewport
      const sections = [
        { name: 'home', ref: homeRef },
        { name: 'about', ref: aboutRef },
        { name: 'experiences', ref: experiencesRef },
        { name: 'projects', ref: projectsRef },
        { name: 'skills', ref: skillsRef },
      ];

      for (const section of sections) {
        const el = section.ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // call once to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    let ref;
    switch (section) {
      case 'home': ref = homeRef; break;
      case 'about': ref = aboutRef; break;
      case 'experiences': ref = experiencesRef; break;
      case 'projects': ref = projectsRef; break;
      case 'skills': ref = skillsRef; break;
      default: return;
    }
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      {/* --- GLOBAL MOUSE FOLLOWER --- */}
      <div 
        className="hidden md:block fixed pointer-events-none z-[9999] transition-transform duration-700 ease-out"
        style={{
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(188, 0, 135, 0.15) 0%, rgba(188, 0, 135, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Header activeSection={activeSection} onNavigate={handleNavigation} />
      
      <div ref={homeRef} data-section="home" style={{ minHeight: '100vh' }}>
        <HomeSection 
          onNavigateSection={handleNavigation} 
          onScrollToFooter={scrollToFooter} 
        />
      </div>

      <TechDivider />

      <div ref={aboutRef} data-section="about" style={{ minHeight: '100vh' }}>
        <AboutSection />
      </div>

      <div ref={projectsRef} data-section="projects">
        <ProjectsSection />
      </div>

      <div ref={experiencesRef} data-section="experiences">
        <ExperiencesSection />
      </div>

      <TechDivider />

      <div ref={skillsRef} data-section="skills">
        <SkillsSection />
      </div>

      <Footer ref={footerRef} />
    </main>
  );
}