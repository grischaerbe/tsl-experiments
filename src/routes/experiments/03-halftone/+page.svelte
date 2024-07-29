<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import {
		Mesh,
		MeshBasicNodeMaterial,
		color,
		mix,
		normalWorld,
		output,
		tslFn,
		uniform,
		vec4,
		viewportCoordinate,
		viewportResolution,
		type Node,
		type ShaderNodeObject,
		type UniformNode
	} from 'three/tsl'

	const mesh = new Mesh()

	// Setup
	const halftonesSettings = {
		count: 80,
		color: '#000000',
		phi: 2.75,
		theta: -0.4,
		edgeStart: 1,
		edgeEnd: -0.5,
		alphaStart: 1,
		alphaEnd: 0,
		maxRadius: 0.8
	}

	const material = new MeshBasicNodeMaterial({ color: '#ff822e' })

	const getHalftoned = /*#__PURE__*/ tslFn(
		([count, color, direction, edgeStart, edgeEnd, maxRadius, alphaStart, alphaEnd]: [
			count: ShaderNodeObject<UniformNode<number>>,
			color: ShaderNodeObject<UniformNode<ShaderNodeObject<Node>>>,
			direction: ShaderNodeObject<UniformNode<THREE.Vector3>>,
			edgeStart: ShaderNodeObject<UniformNode<number>>,
			edgeEnd: ShaderNodeObject<UniformNode<number>>,
			maxRadius: ShaderNodeObject<UniformNode<number>>,
			alphaStart: ShaderNodeObject<UniformNode<number>>,
			alphaEnd: ShaderNodeObject<UniformNode<number>>
		]) => {
			// Grid UV
			let gridUv = viewportCoordinate.xy
				.div(viewportResolution.yy)
				.mul(count)
				.rotate(Math.PI * 0.25)
				.mod(1)

			// Effect strength
			const strength = normalWorld.dot(direction.normalize()).remapClamp(-1, 1, edgeEnd, edgeStart)

			// Dot
			const dot = gridUv.sub(0.5).length().step(strength.mul(maxRadius).mul(0.5))
			dot.mulAssign(mix(alphaEnd, alphaStart, strength))

			return vec4(color, dot)
		}
	)

	/**
	 * Copied from Bruno Simons TSL experiments
	 */
	const halftone = /*#__PURE__*/ tslFn(() => {
		const settings = halftonesSettings

		// Uniforms
		const count = uniform(settings.count)
		const color_ = uniform(color(settings.color))

		const spherical = new THREE.Spherical(1, settings.phi, settings.theta)
		const direction = uniform(new THREE.Vector3().setFromSpherical(spherical))

		const edgeStart = uniform(settings.edgeStart)
		const edgeEnd = uniform(settings.edgeEnd)
		const alphaStart = uniform(settings.alphaStart)
		const alphaEnd = uniform(settings.alphaEnd)
		const maxRadius = uniform(settings.maxRadius)

		// Add to output
		const halfTone = getHalftoned(
			count,
			color_,
			direction,
			edgeStart,
			edgeEnd,
			maxRadius,
			alphaStart,
			alphaEnd
		)
		output.rgb.assign(mix(output.rgb, halfTone.rgb, halfTone.a))

		return output
	})

	material.outputNode = halftone()
</script>

<T is={mesh}>
	<T.PlaneGeometry />
	<T is={material} />
</T>
