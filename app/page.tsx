'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/header.tsx';
import HomeSection from '@/components/home.tsx';
import TechDivider from '@/components/TechDivider.tsx';
import AboutSection from '@/components/about';
import SkillsSection from '@/components/skills';
import ProjectsSection from '@/components/projects';
import ExperiencesSection from '@/components/experiences.tsx';
import PubmatsSection from '@/components/pubmats.tsx';
import CuteDivider from '@/components/CuteDivider';

export default function Page() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const homeRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    let ref;
    switch (section) {
      case 'home': ref = homeRef; break;
      case 'about': ref = aboutRef; break;
      case 'skills': ref = skillsRef; break;
      case 'projects': ref = projectsRef; break;
      case 'experiences': ref = experiencesRef; break;
      default: return;
    }
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      {/* --- GLOBAL MOUSE FOLLOWER (LIGHTER) --- */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-700 ease-out"
        style={{
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          /* Alpha reduced to 0.07 for better text readability */
          background: 'radial-gradient(circle, rgba(188, 0, 135, 0.07) 0%, rgba(188, 0, 135, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Header activeSection={activeSection} onNavigate={handleNavigation} />
      
      <div ref={homeRef}><HomeSection /></div>
      <div ref={dividerRef}><TechDivider /></div>
      <div ref={aboutRef}><AboutSection /></div>
      <div ref={dividerRef}><TechDivider /></div>
      
      <div ref={skillsRef} className="bg-transparent"><SkillsSection /></div>
      <CuteDivider />
      <div ref={projectsRef} className="bg-transparent"><ProjectsSection /></div>
      
      {/* Connected seamlessly to projects */}
      <div className="bg-transparent"><PubmatsSection /></div>

      <div ref={dividerRef}><TechDivider /></div>
      <div ref={experiencesRef}><ExperiencesSection /></div>
    </main>
  );
}