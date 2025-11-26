import type { VoidComponent } from "solid-js";

interface Props {
	title: string;
}

const Divider: VoidComponent<Props> = (props) => (
	<div class="not-first:mt-4">
		<span>{props.title}</span>
	</div>
);

export { Divider };
