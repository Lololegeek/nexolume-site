// Production builds are served from GitHub Pages under the repository name.
// Local dev and `next start` keep the root path (BASE_PATH unset).
export const BASE_PATH = process.env.BASE_PATH ?? '';
export const SITE_ORIGIN = 'https://lololegeek.github.io';
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}/`;
// The browser version of Nexolume, built from the Nexolume repository and copied to out/app/ by the Pages workflow.
export const WEB_APP_URL = `${BASE_PATH}/app/`;
