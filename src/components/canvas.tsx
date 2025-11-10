import P5 from "p5";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../scripts/hooks";
import type { VoidComponent } from "../scripts/types";

const Canvas: VoidComponent = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [store] = useStore();
	const [p5, setP5] = useState<typeof P5.prototype>();

	useEffect(() => {
		setP5(new P5(undefined, containerRef.current ?? document.body, false));
	}, [containerRef]);

	useEffect(
		() => (): void => {
			p5?.remove();
		},
		[p5],
	);

	useEffect(() => {
		p5?.resizeCanvas(store.width, store.height, true);

		console.log(p5?.setup);
	}, [store, p5]);

	return (
		<div
			ref={containerRef}
			className="absolute bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
		/>
	);
};

export { Canvas };
