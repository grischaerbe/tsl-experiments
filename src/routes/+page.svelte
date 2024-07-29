<script lang="ts">
	import Ui from '@components/UI.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<Ui>
	<ul class="p-6">
		{#each data.paths as path}
			<li>
				<a href={path}>{path}</a>
			</li>
		{/each}
	</ul>
</Ui>
