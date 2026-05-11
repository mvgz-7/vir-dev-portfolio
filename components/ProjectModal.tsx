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
    <div className="fixed inset-0 z-[100] bg-[#99026F] overflow-y-auto selection:bg-white selection:text-[#99026F]">
      
      {/* Lightbox / Enlarged View */}
      {selectedImgIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setSelectedImgIndex(null)} className="absolute top-6 right-6 text-white hover:text-[#BC0087] transition-colors z-[210]">
            <X size={40} />
          </button>
          <button onClick={showPrev} className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ChevronLeft size={48} /></button>
          <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
            <Image src={project.screenshots[selectedImgIndex]} alt="Enlarged" fill className="object-contain" />
          </div>
          <button onClick={showNext} className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ChevronRight size={48} /></button>
        </div>
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-[110] bg-[#BC0087] shadow-xl border-b-2 border-white/40">
        <h1 className="text-3xl font-bold text-white uppercase" style={textStyle}>{project.title}</h1>
        <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-md border-2 border-white/50 transition-all"><X size={24} /></button>
      </div>

      {/* Main Content Container - max-w increased to 7xl */}
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Content Column - space-y decreased to 8 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white" style={textStyle}>Project Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {displayScreenshots.map((img: string, i: number) => (
                  <div key={i} onClick={() => setSelectedImgIndex(i)} className="relative aspect-video rounded-md overflow-hidden border-2 border-white/60 shadow-xl cursor-zoom-in group bg-black/20">
                    <Image src={img} alt="Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    {i === 2 && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">+{remainingCount} more</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white" style={textStyle}>Overview</h2>
              <div className="bg-white/90 p-5 rounded-md border-2 border-white/60 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed text-justify font-medium" style={textStyle}>{project.fullDetails}</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white" style={textStyle}>User Reviews</h2>
              <div className="grid gap-4">
                {(project.reviews || []).map((review: any, i: number) => (
                  <div key={i} className="bg-white/90 p-5 rounded-md shadow-lg border-2 border-white/60 border-l-[12px] border-l-[#FF00B8]">
                    <p className="text-sm text-gray-900 italic mb-2 font-semibold" style={textStyle}>"{review.text}"</p>
                    <p className="text-xs font-black text-[#BC0087] tracking-wider uppercase" style={textStyle}>— {review.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:mt-12">
            <div className="bg-white/90 rounded-md shadow-xl border-2 border-white/60 overflow-hidden">
              {/* Key Features Title aligned to the Left */}
              <div className="bg-[#BC0087] p-3 border-b-2 border-white/20 flex justify-start">
                <h2 className="text-xl font-bold text-white" style={textStyle}>Key Features</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {project.features?.map((feature: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 flex-shrink-0"><CheckCircle2 size={16} className="text-[#BC0087]" /></div>
                      <span className="text-sm text-gray-800 leading-snug font-medium" style={textStyle}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/90 p-5 rounded-md shadow-xl border-2 border-white/60">
              <h2 className="text-[12px] font-black text-[#BC0087] mb-3 uppercase tracking-widest border-b-2 border-[#BC0087]/20 pb-1" style={textStyle}>Core Technologies</h2>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 bg-[#99026F] text-white text-[10px] font-bold rounded-sm uppercase border border-white/30 shadow-sm" style={textStyle}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}