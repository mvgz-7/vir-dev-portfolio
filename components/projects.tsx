'use client';

import { useEffect, useState, useRef } from 'react';
import { ExternalLink, Cpu, Layout, Database } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projectCards = [
  {
    id: 'vehicle-traffic',
    title: 'Vehicle Counting and Dynamic Traffic Light System',
    // Renamed 'image' to 'bannerImage' and 'languages' to 'techStack' to match ProjectModal props
    bannerImage: '/project-traffic.jpg', 
    screenshots: ['/traffic-1.jpg', '/traffic-2.jpg'],
    description: [
      'Developed a computer vision system using YOLO11 for real-time vehicle detection.',
      'Implemented dynamic traffic light logic to optimize flow based on vehicle density.',
      'Designed a dashboard for traffic monitoring and historical data analysis.'
    ],
    techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'Tailwind CSS', 'SQL'],
    fullDetails: "This undergraduate thesis project addresses traffic congestion at Capitol View and Graceland intersections in Malolos, Bulacan. By replacing fixed timers with a Vehicle Actuated Control (VAC) algorithm, the system dynamically adjusts green light durations based on real-time vehicle density detected via CCTV.",
    features: [
      { icon: <Cpu size={20} />, text: "Real-time Detection using YOLO11m." },
      { icon: <Layout size={20} />, text: "Dynamic Signal Control via VAC algorithm." },
      { icon: <Database size={20} />, text: "Traffic Analytics and reporting." }
    ],
    githubLink: "https://github.com/yourusername/project",
  },
  {
    id: 'msc-portal',
    title: 'Microsoft Student Community Members Portal',
    bannerImage: '/project-msc.jpg', 
    screenshots: ['/msc-1.jpg', '/msc-2.jpg'],
    description: [
      'Built a centralized portal for community members to access resources and events.',
      'Integrated an authentication system for secure member logins.',
      'Created a responsive UI/UX to ensure accessibility across all device types.'
    ],
    techStack: ['PHP', 'HTML', 'CSS', 'SQL', 'JavaScript'],
    fullDetails: "As Director of Media for the Microsoft Student Community - BULSU, I led the development of this portal. It serves as a digital hub for members to track their event attendance and manage organizational records.",
    features: [
      { icon: <Layout size={20} />, text: "Personalized Member Dashboard." },
      { icon: <Database size={20} />, text: "Admin database management system." }
    ],
    githubLink: "https://github.com/yourusername/project",
  },
];

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const textStyle = { fontFamily: 'Arial, sans-serif', letterSpacing: '-0.06em' };

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center py-20 bg-transparent">
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
        <h2 
          className={`text-6xl font-normal text-center mb-16 text-[#BC0087] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
          style={{ fontFamily: 'Playfair Display, sans-serif', letterSpacing: '-0.05em' }}
        >
          Featured Projects
        </h2>

        <div className="flex flex-col gap-24">
          {projectCards.map((project, index) => (
            <div 
              key={index}
              className={`group bg-white border-4 border-[#BC0087] overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:shadow-[#BC0087]/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image Container */}
              <div className="flex-1 relative min-h-[400px] border-b-4 md:border-b-0 md:border-r-4 border-[#BC0087] bg-white">
                <img 
                  src={project.bannerImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover block" 
                />
              </div>

              {/* Content Container */}
              <div className="flex-1 p-10 flex flex-col justify-between">
                <div>
                  {/* Languages moved ABOVE the title */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#FF00B8] text-white text-[8px] font-bold rounded-lg uppercase tracking-tighter">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl font-bold text-black mb-6 mt-6" style={textStyle}>
                    {project.title}
                  </h3>
                  
                  <ul className="text-gray-500 mb-5 list-disc list-inside space-y-3 text-lg text-justify" style={textStyle}>
                    {project.description.map((point: string, i: number) => (<li key={i}>{point}</li>))}
                  </ul>
                </div>
                
                <div className="mt-auto flex justify-start">
                  {/* "View Project" Button: changed rounded-full to rounded-md for a less rounded look */}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center justify-center gap-3 px-8 py-3 bg-[#BC0087] text-white rounded-md font-bold transition-all hover:bg-black hover:shadow-lg group whitespace-nowrap"
                    style={textStyle}
                  >
                    View Project
                    <ExternalLink size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}