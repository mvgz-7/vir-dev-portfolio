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

  const buttonBaseClass = "flex items-center gap-2 md:gap-4 px-4 md:px-10 py-3 md:py-4 text-sm md:text-lg font-bold transition-all duration-300 active:scale-95";
  
  const buttonTextStyle = { 
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <section
      id="home"
      /* ADJUSTED: Reduced pt-[140px] to pt-[90px] on mobile to pull contents higher up */
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden pt-[90px] md:pt-[160px] pb-20 bg-white"
    >
      <style jsx global>{`
        @keyframes cornerRoam {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes shineMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-corner { animation: cornerRoam 20s ease-in-out infinite; }

        .greetings-container {
          position: relative;
          width: 340px; 
          height: 280px;
          margin-top: -40px; 
        }
        
        @media (min-width: 768px) {
          .greetings-container {
            width: 500px;
            height: 400px;
            margin-top: 0; 
          }
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

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-10 md:-top-20 -right-10 md:-right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] animate-corner opacity-40 blur-[60px] md:blur-[100px]">
          <Image src="/orange-gradient-top-left.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute -top-20 md:-top-40 -left-20 md:-left-40 w-[350px] md:w-[700px] h-[350px] md:h-[700px] animate-corner opacity-60 blur-[50px] md:blur-[80px]" style={{ animationDelay: '-5s' }}>
          <Image src="/orange-gradient-top-left.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* ADJUSTED: Added -mt-16 to lift elements up on mobile, kept md:-mt-10 unchanged for desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-[80px] -mt-16 md:-mt-10">
        
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

        <div className="flex-1 flex flex-col items-center md:items-start gap-4 md:gap-[40px]">
          {/* Paragraph: Hidden on mobile view using 'hidden md:block' */}
          <div 
            className="hidden md:block text-black font-[Arial] text-xl md:text-3xl leading-snug md:leading-10 text-center md:text-justify max-w-xl tracking-[-0.04em] md:tracking-[-0.06em]" 
          >
            I'm a <span className="font-bold">Full-Stack Developer</span> and a <span className="font-bold">Graphic Designer</span>. I can build responsive websites using modern technologies and I am open to different types of web projects.
          </div>

          <div className="flex flex-row gap-3 md:gap-[24px] items-center justify-center md:justify-start w-full">
            <button 
              className={`${buttonBaseClass} bg-[#BC0087] text-white hover:bg-[#a00073] hover:shadow-lg group flex-1 md:flex-none justify-center rounded-[5px] md:rounded-[12px] tracking-[-0.04em] md:tracking-[-0.06em]`}
              style={buttonTextStyle}
              onClick={() => onNavigateSection?.('projects')}
            >
              <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-white" />
              <span className="whitespace-nowrap">View My Work</span>
            </button>

            <button 
              className={`${buttonBaseClass} bg-white text-[#BC0087] border-[1.5px] md:border-2 border-[#BC0087] hover:bg-[#BC0087] hover:text-white group flex-1 md:flex-none justify-center rounded-[5px] md:rounded-[12px] tracking-[-0.04em] md:tracking-[-0.06em]`}
              style={buttonTextStyle}
              onClick={() => onScrollToFooter?.()}
            >
              <Send className="w-4 h-4 md:w-6 md:h-6 transition-all" />
              <span className="whitespace-nowrap">Get in Touch</span>
            </button>
          </div>
        </div>
      </div>

      {showScroll && (
        <div className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-[8px] animate-bounce">
          <div className="relative w-[70px] h-[80px]">
            <Image 
              src="/scroll-down.png" 
              alt="Scroll down" 
              fill
              sizes="70px"
              priority
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </section>
  );
}