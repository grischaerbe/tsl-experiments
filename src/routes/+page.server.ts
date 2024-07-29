import { routes } from '$lib/ROUTES'
import type { PageServerLoad } from './$types'

export const load = (async () => {
	return {
		routes: routes.filter((r) => r.startsWith('/experiments/'))
	}
}) satisfies PageServerLoad
