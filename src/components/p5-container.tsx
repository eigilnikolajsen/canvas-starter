import { sketch } from "@/scripts/sketch";
import { store } from "@/scripts/store";
import P5 from "p5";
import type { VoidComponent } from "solid-js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

const P5Container: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		store.p5Container = containerRef();

		const p5 = new P5(sketch, store.p5Container, false);
		store.p5 = p5;

		window.addEventListener("resize", handleResize);

		onCleanup(() => {
			store.p5?.remove();

			if (store.loopTimeout) {
				clearTimeout(store.loopTimeout);
				store.loopTimeout = null;
			}

			window.removeEventListener("resize", handleResize);
		});
	});

	// Reactive effect to handle resize when the store changes
	createEffect(() => {
		handleResize();
	});

	const handleResize = (): void => {
		const { width, height, fitScreen, p5, scaleBinding, pane } = store;

		p5?.resizeCanvas(width, height);

		if (scaleBinding) {
			scaleBinding.disabled = fitScreen;
		}

		if (!fitScreen) {
			return;
		}

		if (width / height > innerWidth / innerHeight) {
			const widthDifference = innerWidth / width;
			store.scale = widthDifference;
		} else {
			const heightDifference = innerHeight / store.height;
			store.scale = heightDifference;
		}

		pane?.refresh();
	};

	return (
		<div
			ref={setContainerRef}
			style={{ "--scale": store.scale }}
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white scale-(--scale)"
		></div>
	);
};

export { P5Container };
