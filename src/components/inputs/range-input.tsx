import { pipe, step, truncate } from "@/scripts/lib";
import type { VoidComponent } from "solid-js";

interface Props {
	label: string;
	min: number;
	max: number;
	step: number;
	value: number;
	onChange: (value: number) => void;
}

const RangeInput: VoidComponent<Props> = (props) => (
	<li class="shadow-menu flex flex-col">
		<label class="flex items-center justify-between">
			<span>{props.label}</span>

			<input
				type="text"
				value={props.value}
				name={props.label}
				class="w-24 text-right h-3"
				autocomplete="off"
				onKeyDown={(event) => {
					const increasing = event.key === "ArrowUp" || event.key === "ArrowRight";
					const decreasing = event.key === "ArrowDown" || event.key === "ArrowLeft";

					if (!increasing && !decreasing) {
						return;
					}

					event.preventDefault();
					event.stopPropagation();

					const stepSize = props.step * (event.shiftKey ? 10 : 1);

					props.onChange(
						pipe(
							Number(event.currentTarget.value),
							(value) => value + (increasing ? stepSize : -stepSize),
							(value) => Math.max(props.min, value),
							(value) => Math.min(props.max, value),
							(value) => step(value, props.step),
							(value) => truncate(value, 3),
						),
					);
				}}
				onChange={(event) => {
					const value = pipe(
						Number(event.currentTarget.value),
						(value) => Math.max(props.min, value),
						(value) => Math.min(props.max, value),
						(value) => step(value, props.step),
						(value) => truncate(value, 3),
					);
					props.onChange(value);
				}}
			/>
		</label>

		<input
			type="range"
			min={props.min}
			max={props.max}
			step={props.step}
			value={props.value}
			name={props.label}
			aria-label={props.label}
			onInput={(event) => {
				const value = pipe(
					Number(event.currentTarget.value),
					(value) => Math.max(props.min, value),
					(value) => Math.min(props.max, value),
					(value) => step(value, props.step),
					(value) => truncate(value, 3),
				);
				props.onChange(value);
			}}
		/>
	</li>
);

export { RangeInput };
