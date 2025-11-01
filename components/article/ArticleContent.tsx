
import React from 'react';
import { motion } from 'framer-motion';
import { ParagraphSection, ImageSection, QuoteSection } from './SectionComponents';
import { ArticleContentBlock } from '../data';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.6, 0.01, 0.05, 0.95] }
  }
};

const renderSection = (section: ArticleContentBlock, accentColor: string, categoryId: string) => {
    switch (section.type) {
        case 'paragraph': 
            return <ParagraphSection text={section.text || ''} />;
        case 'image': 
            return <ImageSection src={section.src || ''} caption={section.caption} categoryId={categoryId} />;
        case 'quote': 
            return <QuoteSection text={section.text || ''} author={section.author} accentColor={accentColor} />;
        default: 
            return null;
    }
};

export const ArticleContent: React.FC<{ content: ArticleContentBlock[], accentColor: string, categoryId: string }> = ({ content, accentColor, categoryId }) => {
    return (
        <div className="container mx-auto px-6 py-20 md:py-32 space-y-24 md:space-y-32">
            {content.map((section, index) => (
                <motion.div
                    key={index}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    {renderSection(section, accentColor, categoryId)}
                </motion.div>
            ))}
        </div>
    );
};