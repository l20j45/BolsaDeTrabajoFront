// @ts-check
import { defineConfig } from 'astro/config';

import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  integrations: [purgecss()],
  vite: {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    }
  },
});