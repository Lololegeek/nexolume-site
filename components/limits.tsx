import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';

export async function Limits() {
  const t = await getTranslations('limits');
  const items = t.raw('items') as string[];

  return (
    <section id="limites" aria-labelledby="limites-titre" className="field field--paper">
      <div className="wrap section grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div>
          <h2 id="limites-titre" className="head max-w-[14ch]">
            {t('title')}
          </h2>
          <p className="lead mt-4 max-w-[26ch]">{t('lead')}</p>
        </div>
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="bg-white p-5">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
