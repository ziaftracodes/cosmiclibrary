
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AboutIllustration } from './AboutIllustration';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const AboutSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={targetRef} className="min-h-screen py-20 px-6 md:px-12 flex items-center justify-center bg-[#1a1a1f]/30 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div style={{ y: textY }} variants={itemVariants} className="text-center lg:text-left">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-glow">An Encyclopedia Reimagined.</h2>
          <p className="text-lg text-[#eafaff]/80 leading-relaxed">
            Cosmic Library is not a regular encyclopedia. It’s a cinematic reading platform, where every page feels like entering a new world of ideas. We turn facts into immersive experiences, blending calm motion, depth, and a sense of wonder.
          </p>
          <p className="mt-4 text-lg text-[#eafaff]/80 leading-relaxed">
            Our mission is to make learning feel like exploring a celestial archive of human knowledge, designed for the cinematic age.
          </p>
        </motion.div>
        
        <motion.div style={{ y: illustrationY }} variants={itemVariants} className="flex justify-center items-center">
            <AboutIllustration />
        </motion.div>
      </motion.div>
    </section>
  );
};
