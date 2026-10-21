import { getTranslations } from 'next-intl/server';
import { HeroFolders } from '@/components/hero-folders';
import { HeroTitle } from '@/components/hero-title';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="field field--night flex min-h-[calc(100svh-5rem)] flex-col pb-0">
      <div className="pt-6 pb-16 md:pt-10">
        <HeroTitle title={t('title')} />
        <p className="lead mt-8 max-w-[34ch]">{t('lead')}</p>
      </div>
      <HeroFolders />
    </section>
  );
}
