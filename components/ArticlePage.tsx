import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Square, Loader, Wand2, RefreshCw } from 'lucide-react';
import { getArticleById, getArticlesByIds, getCategoryById, Article, Category, ArticleContentBlock } from './data';
import { ArticleContent } from './article/ArticleContent';
import { getAiClient } from '../lib/gemini';
import { decode, decodeAudioData } from '../lib/audio';
import { GoogleGenAI, Modality, GenerateContentResponse } from '@google/genai';
import { ArticleThumbnail } from './article/ArticleThumbnail';
import { ContactFooter } from './ContactFooter';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-400/80 origin-left z-[100]" style={{ scaleX }} />;
};

const AIToolkit: React.FC<{ onNarrate: () => void, isNarrating: boolean, isNarrationLoading: boolean, onToneChange: (tone: string) => void, isToneLoading: boolean, onReset: () => void }> = ({ onNarrate, isNarrating, isNarrationLoading, onToneChange, isToneLoading, onReset }) => {
    const tones = ['Default', 'Poetic', 'Scientific', 'Mythic'];
    const [selectedTone, setSelectedTone] = useState('Default');

    const handleSelectTone = (tone: string) => {
        setSelectedTone(tone);
        if (tone === 'Default') {
            onReset();
        } else {
            onToneChange(tone);
        }
    }

    return (
        <div className="max-w-4xl mx-auto my-12 p-4 rounded-xl bg-black/20 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-space-grotesk text-lg text-cyan-300">AI Toolkit</div>
                <div className="flex items-center gap-4">
                     <button onClick={onNarrate} disabled={isNarrationLoading || isNarrating} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 transition-colors disabled:opacity-50">
                        {isNarrationLoading ? <Loader className="animate-spin" size={20}/> : (isNarrating ? <Square size={20}/> : <Play size={20}/>)}
                        {isNarrationLoading ? 'Preparing...' : (isNarrating ? 'Stop' : 'Narrate')}
                    </button>
                    <div className="relative">
                        <select
                            value={selectedTone}
                            onChange={(e) => handleSelectTone(e.target.value)}
                            disabled={isToneLoading}
                            className="appearance-none bg-white/5 hover:bg-white/10 text-white/80 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            {tones.map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                        </select>
                         {isToneLoading ? <Loader className="animate-spin absolute right-3 top-1/2 -translate-y-1/2" size={16}/> : <Wand2 className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ArticlePageProps {
  categoryId: string;
  articleId: string;
  onBack: () => void;
  onNavigateToArticle: (categoryId: string, articleId: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ categoryId, articleId, onBack, onNavigateToArticle }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [displayContent, setDisplayContent] = useState<ArticleContentBlock[] | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  const [isNarrationLoading, setIsNarrationLoading] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isToneLoading, setIsToneLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0,0);
      setIsLoading(true);
      setIsOverlayVisible(true);
      stopNarration();
      
      const [fetchedArticle, fetchedCategory] = await Promise.all([
        getArticleById(articleId),
        getCategoryById(categoryId),
      ]);
      setArticle(fetchedArticle || null);
      setDisplayContent(fetchedArticle?.content || null);
      setCategory(fetchedCategory || null);

      if (fetchedArticle?.related) {
        const fetchedRelated = await getArticlesByIds(fetchedArticle.related);
        setRelatedArticles(fetchedRelated);
      } else {
        setRelatedArticles([]);
      }
      
      setIsLoading(false);
      const timer = setTimeout(() => setIsOverlayVisible(false), 2000);
      return () => clearTimeout(timer);
    };

    fetchData();
  }, [articleId, categoryId]);

  const getTextForAI = (content: ArticleContentBlock[] | null) => {
    if (!content) return '';
    return content.filter(block => block.type === 'paragraph' || block.type === 'quote').map(block => block.text).join('\n\n');
  };

  const handleNarration = async () => {
    if (isNarrating) {
        stopNarration();
        return;
    }
    const textToNarrate = getTextForAI(displayContent);
    if (!textToNarrate) return;

    setIsNarrationLoading(true);

    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Read the following article passage: ${textToNarrate}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                },
            },
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            await playAudio(base64Audio);
        }
    } catch (error) {
        console.error("Narration failed:", error);
    } finally {
        setIsNarrationLoading(false);
    }
  };

  const playAudio = async (base64: string) => {
    if (!audioContextRef.current) {
        // FIX: Add type assertion to handle vendor-prefixed webkitAudioContext for broader browser support.
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    
    const audioBuffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    
    source.onended = () => {
        setIsNarrating(false);
        audioSourceRef.current = null;
    };

    source.start();
    audioSourceRef.current = source;
    setIsNarrating(true);
  };
  
  const stopNarration = () => {
    if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
        audioSourceRef.current = null;
    }
    setIsNarrating(false);
  };


  const handleToneChange = async (tone: string) => {
    if (!article) return;
    setIsToneLoading(true);
    try {
        const ai = getAiClient();
        const prompt = `Rewrite the following article content in a ${tone.toLowerCase()} style. Maintain the core information but alter the tone and prose. Output ONLY the rewritten text, without any introductory phrases. \n\nORIGINAL:\n${getTextForAI(article.content)}`;
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const newText = response.text;
        setDisplayContent([{ type: 'paragraph', text: newText }]);
    } catch(e) {
        console.error("Failed to change tone", e);
        setDisplayContent([{ type: 'paragraph', text: "Apologies, a cosmic interference prevented the tone shift. Please try again." }]);
    } finally {
        setIsToneLoading(false);
    }
  };

  if (isLoading) {
      return <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black"></div>;
  }

  if (!article || !category) return <div className="min-h-screen flex items-center justify-center">Article not found.</div>;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black z-[101] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="font-space-grotesk text-4xl md:text-6xl font-bold text-glow uppercase tracking-widest text-center p-4"
            >
              {article.title}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={article.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: isOverlayVisible ? 2 : 0 }}
        className={`min-h-screen w-full relative bg-gradient-to-br from-[var(--theme-color-start)] to-[var(--theme-color-end)]`}
        style={{ '--theme-color-start': `${article.colorTheme}30`, '--theme-color-end': '#0a0a0a' } as React.CSSProperties}
      >
        <ScrollProgress />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <section className="h-screen flex flex-col items-center justify-center text-center p-6 relative z-10">
            <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y: 0}} transition={{duration: 1, delay: 0.5}}>
                <p className="font-poppins text-cyan-400 font-semibold uppercase tracking-widest">{category.name}</p>
                <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold text-glow uppercase tracking-widest my-4">{article.title}</h1>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">{article.summary}</p>
            </motion.div>
        </section>
        
        <div ref={contentRef} className="relative z-10 bg-[#0a0a0a]/50 backdrop-blur-sm">
          <AIToolkit
            onNarrate={handleNarration}
            isNarrating={isNarrating}
            isNarrationLoading={isNarrationLoading}
            onToneChange={handleToneChange}
            isToneLoading={isToneLoading}
            onReset={() => setDisplayContent(article.content)}
          />
          {displayContent && <ArticleContent content={displayContent} accentColor={article.colorTheme} categoryId={article.categoryId} />}
        </div>

        {relatedArticles.length > 0 && (
          <div className="relative z-10 bg-[#0a0a0a] py-20">
            <h2 className="font-poppins text-3xl font-bold text-center mb-12 text-glow">Related Articles</h2>
            <div className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide">
              {relatedArticles.map(related => (
                <motion.div
                  key={related.id}
                  onClick={() => onNavigateToArticle(related.categoryId, related.id)}
                  className="flex-shrink-0 w-72 cursor-pointer group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-left h-full card-glow flex flex-col">
                    <div className="w-full h-32 rounded-md mb-4 bg-black/20 flex items-center justify-center">
                      <ArticleThumbnail categoryId={related.categoryId} />
                    </div>
                    <h4 className="font-poppins text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{related.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{related.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <ContactFooter />

        <motion.button
            onClick={onBack}
            className="fixed top-20 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all card-glow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            aria-label="Back to category"
        >
            <ArrowLeft size={16} />
            {category.name}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};