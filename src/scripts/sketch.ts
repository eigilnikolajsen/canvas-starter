import { store } from "@/components/panes";
import type P5 from "p5";

const sketch = (p5: typeof P5.prototype): void => {
	p5.setup = (): void => {
		p5.createCanvas(store.width, store.height, document.createElement("canvas"));
	};

	p5.draw = (): void => {
		p5.clear();

		p5.background("#00ff00");

		p5.rect(0, 0, store.cellSize, store.cellSize);
	};
};

export { sketch };
