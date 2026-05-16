'use client';

import { 
  Code2, 
  Database, 
  Layout, 
  FileJson, 
  Box, 
  Globe,
  Rat 
} from 'lucide-react';

export default function TechDivider() {
  const languages = [
    { name: 'React', icon: <Layout className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'TypeScript', icon: <Code2 className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'JavaScript', icon: <FileJson className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Tailwind CSS', icon: <Layout className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Python', icon: <Rat className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'SQL', icon: <Database className="w-4 h-4 md:w-5 md:h-5" /> }, 
    { name: 'Unity', icon: <Box className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'PHP', icon: <Globe className="w-4 h-4 md:w-5 md:h-5" /> },
  ];

  // Double list provides enough width for mobile seamlessly
  const scrollingList = [...languages, ...languages, ...languages];

  return (
    <div className="relative w-full h-14 md:h-20 flex items-center overflow-hidden z-20 sticky top-0 bg-[#BC0087]">
      <style jsx global>{`
        @keyframes scrollMobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollDesktop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scrollMobile 15s linear infinite;
          margin-left: -20px; 
        }
        @media (min-width: 768px) {
          .animate-scroll {
            animation: scrollDesktop 30s linear infinite;
          }
        }
      `}</style>

      {/* Glassmorphism Layer with Red Accented Borders */}
      <div 
        className="absolute inset-0 w-full h-full backdrop-blur-md border-t-2 border-b-2"
        style={{ 
          backgroundColor: 'rgba(188, 0, 135, 0.1)',
          borderColor: '#FF0000',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)' 
        }}
      />

      <div className="animate-scroll relative z-10">
        {scrollingList.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 md:gap-4 px-10 md:px-20 text-white whitespace-nowrap"
            style={{ 
              fontFamily: "Arial, sans-serif",
              letterSpacing: '-0.06em' 
            }}
          >
            <span className="opacity-90 text-white">{tech.icon}</span>
            <span className="text-base md:text-xl font-bold uppercase">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}