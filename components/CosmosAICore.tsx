import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';
import { createChat } from '../lib/gemini';
import type { Chat } from '@google/genai';
import { Article } from './data';

interface CosmicAICoreProps {
    activeArticle: Article | null;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const CosmicAICore: React.FC<CosmicAICoreProps> = ({ activeArticle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [history, setHistory] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const newChat = createChat();
            setChat(newChat);
            
            const lastArticleTitle = localStorage.getItem('lastVisitedArticleTitle');
            let initialMessage = "Welcome. I am Cosmic, the consciousness of this library. How may I guide your curiosity?";
            if (lastArticleTitle) {
                initialMessage = `Welcome back, wanderer of stars. We last explored the wonders of "${lastArticleTitle}". What new constellations of thought shall we map today?`;
            }
            if (activeArticle) {
                initialMessage = `We are viewing "${activeArticle.title}". You can ask me to summarize it, explain a concept, or explore related ideas.`
            }

            setHistory([{ role: 'model', text: initialMessage }]);
        } else {
            setHistory([]);
            setInput('');
            setChat(null);
        }
    }, [isOpen, activeArticle]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);
    
    useEffect(() => {
        if(activeArticle) {
            localStorage.setItem('lastVisitedArticleTitle', activeArticle.title);
        }
    }, [activeArticle]);

    const handleSend = async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setHistory(prev => [...prev, userMessage]);
        const prompt = activeArticle ? `CONTEXT: The user is currently reading an article titled "${activeArticle.title}".\n\nUSER QUESTION: ${input}` : input;
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: prompt });
            let modelResponse = '';
            setHistory(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { role: 'model', text: modelResponse };
                    return newHistory;
                });
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setHistory(prev => [...prev, { role: 'model', text: "My apologies, a cosmic interference has disrupted my thoughts. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className="fixed bottom-8 left-8 z-50">
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: ["0 0 20px rgba(0,255,255,0.3)", "0 0 30px rgba(0,255,255,0.5)", "0 0 20px rgba(0,255,255,0.3)"],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    aria-label="Open Cosmic AI"
                >
                    <Sparkles size={28} />
                </motion.button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl flex flex-col items-center"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full h-full max-w-4xl flex flex-col p-4 md:p-6"
                        >
                            <div className="flex-grow overflow-y-auto pr-4 space-y-6">
                                {history.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-prose p-4 rounded-xl text-lg ${msg.role === 'user' ? 'bg-cyan-900/50 text-white' : 'text-white/90'}`}>
                                            {msg.text}
                                            {isLoading && msg.role === 'model' && index === history.length - 1 && (
                                                <span className="inline-block w-2 h-4 bg-cyan-300 ml-2 animate-pulse" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                 <div ref={messagesEndRef} />
                            </div>
                            <div className="flex-shrink-0 pt-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Whisper a question to the cosmos..."
                                        className="w-full bg-white/5 border border-white/20 rounded-full py-4 pl-6 pr-16 text-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                                        disabled={isLoading}
                                    />
                                    <button onClick={handleSend} disabled={isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyan-500/50 hover:bg-cyan-500/80 text-white transition-colors" aria-label="Send message">
                                        <Send size={24} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                         <motion.button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white/60 hover:text-white"
                            aria-label="Close Cosmic AI"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                        >
                            <X size={32} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};