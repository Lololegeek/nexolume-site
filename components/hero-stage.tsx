'use client';

import { useId, useState } from 'react';

type Stage = { key: 'writer' | 'sheets' | 'slides'; field: 'blue' | 'sage' | 'amber'; name: string; mock: React.ReactNode };

type HeroStageProps = {
  stages: Stage[];
  label: string;
  children: React.ReactNode;
};

// The whole hero takes the colour of the chosen app; tabs follow the WAI-ARIA tabs pattern.
export function HeroStage({ stages, label, children }: HeroStageProps) {
  const id = useId();
  const [active, setActive] = useState(0);
  const current = stages[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const move = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!move) return;
    e.preventDefault();
    const next = (i + move + stages.length) % stages.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section aria-labelledby="hero-titre" className={`field field--${current.field} hero`}>
      <div className="wrap grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[6fr_5fr] md:gap-16 md:pb-28 md:pt-16">
        <div>{children}</div>
        <div>
          <div role="tablist" aria-label={label} className="mb-5 flex flex-wrap gap-2">
            {stages.map((s, i) => (
              <button
                key={s.key}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`${id}-panel`}
                tabIndex={active === i ? 0 : -1}
                className="tab"
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="lg:-rotate-[1.5deg]">
            {current.mock}
          </div>
        </div>
      </div>
    </section>
  );
}
