// Local production-mode preview only. Keep astro.config.mjs on the Vercel
// adapter for deployment builds.
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
});
