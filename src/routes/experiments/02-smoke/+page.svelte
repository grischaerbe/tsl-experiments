<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { TransformControls } from '@threlte/extras'
	import {
		cameraPosition,
		clamp,
		distance,
		dot,
		float,
		Mesh,
		MeshBasicNodeMaterial,
		normalWorld,
		positionWorld,
		remap,
		remapClamp,
		tslFn,
		uniform,
		varying,
		vec3,
		vec4,
		type NodeObject
	} from 'three/tsl'
	import { vec3Noise } from './tsl/vec3Noise'

	const mesh = new Mesh()

	const material = new MeshBasicNodeMaterial()

	/**
	 * Takes a float [0,1] and returns an eased float [0,1]
	 */
	const easeInOut = /*#__PURE__*/ tslFn(({ t }: { t: NodeObject<number> }) => {
		const t2 = t.div(0.5)
		const t3 = t2.mul(t2)
		const t4 = t3.mul(t2)
		const condition = t2.lessThan(1)
		const result1 = t4.mul(0.5)
		const result2 = t2.sub(2).mul(t2).mul(t2).add(2).mul(0.5)
		return condition.mix(result2, result1)
	})

	/**
	 * Uses the world position to fade the object in and out
	 */
	const transparent = /*#__PURE__*/ tslFn(() => {
		const d = remapClamp(distance(vec3(), positionWorld), 1, 4, 0, 1)
		return vec4(1, 1, 1, easeInOut({ t: d }))
	})

	/**
	 * Applies a fresnel effect
	 */
	const fresnel = /*#__PURE__*/ tslFn(() => {
		const dir = varying(cameraPosition.sub(positionWorld).normalize())
		const d = dot(dir, normalWorld).pow(8)
		return remap(clamp(float(1).sub(d), 0, 1), 0, 1, 0, 1).pow(4)
	})

	const timeUniform = uniform(0)
	useTask((delta) => {
		timeUniform.value += delta
	})
</script>

<T is={mesh}>
	{#snippet children({ ref })}
		<TransformControls object={ref} />

		<T.SphereGeometry args={[1, 64, 64]} />
		<T
			is={material}
			opacityNode={vec3Noise(positionWorld.mul(4).add(timeUniform)).mul(float(1).sub(fresnel()))}
			transparent
		/>
	{/snippet}
</T>
