import { store } from "@/scripts/store";
import type { VoidComponent } from "solid-js";
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
				store.width = value;
			}}
		/>

		<RangeInput
			label="height"
			min={0}
			max={2160}
			step={1}
			value={store.height}
			onChange={(value) => {
				store.height = value;
			}}
		/>

		<RangeInput
			label="scale"
			min={0}
			max={2}
			step={0.025}
			value={store.scale}
			onChange={(value) => {
				store.scale = value;
			}}
		/>

		<CheckboxInput
			name="fit-screen"
			label="fit screen"
			value={store.fitScreen}
			onChange={(value) => {
				store.fitScreen = value;
			}}
		/>
	</Folder>
);

export { Size };
