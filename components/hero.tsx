import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/reveal';
import { HeroStage } from '@/components/hero-stage';
import { SheetsMock, SlidesMock, WriterMock } from '@/components/mockups';
import { RELEASE } from '@/lib/release';

export async function Hero() {
  const t = await getTranslations('hero');
  const a = await getTranslations('apps');

  return (
    <HeroStage
      label={t('pick')}
      stages={[
        { key: 'writer', field: 'blue', name: a('writer.name'), mock: <WriterMock /> },
        { key: 'sheets', field: 'sage', name: a('sheets.name'), mock: <SheetsMock /> },
        { key: 'slides', field: 'amber', name: a('slides.name'), mock: <SlidesMock /> },
      ]}
    >
      <Reveal>
        <h1 id="hero-titre" className="giant max-w-[9ch]">
          {t('title')}
        </h1>
        <p className="lead mt-6 max-w-[34ch]">{t('lead')}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a className="btn" href={RELEASE.downloadUrl}>
            {t('cta')}
          </a>
          <a className="btn btn--ghost" href="#apps">
            {t('more')}
          </a>
        </div>
      </Reveal>
    </HeroStage>
  );
}
