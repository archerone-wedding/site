// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	vite: {
		build: {
			// Keep processed Astro scripts external so strict script-src 'self' works.
			assetsInlineLimit: 0,
		},
	},
	adapter: vercel(),
});
