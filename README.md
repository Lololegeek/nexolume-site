# Nexolume site

Presentation site for Nexolume, the offline Windows office suite (Writer, Sheets, Slides). Current version: **0.1.0-alpha**. The application source lives in [Lololegeek/nexolume](https://github.com/Lololegeek/nexolume).

## Develop

```bash
npm install
npm run dev
```

Pages: `/fr` and `/en`.

## Check

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Deploy

GitHub Pages, through `.github/workflows/pages.yml` (push to `main`). The build is a static export to `out/`; the workflow sets `BASE_PATH=/nexolume-site`.

Stack: Next.js 16 (static export), next-intl, Tailwind CSS 4, motion, Vitest.
