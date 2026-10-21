import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';

type Item = { title: string; text: string };

export async function Why() {
  const t = await getTranslations('why');
  const items = t.raw('items') as Item[];

  return (
    <section aria-labelledby="why-titre" className="field field--paper">
      <div className="wrap section">
        <h2 id="why-titre" className="head max-w-[16ch]">
          {t('title')}
        </h2>
        <Reveal>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {items.map((item) => (
              <li key={item.title}>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-[32ch]">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
