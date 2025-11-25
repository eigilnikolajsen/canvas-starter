import {
	canvasToImageBlob,
	downloadFile,
	framesCanvasToVideoBlob,
	IMAGE_FORMATS,
	VIDEO_FORMATS,
} from "@/scripts/export";
import { getCanvas } from "@/scripts/lib";
import { draw } from "@/scripts/sketch";
import { store } from "@/scripts/store";
import type { VoidComponent } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { Pane } from "tweakpane";

const PANE_STATE_KEY = `pane-state-${Date.now()}`;

const Panes: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		// Create the tweakpane instance
		const pane = new Pane({ title: "Canvas Starter", container: containerRef() });
		store.pane = pane;

		// Add bindings from the store to the pane
		pane.addBinding(store, "circleRadius", { min: 1, max: 100, step: 0.1 });
		pane.addBinding(store, "circleSpeed", { min: 0.001, max: 0.1, step: 0.001 });
		pane.addBinding(store, "circleMovement", { min: 1, max: 100, step: 1 });
		pane.addBinding(store, "seed");

		const sizeFolder = pane.addFolder({ title: "Size", expanded: false });
		sizeFolder.addBinding(store, "width", { min: 1, max: 3840, step: 1 });
		sizeFolder.addBinding(store, "height", { min: 1, max: 2160, step: 1 });
		sizeFolder.addBinding(store, "fitScreen", { type: "boolean" });
		const scaleBinding = sizeFolder.addBinding(store, "scale", { min: 0.1, max: 10, step: 0.01 });
		store.scaleBinding = scaleBinding;

		// Export folder
		const exportFolder = pane.addFolder({ title: "Export", expanded: false });
		exportFolder.addBinding(store, "imageFormat", {
			options: Object.fromEntries(IMAGE_FORMATS.map((format) => [format, format])),
		});
		exportFolder.addBinding(store, "videoFormat", {
			options: Object.fromEntries(VIDEO_FORMATS.map((format) => [format, format])),
		});
		exportFolder.addBinding(store, "fileName");
		exportFolder.addBinding(store, "frameRate", { min: 1, max: 120, step: 1 });
		exportFolder.addBinding(store, "startFrame", { min: 0, step: 1 });
		exportFolder.addBinding(store, "outputFrames", { min: 1, step: 1 });
		exportFolder.addBinding(store, "exportProgress", { min: 0, max: 100, step: 1, disabled: true });

		// Image export button
		exportFolder.addButton({ title: "Export image" }).on("click", async () => {
			const blob = await canvasToImageBlob(getCanvas(), { imageFormat: store.imageFormat });

			if (blob) {
				downloadFile(blob, store.fileName);
			}
		});

		// Video export button
		exportFolder.addButton({ title: "Export video" }).on("click", async () => {
			store.isExporting = true;
			store.progress = store.startFrame;
			store.exportProgress = 0;

			const blob = await framesCanvasToVideoBlob({
				canvas: getCanvas(),
				frames: store.outputFrames,
				fps: store.frameRate,
				onProgress: (value) => {
					store.exportProgress = value;
					pane.refresh();
				},
				onDraw: (frame) => {
					console.log(frame);
					draw();
				},
				videoFormat: "mp4",
			});

			store.isExporting = false;
			store.exportProgress = 0;
			store.progress = store.startFrame;
			pane.refresh();

			draw();

			if (blob) {
				downloadFile(blob, store.fileName);
			}
		});

		// Load the pane state from localStorage
		try {
			const state = localStorage.getItem(PANE_STATE_KEY);
			pane.importState(JSON.parse(state ?? "{}")); // oxlint-disable-line no-unsafe-argument
		} catch (error) {
			console.error(error);
		}

		// Save the pane state to localStorage when it changes
		pane.on("change", (): void => {
			const state = pane.exportState();
			localStorage.setItem(PANE_STATE_KEY, JSON.stringify(state));
		});

		// Dispose the pane when the component is unmounted
		onCleanup(() => {
			pane.dispose();
		});
	});

	return <div ref={setContainerRef} class="absolute top-2 right-2 w-96"></div>;
};

export { Panes };
