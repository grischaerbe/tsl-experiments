<script lang="ts">
	import '../app.css'
	import { Canvas, T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { WebGPURenderer } from 'three/tsl'
	import UiProvider from '@components/UIProvider.svelte'
</script>

<div class="font-mono text-sm text-white">
	<UiProvider>
		<main class="absolute left-0 top-0 -z-10 h-full w-full">
			<Canvas
				renderMode="always"
				createRenderer={(canvas) => {
					return new WebGPURenderer({
						canvas,
						antialias: true
					})
				}}
			>
				<T.PerspectiveCamera position={[3, 3, 3]} makeDefault>
					<OrbitControls />
				</T.PerspectiveCamera>

				<T.GridHelper />

				<slot />
			</Canvas>
		</main>
	</UiProvider>
</div>
