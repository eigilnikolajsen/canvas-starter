import { draw } from "./sketch";
import { globalStore, store } from "./store";

const loop = (): void => {
	const { seed } = store;
	const { p5, isExporting } = globalStore;

	if (!p5) {
		return;
	}

	p5.randomSeed(seed);
	p5.clear();

	globalStore.progress += 1000 / store.frameRate;

	draw({ p5, progress: globalStore.progress, store });

	if (!isExporting) {
		globalStore.loopTimeout = setTimeout(loop, 1000 / store.frameRate);
	}
};

export { loop };
