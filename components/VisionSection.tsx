
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.5rem" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const VisionSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // A subtle parallax effect: text moves up slightly as user scrolls down
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // The text scales up as it enters the center of the viewport
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={targetRef} className="min-h-screen flex items-center justify-center p-6 bg-black overflow-hidden">
      <motion.div style={{ y, scale }} className="container mx-auto text-center">
        <h2 className="font-poppins text-3xl md:text-5xl font-semibold leading-tight text-[#eafaff]/90 max-w-4xl mx-auto">
          <AnimatedText text="Every idea is a star. Every fact, a fragment of a universe." />
        </h2>
      </motion.div>
    </section>
  );
};
