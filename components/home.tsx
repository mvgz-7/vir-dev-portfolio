'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Briefcase, Send } from 'lucide-react';

interface HomeSectionProps {
  onScrollVisibilityChange?: (isVisible: boolean) => void;
  onNavigateSection?: (section: string) => void;
  onScrollToFooter?: () => void;
}

export default function HomeSection({ onScrollVisibilityChange, onNavigateSection, onScrollToFooter }: HomeSectionProps) {
  const [showScroll, setShowScroll] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isAtTop = scrollPosition < 100;
      setShowScroll(isAtTop);
      onScrollVisibilityChange?.(isAtTop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onScrollVisibilityChange]);

  // Increased padding (px-10, py-4) and text size (text-lg) for bigger buttons
  const buttonBaseClass = "flex items-center gap-4 px-10 py-4 text-lg font-bold transition-all duration-300 active:scale-95";
  const buttonTextStyle = { 
    fontFamily: 'Arial, sans-serif', 
    letterSpacing: '-0.06em',
    borderRadius: '12px' 
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-20 bg-white"
    >
      <style jsx global>{`
        @keyframes cornerRoam {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(2vw, 2vh) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes shineMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-corner { animation: cornerRoam 20s ease-in-out infinite; }

        .greetings-container {
          position: relative;
          width: 500px;
          height: 400px;
        }

        .shine-layer {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255, 255, 255, 0.4) 45%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0.4) 55%,
            transparent 75%
          );
          background-size: 200% 100%;
          animation: shineMove 4s infinite linear;
          -webkit-mask-image: url('/greetings.png');
          mask-image: url('/greetings.png');
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-position: center;
          pointer-events: none;
        }
      `}</style>

      {/* --- MOUSE FOLLOWER GRADIENT --- */}
      <div 
        className="fixed pointer-events-none z-0 transition-transform duration-500 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(188, 0, 135, 0.1) 0%, rgba(188, 0, 135, 0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* --- CORNER ANCHORED GRADIENTS --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] animate-corner opacity-40 blur-[100px]">
          <Image src="/orange-gradient-top-left.png" alt="" fill className="object-contain" />
        </div>

        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] animate-corner opacity-60 blur-[80px]" style={{ animationDelay: '-5s' }}>
          <Image src="/orange-gradient-top-left.png" alt="" fill className="object-contain" />
        </div>

        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] animate-corner opacity-40 blur-[100px]" style={{ animationDelay: '-10s' }}>
          <Image src="/pink-gradient-bottom-left.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex items-center justify-between gap-20">
        
        {/* Left side - Greetings */}
        <div className="flex-1 flex justify-center">
          <div className="greetings-container">
            <Image
              src="/greetings.png"
              alt="hello ! i'm Virla"
              fill
              className="object-contain"
              priority
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            />
            <div className="shine-layer" style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col gap-10">
          <div 
            className="text-black font-[Arial] text-3xl leading-snug text-justify max-w-xl" 
            style={{ letterSpacing: '-0.06em' }}
          >
            I'm a <span className="font-bold">Web Developer</span> and a <span className="font-bold">Graphic Designer</span>. I can build responsive websites using modern front-end technologies and I am open to different types of web projects.
          </div>

          <div className="flex gap-6 items-center">
            <button 
              className={`${buttonBaseClass} bg-[#BC0087] text-white hover:bg-[#a00073] hover:shadow-lg group`}
              style={buttonTextStyle}
              onClick={() => onNavigateSection?.('projects')}
            >
              <Briefcase size={26} className="text-white transition-transform group-hover:scale-110" />
              View My Work
            </button>

            <button 
              className={`${buttonBaseClass} bg-white text-[#BC0087] border-2 border-[#BC0087] hover:bg-[#BC0087] hover:text-white group`}
              style={buttonTextStyle}
              onClick={() => onScrollToFooter?.()}
            >
              <Send size={26} className="text-[#BC0087] transition-all group-hover:text-white group-hover:translate-x-1" />
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {showScroll && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <Image src="/scroll-down.png" alt="Scroll down" width={80} height={100} className="w-auto h-auto" />
        </div>
      )}
    </section>
  );
}