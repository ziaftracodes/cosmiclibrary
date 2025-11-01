import React from 'react';
import { motion } from 'framer-motion';

export const AboutIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md h-80 flex items-center justify-center">
      <svg viewBox="0 0 400 320" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <motion.linearGradient
            id="grad1"
            gradientTransform="rotate(45)"
            initial={{ x1: "0%", y1: "0%", x2: "100%", y2: "100%" }}
            animate={{ x1: ["0%", "100%"], y1: ["0%", "100%"], x2: ["100%", "0%"], y2: ["100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#6a00ff" />
          </motion.linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Orbits */}
        <motion.ellipse
          cx="200" cy="160" rx="180" ry="100"
          stroke="url(#grad1)" strokeWidth="1" strokeOpacity="0.3"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.ellipse
          cx="200" cy="160" rx="120" ry="60"
          stroke="url(#grad1)" strokeWidth="1" strokeOpacity="0.4"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.ellipse
          cx="200" cy="160" rx="60" ry="30"
          stroke="url(#grad1)" strokeWidth="1" strokeOpacity="0.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Central shape - book/portal */}
        <motion.path
          d="M 150 120 L 250 120 L 260 200 L 140 200 Z"
          stroke="url(#grad1)" strokeWidth="2"
          fill="rgba(10, 10, 10, 0.5)"
          filter="url(#glow)"
          initial={{ scale: 0.95, y: 5 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <line x1="200" y1="120" x2="200" y2="200" stroke="url(#grad1)" strokeWidth="1" />
      </svg>
    </div>
  );
};
