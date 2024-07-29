<script lang="ts">
	import { T } from '@threlte/core'
	import { TransformControls, useTexture } from '@threlte/extras'
	import * as THREE from 'three'
	import {
		distance,
		Mesh,
		MeshBasicNodeMaterial,
		positionWorld,
		remap,
		texture,
		tslFn,
		uv,
		vec3,
		vec4
	} from 'three/tsl'

	const mesh = new Mesh()

	const material = new MeshBasicNodeMaterial()

	/**
	 * Applies transparency over a texture
	 */
	const transparent = /*#__PURE__*/ tslFn(({ map }: { map: THREE.Texture }) => {
		const tex = texture(map, uv())
		const d = remap(distance(vec3(), positionWorld), 0, 10, 0, 1)
		return vec4(tex.x, tex.y, tex.z, d)
	})
</script>

{#await useTexture('/svelte.png') then map}
	<T is={mesh}>
		{#snippet children({ ref })}
			<TransformControls object={ref} />

			<T.PlaneGeometry />
			<T is={material} colorNode={transparent({ map })} transparent />
		{/snippet}
	</T>
{/await}
