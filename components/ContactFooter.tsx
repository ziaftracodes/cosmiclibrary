import React from 'react';
import { motion } from 'framer-motion';

export const ContactFooter: React.FC = () => {
    const handleContactClick = () => {
        // In a real application, this would open a mail client or a contact form.
        console.log("Contact button clicked. Email: contact@example.com");
        alert("To get in touch, please reach out to us at contact@example.com!");
    };

    return (
        <footer className="bg-black/30 py-12 px-6 mt-auto relative z-10">
            <div className="container mx-auto text-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent line-glow mb-8"></div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-glow mb-4">
                    Enjoying the Cosmic Library?
                </h3>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                    Want to own this website, or have a stunning, modern web experience like this built for you? Let's talk.
                </p>
                <motion.button
                    onClick={handleContactClick}
                    className="px-8 py-3 bg-cyan-400/20 border border-cyan-400/50 text-cyan-300 rounded-full font-semibold hover:bg-cyan-400/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Contact Us
                </motion.button>
            </div>
        </footer>
    );
};
