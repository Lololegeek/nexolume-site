import { getTranslations } from 'next-intl/server';
import { Rise } from '@/components/rise';

export async function Limits() {
  const t = await getTranslations('limits');
  const items = t.raw('items') as string[];

  return (
    <section id="limites" aria-labelledby="limites-titre" className="field field--sage">
      <div className="grid gap-12 py-20 md:grid-cols-[5fr_7fr] md:gap-16 md:py-28">
        <div>
          <h2 id="limites-titre" className="head max-w-[10ch]">
            {t('title')}
          </h2>
          <Rise className="mt-12 max-w-[26rem]" offset={56}>
            <div data-ui className="aspect-video bg-[#fbfcfd] p-6 text-[#121a24]">
              <p className="text-3xl font-bold tracking-[-0.03em]" style={{ fontFamily: 'var(--font-display)' }}>
                Slides
              </p>
              <p className="mt-2 text-[15px]">F5</p>
              <div className="mt-6 h-2 w-2/3 bg-[var(--amber)]" />
              <div className="mt-2 h-2 w-1/2 bg-[var(--blue)]" />
            </div>
          </Rise>
        </div>
        <ul className="grid content-start gap-6">
          {items.map((item, i) => (
            <li key={item}>
              <Rise offset={24} delay={i * 0.04}>
                <p className="head max-w-[26ch] !text-[clamp(1.5rem,1rem+1.6vw,2.25rem)]">{item}</p>
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
