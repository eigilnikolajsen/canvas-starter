import P5 from "p5";
import type { VoidComponent } from "solid-js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { loop } from "../scripts/loop";
import { setup } from "../scripts/sketch";
import { globalStore, setGlobalStore, setStore, store } from "../scripts/store";

const P5Container: VoidComponent = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

	onMount(() => {
		const p5 = new P5(
			(p5) => {
				p5.setup = async (): Promise<void> => {
					setGlobalStore("progress", (store.startFrame * 1000) / store.frameRate);

					p5.createCanvas(store.width, store.height);

					await setup({ store });

					loop();
				};

				p5.draw = (): void => {
					//
				};
			},
			containerRef(),
			false,
		);

		setGlobalStore("p5", p5);

		globalThis.addEventListener("resize", handleResize);

		onCleanup(() => {
			p5.remove();

			if (globalStore.loopTimeout) {
				clearTimeout(globalStore.loopTimeout);
				setGlobalStore("loopTimeout", null);
			}

			globalThis.removeEventListener("resize", handleResize);
		});
	});

	// Reactive effect to handle resize when the store changes
	createEffect(() => {
		handleResize();
	});

	const handleResize = (): void => {
		const { p5 } = globalStore;
		const { width, height, fitScreen } = store;

		if (!p5) {
			return;
		}

		p5.resizeCanvas(width, height);

		if (fitScreen) {
			if (width / height > innerWidth / innerHeight) {
				setStore("scale", innerWidth / width);
			} else {
				setStore("scale", innerHeight / height);
			}
		}
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
