import { Pane } from "tweakpane";

const store = { width: 960, cellSize: 16, fileName: "pixel-builder" };

const pane = new Pane();

pane.addBinding(store, "width");
pane.addBinding(store, "cellSize");
pane.addBinding(store, "fileName");

export { pane, store };
