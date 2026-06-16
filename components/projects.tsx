'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { ExternalLink, Cpu, Layout, Database } from 'lucide-react';
import ProjectModal from './ProjectModal';

function FadeInProject({ children, index }: { children: ReactNode; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check if the screen size is mobile (less than md breakpoint: 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setIsVisible(true);
      return; // Skip setting up the IntersectionObserver for mobile
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;

        if (entry.isIntersecting) {
          if (isScrollingDown) {
            setIsVisible(false); 
            setTimeout(() => setIsVisible(true), 10);
          } else {
            setIsVisible(true);
          }
        } else if (isScrollingDown) {
          setIsVisible(false);
        }
        lastScrollY.current = currentScrollY;
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out h-full ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'md:opacity-0 md:translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

const projectCards = [
  {
    id: 'vehicle-traffic',
    title: 'Vehicle Counting and Dynamic Traffic Light System',
    bannerImage: '/project-traffic.jpg', 
    screenshots: ['/traffic1.jpg', '/traffic2.jpg', '/traffic3.jpg', '/traffic4.jpg', '/traffic5.jpg', '/traffic6.jpg', '/traffic7.jpg', '/traffic8.jpg', '/traffic9.jpg'],
    fullDetails: "The objective of this project is to develop a system that automates vehicle counting and dynamically adjusts traffic light timings to improve traffic flow at the Capitol View and Graceland intersections in Malolos, Bulacan. The target users include the City Traffic Management Office (CTMO) for daily operations, and the CDRRMO / PDRRMO for urban planning and emergency coordination.",
    techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'YOLO11', 'SQL', 'OpenCV'],
    description: [
      'Developed an automated traffic monitoring system utilizing YOLO11 for real-time vehicle detection and data acquisition from CCTV video feeds.',
      'Implemented dynamic traffic light logic to optimize flow based on vehicle density.',
      'Achieved a 9.3/10 usability rating from IT experts, validating a commitment to software quality and clear interface design.',
    ],
    features: [
      { text: "Real-time Vehicle Detection & Classification using YOLO11m." },
      { text: "Dynamic Signal Control via Vehicle-Actuated Control (VAC) algorithm." },
      { text: "Automated Traffic Analytics and Comprehensive Data Reporting." },
      { text: "System Health Monitoring with Real-time FPS and Connection Tracking." },
      { text: "Automated Notifications and Log Management for Traffic Events." }
    ],
    reviews: [
      { name: "City Traffic Management Office", text: "Mas madali nitong mabibilang ang mga sasakyan at uri ng sasakyan na dumadaan sa bawat araw at oras nito." },
      { name: "IT Expert", text: "It has a clean UI and is very easy to navigate between modules." },
      { name: "PDRRMO Representative", text: "Yung system niyo na 'yan is makakabuti siya sa pagiging handa ng pag-manage ng traffic." },
      { name: "IT Expert", text: "The most user-friendly features are the automated data logging and the visual map of the intersection." },
      { name: "City Traffic Management Office", text: "Masaya dahil mapapabilis at mapapadali ang trabaho gamit ang sistema." },
      { name: "IT Expert", text: "I am highly likely to rely on it... objective, real-time data is far more reliable for long-term urban planning." }
    ]
  },
  {
    id: 'msc-portal',
    title: 'Microsoft Student Community Members Portal',
    bannerImage: '/project-msc.jpg', 
    liveLink: 'https://bulsumsc.org',
    techStack: ['PHP', 'HTML', 'CSS', 'SQL', 'JavaScript'],
    description: [
      'Built a centralized portal for community members to access resources and events.',
      'Integrated an authentication system for secure member logins.',
      'Utilized secure database structures for event registration, students management, and attendance verification.',
    ],
  },
  {
    id: 'cleandata-studio',
    title: 'CleanData Studio',
    bannerImage: '/cleandata.jpeg', 
    liveLink: 'https://bulsumsc.org',
    techStack: ['C#', 'ASP.NET', 'React', 'Typescript'],
    description: [
      'Architected and developed a full-stack data management web application designed to process information into action through analytics-based solutions.',
      'Applied spec-driven development patterns to map out data flows and reduce technical debt within both frontend views and backend API routing.',
    ],
    inProgress: true,
  },
  {
    id: 'gene-expression',
    title: 'Gene Expression Cancer RNA-Seq Analysis',
    bannerImage: '/gene-expression.jpg', 
    liveLink: 'https://github.com/mvgz-7/gene-expression-cancer-rna/blob/main/machine_learning.ipynb',
    techStack: ['Python', 'Pandas', 'Numpy', 'Pyplot', 'Seaborn'],
    description: [
      'Classified cancer types based on gene expression patterns using machine learning.',
      'Cleaned and preprocessed the dataset before applying classification models such as Logistic Regression and Random Forest.',
      'Demonstrated a complete machine learning workflow, including data inspection, data cleaning, feature selection, model training, evaluation, and interpretation of results.',
    ],
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleProjectClick = (project: any) => {
    if (project.inProgress) return; // Do nothing if the project is still in progress
    if (project.liveLink) {
      window.open(project.liveLink, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 bg-white overflow-visible">
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <div className="relative z-10 w-full max-w-[1200px] px-4 sm:px-8 mx-auto">
        <FadeInProject index={0}>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center mb-8 sm:mb-12 text-[#BC0087]" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}>
            Projects
          </h2>
        </FadeInProject>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectCards.map((project, index) => (
            <FadeInProject key={project.id} index={index}>
              <div className="flex flex-col bg-white border-2 border-[#BC0087]/50 overflow-hidden h-full rounded-xl transition-all duration-300 shadow-md hover:shadow-[#BC0087]/40 hover:-translate-y-1">
              <div className="relative h-40 sm:h-52 border-b border-[#BC0087]/30">
                  <img src={project.bannerImage} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-2 sm:px-2.5 py-0.5 bg-[#FF00B8] text-white text-[9px] sm:text-[10px] font-bold rounded uppercase">{tech}</span>
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>{project.title}</h3>
                  <ul className="text-gray-600 mb-6 sm:mb-8 space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs list-disc list-inside text-justify" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {project.description.map((point, i) => (<li key={i}>{point}</li>))}
                  </ul>
                  
                  <button 
                    onClick={() => handleProjectClick(project)}
                    className={`mt-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-[11px] sm:text-xs font-bold transition-all ${
                      project.inProgress 
                        ? 'bg-slate-400 text-white cursor-not-allowed' 
                        : 'bg-[#BC0087] text-white hover:bg-black'
                    }`}
                    disabled={project.inProgress}
                  >
                    {project.inProgress ? (
                      <span>Deployment In Progress</span>
                    ) : (
                      <>
                        <span>View Project</span>
                        <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </FadeInProject>
          ))}
        </div>
      </div>

      <div className="relative w-full h-auto mt-20 sm:mt-40 flex flex-col justify-center items-center px-4 sm:px-10">
        <div className="max-w-7xl w-full text-center mb-6 sm:mb-10">
          <FadeInProject index={projectCards.length}>
            <h2 
              className="text-lg sm:text-2xl font-normal text-gray-600"
              style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.05em' }}
              > Some of the publication materials I designed for different organizations.
            </h2>
          </FadeInProject>
        </div>
        
        <FadeInProject index={projectCards.length + 1}>
          <div className="max-w-[90%] sm:max-w-[80%] mx-auto relative overflow-hidden border-[5px] sm:border-[10px] border-[#D4C4E9]">
            <img
              src="/pubmats.png" 
              alt="Publication Materials"
              className="w-full h-auto block"
            />
          </div>
        </FadeInProject>
      </div>
    </section>
  );
}