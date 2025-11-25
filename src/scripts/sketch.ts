import type { DrawContext, SetupContext } from "./types";

const setup = async ({ pane, store }: SetupContext): Promise<void> => {
	pane.addBinding(store, "circleRadius", { min: 1, max: 100, step: 0.1 });
	pane.addBinding(store, "circleSpeed", { min: 0.001, max: 0.1, step: 0.001 });
	pane.addBinding(store, "circleMovement", { min: 1, max: 100, step: 1 });
};

const draw = ({ p5, progress, store }: DrawContext): void => {
	const { circleRadius, circleSpeed, circleMovement } = store;

	p5.background("#ffffff");

	p5.noStroke();
	p5.fill("#000000");

	for (let i = 0; i < 100; i += 1) {
		const x =
			circleMovement * p5.sin(progress * 0.01 * (circleSpeed + p5.random(0, 0.1)))
			+ p5.random(-p5.width / 2, p5.width / 2);
		const y =
			circleMovement * p5.cos(progress * 0.01 * (circleSpeed - p5.random(0, 0.1)))
			+ p5.random(-p5.height / 2, p5.height / 2);

		p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
		p5.circle(p5.width / 2 + x, p5.height / 2 + y, circleRadius);
	}
};

export { draw, setup };
