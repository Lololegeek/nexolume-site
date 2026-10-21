import type { Metadata } from 'next';
import { Figtree, League_Spartan } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { routing } from '@/i18n/routing';
import { BASE_PATH, SITE_ORIGIN } from '@/lib/site';
import '../globals.css';

// League Spartan carries every headline at one weight; Figtree sets the reading text.
const display = League_Spartan({ subsets: ['latin'], weight: ['700'], variable: '--f-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '600'], variable: '--f-body', display: 'swap' });

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${BASE_PATH}/${locale}/`,
      languages: { fr: `${BASE_PATH}/fr/`, en: `${BASE_PATH}/en/` },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    icons: { icon: `${BASE_PATH}/icon.svg` },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations('nav');
  const messages = await getMessages();

  // The provider lets next-intl's client Link read the locale during static rendering.
  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--amber)] focus:px-4 focus:py-2 focus:text-[var(--amber-ink)]"
          >
            {t('skip')}
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
