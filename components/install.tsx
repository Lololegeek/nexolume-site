'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

type Step = { order: string; duration: string; clause: string };

const SEGMENTS = [
  { grow: 6, tone: 'night', ink: 'night-ink' },
  { grow: 3, tone: 'paper', ink: 'paper-ink' },
  { grow: 1.4, tone: 'blue', ink: 'blue-ink' },
] as const;

export function Install() {
  const t = useTranslations('install');
  const reduce = useReducedMotion();
  const steps = t.raw('steps') as Step[];

  return (
    <section id="installer" aria-labelledby="installer-titre" className="field field--amber">
      <div className="py-20 md:py-28">
        <h2 id="installer-titre" className="head max-w-[16ch]">
          {t('title')}
        </h2>
        <ol className="bar mt-14">
          {steps.map((step, i) => {
            const seg = SEGMENTS[i];
            return (
              <li
                key={step.order}
                className="bar__seg relative overflow-hidden"
                style={{
                  flexGrow: seg.grow,
                  flexBasis: 0,
                  background: `var(--${seg.tone})`,
                  color: `var(--${seg.ink})`,
                }}
              >
                {/* The amber curtain slides off to the right once the bar is in view. */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-right"
                  style={{ background: 'var(--amber)' }}
                  initial={reduce ? { scaleX: 0 } : { scaleX: 0.6 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 90, damping: 22, delay: i * 0.12 }}
                />
                <span className="sr-only">{step.order} : </span>
                <span className="relative block">{step.duration}</span>
                <p
                  className="bar__clause relative font-normal"
                  style={{ fontFamily: 'var(--font-body)', letterSpacing: 0 }}
                >
                  {step.clause}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
