'use client';

import { motion, useReducedMotion } from 'motion/react';

export function HeroTitle({ title }: { title: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className="text-[clamp(4rem,10vw,10rem)]"
      initial={reduce ? false : { y: 56 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22 }}
    >
      {title}
    </motion.h1>
  );
}
