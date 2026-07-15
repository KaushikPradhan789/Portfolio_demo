import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Terminal, Brain, TrendingUp, Sparkles, ChevronRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

// Generate 12 persistent floating particles with random attributes
const FLOATING_PARTICLES = [
  { size: 4, top: '15%', left: '10%', duration: 12, delay: 0 },
  { size: 6, top: '25%', left: '80%', duration: 18, delay: 2 },
  { size: 5, top: '45%', left: '5%', duration: 15, delay: 1 },
  { size: 8, top: '75%', left: '15%', duration: 20, delay: 3 },
  { size: 3, top: '85%', left: '85%', duration: 14, delay: 0.5 },
  { size: 7, top: '10%', left: '60%', duration: 16, delay: 4 },
  { size: 4, top: '60%', left: '90%', duration: 13, delay: 2.5 },
  { size: 5, top: '35%', left: '30%', duration: 17, delay: 1.5 },
  { size: 6, top: '55%', left: '70%', duration: 19, delay: 3.5 },
  { size: 3, top: '5%', left: '40%', duration: 11, delay: 0.2 },
  { size: 5, top: '90%', left: '50%', duration: 22, delay: 5 },
  { size: 4, top: '40%', left: '50%', duration: 14, delay: 1 }
];

export default function Hero() {
  const [typedLineIndex, setTypedLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation states
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Clean spring physics configuration for the tilt
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Simulating typewriter row compilation
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedLineIndex((prev) => (prev < 7 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 14 },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-grid-pattern bg-[#05040a]">
      
      {/* Absolute floating background blobs for immersive lighting */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.8, 0.6],
          x: [0, 15, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" 
      />
      
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
          x: [0, -25, 0],
          y: [0, 15, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Floating Starfield/Particles Network */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_PARTICLES.map((particle, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-gradient-to-r from-amber-400 to-violet-500 opacity-25"
            style={{
              width: particle.size,
              height: particle.size,
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.15, 0.45, 0.15],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left column: Text Content - Expanded slightly for better asymmetry */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col space-y-6"
        >
          {/* Status Badge with shimmer and pulse */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-violet-600/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full w-fit hover:border-amber-500/50 transition-colors duration-300 shadow-glow-amber"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-medium text-amber-400 tracking-wider uppercase flex items-center space-x-1">
              <Sparkles size={12} className="animate-spin text-amber-400 mr-1" style={{ animationDuration: '6s' }} />
              Specializing in AI/ML & Quantitative Systems
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
              Hi, I'm <br className="sm:hidden" />
              <motion.span 
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 bg-[size:200%_auto] bg-clip-text text-transparent inline-block hover:scale-[1.01] transition-transform duration-300"
              >
                {PERSONAL_INFO.name}
              </motion.span>
            </h1>
            <h2 className="font-display font-bold text-xl sm:text-3xl text-gray-300 flex items-center">
              <ChevronRight size={24} className="text-violet-400 mr-1" />
              {PERSONAL_INFO.title}
            </h2>
          </motion.div>

          {/* Tagline / Pitch */}
          <motion.p variants={itemVariants} className="text-gray-400 font-sans text-sm sm:text-lg max-w-2xl leading-relaxed">
            {PERSONAL_INFO.tagline}. Based in {PERSONAL_INFO.location}, I bridge the gap between intelligent algorithmic models and high-performance user interfaces.
          </motion.p>

          {/* Quick Focus Metrics with Hover Glows */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 pt-2 pb-4 max-w-lg">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(245, 158, 11, 0.3)" }}
              className="bg-white/3 border border-white/5 p-3 rounded-xl transition-all duration-300 cursor-default hover:shadow-glow-amber"
            >
              <Brain className="text-amber-400 mb-1.5" size={18} />
              <div className="text-[10px] font-mono text-gray-500">Deep Learning</div>
              <div className="text-[11px] sm:text-xs font-semibold text-white leading-tight">AI / ML Model Workflows</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
              className="bg-white/3 border border-white/5 p-3 rounded-xl transition-all duration-300 cursor-default hover:shadow-glow-violet"
            >
              <TrendingUp className="text-violet-400 mb-1.5" size={18} />
              <div className="text-[10px] font-mono text-gray-500">Quantitative</div>
              <div className="text-[11px] sm:text-xs font-semibold text-white leading-tight">Pine Script Strategies</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(244, 63, 94, 0.3)" }}
              className="bg-white/3 border border-white/5 p-3 rounded-xl transition-all duration-300 cursor-default hover:shadow-glow-amber"
            >
              <Terminal className="text-rose-400 mb-1.5" size={18} />
              <div className="text-[10px] font-mono text-gray-500">Architecture</div>
              <div className="text-[11px] sm:text-xs font-semibold text-white leading-tight">Full-Stack Interfaces</div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-600 hover:to-violet-700 text-white font-sans font-semibold text-sm rounded-xl shadow-glow-amber transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.03, backgroundColor: "rgba(139, 92, 246, 0.1)", borderColor: "rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              download="Kaushik_Pradhan_Resume.pdf"
              className="px-6 py-3.5 bg-violet-600/5 border border-violet-500/20 text-violet-300 hover:text-violet-200 font-sans font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-glow-violet/10 group"
            >
              <span>Download Resume</span>
              <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3.5 bg-white/5 border border-white/10 text-gray-200 hover:text-white font-sans font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Contact Me</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right column: Interactive 3D Tilting Tech Mockup - Scaled appropriately for bento feel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', damping: 20 }}
          className="lg:col-span-4 relative flex justify-center items-center h-full perspective-1000"
        >
          {/* Main 3D Card Container */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-md bg-[#0e0a1b]/95 border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden shadow-glow-violet select-none"
          >
            {/* Ambient inner card neon glows */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top window controls */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 flex items-center space-x-1">
                <Terminal size={10} className="text-amber-400 mr-1" />
                kaushik_pradhan.py
              </span>
            </div>

            {/* Code Block Mock - typing compiler simulator */}
            <div className="font-mono text-[11px] text-gray-400 space-y-1.5" style={{ transform: 'translateZ(20px)' }}>
              {typedLineIndex >= 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
                  # Importing intelligence & quantitative modules
                </motion.p>
              )}
              {typedLineIndex >= 1 && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-violet-400">from</span> core_ai <span className="text-violet-400">import</span> deep_learning
                </motion.p>
              )}
              {typedLineIndex >= 2 && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-violet-400">from</span> quant_systems <span className="text-violet-400">import</span> pine_engine, risk_mgmt
                </motion.p>
              )}
              {typedLineIndex >= 3 && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-amber-400 pt-1">
                  <span className="text-rose-400">class</span> <span className="text-amber-300">KaushikPradhan</span>(<span className="text-rose-300">Developer</span>):
                </motion.p>
              )}
              {typedLineIndex >= 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4 space-y-1">
                  <p>education = <span className="text-amber-400">"B.Tech CSE (AI/ML)"</span></p>
                  <p>focus = [<span className="text-amber-300">"NeuralNets"</span>, <span className="text-rose-300">"React"</span>, <span className="text-violet-300">"Quant"</span>]</p>
                </motion.div>
              )}
              {typedLineIndex >= 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4">
                  <p className="text-violet-400">def <span className="text-amber-400">compile_vision</span>(self):</p>
                  <div className="pl-4">
                    <p className="text-rose-400">return <span className="text-gray-300">"Scalable Web Meets Intelligent AI"</span></p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Simulated Live Analytics Graph Layer with oscillating SVG paths */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col space-y-3" style={{ transform: 'translateZ(40px)' }}>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>SIMULATOR: NIFTY_50_LIVE</span>
                <span className="text-amber-400 animate-pulse flex items-center space-x-1">
                  <Sparkles size={10} className="mr-1" /> CORE INDICATOR ACTIVE
                </span>
              </div>
              
              {/* Dynamic Oscillating SVG graph area */}
              <div className="h-24 bg-white/3 border border-white/5 rounded-lg relative overflow-hidden flex items-end px-2 pb-1">
                {/* Simulated Grid Lines */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="absolute inset-y-0 left-1/4 border-l border-white/5" />
                <div className="absolute inset-y-0 left-2/4 border-l border-white/5" />
                <div className="absolute inset-y-0 left-3/4 border-l border-white/5" />
                
                {/* Dynamic SVG with animated morph paths */}
                <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Dynamic Morphed SVG Areas */}
                  <motion.path 
                    animate={{
                      d: [
                        "M 0 80 Q 20 60 35 75 T 70 30 T 100 20 L 100 100 L 0 100 Z",
                        "M 0 85 Q 15 50 35 65 T 75 40 T 100 15 L 100 100 L 0 100 Z",
                        "M 0 75 Q 25 70 40 50 T 65 35 T 100 30 L 100 100 L 0 100 Z",
                        "M 0 80 Q 20 60 35 75 T 70 30 T 100 20 L 100 100 L 0 100 Z",
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    fill="url(#chartGrad)" 
                  />

                  {/* Top Line Stroke */}
                  <motion.path 
                    animate={{
                      d: [
                        "M 0 80 Q 20 60 35 75 T 70 30 T 100 20",
                        "M 0 85 Q 15 50 35 65 T 75 40 T 100 15",
                        "M 0 75 Q 25 70 40 50 T 65 35 T 100 30",
                        "M 0 80 Q 20 60 35 75 T 70 30 T 100 20",
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />

                  {/* Moving graph tracer circle */}
                  <motion.circle 
                    animate={{
                      cx: [100, 100, 100, 100],
                      cy: [20, 15, 30, 20]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    r="3.5" 
                    fill="#8b5cf6" 
                    className="shadow-glow-violet"
                  />
                </svg>

                <div className="absolute top-2 right-2 flex space-x-2 text-[8px] font-mono bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                  <span className="text-amber-400">ProfitFactor: 2.14</span>
                  <span className="text-gray-400">DD: 4.8%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

