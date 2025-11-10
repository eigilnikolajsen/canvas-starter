import type { VoidComponent } from "../scripts/types";
import { Canvas } from "./canvas";
import { DragAndDrop } from "./drag-and-drop";
import { Panes } from "./panes";

const App: VoidComponent = () => (
	<>
		<Panes />
		<Canvas />
		<DragAndDrop />
	</>
);

export { App };
