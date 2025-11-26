interface Dimensions {
	width: number;
	height: number;
	aspectRatio: number;
}

const getDimensions = (media?: HTMLImageElement | HTMLVideoElement): Dimensions => {
	let width = 1920;
	let height = 1080;

	if (media instanceof HTMLImageElement) {
		({ width, height } = media);
	}

	if (media instanceof HTMLVideoElement) {
		({ videoWidth: width, videoHeight: height } = media);
	}

	return { width, height, aspectRatio: width / height };
};

const loadImage = async (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.addEventListener("error", reject);
		img.addEventListener("load", (): void => {
			resolve(img);
		});
		img.src = url;
	});

const loadVideo = async (url: string): Promise<HTMLVideoElement> =>
	new Promise<HTMLVideoElement>((resolve, reject) => {
		const video = document.createElement("video");
		video.crossOrigin = "anonymous";
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.addEventListener("error", reject);
		video.addEventListener("canplay", (): void => {
			video
				.play()
				.then((): void => {
					resolve(video);
					return;
				})
				.catch(reject);
		});

		video.src = url;
	});

const getCanvas = (): HTMLCanvasElement => {
	const canvas = document.querySelector("canvas.p5Canvas");
	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error("Canvas not found");
	}

	return canvas;
};

const truncate = (value: number, precision: number): number => Number(value.toFixed(precision));

const step = (value: number, step: number): number => Math.round(value / step) * step;

const pipe = <T>(value: T, ...functions: ((value: T) => T)[]): T => {
	let result = value;

	for (const fn of functions) {
		result = fn(result);
	}

	return result;
};

export { getCanvas, getDimensions, loadImage, loadVideo, pipe, step, truncate };
export type { Dimensions };
