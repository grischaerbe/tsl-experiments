// Three.js Transpiler r167

import { float, sin, fract, tslFn, floor, mix } from 'three/tsl'

export const rand = /*#__PURE__*/ tslFn(([n_immutable]) => {
	const n = float(n_immutable).toVar()

	return fract(sin(n).mul(43758.5453123))
}).setLayout({
	name: 'rand',
	type: 'float',
	inputs: [{ name: 'n', type: 'float' }]
})

export const noise = /*#__PURE__*/ tslFn(([p_immutable]) => {
	const p = float(p_immutable).toVar()
	const fl = float(floor(p)).toVar()
	const fc = float(fract(p)).toVar()

	return mix(rand(fl), rand(fl.add(1.0)), fc)
}).setLayout({
	name: 'noise',
	type: 'float',
	inputs: [{ name: 'p', type: 'float' }]
})
