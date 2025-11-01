
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { searchArticles, Article } from './data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (categoryId: string, articleId: string) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { delay: 0.1, duration: 0.3 }
  },
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const HighlightedText: React.FC<{text: string, highlight: string}> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-cyan-300 text-glow">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      searchArticles(debouncedQuery).then((res) => {
        setResults(res);
        setIsLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (!isOpen) {
        setQuery('');
        setResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-start pt-24 md:pt-32 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            variants={panelVariants}
            className="w-full max-w-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the cosmos..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                autoFocus
              />
            </div>

            <div className="mt-6 max-h-[60vh] overflow-y-auto">
              {isLoading && <p className="text-center text-white/50">Searching...</p>}
              {!isLoading && results.length > 0 && (
                <div className="space-y-2">
                  {results.map(article => (
                    <button 
                        key={article.id}
                        onClick={() => onSelectArticle(article.categoryId, article.id)}
                        className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        <HighlightedText text={article.title} highlight={debouncedQuery} />
                      </h3>
                      <p className="text-sm text-white/60">
                        <HighlightedText text={article.summary} highlight={debouncedQuery} />
                      </p>
                    </button>
                  ))}
                </div>
              )}
              {!isLoading && debouncedQuery && results.length === 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-white/50"
                  >
                    No constellations found for "{debouncedQuery}".
                  </motion.p>
              )}
            </div>
          </motion.div>

          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
            aria-label="Close search"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
          >
            <X size={32} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
