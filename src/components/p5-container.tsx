import { loop } from "@/scripts/loop";
import { setup } from "@/scripts/sketch";
import { globalStore, store } from "@/scripts/store";
import P5 from "p5";
import type { VoidComponent } from "solid-js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

const P5Container: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		const p5 = new P5(
			(p5) => {
				p5.setup = async (): Promise<void> => {
					globalStore.progress = store.startFrame;

					p5.createCanvas(store.width, store.height);

					if (!globalStore.pane) {
						return;
					}

					await setup({ pane: globalStore.pane, store });

					loop();
				};

				p5.draw = (): void => {
					//
				};
			},
			containerRef(),
			false,
		);

		globalStore.p5 = p5;

		window.addEventListener("resize", handleResize);

		onCleanup(() => {
			p5.remove();

			if (globalStore.loopTimeout) {
				clearTimeout(globalStore.loopTimeout);
				globalStore.loopTimeout = null;
			}

			window.removeEventListener("resize", handleResize);
		});
	});

	// Reactive effect to handle resize when the store changes
	createEffect(() => {
		handleResize();
	});

	const handleResize = (): void => {
		const { p5, scaleBinding, pane } = globalStore;
		const { width, height, fitScreen } = store;

		if (!p5 || !pane) {
			return;
		}

		p5.resizeCanvas(width, height);

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

		pane.refresh();
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
