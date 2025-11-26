import type { VoidComponent } from "solid-js";
import { setStore, store } from "../scripts/store";
import { Folder } from "./folder";
import { RangeInput } from "./inputs/range-input";

const Sketch: VoidComponent = () => (
	<Folder title="Sketch" open={true}>
		<RangeInput
			label="circle radius"
			min={1}
			max={100}
			step={0.1}
			value={store.circleRadius}
			onChange={(value) => {
				setStore("circleRadius", value);
			}}
		/>

		<RangeInput
			label="circle speed"
			min={0.001}
			max={0.1}
			step={0.001}
			value={store.circleSpeed}
			onChange={(value) => {
				setStore("circleSpeed", value);
			}}
		/>

		<RangeInput
			label="circle movement"
			min={1}
			max={100}
			step={1}
			value={store.circleMovement}
			onChange={(value) => {
				setStore("circleMovement", value);
			}}
		/>
	</Folder>
);

export { Sketch };
