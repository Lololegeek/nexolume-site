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
      <p className="display py-12" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.04em' }} aria-hidden="true">
        Nexolume
      </p>
      <ul className="flex flex-wrap gap-x-8 gap-y-2 pb-6">
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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
        <p className="small max-w-[60ch]">{t('legal')}</p>
        <a className="small inline-flex min-h-11 items-center font-semibold" href="#contenu">
          {t('top')}
        </a>
      </div>
    </footer>
  );
}
