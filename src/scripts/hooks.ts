import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Pane } from "tweakpane";

const store = {
	width: 960,
	height: 540,
	cellSize: 16,
	fileName: "canvas-starter",
} as const;

const pane = new Pane();

// Add bindings from the store to the pane
pane.addBinding(store, "width", { min: 1, max: 3840, step: 1 });
pane.addBinding(store, "height", { min: 1, max: 2160, step: 1 });
pane.addBinding(store, "cellSize");
pane.addBinding(store, "fileName");

// Load the pane state from localStorage
try {
	const state = localStorage.getItem("pane-state-1");
	pane.importState(JSON.parse(state ?? "{}"));
} catch (error) {
	console.error(error);
}

const useStore = (): [typeof store, Dispatch<SetStateAction<typeof store>>] => {
	const [storeState, setStoreState] = useState(store);

	// Save the pane state to localStorage when it changes
	pane.on("change", () => {
		setStoreState({ ...store });
		localStorage.setItem("pane-state-1", JSON.stringify(pane.exportState()));
	});

	return [storeState, setStoreState];
};

export { useStore };
