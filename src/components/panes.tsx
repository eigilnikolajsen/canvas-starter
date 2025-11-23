import { addExportFolder, localPaneState, store } from "@/scripts/pane-utils";
import type { VoidComponent } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { Pane } from "tweakpane";

const Panes: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		// Create the tweakpane instance
		const pane = new Pane({ title: "Canvas Starter", container: containerRef() });

		// Add bindings from the store to the pane
		pane.addBinding(store, "width", { min: 1, max: 3840, step: 1 });
		pane.addBinding(store, "height", { min: 1, max: 2160, step: 1 });
		pane.addBinding(store, "cellSize");

		// Export folder
		addExportFolder(pane);

		// Save the pane state to localStorage when it changes
		localPaneState(pane);

		// Dispose the pane when the component is unmounted
		onCleanup(() => {
			pane.dispose();
		});
	});

	return <div ref={setContainerRef} class="absolute top-2 right-2"></div>;
};

export { Panes, store };
