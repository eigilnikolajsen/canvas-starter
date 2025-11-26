import type { VoidComponent } from "solid-js";

interface Props {
	name: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const TextInput: VoidComponent<Props> = (props) => (
	<label class="flex flex-col">
		{props.label}
		<input
			type="text"
			value={props.value}
			name={props.name}
			class="w-full h-3 shadow-menu"
			autocomplete="off"
			onChange={(event) => {
				props.onChange(event.target.value);
			}}
		/>
	</label>
);

export { TextInput };
