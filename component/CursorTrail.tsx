
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
  id: string;
  x: number;
  y: number;
}

const MAX_TRAIL_POINTS = 20;

export const CursorTrail: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setPoints(prevPoints => {
      const newPoints = [
        ...prevPoints,
        { id: `${Date.now()}-${Math.random()}`, x: clientX, y: clientY }
      ];
      // Limit the number of points in the trail
      return newPoints.slice(-MAX_TRAIL_POINTS);
    });
  }, []);

  // Throttle the mouse move handler for performance
  useEffect(() => {
    let lastCall = 0;
    const throttleDelay = 25; // ~40fps

    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall < throttleDelay) return;
      lastCall = now;
      handleMouseMove(e);
    };

    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] hidden md:block">
      <AnimatePresence>
        {points.map((point) => (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              style={{
                top: point.y - 3,
                left: point.x - 3,
                width: 6,
                height: 6,
                background: 'radial-gradient(circle, rgba(0,255,255,0.7) 0%, rgba(0,255,255,0) 60%)',
              }}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        ))}
      </AnimatePresence>
    </div>
  );
};