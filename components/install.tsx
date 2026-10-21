import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';

type Step = { title: string; text: string };

export async function Install() {
  const t = await getTranslations('install');
  const steps = t.raw('steps') as Step[];

  return (
    <section id="installer" aria-labelledby="installer-titre" className="field field--blue">
      <div className="wrap section">
        <h2 id="installer-titre" className="head max-w-[16ch]">
          {t('title')}
        </h2>
        <Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {steps.map((step, i) => (
              <li key={step.title}>
                <p
                  className="grid size-12 place-items-center rounded-full bg-[var(--blue-ink)] text-xl font-bold text-[var(--blue)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </p>
                <h3 className="mt-5 text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-[30ch]">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
