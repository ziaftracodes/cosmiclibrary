
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getCategoryById, getArticlesByCategory, getIcon, Category, Article } from './data';
import { ArticleThumbnail } from './article/ArticleThumbnail';

interface CategoryPageProps {
  categoryId: string;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
}

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onBack, onSelectArticle }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedCategory, fetchedArticles] = await Promise.all([
        getCategoryById(categoryId),
        getArticlesByCategory(categoryId),
      ]);
      setCategory(fetchedCategory || null);
      setArticles(fetchedArticles);
      setIsLoading(false);
    }
    fetchData();
  }, [categoryId]);

  const sortedArticles = useMemo(() => {
    let sorted = [...articles];
    if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popular') {
        sorted.sort((a, b) => b.views - a.views);
    }
    return sorted;
  }, [articles, sortBy]);

  if (isLoading || !category) {
    // Basic loading state, could be replaced with shimmer
    return <div className="min-h-screen w-full flex items-center justify-center bg-black"></div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen w-full flex flex-col items-center p-6 md:p-12 relative overflow-hidden bg-gradient-to-br ${category.gradient}`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-20 text-white/70 hover:text-white transition-colors flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <ArrowLeft size={20} />
        Back to Explore
      </motion.button>

      <motion.div variants={contentVariants} initial="hidden" animate="visible" className="relative z-10 text-center w-full max-w-6xl mt-24">
        <motion.div variants={itemVariants} className="text-[#00ffff] mx-auto mb-4">{React.cloneElement(getIcon(category.icon), { size: 60 })}</motion.div>
        <motion.h1 variants={itemVariants} className="font-space-grotesk text-5xl md:text-7xl font-bold text-glow uppercase tracking-widest">{category.name}</motion.h1>
        <motion.p variants={itemVariants} className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{category.description}</motion.p>
        
        <motion.div variants={itemVariants} className="mt-12">
            <div className="flex justify-center items-center gap-4 mb-8">
                <SortButton label="Default" active={sortBy === 'default'} onClick={() => setSortBy('default')} />
                <SortButton label="Newest" active={sortBy === 'newest'} onClick={() => setSortBy('newest')} />
                <SortButton label="Most Read" active={sortBy === 'popular'} onClick={() => setSortBy('popular')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                 {sortedArticles.map(article => (
                    <motion.div
                        key={article.id}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                        onClick={() => onSelectArticle(article.id)}
                        className="cursor-pointer h-full rounded-xl bg-white/5 border border-white/10 text-left flex flex-col justify-between card-glow overflow-hidden"
                    >
                        <div className="w-full h-40 bg-black/20 flex items-center justify-center">
                          <ArticleThumbnail categoryId={article.categoryId} />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div>
                              <h4 className="font-poppins text-xl font-semibold mb-2">{article.title}</h4>
                              <p className="text-white/60 text-sm leading-relaxed flex-grow">{article.summary}</p>
                          </div>
                          <span className="text-cyan-400 mt-4 text-sm font-semibold self-start">Read More &rarr;</span>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                {articles.length === 0 && (
                    <motion.div variants={itemVariants} className="md:col-span-3 text-white/50 text-center py-12">
                        <p>Articles for this category are being written by our cosmic scribes. Check back soon!</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const SortButton: React.FC<{label: string, active: boolean, onClick: () => void}> = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm rounded-full transition-colors ${active ? 'bg-cyan-400/20 text-cyan-300' : 'text-white/60 hover:bg-white/10'}`}>
        {label}
    </button>
)
