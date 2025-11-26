import type { VoidComponent } from "solid-js";
import { Menu } from "./menu";
import { P5Container } from "./p5-container";

const App: VoidComponent = () => (
	<div class="bg-grid fixed inset-0 text-xs leading-3 uppercase">
		<P5Container />

		<Menu />
	</div>
);

export { App };
