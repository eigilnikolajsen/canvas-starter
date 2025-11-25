import {
	canvasToImageBlob,
	downloadFile,
	framesCanvasToVideoBlob,
	IMAGE_FORMATS,
	VIDEO_FORMATS,
} from "@/scripts/export";
import { getCanvas } from "@/scripts/lib";
import { loop } from "@/scripts/loop";
import { globalStore, store } from "@/scripts/store";
import type { VoidComponent } from "solid-js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Pane } from "tweakpane";

const PANE_STATE_KEY = `pane-state-7`;

const Panes: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		// Create the tweakpane instance
		const pane = new Pane({ title: "Canvas Starter", container: containerRef() });
		globalStore.pane = pane;

		initPanes();

		// Dispose the pane when the component is unmounted
		onCleanup(() => {
			pane.dispose();
		});
	});

	createEffect(() => {
		localStorage.setItem(PANE_STATE_KEY, JSON.stringify(store));
	});

	return <div ref={setContainerRef} class="absolute top-2 right-2 w-96"></div>;
};

const initPanes = (): void => {
	const { pane } = globalStore;
	if (!pane) {
		return;
	}

	// Size folder
	const sizeFolder = pane.addFolder({ title: "Size", expanded: false });
	sizeFolder.addBinding(store, "width", { min: 1, max: 3840, step: 1 });
	sizeFolder.addBinding(store, "height", { min: 1, max: 2160, step: 1 });
	sizeFolder.addBinding(store, "fitScreen", { type: "boolean" });
	const scaleBinding = sizeFolder.addBinding(store, "scale", { min: 0.1, max: 10, step: 0.01 });
	globalStore.scaleBinding = scaleBinding;

	// Export folder
	const exportFolder = pane.addFolder({ title: "Export", expanded: false });
	exportFolder.addBinding(store, "seed");
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
	exportFolder.addBinding(globalStore, "exportProgress", {
		min: 0,
		max: 100,
		step: 1,
		disabled: true,
	});

	// Image export button
	exportFolder.addButton({ title: "Export image" }).on("click", async () => {
		const blob = await canvasToImageBlob(getCanvas(), { imageFormat: store.imageFormat });

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	});

	// Video export button
	exportFolder.addButton({ title: "Export video" }).on("click", async () => {
		globalStore.isExporting = true;
		globalStore.progress = store.startFrame;
		globalStore.exportProgress = 0;
		const { p5 } = globalStore;
		if (!p5) {
			return;
		}

		const blob = await framesCanvasToVideoBlob({
			canvas: getCanvas(),
			frames: store.outputFrames,
			fps: store.frameRate,
			onProgress: (value) => {
				globalStore.exportProgress = value * 100;
				pane.refresh();
			},
			onDraw: () => {
				loop();
			},
			videoFormat: "mp4",
		});

		globalStore.isExporting = false;
		globalStore.exportProgress = 0;
		globalStore.progress = store.startFrame;
		pane.refresh();

		loop();

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	});

	// Load the pane state from localStorage
	try {
		const state = localStorage.getItem(PANE_STATE_KEY);
		const localState: typeof store = JSON.parse(state ?? "{}"); // oxlint-disable-line no-unsafe-argument

		for (const [key, value] of Object.entries(localState)) {
			store[key as keyof typeof store] = value as never;
		}

		pane.refresh();
	} catch (error) {
		console.error(error);
	}
};

export { initPanes, PANE_STATE_KEY, Panes };
