
import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { VisionSection } from './VisionSection';
import { ContactFooter } from './ContactFooter';

interface HomePageProps {
  refs: {
    aboutRef: React.RefObject<HTMLDivElement>;
    visionRef: React.RefObject<HTMLDivElement>;
  };
  onEnterLibrary: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ refs, onEnterLibrary }) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
      <HeroSection onEnterClick={onEnterLibrary} />
      <div ref={refs.aboutRef}>
        <AboutSection />
      </div>
      <div ref={refs.visionRef}>
        <VisionSection />
      </div>
      <ContactFooter />
    </motion.div>
  );
};