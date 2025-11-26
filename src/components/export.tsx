import type { VoidComponent } from "solid-js";
import { Show } from "solid-js";
import {
	canvasToImageBlob,
	downloadFile,
	framesCanvasToVideoBlob,
	IMAGE_FORMATS,
	VIDEO_FORMATS,
} from "../scripts/export";
import { getCanvas } from "../scripts/lib";
import { loop } from "../scripts/loop";
import { globalStore, store } from "../scripts/store";
import { Folder } from "./folder";
import { NumberInput } from "./inputs/number-input";
import { RadioInput } from "./inputs/radio-input";
import { RangeInput } from "./inputs/range-input";
import { TextInput } from "./inputs/text-input";

const Export: VoidComponent = () => (
	<Folder title="Export" open={false}>
		<RangeInput
			label="frame rate"
			min={1}
			max={120}
			step={1}
			value={store.frameRate}
			onChange={(value) => {
				store.frameRate = value;
			}}
		/>

		<NumberInput
			label="start frame"
			min={0}
			max={1000}
			step={1}
			value={store.startFrame}
			onChange={(value) => {
				store.startFrame = value;
			}}
		/>

		<NumberInput
			label="output frames"
			min={1}
			max={1000}
			step={1}
			value={store.outputFrames}
			onChange={(value) => {
				store.outputFrames = value;
			}}
		/>

		<RangeInput
			label="seed"
			min={0}
			max={1000}
			step={1}
			value={store.seed}
			onChange={(value) => {
				store.seed = value;
			}}
		/>

		<TextInput
			name="file-name"
			label="file name"
			value={store.fileName}
			onChange={(value) => {
				store.fileName = value;
			}}
		/>

		<RadioInput
			name="video-format"
			title="video output format"
			options={VIDEO_FORMATS.map((videoFormat) => ({
				name: "video-format",
				value: videoFormat,
				checked: store.videoFormat === videoFormat,
				onChange(): void {
					store.videoFormat = videoFormat;
				},
			}))}
		/>

		<RadioInput
			name="image-format"
			title="image output format"
			options={IMAGE_FORMATS.map((imageFormat) => ({
				name: "image-format",
				value: imageFormat,
				checked: store.imageFormat === imageFormat,
				onChange(): void {
					store.imageFormat = imageFormat;
				},
			}))}
		/>

		<button
			type="button"
			class="shadow-menu clickable relative"
			disabled={globalStore.exportProgress > 0}
			onClick={async () => {
				const blob = await canvasToImageBlob(getCanvas(), { imageFormat: store.imageFormat });

				if (blob) {
					downloadFile(blob, store.fileName);
				}
			}}
		>
			<span>Export image</span>
		</button>

		<button
			type="button"
			class="shadow-menu clickable relative"
			disabled={globalStore.exportProgress > 0}
			onClick={async () => {
				globalStore.isExporting = true;
				globalStore.progress = store.startFrame;
				globalStore.exportProgress = 0;
				const { p5 } = globalStore;
				if (!p5) {
					return;
				}

				const blob = await framesCanvasToVideoBlob({
					canvas: getCanvas(),
					frames: store.outputFrames,
					fps: store.frameRate,
					onProgress: (value) => {
						globalStore.exportProgress = value * 100;
					},
					onDraw: () => {
						loop();
					},
					videoFormat: "mp4",
				});

				globalStore.isExporting = false;
				globalStore.exportProgress = 0;
				globalStore.progress = store.startFrame;

				loop();

				if (blob) {
					downloadFile(blob, store.fileName);
				}
			}}
		>
			<span>
				Export video
				<Show when={globalStore.exportProgress > 0}>
					: {Math.round(globalStore.exportProgress)}%
				</Show>
			</span>
		</button>
	</Folder>
);

export { Export };
