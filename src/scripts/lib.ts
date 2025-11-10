interface Dimensions {
	width: number;
	height: number;
	aspectRatio: number;
}

const getDimensions = (
	media?: HTMLImageElement | HTMLVideoElement,
): Dimensions => {
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
	new Promise((resolve, reject) => {
		const video = document.createElement("video");
		video.crossOrigin = "anonymous";
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		video.addEventListener("error", reject);
		video.addEventListener("canplay", async (): Promise<void> => {
			await video.play();
			resolve(video);
		});
		video.src = url;
	});

export { getDimensions, loadImage, loadVideo };
export type { Dimensions };
