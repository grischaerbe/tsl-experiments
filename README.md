# TSL Experiments

![Smoke](./smoke-2.gif)

This repository contains experiments using [TSL (Three.js Shader
Language)](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language), a
currently Three.js exclusive way to write Shaders (programs that run on the GPU)
in JavaScript/TypeScript that has benefits over writing native GLSL/WGSL shader
programs:

- Tree-shakable
- No language switch TS <-> [GLSL](https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf)/[WGSL](https://www.w3.org/TR/WGSL/)
- Automatic shader graph optimizations
- Renderer agnostic
- Output to GLSL ([WebGL](https://caniuse.com/?search=webgl)) or WGSL ([WebGPU](https://caniuse.com/webgpu) – currently only supported by Chrome)
- Universal approach to vertex vs. fragment shader creation
- Node-based material system

## Background

Before TSL, to run custom shader code as part of a Three.js OOTB material you
would need to rely on
[`material.onBeforeCompile`](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language#old)
and search-and-replace the shader code in order to insert your custom shader
code. Needless to say this is less than ideal and error-prone. Because shader
snippets are now inserted only if they're used and only once, you can compose
shaders much more easily, in most part enabled by the accompanying node-based
material system.

## First Thoughts

- It's _magic_ 🪄
- The type system isn't perfect yet and not as rigid as native GLSL/WGSL is
- More verbose than GLSL/WGSL
- Very easy to get into
- Interesting approach to [varyings](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language#varying-node-name--null-)
- Swizzling is well implemented
- The [transpiler](https://threejs.org/examples/?q=tsl#webgpu_tsl_transpiler) is very helpful in converting existing GLSL code to TSL
- Highlights:
  - Ability to _compose_ shaders from multiple fragmental modules
  - Uniform declaration + update methods
  - Huge amount of available variables (`positionLocal`, `positionWorld`, `cameraPosition`, …)

## Install

```
pnpm i
```

## Run

```
pnpm dev
```

Because these experiments are WebGPU-first, you need to run them in a
WebGPU-capable browser such as Chrome.
