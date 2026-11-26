// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import siteConfig from './src/data/site-config.json' with { type: 'json' };

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  output: 'static',
  server: {
    allowedHosts: ['.v0.build'],
  },
  security: {
    allowedDomains: [{ hostname: '**.v0.build', protocol: 'https' }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
