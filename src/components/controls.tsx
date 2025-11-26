import type { VoidComponent } from "solid-js";
import { createEffect, onCleanup, onMount } from "solid-js";
import { controls, internal } from "../scripts/stores";
import { General } from "./general";
import { Sketch } from "./sketch";

const LOCAL_STORAGE_KEY = `store-state-7`;

const Controls: VoidComponent = () => {
	onMount(() => {
		// Load the pane state from localStorage
		try {
			const state = localStorage.getItem(LOCAL_STORAGE_KEY);
			const localState = JSON.parse(state ?? "{}"); // oxlint-disable-line no-unsafe-argument no-unsafe-assignment

			Object.assign(controls, localState);
		} catch (error) {
			console.error(error);
		}

		addEventListener("keydown", handleKeyDown);

		onCleanup(() => {
			removeEventListener("keydown", handleKeyDown);
		});
	});

	const handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			internal.hideMenu = !internal.hideMenu;
		}

		if (event.key === " ") {
			controls.paused = !controls.paused;
		}
	};

	createEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(controls));
	});

	return (
		<div
			class="absolute top-0 left-0 m-2 flex flex-col gap-2 text-black bg-white p-2 w-96 translate-x-[calc(-100%-0.5rem)] max-h-[calc(100%-0.5rem)] data-menu:translate-x-0 transition-transform duration-300 overflow-y-auto [-webkit-scrollbar-width:none] [-ms-overflow-style:none] [scrollbar-width:none]"
			data-menu={internal.hideMenu ? undefined : ""}
		>
			<General />
			<Sketch />
		</div>
	);
};

export { Controls };
