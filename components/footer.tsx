import React, { forwardRef, useState } from 'react'; 
import { Mail, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('mariavirlaeliza@gmail.com');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <footer 
      ref={ref} 
      className="relative w-full py-6 sm:py-10 bg-gradient-to-br from-[#99026F] to-[#700251] border-t border-[#BC0087]/30 mt-8 sm:mt-16 flex flex-col items-center z-20"
    >
      {/* MAIN WRAPPER: 
        - On Mobile: Becomes a 2-column grid layout (Left: Text & Links, Right: Image).
        - On Desktop (sm and up): Returns to a standard vertical stack.
      */}
      <div className="w-full max-w-xl px-6 grid grid-cols-[1fr_auto] items-center gap-4 sm:flex sm:flex-col sm:items-center sm:gap-0">
        
        {/* ORIGINAL DESKTOP PORTRAIT BLOCK (Only renders from tablet-width 'sm' upwards to keep desktop layout intact) */}
        <div className="hidden sm:flex lg:hidden w-full flex justify-center mb-4 px-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-[#BC0087]/30 shadow-lg">
            <Image 
              src="/my-picture-footer.png" 
              alt="My Portrait" 
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* LEFT COLUMN ON MOBILE / TOP BLOCK ON DESKTOP */}
        <div className="flex flex-col items-start sm:items-center">
          {/* Header Texts */}
          <div className="flex flex-col items-start sm:items-center gap-1 sm:gap-2 mb-3 sm:mb-4 text-left sm:text-center">
            <h3 className="text-xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}>
              Let's Connect!
            </h3>
            <p className="text-white/80 text-xs sm:text-base">I'm available for freelance work and collaborations!</p> 
          </div>

          {/* Contact Details Links */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 items-start sm:items-center mb-3 sm:mb-4 text-left sm:text-left">
            <a onClick={handleEmailClick} className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline cursor-pointer text-xs sm:text-base">
              <Mail className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" /> mariavirlaeliza@gmail.com
            </a>
            <a href="https://linkedin.com/in/virlaeliza" className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline text-xs sm:text-base" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" /> LinkedIn
            </a>
            <a href="https://github.com/mvgz-7" className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline text-xs sm:text-base" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" /> GitHub
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN ON MOBILE / HIDDEN ON DESKTOP (lg:hidden overrides managed cleanly via parent layouts) */}
        <div className="sm:hidden flex justify-center shrink-0">
          {/* Mobile Profile Frame: Set to round circle (rounded-full) */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#BC0087]/30 shadow-lg">
            <Image 
              src="/my-picture-footer.png" 
              alt="My Portrait" 
              fill
              className="object-cover"
            />
          </div>
        </div>

        

      </div>

      {/* Copyright Footer Line */}
      <div className="text-[10px] sm:text-xs text-white/60 mt-2 sm:mt-0">&copy; {new Date().getFullYear()} Virla Getalado. All rights reserved.</div>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 border border-pink-400 px-4 py-2 rounded shadow-lg z-50 font-semibold text-pink-900">
          Email copied!
        </div>
      )}
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;