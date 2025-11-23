import { createMutable } from "solid-js/store";
import type { Pane } from "tweakpane";
import {
	canvasToImageBlob,
	downloadFile,
	IMAGE_FORMATS,
	VIDEO_FORMATS,
	videoCanvasToVideoBlob,
} from "./export";
import { getCanvas } from "./lib";

const store = createMutable({
	width: 960,
	height: 540,
	cellSize: 16,
	fileName: "canvas-starter",
	imageFormat: "png" as (typeof IMAGE_FORMATS)[number],
	videoFormat: "mp4" as (typeof VIDEO_FORMATS)[number],
	progress: 0,
});

const localPaneState = (pane: Pane): void => {
	// Load the pane state from localStorage
	try {
		const state = localStorage.getItem("pane-state-1");
		pane.importState(JSON.parse(state ?? "{}")); // oxlint-disable-line no-unsafe-argument
	} catch (error) {
		console.error(error);
	}

	// Save the pane state to localStorage when it changes
	pane.on("change", (): void => {
		const state = pane.exportState();
		localStorage.setItem("pane-state-1", JSON.stringify(state));
	});
};

const addExportFolder = (pane: Pane): void => {
	const exportFolder = pane.addFolder({ title: "Export", expanded: true });
	exportFolder.addBinding(store, "imageFormat", {
		options: Object.fromEntries(IMAGE_FORMATS.map((format) => [format, format])),
	});
	exportFolder.addBinding(store, "videoFormat", {
		options: Object.fromEntries(VIDEO_FORMATS.map((format) => [format, format])),
	});
	exportFolder.addBinding(store, "fileName");
	exportFolder.addBinding(store, "progress", { min: 0, max: 100, step: 1 });

	// Image export button
	exportFolder.addButton({ title: "Export image" }).on("click", async () => {
		const blob = await canvasToImageBlob(getCanvas(), { imageFormat: store.imageFormat });

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	});

	// Video export button
	exportFolder.addButton({ title: "Export video" }).on("click", async () => {
		const blob = await videoCanvasToVideoBlob({
			canvas: getCanvas(),
			video: document.createElement("video"),
			onProgress: (value) => {
				store.progress = value;
				pane.refresh();
			},
			onDraw: (sample) => {
				const asset = sample.toCanvasImageSource();
				console.log(asset);
			},
			videoFormat: "mp4",
		});

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	});
};

export { addExportFolder, localPaneState, store };
