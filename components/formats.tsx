import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';

type Row = { ext: string; space: string; text: string };

export async function Formats() {
  const t = await getTranslations('formats');
  const rows = t.raw('items') as Row[];

  return (
    <section id="formats" aria-labelledby="formats-titre" className="field field--blush">
      <div className="wrap section grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div>
          <h2 id="formats-titre" className="head max-w-[14ch]">
            {t('title')}
          </h2>
          <p className="lead mt-4 max-w-[26ch]">{t('lead')}</p>
          <p className="mt-8 max-w-[38ch]">{t('caveat')}</p>
        </div>
        <Reveal>
          <ul>
            {rows.map((row) => (
              <li
                key={row.ext}
                className="grid gap-1 border-t-2 border-current py-5 sm:grid-cols-[16rem_1fr] sm:items-center sm:gap-6"
              >
                <p className="text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-none font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {row.ext}
                </p>
                <p>
                  <span className="font-semibold">{row.space}.</span> {row.text}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
