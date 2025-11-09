import { useRef } from "react";
import type { VoidComponent } from "../scripts/types";

const Canvas: VoidComponent = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (
		<canvas
			ref={canvasRef}
			className="absolute left-1/2 data-menu:translate-x-[calc(-50%+12rem)] -translate-x-1/2 top-1/2 -translate-y-1/2 transition-transform duration-300"
		/>
	);
};

export { Canvas };
