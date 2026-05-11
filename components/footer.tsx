import React, { forwardRef } from 'react'; // 1. Added forwardRef import
import { Mail, Linkedin, Github } from 'lucide-react'; 

// 2. Wrapped the function in forwardRef
const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer 
      ref={ref} // 3. Attached the forwarded ref to the HTML tag
      className="relative w-full py-10 bg-gradient-to-br from-[#99026F] to-[#700251] border-t border-[#BC0087]/30 mt-16 flex flex-col items-center z-20"
    >
      <div className="flex flex-col items-center gap-2 mb-4">
        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}>
          Let's Connect!
        </h3>
        <p className="text-white/80 text-base">I'm available for freelance work and collaborations!</p> 
      </div>
      <div className="flex gap-6 items-center mb-4">
        <a href="mailto:mariavirlaeliza@gmail.com" className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline" target="_blank" rel="noopener noreferrer">
          <Mail size={20} /> mariavirlaeliza@gmail.com
        </a>
        <a href="https://linkedin.com/in/virlaeliza" className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline" target="_blank" rel="noopener noreferrer">
          <Linkedin size={20} /> LinkedIn
        </a>
        <a href="https://github.com/mvgz-7" className="flex items-center gap-2 text-white hover:text-[#86d850] hover:underline" target="_blank" rel="noopener noreferrer">
          <Github size={20} /> GitHub
        </a>
      </div>
      <div className="text-xs text-white/60">&copy; {new Date().getFullYear()} Virla Getalado. All rights reserved.</div>
    </footer>
  );
});

// 4. Added display name for dev tools
Footer.displayName = 'Footer';

export default Footer;