import { setRequestLocale } from 'next-intl/server';
import { Apps } from '@/components/apps';
import { Cta } from '@/components/cta';
import { Formats } from '@/components/formats';
import { Hero } from '@/components/hero';
import { Install } from '@/components/install';
import { Limits } from '@/components/limits';
import { Why } from '@/components/why';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="contenu">
      <Hero />
      <Apps />
      <Why />
      <Formats />
      <Limits />
      <Install />
      <Cta />
    </main>
  );
}
