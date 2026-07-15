import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <div id="root-app" className="bg-[#05040a] text-gray-100 min-h-screen font-sans selection:bg-amber-500/30 selection:text-amber-100 relative">
      {/* Custom Particle Background */}
      <ParticleBackground />

      {/* Custom Cursor Follower Orb */}
      <CursorFollower />

      {/* Dynamic Navigation */}
      <Navbar />

      {/* Main Single-Screen / Single-Page Layout */}
      <main className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionContainerVariants}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionContainerVariants}
        >
          <About />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionContainerVariants}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionContainerVariants}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionContainerVariants}
        >
          <Contact />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
