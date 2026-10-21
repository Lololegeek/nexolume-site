'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Row = { ext: string; space: string; text: string };
type ZoneState = 'idle' | 'near' | 'over';

const MAGNET_DISTANCE = 180;
const MAX_OFFSET = 10;
const SPRING = { damping: 24, mass: 0.65, stiffness: 280 };
const ACCEPT = '.docx,.odt,.oswriter,.ossheet,.osslides';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

const extOf = (name: string) => {
  const dot = name.lastIndexOf('.');
  return dot < 0 ? '' : name.slice(dot).toLowerCase();
};

type DropZoneProps = {
  onFile: (file: File) => void;
  labels: Record<ZoneState | 'browse', string>;
};

// The zone leans toward a file dragged near it, then opens up when the file is over it.
function DropZone({ onFile, labels }: DropZoneProps) {
  const ref = useRef<HTMLLabelElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState<ZoneState>('idle');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const scale = useSpring(1, SPRING);
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) scale(${scale})`;

  useEffect(() => {
    const reset = () => {
      setState('idle');
      x.set(0);
      y.set(0);
      scale.set(1);
    };
    const onOver = (e: DragEvent) => {
      const el = ref.current;
      if (!el) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const ex = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const ey = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      const distance = Math.hypot(ex, ey);
      if (distance === 0) {
        setState('over');
        x.set(0);
        y.set(0);
        scale.set(reduce ? 1 : 1.02);
        return;
      }
      if (distance > MAGNET_DISTANCE) return reset();
      setState('near');
      const pull = (1 - distance / MAGNET_DISTANCE) * MAX_OFFSET;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      x.set(reduce ? 0 : (dx / len) * pull);
      y.set(reduce ? 0 : (dy / len) * pull);
      scale.set(1);
    };
    const onLeave = (e: DragEvent) => {
      if (e.relatedTarget === null) reset();
    };
    const onDrop = (e: DragEvent) => {
      // A file dropped beside the zone must not navigate the tab away.
      e.preventDefault();
      reset();
    };
    window.addEventListener('dragover', onOver);
    window.addEventListener('dragleave', onLeave);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragover', onOver);
      window.removeEventListener('dragleave', onLeave);
      window.removeEventListener('drop', onDrop);
    };
  }, [x, y, scale, reduce]);

  return (
    <motion.label
      ref={ref}
      className="dropzone"
      data-state={state}
      style={{ transform }}
      onDrop={(e) => {
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
      }}
    >
      <input
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = '';
        }}
      />
      <span className="head">{labels[state]}</span>
      <span className="lead mt-4">{labels.browse}</span>
    </motion.label>
  );
}

export function Open() {
  const t = useTranslations('open');
  const rows = t.raw('rows') as Row[];
  const [active, setActive] = useState(0);
  const [file, setFile] = useState<{ name: string; size: number; row: Row } | null>(null);
  const [unsupported, setUnsupported] = useState<string | null>(null);

  const handle = (f: File) => {
    const index = rows.findIndex((r) => r.ext === extOf(f.name));
    if (index < 0) {
      setFile(null);
      setUnsupported(f.name);
      return;
    }
    setUnsupported(null);
    setActive(index);
    setFile({ name: f.name, size: f.size, row: rows[index] });
  };

  return (
    <section id="ouvrir" aria-labelledby="ouvrir-titre" className="field field--blush">
      <div className="grid gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h2 id="ouvrir-titre" className="head max-w-[14ch]">
            {t('title')}
          </h2>
          <p className="lead mt-6 max-w-[30ch]">{t('lead')}</p>
          <div className="mt-10">
            <DropZone
              onFile={handle}
              labels={{
                idle: t('drop.idle'),
                near: t('drop.near'),
                over: t('drop.over'),
                browse: t('drop.browse'),
              }}
            />
          </div>
          <div aria-live="polite" className="mt-6 min-h-16">
            {file ? (
              <p className="lead">
                <strong className="font-semibold">{file.name}</strong> ({formatBytes(file.size)}) :{' '}
                {t('drop.ready')}. {t('drop.opensIn')} {file.row.space}.
              </p>
            ) : null}
            {unsupported ? (
              <p className="lead font-semibold">
                {unsupported} {t('drop.unsupported')}
              </p>
            ) : null}
          </div>
        </div>
        <div>
          <ul className="index-list">
            {rows.map((row, i) => (
              <li key={row.ext}>
                <button
                  type="button"
                  className="index-row"
                  data-active={active === i}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {row.ext}
                </button>
              </li>
            ))}
          </ul>
          <motion.p
            key={active}
            data-ui
            className="lead mt-8 max-w-[34ch] bg-[#fbfcfd] p-5 text-[#121a24]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-semibold">{rows[active].space}.</span> {rows[active].text}
          </motion.p>
          <p className="mt-6 max-w-[40ch]">{t('caveat')}</p>
        </div>
      </div>
    </section>
  );
}
