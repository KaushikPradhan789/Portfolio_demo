import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, CheckCircle2, ArrowRight, Brain, LineChart, Cpu, Code, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  onExplore: (project: Project) => void;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryLabel: (category: string) => string;
  cardVariants: any;
}

function ProjectCard({
  project,
  onExplore,
  getCategoryIcon,
  getCategoryLabel,
  cardVariants,
}: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Subtle 8-degree maximum rotation
    const maxRotate = 8;
    const rX = ((centerY - y) / centerY) * maxRotate;
    const rY = ((x - centerX) / centerX) * maxRotate;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        y: rotateX !== 0 || rotateY !== 0 ? -6 : 0,
        scale: rotateX !== 0 || rotateY !== 0 ? 1.025 : 1,
        borderColor: rotateX !== 0 || rotateY !== 0 ? "rgba(245, 158, 11, 0.3)" : "rgba(255, 255, 255, 0.05)",
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 18,
        mass: 0.6,
      }}
      className="bg-[#0e0a1b]/60 border border-white/5 rounded-2xl overflow-hidden hover:bg-[#0e0a1b]/85 transition-colors duration-300 flex flex-col justify-between group h-full shadow-lg hover:shadow-glow-amber cursor-default origin-center"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card Header & Content */}
      <div className="p-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
        {/* Visual Header / Icon row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 group-hover:rotate-3 transition-all duration-300">
              {getCategoryIcon(project.category)}
            </div>
            <span className="text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
              {getCategoryLabel(project.category)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
          {project.description}
        </p>

        {/* Stack previews */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-gray-300 bg-white/3 px-2.5 py-1 rounded-lg border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-auto" style={{ transform: 'translateZ(10px)' }}>
        <button
          onClick={() => onExplore(project)}
          className="text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer group/btn focus:outline-none"
        >
          <span>Explore Details</span>
          <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
        </button>

        <div className="flex items-center space-x-3">
          {project.links.github && (
            <motion.a
              whileHover={{ scale: 1.15, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github size={16} />
            </motion.a>
          )}
          {project.links.live && (
            <motion.a
              whileHover={{ scale: 1.15, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return <Brain className="text-amber-400" size={18} />;
      case 'trading':
        return <LineChart className="text-violet-400" size={18} />;
      case 'web':
        return <Code className="text-rose-400" size={18} />;
      default:
        return <Cpu className="text-gray-400" size={18} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ai-ml':
        return 'Artificial Intelligence / ML';
      case 'trading':
        return 'Quantitative Trading';
      case 'web':
        return 'Web Architecture';
      default:
        return 'Engineering';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 14 },
    },
  };

  return (
    <section id="projects" className="py-24 bg-[#05040a] relative overflow-hidden border-t border-b border-white/5">
      {/* Decorative Blur BG with pulsing animations */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-16 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
            <span>[ SECTION 03 ]</span>
            <span className="h-px w-8 bg-amber-500/30"></span>
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white flex items-center">
            Featured Projects
            <Sparkles size={20} className="text-violet-400 ml-2 animate-pulse" />
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base">
            Click on any project to explore its full architecture, technical challenges, and results.
          </p>
        </motion.div>

        {/* Project Card Grid - staggered reveals */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onExplore={setSelectedProject}
              getCategoryIcon={getCategoryIcon}
              getCategoryLabel={getCategoryLabel}
              cardVariants={cardVariants}
            />
          ))}
        </motion.div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Box with significantly lower mobile height */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 20, stiffness: 140 }}
                className="bg-[#0e0a1b] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden relative shadow-2xl z-10 max-h-[75vh] sm:max-h-[90vh] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 z-20 focus:outline-none cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>

                {/* Modal Header banner decorative */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500" />

                {/* Scrollable Container with tighter padding and top-padding safety for close button */}
                <div className="p-4 sm:p-8 pt-12 sm:pt-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
                  {/* Title and Category */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(selectedProject.category)}
                      <span className="text-[10px] font-mono font-medium text-amber-400 tracking-widest uppercase">
                        {getCategoryLabel(selectedProject.category)}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Comprehensive narrative */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] sm:text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest">
                      Project Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      {selectedProject.detailedDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet list */}
                  <div className="space-y-2.5 bg-white/3 border border-white/5 p-3.5 sm:p-5 rounded-xl">
                    <h4 className="text-[10px] sm:text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest flex items-center space-x-1.5">
                      <CheckCircle2 size={12} className="text-amber-400" />
                      <span>Key Highlights & Results</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-400 flex items-start space-x-2 leading-relaxed">
                          <span className="text-amber-400 font-semibold">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] sm:text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest">
                      Full Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] sm:text-xs font-mono text-amber-300 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer (Action row) */}
                <div className="p-4 sm:p-6 border-t border-white/5 bg-white/2 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
                  <span className="text-[9px] sm:text-[10px] font-mono text-gray-500">
                    Source code & deployment links are simulated
                  </span>
                  
                  <div className="flex space-x-3 w-full sm:w-auto">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 hover:text-white transition-all duration-300"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {selectedProject.links.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-violet-600 text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-glow-amber transition-all duration-300"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
