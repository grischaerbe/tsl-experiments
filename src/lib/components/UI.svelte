<script lang="ts">
	import { useUi } from '$lib/hooks/useUi'
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()

	const { addSnippet, removeSnippet } = useUi()

	$effect.pre(() => {
		addSnippet(children)
		return () => {
			removeSnippet(children)
		}
	})
</script>
