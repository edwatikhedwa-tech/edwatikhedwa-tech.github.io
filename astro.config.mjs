// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import siteConfig from './src/data/site-config.json' with { type: 'json' };

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  output: 'static',
  security: {
    allowedDomains: [{ hostname: 'v0.app', protocol: 'https' }],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      cors: {
        origin: 'https://v0.app',
      },
    },
  },
});
