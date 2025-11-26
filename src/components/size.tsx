import type { VoidComponent } from "solid-js";
import { setStore, store } from "../scripts/store";
import { Folder } from "./folder";
import { CheckboxInput } from "./inputs/checkbox-input";
import { RangeInput } from "./inputs/range-input";

const Size: VoidComponent = () => (
	<Folder title="Size" open={false}>
		<RangeInput
			label="width"
			min={1}
			max={3840}
			step={1}
			value={store.width}
			onChange={(value) => {
				setStore("width", value);
			}}
		/>

		<RangeInput
			label="height"
			min={0}
			max={2160}
			step={1}
			value={store.height}
			onChange={(value) => {
				setStore("height", value);
			}}
		/>

		<RangeInput
			label="scale"
			min={0}
			max={2}
			step={0.025}
			value={store.scale}
			onChange={(value) => {
				setStore("scale", value);
			}}
		/>

		<CheckboxInput
			name="fit-screen"
			label="fit screen"
			value={store.fitScreen}
			onChange={(value) => {
				setStore("fitScreen", value);
			}}
		/>
	</Folder>
);

export { Size };
