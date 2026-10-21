import { getTranslations } from 'next-intl/server';
import { Rise } from '@/components/rise';
import { TactileLink } from '@/components/tactile-link';
import { RELEASE } from '@/lib/release';

const FILES = ['Nexolume.exe', 'Writer.docx', 'Sheets.ossheet', 'Slides.osslides'];

export async function Cta() {
  const t = await getTranslations('cta');

  return (
    <section
      aria-labelledby="cta-titre"
      className="field field--night field--tall flex flex-col justify-center"
    >
      <div className="py-24">
        <h2 id="cta-titre" className="display">
          {t('title')}
        </h2>
        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="lead max-w-[34ch]">{t('text')}</p>
            <div className="mt-10">
              <TactileLink href={RELEASE.downloadUrl}>{t('button')}</TactileLink>
            </div>
          </div>
          <Rise offset={64} className="md:w-[24rem] md:justify-self-end">
            <ul
              data-ui
              aria-hidden="true"
              className="bg-[var(--paper)] p-4 text-[var(--paper-ink)]"
            >
              {FILES.map((name, i) => (
                <li
                  key={name}
                  className={`px-3 py-3 font-semibold ${i === 0 ? 'bg-[var(--amber)]' : ''}`}
                >
                  {name}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </div>
    </section>
  );
}
