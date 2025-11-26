import type { IMAGE_FORMATS, VIDEO_FORMATS } from "@/scripts/export";
import type { BindingApi } from "@tweakpane/core";
import type P5 from "p5";
import { createMutable } from "solid-js/store";
import type { Pane } from "tweakpane";

const globalStore = createMutable({
	p5: null as typeof P5.prototype | null,
	pane: null as Pane | null,
	scaleBinding: null as BindingApi | null,
	loopTimeout: null as NodeJS.Timeout | null,
	exportProgress: 0,
	progress: 0,
	isExporting: false,
	hideMenu: false,
});

const store = createMutable({
	// Export
	fileName: "canvas-starter",
	imageFormat: "png" as (typeof IMAGE_FORMATS)[number],
	videoFormat: "mp4" as (typeof VIDEO_FORMATS)[number],
	startFrame: 0,
	outputFrames: 120,
	frameRate: 60,

	// Settings
	seed: 1,

	// Size
	width: 720,
	height: 540,
	fitScreen: false,
	scale: 1,

	// Sketch
	circleRadius: 16,
	circleSpeed: 0.071,
	circleMovement: 100,
});

export { globalStore, store };
