import { setRequestLocale } from 'next-intl/server';
import { Cta } from '@/components/cta';
import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { Install } from '@/components/install';
import { Limits } from '@/components/limits';
import { Open } from '@/components/open';
import { Showcase } from '@/components/showcase';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="contenu">
      <Hero />
      <Features />
      <Showcase />
      <Open />
      <Limits />
      <Install />
      <Cta />
    </main>
  );
}
