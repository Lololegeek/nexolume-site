'use client';

import { motion, useReducedMotion } from 'motion/react';

type RiseProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  delay?: number;
};

// Content is visible from the first frame; only its position settles.
export function Rise({ children, className, offset = 48, delay = 0 }: RiseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 24, delay }}
    >
      {children}
    </motion.div>
  );
}
