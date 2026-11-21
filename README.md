# Nexolume site

Presentation site for Nexolume, the offline Windows office suite (Writer, Sheets, Slides). Current version: **0.1.0-alpha**. The application source lives in [Lololegeek/nexolume](https://github.com/Lololegeek/nexolume).

## Develop

```bash
npm install
npm run dev
```

Pages: `/fr` and `/en`. The browser version of the app is served under `/app/` in production only (see Deploy).

## Check

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Deploy

GitHub Pages, through `.github/workflows/pages.yml` (push to `main`, or run it by hand after a change to the app). The build is a static export to `out/`; the workflow sets `BASE_PATH=/nexolume-site`.

The workflow also builds the web version of Nexolume: a Windows job checks out [Lololegeek/nexolume](https://github.com/Lololegeek/nexolume), runs `scripts/build-web.ps1 -Configuration Release`, and the result is copied to `out/app/`. The "Open in your browser" buttons link to it: https://lololegeek.github.io/nexolume-site/app/

Stack: Next.js 16 (static export), next-intl, Tailwind CSS 4, motion, Vitest.
