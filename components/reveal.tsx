'use client';

import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

// Content is visible from the first frame; only its position settles.
export function Reveal({ children, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
