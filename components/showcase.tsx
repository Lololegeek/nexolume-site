import { getTranslations } from 'next-intl/server';
import { Rise } from '@/components/rise';
import { TactileLink } from '@/components/tactile-link';
import { RELEASE } from '@/lib/release';

const FIGURES = [
  [1200, 1350],
  [840, 910],
  [415, 380],
  [260, 300],
];
const sum = (col: 0 | 1) => FIGURES.reduce((acc, row) => acc + row[col], 0);

export async function Showcase() {
  const t = await getTranslations('showcase');
  const lines = t.raw('writer.lines') as string[];
  const columns = t.raw('sheets.columns') as string[];
  const rows = t.raw('sheets.rows') as string[];

  return (
    <section id="apercu" aria-labelledby="apercu-titre" className="split">
      <h2 id="apercu-titre" className="sr-only">
        {t('title')}
      </h2>

      <div className="panel field--blue">
        <h3 className="head">{t('writer.name')}</h3>
        <p className="lead mt-3 max-w-[28ch]">{t('writer.fact')}</p>
        <Rise className="mt-10 max-w-[30rem]" offset={72}>
          <div data-ui className="relative p-6 md:p-8">
            <p className="text-2xl font-bold tracking-[-0.03em]" style={{ fontFamily: 'var(--font-display)' }}>
              {t('writer.doc')}
            </p>
            {lines.map((line) => (
              <p key={line} className="mt-3">
                {line}
              </p>
            ))}
            <p className="mt-6 text-[13px] font-semibold text-[#4a5563]">{t('writer.saved')}</p>
            <Rise className="absolute -right-3 -bottom-8 w-[15rem] md:-right-10" offset={28} delay={0.15}>
              <p data-ui className="bg-[var(--amber)] p-3 text-[14px] font-semibold text-[var(--amber-ink)]">
                {t('writer.comment')}
              </p>
            </Rise>
          </div>
        </Rise>
        <div className="mt-16 flex flex-wrap gap-3">
          <a className="action" href="#ouvrir">
            {t('writer.formats')}
          </a>
          <a className="action" href="#limites">
            {t('writer.limits')}
          </a>
        </div>
      </div>

      <div className="panel field--sage">
        <h3 className="head">{t('sheets.name')}</h3>
        <p className="lead mt-3 max-w-[28ch]">{t('sheets.fact')}</p>
        <Rise className="mt-10 max-w-[30rem]" offset={72} delay={0.1}>
          <table data-ui className="w-full border-collapse text-left">
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={c} scope="col" className={`bg-[#e3ece7] px-4 py-3 font-semibold ${i ? 'text-right' : ''}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((label, r) => (
                <tr key={label}>
                  <th scope="row" className="px-4 py-3 font-normal">
                    {label}
                  </th>
                  {FIGURES[r].map((n, c) => (
                    <td key={c} className="px-4 py-3 text-right tabular-nums">
                      {n.toLocaleString('fr-FR')}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-[var(--amber)] font-semibold text-[var(--amber-ink)]">
                <th scope="row" className="px-4 py-3">
                  {t('sheets.total')}
                </th>
                <td className="px-4 py-3 text-right tabular-nums">{sum(0).toLocaleString('fr-FR')}</td>
                <td className="px-4 py-3 text-right tabular-nums">{sum(1).toLocaleString('fr-FR')}</td>
              </tr>
            </tbody>
          </table>
        </Rise>
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <a className="action" href="#installer">
            {t('sheets.install')}
          </a>
          <TactileLink href={RELEASE.downloadUrl}>{t('sheets.preview')}</TactileLink>
        </div>
      </div>
    </section>
  );
}
