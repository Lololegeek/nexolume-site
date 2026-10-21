import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';
import { WriterMock } from '@/components/mockups';
import { RELEASE } from '@/lib/release';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section aria-labelledby="hero-titre" className="field field--night">
      <div className="wrap grid items-center gap-12 pt-10 pb-20 md:grid-cols-2 md:gap-16 md:pt-16 md:pb-28">
        <div>
          <h1 id="hero-titre" className="display max-w-[12ch]">
            {t('title')}
          </h1>
          <p className="lead mt-6 max-w-[34ch] text-[var(--night-soft)]">{t('lead')}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="btn" href={RELEASE.downloadUrl}>
              {t('cta')}
            </a>
            <a className="btn btn--ghost" href="#apps">
              {t('more')}
            </a>
          </div>
        </div>
        <Reveal>
          <WriterMock />
        </Reveal>
      </div>
    </section>
  );
}
