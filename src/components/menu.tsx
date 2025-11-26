import { globalStore, store } from "@/scripts/store";
import type { VoidComponent } from "solid-js";
import { createEffect, onCleanup, onMount } from "solid-js";
import { Export } from "./export";
import { Size } from "./size";
import { Sketch } from "./sketch";

const LOCAL_STORAGE_KEY = `store-state-7`;

const Menu: VoidComponent = () => {
	onMount(() => {
		// Load the pane state from localStorage
		try {
			const state = localStorage.getItem(LOCAL_STORAGE_KEY);
			const localState: typeof store = JSON.parse(state ?? "{}"); // oxlint-disable-line no-unsafe-argument

			for (const [key, value] of Object.entries(localState)) {
				store[key as keyof typeof store] = value as never;
			}
		} catch (error) {
			console.error(error);
		}

		globalThis.addEventListener("keydown", handleKeyDown);

		onCleanup(() => {
			globalThis.removeEventListener("keydown", handleKeyDown);
		});
	});

	const handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			globalStore.hideMenu = !globalStore.hideMenu;
		}
	};

	createEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
	});

	return (
		<div
			class="absolute top-1 left-1 flex flex-col gap-y-2 text-black bg-white px-[1ch] p-2 w-96 -translate-x-full data-menu:translate-x-0 transition-transform duration-300 overflow-y-auto [-webkit-scrollbar-width:none] [-ms-overflow-style:none] [scrollbar-width:none]"
			data-menu={globalStore.hideMenu ? undefined : ""}
		>
			<Size />
			<Export />
			<Sketch />
		</div>
	);
};

export { Menu };
