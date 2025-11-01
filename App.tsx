
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ExplorePage } from './components/ExplorePage';
import { CategoryPage } from './components/CategoryPage';
import { ArticlePage } from './components/ArticlePage';
import { SearchOverlay } from './components/SearchOverlay';
import { ExplorePortal } from './components/ExplorePortal';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { CursorTrail } from './components/CursorTrail';
import { CosmicAICore } from './components/CosmosAICore';
import { Article, getArticleById } from './components/data';

const LoadingScreen: React.FC = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
  >
    <div className="relative w-24 h-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-0 border-2 border-[#00ffff]/30 rounded-full"
      ></motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-2 border-2 border-[#00ffff]/50 rounded-full"
      ></motion.div>
      <div className="absolute inset-4 bg-[#00ffff]/10 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.5)]"></div>
    </div>
  </motion.div>
);

type Page = 'home' | 'explore' | 'category' | 'article';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<Page>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchArticleData = async () => {
        if (page === 'article' && activeArticleId) {
            const articleData = await getArticleById(activeArticleId);
            setActiveArticle(articleData || null);
        } else {
            setActiveArticle(null);
        }
    };
    fetchArticleData();
  }, [page, activeArticleId]);


  const navigateTo = (targetPage: Page, categoryId: string | null = null, articleId: string | null = null) => {
    window.scrollTo(0, 0);
    setPage(targetPage);
    setActiveCategory(categoryId);
    setActiveArticleId(articleId);
  };

  const handleSearchSelect = (categoryId: string, articleId: string) => {
    setIsSearchOpen(false);
    navigateTo('article', categoryId, articleId);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (page !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500); // Allow time for page transition
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="bg-[#0a0a0a] text-[#eafaff] font-inter overflow-x-hidden min-h-screen flex flex-col">
          <CursorGlow />
          <CursorTrail />
          <Header
            onNavigate={(page) => navigateTo(page)}
            onAboutClick={() => scrollToSection(aboutRef)}
            onVisionClick={() => scrollToSection(visionRef)}
            onSearchClick={() => setIsSearchOpen(true)}
          />
          <main className="flex-grow relative">
            <AnimatePresence mode="wait">
              {page === 'home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                  <HomePage refs={{ aboutRef, visionRef }} onEnterLibrary={() => navigateTo('explore')} />
                </motion.div>
              )}
              {page === 'explore' && (
                 <ExplorePage key="explore" onCategorySelect={(id) => navigateTo('category', id)} />
              )}
              {page === 'category' && activeCategory && (
                <CategoryPage 
                  key={activeCategory} 
                  categoryId={activeCategory} 
                  onBack={() => navigateTo('explore')} 
                  onSelectArticle={(articleId) => navigateTo('article', activeCategory, articleId)}
                />
              )}
              {page === 'article' && activeCategory && activeArticleId && (
                <ArticlePage
                  key={activeArticleId}
                  categoryId={activeCategory}
                  articleId={activeArticleId}
                  onBack={() => navigateTo('category', activeCategory)}
                  onNavigateToArticle={(catId, artId) => navigateTo('article', catId, artId)}
                />
              )}
            </AnimatePresence>
          </main>
          
          <AnimatePresence>
            {!activeCategory && <ExplorePortal onNavigate={(page, id) => navigateTo(page, id)} />}
          </AnimatePresence>

          <CosmicAICore activeArticle={activeArticle} />

          <SearchOverlay 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            onSelectArticle={handleSearchSelect}
          />
          
          {page !== 'article' && <Footer onNavigate={(page) => navigateTo(page)} onAboutClick={() => scrollToSection(aboutRef)}/>}
        </div>
      )}
    </>
  );
}