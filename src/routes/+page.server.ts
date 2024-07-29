import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PageServerLoad } from './$types'

export const load = (async () => {
	const paths = readdirSync(resolve(process.cwd(), 'src', 'routes', 'experiments'), {
		recursive: false
	})
	return {
		paths: paths.map((p) => `/experiments/${p}`)
	}
}) satisfies PageServerLoad
