import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Absolute mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for active cursor elements (tight and highly responsive)
  const cursorSpringConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, cursorSpringConfig);
  const cursorY = useSpring(mouseY, cursorSpringConfig);

  // Spring configuration for the glowing trail (heavier damping for beautiful fluid inertia)
  const trailSpringConfig = { damping: 40, stiffness: 100, mass: 0.8 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    // Check if the system is a touch device to disable custom cursor safely
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);
    
    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    touchQuery.addEventListener('change', handleTouchChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track cursor events on window/document scope
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Global listener to detect hovers over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.closest('.cursor-pointer') !== null ||
        target.classList.contains('cursor-pointer');
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      touchQuery.removeEventListener('change', handleTouchChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Safeguard against touchscreens or before mouse has moved
  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Lagging Glowing Orb / Aura Trail */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 -mt-20 -ml-20 rounded-full pointer-events-none z-[9999] mix-blend-screen opacity-15 filter blur-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-500"
        style={{
          x: trailX,
          y: trailY,
          scale: isHovered ? 1.6 : 1,
        }}
        animate={{
          rotate: isHovered ? 180 : 0,
        }}
        transition={{
          rotate: { duration: 1.5, ease: "easeOut" }
        }}
      />

      {/* Cursor Follower Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -mt-4.5 -ml-4.5 rounded-full border pointer-events-none z-[9999] flex items-center justify-center shadow-glow-amber"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.6)' : 'rgba(245, 158, 11, 0.4)',
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.08)' : 'rgba(0,0,0,0)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 }
        }}
      />

      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -mt-1 -ml-1 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#f59e0b' : '#8b5cf6',
          boxShadow: isHovered 
            ? '0 0 10px rgba(245, 158, 11, 0.8)' 
            : '0 0 10px rgba(139, 92, 246, 0.8)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          backgroundColor: { duration: 0.2 }
        }}
      />
    </>
  );
}
