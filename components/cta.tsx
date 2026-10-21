import { getTranslations } from 'next-intl/server';
import { RELEASE } from '@/lib/release';

export async function Cta() {
  const t = await getTranslations('cta');

  return (
    <section aria-labelledby="cta-titre" className="field field--night">
      <div className="wrap section">
        <h2 id="cta-titre" className="display max-w-[14ch]">
          {t('title')}
        </h2>
        <p className="lead mt-6 max-w-[34ch] text-[var(--night-soft)]">{t('text')}</p>
        <div className="mt-10">
          <a className="btn" href={RELEASE.downloadUrl}>
            {t('button')}
          </a>
        </div>
      </div>
    </section>
  );
}
