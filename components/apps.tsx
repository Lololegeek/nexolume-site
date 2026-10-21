import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';
import { SheetsMock, SlidesMock, WriterMock } from '@/components/mockups';

const APPS = [
  { key: 'writer', field: 'blue', Mock: WriterMock },
  { key: 'sheets', field: 'sage', Mock: SheetsMock },
  { key: 'slides', field: 'amber', Mock: SlidesMock },
] as const;

export async function Apps() {
  const t = await getTranslations('apps');

  return (
    <>
      {APPS.map(({ key, field, Mock }, i) => {
        const points = t.raw(`${key}.points`) as string[];
        return (
          <section
            key={key}
            id={i === 0 ? 'apps' : undefined}
            aria-labelledby={`${key}-titre`}
            className={`field field--${field}`}
          >
            <div className="wrap section grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className={i % 2 ? 'md:order-2' : ''}>
                <h2 id={`${key}-titre`} className="head">
                  {t(`${key}.name`)}
                </h2>
                <p className="lead mt-4 max-w-[28ch]">{t(`${key}.tagline`)}</p>
                <ul className="mt-8 grid max-w-[40ch] gap-3">
                  {points.map((p) => (
                    <li key={p} className="before:mr-3 before:content-['—']">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Reveal>
                <Mock />
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
