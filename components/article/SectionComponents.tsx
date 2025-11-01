
import React from 'react';
import { motion } from 'framer-motion';
import { ArticleThumbnail } from './ArticleThumbnail';

export const ParagraphSection: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-lg text-white/80 leading-loose max-w-4xl mx-auto">
    {text}
  </p>
);

export const ImageSection: React.FC<{ src: string, caption?: string, categoryId: string }> = ({ src, caption, categoryId }) => (
  <div className="max-w-5xl mx-auto flex flex-col items-center">
    <motion.div 
        className="rounded-lg overflow-hidden shadow-2xl shadow-black/30 w-full aspect-video bg-black/20 flex items-center justify-center"
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="w-1/2 h-1/2">
        <ArticleThumbnail categoryId={categoryId} />
      </div>
    </motion.div>
    {caption && <p className="text-center text-sm text-white/60 mt-4 italic">{caption}</p>}
  </div>
);

export const QuoteSection: React.FC<{ text: string, author?: string, accentColor: string }> = ({ text, author, accentColor }) => (
  <div className="max-w-4xl mx-auto text-center py-12 border-y-2" style={{ borderColor: `${accentColor}33`}}>
    <blockquote className="font-space-grotesk text-3xl md:text-4xl font-bold text-white leading-tight">
      “{text}”
    </blockquote>
    {author && 
      <cite className="block font-poppins text-lg text-white/60 mt-6 not-italic">
        — {author}
      </cite>
    }
  </div>
);