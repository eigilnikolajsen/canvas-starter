import type { VoidComponent } from "solid-js";
import { pipe, step } from "../../scripts/lib";

interface Props {
	label: string;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
}

const NumberInput: VoidComponent<Props> = (props) => (
	<label class="flex flex-col">
		<span>{props.label}</span>

		<input
			type="number"
			class="w-full h-3 shadow-menu"
			value={props.value}
			name={props.label}
			min={props.min}
			max={props.max}
			step={props.step}
			onChange={(event) => {
				const value = pipe(
					Number(event.currentTarget.value),
					(value) => Math.max(props.min ?? -Infinity, value),
					(value) => Math.min(props.max ?? Infinity, value),
					(value) => step(value, props.step ?? 1),
				);
				props.onChange(value);
			}}
		/>
	</label>
);

export { NumberInput };
