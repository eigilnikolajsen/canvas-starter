import type P5 from "p5";
import type { store } from "./store";

interface SetupContext {
	store: typeof store;
}

interface DrawContext {
	p5: typeof P5.prototype;
	progress: number;
	store: typeof store;
}

export type { DrawContext, SetupContext };
