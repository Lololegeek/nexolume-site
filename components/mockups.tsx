import { getTranslations } from 'next-intl/server';

type Frame = { file: string; children: React.ReactNode };

function Frame({ file, children }: Frame) {
  return (
    <div data-ui aria-hidden="true" className="mock w-full">
      <div className="mock__bar">
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="ml-2">{file}</span>
      </div>
      {children}
    </div>
  );
}

export async function WriterMock() {
  const t = await getTranslations('apps.writer.mock');
  const lines = t.raw('lines') as string[];

  return (
    <Frame file={t('file')}>
      <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
        <div>
          <p
            className="text-2xl font-bold tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </p>
          {lines.map((line) => (
            <p key={line} className="mt-3">
              {line}
            </p>
          ))}
        </div>
        <p className="h-fit self-start bg-[var(--amber)] px-3 py-2 text-sm font-semibold text-[var(--amber-ink)] sm:max-w-[11rem]">
          {t('comment')}
        </p>
      </div>
    </Frame>
  );
}

export async function SheetsMock() {
  const t = await getTranslations('apps.sheets.mock');
  const columns = t.raw('columns') as string[];
  const rows = t.raw('rows') as string[];
  const values = [
    [1200, 1350],
    [4800, 2100],
    [900, 1100],
    [600, 800],
  ];
  const totals = [0, 1].map((c) => values.reduce((sum, r) => sum + r[c], 0));
  const cell = 'border-b border-[#d6dde5] px-4 py-2.5';

  return (
    <Frame file={t('file')}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#f1f4f7]">
            {columns.map((c, i) => (
              <th key={c} className={`${cell} font-semibold ${i ? 'text-right' : ''}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r}>
              <td className={cell}>{r}</td>
              {values[i].map((v, j) => (
                <td key={j} className={`${cell} text-right tabular-nums`}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-[var(--sage)] font-semibold text-[var(--sage-ink)]">
            <td className="px-4 py-2.5">{t('total')}</td>
            {totals.map((v, j) => (
              <td key={j} className="px-4 py-2.5 text-right tabular-nums">
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Frame>
  );
}

export async function SlidesMock() {
  const t = await getTranslations('apps.slides.mock');
  const bullets = t.raw('bullets') as string[];

  return (
    <Frame file={t('file')}>
      <div className="grid gap-4 bg-[var(--night)] p-8 text-[var(--night-ink)] sm:aspect-video sm:content-center sm:p-12">
        <p
          className="text-3xl leading-tight font-bold tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('title')}
        </p>
        <ul className="grid gap-1 text-lg">
          {bullets.map((b) => (
            <li key={b} className="before:mr-2 before:text-[var(--amber)] before:content-['■']">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
