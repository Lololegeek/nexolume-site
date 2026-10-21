import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { RELEASE } from '@/lib/release';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const locale = await getLocale();
  const other = locale === 'fr' ? 'en' : 'fr';
  const places = t.raw('places') as string[];
  const hrefs = [RELEASE.downloadUrl, RELEASE.repoUrl, `${RELEASE.repoUrl}/blob/main/CHANGELOG.md`];

  return (
    <footer className="field field--paper">
      <div className="wrap py-12">
        <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Nexolume
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-1">
          {places.map((place, i) => (
            <li key={place}>
              <a className="inline-flex min-h-11 items-center font-semibold" href={hrefs[i]}>
                {place}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/"
              locale={other}
              aria-label={nav('switchTo')}
              className="inline-flex min-h-11 items-center font-semibold"
            >
              {nav('switch')}
            </Link>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="small max-w-[60ch] text-[var(--paper-soft)]">{t('legal')}</p>
          <a className="small inline-flex min-h-11 items-center font-semibold" href="#contenu">
            {t('top')}
          </a>
        </div>
      </div>
    </footer>
  );
}
