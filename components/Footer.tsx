import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'explore') => void;
  onAboutClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onAboutClick }) => {
  return (
    <footer className="bg-[#0a0a0a] text-[#eafaff]/60 py-8 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent line-glow mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Cosmic Library. All Rights Reserved.</p>
          <div className="flex space-x-6 text-sm">
            <button onClick={onAboutClick} className="hover:text-[#00ffff] transition-colors">About</button>
            <button onClick={() => onNavigate('explore')} className="hover:text-[#00ffff] transition-colors">Explore</button>
            <a href="#" className="hover:text-[#00ffff] transition-colors">Credits</a>
            <a href="#" className="hover:text-[#00ffff] transition-colors">Phase Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};