
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[999] w-8 h-8 rounded-full hidden md:block"
            style={{
                background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 60%)',
            }}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, restDelta: 0.001 }}
        />
    );
};
