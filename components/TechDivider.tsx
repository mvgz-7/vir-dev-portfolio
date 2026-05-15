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
    { name: 'React', icon: <Layout className="w-5 h-5" /> },
    { name: 'TypeScript', icon: <Code2 className="w-5 h-5" /> },
    { name: 'JavaScript', icon: <FileJson className="w-5 h-5" /> },
    { name: 'Tailwind CSS', icon: <Layout className="w-5 h-5" /> },
    { name: 'Python', icon: <Rat className="w-5 h-5" /> },
    { name: 'SQL', icon: <Database className="w-5 h-5" /> }, // Replaced FastAPI with SQL
    { name: 'Unity', icon: <Box className="w-5 h-5" /> },
    { name: 'PHP', icon: <Globe className="w-5 h-5" /> },
  ];

  const scrollingList = [...languages, ...languages, ...languages];

  return (
    <div className="relative w-full h-20 flex items-center overflow-hidden z-20 sticky top-0 bg-[#BC0087]">
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scroll 30s linear infinite;
          margin-left: -20px; 
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
            className="flex items-center gap-4 px-20 text-white whitespace-nowrap"
            style={{ 
              fontFamily: "Arial, sans-serif",
              letterSpacing: '-0.06em' 
            }}
          >
            <span className="opacity-90 text-white">{tech.icon}</span>
            <span className="text-xl font-bold uppercase">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}