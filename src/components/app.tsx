import type { VoidComponent } from "solid-js";
import { Controls } from "./controls";
import { P5 } from "./p5";

const App: VoidComponent = () => (
	<div class="bg-grid fixed inset-0 text-xs leading-3 uppercase">
		<P5 />

		<Controls />
	</div>
);

export { App };
