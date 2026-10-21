import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const locale = await getLocale();
  const other = locale === 'fr' ? 'en' : 'fr';

  return (
    <header className="field field--night">
      <div className="grid min-h-20 grid-cols-3 items-center gap-4 py-3">
        <Link href="/" className="small font-semibold no-underline">
          Nexolume
        </Link>
        <p className="small text-center font-semibold">{t('version')}</p>
        <Link
          href="/"
          locale={other}
          aria-label={t('switchTo')}
          className="small inline-flex min-h-11 items-center justify-self-end font-semibold"
        >
          {t('switch')}
        </Link>
      </div>
    </header>
  );
}
