# Nexolume site

Site de présentation de Nexolume, la suite bureautique Windows hors ligne (Writer, Sheets, Slides). Version actuelle : **0.1.0-alpha**.
Presentation site for Nexolume, the offline Windows office suite (Writer, Sheets, Slides). Current version: **0.1.0-alpha**.

## Développer / Develop

```bash
npm install
npm run dev
```

Pages : `/fr` et `/en`.

## Vérifier / Check

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Déployer / Deploy

GitHub Pages, via `.github/workflows/pages.yml` (push sur `main`). Le build utilise `BASE_PATH=/nexolume-site`.
Static export to `out/`; the workflow sets `BASE_PATH=/nexolume-site`.

Stack : Next.js 16 (export statique), next-intl, Tailwind CSS 4, motion, Vitest.
