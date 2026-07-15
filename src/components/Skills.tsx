import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Terminal, Brain, Sparkles, Sliders } from 'lucide-react';
import { SKILLS } from '../data';
import { Skill } from '../types';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'tools' | 'specialization'>('all');

  const tabs = [
    { id: 'all', label: 'All Tech Stack', icon: <Sparkles size={14} /> },
    { id: 'frontend', label: 'Frontend', icon: <Layers size={14} /> },
    { id: 'tools', label: 'Tools / OS', icon: <Terminal size={14} /> },
    { id: 'specialization', label: 'Specializations', icon: <Brain size={14} /> },
  ];

  const filteredSkills = SKILLS.filter(
    (skill) => activeTab === 'all' || skill.category === activeTab
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'tools':
        return 'text-violet-400 border-violet-500/20 bg-violet-500/5';
      case 'specialization':
        return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
      default:
        return 'text-gray-400 border-white/5 bg-white/5';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'tools':
        return 'Tools & OS';
      case 'specialization':
        return 'Specialization';
      default:
        return category;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#05040a] relative overflow-hidden">
      {/* Background glow structures */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[12000ms]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with stagger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-3"
          >
            <div className="inline-flex items-center space-x-2 text-violet-400 font-mono text-xs uppercase tracking-widest">
              <span>[ SECTION 02 ]</span>
              <span className="h-px w-8 bg-violet-500/30"></span>
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white flex items-center">
              Skills & Expertise
              <Sliders size={20} className="text-amber-400 ml-2 animate-pulse" />
            </h2>
            <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base">
              A detailed view of my programming proficiencies, workflows, and machine learning architectures.
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs with scale bounces */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 bg-white/3 p-1.5 rounded-xl border border-white/5 w-fit relative z-20"
          >
            {tabs.map((tab) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-300 relative cursor-pointer ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-violet-500/15 border border-amber-500/30 rounded-lg -z-10 shadow-glow-amber"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid - Animated layout shifts */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.01,
                  borderColor: "rgba(245, 158, 11, 0.3)" 
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 110, 
                  damping: 15,
                  layout: { duration: 0.3, type: 'spring' }
                }}
                key={skill.name}
                className="bg-[#0e0a1b]/40 border border-white/5 hover:border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:shadow-glow-amber transition-all duration-300 group cursor-default"
              >
                <div className="space-y-4">
                  {/* Skill title & Badge */}
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${getCategoryColor(skill.category)}`}>
                      {getCategoryLabel(skill.category)}
                    </span>
                  </div>

                  {/* Description */}
                  {skill.description && (
                    <p className="text-xs text-gray-400 leading-relaxed font-sans min-h-[36px]">
                      {skill.description}
                    </p>
                  )}
                </div>

                {/* Progress bar info */}
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">proficiency</span>
                    <span className="text-amber-400 font-semibold flex items-center">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {skill.level}
                      </motion.span>%
                    </span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                      className={`h-full rounded-full bg-gradient-to-r relative ${
                        skill.category === 'frontend'
                          ? 'from-amber-500 to-rose-500'
                          : skill.category === 'tools'
                          ? 'from-violet-500 to-rose-500'
                          : 'from-rose-500 to-amber-500'
                      }`}
                    >
                      {/* Moving light beam on the loading progress line */}
                      <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                      />
                    </motion.div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick Footer Accent with micro hover */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="mt-12 p-5 bg-[#0e0a1b]/20 border border-white/5 rounded-2xl max-w-2xl mx-auto flex items-center justify-between gap-4 cursor-default transition-all duration-300 hover:border-amber-500/20"
        >
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg font-mono text-xs font-bold animate-pulse">ML</span>
            <p className="text-xs text-gray-400 leading-normal font-sans">
              Continuously training predictive models, researching multi-agent collaboration with Gemini APIs, and tracking financial charts.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

