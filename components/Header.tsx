import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'explore') => void;
  onAboutClick: () => void;
  onVisionClick: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onAboutClick, onVisionClick, onSearchClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-sm shadow-lg shadow-cyan-500/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="font-space-grotesk text-xl font-bold tracking-widest text-glow uppercase hover:opacity-80 transition-opacity">
          Cosmic Library
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00ffff] transition-colors duration-300">Home</button>
          <button onClick={() => onNavigate('explore')} className="hover:text-[#00ffff] transition-colors duration-300">Explore</button>
          <button onClick={onAboutClick} className="hover:text-[#00ffff] transition-colors duration-300">About</button>
          <button onClick={onVisionClick} className="hover:text-[#00ffff] transition-colors duration-300">Vision</button>
          <button onClick={onSearchClick} className="hover:text-[#00ffff] transition-colors duration-300" aria-label="Open search">
            <Search size={20} />
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={onSearchClick} className="hover:text-[#00ffff] transition-colors duration-300" aria-label="Open search">
            <Search size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  );
};