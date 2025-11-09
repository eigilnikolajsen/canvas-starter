import { useState } from "react";
import {
	canvasToImageBlob,
	canvasToVideoBlob,
	downloadFile,
} from "../scripts/canvas-export";
import { store } from "../scripts/hooks";
import type { VoidComponent } from "../scripts/types";

const Export: VoidComponent = () => {
	const [progress, setProgress] = useState(0);

	const handleExportImage = async (): Promise<void> => {
		const canvas = document.querySelector("canvas");
		if (!canvas) {
			return;
		}

		const blob = await canvasToImageBlob(canvas, { imageFormat: "png" });

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	};

	const handleExportVideo = async (): Promise<void> => {
		const canvas = document.querySelector("canvas");
		const video = document.querySelector("video");
		if (!canvas || !video) {
			return;
		}

		const blob = await canvasToVideoBlob(canvas, video, {
			onProgress: setProgress,
			onDraw: (sample) => {
				const asset = sample.toCanvasImageSource();
				console.log(asset);
			},
			videoFormat: "mp4",
		});

		if (blob) {
			downloadFile(blob, store.fileName);
		}
	};

	return (
		<li>
			<button
				type="button"
				className="shadow-menu clickable relative"
				disabled={progress > 0}
				onClick={handleExportImage}
			>
				<span>Export image</span>
			</button>
			<button
				type="button"
				className="shadow-menu clickable relative"
				disabled={progress > 0}
				onClick={handleExportVideo}
			>
				<span>
					Export video
					{progress > 0 ? `: ${Math.round(progress * 100)}%` : ""}
				</span>
			</button>
		</li>
	);
};

export { Export };
