import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Code2, LineChart, Cpu, Calendar, MapPin, Target, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function About() {
  const pillars = [
    {
      icon: <Code2 className="text-emerald-400" size={24} />,
      title: 'Scalable Web Architecture',
      description: 'Architecting modern, clean, and highly optimized frontend interfaces utilizing React, Next.js, and TypeScript, focusing on load times, state architecture, and responsive layouts.',
    },
    {
      icon: <LineChart className="text-cyan-400" size={24} />,
      title: 'Quantitative Systems',
      description: 'Writing robust algorithmic backtesting and live trading strategies in Pine Script v5 for TradingView, centering on trend breakout signals and statistical validation.',
    },
    {
      icon: <Cpu className="text-teal-400" size={24} />,
      title: 'Intelligent Automation',
      description: 'Streamlining processes using RPA tools like Blue Prism and building automated machine learning preprocessing pipelines to minimize human friction in workflows.',
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const textGroupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 14,
        delay: index * 0.15
      },
    }),
  };

  return (
    <section id="about" className="py-24 bg-[#06050b] relative overflow-hidden">
      {/* Background radial glowing gradients */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-amber-500/6 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with Reveal Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
          className="flex flex-col mb-16 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
            <span>[ SECTION 01 ]</span>
            <span className="h-px w-8 bg-amber-500/30"></span>
            <span>WHO I AM</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white flex items-center">
            About Me
            <Sparkles size={20} className="text-violet-400 ml-2 animate-pulse" />
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base">
            Bridging high-performance web systems with machine learning principles to shape automation.
          </p>
        </motion.div>

        {/* Content Layout - Modern asymmetrical bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Education and Story with reveals */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={textGroupVariants}
            className="lg:col-span-7 space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <motion.h3 variants={textItemVariants} className="font-display font-bold text-xl text-white flex items-center">
                <Target size={18} className="text-amber-400 mr-2" />
                The Journey
              </motion.h3>
              
              <motion.p variants={textItemVariants} className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.detailedBio}
              </motion.p>
              
              <motion.p variants={textItemVariants} className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed">
                Currently living in <span className="text-amber-300 font-semibold">{PERSONAL_INFO.location}</span>, I take pride in active self-learning, participating in developer circles, and building projects that merge software engineering with statistical algorithms.
              </motion.p>
            </div>

            {/* Education Card with Magnetic spring glow hover */}
            <motion.div 
              variants={textItemVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.01,
                borderColor: "rgba(245, 158, 11, 0.3)" 
              }}
              className="bg-[#0e0a1b]/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 hover:shadow-glow-amber transition-all duration-300 cursor-default"
            >
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-amber-500 to-violet-500" />
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 rounded-xl text-amber-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="font-display font-bold text-base text-white">Education</h4>
                    <span className="font-mono text-[10px] bg-white/5 text-gray-400 px-2.5 py-1 rounded-lg border border-white/10 w-fit flex items-center space-x-1">
                      <Calendar size={12} className="mr-1 text-amber-400" /> {PERSONAL_INFO.education.period}
                    </span>
                  </div>
                  
                  <div>
                    <h5 className="font-sans font-semibold text-sm text-amber-300">
                      {PERSONAL_INFO.education.degree}
                    </h5>
                    <p className="text-xs font-mono text-gray-400 flex items-center mt-1">
                      <MapPin size={12} className="mr-1 text-violet-400" /> {PERSONAL_INFO.education.institution}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {PERSONAL_INFO.education.achievements.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-start space-x-2">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Three Pillars / Focus Areas with Staggered Viewport Reveal */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Core Focus Areas</h3>
            <div className="grid grid-cols-1 gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.01,
                    borderColor: 'rgba(139, 92, 246, 0.3)' 
                  }}
                  className="bg-[#0e0a1b]/60 border border-white/5 p-5 rounded-2xl flex items-start space-x-4 hover:bg-[#0e0a1b]/80 hover:border-white/10 hover:shadow-glow-violet transition-all duration-300 group cursor-default"
                >
                  <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-300 shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

