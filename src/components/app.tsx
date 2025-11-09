import type { VoidComponent } from "../scripts/types";
import { Canvas } from "./canvas";
import { DragAndDrop } from "./drag-and-drop";

import "../scripts/hooks";

const App: VoidComponent = () => (
	<>
		<Canvas />
		<DragAndDrop />
	</>
);

export { App };
