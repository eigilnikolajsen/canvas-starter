import { sketch } from "@/scripts/sketch";
import P5 from "p5";
import type { VoidComponent } from "solid-js";
import { createEffect, createSignal, onMount } from "solid-js";
import { store } from "./panes";

const P5Container: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
	const [p5Instance, setP5Instance] = createSignal<typeof P5.prototype>();

	onMount(() => {
		const containerElement = containerRef();

		if (!containerElement) {
			return;
		}

		setP5Instance(new P5(sketch, containerElement, false));
	});

	createEffect(() => {
		const p5 = p5Instance();
		if (!p5) {
			return;
		}

		p5.resizeCanvas(store.width, store.height);
	});

	return (
		<div
			ref={setContainerRef}
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
		></div>
	);
};

export { P5Container };
