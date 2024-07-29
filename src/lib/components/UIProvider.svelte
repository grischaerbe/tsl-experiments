<script lang="ts">
	import { createUiContext } from '$lib/hooks/useUi'
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()

	const { uiSnippets } = createUiContext()
</script>

{@render children()}

{#each uiSnippets as snippet}
	{@render snippet()}
{/each}
