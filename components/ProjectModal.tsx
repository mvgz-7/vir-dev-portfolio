'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  const textStyle = { 
    fontFamily: 'Arial, sans-serif', 
    letterSpacing: '-0.04em' 
  };

  const showNext = useCallback(() => {
    if (selectedImgIndex === null) return;
    setSelectedImgIndex((prev) => (prev! + 1) % project.screenshots.length);
  }, [selectedImgIndex, project.screenshots?.length]);

  const showPrev = useCallback(() => {
    if (selectedImgIndex === null) return;
    setSelectedImgIndex((prev) => (prev! - 1 + project.screenshots.length) % project.screenshots.length);
  }, [selectedImgIndex, project.screenshots?.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setSelectedImgIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImgIndex, showNext, showPrev]);

  if (!project) return null;

  const displayScreenshots = project.screenshots?.slice(0, 3) || [];
  const remainingCount = (project.screenshots?.length || 0) - 3;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#99026F] to-[#FF00B8] overflow-y-auto selection:bg-white selection:text-[#99026F]">
      
      {/* Lightbox / Enlarged View */}
      {selectedImgIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-2 sm:p-4">
          <button onClick={() => setSelectedImgIndex(null)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#BC0087] transition-colors z-[210]">
            <X className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
          
          {/* Previous Arrow Button */}
          <button 
            onClick={showPrev} 
            className="absolute left-3 sm:left-4 p-2 bg-black/40 hover:bg-black/60 border border-white/40 rounded-full text-white transition-all z-[210]"
          >
            <ChevronLeft className="w-6 h-6 sm:w-10 sm:h-10" />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[70vh] sm:max-h-[80vh]">
            <Image src={project.screenshots[selectedImgIndex]} alt="Enlarged" fill className="object-contain" /> 
          </div>
          
          {/* Next Arrow Button */}
          <button 
            onClick={showNext} 
            className="absolute right-3 sm:right-4 p-2 bg-black/40 hover:bg-black/60 border border-white/40 rounded-full text-white transition-all z-[210]"
          >
            <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 z-[110] bg-[#710150] shadow-xl border-b-2 border-white/40 gap-4">
        {/* Hidden on mobile, block on desktop */}
        <h1 className="hidden md:block text-lg sm:text-2xl font-bold text-white uppercase truncate" style={textStyle}>
          {project.title}
        </h1>
        {/* Simple spacer container for mobile back layout to force exit button right */}
        <div className="md:hidden" />
        <button onClick={onClose} className="p-1.5 sm:p-2 text-white hover:bg-white/20 rounded-md border-2 border-white/50 transition-all shrink-0">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
        
        {/* Top Grid: Gallery, Overview, and Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          
          {/* Left Column: Gallery and Overview */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery */}
            <div className="space-y-4">
              {/* Visible only on mobile view to move title above gallery */}
              <h1 className="block md:hidden text-2xl font-bold text-white leading-tight mb-9" style={textStyle}>
                {project.title}
              </h1>
              
              <h2 className="text-xl sm:text-4xl font-bold text-white" style={textStyle}>Project Gallery</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {displayScreenshots.map((img: string, i: number) => (
                  <div key={i} onClick={() => setSelectedImgIndex(i)} className="relative aspect-video rounded-sm sm:rounded-md overflow-hidden border-2 border-white/60 shadow-xl cursor-zoom-in group bg-black/20">
                    <Image src={img} alt="Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    {i === 2 && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-sm sm:text-lg font-bold">+{remainingCount} more</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-4xl font-bold text-white" style={textStyle}>Overview</h2>
              <div className="bg-white/90 p-4 sm:p-5 rounded-md border-2 border-white/60 shadow-lg">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed text-justify font-medium" style={textStyle}>{project.fullDetails}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Features matched to height with justified spacing */}
          <div className="flex flex-col lg:pt-12">
            <div className="bg-white/90 rounded-md shadow-xl border-2 border-white/60 overflow-hidden h-full flex flex-col">
              <div className="bg-[#BC0087] p-3 border-b-2 border-white/20 flex justify-start">
                <h2 className="text-xl font-bold text-white" style={textStyle}>Key Features</h2>
              </div>
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <ul className="flex flex-col lg:justify-between h-full space-y-4 lg:space-y-0">
                  {project.features?.map((feature: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 flex-shrink-0"><CheckCircle2 className="w-4 h-4 text-[#BC0087]" /></div>
                      <span className="text-sm text-gray-800 leading-snug font-medium" style={textStyle}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Reviews */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-4xl font-bold text-white" style={textStyle}>User Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {(project.reviews || []).map((review: any, i: number) => (
              <div key={i} className="bg-white/90 p-4 sm:p-6 rounded-md shadow-lg border-2 border-white/60 border-l-[12px] border-l-[#FF00B8]">
                <p className="text-sm sm:text-md text-gray-900 italic mb-3 font-normal leading-relaxed" style={textStyle}>"{review.text}"</p>
                <p className="text-xs font-black text-[#BC0087] tracking-wider uppercase" style={textStyle}>— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}