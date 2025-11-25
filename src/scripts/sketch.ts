import { store } from "@/scripts/store";
import type P5 from "p5";

const sketch = (p5: typeof P5.prototype): void => {
	p5.setup = (): void => {
		store.progress = store.startFrame;

		p5.createCanvas(store.width, store.height);

		draw();
	};

	p5.draw = (): void => {
		//
	};
};

const draw = (): void => {
	const { circleRadius, circleSpeed, circleMovement, seed, p5, isExporting } = store;
	if (!p5) {
		return;
	}

	if (!isExporting) {
		store.loopTimeout = setTimeout(draw, 1000 / store.frameRate);
	}

	// Set random seed from the store
	p5.randomSeed(seed);

	// Clear the canvas
	p5.clear();

	store.progress += (1000 / store.frameRate) * 0.01;

	// ================================================
	// ================ Sketch start ==================
	// ================================================

	p5.background("#ffffff");

	p5.noStroke();
	p5.fill("#000000");

	for (let i = 0; i < 100; i += 1) {
		const x =
			circleMovement * p5.sin(store.progress * (circleSpeed + p5.random(0, 0.1)))
			+ p5.random(-p5.width / 2, p5.width / 2);
		const y =
			circleMovement * p5.cos(store.progress * (circleSpeed - p5.random(0, 0.1)))
			+ p5.random(-p5.height / 2, p5.height / 2);

		p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
		p5.circle(p5.width / 2 + x, p5.height / 2 + y, circleRadius);
	}
};

export { draw, sketch };
