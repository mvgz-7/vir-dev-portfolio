'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

export default function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  if (!project) return null;

  // Global styling for all text: Arial with -6% letter-spacing
  const textStyle = { 
    fontFamily: 'Arial, sans-serif', 
    letterSpacing: '-0.06em' 
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#99026F] overflow-y-auto selection:bg-white selection:text-[#99026F]">
      
      {/* Header with original BC0087 Background */}
      <div className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 z-[110] bg-[#BC0087]">
        <h1 className="text-3xl font-bold text-white uppercase" style={textStyle}>
          {project.title}
        </h1>
        <button 
          onClick={onClose}
          className="p-3 bg-white text-[#BC0087] rounded-full hover:bg-black hover:text-white transition-all shadow-xl"
        >
          <X size={32} />
        </button>
      </div>

      <div className="pt-24 pb-32">
        {/* 1. Big Picture Hero Section */}
        <div className="relative w-full h-[80vh] mb-20">
          <Image 
            src={project.heroImage} 
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-8">
          {/* 2. Detailed Introduction */}
          <div className="mb-24">
            <div className="flex flex-wrap gap-3 mb-8">
              {project.languages?.map((lang: string) => (
                <span key={lang} className="px-6 py-2 bg-white text-[#99026F] text-xs font-black rounded-full uppercase" style={textStyle}>
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-4xl md:text-5xl text-white font-bold leading-tight text-justify" style={textStyle}>
              {project.fullDetails}
            </p>
          </div>

          {/* 3. Large Gallery & Features: Alternating Big Images per Feature */}
          <div className="space-y-40">
            {project.contentSections?.map((section: any, i: number) => (
              <div key={i} className="flex flex-col gap-12">
                {/* Feature Description */}
                <div className={`flex items-start gap-8 max-w-3xl ${i % 2 === 0 ? 'ml-0' : 'ml-auto text-right flex-row-reverse'}`}>
                  <div className="p-6 bg-white text-[#99026F] rounded-2xl shrink-0 shadow-lg">
                    {section.feature.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-white leading-tight" style={textStyle}>
                    {section.feature.text}
                  </h3>
                </div>
                
                {/* Large Scale Gallery Image */}
                <div className="relative w-full aspect-[16/9] rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl">
                  <Image 
                    src={section.image} 
                    alt="Detailed project view" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Note: Links section removed as per request */}
        </div>
      </div>
    </div>
  );
}