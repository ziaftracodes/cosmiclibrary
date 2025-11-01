
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ParticlesBackground = () => {
  const particles = Array.from({ length: 150 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  const parallaxX = useTransform(mouseX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1], [-20, 20]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="w-full h-full"
      >
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{
              x: (Math.random() - 0.5) * 50,
              y: (Math.random() - 0.5) * 50,
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
              opacity: {
                duration: Math.random() * 2 + 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

interface HeroSectionProps {
  onEnterClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10"></div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-20 flex flex-col items-center p-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-poppins text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.2em] uppercase text-glow"
        >
          Cosmic Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-4 md:mt-6 text-lg md:text-xl text-[#eafaff]/80 max-w-2xl"
        >
          Where Knowledge Becomes an Experience.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={onEnterClick}
          className="mt-12 px-10 py-4 bg-cyan-400/20 border border-cyan-400/50 text-cyan-300 rounded-full text-xl font-semibold hover:bg-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:text-white transition-all duration-300 flex items-center group"
        >
          Enter The Library
          <ArrowRight className="ml-3 h-6 w-6 transform group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};