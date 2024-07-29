import { join } from 'node:path'
import type { PageServerLoad } from './$types'
import { readdirSync } from 'node:fs'

export const load = (async () => {
	const paths = readdirSync(join('.', 'src', 'routes', 'experiments'), {
		recursive: false
	})
	return {
		paths: paths.map((p) => `/experiments/${p}`)
	}
}) satisfies PageServerLoad
