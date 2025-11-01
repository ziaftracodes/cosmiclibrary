
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  categoryId: string;
}

const ScienceSVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.circle 
      cx="50" cy="50" r="4" fill="#00ffff" 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.ellipse 
      cx="50" cy="50" rx="20" ry="40" stroke="#00ffff" strokeWidth="2"
      initial={{ rotate: 45 }}
      animate={{ rotate: 45 + 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    />
    <motion.ellipse 
      cx="50" cy="50" rx="20" ry="40" stroke="#00ffff" strokeWidth="2"
      initial={{ rotate: -45 }}
      animate={{ rotate: -45 - 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    />
    <motion.ellipse 
      cx="50" cy="50" rx="45" ry="15" stroke="#00ffff" strokeWidth="2"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    />
  </motion.svg>
);

const HistorySVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[25, 45, 65].map((x, i) => (
      <motion.path
        key={x}
        d={`M${x} 80 V20 H${x+10} V80 H${x} Z`}
        stroke="#ffca80"
        strokeWidth="3"
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
      />
    ))}
    <path d="M20 20 H80" stroke="#ffca80" strokeWidth="3" />
    <path d="M15 15 H85" stroke="#ffca80" strokeWidth="3" />
  </motion.svg>
);

const ArtSVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path 
      d="M50 10 C 20 20, 20 80, 50 90 S 80 80, 80 50 S 50 10, 50 10" 
      stroke="#f472b6" strokeWidth="3" strokeLinecap="round"
      animate={{ scale: [1, 1.03, 1], rotate: [0, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '50% 50%' }}
    />
    <motion.path 
      d="M50 10 Q 60 40 40 60 Q 20 80 50 90" 
      stroke="#f472b6" strokeWidth="2" strokeOpacity="0.7" 
      animate={{ pathLength: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const TechnologySVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path d="M20 50 H35 M65 50 H80 M50 20 V35 M50 65 V80" stroke="#64748b" strokeWidth="3" 
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect x="35" y="35" width="30" height="30" stroke="#64748b" strokeWidth="3" 
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    />
    {[ {cx:20,cy:50}, {cx:80,cy:50}, {cx:50,cy:20}, {cx:50,cy:80}].map((c, i) => (
      <motion.circle key={i} cx={c.cx} cy={c.cy} r="3" fill="#64748b" 
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
  </motion.svg>
);

const PhilosophySVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path d="M50 20 C 30 20 20 40 20 50 C 20 65 35 80 50 80 C 65 80 80 65 80 50 C 80 30 65 20 50 20" stroke="#34d399" strokeWidth="2" strokeOpacity="0.4"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    />
    <motion.path d="M50 25 C 60 30 65 40 65 50 C 65 60 60 70 50 75" stroke="#34d399" strokeWidth="2"/>
    <motion.path d="M50 25 C 40 30 35 40 35 50 C 35 60 40 70 50 75" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6"/>
    <motion.path d="M30 50 H 70" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6"/>
    <motion.circle cx="50" cy="50" r="5" fill="#34d399" 
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const SpaceSVG: React.FC = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path 
      d="M60 20 A 30 30 0 1 0 80 40 A 25 25 0 1 1 60 20 Z" 
      fill="#a78bfa" 
      animate={{ x: [0, 2, 0, -2, 0], y: [0, -1, 0, 1, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    {[ {cx:25,cy:25,r:5}, {cx:30,cy:70,r:3}, {cx:80,cy:80,r:4} ].map((c, i) => (
      <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#a78bfa"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
      />
    ))}
  </motion.svg>
);

const DefaultSVG: React.FC = () => (
    <motion.svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="transparent"/>
        <motion.circle cx="50" cy="50" r="20" stroke="#eafaff" strokeWidth="2" strokeDasharray="4 4" 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
    </motion.svg>
);

export const ArticleThumbnail: React.FC<Props> = ({ categoryId }) => {
  switch (categoryId) {
    case 'science': return <ScienceSVG />;
    case 'history': return <HistorySVG />;
    case 'art': return <ArtSVG />;
    case 'technology': return <TechnologySVG />;
    case 'philosophy': return <PhilosophySVG />;
    case 'space': return <SpaceSVG />;
    default: return <DefaultSVG />;
  }
};
