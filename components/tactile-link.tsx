'use client';

import { motion, useReducedMotion } from 'motion/react';

type TactileLinkProps = {
  href: string;
  children: React.ReactNode;
};

// The face sinks onto its darker base on press; the spring settles without bounce.
export function TactileLink({ href, children }: TactileLinkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.a href={href} className="btn" whileTap={reduce ? undefined : 'pressed'} initial="rest">
      <span className="btn__base" aria-hidden="true" />
      <motion.span
        className="btn__face"
        variants={{ rest: { y: 0 }, pressed: { y: 4 } }}
        transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.6 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
