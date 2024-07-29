// Three.js Transpiler r167

import { float, floor, tslFn, vec4, overloadingFn, vec3, mul, sub, fract, vec2 } from 'three/tsl'

export const mod289_0 = /*#__PURE__*/ tslFn(([x_immutable]) => {
	const x = float(x_immutable).toVar()

	return x.sub(floor(x.mul(1.0 / 289.0)).mul(289.0))
}).setLayout({
	name: 'mod289_0',
	type: 'float',
	inputs: [{ name: 'x', type: 'float' }]
})

export const mod289_1 = /*#__PURE__*/ tslFn(([x_immutable]) => {
	const x = vec4(x_immutable).toVar()

	return x.sub(floor(x.mul(1.0 / 289.0)).mul(289.0))
}).setLayout({
	name: 'mod289_1',
	type: 'vec4',
	inputs: [{ name: 'x', type: 'vec4' }]
})

export const mod289 = /*#__PURE__*/ overloadingFn([mod289_0, mod289_1])

export const perm = /*#__PURE__*/ tslFn(([x_immutable]) => {
	const x = vec4(x_immutable).toVar()

	return mod289(x.mul(34.0).add(1.0).mul(x))
}).setLayout({
	name: 'perm',
	type: 'vec4',
	inputs: [{ name: 'x', type: 'vec4' }]
})

export const vec3Noise = /*#__PURE__*/ tslFn(([p_immutable]) => {
	const p = vec3(p_immutable).toVar()
	const a = vec3(floor(p)).toVar()
	const d = vec3(p.sub(a)).toVar()
	d.assign(d.mul(d).mul(sub(3.0, mul(2.0, d))))
	const b = vec4(a.xxyy.add(vec4(0.0, 1.0, 0.0, 1.0))).toVar()
	const k1 = vec4(perm(b.xyxy)).toVar()
	const k2 = vec4(perm(k1.xyxy.add(b.zzww))).toVar()
	const c = vec4(k2.add(a.zzzz)).toVar()
	const k3 = vec4(perm(c)).toVar()
	const k4 = vec4(perm(c.add(1.0))).toVar()
	const o1 = vec4(fract(k3.mul(1.0 / 41.0))).toVar()
	const o2 = vec4(fract(k4.mul(1.0 / 41.0))).toVar()
	const o3 = vec4(o2.mul(d.z).add(o1.mul(sub(1.0, d.z)))).toVar()
	const o4 = vec2(o3.yw.mul(d.x).add(o3.xz.mul(sub(1.0, d.x)))).toVar()

	return o4.y.mul(d.y).add(o4.x.mul(sub(1.0, d.y)))
}).setLayout({
	name: 'vec3Noise',
	type: 'float',
	inputs: [{ name: 'p', type: 'vec3' }]
})
