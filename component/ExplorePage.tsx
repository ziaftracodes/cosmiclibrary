
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCategories, getIcon, Category } from './data';

interface ExplorePageProps {
  onCategorySelect: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const ShimmerCard: React.FC = () => (
  <div className="relative p-8 aspect-[4/3] rounded-2xl bg-[#1a1a1f]/50 border border-white/10">
    <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-4"></div>
    <div className="h-7 w-1/2 bg-white/5 rounded-md mx-auto"></div>
  </div>
);

export const ExplorePage: React.FC<ExplorePageProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 md:px-12 min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-space-grotesk text-4xl md:text-5xl font-bold mb-12 text-glow uppercase tracking-wider"
        >
          Explore The Universe
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ShimmerCard />
              </motion.div>
            ))
          ) : (
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                layoutId={`category-container-${category.id}`}
                onClick={() => onCategorySelect(category.id)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.3 } }}
                  className="relative p-8 aspect-[4/3] rounded-2xl bg-[#1a1a1f]/50 border border-white/10 flex flex-col justify-center items-center text-center cursor-pointer card-glow transition-all duration-300"
                >
                  <div className="text-[#00ffff] mb-4 transition-transform duration-300 group-hover:scale-110">{getIcon(category.icon)}</div>
                  <h3 className="font-poppins text-2xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-white/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12">
                      {category.description}
                  </p>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};
