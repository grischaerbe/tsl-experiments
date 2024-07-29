import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { kitRoutes } from 'vite-plugin-kit-routes'

export default defineConfig({
	plugins: [sveltekit(), kitRoutes()],
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'esnext'
	}
})
