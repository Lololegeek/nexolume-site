'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { TactileLink } from '@/components/tactile-link';
import { RELEASE } from '@/lib/release';

const FOLDERS = [
  { key: 'spaces', href: '#espaces', tone: 'paper' },
  { key: 'preview', href: '#apercu', tone: 'blue' },
  { key: 'open', href: '#ouvrir', tone: 'blush' },
  { key: 'limits', href: '#limites', tone: 'sage' },
  { key: 'install', href: '#installer', tone: 'amber' },
] as const;

const STEP = 60;
const TAB = 40;
const BODY = 220;

export function HeroFolders() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();
  const height = TAB + STEP * (FOLDERS.length - 1) + BODY;

  return (
    <nav aria-label={t('title')} className="relative -mx-[var(--gutter)] mt-auto" style={{ height }}>
      {FOLDERS.map((folder, i) => {
        const last = i === FOLDERS.length - 1;
        return (
          <motion.div
            key={folder.key}
            className={`folder field--${folder.tone}`}
            style={{ top: TAB + i * STEP, zIndex: i + 1, height: height - TAB - i * STEP }}
            initial={reduce ? false : { y: 220 + i * 40 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.1 + i * 0.07 }}
          >
            <a
              href={folder.href}
              className="folder__tab"
              style={{ left: `calc(${i} * 11% + 24px)` }}
            >
              {t(`folders.${folder.key}`)}
            </a>
            {last ? (
              <div className="flex h-full items-start justify-end p-6 md:p-10">
                <TactileLink href={RELEASE.downloadUrl}>{t('cta')}</TactileLink>
              </div>
            ) : null}
          </motion.div>
        );
      })}
    </nav>
  );
}
