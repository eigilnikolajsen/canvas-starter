import type { VoidComponent } from "@/scripts/types";
import { useCallback, useEffect } from "react";

const Panes: VoidComponent = () => {
	// Hide panes when Escape is pressed
	const onKeyDown = useCallback((event: KeyboardEvent): void => {
		const tweakpaneContainer = document.querySelector(".tp-dfwv");

		if (event.key === "Escape" && tweakpaneContainer) {
			tweakpaneContainer.classList.toggle("hidden");
		}
	}, []);

	// Add event listener for Escape key
	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);

		return (): void => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [onKeyDown]);

	return null;
};

export { Panes };
