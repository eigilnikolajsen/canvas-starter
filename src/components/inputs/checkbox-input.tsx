import type { VoidComponent } from "solid-js";

interface Props {
	name: string;
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

const CheckboxInput: VoidComponent<Props> = (props) => (
	<label class="flex items-center shadow-menu clickable">
		<input
			type="checkbox"
			checked={props.value}
			name={props.name}
			onChange={(event) => {
				props.onChange(event.target.checked);
			}}
		/>

		<span>{props.label}</span>
	</label>
);

export { CheckboxInput };
