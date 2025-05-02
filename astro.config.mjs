// @ts-check
import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";


import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  integrations: [purgecss(), svelte()],
  vite: {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    }
  },
});