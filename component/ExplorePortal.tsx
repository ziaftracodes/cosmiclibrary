
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X } from 'lucide-react';
// FIX: Import getIcon to render the icon component, and categories which is now exported.
import { categories, getIcon } from './data';

interface ExplorePortalProps {
    onNavigate: (page: 'category', categoryId: string) => void;
}

const portalVariants = {
    closed: { scale: 0 },
    open: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

const itemVariants = {
    closed: { opacity: 0, scale: 0 },
    open: { opacity: 1, scale: 1 },
};
  
const menuVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};


export const ExplorePortal: React.FC<ExplorePortalProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const radius = 120; // px
  const angleStep = (2 * Math.PI) / categories.length;

  return (
    <div className="fixed bottom-8 right-8 z-40">
        <AnimatePresence>
        {isOpen && (
            <motion.div 
                className="absolute bottom-0 right-0"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
            >
            {categories.map((category, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                    <motion.button
                        key={category.id}
                        onClick={() => {
                            onNavigate('category', category.id);
                            setIsOpen(false);
                        }}
                        className={`absolute bottom-0 right-0 w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1f]/80 border border-white/10 card-glow text-cyan-400`}
                        style={{ originX: '2rem', originY: '2rem' }}
                        variants={itemVariants}
                        animate={{ x, y }}
                        whileHover={{ scale: 1.2, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                        title={category.name}
                    >
                        {/* FIX: Use getIcon to correctly render the icon from its name string. */}
                        {getIcon(category.icon)}
                    </motion.button>
                );
            })}
            </motion.div>
        )}
        </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
            >
                {isOpen ? <X size={32} /> : <Compass size={32} />}
            </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
