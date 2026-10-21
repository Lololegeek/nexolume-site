import { BASE_PATH } from '@/lib/site';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { RELEASE } from '@/lib/release';

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const h = await getTranslations('hero');
  const locale = await getLocale();
  const other = locale === 'fr' ? 'en' : 'fr';

  return (
    <header className="field field--night">
      <div className="wrap flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-xl font-bold no-underline"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE_PATH}/icon.png`} alt="" width={32} height={32} className="mr-3 size-8" />
          Nexolume
          <span className="small ml-3 hidden font-semibold whitespace-nowrap text-[var(--night-soft)] sm:inline">
            {t('version')}
          </span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-2 sm:gap-6">
          <a className="nav-link hidden md:inline-flex" href="#apps">
            {t('apps')}
          </a>
          <a className="nav-link hidden md:inline-flex" href="#formats">
            {t('formats')}
          </a>
          <a className="nav-link hidden md:inline-flex" href="#installer">
            {t('install')}
          </a>
          <Link href="/" locale={other} aria-label={t('switchTo')} className="nav-link">
            {t('switch')}
          </Link>
          <a className="btn btn--small hidden sm:inline-flex" href={RELEASE.downloadUrl}>
            {h('cta')}
          </a>
        </nav>
      </div>
    </header>
  );
}
