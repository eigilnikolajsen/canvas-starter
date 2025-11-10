#!/usr/bin/env bun

import tailwindcss from "bun-plugin-tailwind";

await Bun.build({
	entrypoints: ["public/index.html"],
	outdir: "dist",
	plugins: [tailwindcss],
	minify: true,
	splitting: true,
});
