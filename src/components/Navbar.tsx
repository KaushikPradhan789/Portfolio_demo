import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Top progress bar tracker
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
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

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        id="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#05040a]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo with magnetic hover effect */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('hero');
            }}
            className="flex items-center space-x-2 group"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-glow-amber"
            >
              KP
            </motion.div>
            <span className="font-display font-bold text-lg tracking-wide text-white">
              Kaushik<motion.span 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-amber-400"
              >.</motion.span>Pradhan
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`font-sans font-medium text-sm transition-colors duration-200 relative py-1 ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-amber-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-violet-500 rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Icons / Button with Micro-Motion bounces */}
            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <motion.a
                whileHover={{ y: -2, scale: 1.1, color: '#fbbf24' }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </motion.a>
              
              <motion.a
                whileHover={{ y: -2, scale: 1.1, color: '#a78bfa' }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-violet-500/10 hover:from-amber-500/20 hover:to-violet-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 font-sans font-medium text-xs rounded-lg transition-all duration-300"
              >
                Let's Connect
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer with Staggered children transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#05040a]/95 backdrop-blur-lg border-b border-white/10 md:hidden overflow-hidden"
          >
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="px-6 py-6 flex flex-col space-y-4"
            >
              {navItems.map((item) => (
                <motion.a
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: -20, opacity: 0 }
                  }}
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`font-sans font-semibold text-base py-2 border-b border-white/5 transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-amber-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div 
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 15, opacity: 0 }
                }}
                className="flex items-center justify-between pt-4"
              >
                <div className="flex space-x-4">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-violet-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-violet-500 text-white font-sans font-medium text-xs rounded-lg shadow-glow-amber"
                >
                  Hire Me
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
