'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = { sentence: string; consequence: string };

const TONES = ['blue', 'sage', 'amber', 'blush', 'blue'] as const;
const ON_AT_LOAD = [0, 2];

export function Features() {
  const t = useTranslations('features');
  const reduce = useReducedMotion();
  const items = t.raw('items') as Item[];
  const [on, setOn] = useState<number[]>(ON_AT_LOAD);

  const toggle = (i: number) =>
    setOn((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  return (
    <section id="espaces" aria-labelledby="espaces-titre" className="bg-[var(--paper)]">
      <h2 id="espaces-titre" className="sr-only">
        {t('toggle')}
      </h2>
      {items.map((item, i) => {
        const active = on.includes(i);
        const tone = TONES[i % TONES.length];
        return (
          <div
            key={item.sentence}
            className="band"
            data-on={active}
            style={{ '--band-on': `var(--${tone})`, '--band-ink': `var(--${tone}-ink)` } as React.CSSProperties}
          >
            <p className="band__text">
              {item.sentence}
              <span className="band__consequence">{item.consequence}</span>
            </p>
            <div className="band__switch">
              <button
                type="button"
                role="switch"
                aria-checked={active}
                aria-label={`${t('toggle')} : ${item.sentence}`}
                className="switch"
                data-ui
                onClick={() => toggle(i)}
              >
                <motion.span
                  layout={!reduce}
                  className="switch__knob"
                  transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.7 }}
                />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
