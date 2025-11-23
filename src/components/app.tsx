import type { VoidComponent } from "solid-js";
import { P5Container } from "./p5-container";
import { Panes } from "./panes";

const App: VoidComponent = () => (
	<div class="bg-grid fixed inset-0 text-xs leading-3 uppercase">
		<P5Container />

		<Panes />
	</div>
);

export { App };
