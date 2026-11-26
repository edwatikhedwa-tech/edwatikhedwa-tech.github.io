// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import siteConfig from './src/data/site-config.json' with { type: 'json' };

const v0PreviewProxy = {
  name: 'v0-preview-proxy-origin',
  enforce: 'post',
  configureServer(server) {
    return () => {
      server.middlewares.stack.unshift({
        route: '',
        handle(request, response, next) {
          const forwardedHost = request.headers['x-forwarded-host'];
          const isV0SandboxRequest =
            !request.headers.origin &&
            request.headers['sec-fetch-site'] === 'cross-site' &&
            request.headers['sec-fetch-mode'] === 'cors' &&
            typeof forwardedHost === 'string' &&
            /^sb-[a-z0-9-]+\.vercel\.run$/i.test(forwardedHost);

          if (isV0SandboxRequest) {
            // The v0 preview proxy strips Origin but preserves its sandbox host.
            request.headers.origin = 'https://v0.app';
            response.setHeader('Access-Control-Allow-Origin', 'https://v0.app');
            response.setHeader('Vary', 'Origin');
          }

          next();
        },
      });
    };
  },
};

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  output: 'static',
  security: {
    allowedDomains: [{ hostname: 'v0.app', protocol: 'https' }],
  },
  vite: {
    plugins: [v0PreviewProxy, tailwindcss()],
    server: {
      allowedHosts: ['sb-3ej1vs0m6fby.vercel.run'],
      cors: {
        origin: 'https://v0.app',
      },
    },
  },
});
