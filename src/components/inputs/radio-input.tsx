import type { VoidComponent } from "solid-js";
import { For } from "solid-js";

interface Option {
	label?: string;
	value: string;
	checked: boolean;
	onChange: (value: string) => void;
}

interface Props {
	options: Option[];
	name: string;
	title: string;
}

const RadioInput: VoidComponent<Props> = (props) => (
	<div class="flex flex-col">
		<p>{props.title}</p>
		<ul class="flex gap-[1ch] shadow-menu">
			<For each={props.options}>
				{(option) => (
					<li>
						<label class="flex items-center justify-between clickable not-has-checked:opacity-50">
							{option.label ?? option.value}
							<input
								type="radio"
								name={props.name}
								class="sr-only"
								checked={option.checked}
								onChange={() => {
									option.onChange(option.value);
								}}
							/>
						</label>
					</li>
				)}
			</For>
		</ul>
	</div>
);

export { RadioInput };
